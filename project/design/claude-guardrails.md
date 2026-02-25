# Agent Guardrails — Critical Rules for Consistency App

> ⚠️ Read this before writing any code. These rules are non-negotiable.

---

## 🔴 CRITICAL RULES (Never Violate)

### 1. Never Use Gamification
- **No points, XP, levels, badges, or achievements**
- **No leaderboards or social comparisons**
- Progress is shown as objective data only (percentages, streaks, charts)
- The only "reward" is seeing your consistency score improve

### 2. Neutral Tone Only
- **No guilt-inducing language** — never say "You missed a day!" or "Don't give up!"
- **No celebratory over-enthusiasm** — subtle animations only, not party mode
- When a streak breaks: neutral message only — e.g., "Starting fresh."
- When consistency is low: factual only — e.g., "Reading: 29% this week"

### 3. Never Hardcode Design Values
- Always reference `design/tokens.json` for colors, sizes, fonts
- Never write `color: #DB8686` in code without a variable — use CSS custom properties or token references
- All spacing must use the spacing scale (4, 8, 12, 16, 20, 24, 32px)

### 4. Dark Text on Habit Cards
- Habit card backgrounds are light pastels — always use `#2A2A2A` for text on cards
- Never use white text on habit card backgrounds
- Primary app text is white — this only applies to habit card surfaces

### 5. Data Persistence on Every Action
- Save to localStorage/IndexedDB immediately on every user action
- Never batch saves — if the app crashes, no data should be lost
- Session timer: persist start time in storage so it survives page refresh/close

### 6. FAB Placement Rules
- FAB is **NOT on the Dashboard** — it was removed
- FAB is on Habit Detail Pages, except for Streak-Only trackers (No-Fap)
- FAB position: bottom-right, 16px from right, 16px above bottom nav

### 7. Match Reference Images Exactly
- See `design/reference-images/` and `references/` for visual targets
- Habit card layout must match `HabitCard.png` exactly
- Toggle must match `Toggle.png` (iOS-style)
- Segmented picker must match `SegmentedPicker.png` (Apple-style)

---

## 🟡 IMPORTANT RULES (Deviation Requires Justification)

### Navigation
- Bottom nav must have exactly 4 items: Dashboard | Stats | Calendar | Settings
- Profile is accessible via Hamburger menu only (not in bottom nav)
- Hamburger menu opens from the right side as a drawer

### Typography Rules
- **Playfair Display** for ALL headings, habit names, and large numbers
- **IBM Plex Mono** for ALL data, timestamps, labels, body text
- Never mix up these fonts — Playfair = decorative/semantic, Plex = data/functional

### Habit Colors
- Each habit has a specific background color — do not change them
- The colors in `tokens.json` are final — they were designed for visual harmony with `#DB8686`
- Never use generic colors for habits

### Icon Rules
- Material Design Icons, Rounded style, Outlined (not filled), Weight 300
- Active nav icons: filled + `#DB8686` color
- Inactive nav icons: outlined + `#A0A0A0` color

### Session Timer Edge Case
- If a session is >12 hours old when app opens, prompt the user to review/cancel it
- Never auto-discard a session — always give the user control

### Streak Reset Flow
- When user resets a streak, always show a reflection prompt (optional text, but encouraged)
- Never auto-reset streaks without explicit user action
- Longest streak must NEVER decrease — it only goes up or stays the same

---

## 🟢 BEST PRACTICES

### Performance
- Time to Interactive: <3 seconds
- 60fps animations — use `transform` and `opacity` for GPU-accelerated animations
- Progress bars: animate with CSS transitions, not JavaScript intervals

### Accessibility
- All touch targets ≥ 44px
- Color is never the only differentiator (always pair with text/icon)
- WCAG 2.1 AA color contrast

### Mobile First
- Design for 320px minimum width
- Test all layouts at 375px (standard iPhone)
- Bottom nav and FAB must be thumb-reachable

### Empty States
- Always show a helpful empty state — never a blank screen
- Dashboard with no habits: "No habits selected. Go to Settings."
- Logs page with no entries: "No entries yet. Start tracking."

### Confirmation Before Destructive Actions
- Deleting entries: always show confirmation modal
- Clear all data: require typing "DELETE" to confirm
- Streak reset: show confirmation with current streak info

---

## 📋 Before Marking Any Feature Complete

Check `qa/definition-of-done.md` — do not mark done without checking this list.
