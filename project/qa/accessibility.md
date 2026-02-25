# Accessibility — WCAG Compliance Requirements

---

## Target Standard: WCAG 2.1 AA

Lighthouse Accessibility score target: **≥ 90**

---

## Color Contrast

| Context | Requirement | How to Meet |
|---------|-------------|-------------|
| Normal text on dark bg | ≥ 4.5:1 | `#FFFFFF` on `#0A0A0A` = 21:1 ✓ |
| Large text on dark bg | ≥ 3:1 | Headings easily met |
| Dark text on habit cards | ≥ 4.5:1 | `#2A2A2A` on `#C9B5E6` = check with tool |
| Muted text (`#A0A0A0`) | ≥ 4.5:1 | May fail — verify and increase to `#B0B0B0` if needed |
| Primary accent `#DB8686` on dark | ≥ 3:1 for large text | Verify |

Use the WebAIM Contrast Checker to verify all color combinations.

---

## Touch Targets

| Element | Minimum Size |
|---------|-------------|
| All buttons | 44px × 44px |
| Nav bar items | 44px tall (full nav height = 60px ✓) |
| Habit card quick action buttons | 44px minimum |
| Toggle switch | 44px touch target (even if visually smaller) |
| Close button on modals | 44px × 44px |
| FAB | 56px (exceeds minimum ✓) |

---

## Focus Management

- Modal opens → focus moves to first interactive element (or modal title)
- Modal closes → focus returns to element that triggered it
- All interactive elements are keyboard-focusable
- Tab order follows visual reading order (left-to-right, top-to-bottom)
- Skip link (optional — "Skip to main content") for keyboard users

---

## ARIA Attributes

| Element | Required ARIA |
|---------|--------------|
| Toggle switch | `role="switch"`, `aria-checked="true/false"` |
| Modal | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |
| Progress bar | `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Icon-only buttons | `aria-label="Start Meditation"` etc. |
| Nav items | `aria-current="page"` for active item |
| Alert/error messages | `role="alert"` for dynamic errors |

---

## Screen Reader Support

- All images have `alt` text (or `alt=""` if decorative)
- Habit card quantity announced: "Meditation: 130 of 210 minutes, 62%" 
- Timer reads: "05 minutes 13 seconds" — not "05m13s"
- Streak: "23 days current streak, 45 days longest streak"

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Confetti animation: skip entirely when reduced motion is set.
Page transitions: instant cross-fade instead of slide.
