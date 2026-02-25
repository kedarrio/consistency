import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

const AppContent = () => {
  const { onboardingComplete, activeSessions, habits, stopSession } = useApp();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [staleSession, setStaleSession] = useState(null);
  
  const location = useLocation();
  const isOnboarding = location.pathname === '/onboarding';
  const isPromiseFlash = location.pathname === '/promise';

  // Stale session detection
  React.useEffect(() => {
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

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/day/:date" element={<DayDetail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/habit/:id" element={<HabitDetail />} />
          <Route path="/logs/:id" element={<Logs />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/promise" element={<PromiseFlash />} />
          <Route path="/design-system" element={<DesignSystemTest />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isOnboarding && !isPromiseFlash && <BottomNav />}

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
