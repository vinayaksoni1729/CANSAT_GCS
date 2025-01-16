import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const AttitudeDial = ({ value, type }) => {
  // Previous AttitudeDial implementation remains unchanged
  const normalizedValue = Math.max(-90, Math.min(90, value));
  
  return (
    <div className="relative w-40 h-40">
      <svg viewBox="0 0 100 100" className=" h-full">
        <defs>
          <clipPath id={`clip-${type}`}>
            <circle cx="50" cy="50" r="46" />
          </clipPath>
        </defs>

        <circle cx="50" cy="50" r="50" fill="#1a1a1a" />
        <circle cx="50" cy="50" r="48" fill="#000000" />
        
        <g clipPath={`url(#clip-${type})`}>
          <g transform={`translate(50 50) rotate(${type === 'ROLL' ? -normalizedValue : 0})`}>
            <path 
              d={`M-46 ${type === 'PITCH' ? normalizedValue : 0} 
                   L46 ${type === 'PITCH' ? normalizedValue : 0} 
                   L46 -46 L-46 -46 Z`} 
              fill="#0077be" 
            />
            <path 
              d={`M-46 ${type === 'PITCH' ? normalizedValue : 0} 
                   L46 ${type === 'PITCH' ? normalizedValue : 0} 
                   L46 46 L-46 46 Z`} 
              fill="#2d5a2d" 
            />
            
            {[-60, -45, -30, -20, -10, 0, 10, 20, 30, 45, 60].map(deg => (
              <g key={deg} transform={`rotate(${deg})`}>
                <line 
                  x1="-46" 
                  y1="0" 
                  x2={Math.abs(deg) % 30 === 0 ? "-38" : "-42"} 
                  y2="0" 
                  stroke="white" 
                  strokeWidth={Math.abs(deg) % 30 === 0 ? "1.5" : "1"} 
                />
                <line 
                  x1="38" 
                  y1="0" 
                  x2="46" 
                  y2="0" 
                  stroke="white" 
                  strokeWidth={Math.abs(deg) % 30 === 0 ? "1.5" : "1"} 
                />
                {Math.abs(deg) % 30 === 0 && (
                  <text 
                    x="-32" 
                    y="0" 
                    fill="white" 
                    fontSize="6" 
                    textAnchor="end" 
                    dominantBaseline="middle"
                  >
                    {Math.abs(deg)}
                  </text>
                )}
              </g>
            ))}
          </g>

          <g>
            <line x1="35" y1="50" x2="45" y2="50" stroke="yellow" strokeWidth="2" />
            <line x1="55" y1="50" x2="65" y2="50" stroke="yellow" strokeWidth="2" />
            <circle cx="50" cy="50" r="1.5" fill="yellow" />
          </g>
        </g>

        <circle cx="50" cy="50" r="46" fill="none" stroke="#333" strokeWidth="1" />
        
        <g transform="translate(50, 80)">
          <rect 
            x="-16" 
            y="-8" 
            width="32" 
            height="16" 
            rx="2"
            fill="#000000" 
            stroke="#444"
          />
          <text 
            x="0" 
            y="0" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            fill={value < 0 ? '#ff4444' : '#44ff44'} 
            fontSize="9"
            fontFamily="monospace"
          >
            {value.toFixed(2)}°
          </text>
        </g>

        <circle 
          cx="85" 
          cy="15" 
          r="3" 
          fill={Math.abs(value) < 2.5 ? '#22c55e' : '#ef4444'}
        />

        <text 
          x="50" 
          y="20" 
          textAnchor="middle" 
          fill="white" 
          fontSize="8"
          fontWeight="bold"
        >
          {type}
        </text>
      </svg>
    </div>
  );
};

const PreciseCompass = ({ heading }) => {
  const normalizedHeading = ((heading % 360) + 360) % 360;

  // Generate tick marks
  const generateTicks = () => {
    const ticks = [];
    for (let i = 0; i < 360; i += 5) {
      const isLong = i % 30 === 0;
      const isMedium = i % 10 === 0;
      const rad = (i * Math.PI) / 180;
      const innerRadius = isLong ? 32 : (isMedium ? 34 : 36);
      const outerRadius = 40;
      const x1 = Math.sin(rad) * innerRadius;
      const y1 = -Math.cos(rad) * innerRadius;
      const x2 = Math.sin(rad) * outerRadius;
      const y2 = -Math.cos(rad) * outerRadius;
      
      ticks.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="white"
          strokeWidth={isLong ? 1.5 : 1}
          opacity={isLong ? 1 : (isMedium ? 0.8 : 0.5)}
        />
      );
    }
    return ticks;
  };

  return (
    <div className="relative w-40 h-40">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background */}
        <circle cx="50" cy="50" r="50" fill="#1a1a1a" />
        <circle cx="50" cy="50" r="48" fill="#000000" />
        
        {/* Outer ring */}
        <circle 
          cx="50" 
          cy="50" 
          r="42" 
          fill="none" 
          stroke="#333333" 
          strokeWidth="1" 
        />

        {/* Rotating compass elements */}
        <g transform={`translate(50 50) rotate(${-normalizedHeading})`}>
          {/* Tick marks */}
          {generateTicks()}
          
          {/* Cardinal directions */}
          {['N'].map((direction, i) => {
            const angle = i * 90;
            const rad = (angle * Math.PI) / 180;
            const x = Math.sin(rad) * 28;
            const y = -Math.cos(rad) * 28;
            
            return (
              <text
                key={direction}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="8"
                fontWeight="bold"
                transform={`rotate(${angle}) rotate(${-angle} ${x} ${y})`}
              >
                {direction}
              </text>
            );
          })}
        </g>

        {/* Fixed red triangle marker */}
        <path
          d="M50 10 L53 15 L47 15 Z"
          fill="#ff0000"
        />

        {/* Digital readout */}
        <g transform="translate(50, 50)">
          <rect
            x="-15"
            y="-8"
            width="30"
            height="16"
            fill="black"
            stroke="#333333"
            strokeWidth="1"
            rx="2"
          />
          <text
            x="0"
            y="2"
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontFamily="monospace"
          >
            {normalizedHeading.toFixed(1)}°
          </text>
        </g>
      </svg>
    </div>
  );
};

// Main component that receives telemetryData
const Dials = ({ telemetryData }) => {
  // Extract required values from telemetryData with fallbacks
  const {
    roll = 0,
    pitch = 0,
    yaw = 0,
    heading = 0
  } = telemetryData || {};

  return (
    <div className="flex gap-6 p-6 bg-zinc-900 rounded-lg items-center">
      <AttitudeDial value={roll} type="ROLL" />
      <AttitudeDial value={pitch} type="PITCH" />
      <AttitudeDial value={yaw} type="YAW" />
      <PreciseCompass heading={heading} />
    </div>
  );
};

export default Dials;