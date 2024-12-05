import React from 'react';

const Header = ({ missionId, time }) => (
  <div className="flex justify-between items-center p-4 bg-slate-800">
    <div className="flex items-center gap-4">
      <img src="/api/placeholder/48/48" alt="Mission Logo" className="rounded-full" />
      <h1 className="text-white text-2xl font-bold">Elytra #{missionId}</h1>
    </div>
    <div className="text-white text-2xl font-mono">{time}</div>
  </div>
);

export default Header;
