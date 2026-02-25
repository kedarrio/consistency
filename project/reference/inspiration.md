# Inspiration — Design Reference Notes

---

## Key Design Influences

### 1. Daily Counter App
The primary inspiration for the habit card UI.

**Why it works:**
- Clean, minimal layout
- Habit color fills entire card background
- Progress shown directly on card without extra screens
- Quick action buttons integrated into card
- Dark background makes colored cards pop

**What to borrow:**
- Card-per-habit approach
- Habit-specific color as card background
- Inline progress visualization

**What to do differently:**
- More data on cards (session timer, weekly stats)
- Better typography (Playfair for habit names)
- Dark text on light cards (vs their approach)

---

### 2. Nothing OS
Influences the minimal dark aesthetic.

**Why it works:**
- Near-black backgrounds (`#0D0D0D` range)
- Minimal decoration
- Typography does the heavy lifting
- Information density without clutter
- Monospace fonts for data/stats

**What to borrow:**
- Deep dark backgrounds
- Monospace font for all data (IBM Plex Mono)
- Minimal border and shadow usage
- Breathing room in layouts

---

### 3. Apple Design Language

**Influences:**
- iOS-style toggle switch (see `references/Toggle.png`)
- Apple-style segmented picker (see `references/SegmentedPicker.png`)
- Apple-style date/time picker (scrolling wheel)
- Rounded corners on everything
- Subtle shadows instead of hard outlines

**What to borrow:**
- Toggle and segmented picker look exactly
- Date picker scroll wheel interaction
- Generous touch targets
- Shadow + blur for depth

---

## Color Philosophy

The soft rose accent (`#DB8686`) was chosen:
- Warm but not aggressive
- Pairs well with dark backgrounds
- Feels personal, not corporate
- Muted enough to feel premium

Habit colors (`#C9B5E6`, `#E69A9A`, etc.) were chosen:
- All muted pastels (desaturated, soft)
- Harmonize with `#DB8686`
- Distinctive enough to identify habits instantly
- Light enough for dark text contrast

---

## Typography Philosophy

**Playfair Display** for headings:
- Serif gives warmth and personal feel
- Semi-bold communicates confidence
- Contrasts beautifully with data in monospace
- Feels "journalesque" appropriate for a personal tracker

**IBM Plex Mono** for data:
- Data should feel computational and precise
- Monospace ensures consistent spacing of numbers
- IBM Plex has humanist details vs cold Courier
- Used by engineers who trust their data

---

## Anti-Inspiration (What To Avoid)

- **Streaks by Duolingo** — gamified, green streaks, external pressure
- **Habitica** — too much gamification (RPG elements)
- **Bereal/Instagram** — social, performative
- **Apple Fitness+** — motivational cheerleading tone
- **Any app with bright oranges, greens, badges, or confetti as primary mechanic**
