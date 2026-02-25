const KEYS = {
  USER: 'consistency_user',
  SETTINGS: 'consistency_settings',
  HABITS: 'consistency_habits',
  ACTIVE_SESSIONS: 'consistency_active_sessions',
  ONBOARDING_COMPLETE: 'consistency_onboarding_complete',
};

export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
  KEYS,
};
