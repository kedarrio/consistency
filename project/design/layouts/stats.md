# Stats Page Layout — Specifications

---

## Page Structure

```
┌─────────────────────────────┐
│   Statistics         ≡      │  ← Top nav
├─────────────────────────────┤
│                             │
│ [Daily|Weekly|Monthly|...]  │  ← Segmented time range picker
│                             │
│  ┌─ OVERALL SCORE ─────────┐│
│  │                         ││
│  │       78%               ││  ← Playfair, 64px, #DB8686
│  │  Overall consistency    ││
│  │  this week              ││
│  │                         ││
│  └─────────────────────────┘│
│                             │
│  ─ PER HABIT STATS ─────────│  ← Section header
│                             │
│  ┌─ Meditation 86% ────────┐│
│  │  progress bar           ││
│  │  streak / total         ││
│  │  mini chart             ││
│  └─────────────────────────┘│
│                             │
│  ┌─ Work 72% ──────────────┐│  12px gap between cards
│  │  ...                    ││
│  └─────────────────────────┘│
│                             │
│  (all active habits)        │
│                             │
│  ─ Areas to Improve ────────│
│  Reading: 29% this week     │
│  3 more sessions to goal    │
│                             │
├─────────────────────────────┤
│  BOTTOM NAV (Stats active)  │
└─────────────────────────────┘
```

---

## Component Sizing

| Component | Size |
|-----------|------|
| Overall score percentage | Playfair, 64px |
| Overall score label | Plex Mono, 16px, #A0A0A0 |
| Per-habit consistency % | Playfair, 32px (habit color) |
| Per-habit name | Playfair, 20px |
| Metrics below habit name | Plex Mono, 14px, #A0A0A0 |
| Mini chart height | 80px |
