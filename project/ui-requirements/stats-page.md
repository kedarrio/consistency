# Stats Page — UI Requirements

---

## Top Navigation
- Center: "Statistics" — Playfair, 24px
- Right: Hamburger icon

## Time Range Filter
Position: Top of page content, below nav, 16px margin.

Segmented picker options: **Daily | Weekly | Monthly | Yearly | All-Time**
Default: Weekly

## Overall Consistency Score Card
```
Background:    #1A1A1A
Padding:       24px
Border radius: 16px
Shadow:        card shadow

Content (centered):
  Score:       "78%" — Playfair, 64px, #DB8686
  Label:       "Overall consistency" — Plex Mono, 16px, #A0A0A0
  Subtext:     "this week" — Plex Mono, 14px, #6A6A6A
  (Optional)   Circular progress ring around/behind number
```

## Per-Habit Cards
Scrollable list below overall score.

Each card:
```
Background:    #1A1A1A (NOT habit color — this is a data display)
Padding:       16px
Border radius: 12px

Top row:
  Left:  [habit icon, 24px in habit color] + "Habit Name" (Playfair, 20px)
  Right: "86%" (Playfair, 32px, habit color)

Progress bar (full width, 10px, habit color)

Metrics (Plex Mono, 14px, #A0A0A0):
  "Current streak: 15 days"
  "Total: 7.5 hours this month"

Mini bar chart (7-day, 80px height, bars in habit color)

Tap card → navigate to /habit/:id
```

## Areas to Improve Section
Shown if `settings.display.showAreasToImprove = true`.

```
Header:    "Areas to Improve" (Playfair, 20px)
Content:   List of habits below target
Example:
  Reading: 2/7 days (29%)
  "3 more sessions needed this week to reach goal"
  — neutral, factual, NOT guilt-inducing
```

## Empty State
When insufficient data (new user):
```
Center icon + "Not enough data yet" (Playfair, 20px)
Subtext: "Track for a few days to see insights" (Plex Mono, 14px, #A0A0A0)
```

## Bottom Nav
Stats icon active.
