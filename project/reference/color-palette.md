# Color Palette — Complete Reference

> All colors used in Consistency with use cases and examples.

---

## Core Application Colors

| Token | Hex | Use Case |
|-------|-----|----------|
| Background Primary | `#0A0A0A` | Page backgrounds, top nav |
| Background Surface | `#1A1A1A` | Cards, modals, bottom nav |
| Background Elevated | `#242424` | Raised modals, dropdown menus |
| Border Default | `#3A3A3A` | Input borders, dividers |
| Border Divider | `#2A2A2A` | Section separators |
| Text Primary | `#FFFFFF` | Main content text |
| Text Secondary | `#A0A0A0` | Labels, subtitles, timestamps |
| Text Placeholder | `#6A6A6A` | Input placeholders, empty states |
| Text On Light | `#2A2A2A` | Text on habit card backgrounds |
| Overlay | `#00000080` | Modal backdrops, drawer backdrop |

---

## Accent Colors

| State | Hex | Use |
|-------|-----|-----|
| Primary | `#DB8686` | Buttons, active nav, emphasis text, FAB |
| Hover | `#C97676` | Button hover state |
| Active/Press | `#B76666` | Button press state |
| Disabled | `#DB868650` | Disabled buttons (50% opacity) |

---

## Habit Card Colors

All habits have **light pastel backgrounds** requiring **dark text** (`#2A2A2A`).

| Habit | Background | Derived Progress Fill |
|-------|-----------|----------------------|
| Meditation | `#C9B5E6` | `#A89BC7` |
| Work | `#8686A8` | `#6A6A8C` |
| Workout | `#E69A9A` | `#C77E7E` |
| Journal | `#E6D5C9` | `#C9B8AB` |
| No-Fap | `#B5C9B5` | `#96AE96` |
| Sleep | `#9AC4D4` | `#7BAABC` |
| Reading | `#E6D89A` | `#C9BD7E` |
| Hydration | `#9AB5D4` | `#7B9BB8` |

The "Derived Progress Fill" is approximately 20% darker than the background — used for progress bar fill color on cards.

---

## Status Colors

| Status | Hex | Use |
|--------|-----|-----|
| Success / High consistency | `#4ADE80` | 67-100% consistency on heat map, success toasts |
| Warning / Medium consistency | `#FBBF24` | 34-66% consistency on heat map, alerts |
| Error / Low consistency | `#EF4444` | 0-33% consistency, delete buttons, danger actions |

---

## Heat Map Gradient

The calendar heat map uses smooth color interpolation, not discrete colors.

| % Range | Color Direction |
|---------|----------------|
| 0% | `#1A1A1A` (no data) |
| 1-50% | Gradient: `#EF4444` → `#FBBF24` |
| 50-100% | Gradient: `#FBBF24` → `#4ADE80` |

---

## Color Usage Rules

1. **Never use white backgrounds** — the whole app is dark
2. **Habit cards get their specific color** — do not randomize
3. **Accent color (`#DB8686`) is for action items** — FAB, primary buttons, active states
4. **Green/yellow/red are ONLY for status/consistency** — not for decorative use
5. **Muted text is `#A0A0A0`** — don't use colors lower than this for important text (accessibility)
