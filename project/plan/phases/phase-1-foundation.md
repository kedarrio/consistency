# Phase 1 — Foundation (Week 1)

> **Goal:** Project setup, design system implementation, complete component library.

---

## Deliverables

By end of Week 1, the following must be complete:

1. ✅ Vite + React project initialized and running
2. ✅ All design tokens configured (colors, fonts, spacing)
3. ✅ All UI components built and tested
4. ✅ Routing skeleton in place
5. ✅ Navigation components functional

---

## Day-by-Day Breakdown

### Day 1-2: Setup
- Initialize Vite + React
- Install all dependencies
- Configure Tailwind + custom CSS tokens
- Configure ESLint, Prettier
- Set up folder structure
- Commit to Git

### Day 3: Design System
- Import fonts via Google Fonts
- Create CSS custom properties file from tokens.json
- Build base layout components
- Verify all colors/fonts render correctly

### Day 4-5: Component Library
- Buttons (all variants)
- Cards and inputs
- Navigation components

### Day 6-7: Charts and Complex Components
- Progress bars + circular progress
- Bar chart + line chart
- Heat map cell
- Modals + drawer
- Routing + test navigation

---

## Key Dependencies to Install

```bash
npm install react-router-dom
npm install @mui/icons-material @mui/material @emotion/react @emotion/styled
npm install recharts
npm install date-fns
npm install framer-motion
```

---

## Acceptance Criteria for Phase 1

- [ ] App runs without errors on `npm run dev`
- [ ] All fonts load correctly (Playfair Display, IBM Plex Mono)
- [ ] All colors match `tokens.json` exactly
- [ ] All components match their spec files in `design/components/`
- [ ] Navigation between routes works (stub pages acceptable)
- [ ] Habit card matches `references/HabitCard.png`
- [ ] Toggle matches `references/Toggle.png`
- [ ] Segmented picker matches `references/SegmentedPicker.png`
