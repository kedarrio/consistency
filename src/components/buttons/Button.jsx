import React from 'react';
import { motion } from 'framer-motion';

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
  const baseStyles = "relative flex items-center justify-center font-body transition-all duration-200 focus:outline-none disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-accent-primary text-white py-4 px-6 rounded-buttonLg shadow-button min-h-[56px] hover:bg-accent-hover disabled:bg-accent-disabled",
    secondary: "bg-transparent border-2 border-accent-primary text-accent-primary py-[14px] px-[22px] rounded-buttonLg min-h-[56px] hover:bg-[rgba(219,134,134,0.15)] disabled:border-accent-disabled disabled:text-accent-disabled",
    danger: "bg-status-error text-white py-4 px-6 rounded-buttonLg shadow-button min-h-[56px] hover:bg-[#DC2626] disabled:opacity-50",
    icon: "p-2 rounded-full text-text-secondary hover:bg-[#3A3A3A30] active:text-accent-primary min-w-[44px] min-h-[44px]",
    fab: "fixed bottom-[76px] right-4 w-14 h-14 bg-accent-primary text-white rounded-full shadow-fab hover:-translate-y-0.5 hover:shadow-[0px_8px_20px_rgba(0,0,0,0.3)] z-50",
    quickAction: "w-12 h-12 rounded-full flex items-center justify-center shadow-button transition-transform"
  };

  const currentVariant = variants[variant] || variants.primary;

  return (
    <motion.button
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${currentVariant} ${className}`}
    >
      {loading ? (
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <>
          {Icon && <Icon className={`${children ? 'mr-2' : ''} !text-[24px]`} />}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;
