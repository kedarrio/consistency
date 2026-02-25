import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import Stats from './pages/Stats';
import Calendar from './pages/Calendar';
import DayDetail from './pages/DayDetail';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import HabitDetail from './pages/HabitDetail';
import Logs from './pages/Logs';
import Onboarding from './pages/Onboarding';
import PromiseFlash from './pages/onboarding/PromiseFlash';
import DesignSystemTest from './pages/DesignSystemTest';
import BottomNav from './components/navigation/BottomNav';
import TopNav from './components/navigation/TopNav';
import HamburgerDrawer from './components/navigation/HamburgerDrawer';
import StaleSessionModal from './components/navigation/StaleSessionModal';
import NotificationScheduler from './components/navigation/NotificationScheduler';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    className="w-full"
  >
    {children}
  </motion.div>
);

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 1500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-bg-primary z-[2000] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center"
      >
        <div className="w-20 h-20 bg-accent-primary rounded-2xl mx-auto shadow-fab flex items-center justify-center text-white text-3xl font-bold">
          C
        </div>
        <h1 className="text-h2 font-heading font-bold tracking-tight">Consistency</h1>
      </motion.div>
    </motion.div>
  );
};

const AppContent = () => {
  const { onboardingComplete, activeSessions, habits, stopSession } = useApp();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [staleSession, setStaleSession] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  
  const location = useLocation();
  const isOnboarding = location.pathname === '/onboarding';
  const isPromiseFlash = location.pathname === '/promise';

  // Stale session detection
  useEffect(() => {
    if (onboardingComplete) {
      const now = Date.now();
      const twelveHours = 12 * 60 * 60 * 1000;
      
      for (const habitId in activeSessions) {
        const session = activeSessions[habitId];
        if (now - session.startTimestamp > twelveHours) {
          const habit = habits.find(h => h.id === habitId);
          setStaleSession({ ...session, habitName: habit?.name });
          break;
        }
      }
    }
  }, [onboardingComplete, activeSessions, habits]);

  if (!onboardingComplete && !isOnboarding && !isPromiseFlash) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <div className={`min-h-screen bg-bg-primary text-text-primary font-body ${!isOnboarding && !isPromiseFlash ? 'pb-[60px]' : ''}`}>
      <AnimatePresence>
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      </AnimatePresence>

      <NotificationScheduler />

      {!isOnboarding && !isPromiseFlash && (
        <>
          <TopNav 
            title="Consistency" 
            onMenuClick={() => setIsDrawerOpen(true)} 
          />
          <HamburgerDrawer 
            isOpen={isDrawerOpen} 
            onClose={() => setIsDrawerOpen(false)} 
          />
        </>
      )}

      <main className="relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
            <Route path="/stats" element={<PageWrapper><Stats /></PageWrapper>} />
            <Route path="/calendar" element={<PageWrapper><Calendar /></PageWrapper>} />
            <Route path="/day/:date" element={<PageWrapper><DayDetail /></PageWrapper>} />
            <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
            <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
            <Route path="/habit/:id" element={<PageWrapper><HabitDetail /></PageWrapper>} />
            <Route path="/logs/:id" element={<PageWrapper><Logs /></PageWrapper>} />
            <Route path="/onboarding" element={<PageWrapper><Onboarding /></PageWrapper>} />
            <Route path="/promise" element={<PageWrapper><PromiseFlash /></PageWrapper>} />
            <Route path="/design-system" element={<PageWrapper><DesignSystemTest /></PageWrapper>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isOnboarding && !isPromiseFlash && <BottomNav />}

      <AnimatePresence>
        {staleSession && (
          <StaleSessionModal 
            session={staleSession}
            habitName={staleSession.habitName}
            onSave={(endTime) => {
              stopSession(staleSession.habitId, { 
                endTime: endTime.getHours().toString().padStart(2, '0') + ':' + endTime.getMinutes().toString().padStart(2, '0'), 
                duration: Math.round((new Date(endTime) - new Date(staleSession.startTime)) / 60000) 
              });
              setStaleSession(null);
            }}
            onCancel={() => setStaleSession(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
