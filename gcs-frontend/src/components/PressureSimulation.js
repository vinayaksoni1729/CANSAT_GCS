import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';

const PressureSimulation = ({ teamId = '1022', onSendCommand }) => {
  const [pressureData, setPressureData] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [simulationCommands, setSimulationCommands] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const intervalRef = useRef();
  const [yAxisDomain, setYAxisDomain] = useState([80000, 100000]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file.name);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const commands = text
          .split('\n')
          .filter(line => line.trim() && !line.startsWith('#'))
          .map(line => {
            const parts = line.split(',');
            return parts.length === 4 ? Number(parts[3]) : null;
          })
          .filter(pressure => pressure !== null);
        setSimulationCommands(commands);
        setPressureData([]);
        
        // Set initial Y-axis domain based on data range
        const minPressure = Math.min(...commands);
        const maxPressure = Math.max(...commands);
        const padding = (maxPressure - minPressure) * 0.1;
        setYAxisDomain([
          Math.floor(minPressure - padding),
          Math.ceil(maxPressure + padding)
        ]);
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    if (isSimulating && currentLine < simulationCommands.length) {
      intervalRef.current = setInterval(() => {
        const pressure = simulationCommands[currentLine];
        const command = `CMD,${teamId},SIMP,${pressure}`;
        onSendCommand(command);
        
        setPressureData(prev => {
          const newData = [...prev, {
            time: currentLine,
            pressure: pressure
          }];
          return newData;
        });
        
        setCurrentLine(prev => prev + 1);
        
        if (currentLine === simulationCommands.length - 1) {
          setIsSimulating(false);
          clearInterval(intervalRef.current);
        }
      }, 1000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isSimulating, currentLine, teamId, onSendCommand, simulationCommands]);

  const handleSimulationToggle = () => {
    if (isSimulating) {
      setIsSimulating(false);
      clearInterval(intervalRef.current);
    } else {
      setPressureData([]);
      setCurrentLine(0);
      setIsSimulating(true);
    }
  };

  return (
    <div className="p-4 bg-slate-800 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold">PRESSURE SIMULATION</h3>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <button 
              className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600"
              onClick={() => document.getElementById('fileInput').click()}
            >
              Browse...
            </button>
            <span className="text-white">{selectedFile || 'No file selected'}</span>
            <input
              id="fileInput"
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          <button
            onClick={handleSimulationToggle}
            className={`px-4 py-2 rounded ${
              isSimulating 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-emerald-500 hover:bg-emerald-600'
            } text-white`}
            disabled={simulationCommands.length === 0}
          >
            {isSimulating ? 'Stop' : 'Start'} Simulation
          </button>
        </div>
      </div>
      
      <div className="h-48 bg-slate-900 p-4 rounded">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={pressureData}
            margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#4b5563" 
              tick={{ fill: '#4b5563' }}
              type="number"
              domain={[0, Math.max(20, currentLine)]}
              allowDataOverflow={true}
            />
            <YAxis 
              stroke="#4b5563" 
              tick={{ fill: '#4b5563' }}
              domain={yAxisDomain}
              allowDataOverflow={true}
              tickCount={7}
            />
            <Line 
              type="monotone" 
              dataKey="pressure" 
              stroke="#3b82f6" 
              dot={false}
              isAnimationActive={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PressureSimulation;