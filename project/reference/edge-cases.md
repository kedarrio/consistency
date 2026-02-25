# Edge Cases — How to Handle Them

> Every edge case that must be handled gracefully. Test all of these.

---

## Session Timer Edge Cases

| Scenario | How to Handle |
|----------|--------------|
| User forgets to stop timer (>12h old) | Show stale session modal on next app open. Let user set correct end time or cancel session. |
| User starts session just before midnight | Session spans two days — attribute to the day it STARTED |
| Multiple habits with active sessions | Each tracks independently. All show on dashboard. |
| Timer still shows after session saved | Clear `activeSession` from storage on save. |
| Page refresh with active session | Recompute elapsed from stored `startTimestamp`. |
| System clock changed while timer running | Recompute from stored `startTimestamp`. Timer may jump — that's acceptable. |

---

## Day Boundary Edge Cases

| Scenario | How to Handle |
|----------|--------------|
| User opens app just before midnight | "Today" is based on current date at time of query. |
| User opens app just after midnight | New day starts. Previous day's data now in history. |
| User in different timezone | All times stored in UTC. Display in local timezone. |
| Sleep schedule: user awake past midnight | "Today" extends until `idealWakeTime` the next morning. |

---

## Streak Edge Cases

| Scenario | How to Handle |
|----------|--------------|
| User doesn't open app for 5 days | On next open, compute streak based on days elapsed with no reset — increment accordingly. |
| User resets streak then immediately regrets it | No undo — reset is permanent. A new streak starts. |
| User's longestStreak was set on previous version | Preserve it — longestStreak never goes down. |

---

## Data / Storage Edge Cases

| Scenario | How to Handle |
|----------|--------------|
| localStorage full | Catch QuotaExceededError. Show: "Storage full. Clear some data in Settings." |
| Corrupted localStorage data | Catch JSON parse errors. Show: "Data issue detected. You may need to clear app data." |
| Import file is malformed JSON | Show error toast: "Invalid file format" |
| Export with no data | Still export — empty arrays are valid JSON |
| Photos taking up too much space | After ~20 photos, show warning: "Storage getting full. Consider exporting photos." |

---

## Empty State Edge Cases

| Scenario | What to Show |
|----------|-------------|
| Dashboard — no habits active | "No habits selected. Go to Settings to activate trackers." |
| Logs page — no entries | "No entries yet. Start tracking to see your history here." |
| Stats page — new user (no data) | "Not enough data yet. Track for a few days." |
| Calendar — future month | Show empty grid. Future days greyed out. |
| Stats — habit with 0 logged | Show "—" not "0%" (no data vs 0 minutes logged today) |

---

## Hydration Edge Cases

| Scenario | How to Handle |
|----------|--------------|
| User taps + very rapidly | Debounce saves (100ms) or use optimistic updates with batched write |
| Count goes above goal | Cap display at goal (show 8/8), still count internally, cap at 100% for consistency |
| Glass size changed in settings mid-day | Apply to future entries only; don't retroactively change historical counts |

---

## Onboarding Edge Cases

| Scenario | How to Handle |
|----------|--------------|
| User doesn't select any habit (tries to proceed from Screen 4) | Button disabled. Show: "Select at least one habit" |
| User types >10 words in promise | Block input beyond 10 words. Counter turns red. |
| User navigates back through onboarding | Data from completed screens is preserved when going back/forward |
| Onboarding interrupted (app closed mid-flow) | On next open: `onboardingComplete` is still false → restart onboarding from beginning |

---

## Calendar Edge Cases

| Scenario | How to Handle |
|----------|--------------|
| Month with 28 days (February non-leap) | Grid adapts — 4 rows |
| Month starting on Sunday | Align correctly with user's weekStartDay setting |
| Day with no habit data | Background: `#1A1A1A` (no data, darkest) |
| Future day tapped | Show "No data for future dates" in day highlights area |

---

## No-Fap Edge Cases

| Scenario | How to Handle |
|----------|--------------|
| User's current streak is new record at time of reset | Update longestStreak BEFORE zeroing currentStreak |
| Streak = 0 when reset pressed | Allow it (user can reset a 0-day streak if they want to log a relapse) |
| User opens app after many days without opening | Streak should have incremented for all those days |
