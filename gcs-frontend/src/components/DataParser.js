import { useState, useEffect } from 'react';

// Define the standard data structure
const initialTelemetryState = {
  altitude: 0,
  temperature: 0,
  pressure: 0,
  latitude: 0,
  longitude: 0,
  pitch: 0,
  roll: 0,
  yaw: 0,
  timestamp: null
};

export const useDataParser = () => {
  const [telemetry, setTelemetry] = useState(initialTelemetryState);
  
  // Parse incoming data into standard format
  const parseData = (rawData) => {
    try {
      // Assuming CSV data has headers matching our desired fields
      // If not, you'll need to map the fields accordingly
      const parsedData = {
        ...initialTelemetryState,
        ...rawData,
        timestamp: rawData.timestamp || new Date().toISOString()
      };
      
      // Ensure all numeric fields are actually numbers
      Object.keys(parsedData).forEach(key => {
        if (key !== 'timestamp') {
          parsedData[key] = Number(parsedData[key]) || 0;
        }
      });
      
      setTelemetry(parsedData);
      return parsedData;
    } catch (error) {
      console.error('Error parsing telemetry data:', error);
      return initialTelemetryState;
    }
  };

  return {
    telemetry,
    parseData
  };
};