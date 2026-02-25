import React, { useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false, 
  loading = false,
  className = '',
  type = 'button',
  icon: Icon
}) => {
  const [ripples, setRipples] = useState([]);

  const baseStyles = "relative flex items-center justify-center font-body transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-accent-primary text-white py-4 px-6 rounded-buttonLg shadow-button min-h-[56px] hover:bg-accent-hover disabled:bg-accent-disabled",
    secondary: "bg-transparent border-2 border-accent-primary text-accent-primary py-[14px] px-[22px] rounded-buttonLg min-h-[56px] hover:bg-[rgba(219,134,134,0.15)] disabled:border-accent-disabled disabled:text-accent-disabled",
    danger: "bg-status-error text-white py-4 px-6 rounded-buttonLg shadow-button min-h-[56px] hover:bg-[#DC2626] disabled:opacity-50",
    icon: "p-2 rounded-full text-text-secondary hover:bg-[#3A3A3A30] active:text-accent-primary min-w-[44px] min-h-[44px]",
    fab: "fixed bottom-[76px] right-4 w-14 h-14 bg-accent-primary text-white rounded-full shadow-fab hover:-translate-y-0.5 hover:shadow-[0px_8px_20px_rgba(0,0,0,0.3)] z-50",
    quickAction: "w-12 h-12 rounded-full flex items-center justify-center shadow-button transition-transform"
  };

  const currentVariant = variants[variant] || variants.primary;

  const createRipple = (event) => {
    if (disabled || loading) return;

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size
    };

    setRipples((prev) => [...prev, newRipple]);
    
    // Cleanup ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <motion.button
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      type={type}
      onMouseDown={createRipple}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${currentVariant} ${className}`}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.35 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute bg-white rounded-full pointer-events-none"
            style={{
              width: ripple.size,
              height: ripple.size,
              top: ripple.y,
              left: ripple.x,
            }}
          />
        ))}
      </AnimatePresence>
      
      <div className="relative z-10 flex items-center justify-center">
        {loading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            {Icon && <Icon className={`${children ? 'mr-2' : ''} !text-[24px]`} />}
            {children}
          </>
        )}
      </div>
    </motion.button>
  );
};

export default Button;
