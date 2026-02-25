import { useEffect, useCallback } from 'react';
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

  const sendNotification = useCallback(async (title, options = {}) => {
    if (!settings.notifications.global || Notification.permission !== 'granted') {
      return;
    }

    const defaultOptions = {
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      vibrate: settings.notifications.sounds ? [200, 100, 200] : [],
      ...options
    };

    // Use Service Worker if available for better PWA support
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      if (registration) {
        registration.showNotification(title, defaultOptions);
        return;
      }
    }

    // Fallback to standard Notification API
    new Notification(title, defaultOptions);
  }, [settings.notifications.global, settings.notifications.sounds]);

  // Basic scheduling logic could be implemented here or in a separate effect
  // For now, we provide the mechanism to send notifications

  return { requestPermission, sendNotification };
};
