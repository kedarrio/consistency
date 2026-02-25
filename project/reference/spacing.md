# Spacing — Examples & Grid System

---

## Base Unit

All spacing is based on multiples of **4px**.

---

## Spacing Scale

| Token | Value | CSS Variable |
|-------|-------|-------------|
| `xs` | 4px | `--space-xs` |
| `sm` | 8px | `--space-sm` |
| `md` | 12px | `--space-md` |
| `lg` | 16px | `--space-lg` |
| `xl` | 20px | `--space-xl` |
| `2xl` | 24px | `--space-2xl` |
| `3xl` | 32px | `--space-3xl` |

---

## Common Usage Examples

| Element | Property | Value |
|---------|----------|-------|
| Page horizontal padding | `padding-left/right` | `lg` (16px) |
| Card padding | `padding` | `xl` (20px) |
| Button vertical padding | `padding-top/bottom` | `md` (12px) |
| Button horizontal padding | `padding-left/right` | `2xl` (24px) |
| Gap between habit cards | `gap` or `margin-bottom` | `md` (12px) |
| Section spacing | `margin-top` | `2xl` (24px) |
| Section header bottom margin | `margin-bottom` | `lg` (16px) |
| Icon margin from text | `gap` in flex | `sm` (8px) |
| Input padding | `padding` | `md` (12px) |
| Modal padding | `padding` | `2xl` (24px) |
| FAB from screen edge | `right/bottom` | `lg` (16px) |
| Welcome message from nav | `margin-top` | `lg` (16px) |

---

## Grid System

The app does not use a formal CSS grid for the main layout — it uses a linear flex column with a fixed horizontal padding of **16px**.

Exceptions:
- **Stats metrics grid:** 2-column grid for metric pairs
- **Calendar grid:** 7-column grid for days of the week
- **Settings row:** flex row (label left, control right)

---

## Page Layout Template

```
┌────────────────────────┐
│  [TOP NAV 56px]        │
├────────────────────────┤
│  ←16px→  CONTENT  ←16px│  ← 16px horizontal padding
│                        │
│  (Scrollable area)     │
│                        │
│  ↑16px↑                │
│  [Bottom padding]      │
│  ↑60px↑ (nav height)   │
├────────────────────────┤
│  [BOTTOM NAV 60px]     │
└────────────────────────┘
```

Content area effective width: `screenWidth - 32px` (16px × 2)

At 375px: `375 - 32 = 343px` effective content width.

---

## Don't Do

- ❌ Margins/paddings that aren't on the scale (e.g., `13px`, `22px`)
- ❌ Spacing tokens used for font-size or border-radius
- ❌ Inconsistent padding between similar elements
- ❌ Changing horizontal padding per section (keep at 16px always)
