# Browser Compatibility — Testing Requirements

---

## Target Browsers (V1)

| Browser | Platform | Priority |
|---------|----------|----------|
| Chrome (latest) | Android + Desktop | Primary |
| Safari (latest) | iOS + macOS | High |
| Firefox (latest) | Desktop | Medium |
| Samsung Internet | Android | Low |
| Chrome (latest) | iOS | Medium |

---

## PWA Feature Compatibility

| Feature | Chrome Android | Safari iOS | Notes |
|---------|---------------|------------|-------|
| Install prompt (A2HS) | ✅ | ❌ (manual only) | Document iOS install instructions |
| Web Notifications | ✅ | ❌ iOS | Inform iOS users of limitation |
| Service Worker | ✅ | ✅ (limited) | Test caching on both |
| localStorage | ✅ | ✅ | Max 5-10MB on iOS |
| Camera API | ✅ | ✅ | Requires HTTPS |
| File Download | ✅ | Partial | iOS may open file in browser |

---

## Cross-Browser Testing Checklist

### Rendering
- [ ] Fonts load on all browsers (include system fallbacks)
- [ ] Habit card colors correct on all browsers
- [ ] Animations smooth on iOS Safari (use transform/opacity only)
- [ ] Custom scrollbar styles degrade gracefully on Firefox

### Functionality
- [ ] localStorage read/write works on all
- [ ] Date pickers work on all (custom implementation, not native `<input type="date">`)
- [ ] File upload (photos) works on mobile browsers
- [ ] File download (export) works or degrades gracefully

### iOS Specific
- [ ] PWA in standalone mode (no browser chrome) works
- [ ] Status bar color set via `<meta name="theme-color">`
- [ ] Safe area insets handled (`env(safe-area-inset-*)`) for notch devices
- [ ] No scroll bounce issues (overscroll behavior)

---

## Mobile Testing Requirements

| Device | Equivalent Size |
|--------|----------------|
| iPhone SE (small) | 375px × 667px |
| iPhone 14 (standard) | 390px × 844px |
| iPhone 14 Pro Max (large) | 430px × 932px |
| Samsung Galaxy S22 | 360px × 780px |

Test at minimum on 375px width — this is the design target.

---

## Safe Area Handling (iOS Notch)

```css
/* In global.css */
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}

.bottom-nav {
  padding-bottom: env(safe-area-inset-bottom);
  height: calc(60px + env(safe-area-inset-bottom));
}
```
