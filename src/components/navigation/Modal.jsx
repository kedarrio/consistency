import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ isOpen, onClose, title, children, showClose = true }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[200] p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[480px] bg-bg-surface rounded-card shadow-modal p-6 z-[210] overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6">
              {title && (
                <h2 className="text-[24px] font-heading font-semibold text-white">
                  {title}
                </h2>
              )}
              {showClose && (
                <button 
                  onClick={onClose} 
                  className="p-1 text-text-secondary hover:text-white transition-colors"
                >
                  <CloseIcon />
                </button>
              )}
            </div>

            <div className="text-text-primary">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
