import React from 'react';
import { Wind, Compass } from 'lucide-react';

const WindDataDisplay = ({ windSpeed, windDirection }) => {
  // Convert wind direction to compass rose
  const getCompassDirection = (degrees) => {
    const compassPoints = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return compassPoints[index];
  };

  return (
    <div className=" bg-slate-800 text-white rounded-lg p-5 flex items-center justify-between h-60 w-full ">
      <div className="flex items-center">
        <Wind size={36} className="mr-4 text-blue-500" />
        <div>
          <div className="text-4xl font-bold">{windSpeed.toFixed(1)} m/s</div>
          <div className="text-sm text-gray-400">Wind Speed</div>
        </div>
      </div>
      <div className="flex items-center">
        <Compass size={36} className="mr-4 text-blue-500" />
        <div>
          <div className="text-3xl font-bold">{getCompassDirection(windDirection)}</div>
          <div className="text-sm text-gray-400">{windDirection.toFixed(0)}°</div>
        </div>
      </div>
    </div>
  );
};

export default WindDataDisplay;