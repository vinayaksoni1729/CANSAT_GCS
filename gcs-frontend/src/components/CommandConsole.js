import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useTheme } from './ThemeContext';

const CommandConsole = ({ commands, onSendCommand }) => {
  const { isDark } = useTheme();
  const [command, setCommand] = useState('');

  const handleSendCommand = () => {
    if (command.trim() !== '') {
      onSendCommand(command);
      setCommand('');
    }
  };

  return (
    <div className={`p-4 ${isDark ? 'bg-slate-800' : 'bg-white shadow-md'} rounded-lg`}>
      <h3 className={`${isDark ? 'text-white' : 'text-slate-900'} font-bold mb-2`}>
        TELEMETRY CONTROL
      </h3>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter command"
          className={`flex-1 bg-slate-700 text-white p-2 rounded ${isDark ? 'placeholder:text-gray-400' : 'placeholder:text-gray-500'}`}
        />
        <button
          onClick={handleSendCommand}
          className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
        >
          <Send size={20} />
        </button>
      </div>
      <div className="bg-slate-900 rounded p-2 text-xs font-mono">
        <div className="flex justify-between mb-2 text-gray-400">
          <span>Received: 656</span>
          <span>Corrupted: 3</span>
          <span>Last Command: CXON</span>
        </div>
        <div className="h-20 overflow-y-auto">
          {commands.map((cmd, i) => (
            <div key={i} className="text-gray-400">{cmd}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandConsole;