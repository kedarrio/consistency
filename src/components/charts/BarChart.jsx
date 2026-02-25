import React from 'react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const BarChart = ({ data, color = 'var(--color-accent-primary)' }) => {
  return (
    <div className="w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart data={data}>
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
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{ 
              backgroundColor: 'var(--color-bg-elevated)', 
              border: '1px solid var(--color-border-default)',
              borderRadius: '8px',
              fontFamily: 'IBM Plex Mono',
              fontSize: '12px'
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || color} />
            ))}
          </Bar>
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
