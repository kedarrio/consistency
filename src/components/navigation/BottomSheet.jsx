import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';

const BottomSheet = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-end justify-center z-[200]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50"
          />
          
          {/* Sheet Container */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-[600px] bg-bg-surface rounded-t-card shadow-modal z-[210] overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-6 border-b border-border-divider flex justify-between items-center shrink-0">
              {title && (
                <h2 className="text-[24px] font-heading font-semibold text-white">
                  {title}
                </h2>
              )}
              <button 
                onClick={onClose} 
                className="p-1 text-text-secondary hover:text-white transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="p-6 overflow-y-auto text-text-primary">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
