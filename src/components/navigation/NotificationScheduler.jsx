import { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useNotifications } from '../../hooks/useNotifications';
import { format, isAfter, parse, addDays } from 'date-fns';

const NotificationScheduler = () => {
  const { settings, habits } = useApp();
  const { sendNotification } = useNotifications();
  const lastCheck = useRef(new Date());

  useEffect(() => {
    if (!settings.notifications.global) return;

    const checkNotifications = () => {
      const now = new Date();
      const nowStr = format(now, 'HH:mm');
      
      // 1. Morning Reminder (7:00 AM or idealWakeTime)
      const morningTime = settings.idealWakeTime || "07:00";
      if (nowStr === morningTime && format(lastCheck.current, 'HH:mm') !== morningTime) {
        sendNotification("Good morning!", {
          body: "Ready to stay consistent today? Check your habits.",
          tag: 'morning-reminder'
        });
      }

      // 2. Evening Reflection (9:00 PM or idealBedtime - 1h)
      const eveningTime = "21:00";
      if (nowStr === eveningTime && format(lastCheck.current, 'HH:mm') !== eveningTime) {
        sendNotification("Evening reflection", {
          body: "Don't forget to log your progress before sleep.",
          tag: 'evening-reminder'
        });
      }

      // 3. Hydration Reminders (Every 2 hours between 9 AM and 7 PM)
      const hour = now.getHours();
      const minutes = now.getMinutes();
      if (hour >= 9 && hour <= 19 && hour % 2 === 0 && minutes === 0 && lastCheck.current.getHours() !== hour) {
        const hydrationHabit = habits.find(h => h.id === 'hydration');
        if (hydrationHabit && hydrationHabit.active) {
          sendNotification("Stay Hydrated", {
            body: "Time for a glass of water! 💧",
            tag: 'hydration-reminder'
          });
        }
      }

      lastCheck.current = now;
    };

    const interval = setInterval(checkNotifications, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [settings, habits, sendNotification]);

  return null;
};

export default NotificationScheduler;
