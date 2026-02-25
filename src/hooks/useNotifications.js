import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const useNotifications = () => {
  const { settings } = useApp();

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  };

  const sendNotification = (title, options = {}) => {
    if (settings.notifications.global && Notification.permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        ...options
      });

      if (settings.notifications.sounds) {
        // Play subtle sound if enabled
      }

      return notification;
    }
  };

  return { requestPermission, sendNotification };
};
