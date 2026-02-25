import React from 'react';
import { motion } from 'framer-motion';

const SegmentedPicker = ({ options, value, onChange, className = '' }) => {
  return (
    <div className={`bg-bg-surface p-0.5 rounded-[10px] flex relative ${className}`}>
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`relative flex-1 py-2 px-4 text-bodySmall font-body transition-colors duration-200 z-10 ${isActive ? 'text-white' : 'text-text-secondary'}`}
          >
            {isActive && (
              <motion.div
                layoutId="segmented-picker-active"
                className="absolute inset-0 bg-accent-primary rounded-lg -z-10"
                transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
              />
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedPicker;
