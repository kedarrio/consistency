# Settings Page — UI Requirements

---

## Top Navigation
- Center: "Settings" — Playfair, 24px
- No left/right buttons

## Layout
Scrollable page, divided into named sections separated by headers.

Row style (most settings):
```
Height:       52px
Left:         Label (Plex Mono, 16px, white)
Right:        Control (toggle/picker/chevron)
Border-bottom: 1px #2A2A2A
```

---

## Section 1: Preferences

**"Preferences" header — Playfair, 20px**

| Setting | Control | Notes |
|---------|---------|-------|
| Week starts on | Dropdown/select | Mon, Tue, Wed, Thu, Fri, Sat, Sun |
| Time format | SegmentedPicker | 12h \| 24h |
| Day resets at | Options/dropdown | Midnight \| Sleep schedule \| Custom |
| (if non-midnight) Ideal bedtime | Time picker row | Shows when dayBoundary ≠ midnight |
| (if non-midnight) Ideal wake time | Time picker row | Shows when dayBoundary ≠ midnight |
| Theme | SegmentedPicker | Dark (disabled in V1) |
| Hydration glass size | Number input + "ml" | Default: 250 |

---

## Section 2: Active Habits

**"Active Habits" header — Playfair, 20px**

```
List of all 8 habits:
  Row: [icon] [Habit Name]          [toggle]
  Tap row (not toggle): → /habit/:id
  Toggle: show/hide on dashboard
  Rule: at least 1 must stay active
  If user tries to disable last habit: show toast "At least 1 habit must be active"
```

---

## Section 3: Notifications

**"Notifications" header — Playfair, 20px**

```
Row: "Enable notifications"     [toggle]
  If ON:
    Button: "Configure Details →" (secondary, navigate to /settings/notifications)
    Row: "Enable sounds"        [toggle]
```

---

## Section 4: Data Management

**"Data Management" header — Playfair, 20px**

```
"Export Data" → Opens export modal
"Import Data" → Opens file picker → import modal
"Clear All Data" → Red text, opens destructive confirmation modal
```

---

## Section 5: Display

**"Display" header — Playfair, 20px**

```
"Show consistency score on dashboard"    [toggle]
"Show 'Areas to Improve' on Stats"       [toggle]
```

---

## Section 6: About

**"About" header — Playfair, 20px**

```
"App version"                             v1.0.0
"About Consistency"          chevron →   modal
"Send Feedback"              chevron →   email link (future)
```

---

## Bottom Nav
Settings icon active.
