# Testing Checklist — Manual Testing Procedures

> Run through all flows before marking any phase complete.

---

## Onboarding Flow

- [ ] Screen 1: "Continue" navigates to Screen 2
- [ ] Screen 2: "Get Started" disabled until consent checked
- [ ] Screen 3: "Next" disabled until name entered
- [ ] Screen 4: At least 1 habit required to proceed
- [ ] Screen 5: Only shown if Workout selected
- [ ] Screen 5: Body transformation toggle shows/hides fields
- [ ] Screen 7: "Make Promise" disabled until text entered
- [ ] Screen 7: Cannot enter more than 10 words
- [ ] Screen 8: "Good Luck!" completes onboarding
- [ ] Promise flash screen shows for 3 seconds then goes to Dashboard
- [ ] All data entered in onboarding is saved correctly
- [ ] Returning user skips onboarding (check `onboardingComplete` flag)

---

## Dashboard

- [ ] All active habits show as cards
- [ ] Welcome message shows user's name
- [ ] Cards show correct data (current progress, correct format)
- [ ] Tap card → navigates to Habit Detail
- [ ] Long-press → reorder mode activates
- [ ] Reordering saves and persists
- [ ] Hamburger icon → opens drawer
- [ ] Consistency score card shows/hides per setting

---

## Session Tracker (Meditation as reference)

- [ ] "Start Session" begins timer
- [ ] Timer accurate after navigating away and returning
- [ ] Timer accurate after page refresh
- [ ] "Stop Session" opens modal with correct pre-filled data
- [ ] Editing fields in modal saves correctly
- [ ] Cancel discards session, no entry created
- [ ] Entry appears in habit's data
- [ ] Dashboard card updates after session saved
- [ ] Manual entry (FAB) saves with correct date/time
- [ ] Stale session (>12h): detected on app open, modal shown
- [ ] Stale session: Cancel Session discards it correctly
- [ ] Stale session: Save Session saves with user-adjusted time

---

## Hydration (Incremental)

- [ ] "+" button increments count
- [ ] "−" button decrements (not below 0)
- [ ] Count saves immediately
- [ ] Goal reached (8/8): celebration animation plays
- [ ] New day: count resets to 0 (test by changing system date or mocking)
- [ ] Previous day's count preserved in history

---

## No-Fap (Streak)

- [ ] Streak count correct after app open
- [ ] Streak increments at day boundary
- [ ] Reset button opens confirmation modal
- [ ] Confirmation shows current and best streak
- [ ] Confirming reset → currentStreak = 0
- [ ] longestStreak never decreases
- [ ] "Starting fresh." message shown (neutral tone)
- [ ] Reset event saved with timestamp and notes

---

## Journal (Manual Entry)

- [ ] FAB opens entry modal
- [ ] Text mode: text area, saves entry
- [ ] Photo mode: camera/gallery opens, preview shows, saves
- [ ] Multiple entries on same day allowed
- [ ] Consistency = distinct days with entries (2 entries one day = still 1/5)
- [ ] Entry appears in Logs page

---

## Logs Page

- [ ] All entries listed in reverse chronological order
- [ ] Time range filter changes displayed entries
- [ ] Tap entry → edit modal pre-filled
- [ ] Edit and save → entry updated
- [ ] Long-press → select mode activates
- [ ] Multi-select and delete → confirmation modal
- [ ] Delete → entries removed, stats recalculate
- [ ] Empty state shown when no entries

---

## Stats Page

- [ ] Overall consistency % calculated correctly (see `specs/calculations.md`)
- [ ] Per-habit cards show correct %
- [ ] Time range filter changes all calculations
- [ ] Areas to Improve shows correct habits
- [ ] Tap habit card → navigates to `/habit/:id`

---

## Calendar Page

- [ ] Month displayed correctly
- [ ] Previous/next month navigation
- [ ] Day cells colored correctly based on consistency %
- [ ] Today has white border
- [ ] Tap day → highlights selected day, shows day card below
- [ ] "View More" → day detail page
- [ ] Day detail shows timeline with all habit entries

---

## Settings

- [ ] All preferences save and persist across refresh
- [ ] Habit toggles show/hide habits on dashboard
- [ ] Cannot disable last active habit
- [ ] Export CSV → file downloads with correct content
- [ ] Export JSON → file downloads with correct content
- [ ] Import → validation error for bad file
- [ ] Import merge → combines data
- [ ] Import overwrite → replaces data
- [ ] Clear all data → requires "DELETE" text → clears everything → back to onboarding
