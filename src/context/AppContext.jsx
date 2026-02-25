import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const AppContext = createContext();

const DEFAULT_HABITS = [
  {
    id: "meditation",
    name: "Meditation",
    type: "session",
    active: true,
    color: "meditation",
    icon: "SelfImprovement",
    goal: { type: "weekly", target: 210, unit: "minutes" },
    entries: []
  },
  {
    id: "work",
    name: "Work",
    type: "session",
    active: true,
    color: "work",
    icon: "Work",
    goal: { type: "weekly", target: 2400, unit: "minutes" },
    entries: []
  },
  {
    id: "workout",
    name: "Workout",
    type: "session",
    active: true,
    color: "workout",
    icon: "FitnessCenter",
    goal: { type: "weekly", target: 180, unit: "minutes" },
    entries: []
  },
  {
    id: "journal",
    name: "Journal",
    type: "manual",
    active: true,
    color: "journal",
    icon: "Edit",
    goal: { type: "weekly", target: 5, unit: "times" },
    entries: []
  },
  {
    id: "noFap",
    name: "No-Fap",
    type: "streak",
    active: true,
    color: "noFap",
    icon: "HeartBroken",
    currentStreak: 0,
    longestStreak: 0,
    streakStartDate: null,
    resets: []
  },
  {
    id: "sleep",
    name: "Sleep",
    type: "session",
    active: true,
    color: "sleep",
    icon: "Bedtime",
    goal: { type: "weekly", target: 3360, unit: "minutes" },
    entries: []
  },
  {
    id: "reading",
    name: "Reading",
    type: "session",
    active: true,
    color: "reading",
    icon: "MenuBook",
    goal: { type: "weekly", target: 140, unit: "minutes" },
    entries: []
  },
  {
    id: "hydration",
    name: "Hydration",
    type: "incremental",
    active: true,
    color: "hydration",
    icon: "WaterDrop",
    goal: { type: "daily", target: 8, unit: "glasses" },
    entries: []
  }
];

const DEFAULT_SETTINGS = {
  weekStartDay: "Monday",
  timeFormat: "24h",
  dayBoundary: "midnight",
  idealBedtime: "23:00",
  idealWakeTime: "07:00",
  hydrationUnitSize: 250,
  theme: "dark",
  cardOrder: DEFAULT_HABITS.map(h => h.id),
  notifications: {
    global: true,
    sounds: true,
    perHabit: {}
  },
  display: {
    showConsistencyScoreOnDashboard: true,
    showAreasToImprove: true
  }
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(storage.get(storage.KEYS.USER));
  const [settings, setSettings] = useState(storage.get(storage.KEYS.SETTINGS) || DEFAULT_SETTINGS);
  const [habits, setHabits] = useState(storage.get(storage.KEYS.HABITS) || DEFAULT_HABITS);
  const [activeSessions, setActiveSessions] = useState(storage.get(storage.KEYS.ACTIVE_SESSIONS) || {});
  const [onboardingComplete, setOnboardingComplete] = useState(storage.get(storage.KEYS.ONBOARDING_COMPLETE) || false);

  useEffect(() => {
    storage.set(storage.KEYS.USER, user);
  }, [user]);

  useEffect(() => {
    storage.set(storage.KEYS.SETTINGS, settings);
  }, [settings]);

  useEffect(() => {
    storage.set(storage.KEYS.HABITS, habits);
  }, [habits]);

  useEffect(() => {
    storage.set(storage.KEYS.ACTIVE_SESSIONS, activeSessions);
  }, [activeSessions]);

  useEffect(() => {
    storage.set(storage.KEYS.ONBOARDING_COMPLETE, onboardingComplete);
  }, [onboardingComplete]);

  const updateHabit = (habitId, updates) => {
    setHabits(prev => prev.map(h => h.id === habitId ? { ...h, ...updates } : h));
  };

  const addEntry = (habitId, entry) => {
    setHabits(prev => prev.map(h => {
      if (h.id === habitId) {
        if (h.type === 'incremental') {
          const existingEntryIndex = h.entries.findIndex(e => e.date === entry.date);
          const newEntries = [...h.entries];
          if (existingEntryIndex > -1) {
            newEntries[existingEntryIndex] = { ...newEntries[existingEntryIndex], ...entry };
          } else {
            newEntries.push(entry);
          }
          return { ...h, entries: newEntries };
        }
        return { ...h, entries: [...h.entries, entry] };
      }
      return h;
    }));
  };

  const startSession = (habitId) => {
    setActiveSessions(prev => ({
      ...prev,
      [habitId]: {
        habitId,
        startTime: new Date().toISOString(),
        startTimestamp: Date.now()
      }
    }));
  };

  const stopSession = (habitId, entryDetails = {}) => {
    const session = activeSessions[habitId];
    if (!session) return;

    const endTime = new Date();
    const startTime = new Date(session.startTime);
    const duration = Math.round((endTime - startTime) / (1000 * 60));

    const newEntry = {
      id: crypto.randomUUID(),
      date: format(endTime, 'yyyy-MM-dd'),
      startTime: format(startTime, 'HH:mm'),
      endTime: format(endTime, 'HH:mm'),
      duration,
      timestamp: Date.now(),
      ...entryDetails
    };

    addEntry(habitId, newEntry);
    discardSession(habitId);
  };

  const discardSession = (habitId) => {
    const newActiveSessions = { ...activeSessions };
    delete newActiveSessions[habitId];
    setActiveSessions(newActiveSessions);
  };

  const value = {
    user,
    setUser,
    settings,
    setSettings,
    habits,
    setHabits,
    activeSessions,
    onboardingComplete,
    setOnboardingComplete,
    updateHabit,
    addEntry,
    startSession,
    stopSession,
    discardSession
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const format = (date, pattern) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  
  if (pattern === 'yyyy-MM-dd') return `${y}-${m}-${d}`;
  if (pattern === 'HH:mm') return `${h}:${min}`;
  return date.toISOString();
};
