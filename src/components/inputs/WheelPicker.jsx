import React, { useRef, useEffect, useState } from 'react';

const WheelPicker = ({ options, value, onChange, height = 200, itemHeight = 40 }) => {
  const scrollRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const index = options.findIndex(opt => opt.value === value);
    if (index !== -1 && scrollRef.current) {
      scrollRef.current.scrollTop = index * itemHeight;
      setScrollTop(index * itemHeight);
    }
  }, [value, options, itemHeight]);

  const handleScroll = (e) => {
    const currentScrollTop = e.target.scrollTop;
    setScrollTop(currentScrollTop);
    
    const index = Math.round(currentScrollTop / itemHeight);
    if (options[index] && options[index].value !== value) {
      onChange(options[index].value);
    }
  };

  const centerOffset = height / 2 - itemHeight / 2;

  return (
    <div 
      className="relative overflow-hidden bg-bg-surface" 
      style={{ height: `${height}px` }}
    >
      {/* Selection Highlight Lines */}
      <div 
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 border-y border-accent-primary/30 pointer-events-none z-20"
        style={{ height: `${itemHeight}px` }}
      />
      
      {/* Top and Bottom Fades */}
      <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-bg-surface to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-bg-surface to-transparent pointer-events-none z-10" />

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide py-[80px]"
        style={{ 
          scrollPaddingTop: `${centerOffset}px`, 
          scrollPaddingBottom: `${centerOffset}px`,
          paddingTop: `${centerOffset}px`,
          paddingBottom: `${centerOffset}px`,
        }}
      >
        {options.map((option, i) => {
          const distance = Math.abs(scrollTop - i * itemHeight);
          const opacity = Math.max(0.3, 1 - distance / (height / 2));
          const scale = Math.max(0.8, 1 - distance / height);
          
          return (
            <div
              key={option.value}
              className={`h-[${itemHeight}px] flex items-center justify-center snap-center transition-all duration-100 font-body`}
              style={{ 
                opacity,
                transform: `scale(${scale})`,
                height: `${itemHeight}px`,
                color: value === option.value ? 'var(--color-text-primary)' : 'var(--color-text-placeholder)',
                fontSize: value === option.value ? '18px' : '14px',
                fontWeight: value === option.value ? '600' : '400'
              }}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WheelPicker;
