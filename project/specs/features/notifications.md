# Notifications — Feature Specification

> Web Notifications API implementation for Consistency PWA.

---

## Overview

Optional reminders to log habits. Users must explicitly enable notifications in Settings. All notification settings are per-habit.

---

## Permission Flow

1. User goes to Settings → Notifications
2. Toggles "Enable notifications" ON
3. Browser shows native permission dialog
4. If granted: show per-habit settings
5. If denied: show tooltip "Go to browser settings to allow notifications"

---

## Notification Types

| Type | When | Message Example |
|------|------|-----------------|
| Reminder | User's set time | "Time to meditate 🧘" |
| Encouragement | After goal reached | "Meditation goal hit! 🎯" |
| Streak warning | If streak at risk (day almost over, no log) | Not implemented in V1 |

---

## Per-Habit Settings (in Settings → Notifications → Configure)

Each active habit shows:
```
[Habit Icon] Habit Name
[Toggle] Enable
Reminder time: [Time picker]
Frequency: [Daily | Weekdays | Weekends | Custom]
  If Custom: Day checkboxes
Notification types: [ ] Reminder  [ ] Encouragement
[Test notification] button
```

---

## Technical Implementation (PWA)

Web Notifications API has limitations in PWA:
- Scheduled notifications only possible if Service Worker is running
- Use `ServiceWorkerRegistration.showNotification()` for better persistence

```javascript
async function scheduleNotification(habitId, time, message) {
  if (Notification.permission !== 'granted') return;
  
  const registration = await navigator.serviceWorker.ready;
  
  // Calculate delay to next scheduled time
  const now = new Date();
  const [hours, minutes] = time.split(':');
  const scheduledTime = new Date(now);
  scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1); // Tomorrow
  }
  
  const delay = scheduledTime - now;
  
  setTimeout(() => {
    registration.showNotification('Consistency', {
      body: message,
      icon: '/icon-192.png',
      badge: '/badge-72.png',
      tag: `habit-${habitId}`,
      renotify: true
    });
    
    // Re-schedule for next day
    scheduleNotification(habitId, time, message);
  }, delay);
}
```

---

## Sounds

Global toggle in Settings → Notifications → "Enable sounds"

When enabled, plays on:
- Daily goal reached
- Streak milestone (optional)

Implementation: play audio file via `new Audio('/sounds/success.mp3').play()`

---

## V1 Limitations

- Notifications only fire while browser tab is active or PWA is in "background" (not fully closed)
- Cannot guarantee exact timing on iOS (Safari limitations)
- Tell users: "Notifications work best when the app is installed and left running in background"
