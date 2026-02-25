import React from 'react';
import { format, isSameDay, isAfter } from 'date-fns';
import { getHeatMapColor } from '../../utils/calculations';

const HeatMapCell = ({ date, percentage, isSelected, onClick, isCurrentMonth }) => {
  const isToday = isSameDay(date, new Date());
  const isFuture = isAfter(date, new Date());

  return (
    <div
      onClick={() => !isFuture && onClick(date)}
      className={`relative aspect-square rounded-md flex items-center justify-center transition-all ${
        !isCurrentMonth ? 'opacity-20' : ''
      } ${isFuture ? 'opacity-40 cursor-default' : 'cursor-pointer'}`}
      style={{ 
        backgroundColor: getHeatMapColor(percentage),
        border: isSelected ? '2px solid var(--color-accent-primary)' : isToday ? '2px solid white' : 'none'
      }}
    >
      <span className={`text-[13px] font-body ${isCurrentMonth ? 'text-white' : 'text-text-placeholder'}`}>
        {format(date, 'd')}
      </span>
    </div>
  );
};

export default HeatMapCell;
