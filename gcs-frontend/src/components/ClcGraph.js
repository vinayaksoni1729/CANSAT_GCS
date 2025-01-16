import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const ClcGraph = ({ telemetryData }) => {
  const [dataPoints, setDataPoints] = useState([
    { x: 0, y: 0, z: 0 }  // Starting at origin
  ]);

  useEffect(() => {
    if (telemetryData) {
      const newPoint = {
        x: telemetryData.longitude || 0,
        y: telemetryData.latitude || 0,
        z: telemetryData.altitude || 0
      };

      setDataPoints(prev => {
        // Keep last 100 points to prevent performance issues
        const points = [...prev, newPoint];
        if (points.length > 100) {
          return points.slice(-100);
        }
        return points;
      });
    }
  }, [telemetryData]);

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <Plot
        data={[
          {
            x: dataPoints.map(point => point.x),
            y: dataPoints.map(point => point.y),
            z: dataPoints.map(point => point.z),
            mode: 'lines+markers',
            type: 'scatter3d',
            marker: { 
              color: '#3b82f6',
              size: 3 
            },
            line: {
              color: '#60a5fa',
              width: 3
            }
          }
        ]}
        layout={{
          width: 630,
          height: 470,
          title: {
            text: '3D Live Flight Path',
            font: {
              color: '#ffffff',
              family: 'system-ui'
            }
          },
          paper_bgcolor: '#18181b',
          plot_bgcolor: '#18181b',
          scene: {
            xaxis: {
              title: 'Longitude',
              gridcolor: '#27272a',
              zerolinecolor: '#3f3f46',
              showbackground: true,
              backgroundcolor: '#18181b',
              color: '#ffffff'
            },
            yaxis: {
              title: 'Latitude',
              gridcolor: '#27272a',
              zerolinecolor: '#3f3f46',
              showbackground: true,
              backgroundcolor: '#18181b',
              color: '#ffffff'
            },
            zaxis: {
              title: 'Altitude (m)',
              gridcolor: '#27272a',
              zerolinecolor: '#3f3f46',
              showbackground: true,
              backgroundcolor: '#18181b',
              color: '#ffffff'
            },
            camera: {
              eye: { x: 1.5, y: 1.5, z: 1.5 }
            }
          },
          margin: {
            l: 0,
            r: 0,
            t: 40,
            b: 0
          },
          showlegend: false,
          font: {
            color: '#ffffff',
            family: 'system-ui'
          }
        }}
        config={{
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToRemove: [
            'toImage',
            'sendDataToCloud',
            'editInChartStudio',
            'toggleHover',
            'toggleSpikelines'
          ],
          modeBarStyle: {
            bgcolor: 'transparent',
            color: '#ffffff'
          }
        }}
      />
    </div>
  );
};

export default ClcGraph;