import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import EditIcon from '@mui/icons-material/Edit';

const HabitCard = ({
  habit,
  onAction,
  onClick,
  onGoalReached,
  isActive = false,
  elapsedTime = "00m00s"
}) => {
  const {
    name,
    icon: Icon,
    color,
    consistency = "0%",
    subLabel = "this week",
    todayCount = "0/0",
    progress = 0,
    type = "session"
  } = habit;

  const prevProgress = useRef(progress);

  useEffect(() => {
    if (prevProgress.current < 100 && progress >= 100) {
      onGoalReached?.();
    }
    prevProgress.current = progress;
  }, [progress, onGoalReached]);

  const bgColorClass = `bg-habits-${color}`;
  const fillIndicatorColor = `var(--color-habit-${color}-dark)`;

  const renderQuickAction = () => {
    switch (type) {
      case 'session':
        return (
          <div className="flex flex-col items-center gap-1">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); onAction?.('toggle'); }}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-button transition-all ${isActive ? 'bg-white text-bg-primary' : 'bg-accent-primary text-white'}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isActive ? 'pause' : 'play'}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isActive ? <PauseIcon /> : <PlayArrowIcon />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
            <span className="text-[12px] font-body text-text-onLight">
              {isActive ? elapsedTime : "start"}
            </span>
          </div>
        );
      case 'incremental':
        return (
          <div className="flex items-center gap-2">
             <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); onAction?.('decrement'); }}
              className="w-10 h-10 rounded-full border border-text-onLight flex items-center justify-center text-text-onLight hover:bg-black/5"
            >
              <RemoveIcon fontSize="small" />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); onAction?.('increment'); }}
              className="w-10 h-10 rounded-full border border-text-onLight flex items-center justify-center text-text-onLight hover:bg-black/5"
            >
              <AddIcon fontSize="small" />
            </motion.button>
          </div>
        );
      case 'streak':
        return (
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); onAction?.('reset'); }}
            className="w-11 h-11 flex items-center justify-center text-text-onLight hover:bg-black/5 rounded-full"
          >
            <HeartBrokenIcon />
          </motion.button>
        );
      case 'manual':
        return (
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); onAction?.('edit'); }}
            className="w-11 h-11 flex items-center justify-center text-text-onLight hover:bg-black/5 rounded-full"
          >
            <EditIcon />
          </motion.button>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative min-h-[130px] rounded-card shadow-card flex flex-col justify-between overflow-hidden cursor-pointer mb-3 ${bgColorClass}`}
    >
      <div className="pt-5 px-5 flex justify-between items-start">
        <div className="flex flex-col">
          <motion.span 
            key={consistency}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[32px] font-heading font-semibold text-text-onLight leading-tight"
          >
            {consistency}
          </motion.span>
          <span className="text-[12px] font-body text-text-onLight opacity-70">
            {subLabel}
          </span>
        </div>
        {renderQuickAction()}
      </div>

      <div className="px-5 pb-3 flex justify-between items-end">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-black/10 flex items-center justify-center">
            {Icon && <Icon className="text-text-onLight !text-[20px]" />}
          </div>
          <span className="text-[20px] font-heading font-semibold text-text-onLight">
            {name}
          </span>
        </div>
        <div className="text-text-onLight font-body text-[14px]">
          <span>Today: </span>
          <motion.span 
            key={todayCount}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="font-semibold inline-block"
          >
            {todayCount}
          </motion.span>
        </div>
      </div>

      <div className="h-[6px] w-full bg-black/20 overflow-hidden rounded-b-card">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-full ${progress >= 100 ? 'animate-pulse' : ''}`}
          style={{ backgroundColor: fillIndicatorColor }}
        />
      </div>
    </motion.div>
  );
};

export default HabitCard;
