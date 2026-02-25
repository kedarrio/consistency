# START HERE — Agent Quick Start Guide

> You are building **Consistency**, a habit tracking PWA. This guide tells you exactly what to read and in what order.

---

## 🚀 Step-by-Step Agent Orientation

### Step 1: Read the Master Spec
**File:** `project/CONSISTENCY.md`

This is the single source of truth. It contains:
- Complete vision and philosophy
- All 8 habit trackers and their types
- Full design system (colors, fonts, spacing, animations)
- Navigation architecture
- All 8 onboarding screens
- Every screen specification
- Data model and JavaScript schemas
- Consistency calculation formulas
- Tech stack decisions
- 3-phase development plan

**Do not skip this file.**

---

### Step 2: Read the Agent Rules
**File:** `project/design/claude-guardrails.md`

Critical rules for this project. Read before writing any code.

---

### Step 3: Reference the Design Tokens
**File:** `project/design/tokens.json`

Exact values for every design decision:
- Color hex codes
- Font names and sizes
- Spacing values
- Border radiuses
- Shadow definitions
- Animation durations

Always use tokens, never hardcode values.

---

### Step 4: Look at Reference Images
**Directory:** `project/design/reference-images/` and `project/references/`

Images show exact visual target for components. Match these precisely.

---

### Step 5: Follow the Development Plan
**File:** `project/plan/v1.0.0.md`

Phase-by-phase execution plan. Each phase has specific tasks and deliverables.

---

### Step 6: Use Component Specs When Building
**Directory:** `project/design/components/`

Before building any component, read its spec file. Do not guess.

---

### Step 7: Verify with Definition of Done
**File:** `project/qa/definition-of-done.md`

Before marking any feature complete, check this list.

---

## 📚 Documentation Map

```
project/
├── CONSISTENCY.md          ← START HERE (master spec)
├── START-HERE.md           ← This file
├── DEVDOCS.md              ← File structure overview
├── README.md               ← Project setup
│
├── design/
│   ├── claude-guardrails.md  ← Agent rules (READ SECOND)
│   ├── tokens.json           ← Design values (READ THIRD)
│   ├── 00-design-system.md   ← Design system overview
│   ├── animations.md         ← All animation specs
│   ├── components/           ← Component specs
│   ├── layouts/              ← Page layout specs
│   └── reference-images/     ← Visual reference
│
├── plan/
│   ├── v1.0.0.md             ← Full dev plan (READ FOURTH)
│   ├── phases/               ← Phase details
│   └── prompts/              ← Copy-paste prompts per phase
│
├── specs/
│   ├── data-model.md         ← Data structures
│   ├── calculations.md       ← Consistency formulas
│   ├── user-flows.md         ← User flow diagrams
│   ├── navigation.md         ← Routing hierarchy
│   └── features/             ← Per-feature specs
│
├── ui-requirements/
│   └── *.md                  ← Screen-by-screen requirements
│
├── qa/
│   └── definition-of-done.md ← Completion criteria
│
└── reference/
    ├── color-palette.md      ← All colors explained
    ├── edge-cases.md         ← Handle these edge cases
    └── *.md                  ← Additional context
```

---

## ⚡ Key Facts to Remember

| Fact | Value |
|------|-------|
| Primary accent color | `#DB8686` (soft rose) |
| Background | `#0A0A0A` (deep black) |
| Heading font | Playfair Display |
| Body/data font | IBM Plex Mono |
| 8 habits pre-built | Meditation, Work, Workout, Journal, No-Fap, Sleep, Reading, Hydration |
| 4 tracker types | Session, Incremental, Streak, Manual |
| Storage (V1) | localStorage / IndexedDB |
| Platform (V1) | Progressive Web App |

---

## 🚫 Never Do These Things

1. **Never use gamification** — no points, badges, or levels
2. **Never use guilting language** — neutral tone only
3. **Never add social features** — this is private and personal
4. **Never hardcode design values** — always use tokens.json
5. **Never skip the guardrails** — read `claude-guardrails.md` first

---

## ✅ Always Do These Things

1. Match the reference images exactly
2. Use habit-specific colors for cards
3. Dark text (`#2A2A2A`) on light habit cards
4. Persist all data immediately on action
5. Handle edge cases (forgot timer, no data, empty states)
6. Test on mobile sizes (320px - 767px)
