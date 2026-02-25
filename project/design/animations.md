# Animations & Micro-Interactions

> All animations in the Consistency app. Follow these specifications exactly to achieve a polished, premium feel.

---

## Animation Principles

1. **Subtle, not showy** — animations enhance UX, they don't distract
2. **Purposeful** — every animation communicates something
3. **60fps always** — use `transform` and `opacity`, avoid animating `width`, `height`, or layout properties
4. **Respect reduced motion** — wrap celebratory animations in `prefers-reduced-motion` check

---

## Duration Scale

| Speed | Duration | Use |
|-------|----------|-----|
| Fast | `150ms` | Button press, ripple, toggle |
| Normal | `250ms` | Page transitions, modals, drawer slide |
| Slow | `500ms` | Progress bar fill, chart draw |

## Easing

| Context | Curve | CSS Value |
|---------|-------|-----------|
| Default | ease-in-out | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Enter (things appearing) | ease-out | `cubic-bezier(0, 0, 0.2, 1)` |
| Exit (things disappearing) | ease-in | `cubic-bezier(0.4, 0, 1, 1)` |
| Spring bounce | ease-out-back | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

---

## Component Animations

### Button Press
- **Transform:** `scale(0.95)` on press, `scale(1.0)` on release
- **Ripple:** Circular ripple from tap point, opacity 0→0.2→0, `150ms`
- **Duration:** `150ms` ease-in-out
- **Implementation:** CSS `:active` pseudo-class + transition

### Progress Bar Fill
- **Trigger:** On data update (new entry saved, day changes)
- **Animation:** Width animates from current % to new %
- **Duration:** `500ms` ease-out
- **Implementation:** CSS `transition: width 500ms ease-out`

### Circular Progress (Timer)
- **Animation:** Stroke-dasharray animates as time progresses
- **Note:** Timer ring is decorative — the center text is the primary display
- **Duration:** Continuous (updates every second)

### Page Transitions
- **Forward navigation:** New page slides in from right (`translateX(100%)` → `0`)
- **Back navigation:** Current page slides out to right (`0` → `translateX(100%)`)
- **Modal open:** Fade in + scale up (`opacity 0→1`, `scale(0.95→1)`)
- **Modal close:** Fade out + scale down
- **Duration:** `250ms` ease-in-out

### Hamburger Drawer
- **Open:** Slide in from right (`translateX(100%)` → `0`)
- **Close:** Slide out to right (`0` → `translateX(100%)`)
- **Backdrop:** Fade in simultaneously (`opacity 0→0.5`)
- **Duration:** `250ms` ease-out (open), `200ms` ease-in (close)

### Habit Card Quick Actions
- **Start/Stop button:** Swap icons with a brief scale (`scale(0.8→1.0)`, `150ms`)
- **Count increment (hydration):** Count text briefly scales up (`scale(1.0→1.2→1.0)`, `200ms`)

### Completion Celebration
- **Trigger:** When a daily/weekly goal is reached (e.g., hydration 8/8 glasses)
- **Animation:** 
  1. Brief confetti burst (1-2 seconds) — small colored particles from the card
  2. Progress bar fills completely and pulses once
  3. Optional: Success sound (if enabled in settings)
- **Duration:** `1000-2000ms` total
- **Style:** Subtle, not obnoxious — small confetti, not a fireworks show
- **Implementation:** CSS keyframes or canvas-based confetti library
- **Respect `prefers-reduced-motion`:** Skip confetti, just fill the bar

### Card Reordering (Long-Press)
- **Lift effect:** Selected card gets `scale(1.05)` + increased shadow
- **Duration:** `200ms` ease-out
- **Other cards:** Shift smoothly to fill gap (`250ms`)
- **Drop:** Card snaps to position with brief spring `cubic-bezier(0.34, 1.56, 0.64, 1)` (`300ms`)

### Streak Reset Modal
- **Warning shake:** Brief horizontal shake on streak value (`-5px → 5px → -3px → 3px → 0`, `400ms`)
- **Purpose:** Communicates the weight of resetting without being guilt-inducing

### Toggle Switch (iOS-style)
- **Duration:** `250ms` ease-in-out
- **Knob:** Slides from left to right (or right to left)
- **Background:** Color transitions simultaneously (`#3A3A3A → #DB8686`)

### Logo Fade-In (Splash)
- **Animation:** `opacity 0→1`, no transform needed
- **Duration:** `500ms` ease-out
- **Delay:** None (immediate on load)

### Promise Screen
- **Animation:** Cross-fade from onboarding → promise screen → dashboard
- **Timing:** Promise shows for 3 seconds, then auto-advances
- **Transition:** Fade (`opacity 0→1→0`, soft cross-dissolve)

### Skeleton Loading
- **Use:** While habit data is loading
- **Animation:** Shimmer effect — gradient scan from left to right
- **Colors:** `#1A1A1A → #242424 → #1A1A1A`
- **Duration:** `1500ms` infinite loop

---

## CSS Implementation Guide

```css
/* Button press */
.btn {
  transition: transform 150ms ease-in-out, background-color 150ms ease-in-out;
}
.btn:active {
  transform: scale(0.95);
}

/* Progress bar */
.progress-bar-fill {
  transition: width 500ms ease-out;
}

/* Modal */
.modal-enter { opacity: 0; transform: scale(0.95); }
.modal-enter-active { opacity: 1; transform: scale(1); transition: 250ms ease-out; }
.modal-exit { opacity: 1; transform: scale(1); }
.modal-exit-active { opacity: 0; transform: scale(0.95); transition: 200ms ease-in; }

/* Drawer */
.drawer-enter { transform: translateX(100%); }
.drawer-enter-active { transform: translateX(0); transition: 250ms ease-out; }
.drawer-exit { transform: translateX(0); }
.drawer-exit-active { transform: translateX(100%); transition: 200ms ease-in; }

/* Toggle */
.toggle-knob {
  transition: transform 250ms ease-in-out;
}
.toggle-track {
  transition: background-color 250ms ease-in-out;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
