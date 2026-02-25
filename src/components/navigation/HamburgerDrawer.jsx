import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';

const HamburgerDrawer = ({ isOpen, onClose }) => {
  const habits = [
    { name: 'Meditation', color: '#C9B5E6', path: '/habit/meditation', icon: '🧘' },
    { name: 'Work', color: '#8686A8', path: '/habit/work', icon: '💼' },
    { name: 'Workout', color: '#E69A9A', path: '/habit/workout', icon: '💪' },
    { name: 'Journal', color: '#E6D5C9', path: '/habit/journal', icon: '📓' },
    { name: 'No-Fap', color: '#B5C9B5', path: '/habit/no-fap', icon: '💔' },
    { name: 'Sleep', color: '#9AC4D4', path: '/habit/sleep', icon: '😴' },
    { name: 'Reading', color: '#E6D89A', path: '/habit/reading', icon: '📚' },
    { name: 'Hydration', color: '#9AB5D4', path: '/habit/hydration', icon: '💧' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[190]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[280px] max-w-[80%] bg-bg-surface z-[200] shadow-[-4px_0px_20px_rgba(0,0,0,0.4)] overflow-y-auto"
          >
            <div className="p-4 flex justify-end">
              <button onClick={onClose} className="p-2 text-text-secondary">
                <CloseIcon />
              </button>
            </div>

            <nav className="flex flex-col py-2">
              {habits.map((habit) => (
                <NavLink
                  key={habit.path}
                  to={habit.path}
                  onClick={onClose}
                  className={({ isActive }) => 
                    `flex items-center gap-4 px-5 py-4 font-body text-white transition-colors ${
                      isActive ? 'bg-bg-elevated' : 'hover:bg-bg-elevated'
                    }`
                  }
                >
                  <span className="text-xl" style={{ color: habit.color }}>{habit.icon}</span>
                  <span>{habit.name}</span>
                </NavLink>
              ))}

              <div className="h-[1px] bg-border-divider my-2" />

              <NavLink
                to="/profile"
                onClick={onClose}
                className={({ isActive }) => 
                  `flex items-center gap-4 px-5 py-4 font-body text-white transition-colors ${
                    isActive ? 'bg-bg-elevated' : 'hover:bg-bg-elevated'
                  }`
                }
              >
                <PersonIcon className="text-text-secondary" />
                <span>Profile</span>
              </NavLink>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HamburgerDrawer;
