import React from 'react';
import { Send } from 'lucide-react';
import { ThemeProvider, useTheme } from './ThemeContext';

const CommandConsole = ({ commands, onSendCommand }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`p-4 ${isDark ? 'bg-slate-800' : 'bg-white shadow-md'} rounded-lg`}>
      <h3 className={`${isDark ? 'text-white' : 'text-slate-900'} font-bold mb-2`}>
        TELEMETRY CONTROL
      </h3>
    <div className="flex gap-2 mb-4">
      <select className="flex-1 bg-slate-700 text-white p-2 rounded">
        <option>Power ON</option>
      </select>
      <button 
        onClick={onSendCommand}
        className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
      >
        <Send size={20} />
      </button>
    </div>
    <div className="h-14 bg-slate-900 rounded p-2 overflow-y-auto font-mono text-sm">
      {commands.map((cmd, i) => (
        <div key={i} className="text-gray-400">{cmd}</div>
      ))}
    </div>
    </div>
  );
};

export default CommandConsole;
