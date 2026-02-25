# Consistency Calculations — All Formulas

> Exact formulas for every consistency calculation in the app. Implement these precisely.

---

## Session-Based Trackers

**Applies to:** Meditation, Work, Workout, Reading, Sleep

**Goal:** Minutes per week (e.g., 210 min/week for Meditation at 30 min/day)

### Weekly Consistency

```
Consistency % = (Total minutes logged this week / Weekly goal minutes) × 100
```

**Example (Meditation, goal: 210 min/week):**
```
Week log: Mon 25, Tue 0, Wed 30, Thu 20, Fri 30, Sat 25, Sun 0 = 130 min
Consistency = (130 / 210) × 100 = 61.9% → Display: 62%
```

### Monthly Consistency

```
Monthly goal = Weekly goal × 4
Consistency % = (Total minutes logged this month / Monthly goal) × 100
```

**Example (Meditation):**
```
Monthly goal = 210 × 4 = 840 min
Logged: 650 min
Consistency = (650 / 840) × 100 = 77.4% → Display: 77%
```

### Daily Consistency (for heat map)

```
Daily goal = Weekly goal / 7
Daily % = (Minutes logged today / Daily goal) × 100
Cap at 100% (exceeding goal = 100%, not 110%)
```

**Notes:**
- No longer counts "days met" — total time is what matters
- Sleep: convert hours to minutes for all calculations
- If user logs 50 min one day and 0 another, it all goes into the weekly total

---

## Default Weekly Goals

| Habit | Default Goal |
|-------|-------------|
| Meditation | 210 min/week (30 min × 7) |
| Work | 2400 min/week (8 hours × 5 days) |
| Workout | 180 min/week (3 × 60 min) |
| Reading | 140 min/week (20 min × 7) |
| Sleep | 3360 min/week (8 hours × 7 days) |

---

## Incremental Trackers

**Applies to:** Hydration

**Goal:** Count per day (e.g., 8 glasses/day)

### Daily Consistency

```
Daily % = (Daily count / Daily goal) × 100
Cap at 100%
```

### Weekly Consistency

```
Weekly % = Average of all daily percentages in the week
= (Sum of daily % for each day) / 7
```

**Example (Hydration, goal: 8 glasses/day):**
```
Mon: 6/8 = 75%
Tue: 8/8 = 100%
Wed: 5/8 = 63%
Thu: 7/8 = 88%
Fri: 8/8 = 100%
Sat: 4/8 = 50%
Sun: 6/8 = 75%

Weekly = (75 + 100 + 63 + 88 + 100 + 50 + 75) / 7 = 551/7 = 78.7% → 79%
```

### Monthly Consistency

```
Monthly % = Average of all daily percentages in the month
```

---

## Streak-Only Trackers

**Applies to:** No-Fap

**No percentage calculation.** Only display:
- Current streak (days)
- Longest streak (days)

### Streak Increment Logic

```
At each day boundary:
  If no reset was pressed since last boundary:
    currentStreak += 1
  Else:
    currentStreak = 0 (already set by reset action)
```

### Streak Reset Logic

```
On user pressing reset:
  if (currentStreak > longestStreak):
    longestStreak = currentStreak  // Update record
  currentStreak = 0
  streakStartDate = today
  Save reset event with timestamp + notes
```

**Rule: longestStreak NEVER decreases.**

---

## Manual Entry Trackers

**Applies to:** Journal

**Goal:** Frequency-based (e.g., 5 times per week = 5 distinct days with entries)

### Weekly Consistency

```
Weekly % = (Number of days with at least 1 entry this week / Goal days) × 100
```

**Example (Journal, goal: 5 days/week):**
```
Entries: Mon, Wed, Thu, Sat (4 distinct days)
Consistency = (4 / 5) × 100 = 80%
```

**Rule: Multiple entries in one day = still 1 day for consistency purposes.**

---

## Overall Consistency Score

Average of all active habits' consistency percentages. Streak-only trackers (No-Fap) are **excluded** from this calculation.

```
Overall % = Sum of active habits' consistency % / Count of active habits with % values
```

**Example (Weekly):**
```
Meditation: 62%
Work: 85%
Workout: 70%
Journal: 80%
No-Fap: [excluded — no %]
Sleep: 90%
Reading: 55%
Hydration: 79%

Overall = (62 + 85 + 70 + 80 + 90 + 55 + 79) / 7 = 521/7 = 74.4% → 74%
```

---

## Heat Map Color Calculation

For each day, calculate that day's overall consistency score, then map to a color.

```
For each day D:
  scores = []
  For each active habit H (excluding streak-only):
    score = calculateDailyConsistency(H, D)
    scores.push(score)
  dayScore = average(scores)
  color = interpolateColor(dayScore)
```

### Color Interpolation

Instead of 3 discrete colors, use smooth interpolation:

```javascript
function getHeatMapColor(percentage) {
  // 0% = dark background
  // 1-33% = red zone
  // 34-66% = yellow zone  
  // 67-100% = green zone

  if (percentage === 0) return '#1A1A1A'; // no data

  const r = { r: 239, g: 68, b: 68 };   // #EF4444 (red)  at 0%
  const y = { r: 251, g: 191, b: 36 };  // #FBBF24 (yellow) at 50%
  const g = { r: 74, g: 222, b: 128 };  // #4ADE80 (green) at 100%

  if (percentage <= 50) {
    // Interpolate red to yellow
    const t = percentage / 50;
    return interpolate(r, y, t);
  } else {
    // Interpolate yellow to green
    const t = (percentage - 50) / 50;
    return interpolate(y, g, t);
  }
}
```

---

## Display Rules

- Always round to nearest whole number: `62.4%` → `62%`, `62.5%` → `63%`
- Cap at 100% — never show 110% even if user exceeds goal
- If no data for a period, show `—` (em dash), not `0%`
- Show `0%` only if there are logged entries that add up to 0 (which shouldn't happen, but handle gracefully)
