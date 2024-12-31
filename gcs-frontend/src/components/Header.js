import React from 'react';
import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';


const Header = ({ missionId, time }) => {
  const { isDark, setIsDark } = useTheme();
  
  return (
    <div className={`flex justify-between items-center p-4 ${isDark ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>
      <div className="flex items-center gap-4">
        <img src="/api/placeholder/48/48" alt="Mission Logo" className="rounded-full" />
        <h1 className={`${isDark ? 'text-white' : 'text-slate-900'} text-2xl font-bold`}>
          Elytra #{missionId}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsDark(!isDark)}
          className={`p-2 rounded-full ${isDark ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-900'}`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className={`text-2xl font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {time}
        </div>
      </div>
    </div>
  );
};

export default Header;
