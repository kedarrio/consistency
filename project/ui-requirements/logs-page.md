# Logs Page — UI Requirements

---

## URL
`/logs/:habitId`

## Top Navigation
- Left: Back arrow → /habit/:habitId
- Center: "[Habit] Logs" (e.g., "Meditation Logs") — Playfair, 24px
- Right: Hamburger icon

## Time Range Filter
Position: Top of content, below nav.

Segmented picker:
**All Time | Last 7 Days | Last 30 Days | This Week | This Month | Custom**

Default: All Time

If "Custom" selected:
```
Show two date pickers:
  "From:" [date picker]
  "To:"   [date picker]
```

## Entry List
Vertical scrollable list with 8px gap between entries.

### Entry Card (General)
```
Background:     #1A1A1A
Padding:        16px
Border radius:  12px

Line 1:  "Feb 24, 2026 • 8:00 AM" — Plex Mono, 14px, #A0A0A0
Line 2:  Value ("25 minutes", "3 glasses", "23-day streak") — Plex Mono, 18px, white
Line 3:  Type/extra ("Heavy | Cardio") — Plex Mono, 14px, #A0A0A0
Line 4:  Notes preview (first 50 chars, if notes exist) — Plex Mono, 12px, #6A6A6A
```

### Tap Entry
Opens edit modal (same as manual entry form, pre-filled with entry data).

### Long-Press Entry
Activates Select Mode:
```
All entries: checkbox appears (left side)
Top bar changes:
  Left:  "3 selected" (Plex Mono, 14px)
  Right: [Select All] [trash icon] [X]
  
Tap more entries → add to selection
Tap X → exit select mode (deselect all)
Tap trash → Confirm Delete modal
```

## Empty State
```
Center icon + "No entries yet" — Playfair, 20px
Subtext: "Start tracking to see your history here" — Plex Mono, 14px, #A0A0A0
Button: "Add Entry" (primary) → opens manual entry modal
```

## No-Fap Logs (Special Case)
Shows reset events instead of session entries:
```
"Reset — 23-day streak broken"   (red tint entry)
"Started: [date]"
Notes: "Felt stressed..."
```
Not editable (reset history is permanent).
