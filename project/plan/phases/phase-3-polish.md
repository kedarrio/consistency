# Phase 3 — Polish & PWA (Weeks 5-6)

> **Goal:** Animations, notifications, PWA installation, testing, final polish.

---

## Deliverables

By end of Week 6:
1. ✅ All micro-animations implemented
2. ✅ Web Notifications API working
3. ✅ App installable as PWA on Android
4. ✅ Lighthouse scores: Performance >90, Accessibility >90
5. ✅ All edge cases handled (see `reference/edge-cases.md`)
6. ✅ Cross-browser tested
7. ✅ No critical bugs

---

## Week 5: Animations + Notifications

### Animations
See `design/animations.md` for complete specs.

Priority order:
1. Button press (scale + ripple) — most used
2. Progress bar fills — core visual
3. Modal open/close — frequent use
4. Page transitions — all navigation
5. Drawer slide — hamburger menu
6. Celebration confetti — occasional
7. Card lift (reorder mode) — occasional

### Notifications (Web Notifications API)
- Request permission when user enables notifications in Settings
- Use `ServiceWorkerRegistration.showNotification()` for persistent notifications
- Schedule with `setTimeout` (approximate) or use `setInterval` with time checks
- Does not guarantee exact delivery (PWA limitation) — inform user

---

## Week 6: Testing + PWA + Polish

### PWA Setup
```json
// manifest.json
{
  "name": "Consistency",
  "short_name": "Consistency",
  "description": "One day at a time",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0A0A0A",
  "theme_color": "#0A0A0A",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### Testing Checklist
See `qa/testing-checklist.md` for full list.

Key scenarios to test:
- Full onboarding flow
- Session timer (start, background, stop, stale recovery)
- Streak reset with reflection
- Hydration +/- with daily reset
- Journal photo upload
- Calendar heat map rendering
- Export/import data
- Clear all data (requires typing DELETE)
- Install prompt on mobile Chrome

---

## Acceptance Criteria for Phase 3

- [ ] No animation jank (60fps confirmed with DevTools Performance)
- [ ] Notifications fire at correct times (approximate)
- [ ] App installs on Android Chrome
- [ ] Offline works (static assets cached, data from localStorage)
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 90
- [ ] All user flows pass testing checklist
- [ ] No data loss on any flow tested
