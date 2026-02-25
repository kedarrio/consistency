import React from 'react';

const Slider = ({ 
  label, 
  min = 0, 
  max = 10, 
  value, 
  onChange, 
  leftLabel, 
  rightLabel,
  className = '' 
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {label && (
        <label className="text-caption text-text-secondary uppercase tracking-wider font-body">
          {label}
        </label>
      )}
      
      <div className="relative w-full h-8 flex items-center">
        {/* Track */}
        <div className="absolute w-full h-1 bg-border-default rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent-primary" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* Native Slider for interaction (invisible but clickable) */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        {/* Custom Thumb */}
        <div 
          className="absolute w-[22px] h-[22px] bg-white rounded-full shadow-[0px_2px_6px_rgba(0,0,0,0.3)] pointer-events-none transition-all"
          style={{ 
            left: `calc(${percentage}% - 11px)`
          }}
        />
      </div>

      {(leftLabel || rightLabel) && (
        <div className="flex justify-between text-caption text-text-secondary font-body">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      )}
    </div>
  );
};

export default Slider;
