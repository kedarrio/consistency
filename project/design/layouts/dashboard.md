# Dashboard Layout — Specifications

> See `ui-requirements/dashboard.md` for element-by-element requirements.

---

## Page Structure

```
┌─────────────────────────────┐
│  TOP NAVIGATION BAR (56px)  │  fixed
├─────────────────────────────┤
│  Welcome back, [Name]       │  ← 16px padding
│                             │
│  ┌─ SCORE CARD (optional) ─┐│
│  │  78% this week          ││
│  └─────────────────────────┘│
│                             │
│  ┌─ HABIT CARD ────────────┐│
│  │  🧘 Meditation  [Start] ││
│  │  130/210m               ││
│  │  ████████░░░░░░░        ││
│  └─────────────────────────┘│
│                             │
│  ┌─ HABIT CARD ────────────┐│  12px gap between cards
│  │  💪 Workout    [Start]  ││
│  │  ...                    ││
│  └─────────────────────────┘│
│                             │
│  (scrollable list)          │
│                             │
│                             │
├─────────────────────────────┤
│  BOTTOM NAV BAR (60px)      │  fixed
└─────────────────────────────┘
```

---

## Spacing

| Element | Value |
|---------|-------|
| Page horizontal padding | 16px |
| Below welcome message | 16px |
| Score card margin-bottom | 16px |
| Gap between habit cards | 12px |
| Page bottom padding | 16px + 60px (nav height) |

---

## Responsive Breakpoints

| Width | Behavior |
|-------|----------|
| 320px | Minimum supported — all padding at minimum |
| 375px | Standard phone (design target) |
| 428px | Large phone — cards stretch full width |
| 768px+ | Tablet consideration (V2) — 2-column grid |

---

## Empty State Layout

When no habits are active:

```
┌─────────────────────────────┐
│  TOP NAV                    │
├─────────────────────────────┤
│                             │
│        📋 (icon, large)     │
│   "No habits selected"      │  Playfair, 20px
│   "Go to Settings to"       │  Plex Mono, 14px, #A0A0A0
│   "activate trackers"       │
│                             │
│   [Go to Settings]          │  Primary button
│                             │
└─────────────────────────────┘
```
