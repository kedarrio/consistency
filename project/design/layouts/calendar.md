# Calendar Page Layout — Specifications

---

## Page Structure

```
┌─────────────────────────────┐
│   Calendar           ≡      │  ← Top nav
├─────────────────────────────┤
│                             │
│  ← February 2026 →          │  ← Month navigation (Playfair, 24px)
│                             │
│  M   T   W   T   F   S   S  │  ← Day headers (Plex Mono, 12px, #A0A0A0)
│  ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐│
│  │ │ │ │ │ │ │▓│ │ │ │░│ │ ││  ← Calendar cells (color-coded)
│  └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘│
│  (4-6 rows of days)         │
│                             │
│  ─ Feb 24, 2026 ────────────│  ← Day highlights (shows on tap)
│  ┌─ 75%  6/8 tracked ──────┐│
│  │  Meditation: 20 min      ││
│  │  Work: 4.5 hours         ││
│  │  [View More] →           ││
│  └─────────────────────────┘│
│                             │
├─────────────────────────────┤
│  BOTTOM NAV (Calendar)      │
└─────────────────────────────┘
```

---

## Calendar Grid

| Element | Spec |
|---------|------|
| Day cell size | Square, equal width (7 columns) |
| Cell gap | 4px |
| Cell border radius | 6px |
| Day number font | Plex Mono, 13px |
| Today indicator | 2px white border |
| Selected indicator | 2px #DB8686 border |
| Future days | Background #1A1A1A, 40% opacity |

## Month Navigation

```
← [Month Year] →
Left arrow:   Previous month
Right arrow:  Next month
Font:         Playfair, 24px
```
