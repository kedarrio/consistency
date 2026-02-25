# User Flows — Detailed Diagrams

---

## Flow 1: First Launch → Onboarding → Dashboard

```
App Launch
    │
    ▼
Check onboardingComplete flag
    │
    ├─ false ──► Screen 1: Splash
    │                │
    │            Screen 2: App Explanation + Consent
    │                │ (must check consent checkbox)
    │            Screen 3: Personal Details (name required)
    │                │
    │            Screen 4: Habit Selection (≥1 required)
    │                │
    │            Screen 5: Body Transformation (if Workout selected, else skip)
    │                │
    │            Screen 6: Preferences
    │                │
    │            Screen 7: Make a Promise (required)
    │                │
    │            Screen 8: Understand Tracker Types
    │                │
    │            "Good Luck!" → Save all data
    │                │
    │            Promise Flash Screen (3s auto-advance)
    │                │
    └─ true ───► Dashboard
```

---

## Flow 2: Returning User Launch

```
App Launch
    │
    ▼
Check onboardingComplete = true
    │
    ▼
Splash: "Consistency" + tagline (1.5s auto-advance)
    │
    ▼
Promise Screen: User's promise text (3s auto-advance)
    │
    ▼
Dashboard: "Welcome back, [Name]"
```

---

## Flow 3: Session Tracker (Normal)

```
Dashboard Habit Card (e.g., Meditation)
    │
    ▼
Tap [Start] button
    ├── Record startTime to localStorage
    ├── Begin timer display
    └── Card shows timer running state
    │
    ▼
[User does their meditation]
    │
    ▼
Tap [Stop] button (on card OR on detail page)
    │
    ▼
Stop Session Modal opens
    ├── Duration: auto-calculated (editable)
    ├── Start time: shown (editable)
    ├── End time: now (editable)
    ├── Notes: optional
    └── Habit-specific fields
    │
  [Cancel]  [Save]
    │          │
  Discard    Add entry to storage
             Recalculate stats
             Update dashboard card
             Success animation
```

---

## Flow 4: Stale Session Recovery

```
App opens
    │
    ▼
Detect active session older than 12 hours
    │
    ▼
Stale Session Modal (cannot be dismissed by backdrop tap)
    ├── "Looks like you forgot to stop [Habit]"
    ├── "Started: Yesterday, 8:00 AM"
    ├── Suggested end: "Yesterday, 8:30 AM"
    └── Editable end time
    │
  [Cancel Session]   [Save Session]
       │                   │
   Discard timer     Save with adjusted time
```

---

## Flow 5: Streak Reset (No-Fap)

```
No-Fap Card or Detail Page
    │
    ▼
Tap 💔 (heartbreak icon) or "Reset Streak"
    │
    ▼
Confirmation Modal
    ├── "Reset your streak?"
    ├── "Current: 23 days"
    ├── "Best: 45 days (preserved)"
    └── Text area: optional reflection
    │
  [Cancel]   [Reset Streak] (red)
    │               │
  Nothing     currentStreak = 0
              If currentStreak > longestStreak:
                longestStreak = currentStreak
              Save reset event with notes
              "Starting fresh." — neutral message
```

---

## Flow 6: Manual Entry (Journal)

```
Journal Detail Page
    │
    ▼
Tap FAB (+)
    │
    ▼
Entry Modal opens
    ├── Date picker (today)
    ├── Time picker (optional)
    └── Mode toggle: Text | Photo
         │              │
    Text area      Upload photo
    (unlimited)    (camera or gallery)
                       │
                   Preview + caption
    │
  [Cancel]   [Save]
               │
           Add entry
           Recalculate stats (days this week)
           Show in logs
```

---

## Flow 7: View and Edit Logs

```
Habit Detail Page → [View Logs]
    │
    ▼
Logs Page
    ├── Time range filter (segmented picker)
    └── Entry list
         │
    ──────────────────────────
    │                        │
(Tap entry)            (Long-press entry)
    │                        │
Edit Modal              Select Mode
(pre-filled)             │
    │               [Trash icon]
  [Save]                   │
    │               Confirm Delete Modal
  Update entry      │
  Stats recalc   [Delete] → Remove entries
                           Stats recalc
```

---

## Flow 8: Export Data

```
Settings → Data Management → [Export Data]
    │
    ▼
Export Modal
    ├── Format: CSV | JSON (segmented)
    └── [Export] button
         │
     Generate file content
     Trigger download
     File saved to device
```
