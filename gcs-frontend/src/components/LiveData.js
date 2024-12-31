import React from 'react';

const LiveData = () => {
  // Enhanced sample data - replace with your actual data source
  const gcsData = {
    missionStatus: {
      phase: 'PRELAUNCH',
      elapsedTime: '00:05:32',
      batteryVoltage: 11.8,
      signalStrength: 85,
      packetHealth: {
        healthy: 155,
        corrupted: 0
      }
    },
    position: {
      altitude: {
        seaLevel: 70.8,
        terrain: 161.3
      },
      coordinates: {
        lat: 51.5074,
        lon: -0.1278
      },
      distanceFromLaunch: 235.6,
      descentRate: -0.98
    },
    motion: {
      speed: {
        vertical: -0.98,
        horizontal: 225.82
      },
      orientation: {
        roll: 1.2,
        pitch: 0.8,
        yaw: 359.2
      },
      acceleration: {
        x: 0.02,
        y: 0.01,
        z: 9.81
      },
      gyro: {
        x: 0.1,
        y: 0.2,
        z: 0.1
      },
      rpm: 1250
    },
    environment: {
      temperature: {
        internal: 28.5,
        external: 22.3
      },
      pressure: 101.325,
      humidity: 45.2,
      biome: 'Shores'
    },
    systemHealth: {
      cpuTemp: 45.2,
      memoryUsage: 68,
      storageUsed: 42,
      linkQuality: 92
    }
  };

  const StatusIndicator = ({ value, max, color }) => (
    <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color}`} 
        style={{ width: `${(value/max) * 100}%` }}
      />
    </div>
  );

  return (
    <div className="w-full max-w-4xl bg-gray-900 text-white rounded-lg shadow-lg p-6">
      {/* Mission Status */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Live Data</h2>
          <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">
            {gcsData.missionStatus.phase}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Mission Time</div>
            <div className="text-xl">{gcsData.missionStatus.elapsedTime}</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Battery</div>
            <div className="text-xl">{gcsData.missionStatus.batteryVoltage}V</div>
            <StatusIndicator 
              value={gcsData.missionStatus.batteryVoltage} 
              max={12.6} 
              color="bg-green-500"
            />
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Signal</div>
            <div className="text-xl flex">{gcsData.missionStatus.signalStrength}%
              <div className='text-xs mt-2'>
              -34dBm
              </div>
            </div>
            <StatusIndicator 
              value={gcsData.missionStatus.signalStrength} 
              max={100} 
              color="bg-blue-500"
            />
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Packets</div>
            <div className="text-xl">
              {gcsData.missionStatus.packetHealth.healthy}/{gcsData.missionStatus.packetHealth.healthy + gcsData.missionStatus.packetHealth.corrupted}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Position and Motion */}
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-gray-400 mb-3">Position</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Altitude (ASL):</span>
                <span className="text-green-400">{gcsData.position.altitude.seaLevel}m</span>
              </div>
              <div className="flex justify-between">
                <span>Ground Distance:</span>
                <span className="text-green-400">{gcsData.position.distanceFromLaunch}m</span>
              </div>
              <div className="flex justify-between">
                <span>Descent Rate:</span>
                <span className="text-green-400">{gcsData.position.descentRate}m/s</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-gray-400 mb-3">Motion</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>RPM:</span>
                <span className="text-green-400">{gcsData.motion.rpm}</span>
              </div>
              <div className="flex justify-between">
                <span>Roll/Pitch/Yaw:</span>
                <span className="text-green-400">
                  {gcsData.motion.orientation.roll}° / 
                  {gcsData.motion.orientation.pitch}° / 
                  {gcsData.motion.orientation.yaw}°
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Environment and System Health */}
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-gray-400 mb-3">Environment</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Temperature Int/Ext:</span>
                <span className="text-green-400">
                  {gcsData.environment.temperature.internal}°C / 
                  {gcsData.environment.temperature.external}°C
                </span>
              </div>
              <div className="flex justify-between">
                <span>Pressure:</span>
                <span className="text-green-400">{gcsData.environment.pressure}kPa</span>
              </div>
              <div className="flex justify-between">
                <span>Humidity:</span>
                <span className="text-green-400">{gcsData.environment.humidity}%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-gray-400 mb-3">System Health</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>CPU Temp:</span>
                <span className="text-green-400">{gcsData.systemHealth.cpuTemp}°C</span>
              </div>
              <div className="flex justify-between">
                <span>Memory:</span>
                <span className="text-green-400">{gcsData.systemHealth.memoryUsage}%</span>
              </div>
              <div className="flex justify-between">
                <span>Link Quality:</span>
                <span className="text-green-400">{gcsData.systemHealth.linkQuality}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveData;