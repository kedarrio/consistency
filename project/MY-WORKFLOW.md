# My Workflow — How to Build Consistency With an AI Agent

> This file tells you exactly how to prompt an AI agent (Claude, Gemini, etc.) to build this app. Follow the chunks in order. Do not skip ahead.


## To run claude code:

```
antigravity-claude-proxy start
claude --dangerously-skip-permissions
```

---

## Before You Start — What to Always Include

Every prompt you send should begin with:

```
Read the following files before doing anything:
- project/START-HERE.md
- project/design/claude-guardrails.md
```

This grounds the agent in the project rules every single session. Never skip this.

---

## The Chunks

### Chunk 1 — Project Setup & Design System

**Goal:** Get a working Vite + React app with all fonts, colors, and CSS variables wired up.

**Prompt:**
```
Read project/START-HERE.md and project/design/claude-guardrails.md first.
Then follow the instructions in project/plan/prompts/1.1-project-setup.md to set up the project.
After setup is complete, follow project/plan/prompts/1.2-design-system.md to implement the design system.
Reference project/design/tokens.json for all values — do not hardcode anything.
```

**Done when:**
- `npm run dev` runs without errors
- Playfair Display and IBM Plex Mono load in the browser
- All CSS custom properties from tokens.json are set as CSS variables

---

### Chunk 2 — Component Library

**Goal:** Build every reusable UI component before touching any page.

**Prompt:**
```
Read project/START-HERE.md and project/design/claude-guardrails.md first.
Then follow project/plan/prompts/1.3-components.md to build the component library.

Pay special attention to:
- project/design/components/cards.md — the habit card layout MUST match project/reference/HabitCard.png exactly
- project/design/components/inputs.md — toggle must match project/reference/Toggle.png
- project/design/components/inputs.md — segmented picker must match project/reference/SegmentedPicker.png
- project/design/components/buttons.md, navigation.md, progress.md, charts.md, modals.md
```

**Done when:** Every component renders correctly and matches its reference file.

---

### Chunk 3 — Data Layer & Onboarding

**Goal:** Wire up localStorage and build the 8-screen onboarding flow.

**Prompt:**
```
Read project/START-HERE.md and project/design/claude-guardrails.md first.
Build the data layer using the schemas in project/specs/data-model.md.
Then build the onboarding flow using project/specs/features/onboarding.md.
The onboarding must match the screen descriptions in project/CONSISTENCY.md (Section 7 — Onboarding Flow).
After Screen 8, save all data to localStorage and navigate to the Dashboard.
```

**Done when:**
- Completing onboarding saves correct data to localStorage
- Returning user skips onboarding
- Promise flash screen shows for 3s on first launch

---

### Chunk 4 — Dashboard

**Goal:** Fully functional Dashboard with all habit cards.

**Prompt:**
```
Read project/START-HERE.md and project/design/claude-guardrails.md first.
Build the Dashboard page using:
- project/ui-requirements/dashboard.md — every element explained
- project/design/layouts/dashboard.md — layout and spacing
- project/design/components/cards.md — card structure (MUST match HabitCard.png)
Pull habit data from localStorage (set up in Chunk 3).
Cards should be reorderable via long-press. Quick action buttons should work (but tracker logic comes in Chunk 5).
```

**Done when:** Dashboard shows all active habits with correct card layout, reorder works, navigation works.

---

### Chunk 5 — Session Trackers (Meditation first, then replicate)

**Goal:** Build all session-based habit trackers.

**Prompt:**
```
Read project/START-HERE.md and project/design/claude-guardrails.md first.
Build the Meditation habit detail page first using:
- project/ui-requirements/habit-detail-pages.md
- project/specs/features/session-tracking.md
- project/design/layouts/habit-detail.md

The session timer MUST persist across page refresh (use stored startTimestamp — see session-tracking.md).
Handle stale sessions (>12 hours) as described in session-tracking.md.
Include the Manual Entry modal (project/design/components/modals.md).
Once Meditation works, replicate for: Work, Workout, Reading, Sleep — referencing habit-specific fields in data-model.md.
```

**Done when:** Timer persists across refresh. Stop modal saves correctly. Stale session handled.

---

### Chunk 6 — Remaining Trackers

**Goal:** Build Hydration, No-Fap, and Journal trackers.

**Prompt:**
```
Read project/START-HERE.md and project/design/claude-guardrails.md first.
Build the remaining 3 tracker types:

1. Hydration (incremental) — project/specs/features/incremental-tracking.md
2. No-Fap (streak) — project/specs/features/streak-tracking.md
   - The reset modal MUST be neutral in tone (see guardrails — no guilt)
   - longestStreak must never decrease
3. Journal (manual entry) — project/specs/features/manual-entry.md
   - Support both text and photo entries
```

**Done when:** All 8 habits fully functional on dashboard and detail pages.

---

### Chunk 7 — Logs Page

**Goal:** Per-habit logs with edit and delete.

**Prompt:**
```
Read project/START-HERE.md first.
Build the Logs page (/logs/:habitId) using project/ui-requirements/logs-page.md.
- Time range filter
- Tap to edit, long-press for multi-select delete
- No-Fap logs show reset events (not session entries)
- Empty state required
```

---

### Chunk 8 — Stats Page

**Goal:** All consistency calculations rendered correctly.

**Prompt:**
```
Read project/START-HERE.md and project/specs/calculations.md first.
Build the Stats page using project/ui-requirements/stats-page.md.

The calculations MUST follow specs/calculations.md exactly:
- Session trackers: total minutes / weekly goal
- Incremental: average of daily percentages
- Streak trackers: excluded from overall score
- Manual: distinct days with entries / goal days
- Overall: average of all active habit scores (excluding streak)
```

**Done when:** Numbers match the formulas in calculations.md when tested with known data.

---

### Chunk 9 — Calendar Page

**Goal:** Heat map calendar with day detail view.

**Prompt:**
```
Read project/START-HERE.md first.
Build the Calendar page using project/ui-requirements/calendar-page.md.
- Monthly heat map grid with color interpolation (specs/calculations.md — Heat Map Color Calculation)
- Tapping a day shows the day highlights card below the grid
- "View More" navigates to /calendar/day/:date with a timeline view
```

---

### Chunk 10 — Profile & Settings Pages

**Goal:** Complete profile and settings.

**Prompt:**
```
Read project/START-HERE.md first.
Build the Profile page using project/ui-requirements/profile-page.md.
Build the Settings page using project/ui-requirements/settings-page.md.
Settings must include:
- Export/import (specs/features/data-export.md)
- Active habit toggles
- Notification toggles (specs/features/notifications.md)
- Clear all data (requires typing "DELETE" — see modals.md)
```

---

### Chunk 11 — Animations & Polish

**Goal:** All micro-animations from the spec.

**Prompt:**
```
Read project/START-HERE.md and project/design/animations.md first.
Add all animations from animations.md:
- Button press (scale + ripple)
- Progress bar fills (500ms ease-out)
- Page transitions (slide)
- Modal open/close
- Celebration on goal completion
Check project/reference/edge-cases.md and handle every case listed there.
```

---

### Chunk 12 — PWA & Final QA

**Goal:** Installable PWA, passing all QA checks.

**Prompt:**
```
Read project/START-HERE.md first.
Set up PWA using project/plan/phases/phase-3-polish.md.
Then run through ALL checks in:
- project/qa/testing-checklist.md
- project/qa/definition-of-done.md
- project/qa/accessibility.md
- project/qa/performance.md
Fix any failures. Lighthouse Performance and Accessibility must both be ≥ 90.
```

---

## Tips

- **One chunk per conversation.** Don't try to do multiple chunks in one session — the agent will lose context and make mistakes.
- **Always start with the guardrails.** The agent needs to re-read `claude-guardrails.md` every session — it forgets between conversations.
- **If something looks wrong**, ask the agent to re-read the relevant spec file before changing anything.
- **After each chunk**, verify the Definition of Done in `qa/definition-of-done.md` before moving on.
- **Reference the image files** when the agent gets cards/inputs wrong: *"re-read project/reference/HabitCard.png and fix the card to match it exactly."*
