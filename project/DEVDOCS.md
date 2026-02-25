# Documentation File Structure

This file contains the file structure for the Consistency app documentation. 

## File Structure

```
Consistency/
└── project/
    ├── README.md                          # Project overview & setup instructions
    ├── CONSISTENCY.md                     # Master specification (complete app documentation)
    ├── DEVDOCS.md                         # Documentation file structure
    ├── START-HERE.md                      # Quick start guide for agent
    ├── design/
    │   ├── 00-design-system.md           # Complete design system documentation
    │   ├── tokens.json                   # Design tokens (colors, typography, spacing, shadows)
    │   ├── components/
    │   │   ├── buttons.md                # All button specs (primary, secondary, FAB, icon)
    │   │   ├── cards.md                  # Habit cards with exact layout from reference
    │   │   ├── inputs.md                 # Text inputs, toggles, pickers, sliders
    │   │   ├── navigation.md             # Bottom nav, top nav, hamburger menu
    │   │   ├── progress.md               # Progress bars, circular progress
    │   │   ├── charts.md                 # Bar charts, line charts, heat maps
    │   │   └── modals.md                 # Modals, drawers, overlays
    │   ├── reference-images/
    │   │   ├── habit-card-default.png    # Reference card (no active session)
    │   │   ├── habit-card-active.png     # Reference card (session running)
    │   │   ├── segmented-picker.png      # Apple-style segmented control
    │   │   ├── date-picker.png           # Apple-style scrolling wheel
    │   │   └── toggle-switch.png         # iOS-style toggle
    │   ├── layouts/
    │   │   ├── dashboard.md              # Dashboard layout specs
    │   │   ├── habit-detail.md           # Habit detail page layout
    │   │   ├── stats.md                  # Stats page layout
    │   │   └── calendar.md               # Calendar page layout
    │   ├── animations.md                 # All animations & micro-interactions
    │   └── claude-guardrails.md          # Critical rules for agent
    │
    ├── plan/
    │   ├── v1.0.0.md                     # Complete phase-by-phase plan with prompts
    │   ├── phases/
    │   │   ├── phase-1-foundation.md     # Week 1: Setup & design system
    │   │   ├── phase-2-core.md           # Weeks 2-4: Core features
    │   │   └── phase-3-polish.md         # Weeks 5-6: Polish & PWA
    │   └── prompts/
    │       ├── 1.1-project-setup.md      # Exact prompt for Phase 1.1
    │       ├── 1.2-design-system.md      # Exact prompt for Phase 1.2
    │       ├── 1.3-components.md         # Exact prompt for Phase 1.3
    │       └── [continues for all phases]
    │
    ├── specs/
    │   ├── user-flows.md                 # Detailed user flow diagrams
    │   ├── data-model.md                 # Complete data structures & schemas
    │   ├── calculations.md               # All consistency calculation formulas
    │   ├── navigation.md                 # Navigation hierarchy & routing
    │   └── features/
    │       ├── onboarding.md             # 8-screen onboarding detailed
    │       ├── session-tracking.md       # Session-based tracker specs
    │       ├── incremental-tracking.md   # Incremental tracker specs
    │       ├── streak-tracking.md        # Streak-only tracker specs
    │       ├── manual-entry.md           # Manual entry tracker specs
    │       ├── body-transformation.md    # Photo upload & comparison feature
    │       ├── notifications.md          # Web Notifications API specs
    │       └── data-export.md            # Export/import functionality
    │
    ├── ui-requirements/
    │   ├── dashboard.md                  # Every element on dashboard explained
    │   ├── habit-detail-pages.md         # All habit detail page variations
    │   ├── stats-page.md                 # Stats page requirements
    │   ├── calendar-page.md              # Calendar with heat map & timeline
    │   ├── profile-page.md               # Profile page specs
    │   ├── settings-page.md              # All settings options
    │   └── logs-page.md                  # Logs page with select/edit/delete
    │
    ├── qa/
    │   ├── definition-of-done.md         # Checklist for feature completion
    │   ├── testing-checklist.md          # Manual testing procedures
    │   ├── accessibility.md              # WCAG compliance requirements
    │   ├── performance.md                # Performance budgets & targets
    │   └── browser-compatibility.md      # Cross-browser testing requirements
    │
    └── reference/
        ├── inspiration.md                # Design inspiration notes (Daily Counter, Nothing OS, Apple)
        ├── color-palette.md              # All colors with use cases & examples
        ├── typography.md                 # Font usage examples & rules
        ├── spacing.md                    # Spacing examples & grid system
        ├── edge-cases.md                 # How to handle edge cases (forgot timer, no data, etc.)
        ├── HabitCard.png                 # Reference image for habit card
        ├── Toggle.png                    # Reference image for toggle (apple)
        └── SegmentedPicker.png           # Reference image for segmented picker (apple)
        

```

