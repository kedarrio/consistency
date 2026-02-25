# Data Model — Complete Schemas

> All data structures used in Consistency V1 (localStorage / IndexedDB).

---

## Storage Keys

| Key | Content |
|-----|---------|
| `consistency_user` | User profile |
| `consistency_settings` | App preferences |
| `consistency_habits` | All habit data + entries |
| `consistency_active_sessions` | Currently running session timers |
| `consistency_onboarding_complete` | Boolean flag |

---

## User Object

```javascript
{
  id: "uuid",                          // Generated on first launch
  name: "John Doe",                    // Required
  age: 24,                             // Optional, null if not provided
  gender: "Male",                      // "Male" | "Female" | "Other" | "Prefer not to say" | null
  promise: "Build discipline...",      // 10 words max, required to finish onboarding
  profilePicture: "base64_string",     // null if no photo
  onboardingComplete: true,
  onboardingDate: "2026-02-25T10:30:00Z"
}
```

---

## Settings Object

```javascript
{
  weekStartDay: "Monday",              // "Monday" | "Tuesday" | ... | "Sunday"
  timeFormat: "24h",                   // "12h" | "24h"
  dayBoundary: "midnight",             // "midnight" | "sleep-schedule" | "custom"
  idealBedtime: "23:00",              // HH:MM format, used if dayBoundary !== "midnight"
  idealWakeTime: "07:00",             // HH:MM format
  hydrationUnitSize: 250,             // ml per glass (integer)
  theme: "dark",                       // "dark" only in V1
  cardOrder: ["meditation", "work", "workout", ...], // User's defined order
  notifications: {
    global: true,
    sounds: true,
    perHabit: {
      meditation: {
        enabled: true,
        time: "08:00",                 // HH:MM
        frequency: "daily",            // "daily" | "weekdays" | "weekends" | "custom"
        customDays: [],                // e.g. ["Mon", "Wed", "Fri"] if frequency is "custom"
        types: ["reminder", "encouragement"]  // "reminder" | "encouragement" | "streak-warning"
      }
      // ... repeated for each habit
    }
  },
  display: {
    showConsistencyScoreOnDashboard: true,
    showAreasToImprove: true
  }
}
```

---

## Habits Object

Each habit has a fixed structure with type-specific fields.

### Session-Based Habit (Meditation, Work, Workout, Reading, Sleep)

```javascript
{
  id: "meditation",
  name: "Meditation",
  type: "session",                     // Fixed type
  active: true,
  color: "#C9B5E6",                    // From tokens.json
  icon: "self_improvement",           // Material Design icon name
  goal: {
    type: "weekly",
    target: 210,                       // Minutes per week
    unit: "minutes"
  },
  entries: [
    {
      id: "uuid",
      date: "2026-02-24",              // ISO date (YYYY-MM-DD)
      startTime: "08:00",              // HH:MM
      endTime: "08:25",               // HH:MM
      duration: 25,                    // Minutes (auto-calculated, editable)
      notes: "Morning session",        // Optional string
      timestamp: 1708761600000,        // Unix ms (for sort ordering)
      // Habit-specific fields:
      // Workout:
      workoutType: "Cardio",          // Free text
      intensity: "Heavy",              // "Light" | "Normal" | "Heavy" | "Extreme"
      // Sleep:
      quality: 8,                      // 1-10 integer
      // Work:
      workType: "Deep work",           // Free text or tags
      // Reading:
      bookTitle: "Atomic Habits",      // Optional free text
    }
  ]
}
```

### Workout — Body Transformation Extension

```javascript
{
  // ...all session fields above...
  bodyTransformation: {
    enabled: true,
    height: 175,                       // cm
    heightUnit: "cm",                  // "cm" | "ft"
    photoFrequency: "weekly",          // "daily" | "weekly"
    photoDay: "Monday",                // Day of week (if weekly)
    photos: [
      {
        id: "uuid",
        date: "2026-02-24",
        imageData: "base64_string",
        weight: 70,                    // kg
        weightUnit: "kg",              // "kg" | "lbs"
        timestamp: 1708761600000
      }
    ]
  }
}
```

### Incremental Habit (Hydration)

```javascript
{
  id: "hydration",
  name: "Hydration",
  type: "incremental",
  active: true,
  color: "#9AB5D4",
  icon: "water_drop",
  goal: {
    type: "daily",
    target: 8,                         // Glasses per day
    unit: "glasses"
  },
  entries: [
    {
      id: "uuid",
      date: "2026-02-24",
      count: 6,                        // Total for that day
      timestamp: 1708761600000,
      notes: null                      // Optional
    }
    // One entry per day (upserted)
  ]
}
```

### Streak-Only Habit (No-Fap)

```javascript
{
  id: "noFap",
  name: "No-Fap",
  type: "streak",
  active: true,
  color: "#B5C9B5",
  icon: "heart_broken",
  currentStreak: 23,                   // Days since last reset (integer)
  longestStreak: 45,                   // Best ever streak (only goes up)
  streakStartDate: "2026-02-02",       // Date current streak started
  resets: [
    {
      id: "uuid",
      date: "2026-01-15",
      streakBroken: 23,                // What the streak was at reset time
      notes: "Felt stressed",          // Optional reflection
      timestamp: 1705276800000
    }
  ]
}
```

### Manual Entry Habit (Journal)

```javascript
{
  id: "journal",
  name: "Journal",
  type: "manual",
  active: true,
  color: "#E6D5C9",
  icon: "book",
  goal: {
    type: "weekly",
    target: 5,                         // Times per week (number of distinct days)
    unit: "times"
  },
  entries: [
    {
      id: "uuid",
      date: "2026-02-24",
      type: "text",                    // "text" | "photo"
      content: "Today I...",           // For type "text"
      photos: [],                      // For type "photo" — array of base64 strings
      caption: null,                   // Optional caption for photos
      timestamp: 1708761600000
    }
  ]
}
```

---

## Active Sessions Object

Persists in-progress session timers. Key: `consistency_active_sessions`.

```javascript
{
  meditation: {
    habitId: "meditation",
    startTime: "2026-02-24T08:00:00.000Z",  // ISO datetime
    startTimestamp: 1708761600000
  }
  // Only contains habits with active (running) sessions
}
```

---

## Day Boundary Logic Notes

When looking up entries for "today", use the user's `dayBoundary` setting:
- `midnight`: Day = `00:00:00` to `23:59:59` of current date
- `sleep-schedule` or `custom`: Use `idealWakeTime` as the start of the day
  - If current time is before `idealWakeTime`, the "day" is still yesterday's
