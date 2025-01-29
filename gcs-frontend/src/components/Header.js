import React from 'react';
import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';
import logo from './assets/logo.jpg';  // Imported logo

const Header = ({ missionId, time }) => {
  const { isDark, setIsDark } = useTheme();

  return (
    <div className={`flex justify-between items-center p-3 ${isDark ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>
      <div className="flex items-center gap-4">
        <img src={logo} alt="Mission Logo" className="rounded-full w-12 h-12" />
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
