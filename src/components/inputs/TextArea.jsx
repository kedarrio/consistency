import React from 'react';

const TextArea = ({ 
  label, 
  error, 
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
      <textarea
        className={`w-full bg-bg-surface border rounded-input p-3 font-body text-body text-white placeholder-text-placeholder min-h-[100px] transition-all outline-none resize-none
          ${error ? 'border-status-error focus:border-status-error' : 'border-border-default focus:border-accent-primary focus:border-2'}
          ${props.disabled ? 'bg-[#0F0F0F] text-text-placeholder cursor-not-allowed' : ''}
        `}
        {...props}
      />
      {error && (
        <span className="text-caption text-status-error font-body">{error}</span>
      )}
    </div>
  );
};

export default TextArea;
