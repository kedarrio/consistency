# Navigation — Component Specifications

---

## Bottom Navigation Bar

Always visible on main pages. Fixed to bottom.

```
Height:      60px
Background:  #1A1A1A
Shadow:      0px -1px 0px #2A2A2A (subtle top border)
Position:    fixed, bottom: 0, left: 0, right: 0
Z-index:     100
```

### 4 Items

| # | Label | Icon (Material) | Route |
|---|-------|-----------------|-------|
| 1 | Dashboard | `home` | `/` |
| 2 | Stats | `bar_chart` | `/stats` |
| 3 | Calendar | `calendar_month` | `/calendar` |
| 4 | Settings | `settings` | `/settings` |

### Item Styles

```
Active:
  Icon:   filled variant, #DB8686, 24px
  Label:  optional — IBM Plex Mono, 10px, #DB8686

Inactive:
  Icon:   outlined variant, #A0A0A0, 24px
  Label:  optional — IBM Plex Mono, 10px, #A0A0A0

Touch target: 44px minimum
```

---

## Top Navigation Bar

Contextual per page. Shows current page title and relevant actions.

```
Height:          56px
Background:      #0A0A0A (matches page background)
Shadow:          0px 1px 0px #1A1A1A (subtle bottom border — optional)
Position:        sticky, top: 0
Z-index:         90
Padding:         0 16px
```

### Per-Page Configuration

| Page | Left | Center | Right |
|------|------|--------|-------|
| Dashboard | — | "Consistency" (Playfair, 24px) | Hamburger |
| Habit Detail | Back arrow | Habit name (Playfair, 24px) | Hamburger |
| Logs | Back arrow | "[Habit] Logs" (Playfair, 24px) | Hamburger |
| Stats | — | "Statistics" (Playfair, 24px) | Hamburger |
| Calendar | — | "Calendar" (Playfair, 24px) | Hamburger |
| Profile | Back arrow | "Profile" (Playfair, 24px) | Edit icon |
| Settings | — | "Settings" (Playfair, 24px) | — |

### Back Arrow
```
Icon:         arrow_back (Material)
Size:         24px
Touch target: 44px × 44px
Color:        #FFFFFF
```

### Hamburger Icon
```
Icon:         menu (Material, 3-line hamburger)
Size:         24px
Touch target: 44px × 44px
Color:        #FFFFFF
Action:       Open the Hamburger Drawer
```

---

## Hamburger Drawer (Right Drawer)

Opens from the right side when hamburger icon is tapped.

### Drawer Container
```
Width:         280px (or 80% of screen width — whichever is smaller)
Height:        100vh
Background:    #1A1A1A
Position:      fixed, right: 0, top: 0
Z-index:       200
Shadow:        -4px 0px 20px rgba(0,0,0,0.4)
```

### Backdrop
```
Background:  #00000080 (50% black)
Position:    fixed, fills entire screen
Z-index:     190
Tap action:  Close drawer
```

### Drawer Contents

```
┌────────────────────────┐
│  × (close icon, top)   │
│                        │
│  🧘 Meditation         │
│  💼 Work               │
│  💪 Workout            │
│  📓 Journal            │
│  💔 No-Fap             │
│  😴 Sleep              │
│  📚 Reading            │
│  💧 Hydration          │
│  ─────────────────     │
│  👤 Profile            │
└────────────────────────┘
```

Each habit link:
```
Padding:     16px 20px
Font:        IBM Plex Mono, 16px, #FFFFFF
Icon:        24px, habit-specific color (or white)
Hover:       Background #242424
Active:      Background #2A2A2A
```

Divider above Profile link:
```
Height:   1px
Color:    #2A2A2A
Margin:   8px 0
```

Profile link:
```
Same styling as habit links
Icon:  person (Material), 24px
```

### Animation
- Open: `translateX(100%) → translateX(0)`, `250ms ease-out`
- Close: `translateX(0) → translateX(100%)`, `200ms ease-in`
- Backdrop: `opacity 0 → 0.5` simultaneously with drawer open

---

## Floating Action Button (FAB)

See `components/buttons.md` for full FAB spec.

**Positioning:**
```
Position:     fixed
Bottom:       76px (60px nav + 16px gap)
Right:        16px
Z-index:      80
```
