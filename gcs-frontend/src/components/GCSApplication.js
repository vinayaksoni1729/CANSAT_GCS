import React, { useState, useEffect } from 'react';
import Header from './Header';
import ConnectionPanel from './ConnectionPanel';
import TelemetryGraph from './TelemetryGraph';
import ContainerStatus from './ContainerStatus';
import CommandConsole from './CommandConsole';
import GPSInfo from './GPSInfo';
import MissionProgress from './MissionProgress';
import PressureSimulation from './PressureSimulation';
import ThreeD from './ThreeD';
import LiveData from './LiveData';
import { ThemeProvider, useTheme } from './ThemeContext';
import ButtonB from './ButtonB';
import EmptyComp from './EmptyComp';
import Dials from './Dials';

const GCSContent = ({ telemetryData, sampleData, sendCommand }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'} pt-2`}>
      <Header missionId="1022" time="07 45 02.787" />
      <div className="grid grid-cols-12 gap-2 p-2">
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <ConnectionPanel port="COM11" />
            <GPSInfo satellites={0} latitude="0.000000" longitude="0.000000" />

          </div>

          <div className="grid grid-cols-2 gap-2">
            <CommandConsole commands={telemetryData} onSendCommand={sendCommand} />
            <ButtonB />

          </div>
          
          <div className='grid grid-cols-2 p-2 gap-2'>
          <div className={`${isDark ? 'bg-slate-800' : 'bg-white shadow-lg'} p-6 rounded-lg`}>
              <h3 className={`${isDark ? 'text-white' : 'text-slate-900'} font-bold mb-4 uppercase`}>
                auto-gyro payload
              </h3>
              <div className="grid grid-cols-4 gap-4 mt-5">
                <TelemetryGraph title="Temperature" data={sampleData} />
                <TelemetryGraph title="Battery Voltage" data={sampleData} color="rgb(59, 130, 246)" />
                <TelemetryGraph title="Pressure" data={sampleData} />
                <TelemetryGraph title="Gyroscope" data={sampleData} color="rgb(59, 130, 246)" />
              </div>
              <div className='grid grid-cols-4 gap-4 mt-8'>
                <TelemetryGraph title="RPM" data={sampleData} />
                <TelemetryGraph title="Accelerometer" data={sampleData} color="rgb(59, 130, 246)" />
                <TelemetryGraph title="Altitude" data={sampleData} />
                <TelemetryGraph title="Magnetometer" data={sampleData} color="rgb(59, 130, 246)" />
              </div>
            </div>          </div>

          <div className="mt-2">
            <Dials />
          </div>
        </div>

        <div className="col-span-4 gap-2">
          <ThreeD height={230} orientation={{
            x: telemetryData.pitch || 0,
            y: telemetryData.yaw || 0,
            z: telemetryData.roll || 0
          }} />
          <LiveData />
          <EmptyComp />
        </div> 
      </div>
      <MissionProgress phase="PRELAUNCH" progress={20} />

    </div>
  );
};

const GCSApplication = () => {
  const [telemetryData, setTelemetryData] = useState([]);
  const [ws, setWs] = useState(null);

  const sampleData = Array.from({ length: 20 }, (_, i) => ({
    packet: i,
    value: 25 + Math.random(),
  }));

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8000/ws');
    
    websocket.onopen = () => {
      console.log('Connected to GCS backend');
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      const telemetry = JSON.parse(event.data);
      setTelemetryData((prev) => [...prev, telemetry]);
    };

    websocket.onclose = () => {
      console.log('WebSocket connection closed');
      setWs(null);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, []);

  const sendCommand = (command) => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'COMMAND', data: command }));
    } else {
      console.warn('WebSocket is not open. Cannot send command:', command);
    }
  };

  return (
    <ThemeProvider>
      <GCSContent 
        telemetryData={telemetryData} 
        sampleData={sampleData} 
        sendCommand={sendCommand}
      />
    </ThemeProvider>
  );
};

export default GCSApplication;