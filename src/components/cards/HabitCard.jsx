import React from 'react';
import { motion } from 'framer-motion';
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
  isActive = false,
  elapsedTime = "00m00s"
}) => {
  const {
    name,
    icon: Icon,
    color, // e.g., 'meditation'
    consistency = "0%",
    subLabel = "this week",
    todayCount = "0/0",
    progress = 0,
    type = "session" // session, incremental, streak, manual
  } = habit;

  // Color mapping from tokens
  const bgColorClass = `bg-habits-${color}`;
  
  // Use CSS variable for the filled part of the progress bar
  const fillIndicatorColor = `var(--color-habit-${color}-dark)`;

  const renderQuickAction = () => {
    switch (type) {
      case 'session':
        return (
          <div className="flex flex-col items-center gap-1">
            <button 
              onClick={(e) => { e.stopPropagation(); onAction?.('toggle'); }}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-button transition-all ${isActive ? 'bg-white text-bg-primary' : 'bg-accent-primary text-white'}`}
            >
              {isActive ? <PauseIcon /> : <PlayArrowIcon />}
            </button>
            <span className="text-[12px] font-body text-text-onLight">
              {isActive ? elapsedTime : "start"}
            </span>
          </div>
        );
      case 'incremental':
        return (
          <div className="flex items-center gap-2">
             <button 
              onClick={(e) => { e.stopPropagation(); onAction?.('decrement'); }}
              className="w-10 h-10 rounded-full border border-text-onLight flex items-center justify-center text-text-onLight hover:bg-black/5"
            >
              <RemoveIcon fontSize="small" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onAction?.('increment'); }}
              className="w-10 h-10 rounded-full border border-text-onLight flex items-center justify-center text-text-onLight hover:bg-black/5"
            >
              <AddIcon fontSize="small" />
            </button>
          </div>
        );
      case 'streak':
        return (
          <button 
            onClick={(e) => { e.stopPropagation(); onAction?.('reset'); }}
            className="w-11 h-11 flex items-center justify-center text-text-onLight hover:bg-black/5 rounded-full"
          >
            <HeartBrokenIcon />
          </button>
        );
      case 'manual':
        return (
          <button 
            onClick={(e) => { e.stopPropagation(); onAction?.('edit'); }}
            className="w-11 h-11 flex items-center justify-center text-text-onLight hover:bg-black/5 rounded-full"
          >
            <EditIcon />
          </button>
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
      {/* Top Row */}
      <div className="pt-5 px-5 flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-[32px] font-heading font-semibold text-text-onLight leading-tight">
            {consistency}
          </span>
          <span className="text-[12px] font-body text-text-onLight opacity-70">
            {subLabel}
          </span>
        </div>
        {renderQuickAction()}
      </div>

      {/* Bottom Row */}
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
          <span className="font-semibold">{todayCount}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-[6px] w-full bg-black/20 overflow-hidden rounded-b-card">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full"
          style={{ backgroundColor: fillIndicatorColor }}
        />
      </div>
    </motion.div>
  );
};

export default HabitCard;
