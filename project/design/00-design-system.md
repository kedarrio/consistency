# Design System — Consistency App

> Complete design language for the Consistency PWA. All values sourced from `tokens.json`. Always reference tokens, never hardcode.

---

## Overview

The Consistency design system is built on three principles:
1. **Dark, minimal aesthetic** — deep blacks, soft accent rose
2. **Typography-driven hierarchy** — Playfair for elegance, IBM Plex Mono for data
3. **Habit-color identity** — each habit has its own muted pastel color

---

## Color System

### Core Palette

| Token | Value | Use |
|-------|-------|-----|
| `color.bg.primary` | `#0A0A0A` | Page backgrounds |
| `color.bg.surface` | `#1A1A1A` | Cards, elevated elements |
| `color.bg.elevated` | `#242424` | Modals, raised surfaces |
| `color.accent.primary` | `#DB8686` | Buttons, active states, emphasis |
| `color.accent.hover` | `#C97676` | Button hover |
| `color.accent.active` | `#B76666` | Button press |
| `color.accent.disabled` | `#DB868650` | Disabled state (50% opacity) |
| `color.text.primary` | `#FFFFFF` | Main text |
| `color.text.secondary` | `#A0A0A0` | Muted/supporting text |
| `color.text.onLight` | `#2A2A2A` | Text on light habit card backgrounds |
| `color.border.default` | `#3A3A3A` | Borders, dividers |
| `color.overlay` | `#00000080` | Modal backdrops (50% black) |

### Habit Colors (Card Backgrounds)

All habit cards use **light pastel backgrounds** with **dark text** (`#2A2A2A`).

| Habit | Background | Note |
|-------|-----------|------|
| Meditation | `#C9B5E6` | Soft lavender with pink undertones |
| Work | `#8686A8` | Muted periwinkle |
| Workout | `#E69A9A` | Soft coral |
| Journal | `#E6D5C9` | Warm beige |
| No-Fap | `#B5C9B5` | Muted sage |
| Sleep | `#9AC4D4` | Soft sky blue |
| Reading | `#E6D89A` | Soft gold |
| Hydration | `#9AB5D4` | Muted blue |

### Status Colors

| Status | Value | Use |
|--------|-------|-----|
| Success | `#4ADE80` | High consistency (67-100%), success states |
| Warning | `#FBB F24` | Medium consistency (34-66%), alerts |
| Error | `#EF4444` | Low consistency (0-33%), errors, danger actions |

---

## Typography

### Font Families

**Headings: Playfair Display**
- Weight: Semi-bold (600)
- Case: Title Case
- Use: Page titles, section headers, habit names, large numbers

**Body/Data: IBM Plex Mono**
- Weight: Regular (400)
- Case: Normal or ALL CAPS (context-dependent)
- Use: All numbers, data, timestamps, UI labels, body text

### Font Size Scale

| Token | Size | Use |
|-------|------|-----|
| `font.size.h1` | 32px | Page titles |
| `font.size.h2` | 24px | Section headers, nav titles |
| `font.size.h3` | 20px | Card headers, sub-sections |
| `font.size.body` | 16px | Body text, large labels |
| `font.size.bodySmall` | 14px | Supporting text, secondary labels |
| `font.size.caption` | 12px | Metadata, timestamps |

### Line Heights
- Headings: `1.2`
- Body: `1.5`

---

## Spacing

Base unit: **4px**

| Token | Value | Common Use |
|-------|-------|-----------|
| `space.xs` | 4px | Icon gaps, micro padding |
| `space.sm` | 8px | Tight padding, small gaps |
| `space.md` | 12px | Button vertical padding, form gaps |
| `space.lg` | 16px | Card padding, page margins |
| `space.xl` | 20px | Card padding (large) |
| `space.2xl` | 24px | Section gaps, button horizontal padding |
| `space.3xl` | 32px | Large section spacing |

---

## Borders & Shadows

### Border Radius

| Element | Radius |
|---------|--------|
| Cards | `16px` |
| Primary buttons | `12px` |
| Small buttons | `8px` |
| Input fields | `8px` |
| FAB | `50%` (full circle) |

### Shadows

| Element | Shadow |
|---------|--------|
| Card | `0px 4px 12px rgba(0,0,0,0.15)` |
| Button | `0px 2px 8px rgba(0,0,0,0.1)` |
| FAB | `0px 6px 16px rgba(0,0,0,0.2)` |
| Modal | `0px 8px 24px rgba(0,0,0,0.25)` |

---

## Icons

- **Source:** Material Design Icons (`@mui/icons-material`)
- **Style:** Rounded, Outlined (not filled)
- **Weight:** 300 (light stroke)

| Size | Value | Use |
|------|-------|-----|
| Small | 20px | Inline with text |
| Medium | 24px | Cards, navigation |
| Large | 28-32px | Headers, hero elements |

### Special Icons
- No-Fap reset: `heart_broken` (💔)
- Journal entry: `edit`
- Hydration: `+` / `-`

---

## Animation

See `animations.md` for complete animation specifications.

### Quick Reference

| Speed | Duration | Use |
|-------|----------|-----|
| Fast | 150ms | Button press, ripple |
| Normal | 250ms | Page transitions, modals |
| Slow | 500ms | Progress bar fills |

### Easing
- Default: `ease-in-out`
- Enter: `ease-out`
- Exit: `ease-in`

---

## Component Overview

See `components/` folder for full specs on each component.

| Component | File |
|-----------|------|
| Buttons (primary, secondary, FAB, icon) | `components/buttons.md` |
| Habit cards | `components/cards.md` |
| Text inputs, toggles, pickers, sliders | `components/inputs.md` |
| Bottom nav, top nav, hamburger | `components/navigation.md` |
| Progress bars, circular progress | `components/progress.md` |
| Bar charts, line charts, heat maps | `components/charts.md` |
| Modals, drawers, overlays | `components/modals.md` |

---

## Layout Principles

- **Mobile-first:** Design for 320px - 767px
- **Content padding:** 16px horizontal on all pages
- **Card spacing:** 12px gap between habit cards
- **Bottom nav height:** 60px (fixed)
- **Top nav height:** 56-64px
- **FAB position:** Bottom-right, 16px from edges, 16px above bottom nav
