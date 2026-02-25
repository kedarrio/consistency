import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ className = '', width, height }) => {
  return (
    <div 
      className={`relative overflow-hidden bg-bg-surface rounded-md ${className}`}
      style={{ width, height }}
    >
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
      />
    </div>
  );
};

export const HabitCardSkeleton = () => (
  <div className="bg-bg-surface border border-border-default rounded-card p-5 space-y-4 mb-3 h-[130px]">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <Skeleton width="60px" height="32px" />
        <Skeleton width="80px" height="12px" />
      </div>
      <Skeleton width="44px" height="44px" className="rounded-full" />
    </div>
    <div className="flex justify-between items-end">
      <div className="flex items-center gap-2">
        <Skeleton width="36px" height="36px" className="rounded-lg" />
        <Skeleton width="100px" height="20px" />
      </div>
      <Skeleton width="60px" height="14px" />
    </div>
  </div>
);

export default Skeleton;
