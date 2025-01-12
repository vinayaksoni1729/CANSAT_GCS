import React from 'react';

const AttitudeDial = ({ value, type }) => {
  // Normalize value between -90 and 90
  const normalizedValue = Math.max(-90, Math.min(90, value));
  
  return (
    <div className="relative w-40 h-40">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          {/* Clipping path for the main dial */}
          <clipPath id={`clip-${type}`}>
            <circle cx="50" cy="50" r="46" />
          </clipPath>
        </defs>

        {/* Main dial background */}
        <circle cx="50" cy="50" r="50" fill="#1a1a1a" />
        <circle cx="50" cy="50" r="48" fill="#000000" />
        
        {/* Inner content area with clipping */}
        <g clipPath={`url(#clip-${type})`}>
          {/* Rotating horizon background */}
          <g transform={`translate(50 50) rotate(${type === 'ROLL' ? -normalizedValue : 0})`}>
            {/* Sky */}
            <path 
              d={`M-46 ${type === 'PITCH' ? normalizedValue : 0} 
                   L46 ${type === 'PITCH' ? normalizedValue : 0} 
                   L46 -46 L-46 -46 Z`} 
              fill="#0077be" 
            />
            {/* Ground */}
            <path 
              d={`M-46 ${type === 'PITCH' ? normalizedValue : 0} 
                   L46 ${type === 'PITCH' ? normalizedValue : 0} 
                   L46 46 L-46 46 Z`} 
              fill="#2d5a2d" 
            />
            
            {/* Degree markers */}
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

          {/* Center fixed reference */}
          <g>
            <line x1="35" y1="50" x2="45" y2="50" stroke="yellow" strokeWidth="2" />
            <line x1="55" y1="50" x2="65" y2="50" stroke="yellow" strokeWidth="2" />
            <circle cx="50" cy="50" r="1.5" fill="yellow" />
          </g>
        </g>

        {/* Outer ring overlay */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="#333" strokeWidth="1" />
        
        {/* Digital readout box */}
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

        {/* Status LED */}
        <circle 
          cx="85" 
          cy="15" 
          r="3" 
          fill={Math.abs(value) < 2.5 ? '#22c55e' : '#ef4444'}
        />

        {/* Label */}
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

// CompassDial component remains exactly the same...
const CompassDial = ({ heading }) => {
    const normalizedHeading = ((heading % 360) + 360) % 360;
    
    return (
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <clipPath id="compass-clip">
              <circle cx="50" cy="50" r="46" />
            </clipPath>
          </defs>
  
          {/* Main dial background */}
          <circle cx="50" cy="50" r="50" fill="#1a1a1a" />
          <circle cx="50" cy="50" r="48" fill="#000000" />
          
          {/* Compass content with clipping */}
          <g clipPath="url(#compass-clip)">
            {/* Compass background */}
            <circle cx="50" cy="50" r="46" fill="#111" />
            
            {/* Rotating compass rose */}
            <g transform={`translate(50 50) rotate(${-normalizedHeading})`}>
              {/* Cardinal directions background circles */}
              {[0, 90, 180, 270].map((deg) => (
                <circle
                  key={deg}
                  cx="0"
                  cy="-38"
                  r="8"
                  fill="#222"
                  transform={`rotate(${deg})`}
                />
              ))}
  
              {/* Main degree markers and numbers */}
              {[...Array(36)].map((_, i) => {
                const deg = i * 10;
                const isCardinal = deg % 90 === 0;
                const isMajor = deg % 30 === 0;
                
                return (
                  <g key={deg}>
                    {/* Degree line */}
                    <line 
                      x1="0" 
                      y1="-44" 
                      x2="0" 
                      y2={isCardinal ? "-32" : isMajor ? "-36" : "-40"} 
                      stroke="white" 
                      strokeWidth={isCardinal ? "2" : isMajor ? "1.5" : "1"} 
                      transform={`rotate(${deg})`} 
                    />
                    
                    {/* Cardinal directions */}
                    {isCardinal && (
                      <g transform={`rotate(${deg})`}>
                        <text 
                          x="0" 
                          y="-36" 
                          fill="white" 
                          fontSize="12" 
                          fontWeight="bold"
                          textAnchor="middle" 
                          dominantBaseline="middle"
                          transform={`rotate(${-deg})`}
                        >
                          {deg === 0 ? 'N' : deg === 90 ? 'E' : deg === 180 ? 'S' : 'W'}
                        </text>
                      </g>
                    )}
                    
                    {/* Degree numbers */}
                    {!isCardinal && isMajor && (
                      <g transform={`rotate(${deg})`}>
                        <text 
                          x="0" 
                          y="-32" 
                          fill="white" 
                          fontSize="7" 
                          textAnchor="middle" 
                          dominantBaseline="middle"
                          transform={`rotate(${-deg})`}
                        >
                          {deg === 0 ? '360' : deg}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
  
              {/* 5-degree markers */}
              {[...Array(72)].map((_, i) => {
                const deg = i * 5;
                if (deg % 10 !== 0) {
                  return (
                    <line 
                      key={deg}
                      x1="0" 
                      y1="-44" 
                      x2="0" 
                      y2="-41" 
                      stroke="white" 
                      strokeWidth="0.5" 
                      transform={`rotate(${deg})`} 
                    />
                  );
                }
                return null;
              })}
            </g>
  
            {/* Fixed heading indicator triangle */}
            <g>
              <path 
                d="M50 6 L44 16 L56 16 Z" 
                fill="#ff0000" 
                stroke="#880000"
                strokeWidth="0.5"
              />
            </g>
  
            {/* Fixed lubber lines */}
            <g>
              <line x1="50" y1="16" x2="50" y2="24" stroke="#ff0000" strokeWidth="1.5" />
              <line x1="46" y1="20" x2="54" y2="20" stroke="#ff0000" strokeWidth="1.5" />
            </g>
          </g>
  
          {/* Outer ring overlay */}
          <circle cx="50" cy="50" r="46" fill="none" stroke="#333" strokeWidth="1" />
          
          {/* Digital readout box */}
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
              fill="white" 
              fontSize="9"
              fontFamily="monospace"
            >
              {normalizedHeading.toFixed(1)}°
            </text>
          </g>
  
          {/* Label */}
          <text 
            x="50" 
            y="20" 
            textAnchor="middle" 
            fill="white" 
            fontSize="8"
            fontWeight="bold"
          >
            HDG
          </text>
        </svg>
      </div>
    );
  };
const FlightDials = ({ roll = 200, pitch = 100, yaw =200, heading = 0 }) => {
  return (
    <div className="flex gap-6 p-6 bg-zinc-900 rounded-lg items-center">
      <AttitudeDial value={roll} type="ROLL" />
      <AttitudeDial value={pitch} type="PITCH" />
      <AttitudeDial value={yaw} type="YAW" />
      <CompassDial heading={heading} />
    </div>
  );
};

export default FlightDials;