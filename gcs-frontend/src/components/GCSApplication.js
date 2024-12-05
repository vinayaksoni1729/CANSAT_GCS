import React, { useState } from 'react';
import Header from './Header';
import ConnectionPanel from './ConnectionPanel';
import TelemetryGraph from './TelemetryGraph';
import ContainerStatus from './ContainerStatus';
import CommandConsole from './CommandConsole';
import GPSInfo from './GPSInfo';
import MissionProgress from './MissionProgress';

// Main GCS Application
const GCSApplication = () => {
  const [commands] = useState([
    '1022,00:04:23,789,T,90.20,27.52,6.32,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,',
    '1022,00:04:23,790,T,90.20,27.52,6.32,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'
  ]);

  // Sample telemetry data
  const tempData = Array.from({ length: 20 }, (_, i) => ({
    packet: i,
    value: 25 + Math.random()
  }));

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header missionId="1022" time="07 45 02.787" />
      
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <ConnectionPanel port="COM11" />
            <GPSInfo satellites={0} latitude="0.000000" longitude="0.000000" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <ContainerStatus 
              status="PRELAUNCH"
              healthyPackets={155}
              corruptedPackets={0}
              batteryLevel={74.06}
            />
            <div className="grid gap-4">
              <TelemetryGraph title="Temperature" data={tempData} />
              <TelemetryGraph title="Altitude" data={tempData} color="rgb(59, 130, 246)" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 p-4 rounded-lg">
              <h3 className="text-white font-bold mb-4">TETHERED PAYLOAD</h3>
              <div className="grid grid-cols-2 gap-4">
                <TelemetryGraph title="Temperature" data={tempData} />
                <TelemetryGraph title="Gyroscope" data={tempData} color="rgb(59, 130, 246)" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-4">
          <CommandConsole commands={commands} />
        </div>
      </div>
      
      <div className="p-4">
        <MissionProgress phase="PRELAUNCH" progress={20} />
      </div>
    </div>
  );
};

export default GCSApplication;