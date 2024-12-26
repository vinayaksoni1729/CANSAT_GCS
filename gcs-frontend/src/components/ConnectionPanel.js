import React from 'react';
import { RefreshCw } from 'lucide-react';

const ConnectionPanel = ({ port, onRefresh, onFileSelect }) => (
  <div className="p-4 bg-slate-800 rounded-lg">
    <div className="flex gap-4 items-center">
      <div className="flex-1">
        <label className="text-gray-400 text-sm">XBEE Port:</label>
        <select className="w-full bg-slate-700 text-white p-2 rounded">
          <option>{port}</option>
        </select>
      </div>
      <button 
        onClick={onRefresh}
        className="p-3 bg-slate-700 rounded hover:bg-slate-600"
      >
        <RefreshCw className="text-white" size={20} />
      </button>
    </div>
    <div className="mt-4">
      <label className="text-gray-400 text-sm">Simulation File:</label>
      <button 
        onClick={onFileSelect}
        className="w-full mt-1 p-2 bg-slate-700 text-white rounded text-left hover:bg-slate-600"
      >
        CHOOSE FILE
      </button>
    </div>
  </div>
);

export default ConnectionPanel;
