import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const TelemetryGraph = ({ 
  data, 
  title, 
  color = "#9333ea",
  unit = "",
  maxPoints = 30
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chartInstance.current || !data) return;

    const values = data.slice(-maxPoints);
    const xData = values.map(item => item.packet);
    const yData = values.map(item => item.value);

    const maData = yData.map((val, idx, arr) => {
      if (idx < 2) return val;
      return (arr[idx - 2] + arr[idx - 1] + val) / 3;
    });

    const minVal = Math.min(...yData);
    const maxVal = Math.max(...yData);
    const range = maxVal - minVal;
    const padding = range * 0.1;

    const option = {
      animation: false,
      grid: {
        top: 25,      // Reduced from 40
        bottom: 25,   // Reduced from 40
        left: 40,     // Reduced from 60
        right: 10,    // Reduced from 20
        containLabel: true
      },
      title: {
        show: false  // Removed title from chart
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        },
        formatter: (params) => {
          const value = params[0].value;
          return `${title}: ${value.toFixed(2)}${unit}<br/>Packet: ${params[0].name}`;
        }
      },
      xAxis: {
        type: 'category',
        data: xData,
        boundaryGap: false,
        axisLine: {
          lineStyle: { color: '#4B5563' }
        },
        axisLabel: {
          color: '#4B5563',
          fontSize: 10,    // Smaller font
          interval: 'auto' // Auto-select labels to show
        }
      },
      yAxis: {
        type: 'value',
        min: Math.floor(minVal - padding),
        max: Math.ceil(maxVal + padding),
        axisLine: {
          lineStyle: { color: '#4B5563' }
        },
        axisLabel: {
          color: '#4B5563',
          formatter: (value) => `${value}${unit}`,
          fontSize: 10     // Smaller font
        },
        splitLine: {
          lineStyle: { color: '#4B556333' }
        }
      },
      series: [
        {
          name: 'Value',
          type: 'line',
          data: yData,
          symbol: 'none',
          lineStyle: {
            color: color,
            width: 1.5    // Slightly thinner line
          }
        },
        {
          name: 'Moving Average',
          type: 'line',
          data: maData,
          symbol: 'none',
          lineStyle: {
            color: color,
            width: 1,
            opacity: 0.5,
            type: 'dashed'
          }
        }
      ]
    };

    chartInstance.current.setOption(option, true);
  }, [data, title, color, unit, maxPoints]);

  return (
    <div className="w-full space-y-0.5"> {/* Reduced spacing */}
      <div className="text-gray-400 text-xs px-2"> {/* Smaller text, added padding */}
        {title}
      </div>
      <div 
        ref={chartRef} 
        className="h-32" // Reduced from h-48
        style={{ minHeight: '120px' }} // Reduced from 200px
      />
    </div>
  );
};

export default TelemetryGraph;