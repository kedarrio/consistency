# Modals, Drawers & Overlays — Component Specifications

---

## Base Modal

```
Overlay backdrop:
  Background:   #00000080 (50% black)
  Position:     fixed, full screen
  Z-index:      200
  Tap to close: Yes (for non-critical modals)

Modal container:
  Background:   #1A1A1A
  Border radius: 16px (top corners only for bottom sheets, all corners for centered)
  Shadow:        0px 8px 24px rgba(0, 0, 0, 0.25)
  Max width:     480px (centered) or full-width (bottom sheet)
  Padding:       24px

Animation:
  Centered: fade + scale(0.95 → 1.0), 250ms ease-out
  Bottom sheet: translateY(100% → 0), 300ms ease-out
```

---

## Manual Entry Modal

Triggered by FAB tap on Habit Detail Page.

```
Type:         Bottom sheet (slides up from bottom)
Header:
  Title:      "Add Entry" — Playfair, 24px
  Close btn:  X icon, top-right
```

### Fields by Tracker Type

**Session-Based (Meditation, Work, Workout, Reading, Sleep):**
- Date picker (label: Date, defaults to today)
- Start time picker
- End time picker
- Duration: auto-calculated (editable number input, in minutes)
- Notes: text area (optional)
- **Workout only:** Type (text input), Intensity (segmented: Light | Normal | Heavy | Extreme)
- **Sleep only:** Quality rating (1-10 slider)
- **Work only:** Type of work (text input or tags)
- **Reading only:** Book title (text input, optional)

**Incremental (Hydration):**
- Date picker
- Number input: "I drank __ glasses"
- Time picker (optional)
- Notes (optional)

**Manual Entry (Journal):**
- Date picker
- Time picker (optional)
- Two options (tabs or toggle): "Text" | "Photo"
  - Text: full text area
  - Photo: upload button (camera or gallery), photo preview, optional caption

**Buttons (always):**
- Cancel — secondary button, full-width
- Save — primary button, full-width
- Order: Cancel on top/left, Save on bottom/right

---

## Stop Session Modal

Triggered when user taps "Stop Session" on a running session.

```
Type:         Bottom sheet
Header:       "Session Ended" — Playfair, 24px
```

**Pre-filled fields (all editable):**
- Duration: Auto-calculated (e.g., "25 minutes")
- Start time: When session began
- End time: Now
- Notes: text area
- Habit-specific fields (same as Manual Entry for that tracker type)

**Buttons:**
- Cancel (discards session) — secondary
- Save — primary

---

## Stale Session Modal

Triggered on app open if a session was started >12 hours ago.

```
Type:     Centered modal (not closable by backdrop tap)
Title:    "Looks like you forgot to stop [Habit]"
Content:
  - Started: "Yesterday, 8:00 AM"
  - Suggested end: "Yesterday, 8:30 AM" (start + 30 min)
  - Editable End time field
Buttons:
  - "Cancel Session" — secondary (discards it entirely)
  - "Save Session" — primary (saves with the adjusted time)
```

---

## Streak Reset Confirmation Modal

Triggered by tapping heartbreak icon or "Reset Streak".

```
Type:     Centered modal
Title:    "Reset your streak?" — Playfair, 20px
Content:
  - "Current: 23 days" — Plex Mono, 16px
  - "Best: 45 days (preserved)" — Plex Mono, 14px, #A0A0A0
  - Reflection prompt: "How are you feeling? What led to this?" — italic, #A0A0A0
  - Text area: optional, placeholder "Write something..." (encouraged)
Buttons:
  - "Cancel" — secondary
  - "Reset Streak" — danger button (#EF4444)
```

---

## Delete Confirmation Modal

Triggered by selecting entries and tapping delete.

```
Title:    "Delete X entries?"
Content:  "This cannot be undone."
Buttons:
  - "Cancel" — secondary
  - "Delete" — danger button (#EF4444)
```

---

## Clear All Data Modal

From Settings. Extra destructive — requires text confirmation.

```
Title:    "Delete all data?"
Content:
  - Warning text: "This will permanently delete ALL entries, settings, and photos."
  - "This cannot be undone."
  - Input field: 'Type "DELETE" to confirm'
Buttons:
  - "Cancel" — secondary
  - "Delete Everything" — danger, disabled until "DELETE" typed correctly
```

---

## Export Data Modal

From Settings.

```
Title:    "Export Data"
Content:
  - Format picker: "CSV" | "JSON" (segmented)
  - Brief description of selected format
Buttons:
  - Cancel
  - "Export" — primary (triggers file download)
```
