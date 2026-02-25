import React from 'react';
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineChart = ({ data, color = 'var(--color-accent-primary)' }) => {
  return (
    <div className="w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-divider)" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 12, fontFamily: 'IBM Plex Mono' }} 
            dy={10}
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--color-bg-elevated)', 
              border: '1px solid var(--color-border-default)',
              borderRadius: '8px',
              fontFamily: 'IBM Plex Mono',
              fontSize: '12px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={3} 
            dot={{ fill: color, strokeWidth: 2, r: 4, stroke: 'var(--color-bg-primary)' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
