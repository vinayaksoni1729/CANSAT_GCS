import React from 'react';
import { Battery } from 'lucide-react';
import { ThemeProvider, useTheme } from './ThemeContext';

const ContainerStatus = ({ status, healthyPackets, corruptedPackets, batteryLevel }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`p-4 ${isDark ? 'bg-slate-800' : 'bg-white shadow-md'} rounded-lg`}>
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="text-white font-bold">CONTAINER</h3>
        <div className="text-gray-400">STATE: {status}</div>
      </div>
      <div className="flex items-center gap-2">
        <Battery className="text-emerald-400" size={24} />
        <span className="text-white">{batteryLevel}%</span>
      </div>
    </div>
    <div className="text-gray-400 text-sm">
      <div>Healthy Packets: {healthyPackets}</div>
      <div>Corrupted Packets: {corruptedPackets}</div>
    </div>
    </div>
  );
};

export default ContainerStatus;
