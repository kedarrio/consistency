import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ 
  progress, 
  variant = 'mini', 
  color = 'var(--color-accent-primary)',
  className = '' 
}) => {
  const height = variant === 'large' ? 'h-[10px]' : 'h-[6px]';
  
  return (
    <div className={`w-full ${height} bg-black/25 rounded-full overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default ProgressBar;
