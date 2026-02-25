# Dashboard UI Requirements

> Every element on the Dashboard, explained precisely.

---

## Top Navigation Bar

| Element | Spec |
|---------|------|
| Height | 56px |
| Background | `#0A0A0A` |
| Center text | "Consistency" — Playfair Display, 24px, white |
| Right icon | Hamburger (3-line), 24px, white, 44px touch target |
| Bottom border | 1px `#1A1A1A` (subtle) |

---

## Welcome Message

| Element | Spec |
|---------|------|
| Text | "Welcome back, [Name]" |
| Font | IBM Plex Mono, 16px, `#A0A0A0` |
| Position | Below nav bar |
| Margin | 16px top, 16px left |
| Display | Single line (truncate if name is very long) |

---

## Consistency Score Card (Optional)

Shown if `settings.display.showConsistencyScoreOnDashboard = true`.

| Element | Spec |
|---------|------|
| Background | `#1A1A1A` |
| Padding | 20px all sides |
| Border radius | 16px |
| Margin | 16px horizontal, 16px top |
| Score number | Playfair, 48px, `#DB8686` |
| Label | "this week" — Plex Mono, 14px, `#A0A0A0` below score |
| Optional circle | Circular progress indicator behind number |

---

## Habit Cards List

| Element | Spec |
|---------|------|
| Container padding | 16px horizontal |
| Gap between cards | 12px |
| Bottom padding | 16px + 60px (above bottom nav) |
| Scroll behavior | Native vertical scroll |
| Card order | User-defined (saved in settings.cardOrder) |
| Reorder trigger | Long-press (500ms) on any card |

---

## Individual Habit Card

See `design/components/cards.md` for full card spec and `references/HabitCard.png` for visual reference.

**Layout: Two rows + full-bleed progress bar at bottom**

### Top Row (space-between, align-items: flex-start)

| Element | Position | Spec |
|---------|----------|------|
| Consistency % | Top-left | Playfair, 32px, `#2A2A2A` |
| "this week" label | Below % | Plex Mono, 12px, `#2A2A2A` at 70% opacity |
| Action button | Top-right | Circle 48px — see below |
| Button label | Below button | "start" or "05m13s" — Plex Mono, 12px |

### Bottom Row (space-between, align-items: center)

| Element | Position | Spec |
|---------|----------|------|
| Icon container | Bottom-left | Rounded square 36×36px, darker habit color bg |
| Icon | Inside box | Material icon, 20px, `#2A2A2A` |
| Habit name | Right of icon | Playfair, 20px, `#2A2A2A`, 8px gap |
| Today's count | Bottom-right | `Today: ` (normal) + `9/10m` (bold), Plex Mono 14px |

### Progress Bar

| Element | Spec |
|---------|------|
| Position | Very bottom, edge-to-edge (no horizontal padding) |
| Height | 6px |
| Border radius | `0 0 16px 16px` (matches card bottom corners) |
| Unfilled | `rgba(42,42,42,0.25)` |
| Filled | ~20% darker than habit card background color |
| Animation | `width` transition 500ms ease-out |

**Other card styles:**

| Prop | Value |
|------|-------|
| Background | Habit-specific color (tokens.json) |
| Padding | `20px 20px 0 20px` (no bottom — progress bar is flush) |
| Border radius | 16px |
| Min height | 130px |
| Shadow | Card shadow |
| Text color | `#2A2A2A` (dark, NOT white) |

---

## Quick Action Buttons (Per Type)

| Type | Button | Action |
|------|--------|--------|
| Session (idle) | ▶ Play circle, 48px | Start session |
| Session (active) | ⏸ Pause, 48px + timer | Stop session |
| Incremental | "+" and "−" side by side | +/-1 to daily count |
| Streak | 💔 heart_broken icon | Open reset confirmation |
| Manual | ✏️ edit icon | Open manual entry modal |

---

## Empty State

Shown when no habits are active:

| Element | Spec |
|---------|------|
| Icon | `format_list_bulleted` or clipboard icon, 64px, `#3A3A3A` |
| Message | "No habits selected" — Playfair, 20px |
| Subtext | "Go to Settings to activate trackers" — Plex Mono, 14px, `#A0A0A0` |
| Button | "Go to Settings" — Primary button |

---

## Bottom Navigation Bar

| Element | Spec |
|---------|------|
| Height | 60px, fixed |
| Background | `#1A1A1A` |
| Shadow | `0px -1px 0px #2A2A2A` |
| Active item | `home` icon filled, `#DB8686` |
| Inactive items | Outlined icon, `#A0A0A0` |

---

## What's NOT on the Dashboard

- ❌ No FAB (floating action button) — removed
- ❌ No "+" add habit button
- ❌ No search bar
- ❌ No date picker
