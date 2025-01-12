import React from 'react';

const MissionProgress = ({ phase, progress }) => (
  <div className="p-5 bg-slate-800 rounded-lg">
    <div className="flex justify-between mb-2">
      {['PRELAUNCH', 'LAUNCH', 'APOGEE', 'PARADEPLOY', 'TPDEPLOY', 'LAND'].map((stage) => (
        <div key={stage} className="text-white text-xs">{stage}</div>
      ))}
    </div>
    <div className="w-full h-5 bg-slate-700 rounded-full overflow-hidden">
      <div 
        className="h-full bg-cyan-400 transition-all duration-1000"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

export default MissionProgress;
