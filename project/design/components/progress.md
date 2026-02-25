# Progress Components — Specifications

---

## Mini Progress Bar (Habit Cards)

```
Height:         6px
Border radius:  9999px (pill shape)
Container:      full width of card content area
Background:     rgba(42, 42, 42, 0.25) (unfilled track)
Filled:         Darker shade of habit background color (~20% darker)
Animation:      width: X% transition 500ms ease-out
Overflow:       hidden
```

Cap at 100% — do not overflow even if user exceeds goal.

---

## Large Progress Bar (Detail Pages)

```
Height:         10px
Border radius:  9999px
Background:     #3A3A3A (unfilled track)
Filled:         #DB8686 (or habit color, context-dependent)
Animation:      width: X% transition 500ms ease-out
```

Optional: Show percentage text to the right of bar. IBM Plex Mono, 14px, `#A0A0A0`.

---

## Circular Progress (Session Timer)

Used on Habit Detail Page when a session is active.

```
Diameter:        200px (detail page) — optional on cards
Background ring: #3A3A3A
Progress arc:    Habit color, or #DB8686
Stroke width:    14px
Border radius:   50%
```

### Center Content
```
Primary:   Elapsed time "05m13s" — Playfair, 32px, #FFFFFF
Secondary: "Started: 2:30 PM" — IBM Plex Mono, 14px, #A0A0A0
```

### Implementation Notes
- Use SVG circle with `stroke-dasharray` and `stroke-dashoffset` for smooth arc animation
- Progress arc rotates from top (12 o'clock position)
- Background ring always fully visible
- Foreground arc animates every second

---

## Consistency Score Circle (Stats Page — Optional)

Large decorative circle showing overall consistency.

```
Diameter:     180px (Stats page) or 120px (Dashboard widget)
Background:   #1A1A1A card
Arc color:    #DB8686
Stroke width: 10px
Center text:  "78%" — Playfair, 64px, #DB8686 (Stats) / 48px (Dashboard)
Label below:  "Overall Consistency" — Plex Mono, 14px, #A0A0A0
```

---

## Heat Map Color Scale

Used for calendar cells and day highlights.

```
0%:   #1A1A1A (no data background)
1-33%:  Gradient from #2A1A1A (dark red tint) toward #EF4444
34-66%: Gradient from #EF4444 toward #FBBF24
67-100%: Gradient from #FBBF24 toward #4ADE80
```

Use CSS `color-mix()` or a JavaScript interpolation function to calculate the exact color for any % value — not just 3 discrete colors.

---

## Progress Ring on Onboarding

The step indicator at the top of onboarding screens.

```
Format:       8 dots in a row (●●●○○○○○)
Active dots:  #DB8686
Inactive:     #3A3A3A
Dot size:     8px × 8px circle
Gap:          6px between dots
```

Alternative linear format:
```
Container:  Full width bar, 4px height, #3A3A3A background
Filled:     #DB8686, width = (step / 8) × 100%
Animation:  width transition 300ms ease-out
```
