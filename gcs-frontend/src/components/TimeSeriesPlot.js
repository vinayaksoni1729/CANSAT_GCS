import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const TimeSeriesPlot = ({ telemetryData }) => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    if (telemetryData) {
      const newPoint = {
        time: telemetryData.Time || new Date().toISOString(),
        altitude: telemetryData.Altitude || 0,
        velocity: telemetryData.VerticalVelocity || 0,
        rpm: telemetryData.RPM || 0
      };

      setDataPoints(prev => {
        // Keep last 100 data points to prevent memory issues
        const points = [...prev, newPoint];
        if (points.length > 100) {
          return points.slice(-100);
        }
        return points;
      });
    }
  }, [telemetryData]);

  return (
<div className="bg-slate-800 rounded-lg p-1 max-w-screen-lg mx-auto">
      <Plot
        data={[
          {
            x: dataPoints.map(point => point.time),
            y: dataPoints.map(point => point.altitude),
            mode: 'lines',
            name: 'Altitude',
            line: { color: '#3b82f6', width: 2 }
          },
          {
            x: dataPoints.map(point => point.time),
            y: dataPoints.map(point => point.velocity),
            mode: 'lines',
            name: 'Vertical Velocity',
            line: { color: '#f59e0b', width: 2 }
          },
          {
            x: dataPoints.map(point => point.time),
            y: dataPoints.map(point => point.rpm),
            mode: 'lines',
            name: 'RPM',
            line: { color: '#ef4444', width: 2 }
          }
        ]}
        layout={{
          width: 750,
          height: 330,
          title: {
            text: 'Time-Series Telemetry Data',
            font: { color: '#ffffff', family: 'system-ui' }
          },
          paper_bgcolor: '#18181b',
          plot_bgcolor: '#18181b',
          xaxis: {
            title: 'Time',
            color: '#ffffff',
            gridcolor: '#27272a',
            zerolinecolor: '#3f3f46',
            showgrid: true
          },
          yaxis: {
            title: 'Values',
            color: '#ffffff',
            gridcolor: '#27272a',
            zerolinecolor: '#3f3f46'
          },
          margin: { l: 50, r: 30, t: 50, b: 50 },
          font: { color: '#ffffff' },
          showlegend: true,
          legend: {
            x: 0,
            y: 1,
            bgcolor: '#27272a',
            bordercolor: '#3f3f46'
          }
        }}
        config={{
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToRemove: ['toImage', 'sendDataToCloud'],
          modeBarStyle: {
            bgcolor: 'transparent',
            color: '#ffffff'
          }
        }}
      />
    </div>
  );
};

export default TimeSeriesPlot;
