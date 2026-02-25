import React from 'react';

const HeatMapCell = ({ 
  percentage = 0, 
  isToday = false, 
  isSelected = false, 
  isFuture = false,
  isCurrentMonth = true,
  label,
  onClick 
}) => {
  
  const getBackgroundColor = (p) => {
    if (p === 0) return '#1A1A1A';
    
    // Using CSS color-mix for smooth interpolation
    // 1-33%: Gradient from #2A1A1A (dark red tint) toward #EF4444
    if (p <= 33) {
      const weight = Math.round((p / 33) * 100);
      return `color-mix(in srgb, #EF4444 ${weight}%, #2A1A1A)`;
    }
    // 34-66%: Gradient from #EF4444 toward #FBBF24
    if (p <= 66) {
      const weight = Math.round(((p - 33) / 33) * 100);
      return `color-mix(in srgb, #FBBF24 ${weight}%, #EF4444)`;
    }
    // 67-100%: Gradient from #FBBF24 toward #4ADE80
    const weight = Math.min(100, Math.round(((p - 66) / 34) * 100));
    return `color-mix(in srgb, #4ADE80 ${weight}%, #FBBF24)`;
  };

  return (
    <div
      onClick={!isFuture ? onClick : undefined}
      className={`
        relative aspect-square rounded-md flex items-center justify-center transition-all duration-200
        ${!isCurrentMonth ? 'opacity-20' : ''}
        ${isFuture ? 'opacity-40 cursor-default' : 'cursor-pointer hover:scale-105 active:scale-95'}
      `}
      style={{ 
        backgroundColor: getBackgroundColor(percentage),
        border: isSelected 
          ? '2px solid var(--color-accent-primary)' 
          : isToday 
            ? '2px solid white' 
            : 'none'
      }}
    >
      <span className={`text-[13px] font-body ${isCurrentMonth ? 'text-white' : 'text-text-placeholder'}`}>
        {label}
      </span>
    </div>
  );
};

export default HeatMapCell;
