# Habit Cards — Component Specifications

> Habit cards are the most important UI element in the app. Match these specs exactly.

---

## Reference

See `references/HabitCard.png` for the visual target. The card below must match this image.

---

## Dashboard Habit Card

### Layout Diagram

```
┌────────────────────────────────────────────┐
│ 78%                        [  ◉  ]         │  ← Top row (space-between)
│ this week                   start          │  ← Sub-labels
│                                            │
│ [icon box] Habit Name   Today: 9/10m       │  ← Bottom row (space-between)
│ ████████████████████░░░░░░                 │  ← Progress bar (full bleed)
└────────────────────────────────────────────┘
```

**Active session state (same layout, different content):**
```
┌────────────────────────────────────────────┐
│ 78%                        [  ⏸  ]         │
│ this week                  05m13s          │
│                                            │
│ [icon box] Habit Name   Today: 9/20m       │
│ ████████████████████░░░░░░                 │
└────────────────────────────────────────────┘
```

### Container Styles

```
Background:    Habit-specific color (see tokens.json → color.habits)
Border radius: 16px
Padding:       20px (top/left/right), 0px bottom (progress bar goes edge-to-edge)
Shadow:        0px 4px 12px rgba(0, 0, 0, 0.15)
Margin-bottom: 12px (gap between cards)
Min-height:    130px
Display:       flex, flex-direction: column, justify-content: space-between
```

---

### Top Row (space-between)

Flex row, `justify-content: space-between`, `align-items: flex-start`.

#### Consistency % (Top-left)
```
Value:    "78%"
Font:     Playfair Display, 32px, weight 600
Color:    #2A2A2A

Sub-label below value:
  Text:   "this week" (or "today", depending on goal type)
  Font:   IBM Plex Mono, 12px, regular
  Color:  #2A2A2A (slightly muted — can use 70% opacity)
```

#### Action Button (Top-right)
Circle button with a text label below it.
```
Button circle:
  Shape:      Circle, 48px diameter
  Background: Accent color (#DB8686) for Start; white for Stop/active
  Icon:       ▶ (start, white 22px) or ⏸ (stop, dark 22px)
  Shadow:     Card button shadow

Label below button:
  Text:       "start" (idle) or elapsed time "05m13s" (active)
  Font:       IBM Plex Mono, 12px, regular
  Color:      #2A2A2A
  Align:      center (under button)
```

**By tracker type:**
| Type | Button | Label |
|------|--------|-------|
| Session (idle) | ▶ circle, #DB8686 bg | "start" |
| Session (active) | ⏸ circle, white bg | "05m13s" (live timer) |
| Incremental | + and − side by side | none |
| Streak | 💔 icon button | none |
| Manual | ✏️ icon button | none |

---

### Bottom Row (space-between, align-items: flex-end)

Flex row, `justify-content: space-between`, `align-items: center`.
Positioned just above the progress bar.

#### Icon + Name (Bottom-left)
Flex row with small gap.

```
Icon container:
  Shape:        Rounded square (8px border radius)
  Size:         36px × 36px
  Background:   Slightly darker/different shade of habit color (or translucent dark)
  Icon:         Material icon, 20px, #2A2A2A (centered inside box)

Habit Name:
  Font:         Playfair Display, 20px, weight 600
  Color:        #2A2A2A
  Case:         Title Case
  Margin-left:  8px (gap from icon box)
```

#### Today's Count (Bottom-right)
```
Label:    "Today:  " — IBM Plex Mono, 14px, #2A2A2A (normal weight)
Value:    "9/10m" — IBM Plex Mono, 14px, weight 600 (bold) — same color
Align:    right
```

**Format by tracker type:**
| Type | Format |
|------|--------|
| Session | `Today: 9/30m` |
| Incremental | `Today: 6/8` |
| Streak | `23 days 🔥` |
| Manual | `3/5 entries` |

---

### Progress Bar (Very Bottom — full bleed)

The progress bar sits at the bottom of the card, edge-to-edge (no side padding).

```
Height:         6px
Border radius:  0 0 16px 16px (only bottom corners rounded, matching card)
Background:     rgba(42, 42, 42, 0.25) (unfilled track)
Filled:         Darker shade of habit background color (~20% darker)
Animation:      width transition 500ms ease-out
Overflow:       hidden
Margin-top:     12px (space between bottom row and bar)
```

Derived fill colors:
- Meditation (`#C9B5E6`) → `#A89BC7`
- Hydration (`#9AB5D4`) → `#7A96B5`
- Workout (`#E69A9A`) → `#C77E7E`
- (etc. — darken each by ~20%)

### Interaction Behavior

| Action | Result |
|--------|--------|
| Tap card body | Navigate to Habit Detail Page |
| Tap Quick Action button | Execute action (start/stop, +/-1, etc.) |
| Long-press card | Enter reorder mode |

---

## Active Session Card State

When a session is running:

```
Quick Action button: Shows ⏸ (stop/pause icon)
Count text: Shows live elapsed time in grey: "● 05m13s" (grey dot + time)
Progress bar: Continues to animate as time passes
```

The card background and all other styles remain the same.

---

## Reorder Mode

When long-press triggers reorder mode:
- Lifted card: `transform: scale(1.05)`, increased shadow
- Other cards: Slightly dim (`opacity: 0.7`)
- Drag handles appear (or entire card is draggable)
- Exit: Tap "Done" button or tap outside card area

---

## Stats / Detail Page Card

On the Stats page, habit cards show more detail:

```
┌─────────────────────────────────────┐
│ [icon]  Habit Name     86%          │
│         (Plex Mono)  (Playfair)     │
│ ████████████████████░░░ (bar)        │
│ Current streak: 15 days             │
│ Total: 7.5 hours this month         │
│ [Mini bar chart — last 7 days]      │
└─────────────────────────────────────┘
```

Background: `#1A1A1A` (surface, not habit color)
The habit icon colored in habit color (24px).
Percentage in habit color (Playfair, 32px).
