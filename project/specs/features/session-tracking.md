# Session Tracking — Feature Specification

> Applies to: Meditation, Work, Workout, Reading, Sleep

---

## Overview

Session trackers allow users to start a timer, let it run (in foreground or background), then stop and log the session with additional metadata.

---

## Start Session Flow

1. User taps "Start Session" button (on dashboard card OR detail page)
2. System records `startTime = new Date().toISOString()` to `consistency_active_sessions[habitId]`
3. Dashboard card updates to show timer state (stop button + elapsed time)
4. Timer runs using `setInterval(1000)` — computes elapsed from stored start time, not internal counter
   - This means timer is accurate even after page refresh

---

## Background Persistence

**Problem:** `setInterval` stops when user navigates away or minimizes.

**Solution:** 
- Start time is saved to `localStorage`
- On timer update (or re-render), compute elapsed as `Date.now() - startTimestamp`
- This survives: page refresh, navigation between pages, app minimize/restore
- Does NOT survive: browser/tab close (PWA) — but start time persists in localStorage, so on next open it resumes from stored start time

---

## Timer Display Format

During active session, card shows elapsed time:
```
● 05m13s    (grey dot indicating live, Plex Mono, 14px)
Stop button shows pause icon
```

On detail page (full circular timer):
```
Center: "05m13s" (Playfair, 32px)
Arc: progresses (optional — could show % of daily goal achieved)
Below: "Started: 2:30 PM" (Plex Mono, 14px, #A0A0A0)
```

---

## Stop Session

1. User taps Stop button (card or detail page)
2. Compute final duration: `Math.floor((Date.now() - startTimestamp) / 60000)` minutes
3. Remove from `consistency_active_sessions`
4. Open Stop Session Modal with:
   - Duration (pre-filled, editable)
   - Start time (pre-filled, editable)
   - End time (now, editable)
   - Notes (empty)
   - Habit-specific fields

---

## Stale Session Detection

On every app open:

```javascript
for (const habitId in activeSessionsStorage) {
  const session = activeSessionsStorage[habitId];
  const hoursElapsed = (Date.now() - session.startTimestamp) / 3600000;
  
  if (hoursElapsed > 12) {
    // Show stale session modal for this habit
    showStaleSessionModal(habitId, session);
  }
}
```

Handle only one stale session at a time (if multiple, queue them).

---

## Manual Entry (Fallback)

Accessible via FAB on Habit Detail Page.

All fields are empty by default (vs. pre-filled for stop modal).
User can backdate using date + time pickers.

---

## Habit-Specific Fields

| Habit | Extra Fields |
|-------|-------------|
| Meditation | None (just duration + notes) |
| Work | Work type (text/tags) |
| Workout | Type (text), Intensity (Light/Normal/Heavy/Extreme segmented picker) |
| Reading | Book title (optional text) |
| Sleep | Quality rating (1-10 slider) |

---

## Edge Cases

| Situation | Handling |
|-----------|---------|
| Session > 12 hours | Stale session modal on app open |
| User taps Start while another session for SAME habit running | Not possible — Start button changes to Stop |
| Multiple habits with active sessions simultaneously | Supported — each habit tracks independently |
| Timer shows incorrect time after system clock change | Recompute from stored startTimestamp |
