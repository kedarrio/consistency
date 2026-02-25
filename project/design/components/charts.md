# Charts — Component Specifications

---

## Bar Chart (7-Day Overview)

Used on Habit Detail Pages and Stats page cards.

```
Container:
  Background:  transparent
  Height:      120-160px

Bars:
  Color:       Habit color (or #DB8686 for overall stats)
  Width:       auto-calculated (equally spaced)
  Border radius: 4px top corners
  Min height:  4px (visible even for 0 values — use #3A3A3A at min height)

X-Axis labels:
  Text:        Day initials — M, T, W, T, F, S, S
  Font:        IBM Plex Mono, 12px, #A0A0A0
  Position:    Below bars

Y-Axis:
  Not shown (use bar height as visual indicator)
  Gridlines:   Horizontal dashed lines optional (very subtle, #2A2A2A)

Today:
  Bar gets white border (1px) or slight label highlight
```

### Data Format
- X: 7 days (Mon–Sun of current week, or last 7 days)
- Y: Minutes logged (session-based) or count (incremental) or 1/0 (manual)

---

## Bar Chart (Monthly Stats)

For month view on Stats or Calendar page.

Same as 7-Day but:
- X-Axis: Week numbers or shortened date ranges
- May show 4-5 bars representing weekly totals

---

## Line Chart (Trend View)

Used for longer-term consistency trends (30 days, monthly overview).

```
Line:
  Color:        #DB8686 (or habit color)
  Width:        2px
  Style:        Smooth curve (bezier interpolation)

Points:
  Radius:       4px
  Fill:         #DB8686
  Stroke:       #0A0A0A, 2px (for contrast)

Area fill:
  Below line:   Gradient from #DB868630 (30% opacity) to transparent

X-Axis:
  Labels:       Dates (abbreviated) — IBM Plex Mono, 10px, #A0A0A0
  Show every:   7th day (daily data) or every week (monthly data)

Grid:
  Horizontal:   Subtle dashed lines at 25%, 50%, 75%, 100% — #2A2A2A
```

---

## Heat Map (Calendar View)

See Progress component specs for color scale. This describes the calendar grid layout.

```
Grid:
  Columns:     7 (days of week)
  Rows:        4-6 (weeks in month)
  Gap:         4px

Day Cell:
  Size:        auto (fills column width evenly)
  Aspect:      Square (1:1) or slightly taller
  Border radius: 6px

Day Number:
  Font:        IBM Plex Mono, 13px
  Color:       #FFFFFF for past/current days
  Opacity:     0.5 for future days

Today:
  Border:      2px solid #FFFFFF

Selected:
  Border:      2px solid #DB8686

Future days:
  Background:  #1A1A1A (empty/no data)
  Opacity:     0.4
```

---

## Chart Library

**Recommended:** Recharts or Chart.js

- Use Recharts if using React (better compositional API)
- Customize with tokens — override all default colors
- Remove all default tooltips and replace with custom styled ones

### Custom Tooltip
```
Background:   #1A1A1A
Border:       1px solid #3A3A3A
Border radius: 8px
Padding:      8px 12px
Font:         IBM Plex Mono, 12px
Text color:   #FFFFFF
```

---

## Empty Chart State

When no data for selected time range:

```
Show:          Flat baseline line at 0 (dashed, #3A3A3A)
Center text:   "No data" — IBM Plex Mono, 14px, #6A6A6A
```
