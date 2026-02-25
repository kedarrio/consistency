import React from 'react';
import { motion } from 'framer-motion';

const Toggle = ({ isOn, onToggle, disabled = false }) => {
  return (
    <motion.div 
      animate={{ 
        backgroundColor: isOn ? 'var(--color-accent-primary)' : '#3A3A3A' 
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={`w-[51px] h-[31px] rounded-full flex items-center p-[2px] cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => !disabled && onToggle(!isOn)}
    >
      <motion.div
        className="w-[27px] h-[27px] bg-white rounded-full shadow-button"
        animate={{ x: isOn ? 20 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default Toggle;
