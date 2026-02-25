# Consistency — Habit Tracker PWA

> **"One day at a time"**

Consistency is a privacy-first habit tracking Progressive Web App (PWA) built for individuals committed to genuine self-improvement. It provides objective, data-driven insights without gamification, social pressure, or judgment.

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd Consistency

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18+ |
| Build Tool | Vite |
| Routing | React Router v6 |
| State | React Context API / Zustand |
| Styling | Tailwind CSS + Custom CSS |
| Icons | Material Design Icons |
| Charts | Recharts / Chart.js |
| Dates | date-fns / Day.js |
| Animations | Framer Motion / CSS transitions |
| Storage (V1) | localStorage / IndexedDB |

---

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── buttons/
│   ├── cards/
│   ├── inputs/
│   ├── navigation/
│   └── progress/
├── pages/            # Route-level components
│   ├── Dashboard/
│   ├── HabitDetail/
│   ├── Stats/
│   ├── Calendar/
│   ├── Profile/
│   ├── Settings/
│   └── Onboarding/
├── context/          # Global state (React Context)
├── utils/            # Helper functions (calculations, storage)
├── hooks/            # Custom React hooks
└── assets/           # Static assets
```

---

## Key Features

- 🧘 **8 Pre-built Habit Trackers** — Meditation, Work, Workout, Journal, No-Fap, Sleep, Reading, Hydration
- ⏱️ **4 Tracker Types** — Session-based, Incremental, Streak-only, Manual entry
- 📊 **Consistency Scores** — Daily, weekly, monthly, yearly, all-time
- 🗓️ **Calendar Heat Map** — Visual consistency across time (red → yellow → green)
- 📈 **Charts & Statistics** — Bar charts, line charts, per-habit breakdowns
- 🔒 **Privacy First** — All data stored locally, no cloud dependency
- 💪 **Body Transformation** — Progress photos & weight tracking (Workout feature)
- 🔔 **Notifications** — Optional reminders via Web Notifications API
- 📤 **Data Export** — CSV and JSON export/import

---

## Documentation

See the `project/` folder for complete documentation:

| File | Description |
|------|-------------|
| `CONSISTENCY.md` | Master specification — complete app documentation |
| `START-HERE.md` | Quick start guide for AI agents |
| `DEVDOCS.md` | Documentation file structure |
| `design/` | Design system, components, layouts |
| `plan/` | Development phases and prompts |
| `specs/` | Feature specs, data model, calculations |
| `ui-requirements/` | Screen-by-screen UI requirements |
| `qa/` | Testing checklists, accessibility, performance |
| `reference/` | Inspiration, color palette, edge cases |

---

## Development Phases

| Phase | Duration | Goal |
|-------|----------|------|
| Phase 1 | Week 1 | Foundation — setup, design system, components |
| Phase 2 | Weeks 2-4 | Core features — all trackers, data persistence |
| Phase 3 | Weeks 5-6 | Polish — animations, notifications, PWA |

---

## License

Private project. All rights reserved.
