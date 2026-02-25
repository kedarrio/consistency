# Phase 2 — Core Features (Weeks 2-4)

> **Goal:** Build all 8 habit trackers, implement complete data persistence, all pages functional.

---

## Deliverables

By end of Week 4:
1. ✅ Onboarding flow (8 screens) complete
2. ✅ Dashboard fully functional with all 8 habit cards
3. ✅ All tracker types implemented (session, incremental, streak, manual)
4. ✅ All 8 individual habit detail pages working
5. ✅ Logs page (view, edit, delete)
6. ✅ Stats page with calculations
7. ✅ Calendar page with heat map
8. ✅ Profile page
9. ✅ Settings page (all options)
10. ✅ Body transformation feature (Workout)
11. ✅ Data persists across page refresh and app close

---

## Week 2: Data + Onboarding + Dashboard

### Week 2 Tasks
1. Data layer (localStorage utilities + React Context)
2. Onboarding flow (all 8 screens)
3. Dashboard (habit cards + welcome message)
4. Session timer (start/stop + background persistence)

### Data Architecture
All data in `localStorage` as JSON. Keys:
- `consistency_user` — user profile
- `consistency_settings` — preferences
- `consistency_habits` — all habit data + entries

See `specs/data-model.md` for complete schemas.

---

## Week 3: All Trackers + Habit Detail Pages

### Week 3 Tasks
1. Session-based detail pages (Meditation → replicate for Work, Workout, Reading, Sleep)
2. Incremental tracker (Hydration)
3. Streak tracker (No-Fap)
4. Manual entry tracker (Journal)
5. Logs page

### Implementation Order
1. Meditation (reference implementation — most complex session tracker)
2. Work (session — simple, no extra fields)
3. Workout (session + intensity + body transformation)
4. Sleep (session + quality rating)
5. Reading (session + book title)
6. Hydration (incremental — simple)
7. No-Fap (streak — simple)
8. Journal (manual — text + photo)

---

## Week 4: Stats, Calendar, Profile, Settings

### Week 4 Tasks
1. Stats page (all calculations working)
2. Calendar page (heat map + day detail)
3. Profile page
4. Settings page (all options)
5. Integration testing (end-to-end flows)

---

## Acceptance Criteria for Phase 2

- [ ] Completing onboarding lands user on Dashboard with selected habits
- [ ] Session timer persists across page close/refresh
- [ ] All entries save immediately to localStorage
- [ ] No data lost on any user action
- [ ] Consistency calculations match formulas in `specs/calculations.md`
- [ ] Calendar heat map colors match specs
- [ ] All 8 trackers functional
- [ ] Logs page shows all entries with correct edit/delete
- [ ] Settings changes take effect immediately
