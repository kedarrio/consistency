# Inputs — Component Specifications

> All form input components used in the Consistency app.

---

## Text Input

```
Background:     #1A1A1A
Border:         1px solid #3A3A3A (default)
Border (focus): 2px solid #DB8686
Border radius:  8px
Padding:        12px
Font:           IBM Plex Mono, 14px
Color:          #FFFFFF
Placeholder:    #6A6A6A
Min height:     48px (touch-friendly)
```

### States
| State | Style |
|-------|-------|
| Default | Border: `1px solid #3A3A3A` |
| Focus | Border: `2px solid #DB8686`, no shadow needed |
| Error | Border: `2px solid #EF4444` |
| Disabled | Background: `#0F0F0F`, text: `#6A6A6A` |

### Usage
- Name field (onboarding)
- Notes field (manual entry modal)
- Book title (Reading entry)
- Search fields

---

## Number Input

Same base styles as Text Input, but:
- `type="number"` (remove spinner arrows via CSS)
- Shows unit label on right (e.g., "glasses", "min", "kg")

### Unit Label Styling
```
Color:          #6A6A6A
Font:           IBM Plex Mono, 14px
Padding-right:  12px
```

---

## Text Area

```
Same as Text Input
Min-height:     100px
Resize:         vertical (or none for fixed modal areas)
```

### Usage
- Journal entries (unlimited length)
- Notes in session entries
- Reflection notes on streak reset
- Promise input (onboarding)

---

## Toggle Switch (iOS-Style)

> Reference: `references/Toggle.png`

```
Track width:    51px
Track height:   31px
Knob size:      27px × 27px (circle, white)
Track radius:   15.5px (pill)
Knob radius:    50%
```

### States
| State | Track Background | Knob Position |
|-------|-----------------|---------------|
| Off | `#3A3A3A` | Left (translateX: 2px) |
| On | `#DB8686` | Right (translateX: 22px) |

### Animation
```
transition: background-color 250ms ease-in-out
knob transition: transform 250ms ease-in-out
```

### Usage
- Enable body transformation (onboarding)
- Enable/disable habits (settings)
- Enable notifications (global toggle)
- Per-habit notification toggles

---

## Segmented Picker (Apple-Style)

> Reference: `references/SegmentedPicker.png`

Multiple options displayed in a pill/capsule container. Only one option active at a time.

```
Container:
  Background:     #1A1A1A
  Border radius:  10px
  Padding:        2px
  Display:        flex

Segment:
  Padding:        8px 16px
  Border radius:  8px
  Font:           IBM Plex Mono, 14px
  Transition:     all 200ms ease-in-out

Active Segment:
  Background:     #DB8686
  Color:          #FFFFFF

Inactive Segment:
  Background:     transparent
  Color:          #A0A0A0
```

### Usage
- Gender selection (onboarding): Male | Female | Other | Prefer not to say
- Time format: 12h | 24h
- Photo frequency: Daily | Weekly
- Time range filter (Stats): Daily | Weekly | Monthly | Yearly | All-Time
- Time range filter (Logs): All Time | Last 7 Days | Last 30 Days | This Week | This Month | Custom
- View toggle on habit detail calendar: Week | Month

---

## Slider

Used for quality ratings (Sleep) and optional intensity (Workout).

```
Track height:   4px
Track color:    #3A3A3A (unfilled)
Filled color:   #DB8686
Thumb:          White circle, 22px, shadow: 0px 2px 6px rgba(0,0,0,0.3)
```

### Usage
- Sleep quality: 1-10 scale
  - Labels: "Poor" (left) and "Excellent" (right)
- Workout intensity (alternative to segmented picker)

---

## Date Picker (Apple-Style Scrolling Wheel)

> Reference: `references/SegmentedPicker.png` for style reference on scrolling

- Triggered by tapping a date field
- Opens as a modal overlay
- Scrolling wheel interface (day / month / year columns)
- Dark theme matching app
- "Done" button confirms selection, "Cancel" dismisses

```
Modal background:  #1A1A1A
Wheel text:        IBM Plex Mono, 18px
Selected item:     White text, centered
Unselected items:  #6A6A6A, smaller (14px), fading out
Separator lines:   #DB8686, thin (1px)
Done button:       Primary button style
```

---

## Time Picker

Same as Date Picker but shows hours and minutes (and AM/PM if 12h format selected in settings).

---

## Dropdown / Select

```
Background:     #1A1A1A
Border:         1px solid #3A3A3A
Border radius:  8px
Padding:        12px
Font:           IBM Plex Mono, 14px
Color:          #FFFFFF
Icon:           Chevron-down, #A0A0A0, right side
```

Custom styled (not native `<select>`) for consistent cross-browser appearance.

### Usage
- Week starts on: Monday, Tuesday, ..., Sunday
- Day resets at dropdown (Settings)
