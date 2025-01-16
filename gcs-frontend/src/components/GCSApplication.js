import React, { useState, useEffect } from 'react';
import Header from './Header';
import ConnectionPanel from './ConnectionPanel';
import TelemetryGraph from './TelemetryGraph';
import CommandConsole from './CommandConsole';
import GPSInfo from './GPSInfo';
import MissionProgress from './MissionProgress';
import ThreeD from './ThreeD';
import LiveData from './LiveData';
import { ThemeProvider, useTheme } from './ThemeContext';
import ButtonB from './ButtonB';
import EmptyComp from './EmptyComp';
import Dials from './Dials';
import { useDataParser } from './DataParser';
import ClcGraph from './ClcGraph';



const GCSContent = ({ telemetryData, sendCommand, onSimulationData }) => {
  const { isDark } = useTheme();
  const { telemetry, commandHistory } = telemetryData;

  // Transform telemetry data into format needed for graphs
  const formatGraphData = (telemetry) => {
    // Keep last 10 data points for the graph
    const MAX_POINTS = 10;
    return {
      temperature: telemetry.temperatureHistory?.slice(-MAX_POINTS).map((value, index) => ({
        packet: index,
        value: value
      })) || [],
      pressure: telemetry.pressureHistory?.slice(-MAX_POINTS).map((value, index) => ({
        packet: index,
        value: value
      })) || [],
      altitude: telemetry.altitudeHistory?.slice(-MAX_POINTS).map((value, index) => ({
        packet: index,
        value: value
      })) || [],
      latitude: telemetry.latitudeHistory?.slice(-MAX_POINTS).map((value, index) => ({
        packet: index,
        value: value
      })) || []
    };
  };

  const graphData = formatGraphData(telemetry);


  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'} pt-2`}>
      <Header missionId="1022" time={telemetry.timestamp} />
      <div className="grid grid-cols-12 gap-2 p-2">
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <ConnectionPanel
              port="COM11"
              onDataLoad={onSimulationData}
            />
            <GPSInfo
              satellites={0}
              latitude={telemetry.latitude}
              longitude={telemetry.longitude}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CommandConsole
              commands={commandHistory || []} // Ensure commands is always an array
              onSendCommand={sendCommand}
            />
            <ButtonB />
          </div>

          <div className='grid grid-cols-2 p-2 gap-2'>
            <div className={`${isDark ? 'bg-slate-800' : 'bg-white shadow-lg'} p-6 rounded-lg`}>
              <h3 className={`${isDark ? 'text-white' : 'text-slate-900'} font-bold mb-4 uppercase`}>
                auto-gyro payload
              </h3>
              <div className="space-y-4 grid grid-cols-2">
                <TelemetryGraph
                  data={graphData.temperature}
                  title="Temperature"
                  color="rgb(239, 68, 68)"
                  unit="°C"
                  threshold={30}
                  thresholdLabel="Max Safe Temp"
                  minValue={20}
                  maxValue={40}
                />

                <TelemetryGraph
                  data={graphData.pressure}
                  title="Pressure"
                  color="rgb(34, 197, 94)"
                  unit="hPa"
                />

                <TelemetryGraph
                  data={graphData.altitude}
                  title="Altitude"
                  color="rgb(59, 130, 246)"
                  unit="m"
                />
                <TelemetryGraph
                  data={graphData.latitude}
                  title="Latitude"
                  color="rgb(34, 197, 94)"
                  unit="m"
                />
              </div>
            </div>
            <ClcGraph telemetryData={telemetry} />
          </div>

          <div className="mt-2">
            <Dials telemetryData={telemetry} />
          </div>
        </div>

        <div className="col-span-4 gap-2">
          <ThreeD height={230} orientation={{
            x: telemetry.pitch,
            y: telemetry.yaw,
            z: telemetry.roll
          }} />
          <LiveData telemetryData={telemetry} />
          <EmptyComp />
        </div>
      </div>
      <MissionProgress phase="PRELAUNCH" progress={20} />
    </div>
  );
};


const GCSApplication = () => {
  const { telemetry, parseData } = useDataParser();
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationData, setSimulationData] = useState([]);
  const [currentSimIndex, setCurrentSimIndex] = useState(0);
  const [commandHistory, setCommandHistory] = useState([]);

  // Add state for historical data
  const [telemetryHistory, setTelemetryHistory] = useState({
    temperatureHistory: [],
    pressureHistory: [],
    altitudeHistory: [],
    latitudeHistory: []
  });

  // Update history when new telemetry comes in
  useEffect(() => {
    setTelemetryHistory(prev => ({
      temperatureHistory: [...prev.temperatureHistory, telemetry.temperature],
      pressureHistory: [...prev.pressureHistory, telemetry.pressure],
      altitudeHistory: [...prev.altitudeHistory, telemetry.altitude],
      latitudeHistory: [...prev.latitudeHistory, telemetry.latitude]
    }));
  }, [telemetry]);

  // Handle sending commands
  const handleSendCommand = (command) => {
    const newCommand = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      command: command,
      status: 'sent'
    };
    setCommandHistory(prev => [...prev, newCommand]);
    // Add any additional command handling logic here
  };

  // Handle CSV data load
  const handleSimulationData = (data) => {
    setSimulationData(data);
    setCurrentSimIndex(0);
    setIsSimulating(true);
    // Reset history when new simulation starts
    setTelemetryHistory({
      temperatureHistory: [],
      pressureHistory: [],
      altitudeHistory: [],
      latitudeHistory: []
    });
  };

  // Simulation effect
  useEffect(() => {
    let simulationInterval;

    if (isSimulating && simulationData.length > 0) {
      simulationInterval = setInterval(() => {
        setCurrentSimIndex((prevIndex) => {
          if (prevIndex >= simulationData.length - 1) {
            setIsSimulating(false);
            return prevIndex;
          }
          const newData = simulationData[prevIndex];
          parseData(newData);
          return prevIndex + 1;
        });
      }, 1000);
    }

    return () => {
      if (simulationInterval) {
        clearInterval(simulationInterval);
      }
    };
  }, [isSimulating, simulationData, parseData]);

  return (
    <ThemeProvider>
      <GCSContent
        telemetryData={{
          telemetry: {
            ...telemetry,
            ...telemetryHistory
          },
          commandHistory
        }}
        sendCommand={handleSendCommand}
        onSimulationData={handleSimulationData}
      />
    </ThemeProvider>
  );
};

export default GCSApplication;