## File Descriptions (short):

### Core
- Consistency.md : Master specification (complete app documentation)
- Start-here.md : Quick start guide for agent

### Design
- 00-design-system.md : Complete design system documentation
- tokens.json : Design tokens (colors, typography, spacing, shadows)
- components/ : All component specifications
- reference-images/ : Reference images for components
- layouts/ : All layout specifications
- animations.md : All animations & micro-interactions
- claude-guardrails.md : Critical rules for agent

### Plan
- v1.0.0.md : Complete phase-by-phase plan with prompts
- phases/ : All phase specifications
- prompts/ : All prompt specifications

### Specs
- user-flows.md : Detailed user flow diagrams
- data-model.md : Complete data structures & schemas
- calculations.md : All consistency calculation formulas
- navigation.md : Navigation hierarchy & routing
- features/ : All feature specifications

### UI Requirements
- dashboard.md : Every element on dashboard explained
- habit-detail-pages.md : All habit detail page variations
- stats-page.md : Stats page requirements
- calendar-page.md : Calendar with heat map & timeline
- profile-page.md : Profile page specs
- settings-page.md : All settings options
- logs-page.md : Logs page with select/edit/delete

### QA
- definition-of-done.md : Checklist for feature completion
- testing-checklist.md : Manual testing procedures
- accessibility.md : WCAG compliance requirements
- performance.md : Performance budgets & targets
- browser-compatibility.md : Cross-browser testing requirements

### Reference
- inspiration.md : Design inspiration notes (Daily Counter, Nothing OS, Apple)
- color-palette.md : All colors with use cases & examples
- typography.md : Font usage examples & rules
- spacing.md : Spacing examples & grid system
- edge-cases.md : How to handle edge cases (forgot timer, no data, etc.)

### START-HERE.md : Quick start guide for agent

## What Each File Does:

### Core (Must Have)
- CONSISTENCY.md - Master document, everything in one place
- design/tokens.json - All design values (colors, fonts, spacing)
- design/claude-guardrails.md - Agent rules (CRITICAL)
- plan/v1.0.0.md - Phase-by-phase execution

### Design Lock-Down (Ensures Pixel-Perfect)
- design/00-design-system.md - Complete design system guide
- design/components/*.md - Each component specified in detail
- design/reference-images/ - Your uploaded images for exact recreation
- design/layouts/*.md - Layout specs for each page
- design/animations.md - All animations defined

### Detailed Specs (No Ambiguity)
- specs/features/*.md - Each feature broken down (onboarding, tracking types, etc.)
- specs/data-model.md - Data structures locked down
- specs/calculations.md - Formulas documented
- ui-requirements/*.md - Every screen element-by-element

### Execution (Phase-by-Phase)
- plan/phases/*.md - Each phase explained
- plan/prompts/*.md - Copy-paste prompts for agent per phase

### Quality Assurance
- qa/*.md - Testing checklists, DoD, accessibility, performance

### Reference (Context)
- reference/*.md - Additional context, inspiration, edge cases

## How Agent Should Use This Documentation:
1. Reads START-HERE.md → Understands what to do
2. Reads CONSISTENCY.md → Gets complete vision
3. Reads design/claude-guardrails.md → Learns rules
4. References design/tokens.json → Gets exact values
5. Looks at design/reference-images/ → Recreates components exactly
6. Follows plan/v1.0.0.md → Executes phase-by-phase
7. Checks design/components/*.md → When building each component
8. Verifies with qa/definition-of-done.md → Before marking complete


