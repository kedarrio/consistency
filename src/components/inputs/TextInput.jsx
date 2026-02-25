import React from 'react';

const TextInput = ({ 
  label, 
  error, 
  unit, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-caption text-text-secondary uppercase tracking-wider font-body">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          className={`w-full bg-bg-surface border rounded-input p-3 font-body text-body text-white placeholder-text-placeholder min-h-[48px] transition-all outline-none
            ${error ? 'border-status-error focus:border-status-error' : 'border-border-default focus:border-accent-primary focus:border-2'}
            ${props.disabled ? 'bg-[#0F0F0F] text-text-placeholder cursor-not-allowed' : ''}
            ${unit ? 'pr-16' : ''}
          `}
          {...props}
        />
        {unit && (
          <span className="absolute right-3 text-text-placeholder font-body text-bodySmall pointer-events-none">
            {unit}
          </span>
        )}
      </div>
      {error && (
        <span className="text-caption text-status-error font-body">{error}</span>
      )}
    </div>
  );
};

export default TextInput;
