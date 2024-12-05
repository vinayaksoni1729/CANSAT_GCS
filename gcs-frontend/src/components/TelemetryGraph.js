import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const TelemetryGraph = ({ data, title, color = "rgb(147, 51, 234)" }) => (
  <div className="h-32">
    <div className="text-gray-400 text-sm mb-1">{title}</div>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="packet" stroke="#4b5563" tick={{ fill: '#4b5563' }} />
        <YAxis stroke="#4b5563" tick={{ fill: '#4b5563' }} />
        <Line type="monotone" dataKey="value" stroke={color} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default TelemetryGraph;
