# Buttons — Component Specifications

> All button types used in the Consistency app.

---

## Primary Button

**Use:** Main call-to-action — "Start Session", "Save", "Get Started", "Make Promise"

```
Background:    #DB8686
Text color:    #FFFFFF
Font:          IBM Plex Mono, 16px, Regular
Padding:       16px (vertical) × 24px (horizontal)
Border radius: 12px
Shadow:        0px 2px 8px rgba(0, 0, 0, 0.1)
Min height:    56px
Min width:     Touch-friendly
```

### States
| State | Style |
|-------|-------|
| Default | Background: `#DB8686` |
| Hover | Background: `#C97676` |
| Active/Press | Background: `#B76666` + `transform: scale(0.95)` |
| Disabled | Background: `#DB868650`, cursor: not-allowed |
| Loading | Show spinner icon, disable interaction |

### Usage
- Full-width in modals and onboarding
- Auto-width on detail pages
- Never use more than one primary button visible at the same time

---

## Secondary Button

**Use:** Cancel, "View Logs", "Reset Streak", secondary actions

```
Background:    Transparent
Border:        2px solid #DB8686
Text color:    #DB8686
Font:          IBM Plex Mono, 16px, Regular
Padding:       14px (vertical) × 22px (horizontal) — account for border
Border radius: 12px
Min height:    56px
```

### States
| State | Style |
|-------|-------|
| Default | Border: `#DB8686`, text: `#DB8686` |
| Hover | Background: `#DB868615` (subtle tint) |
| Active | `transform: scale(0.95)` |
| Disabled | Border: `#DB868650`, text: `#DB868650` |

### Usage
- Paired with primary button (e.g., Cancel + Save)
- "View Logs" button on habit detail page
- "Reset Streak" button on No-Fap

---

## Icon Button

**Use:** Navigation bar icons, hamburger menu, back arrow

```
Background:    Transparent
Size:          44px × 44px (touch target, icon 24px centered)
Border radius: 50%
Ripple:        Yes, on tap
```

### States
| State | Style |
|-------|-------|
| Default | Icon: `#A0A0A0` |
| Active (nav) | Icon: `#DB8686` (filled icon variant) |
| Hover/Tap | Ripple effect, subtle background `#3A3A3A30` |

---

## FAB (Floating Action Button)

**Use:** Open manual entry form on Habit Detail Pages

```
Shape:         Circle (56px × 56px)
Background:    #DB8686
Icon:          + (plus), white, 24px, centered
Shadow:        0px 6px 16px rgba(0, 0, 0, 0.2)
Position:      fixed, bottom-right, 16px margin from edges
               (position above bottom nav — add 60px + 16px from bottom)
```

### States
| State | Style |
|-------|-------|
| Default | Shadow: normal |
| Hover | Shadow increases: `0px 8px 20px rgba(0, 0, 0, 0.3)` + slight lift `translateY(-2px)` |
| Active/Press | `scale(0.92)` |

### Rules
- **NOT on Dashboard** (removed)
- **NOT on No-Fap detail page** (streak-only trackers have no FAB)
- Only on: Meditation, Work, Workout, Journal, Sleep, Reading, Hydration detail pages

---

## Quick Action Buttons (On Habit Cards)

Compact buttons embedded in the top-right of dashboard habit cards.

### Session Start/Stop
```
Shape:         Circle, 48px × 48px
Background:    Darker shade of habit card color (e.g., darken 20%)
Icon:          ▶ (play) for Start, ⏸ (pause) for Stop — white, 24px
```

### Hydration +/- Buttons
```
Shape:         Pill buttons, side by side
Size:          40px × 40px each
Background:    Transparent, border 1px solid card text color
Icon:          + and − (24px)
```

### Streak Reset (No-Fap Card)
```
Icon:          heart_broken (💔)
Background:    Transparent
Size:          44px touch target
```

### Manual Entry (Journal Card)
```
Icon:          edit (pencil)
Background:    Transparent
Size:          44px touch target
```

---

## Danger Button

**Use:** "Clear All Data", delete confirmations

```
Background:    #EF4444
Text color:    #FFFFFF
Font:          IBM Plex Mono, 16px
Same sizing as Primary button
```

### States
| State | Style |
|-------|-------|
| Hover | `#DC2626` |
| Active | `#B91C1C` + `scale(0.95)` |
