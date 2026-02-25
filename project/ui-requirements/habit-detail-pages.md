# Habit Detail Pages — UI Requirements

> All variations of the Habit Detail Page for all 8 trackers.

---

## Common Elements (All Types)

### Top Navigation
- Left: Back arrow → Dashboard (`arrow_back`, 24px, white, 44px touch target)
- Center: Habit name — Playfair, 24px, white
- Right: Hamburger icon → drawer

### Section Structure
1. Primary Action Area (varies by type)
2. Consistency Calendar section
3. Statistics section
4. "View Logs" button
5. FAB (all types except No-Fap)

---

## Session-Based (Meditation, Work, Workout, Reading, Sleep)

### Idle State (No active session)
```
Full-width "Start Session" button
  - Height: 56px
  - Style: Primary button
  - Icon: play_arrow (left of label)
```

### Active State (Session running)
```
Circular timer ring (200px)
  - Arc in habit color
  - Center: elapsed "05m13s" (Playfair, 32px)

Below ring: "Started: 2:30 PM" (Plex Mono, 14px, #A0A0A0)

"Stop Session" button below ring
  - Height: 56px
  - Style: Primary (or red/stop color)
  - Icon: stop
```

---

## Incremental (Hydration)

```
Count display: "6 / 8 glasses" (Playfair, 48px center)
Unit label: "glasses" (Plex Mono, 20px, #A0A0A0)

Two buttons side by side:
  [-]  56px × 56px, secondary style
  [+]  56px × 56px, primary style

Progress bar (full width, 10px height)
```

---

## Streak-Only (No-Fap)

```
Streak count: "23 days 🔥" (Playfair, 48px, #DB8686)
Best label: "Best: 45 days" (Plex Mono, 16px, #A0A0A0)

Gap

"Reset Streak 💔" button
  - Style: Secondary (outlined) — NOT danger, just neutral
  - Icon: heart_broken (left of label)
```

**No FAB on this page.**

---

## Manual Entry (Journal)

```
Progress summary: "3/5 entries this week" (Plex Mono, 16px, #A0A0A0)
Progress bar (full width, 10px)

Recent entries preview (optional, last 2-3 entries shown as small cards)
```

FAB opens entry modal.

---

## Consistency Calendar (All Types)

```
Header: "Consistency" (Playfair, 20px)

[Week | Month] toggle (SegmentedPicker)

Calendar grid:
  - Week view: 7 cells (Mon-Sun)
  - Month view: full month grid
  - Each cell: day number + heat map color
  - Today: white border
  - Navigation: ← (prev) and → (next) arrows

Below calendar (if day tapped):
  "Monday, Feb 24: 25 minutes logged"
  (Plex Mono, 14px, #A0A0A0)
```

---

## Statistics (All Types)

```
Header: "Statistics" (Playfair, 20px)

Metrics grid (2-column):
  - This week: "86%"
  - This month: "77%"
  - Current streak: "15 days" (if applicable)
  - Total this month: "7.5 hours"

Bar chart (last 7 days):
  - 120px height
  - Bars in habit color
  - X-axis: day initials
```

---

## View Logs Button

```
[View Logs]
  - Style: Secondary (outlined)
  - Full-width (or centered)
  - Margin-top: 16px
  - Navigates to /logs/:habitId
```
