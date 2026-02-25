# Onboarding — Feature Specification

> 8-screen onboarding flow. Detailed spec for each screen.

See `CONSISTENCY.md` Section 7 for complete onboarding specifications.

---

## Screen Summary

| Screen | Purpose | Required to Proceed |
|--------|---------|---------------------|
| 1 — Splash | Brand introduction | "Continue" button tap |
| 2 — App Explanation | Privacy + how it works + consent | Must check consent checkbox |
| 3 — Personal Details | Name, age, gender | Name is required |
| 4 — Habit Selection | Choose which habits to track | ≥1 habit selected |
| 5 — Body Transformation | Workout photo tracking setup | Optional, "Next" always visible |
| 6 — Preferences | Week start, time format, day boundary | Always can proceed |
| 7 — Promise | 10-word commitment | Promise must be entered |
| 8 — Tracker Types | Education on tracker types | "Good Luck!" button |

---

## Progress Indicator

8 dots at top of each screen:
```
Screen 1: ●○○○○○○○
Screen 2: ●●○○○○○○
Screen 3: ●●●○○○○○
...
Screen 8: ●●●●●●●●
```

Or use a horizontal progress bar filling as screens progress.

---

## Data Saved on Completion

All data collected during onboarding is saved to localStorage in one write:

```javascript
// consistency_user
{
  name: "John",
  age: 24,
  gender: "Male",
  promise: "Build discipline to achieve goals",
  onboardingComplete: true,
  onboardingDate: new Date().toISOString()
}

// consistency_settings
{
  weekStartDay: selectedDay,
  timeFormat: selectedFormat,
  dayBoundary: selectedBoundary,
  idealBedtime: bedtimeIfApplicable,
  idealWakeTime: wakeTimeIfApplicable
}

// consistency_habits — active habits only
// (inactive habits not created in storage until activated)
{
  meditation: { ...defaultMeditationSchema, active: true },
  // ... other selected habits
  workout: {
    ...defaultWorkoutSchema,
    active: true,
    bodyTransformation: { enabled: bodyTransEnabled, ... }
  }
}
```

---

## Flash Sequence After Completion

```
"Good Luck!" pressed
  → Save all data
  → Navigate to Promise Screen (full screen, auto-advance 3s)
  → Navigate to Dashboard (fade transition)
```

---

## Screen 5 Conditional Logic

```
if (workoutSelected) {
  show Screen 5 (Body Transformation)
} else {
  skip Screen 5, go directly to Screen 6
}
```

When navigating back from Screen 6, return to Screen 5 if Workout was selected, or Screen 4 if not.
