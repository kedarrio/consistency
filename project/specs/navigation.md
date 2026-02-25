# Navigation Hierarchy & Routing

---

## Route Map

| Route | Component | Access |
|-------|-----------|--------|
| `/` | Dashboard | Bottom nav (Home) |
| `/onboarding` | Onboarding flow | First launch only |
| `/stats` | Stats Page | Bottom nav |
| `/calendar` | Calendar Page | Bottom nav |
| `/calendar/day/:date` | Day Detail | Calendar → View More |
| `/settings` | Settings Page | Bottom nav |
| `/settings/notifications` | Notifications Settings | Settings → Configure |
| `/profile` | Profile Page | Hamburger menu |
| `/habit/meditation` | Meditation Detail | Dashboard card tap / hamburger |
| `/habit/work` | Work Detail | Dashboard card tap / hamburger |
| `/habit/workout` | Workout Detail | Dashboard card tap / hamburger |
| `/habit/journal` | Journal Detail | Dashboard card tap / hamburger |
| `/habit/noFap` | No-Fap Detail | Dashboard card tap / hamburger |
| `/habit/sleep` | Sleep Detail | Dashboard card tap / hamburger |
| `/habit/reading` | Reading Detail | Dashboard card tap / hamburger |
| `/habit/hydration` | Hydration Detail | Dashboard card tap / hamburger |
| `/logs/meditation` | Meditation Logs | Habit detail → View Logs |
| `/logs/work` | Work Logs | Habit detail → View Logs |
| *(etc. for all habits)* | ... | ... |

---

## Navigation Hierarchy

```
App
├── Onboarding (/onboarding)
│   └── 8 screens (step-based, no separate routes)
│
└── Main App
    │
    ├── Dashboard (/)  ← Default after onboarding
    │
    ├── Stats (/stats)
    │
    ├── Calendar (/calendar)
    │   └── Day Detail (/calendar/day/:date)
    │
    ├── Settings (/settings)
    │   └── Notifications (/settings/notifications)
    │
    ├── Profile (/profile)  ← via Hamburger only
    │
    └── Habit Details (/habit/:id)  ← via card tap or hamburger
        └── Logs (/logs/:id)  ← via "View Logs" button
```

---

## Navigation Guards

### Onboarding Guard
- If `consistency_onboarding_complete` is not `true`:
  - Redirect all routes to `/onboarding`
- Once onboarding complete:
  - Redirect `/onboarding` to `/`

### Deep Link Handling
- If a route includes `/habit/:id` for an inactive habit:
  - Show message: "This habit is currently inactive"
  - Link to Settings to re-enable

---

## Page Transition Animations

| Navigation | Direction | Animation |
|------------|-----------|-----------|
| Dashboard → Detail | Forward | Slide in from right |
| Detail → Dashboard | Back | Slide out to right |
| Bottom nav switch | Cross-fade | Fade |
| Modal open | Up | Fade + scale |
| Modal close | Down | Fade + scale |
| Drawer open | Right | Slide from right |
| Drawer close | Left | Slide to right |

---

## Back Button Behavior

| Current Page | Back Action |
|-------------|-------------|
| Habit Detail | Return to Dashboard |
| Logs Page | Return to Habit Detail |
| Profile | Return to Dashboard (or previous) |
| Day Detail | Return to Calendar |
| Notifications Settings | Return to Settings |
| Any modal | Close modal (not navigate) |
