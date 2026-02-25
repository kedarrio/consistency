import React from 'react';
import { motion } from 'framer-motion';

const Toggle = ({ isOn, onToggle, disabled = false }) => {
  return (
    <div 
      className={`w-[51px] h-[31px] rounded-full flex items-center p-[2px] cursor-pointer transition-colors duration-250 ${isOn ? 'bg-accent-primary' : 'bg-border-default'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => !disabled && onToggle(!isOn)}
    >
      <motion.div
        className="w-[27px] h-[27px] bg-white rounded-full shadow-button"
        animate={{ x: isOn ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
};

export default Toggle;
