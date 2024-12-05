import React from 'react';

const GPSInfo = ({ satellites, latitude, longitude }) => (
  <div className="p-4 bg-slate-800 rounded-lg">
    <h3 className="text-white font-bold mb-2">GPS LOCATION</h3>
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div>
        <div className="text-gray-400">Satellites Connected:</div>
        <div className="text-white">{satellites}</div>
      </div>
      <div>
        <div className="text-gray-400">Latitude:</div>
        <div className="text-white">{latitude}</div>
      </div>
      <div>
        <div className="text-gray-400">Longitude:</div>
        <div className="text-white">{longitude}</div>
      </div>
    </div>
  </div>
);

export default GPSInfo;
