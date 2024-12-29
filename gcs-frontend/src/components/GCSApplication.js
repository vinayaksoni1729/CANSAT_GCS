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

const GCSApplication = () => {
  const [telemetryData, setTelemetryData] = useState([]);
  const [ws, setWs] = useState(null);

  // Sample data for graphs
  const sampleData = Array.from({ length: 20 }, (_, i) => ({
    packet: i,
    value: 25 + Math.random(),
  }));

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8000/ws');

    websocket.onopen = () => {
      console.log('Connected to GCS backend');
      setWs(websocket); // Set WebSocket connection on successful open
    };

    websocket.onmessage = (event) => {
      const telemetry = JSON.parse(event.data);
      setTelemetryData((prev) => [...prev, telemetry]);
    };

    websocket.onclose = () => {
      console.log('WebSocket connection closed');
      setWs(null); // Clear the WebSocket reference on close
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      console.log('Cleaning up WebSocket connection');
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, []);

  const sendCommand = (command) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: 'COMMAND',
          data: command,
        })
      );
    } else {
      console.warn('WebSocket is not open. Cannot send command:', command);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-2">
      <Header missionId="1022" time="07 45 02.787" />

      <div className="grid grid-cols-12 gap-2 p-2">
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <ConnectionPanel port="COM11" />
            <GPSInfo satellites={0} latitude="0.000000" longitude="0.000000" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-800 rounded-lg">
              <ContainerStatus
                status="PRELAUNCH"
                healthyPackets={155}
                corruptedPackets={0}
                batteryLevel={14.06}
              />
              <PressureSimulation onSendCommand={sendCommand} />
            </div>

            <div className="bg-slate-800 p-6">
              <h3 className="text-white font-bold mb-4 uppercase">auto-gyro payload</h3>
              <div className="grid grid-cols-2 gap-4 mt-5">
                <TelemetryGraph title="Temperature" data={sampleData} />
                <TelemetryGraph title="Gyroscope" data={sampleData} color="rgb(59, 130, 246)" />

              </div>
              <div className='grid grid-cols-2 gap-4 mt-8'>
                <TelemetryGraph title="RPM" data={sampleData} />
                <TelemetryGraph title="Accelerometer" data={sampleData} color="rgb(59, 130, 246)" />
              </div>

            </div>
            <div className="bg-slate-800 p-2 grid grid-cols-2 gap-4">
              <TelemetryGraph title="RPM" data={sampleData} />
              <TelemetryGraph title="RPM" data={sampleData} />
            </div>
            <div className="bg-slate-800 p-2 grid grid-cols-2 gap-4">
            <TelemetryGraph title="RPM" data={sampleData} />
            <TelemetryGraph title="RPM" data={sampleData} />
            </div>
          </div>
        </div>

        <div className="col-span-4 gap-2">
          <CommandConsole commands={telemetryData} onSendCommand={sendCommand} />
          <div className="mt-2">
            <ThreeD height={245} orientation={{
              x: telemetryData.pitch || 0,  // in radians
              y: telemetryData.yaw || 0,    // in radians
              z: telemetryData.roll || 0    // in radians
            }} />
          </div>
          <div className="mt-2">
            <MissionProgress phase="PRELAUNCH" progress={20} />
          </div>
          <LiveData />

        </div>
      </div>
    </div>
  );
};
export default GCSApplication;