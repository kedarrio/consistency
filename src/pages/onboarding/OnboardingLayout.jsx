import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OnboardingLayout = ({ step, totalSteps, children }) => {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col pt-8 pb-10 px-6 max-w-lg mx-auto">
      {/* Progress Bar */}
      <div className="flex gap-1.5 justify-center mb-12">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < step ? 'bg-accent-primary' : 'bg-border-default'
            }`}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingLayout;
