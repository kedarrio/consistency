import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const PromiseFlash = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-bg-primary flex items-center justify-center p-8 z-[1000]"
    >
      <div className="text-center space-y-6 max-w-lg">
        <motion.p 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-2xl md:text-3xl font-heading text-accent-primary italic"
        >
          "{user?.promise}"
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-text-secondary font-body text-sm uppercase tracking-widest"
        >
          One day at a time.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default PromiseFlash;
