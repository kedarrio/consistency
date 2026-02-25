# Calendar Page — UI Requirements

---

## Top Navigation
- Center: "Calendar" — Playfair, 24px
- Right: Hamburger + optional filter icon

## Month Navigation
```
← February 2026 →
  Playfair, 24px, centered
  Arrows: icon buttons, 44px touch target
```

## Calendar Grid
See `design/components/charts.md` for heat map color spec.

Day of week headers:
```
M  T  W  T  F  S  S
Plex Mono, 12px, #A0A0A0, centered above each column
```

Day cells:
```
Size:          Equal width (7 columns), square aspect ratio
Border radius: 6px
Gap:           4px
Day number:    Plex Mono, 13px, white (or #6A6A6A for future)
Background:    Heat map color based on that day's consistency %
Today:         2px white border
Selected:      2px #DB8686 border
Future days:   Background #1A1A1A, text opacity 0.4
No data:       Background #1A1A1A (darkest)
```

## Day Highlights Card
Appears below calendar when a day is tapped.

```
Background:    #1A1A1A
Padding:       20px
Border radius: 16px
Margin-top:    16px

Header:        "Monday, February 24" — Playfair, 20px
Score:         "75%" — Playfair, 48px, color-coded (red/yellow/green)
Subtext:       "6/8 habits tracked" — Plex Mono, 14px, #A0A0A0

Habit list:
  "🧘 Meditation: 20 min"
  "💼 Work: 4.5 hours"
  "💧 Hydration: 6/8 glasses"
  etc. (Plex Mono, 14px)

[View More →] button (secondary, small)
```

## Day Detail Page (/calendar/day/:date)
Opened by "View More" from day highlights.

```
Header:         Full date (Playfair, 24px)
View:           Timeline (Google Calendar-style)
Time axis:      Left side, 00:00 - 23:59
Entry blocks:   Colored blocks (habit color), proportional height
  - Tap block: entry detail modal (with edit/delete)
FAB:            "Add Entry for This Day" — pre-sets date
```

## Bottom Nav
Calendar icon active.
