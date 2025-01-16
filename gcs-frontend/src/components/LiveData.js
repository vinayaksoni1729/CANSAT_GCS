import React from 'react';

const LiveData = ({ telemetryData }) => {
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
            {telemetryData.phase || 'UNKNOWN'}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Mission Time</div>
            <div className="text-xl">{telemetryData.timestamp || '00:00:00'}</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Battery</div>
            <div className="text-xl">{telemetryData.batteryVoltage || 0}V</div>
            <StatusIndicator 
              value={telemetryData.batteryVoltage || 0} 
              max={12.6} 
              color="bg-green-500"
            />
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Signal</div>
            <div className="text-xl flex">{telemetryData.signalStrength || 0}%
              <div className='text-xs mt-2'>
                {telemetryData.signalStrengthDBM || '0'}dBm
              </div>
            </div>
            <StatusIndicator 
              value={telemetryData.signalStrength || 0} 
              max={100} 
              color="bg-blue-500"
            />
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Packets</div>
            <div className="text-xl">
              {telemetryData.packetsHealthy || 0}/{(telemetryData.packetsHealthy || 0) + (telemetryData.packetsCorrupted || 0)}
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
                <span className="text-green-400">{telemetryData.altitude || 0}m</span>
              </div>
              <div className="flex justify-between">
                <span>Ground Distance:</span>
                <span className="text-green-400">{telemetryData.distanceFromLaunch || 0}m</span>
              </div>
              <div className="flex justify-between">
                <span>Descent Rate:</span>
                <span className="text-green-400">{telemetryData.descentRate || 0}m/s</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-gray-400 mb-3">Motion</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>RPM:</span>
                <span className="text-green-400">{telemetryData.rpm || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Roll/Pitch/Yaw:</span>
                <span className="text-green-400">
                  {telemetryData.roll || 0}° / 
                  {telemetryData.pitch || 0}° / 
                  {telemetryData.yaw || 0}°
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
                  {telemetryData.temperatureInternal || 0}°C / 
                  {telemetryData.temperature || 0}°C
                </span>
              </div>
              <div className="flex justify-between">
                <span>Pressure:</span>
                <span className="text-green-400">{telemetryData.pressure || 0}kPa</span>
              </div>
              <div className="flex justify-between">
                <span>Humidity:</span>
                <span className="text-green-400">{telemetryData.humidity || 0}%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-gray-400 mb-3">System Health</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>CPU Temp:</span>
                <span className="text-green-400">{telemetryData.cpuTemperature || 0}°C</span>
              </div>
              <div className="flex justify-between">
                <span>Memory:</span>
                <span className="text-green-400">{telemetryData.memoryUsage || 0}%</span>
              </div>
              <div className="flex justify-between">
                <span>Link Quality:</span>
                <span className="text-green-400">{telemetryData.linkQuality || 0}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveData;