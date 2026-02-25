# Definition of Done — Checklist

> Before marking any feature as complete, verify ALL items in this checklist.

---

## Visual / Design

- [ ] UI matches the specification in the relevant spec file
- [ ] Design tokens used (no hardcoded colors, fonts, or spacing)
- [ ] Habit cards use habit-specific colors from `tokens.json`
- [ ] Dark text (`#2A2A2A`) used on all habit card surfaces (not white)
- [ ] Reference images matched (HabitCard, Toggle, SegmentedPicker)
- [ ] All fonts render correctly (Playfair Display + IBM Plex Mono)
- [ ] Responsive on 320px minimum width
- [ ] Dark theme consistent throughout (no white/light backgrounds)

---

## Functionality

- [ ] Feature works as described in its spec file
- [ ] All user flows covered (happy path)
- [ ] All edge cases in `reference/edge-cases.md` handled for this feature
- [ ] Data saved immediately on every action (no batching)
- [ ] Data persists across page refresh
- [ ] Empty state implemented and looks polished
- [ ] Error states handled (file upload fails, storage full, etc.)

---

## Data Integrity

- [ ] Consistency calculations match formulas in `specs/calculations.md`
- [ ] Longest streak never decreases
- [ ] Completed goals show 100% (not 110%+)
- [ ] No data is lost on any tested user action
- [ ] Import/export round-trip test: export then import produces same data

---

## Navigation

- [ ] All navigation targets function correctly
- [ ] Back button behavior matches spec in `specs/navigation.md`
- [ ] No broken routes
- [ ] Onboarding guard works (unauthenticated users go to onboarding)

---

## Performance

- [ ] No perceptible lag on low-end mobile (simulate throttled CPU)
- [ ] Progress bar fills animate smoothly (not jump)
- [ ] Habit card list scrolls at 60fps
- [ ] No memory leak from timer intervals (clean up on unmount)
- [ ] Timer interval cleanup verified

---

## Accessibility

- [ ] All touch targets ≥ 44px
- [ ] Color is not the only differentiator (icon/text accompanies color)
- [ ] Contrast ratio ≥ 4.5:1 for all text (WCAG AA)
- [ ] Modal/drawer closes on Escape key (desktop)
- [ ] Focus management: modal opens → focus moves to first element

---

## Code Quality

- [ ] No console errors or warnings
- [ ] Component props validated
- [ ] Async operations have loading and error states
- [ ] No hardcoded strings (use constants where appropriate)

---

## Tone / Philosophy

- [ ] No gamification elements added
- [ ] No guilt-inducing language in any copy
- [ ] All messages are neutral in tone
- [ ] No social features or comparisons
