import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';


const GPSInfo = ({ satellites, latitude, longitude }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`p-4 ${isDark ? 'bg-slate-800' : 'bg-white shadow-md'} rounded-lg`}>
    <h3 className="text-white font-bold mb-2">GPS LOCATION</h3>
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div>
        <div className="text-gray-400">Satellites Connected:</div>
        <div className="text-white">{satellites || 1}</div>
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
};

export default GPSInfo;
