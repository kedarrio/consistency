# CONSISTENCY
## Complete Application Specification & Design Document

---

**Version:** 1.0  
**Last Updated:** February 2026  
**Status:** Master Specification Document  
**Platform:** Progressive Web App (V1), iOS & Android Native (V2)

---

# Table of Contents

1. [About / Overview](#1-about--overview)
2. [Philosophy & Vision](#2-philosophy--vision)
3. [Core Concept](#3-core-concept)
4. [Tracker Types](#4-tracker-types)
5. [Design System](#5-design-system)
6. [Navigation & Information Architecture](#6-navigation--information-architecture)
7. [Onboarding Flow](#7-onboarding-flow)
8. [Screen-by-Screen Specifications](#8-screen-by-screen-specifications)
9. [Data Model & Calculations](#9-data-model--calculations)
10. [Technical Stack](#10-technical-stack)
11. [Development Plan](#11-development-plan)
12. [Quality Standards](#12-quality-standards)
13. [Future Roadmap](#13-future-roadmap)

---

## 1. About / Overview

### What is Consistency?

**Consistency** is a habit tracking application designed for individuals committed to genuine self-improvement. It provides objective, data-driven insights into personal growth patterns without gamification, social pressure, or external judgment.

### Tagline
**"One day at a time"**

### Core Purpose
To empower users to build lasting habits through honest self-tracking, flexible goal-setting, and privacy-first data ownership. Users define their own success metrics and track progress on their terms.

### Key Differentiators
- **Neutral Tone:** Objective data presentation without guilt or judgment
- **User Sovereignty:** Users define goals, success criteria, and tracking methods
- **Privacy First:** All data stored locally, no mandatory cloud sync
- **Long-term Focus:** Built for indefinite use, not 30-day challenges
- **Minimal Gratification:** Progress shown through consistency scores and subtle animations, not points/badges

### Target Audience
Self-directed individuals aged 18-45 who:
- Value privacy and data ownership
- Prefer objective tracking over gamification
- Want flexibility in goal-setting
- Are committed to long-term self-improvement
- Use data to make informed decisions

---

## 2. Philosophy & Vision

### Vision Statement
*Consistency empowers individuals to build lasting self-improvement habits through objective tracking, flexible goal-setting, and data-driven insights. We believe that sustainable change comes from honest self-reflection and consistent action, not external pressure or gamification.*

### Core Principles

#### 1. User Sovereignty
- Users define their own success metrics
- No prescribed "right way" to improve
- Flexible goal-setting that adapts to individual needs
- Full data ownership and portability

#### 2. Objectivity Over Judgment
- Neutral tone in all communications
- Data presentation without moral framing
- No guilt-inducing notifications
- Progress shown as information, not evaluation

#### 3. Privacy First
- Local-first data storage
- No mandatory cloud sync (V1)
- No tracking or analytics without consent
- User data never monetized or shared

#### 4. Long-term Thinking
- Designed for indefinite use
- Sustainable habits over quick wins
- Historical data preserved and accessible
- Evolution of goals over time supported

#### 5. Simplicity & Focus
- Clean, distraction-free interface
- Essential features done excellently
- No feature bloat or unnecessary complexity
- Fast, lightweight, reliable

### What This App Is

✅ **Neutral and respectful**  
✅ **Flexible and customizable**  
✅ **Privacy-focused**  
✅ **Data-driven**  
✅ **Built for genuine self-improvement**

### What This App Is NOT

❌ **Gamified** with points/badges/levels  
❌ **Social or competitive**  
❌ **Prescriptive** (telling users what to do)  
❌ **Cloud-dependent** (V1)  
❌ **Ad-supported**  
❌ **Data-mining** users

### Gratification Philosophy

The only forms of positive reinforcement are:
- **Consistency score increases** (objective data improvement)
- **Subtle micro-animations** (confetti on goal completion, smooth transitions)
- **Optional sounds** (satisfying audio feedback when enabled)
- **Visual progress** (charts, heat maps, streaks)

No external validation, no social sharing, no achievement badges.

---

## 3. Core Concept

### 3.1 Features Overview

#### Essential Habit Trackers (8 Pre-Made)
1. **Meditation** - Track mindfulness and meditation sessions
2. **Work/Productivity** - Log work sessions and productive time
3. **Workout/Physical Activity** - Monitor exercise with intensity levels
4. **Journal** - Daily journaling with text or photo entries
5. **No-Fap** - Streak tracking for discipline building
6. **Sleep** - Monitor sleep patterns and quality
7. **Reading** - Track reading time and books
8. **Hydration** - Count water intake throughout the day

#### Custom Habits (V2 Feature)
Users can create additional habits with:
- Custom names (e.g., "Smoking", "Mindfulness", "Cold Showers")
- Choice of tracker type (session, incremental, streak-only, manual)
- Custom colors and icons
- Personalized goals and notifications

#### Core Functionality

**Session Tracking:**
- Start/stop timers for activities
- Background tracking (continues when app minimized)
- Auto-calculated duration
- Manual entry fallback

**Data Visualization:**
- Consistency percentages (daily, weekly, monthly, yearly, all-time)
- Streak tracking (current + longest preserved)
- Calendar heat maps (red → yellow → green gradient)
- Charts and graphs (bar charts, line charts)

**Goal Management:**
- Flexible goal types (daily, weekly, custom)
- User-defined success metrics
- Time-based or frequency-based goals
- Adjustable at any time

**Statistics & Insights:**
- Overall consistency score across all habits
- Per-habit detailed statistics
- Areas to improve (neutral, non-judgmental)
- Historical data and trends

**Data Management:**
- Export data (CSV for analysis, JSON for backup)
- Import data (restore from backup)
- Complete data portability
- Local storage (no cloud dependency in V1)

**Body Transformation (Workout Sub-Feature):**
- Progress photo uploads
- Weight tracking over time
- Before/after comparison
- Timelapse mode (auto-play photos in sequence)

**Notifications (Optional):**
- Customizable reminders per habit
- Streak warnings
- Encouragement on milestones
- Optional sounds (can be disabled)

---

### 3.2 Habit Tracker Types

Consistency supports four distinct tracker types, each optimized for different kinds of habits:

#### Type 1: Session-Based Trackers

**Purpose:** Track activities with defined start and end times.

**How It Works:**
- User presses "Start Session" button
- Timer runs in foreground and background
- User presses "Stop Session" when done
- Duration auto-calculated and saved
- Manual entry option always available

**Goal Format:** Minutes per week  
**Consistency Calculation:** (Total minutes logged / Goal minutes) × 100

**Example:**
- Meditation goal: 210 minutes per week (30 min × 7 days)
- User logs: 180 minutes across the week
- Consistency: (180/210) × 100 = 86%

**Applicable Habits:**
- Meditation (mental wellness)
- Work (productivity tracking)
- Workout (physical activity)
- Reading (knowledge acquisition)
- Sleep (rest and recovery)

**Features:**
- Live timer display
- Elapsed time tracking
- Pause/resume (optional)
- Session notes
- Intensity levels (for Workout)
- Quality ratings (for Sleep)

---

#### Type 2: Incremental Trackers

**Purpose:** Count discrete items throughout the day.

**How It Works:**
- User taps +/- buttons to adjust count
- Each tap saves immediately to storage
- Count resets at day boundary (user-defined)
- Daily goal comparison displayed

**Goal Format:** Count per day  
**Consistency Calculation:** (Daily total / Goal count) × 100

**Example:**
- Hydration goal: 8 glasses per day
- User logs: 6 glasses by end of day
- Consistency: (6/8) × 100 = 75%

**Applicable Habits:**
- Hydration (glasses of water)
- Custom habits (pills taken, cigarettes avoided, etc.)

**Features:**
- Quick +/- buttons on dashboard card
- Real-time count updates
- Daily goal progress bar
- Manual bulk entry option (e.g., "drank 3 glasses at lunch")
- Customizable unit size (default 250ml per glass, adjustable)

---

#### Type 3: Streak-Only Trackers

**Purpose:** Build discipline through consecutive day tracking.

**How It Works:**
- Streak increments automatically each day at boundary
- User presses "Reset" button when streak is broken
- Prompted for reflection note (optional but encouraged)
- Current streak resets to 0
- Longest streak preserved forever

**Goal Format:** Continuous streak (no specific target)  
**Consistency Calculation:** Current streak days displayed

**Example:**
- No-Fap tracker
- User on 23-day streak
- User relapses, presses reset button
- Prompted: "How are you feeling? What led to this?"
- Current streak: 0 days
- Longest streak: 45 days (unchanged)

**Applicable Habits:**
- No-Fap (discipline building)
- No Smoking (addiction recovery) - V2 custom habit
- Any abstinence-based goal

**Features:**
- Automatic daily increment
- Reset button (heartbreak icon 💔)
- Reflection notes on reset
- History of all resets preserved
- Longest streak badge
- Calendar heat map showing all days

---

#### Type 4: Manual Entry Trackers

**Purpose:** Log entries without timers or counters.

**How It Works:**
- User taps FAB (Floating Action Button) to add entry
- Opens entry form with relevant fields
- User fills in details and saves
- Multiple entries per day allowed

**Goal Format:** Frequency-based (e.g., 5 times per week)  
**Consistency Calculation:** (Days with entries / Goal days) × 100

**Example:**
- Journal goal: 5 times per week
- User journaled on 4 days this week
- Consistency: (4/5) × 100 = 80%

**Applicable Habits:**
- Journal (text entries or photo uploads)
- Custom habits requiring flexible logging

**Features:**
- Text input (unlimited length)
- Photo uploads (camera or gallery)
- Multiple entries per day
- Rich notes and metadata
- Timestamp auto-filled (editable)

---

## 4. Tracker Types

### Detailed Specifications per Type

#### Session-Based Tracker Detailed Flow

**Starting a Session:**
1. User on Dashboard or Habit Detail Page
2. Taps "Start" button on card (Dashboard) or primary button (Detail Page)
3. Timer begins immediately
4. UI updates:
   - Button changes to "Stop" with pause icon
   - Elapsed time displays (format: 00m13s)
   - Timer continues even if app minimized

**During Session:**
- Timer runs in background (localStorage tracks start time)
- User can navigate to other pages or minimize app
- Timer persists across page refreshes
- If app closed, timer recovers on next open

**Stopping a Session:**
1. User taps "Stop" button
2. Modal opens with pre-filled data:
   - Duration: Auto-calculated (editable)
   - Start time: When session began (editable)
   - End time: Now (editable)
   - Notes: Optional text area
   - Additional fields (habit-specific):
     * Workout: Type, Intensity (Light/Normal/Heavy/Extreme)
     * Sleep: Quality rating (1-10 slider)
     * Work: Type of work (tags or text)
     * Reading: Book title (optional text)
3. User taps "Save"
4. Entry added to database
5. Statistics recalculate
6. Dashboard card updates
7. Success animation (subtle checkmark, 0.5s)

**Manual Entry (Fallback):**
- Always accessible via FAB on Detail Page
- Same form as stop modal, but all fields empty
- Date/time pickers allow backdating
- Useful when user forgets to start timer

**Edge Case - Forgot to Stop:**
- If session > 12 hours old:
- On app open, detect stale timer
- Show modal: "Looks like you forgot to stop [Habit] session"
- Display start time: "Started: Yesterday 8:00 AM"
- Suggest end time: "Suggested: Yesterday 8:30 AM"
- User can adjust or cancel session

---

#### Incremental Tracker Detailed Flow

**On Dashboard Card:**
- Current count displayed: "6/8 glasses"
- Progress bar shows visual progress
- +/- buttons visible

**Adding to Count:**
1. User taps "+" button
2. Count increments by 1 (or custom unit)
3. Saves to storage immediately
4. Card updates instantly
5. Progress bar animates to new percentage
6. If goal reached (8/8), subtle celebration:
   - Brief confetti animation (1s)
   - Optional sound (if enabled)
   - Progress bar fills completely

**Subtracting from Count:**
- Same flow as adding, but decrements
- Useful for accidental taps or corrections

**Bulk Entry:**
- Tap card to go to Detail Page
- FAB opens manual entry form
- "I drank __ glasses" number input
- Time picker (for record-keeping)
- Adds specified amount to daily total

**Daily Reset:**
- Count resets to 0 at day boundary (user-defined in settings)
- Previous day's count saved to history
- Consistency calculation updates

---

#### Streak-Only Tracker Detailed Flow

**Automatic Increment:**
- Every day at day boundary (midnight, wake time, or custom)
- If no reset pressed previous day, streak increments by 1
- User doesn't need to do anything
- Passive tracking

**Display:**
- Current streak: "23 days 🔥"
- Longest streak: "Best: 45 days"
- Calendar shows all consecutive days (green heat map)

**Resetting Streak:**
1. User on Dashboard or Detail Page
2. Taps heartbreak icon (💔) or "Reset Streak" button
3. Confirmation modal:
   - "Reset your streak?"
   - "Current: 23 days"
   - "Best: 45 days (preserved)"
   - Reflection prompt: "How are you feeling? What led to this?"
   - Text area (optional but encouraged)
   - "Cancel" | "Reset Streak" (red button)
4. User writes note and confirms
5. Current streak → 0
6. Longest streak → unchanged (or updated if current was new record)
7. Reset event logged with timestamp and note
8. Calendar updates (broken streak visible)
9. No shaming message, neutral: "Starting fresh. You've got this."

**History & Patterns:**
- All resets preserved in logs
- User can review past resets and notes
- Identify patterns (e.g., resets often on weekends)
- Learn triggers and improve strategies

---

#### Manual Entry Tracker Detailed Flow

**Adding Entry:**
1. User on Habit Detail Page
2. Taps FAB (bottom-right)
3. Entry form modal opens:
   - Date picker (defaults to today, can backdate)
   - Time picker (optional)
   - Text area (unlimited length) OR photo upload button
   - Additional fields (habit-specific)
4. User fills in fields
5. Taps "Save"
6. Entry added to database
7. Statistics recalculate
8. Detail page updates with new entry in logs

**Photo Upload (Journal):**
- Modal with two options: "Take Photo" | "Choose from Gallery"
- If camera: Browser camera API opens
- If gallery: File picker opens
- Photo preview shown
- Optional caption text
- Save → Photo stored as base64 or file path
- Multiple photos per entry allowed

**Text Entry (Journal):**
- Rich text area (no character limit)
- Auto-saves draft every 30 seconds (optional)
- Timestamp auto-filled
- Can add multiple entries per day
- Each entry separate in logs

---

## 5. Design System

### 5.1 Color Palette

#### Primary Colors

**Background:**
- Primary: `#0a0a0a` (Deep black)
- Surface: `#1a1a1a` (Card backgrounds)
- Elevated: `#242424` (Raised elements)

**Accent:**
- Primary: `#DB8686` (Soft rose/dusty pink)
- Hover: `#C97676` (Darker rose on hover)
- Active: `#B76666` (Even darker on press)
- Disabled: `#DB868650` (50% opacity)

**Text:**
- Primary: `#FFFFFF` (White)
- Secondary: `#A0A0A0` (Muted gray)
- On Light: `#2A2A2A` (Dark text for light habit cards)

#### Habit-Specific Colors (Updated for #DB8686 Harmony)

**Meditation:**  
- Background: `#C9B5E6` (Soft lavender with pink undertones)
- Text: `#2A2A2A` (Dark)

**Work:**  
- Background: `#8686A8` (Muted periwinkle)
- Text: `#2A2A2A` (Dark)

**Workout:**  
- Background: `#E69A9A` (Soft coral)
- Text: `#2A2A2A` (Dark)

**Journal:**  
- Background: `#E6D5C9` (Warm beige)
- Text: `#2A2A2A` (Dark)

**No-Fap:**  
- Background: `#B5C9B5` (Muted sage)
- Text: `#2A2A2A` (Dark)

**Sleep:**  
- Background: `#9AC4D4` (Soft sky blue)
- Text: `#2A2A2A` (Dark)

**Reading:**  
- Background: `#E6D89A` (Soft gold)
- Text: `#2A2A2A` (Dark)

**Hydration:**  
- Background: `#9AB5D4` (Muted blue)
- Text: `#2A2A2A` (Dark)

#### Status Colors

**Success:** `#4ADE80` (Soft green)  
**Warning:** `#FBB F24` (Amber)  
**Error:** `#EF4444` (Red)

#### UI Colors

**Border:** `#3A3A3A`  
**Divider:** `#2A2A2A`  
**Overlay:** `#00000080` (50% black)

---

### 5.2 Typography

#### Font Families

**Headings:**  
- Font: `Playfair Display`
- Weight: Semi-bold (600)
- Case: Title Case (First letter capital, rest small caps)
- Usage: Page titles, section headers, habit names

**Body/Data:**  
- Font: `IBM Plex Mono`
- Weight: Regular (400)
- Case: Normal or all caps (context-dependent)
- Usage: All numbers, data, UI labels, body text

#### Font Sizes

- `h1`: 32px (Page titles)
- `h2`: 24px (Section headers)
- `h3`: 20px (Card headers)
- `body`: 16px (Body text)
- `bodySmall`: 14px (Supporting text)
- `caption`: 12px (Metadata, timestamps)

#### Line Heights

- Headings: 1.2
- Body: 1.5

---

### 5.3 Spacing System

**Base Unit:** 4px

**Scale:**
- `xs`: 4px
- `sm`: 8px
- `md`: 12px
- `lg`: 16px
- `xl`: 20px
- `2xl`: 24px
- `3xl`: 32px

**Common Usage:**
- Card padding: `lg` (16px)
- Button padding: `md` vertical, `lg` horizontal
- Section gaps: `2xl` (24px)
- Page margins: `lg` (16px)

---

### 5.4 Borders & Shadows

#### Border Radius

- Card: 16px
- Button (primary): 12px
- Button (small): 8px
- Input fields: 8px
- FAB: 50% (full circle)

#### Shadows

**Card:**  
`0px 4px 12px rgba(0, 0, 0, 0.15)`

**Button:**  
`0px 2px 8px rgba(0, 0, 0, 0.1)`

**FAB:**  
`0px 6px 16px rgba(0, 0, 0, 0.2)`

**Elevated (modals):**  
`0px 8px 24px rgba(0, 0, 0, 0.25)`

---

### 5.5 Icons

**Source:** Material Design Icons  
**Style:** Rounded  
**Weight:** 300 (light stroke)  
**Fill:** Outlined (not filled)

**Sizes:**
- Small (inline): 20px
- Medium (cards, nav): 24px
- Large (headers): 28-32px

**Special Icons:**
- No-Fap reset: `heart_broken` (💔)
- Journal entry: `edit` (pen icon)
- Hydration: `+` and `-` (plus/minus)

---

### 5.6 Animations

#### Duration

- Fast: 150ms (button press)
- Normal: 250ms (page transitions)
- Slow: 500ms (progress bar fills)

#### Easing

- Default: `ease-in-out`
- Enter: `ease-out`
- Exit: `ease-in`

#### Micro-Animations

**Button Press:**
- Scale down to 0.95
- Ripple effect from tap point
- Duration: 150ms

**Progress Bar Fill:**
- Animate from current to target %
- Duration: 500ms
- Easing: ease-out

**Page Transitions:**
- Slide in from right (forward)
- Slide out to right (back)
- Fade for modals
- Duration: 250ms

**Completion Celebration:**
- Confetti burst (1-2 seconds) when goal reached
- Checkmark animation with bounce
- Optional sound (if enabled in settings)
- Subtle, not obnoxious

**Card Reordering:**
- Lift effect (increase shadow, scale 1.05)
- Other cards shift smoothly
- Drop animation

---

### 5.7 Components

#### Buttons

**Primary:**
- Background: `#DB8686`
- Text: White
- Padding: 16px (vertical), 24px (horizontal)
- Border radius: 12px
- Shadow: Yes
- Font: IBM Plex Mono, 16px
- States:
  - Hover: `#C97676`
  - Active: `#B76666` + scale(0.95)
  - Disabled: `#DB868650`

**Secondary:**
- Background: Transparent
- Border: 2px solid `#DB8686`
- Text: `#DB8686`
- Same sizing and states

**Icon Buttons:**
- No background (transparent)
- Icon only (24px)
- Ripple effect on tap
- Used in nav bars

**FAB (Floating Action Button):**
- Shape: Circle (56px diameter)
- Background: `#DB8686`
- Icon: Plus symbol (white, 24px)
- Position: Bottom-right, 16px margin
- Shadow: Prominent (`0px 6px 16px rgba(0, 0, 0, 0.2)`)
- Hover: Lift effect (increase shadow)

#### Cards

**Habit Card (Dashboard):**

Layout (view project-root/project/references/HabitCard.png):
```
┌─────────────────────────────────┐
│ 🧘 (icon)          [Start] (btn)│
│ Meditation (name)                │
│ 9/20m (count)                    │
│ ████████░░░░░░░░░░ (progress)    │
└─────────────────────────────────┘
```

Structure:
- **Top-left:** Icon (24px)
- **Below icon:** Habit name (Playfair, 20px)
- **Bottom-left:** Count/progress text (e.g., "9/20m", "4/7d")
- **Bottom:** Full-width progress bar (6px height)
- **Top-right:** Quick action button

Background:
- Habit-specific color (see color palette)
- Border radius: 16px
- Padding: 20px
- Shadow: Card shadow

Text color:
- Dark (`#2A2A2A`) on all habit cards (they're light backgrounds)

#### Progress Bars

**Mini (on cards):**
- Height: 6px
- Background (unfilled): `#3A3A3A40` (25% opacity)
- Filled: Darker shade of habit color
- Border radius: Full (pill)
- Animation: Smooth fill (500ms)

**Large (detail pages):**
- Height: 10px
- Same styling
- Optional percentage text overlay

#### Circular Progress (for timers)

- Diameter: 200-250px
- Background ring: `#3A3A3A`
- Progress arc: Habit color or `#DB8686`
- Stroke width: 14px
- Center displays: Timer (MM:SS format)

#### Inputs

**Text Input:**
- Background: `#1A1A1A`
- Border: 1px solid `#3A3A3A` (default)
- Border: 2px solid `#DB8686` (focus)
- Border radius: 8px
- Padding: 12px
- Font: IBM Plex Mono, 14px
- Placeholder: `#6A6A6A`

**Toggle Switch (iOS-style):**
- Off: `#3A3A3A` background, white knob (left)
- On: `#DB8686` background, white knob (right)
- Smooth animation (250ms)

**Segmented Picker (Apple-style):**
- Multiple options in pill shape
- Active: `#DB8686` background, white text
- Inactive: Transparent, `#A0A0A0` text
- Usage: Gender selection, time range filter, view toggles

**Slider:**
- Track: `#3A3A3A`
- Filled track: `#DB8686`
- Thumb: White circle with shadow
- Labels at min/max
- Usage: Quality ratings (sleep), intensity (optional)

**Date/Time Picker (Apple-style scrolling wheel):**
- Modal overlay when opened
- Scrolling wheel interface
- "Done" button to confirm
- Dark theme

---

## 6. Navigation & Information Architecture

### 6.1 App Structure

```
Consistency App
│
├── First Launch
│   └── Onboarding (8 screens)
│
└── Main App
    ├── Dashboard (home)
    ├── Stats
    ├── Calendar
    ├── Settings
    ├── Profile (via hamburger menu)
    ├── Habit Detail Pages (8 pages)
    └── Logs Pages (per habit)
```

---

### 6.2 Navigation Components

#### Bottom Navigation Bar (4 Items - PRIMARY)

Always visible on main pages:

1. **Dashboard** 🏠
   - Icon: `home` (Material)
   - Active state: Filled icon + `#DB8686` color
   - Inactive: Outlined icon + `#A0A0A0` color
   - Tap: Navigate to Dashboard

2. **Stats** 📊
   - Icon: `bar_chart` or `analytics`
   - States: Same as Dashboard
   - Tap: Navigate to Stats page

3. **Calendar** 📅
   - Icon: `calendar_month`
   - States: Same as Dashboard
   - Tap: Navigate to Calendar page

4. **Settings** ⚙️
   - Icon: `settings`
   - States: Same as Dashboard
   - Tap: Navigate to Settings page

**Styling:**
- Height: 60px
- Background: `#1A1A1A`
- Slight elevation shadow
- Fixed to bottom
- Icons: 24px
- Labels: Optional (icon-only or with small text)

---

#### Hamburger Menu (Top-Right on Most Pages)

**Access:** Icon button in top-right of top nav

**Opens:** Drawer from right side

**Contents:**
- **Quick links** to all active habit detail pages:
  - 🧘 Meditation
  - 💼 Work
  - 💪 Workout
  - 📓 Journal
  - 💔 No-Fap
  - 😴 Sleep
  - 📚 Reading
  - 💧 Hydration
  - (Any custom habits if V2)
- **Divider**
- **👤 Profile** (link to Profile page)

**Behavior:**
- Slide-in animation (250ms)
- Overlay darkens background (`#00000080`)
- Tap outside or back → closes menu
- Tap habit → navigate to that habit's detail page
- Tap Profile → navigate to Profile page

---

#### Top Navigation (Contextual per Page)

**Dashboard:**
- Left: None
- Center: "Consistency" (Playfair, 24px)
- Right: Hamburger menu icon

**Habit Detail Pages:**
- Left: Back arrow
- Center: Habit name (e.g., "Meditation")
- Right: Hamburger menu icon (NOT add entry icon)

**Stats Page:**
- Left: None
- Center: "Statistics"
- Right: Hamburger menu icon

**Calendar Page:**
- Left: None
- Center: "Calendar"
- Right: Hamburger menu icon

**Profile Page:**
- Left: Back arrow (if navigated from hamburger)
- Center: "Profile"
- Right: None

**Settings Page:**
- Left: None (or back arrow if deep-linked)
- Center: "Settings"
- Right: None

**Height:** 56-64px  
**Background:** `#0A0A0A` (matches page background)  
**Shadow:** Subtle bottom shadow

---

### 6.3 Floating Action Button (FAB)

**NOT on Dashboard** (as per update)

**ON Habit Detail Pages** (except Streak-Only type):
- Position: Bottom-right corner
- Margin: 16px from edges
- Diameter: 56px
- Background: `#DB8686`
- Icon: Plus symbol (white, 24px)
- Shadow: `0px 6px 16px rgba(0, 0, 0, 0.2)`
- Action: Opens manual entry form for that habit

**NOT Shown On:**
- Streak-Only trackers (No-Fap) - no manual entries

---

## 7. Onboarding Flow

### Overview
8-screen onboarding experience that introduces the app, collects user information, and builds emotional commitment.

### Screens

#### Screen 1: Splash Screen

**Purpose:** Brand introduction

**Layout:**
- Full screen, centered content
- Background: `#0A0A0A` (deep black)
- Logo: "Consistency" (Playfair, 48px, white)
- Tagline: "one day at a time" (IBM Plex Mono, 16px, `#A0A0A0`, below logo)
- Button: "Continue" (primary button, bottom, 16px margin)

**Duration:** User-controlled (taps continue)

**Animation:** Logo fades in (500ms)

**Navigation:** Taps Continue → Screen 2

---

#### Screen 2: App Explanation

**Purpose:** Explain what Consistency does and obtain consent

**Layout:**
- Header: "How it works" (Playfair, 28px)
- Content area: Scrollable

**Explanation Content (with icons):**

1. **Track Your Habits** 📊
   - Icon: Bar chart
   - Text: "Log activities using timers, counters, or manual entries"

2. **Set Your Goals** 🎯
   - Icon: Target
   - Text: "Define what consistency means to you—daily, weekly, or custom"

3. **See Your Progress** 📈
   - Icon: Trending up
   - Text: "Visualize consistency with charts, calendars, and statistics"

4. **Own Your Data** 🔒
   - Icon: Lock
   - Text: "Everything stored locally on your device, private and secure"

**Bottom Section:**
- Checkbox: "I accept the Privacy Policy and Terms & Conditions"
  - Links: "Privacy Policy" | "Terms & Conditions" (open in modal or external)
  - Required: Checkbox must be checked to proceed
- Button: "Get Started" (primary, disabled until checked)

**Progress Indicator:** 
- Top of screen
- Format: ●○○○○○○○ (1 of 8 filled)
- Or: Thin horizontal bars: ████░░░░░░░░

**Navigation:** 
- Back: Returns to Screen 1 (or exits app)
- Next: Taps "Get Started" → Screen 3

---

#### Screen 3: Personal Details

**Purpose:** Collect basic user information

**Header:** "Tell us about yourself"

**Fields:**
- **Name:** Text input (required)
  - Placeholder: "Your name"
  - Validation: Must not be empty
- **Age:** Number input (optional)
  - Placeholder: "Your age"
- **Gender:** Segmented picker (optional)
  - Options: Male | Female | Other | Prefer not to say

**Progress:** ●●○○○○○○ (2 of 8)

**Buttons:**
- Back arrow (top-left)
- "Next" button (bottom, disabled until name entered)

**Navigation:**
- Back → Screen 2
- Next → Screen 4

---

#### Screen 4: Habit Selection

**Purpose:** Choose which habits to track

**Header:** "What do you want to track?"
**Subtext:** "You can change this anytime"

**Content:**
- 8 habit cards (all pre-selected with checkmarks)
- Each card:
  - Icon (24px)
  - Habit name (Playfair, 18px)
  - 1-line description (IBM Plex Mono, 14px, `#A0A0A0`)
  - Checkbox or toggle (checked by default)

**Cards:**
1. 🧘 **Meditation** - "Track mindfulness sessions"
2. 💼 **Work** - "Log productive time"
3. 💪 **Workout** - "Monitor exercise and fitness"
4. 📓 **Journal** - "Daily reflections and notes"
5. 💔 **No-Fap** - "Build discipline streaks"
6. 😴 **Sleep** - "Track rest and recovery"
7. 📚 **Reading** - "Log reading time"
8. 💧 **Hydration** - "Count water intake"

**Interaction:**
- Tap card or checkbox to toggle selection
- Visual feedback: Checked cards have slight border (`#DB8686`)
- At least 1 habit must be selected to proceed

**Progress:** ●●●○○○○○ (3 of 8)

**Buttons:**
- Back arrow → Screen 3
- "Almost Done" button (bottom, enabled if ≥1 selected) → Screen 5

---

#### Screen 5: Body Transformation Setup

**Purpose:** Optional feature for Workout users

**Conditional:** Only shown if "Workout" was selected in Screen 4

**Header:** "Track your body transformation?"
**Subtext:** "Upload progress photos alongside workouts"

**Content:**
- Explanation card:
  - Icon: Camera
  - Text: "Take photos weekly or daily to visualize physical changes over time"
  - Benefits: Before/after comparison, timelapse mode

- Toggle: "Enable Body Transformation" (default OFF)

- **If Toggle ON:**
  - Height input:
    - Number input
    - Unit: cm (or ft/in with toggle)
    - Placeholder: "Height"
  - Current weight input:
    - Number input
    - Unit: kg (or lbs with toggle)
    - Placeholder: "Current weight"
  - Photo frequency:
    - Segmented picker: Daily | Weekly
    - If weekly: Day selector (Mon, Tue, Wed, etc.)

**Progress:** ●●●●○○○○ (4 of 8)

**Buttons:**
- Back arrow → Screen 4
- "Next" button (bottom) → Screen 6

**Skip Condition:**
- If Workout not selected, auto-skip to Screen 6

---

#### Screen 6: Preferences Setup

**Purpose:** Customize app behavior

**Header:** "Customize your experience"

**Fields:**

1. **Week starts on:**
   - Dropdown: Monday, Tuesday, ..., Sunday
   - Default: Monday

2. **Time format:**
   - Segmented picker: 12h | 24h
   - Default: 12h

3. **Day resets at:**
   - Options (radio buttons):
     - ⏰ Strict midnight (12:00 AM to 11:59 PM)
     - 🌙 Sleep schedule (wake time to next wake time)
     - 🌅 Custom (enter ideal bedtime and wake time)

4. **If Sleep Schedule or Custom selected:**
   - Ideal bedtime: Time picker
   - Ideal wake time: Time picker

**Progress:** ●●●●●○○○ (5 of 8)

**Buttons:**
- Back arrow → Screen 5 (or 4 if Body Transformation skipped)
- "Next" button (bottom) → Screen 7

---

#### Screen 7: Make Your Promise

**Purpose:** Emotional commitment and motivation anchor

**Layout:**
- Inspirational visual (optional abstract graphic)
- Header: "Make a promise to yourself"
- Quote/Message:
  - "Every journey begins with a commitment."
  - "What drives you? What will keep you going when it's hard?"

**Input:**
- Large text area
- Label: "Your promise (10 words or less)"
- Word counter: Live count (e.g., "6 / 10 words")
- Placeholder examples (shown below input):
  - "Build discipline to achieve my goals"
  - "Become the best version of myself"
  - "Prove I can commit long-term"

**Interaction:**
- User types their promise
- Word limit enforced (can't exceed 10 words)
- Cannot proceed if empty

**Progress:** ●●●●●●○○ (6 of 8)

**Buttons:**
- Back arrow → Screen 6
- "Make Promise" button (bottom, disabled until entered, primary button with emphasis)

**Navigation:** → Screen 8

**Note:** This promise becomes the splash screen shown on every app open (2-3s display)

---

#### Screen 8: Explain Habit Types

**Purpose:** Educate user on the 4 tracker types

**Header:** "Understanding your trackers"
**Subtext:** "Here's how to track different habits"

**Content:** 4 cards explaining types

**Card 1: Session-Based** ⏱️
- Icon: Timer
- Name: "Session-Based"
- Description: "Track activities with start/stop timers"
- Examples: "Meditation, Work, Workout, Reading, Sleep"
- How it works: "Press Start → Timer runs → Press Stop → Duration saved"

**Card 2: Incremental** ➕
- Icon: Plus/Minus
- Name: "Incremental"
- Description: "Count things throughout the day"
- Examples: "Hydration (glasses of water)"
- How it works: "Tap + to add, - to subtract. Count resets daily."

**Card 3: Streak-Only** 🔥
- Icon: Fire/Flame
- Name: "Streak-Only"
- Description: "Build discipline through consecutive days"
- Examples: "No-Fap, No Smoking"
- How it works: "Increments daily automatically. Reset button when you relapse."

**Card 4: Manual Entry** ✍️
- Icon: Edit/Pen
- Name: "Manual Entry"
- Description: "Log entries whenever you want"
- Examples: "Journal (text or photos)"
- How it works: "Tap + to add entry. Write or upload photos anytime."

**Progress:** ●●●●●●●○ (7 of 8)

**Buttons:**
- Back arrow → Screen 7
- "Good Luck!" button (bottom, primary, enthusiastic tone) → Complete onboarding

---

#### Onboarding Complete → Flash Sequence

**After "Good Luck!" button pressed:**

1. **Save Data:**
   - All onboarding data saved to localStorage
   - Flag: `onboardingComplete: true`
   - Timestamp: Date/time of completion

2. **Flash Sequence (First Time Only):**
   - **Flash 1:** Promise screen (3 seconds)
     - Full screen, centered
     - User's promise text displayed (Playfair, 32px)
     - Background: `#0A0A0A`
     - Auto-advances after 3s
   - **Flash 2:** Dashboard loads
     - Smooth fade transition
     - Dashboard appears with selected habits as cards

3. **Progress Indicator:** ●●●●●●●● (8 of 8 - Complete)

---

### Returning User Flow (Already Onboarded)

**Sequence:**

1. **App Launch:**
   - Check `onboardingComplete` flag
   - If true: Skip onboarding

2. **Splash Screen (1.5 seconds):**
   - "Consistency" logo (Playfair, 48px)
   - Tagline: "one day at a time"
   - Auto-advances after 1.5s

3. **Promise Screen (3 seconds):**
   - Full screen display
   - User's promise text (centered, Playfair, 32px)
   - Auto-advances after 3s

4. **Dashboard:**
   - Smooth fade transition
   - Dashboard loads with all habit cards
   - "Welcome back, [Name]" message at top

**No User Interaction Required** - All automatic transitions

---

## 8. Screen-by-Screen Specifications

### 8.1 Dashboard (Home Page)

**Purpose:** Central hub for all habit tracking

**Layout:**

#### Top Section
- **Navigation Bar:**
  - Left: None
  - Center: "Consistency" (Playfair, 24px, white)
  - Right: Hamburger menu icon (24px)
  - Height: 56px
  - Background: `#0A0A0A`

#### Welcome Message
- Text: "Welcome back, [Name]" (IBM Plex Mono, 16px, `#A0A0A0`)
- Position: Below nav bar, 16px top margin, 16px left/right margin
- Single line

#### Consistency Score (Optional - can be toggled in settings)
- Large percentage: "78%" (Playfair, 48px, `#DB8686`)
- Label: "this week" (IBM Plex Mono, 14px, `#A0A0A0`)
- Position: Below welcome message
- Card background: `#1A1A1A`, padding: 20px
- Circular progress indicator (optional)

#### Habit Cards Section
- Scrollable vertical list
- Spacing: 12px between cards
- Padding: 16px left/right
- Cards in user-defined order (reorderable)

**Habit Card Structure (Updated):**

```
┌────────────────────────────────────┐
│ 🧘 (icon, 24px)       [Start] (btn)│  ← Top
│ Meditation (name, Playfair, 20px)  │  ← Below icon
│ 9/20m (count, Plex Mono, 16px)     │  ← Bottom-left above progress
│ ████████░░░░░░░░░░ (progress bar)   │  ← Bottom, full width
└────────────────────────────────────┘
```

**Elements:**
- **Icon (top-left):** 24px Material icon, habit-specific
- **Habit Name (below icon):** Playfair, 20px, dark text (`#2A2A2A`)
- **Count (bottom-left):** IBM Plex Mono, 16px, dark text
  - Format examples:
    - Session-based: "9/20m" (minutes today / goal)
    - Weekly session: "180/210m" (minutes this week / goal)
    - Incremental: "6/8 glasses"
    - Streak: "23 days 🔥"
    - Manual: "3 entries" or "3/5 this week"
- **Progress Bar (bottom):** 
  - Full card width
  - Height: 6px
  - Border radius: Full (pill)
  - Unfilled: `#3A3A3A40` (25% opacity)
  - Filled: Darker shade of habit background color
  - Animation: Smooth fill (500ms ease-out)
- **Quick Action Button (top-right):**
  - Size: 48px circle (for session start/stop) or icon button
  - Background: Contrasting color (darker shade of card)
  - Icon: 24px, white
  - Types:
    - Session trackers: ▶️ "Start" or ⏸️ "Stop" + timer
    - Incremental: `+` and `-` buttons (side-by-side if space)
    - Streak: 💔 (heartbreak icon)
    - Manual: ✏️ (pen icon) - opens manual entry

**Card Behavior:**
- **Tap card (not button):** Navigate to habit detail page
- **Long-press:** Enable reorder mode (drag-and-drop)
- **Quick action button:** Execute action (start/stop, increment, reset, add entry)

**Reordering:**
- Long-press any card to enable
- All cards get drag handles (or just lift on long-press)
- Drag to reorder
- Release to drop
- New order saves immediately
- Exit: Tap done button or tap outside cards

#### Bottom Navigation
- 4 items: Dashboard | Stats | Calendar | Settings
- Dashboard highlighted (filled icon, `#DB8686`)

#### No FAB
- No floating action button on dashboard (as per update)

**Empty State:**
- If no habits activated:
  - Message: "No habits selected"
  - Subtext: "Go to Settings to activate trackers"
  - Button: "Go to Settings" (primary)

---

### 8.2 Habit Detail Page (Generic Template)

**Applies to:** All habit trackers (customized per type)

**URL:** `/habit/:habitId` (e.g., `/habit/meditation`)

#### Top Navigation
- Left: Back arrow → Dashboard
- Center: Habit name (e.g., "Meditation", Playfair, 24px)
- Right: Hamburger menu icon

#### Primary Action Section (Top, Prominent)

**For Session-Based:**
- If no active session:
  - Large "Start Session" button (primary, full-width or centered)
  - Button size: Height 56px, padding 24px, prominent
- If session active:
  - Circular progress timer (200px diameter)
  - Center: Elapsed time (e.g., "05m13s", Playfair, 32px)
  - Progress ring: Habit color
  - Below timer: Start time (e.g., "Started: 2:30 PM", Plex Mono, 14px, `#A0A0A0`)
  - "Stop Session" button below (primary, red/stop color)

**For Incremental:**
- Current count display (large, Playfair, 48px)
- Example: "6 / 8 glasses"
- +/- buttons (side-by-side, 56px each)

**For Streak-Only:**
- Current streak (large, Playfair, 48px, `#DB8686`)
- Example: "23 days 🔥"
- Longest streak below (Plex Mono, 16px, `#A0A0A0`)
- Example: "Best: 45 days"
- "Reset Streak" button (secondary, outlined, with ❤️‍🔥 icon)

**For Manual Entry:**
- No primary action here (FAB handles entry)
- Just summary stats or recent entries preview

#### Mini Calendar Section

**Header:** "Consistency" (Playfair, 20px)

**View Toggle:**
- Segmented picker: Week | Month
- Default: Week

**Calendar Display:**
- If Week: 7 day cells (Mon-Sun or user's week start)
- If Month: Full month grid
- Each cell:
  - Day number (Plex Mono, 14px)
  - Background color: Heat map (red → yellow → green)
  - Today: White border
- Navigate: Arrows to previous/next week or month
- Tap day: Doesn't navigate, just highlights (detail shown below calendar)

**Below Calendar:**
- Selected day summary (if day tapped)
- Example: "Monday, Feb 24: 25 minutes logged"

#### Statistics Summary Section

**Header:** "Statistics" (Playfair, 20px)

**Metrics (varies by tracker type):**
- Current streak (if applicable)
- Consistency % this week
- Consistency % this month
- Total time/entries (this month)
- Longest streak (if applicable)
- Average per session (if applicable)

**Chart:**
- Bar chart: Last 7 days
- X-axis: Day names (M, T, W, T, F, S, S)
- Y-axis: Minutes or count
- Bars: Habit color

#### View Logs Button

- Button: "View Logs" (secondary, outlined)
- Position: Below stats
- Action: Navigate to `/logs/:habitId`

#### FAB (Bottom-Right)

- Present on all trackers EXCEPT Streak-Only
- Diameter: 56px
- Background: `#DB8686`
- Icon: Plus (white, 24px)
- Action: Opens manual entry modal

#### Manual Entry Modal

**Triggered by:** FAB tap

**Layout:**
- Full-screen modal or bottom sheet
- Header: "Add Entry" (Playfair, 24px)
- Close button: X (top-right)

**Fields (varies by tracker):**

**Session-Based (Meditation, Work, Workout, Reading):**
- Date picker (defaults to today)
- Start time picker
- End time picker
- Duration: Auto-calculated or manual input
- Notes: Text area (optional)
- **Workout-specific:** Type (text), Intensity (slider or segmented picker)
- **Sleep-specific:** Quality rating (1-10 slider)
- **Work-specific:** Type/tags (text input)
- **Reading-specific:** Book title (text input, optional)

**Incremental (Hydration):**
- Date picker
- Number input: "I drank __ glasses"
- Time picker (for timestamp)
- Notes: Text area (optional)

**Manual Entry (Journal):**
- Date picker
- Time picker (optional)
- Text area (unlimited length) OR
- Photo upload button (camera or gallery)
- Multiple photos allowed
- Optional caption

**Buttons:**
- Cancel (secondary)
- Save (primary, bottom, full-width)

---

### 8.3 Logs Page

**URL:** `/logs/:habitId`

**Purpose:** View and manage all entries for a habit

#### Top Navigation
- Left: Back arrow → Habit Detail Page
- Center: "[Habit] Logs" (e.g., "Meditation Logs", Playfair, 24px)
- Right: Hamburger menu icon

#### Time Range Filter

**Position:** Top of page, below nav

**Segmented Picker:**
- Options: All Time | Last 7 Days | Last 30 Days | This Week | This Month | Custom
- Default: All Time

**If Custom selected:**
- Date range picker (start date, end date)

#### Entry List

**Layout:** Scrollable vertical list

**Entry Card:**
- Background: `#1A1A1A`
- Padding: 16px
- Border radius: 12px
- Margin: 8px between cards

**Contents:**
- **Date & Time:** "Feb 24, 2026 • 8:00 AM" (Plex Mono, 14px, `#A0A0A0`)
- **Duration/Value:** "25 minutes" or "3 glasses" (Plex Mono, 18px, white)
- **Type/Intensity (if applicable):** "Heavy" or "Cardio" (Plex Mono, 14px, `#A0A0A0`)
- **Notes preview:** First 50 characters (if notes exist)

**Tap Entry:**
- Opens edit modal (same as manual entry modal, pre-filled)

**Long-Press Entry:**
- Enables select mode

**Select Mode:**
- Checkboxes appear next to all entries
- Top bar changes:
  - Shows count: "3 selected"
  - "Select All" button
  - Delete icon (trash)
  - Cancel button (X)
- Tap additional entries to add to selection
- Tap Delete icon:
  - Confirmation modal: "Delete X entries? This cannot be undone."
  - Cancel | Delete (red button)
- Confirm → Entries deleted, statistics recalculate

**Empty State:**
- If no entries:
  - Message: "No entries yet"
  - Subtext: "Start tracking to see your history here"
  - Button: "Add Entry" (primary) → Opens manual entry modal

---

### 8.4 Stats Page

**URL:** `/stats`

**Purpose:** View overall and per-habit statistics

#### Top Navigation
- Left: None
- Center: "Statistics" (Playfair, 24px)
- Right: Hamburger menu icon

#### Time Range Filter

**Position:** Top of page content (not in nav bar)

**Segmented Picker:**
- Options: Daily | Weekly | Monthly | Yearly | All-Time
- Default: Weekly

#### Overall Consistency Score

**Display:**
- Large percentage: "78%" (Playfair, 64px, `#DB8686`)
- Label: "Overall consistency" (Plex Mono, 16px, `#A0A0A0`)
- Subtext: "this week" or selected time range
- Circular progress indicator (optional)
- Card background: `#1A1A1A`, elevated shadow

**Calculation:**
- Average of all active habits' consistency percentages

#### Per-Habit Statistics

**Layout:** Scrollable vertical list

**Habit Card:**
- Icon (24px) + Name (Playfair, 20px)
- Consistency %: "86%" (Playfair, 32px, habit color)
- Progress bar (full width, habit color)
- Metrics (varies):
  - Current streak: "15 days"
  - Total time: "7.5 hours" (this month)
  - Total entries: "22 entries"
- Mini chart: Bar chart (last 7 days) or line chart (last 30 days)
- Tap card → Navigate to habit detail page

#### Areas to Improve Section

**Header:** "Areas to Improve" (Playfair, 20px)

**Content:**
- Lists habits below target consistency
- Neutral messaging
- Example: "Reading: 2/7 days (29%)"
- Subtext: "3 more sessions needed this week to reach goal"

**Toggle (in settings):**
- User can hide this section if preferred

#### Empty State
- If insufficient data:
  - Message: "Not enough data yet"
  - Subtext: "Track for a few days to see insights"
  - Illustration (optional)

#### Bottom Navigation
- Stats highlighted

---

### 8.5 Calendar Page

**URL:** `/calendar`

**Purpose:** Visualize consistency over time with heat map

#### Top Navigation
- Left: None
- Center: "Calendar" (Playfair, 24px)
- Right: Hamburger menu icon

#### Month Navigation

**Current Month Display:**
- Month & Year: "February 2026" (Playfair, 24px, center)
- Left arrow: Previous month
- Right arrow: Next month

#### Calendar Grid

**Layout:**
- 7 columns (days of week)
- Variable rows (4-6 depending on month)

**Day Cell:**
- Day number (Plex Mono, 16px)
- Background: Heat map color
  - Red `#EF4444`: 0-33% consistency
  - Yellow `#FBB F24`: 34-66% consistency
  - Green `#4ADE80`: 67-100% consistency
  - Smooth gradient between (not just 3 colors)
- Today: White border (2px)
- Selected day: Different highlight (e.g., `#DB8686` border)
- Future days: Greyed out (`#3A3A3A`)

**Tap Day:**
- Selects day
- Highlights with border
- Shows day details below

#### Day Highlights Card (Below Calendar)

**Appears when:** Day is tapped

**Content:**
- Date: "Monday, February 24" (Playfair, 20px)
- Consistency score: "75%" (Playfair, 48px, color-coded)
- Habits completed: "6/8 tracked" (Plex Mono, 16px, `#A0A0A0`)
- Brief summary:
  - Meditation: 20 min
  - Work: 4.5 hours
  - Workout: 45 min (Heavy)
  - (List continues for all habits logged that day)
- "View More" button (primary)

#### View More → Day Detail Page

**URL:** `/day/:date`

**Layout:**
- Full screen
- Header: Date (Playfair, 24px)
- Timeline visualization (Google Calendar style)

**Timeline:**
- Vertical time axis: 00:00 - 23:59 (left side)
- Colored blocks for each entry (positioned by time)
- Block properties:
  - Background: Habit color
  - Height: Proportional to duration
  - Label: Habit name + duration
- Tap block: Show entry details modal (with edit/delete)

**"Add Entry for This Day" button:**
- FAB or prominent button
- Opens manual entry modal with date pre-set to this day

#### Habit Filter (Optional)

**Access:** Icon in top-right (filter icon)

**Modal:**
- "Show habits" (Playfair, 20px)
- Checkboxes for each habit
- Select/deselect to show/hide on calendar
- "All" / "None" quick toggles
- Apply button

**Effect:** Only selected habits contribute to heat map calculation

#### Bottom Navigation
- Calendar highlighted

---

### 8.6 Profile Page

**URL:** `/profile`

**Access:** Hamburger menu → Profile

#### Top Navigation
- Left: Back arrow (if navigated from hamburger)
- Center: "Profile" (Playfair, 24px)
- Right: Edit icon (pencil)

#### Profile Header
- Profile photo (circular, 80px diameter, center)
- Tap to upload new photo (camera or gallery)
- Name: "[User Name]" (Playfair, 28px, center)
- Age & Gender: "24 • Male" (Plex Mono, 14px, `#A0A0A0`, center)

#### Promise Section

**Header:** "Your Promise" (Playfair, 20px)

**Content:**
- Promise text (Playfair, 24px, `#DB8686`, centered, quoted)
- Example: *"Build discipline to achieve my goals"*
- Edit button (icon, top-right of section)
- Tap to edit → opens modal with text input

#### Stats Overview (Optional)

**Header:** "Quick Stats" (Playfair, 20px)

**Metrics:**
- Days tracked: "45 days"
- Overall consistency: "78%"
- Longest streak: "23 days (No-Fap)"
- Total entries: "342"

#### Privacy & Legal Section

**Header:** "Privacy & Legal" (Playfair, 20px)

**Links:**
- Privacy Policy (tap → opens modal or external)
- Terms & Conditions (tap → opens modal or external)
- Data Management (tap → navigate to data settings)

**Note:** These were previously in Settings but moved here per update

#### Account Actions (Future - V2)

- Sync settings (if cloud sync enabled)
- Account info
- Sign out

---

### 8.7 Settings Page

**URL:** `/settings`

**Access:** Bottom navigation OR hamburger menu

#### Top Navigation
- Left: None (or back arrow if deep-linked)
- Center: "Settings" (Playfair, 24px)
- Right: None

#### Settings Sections (Scrollable)

---

##### Section 1: Preferences

**Header:** "Preferences" (Playfair, 20px)

**Options:**

1. **Week starts on:**
   - Dropdown: Monday, Tuesday, ..., Sunday
   - Current: Shows selected day

2. **Time format:**
   - Segmented picker: 12h | 24h

3. **Day resets at:**
   - Dropdown or radio:
     - Strict midnight
     - Sleep schedule
     - Custom
   - If Sleep schedule or Custom:
     - Ideal bedtime: Time picker
     - Ideal wake time: Time picker

4. **Theme:**
   - Segmented picker: Dark (only option in V1)
   - Future: Light, Auto

5. **Hydration unit:**
   - Number input: "Glass size (ml)"
   - Default: 250ml
   - Allows customization

---

##### Section 2: Habits

**Header:** "Active Habits" (Playfair, 20px)

**List:**
- All 8 essential trackers listed
- Each row:
  - Icon (24px) + Name
  - Toggle switch (on/off)
  - Tap row (not toggle) → navigate to habit detail page

**Behavior:**
- Toggle ON: Habit shows on dashboard
- Toggle OFF: Habit hidden but data preserved
- At least 1 habit must remain active

**No Goal Editing Here** - Goals edited in each habit's detail page

---

##### Section 3: Notifications

**Header:** "Notifications" (Playfair, 20px)

**Global Toggle:**
- "Enable notifications"
- Master switch (on/off)

**If ON:**
- "Configure Details" button → Navigate to detailed notifications page

**Detailed Notifications Page** (`/settings/notifications`):
- Per-habit settings:
  - Habit name
  - Enable toggle
  - Reminder time (time picker)
  - Frequency (daily, specific days, custom)
  - Notification types:
    - Reminder to log
    - Encouragement
    - Streak warning
  - Test notification button

**Sounds:**
- "Enable sounds" toggle
- Plays sound when:
  - Goal reached
  - Milestone hit
  - Streak broken (optional, gentle alert)

---

##### Section 4: Data Management

**Header:** "Data Management" (Playfair, 20px)

**Options:**

1. **Export Data:**
   - Button: "Export Data"
   - Opens modal:
     - Format: CSV | JSON
     - "Export" button
   - Downloads file to device

2. **Import Data:**
   - Button: "Import Data"
   - File picker
   - Validation
   - Options: Merge | Overwrite
   - Confirmation before import

3. **Clear All Data:**
   - Button: "Clear All Data" (red, warning style)
   - Confirmation modal:
     - "This will permanently delete ALL entries, settings, and photos. This cannot be undone."
     - Requires typing "DELETE" to confirm
   - Confirm → All data erased, redirects to onboarding

---

##### Section 5: Display

**Header:** "Display" (Playfair, 20px)

**Options:**

1. **Show consistency score on dashboard:**
   - Toggle (on/off)
   - If off, hides the overall score card

2. **Show "Areas to Improve" on Stats:**
   - Toggle (on/off)
   - If off, hides that section

---

##### Section 6: App Information

**Header:** "About" (Playfair, 20px)

**Info:**
- App version: "v1.0.0"
- Build number (optional)
- "About Consistency" → Opens modal with app description
- "Send Feedback" → Email link or form (future)
- "Rate the App" (future, when on stores)

**No Privacy Policy Here** - Moved to Profile page

#### Bottom Navigation
- Settings highlighted

---

## 9. Data Model & Calculations

### 9.1 Data Storage Structure

**V1 (PWA):** localStorage or IndexedDB  
**V2 (Native):** SQLite database

#### User Object
```javascript
{
  id: "uuid",
  name: "John Doe",
  age: 24,
  gender: "Male",
  promise: "Build discipline to achieve my goals",
  profilePicture: "base64_string_or_url",
  onboardingComplete: true,
  onboardingDate: "2026-02-25T10:30:00Z"
}
```

#### Settings Object
```javascript
{
  weekStartDay: "Monday",
  timeFormat: "24h",
  dayBoundary: "midnight", // or "sleep-schedule" or "custom"
  idealBedtime: "23:00",
  idealWakeTime: "07:00",
  hydrationUnitSize: 250, // ml
  theme: "dark",
  notifications: {
    global: true,
    sounds: true,
    perHabit: {
      meditation: {
        enabled: true,
        time: "08:00",
        frequency: "daily",
        types: ["reminder", "encouragement"]
      },
      // ... other habits
    }
  },
  display: {
    showConsistencyScoreOnDashboard: true,
    showAreasToImprove: true
  }
}
```

#### Habits Object
```javascript
{
  meditation: {
    id: "meditation",
    name: "Meditation",
    type: "session",
    active: true,
    color: "#C9B5E6",
    icon: "self_improvement",
    goal: {
      type: "weekly",
      target: 210, // minutes per week
      unit: "minutes"
    },
    entries: [
      {
        id: "uuid",
        date: "2026-02-24",
        startTime: "08:00",
        endTime: "08:25",
        duration: 25,
        notes: "Morning session, felt calm",
        timestamp: 1708761600000
      }
      // ... more entries
    ]
  },
  
  workout: {
    id: "workout",
    type: "session",
    active: true,
    color: "#E69A9A",
    goal: {
      type: "weekly",
      target: 180, // minutes per week
      unit: "minutes"
    },
    entries: [
      {
        id: "uuid",
        date: "2026-02-24",
        type: "Cardio",
        duration: 45,
        intensity: "Heavy",
        notes: "5km run, felt strong",
        timestamp: 1708761600000
      }
    ],
    bodyTransformation: {
      enabled: true,
      height: 175, // cm
      photos: [
        {
          id: "uuid",
          date: "2026-02-24",
          imageData: "base64_string",
          weight: 70, // kg
          timestamp: 1708761600000
        }
      ]
    }
  },
  
  hydration: {
    id: "hydration",
    type: "incremental",
    active: true,
    color: "#9AB5D4",
    goal: {
      type: "daily",
      target: 8,
      unit: "glasses"
    },
    entries: [
      {
        id: "uuid",
        date: "2026-02-24",
        count: 6,
        timestamp: 1708761600000
      }
    ]
  },
  
  noFap: {
    id: "noFap",
    type: "streak",
    active: true,
    color: "#B5C9B5",
    currentStreak: 23,
    longestStreak: 45,
    resets: [
      {
        id: "uuid",
        date: "2026-01-15",
        streakBroken: 23,
        notes: "Felt stressed, need better coping",
        timestamp: 1705276800000
      }
    ]
  },
  
  journal: {
    id: "journal",
    type: "manual",
    active: true,
    color: "#E6D5C9",
    goal: {
      type: "weekly",
      target: 5,
      unit: "times"
    },
    entries: [
      {
        id: "uuid",
        date: "2026-02-24",
        type: "text", // or "photo"
        content: "Today was productive...",
        // OR
        photos: ["base64_1", "base64_2"],
        caption: "Morning pages",
        timestamp: 1708761600000
      }
    ]
  }
  
  // ... other habits
}
```

---

### 9.2 Consistency Calculations

#### Session-Based Trackers (Updated Formula)

**Goal Format:** Minutes per week

**Calculation:**
```
Consistency % = (Total minutes logged in period / Goal minutes for period) × 100
```

**Example - Meditation:**
- Goal: 210 minutes per week (30 min × 7 days)
- User logged:
  - Monday: 25 min
  - Tuesday: 0 min
  - Wednesday: 30 min
  - Thursday: 20 min
  - Friday: 30 min
  - Saturday: 25 min
  - Sunday: 0 min
- Total: 130 minutes
- Consistency: (130 / 210) × 100 = **61.9%** → Display as **62%**

**Monthly View:**
- Goal: 210 min/week × 4 weeks = 840 min/month
- User logged: 650 minutes across the month
- Consistency: (650 / 840) × 100 = **77%**

**Notes:**
- Applies to: Meditation, Work, Workout, Reading, Sleep (convert hours to minutes)
- No longer counts "days met" but total time logged
- More flexible - user can log 50 min one day, 10 min another, still progresses toward goal

---

#### Incremental Trackers

**Goal Format:** Count per day

**Calculation:**
```
Daily Consistency % = (Daily total / Goal count) × 100
Weekly Consistency % = Average of daily consistencies
```

**Example - Hydration:**
- Goal: 8 glasses per day
- Monday: 6 glasses → 75%
- Tuesday: 8 glasses → 100%
- Wednesday: 5 glasses → 63%
- Thursday: 7 glasses → 88%
- Friday: 8 glasses → 100%
- Saturday: 4 glasses → 50%
- Sunday: 6 glasses → 75%
- **Weekly Consistency:** (75 + 100 + 63 + 88 + 100 + 50 + 75) / 7 = **79%**

---

#### Streak-Only Trackers

**No Percentage Calculation** - Just display:
- Current streak: "23 days"
- Longest streak: "45 days"

**Increment Logic:**
- At day boundary, check if reset button was pressed previous day
- If no: Increment current streak by 1
- If yes: Current streak already at 0

**Reset Logic:**
- User presses reset button
- Current streak → 0
- If current streak was > longest streak: Update longest streak
- Else: Longest streak unchanged

---

#### Manual Entry Trackers

**Goal Format:** Frequency-based (times per week)

**Calculation:**
```
Consistency % = (Days with entries / Goal days) × 100
```

**Example - Journal:**
- Goal: 5 times per week
- User journaled on: Mon, Wed, Thu, Sat (4 days)
- Consistency: (4 / 5) × 100 = **80%**

**Note:** Multiple entries in one day = still counts as 1 day for consistency

---

#### Overall Consistency Score

**Calculation:**
```
Overall % = Average of all active habits' consistency percentages
```

**Example:**
- Meditation: 62%
- Work: 85%
- Workout: 70%
- Journal: 80%
- No-Fap: N/A (streak, not percentage)
- Sleep: 90%
- Reading: 55%
- Hydration: 79%

Exclude streak-only (no percentage):
- (62 + 85 + 70 + 80 + 90 + 55 + 79) / 7 = **74.4%** → Display as **74%**

**Time Range:**
- Calculated for current selected time range (daily, weekly, monthly, yearly, all-time)

---

### 9.3 Heat Map Calculation

**For Calendar View:**

Each day gets a consistency score (0-100%) based on that day's performance across all active habits.

**Algorithm:**
```
For each day:
  For each active habit:
    Calculate daily consistency for that habit
  Average all habit consistencies for that day
  Assign color based on score:
    0-33%: Red (#EF4444)
    34-66%: Yellow (#FBB F24)
    67-100%: Green (#4ADE80)
  Use gradient between colors (not just 3 discrete values)
```

**Example - Feb 24:**
- Meditation: 20/30 min goal → 67%
- Work: 5/6 hours goal → 83%
- Workout: 0/60 min goal → 0%
- Hydration: 6/8 glasses → 75%
- Journal: Entry made (1/1 goal for day) → 100%
- Sleep: 7/7 hours → 100%
- Reading: 0/30 min → 0%
- No-Fap: Streak maintained → N/A (exclude)

Average (excluding No-Fap): (67 + 83 + 0 + 75 + 100 + 100 + 0) / 7 = **61%**

→ Color: Yellow (since 61% is in 34-66% range)

---

### 9.4 Day Boundary Logic

**Purpose:** Define when a "day" ends and new day begins

**Options:**

1. **Strict Midnight:**
   - Day runs 12:00 AM to 11:59 PM
   - Simple, standard

2. **Sleep Schedule:**
   - Day runs wake time to next wake time
   - Example: Wake at 7 AM → Day is 7 AM today to 7 AM tomorrow
   - Useful for night shift workers or late sleepers

3. **Custom:**
   - User sets ideal bedtime and wake time
   - Day runs bedtime to next bedtime OR wake to wake (user choice)

**Implementation:**
- Store user's choice in settings
- All calculations respect this boundary
- Streaks increment at boundary
- Daily goals reset at boundary
- Incremental counters (hydration) reset at boundary

---

## 10. Technical Stack

### 10.1 Frontend

**Framework:** React 18+  
**Build Tool:** Vite  
**Routing:** React Router v6  
**State Management:** React Context API or Zustand  
**Styling:** Tailwind CSS + Custom CSS

### 10.2 UI Libraries

**Icons:** Material Design Icons (@mui/icons-material)  
**Charts:** Recharts or Chart.js  
**Date Handling:** date-fns or Day.js  
**Animations:** Framer Motion (optional) or CSS transitions

### 10.3 Storage

**V1 (PWA):** localStorage or IndexedDB  
**V2 (Native):** SQLite (via Capacitor plugin)

### 10.4 PWA

**Service Worker:** Workbox (via Vite PWA plugin)  
**Manifest:** Web App Manifest (JSON)  
**Caching Strategy:** Cache-first for static assets, network-first for data

### 10.5 Native (V2)

**iOS & Android:** Capacitor  
**Plugins:**
- Camera
- File System
- Local Notifications
- Storage (SQLite)

### 10.6 Development Tools

**Version Control:** Git + GitHub  
**Linting:** ESLint  
**Formatting:** Prettier  
**Testing:** Vitest (unit), Playwright (E2E) - optional for V1

---

## 11. Development Plan

### Phase 1: Foundation (Week 1)

**Goal:** Project setup, design system, components

**Tasks:**
1.1 Initialize Vite + React project  
1.2 Configure Tailwind with custom tokens  
1.3 Set up Git repository  
1.4 Create component library:
   - Buttons (primary, secondary, icon, FAB)
   - Cards (habit cards)
   - Inputs (text, toggle, segmented picker, date/time pickers, slider)
   - Progress (bars, circular)
   - Charts (bar, line)  
1.5 Set up routing (React Router)  
1.6 Create navigation components (BottomNav, HamburgerMenu, TopNav)

**Deliverable:** Design system implemented, reusable components ready

---

### Phase 2: Core Features (Weeks 2-4)

**Goal:** Build all trackers, implement data persistence

**Tasks:**
2.1 Set up data layer:
   - localStorage utility functions
   - React Context for global state
   - Data schemas for all entities  
2.2 Build onboarding flow (8 screens)  
2.3 Build Dashboard:
   - Habit cards
   - Welcome message
   - Reordering  
2.4 Build Habit Detail Page template  
2.5 Implement Session-Based tracker (Meditation as reference)  
2.6 Implement remaining trackers:
   - Work, Workout, Reading, Sleep (session)
   - Hydration (incremental)
   - No-Fap (streak)
   - Journal (manual)  
2.7 Build Stats page  
2.8 Build Calendar page  
2.9 Build Profile page  
2.10 Build Settings page  
2.11 Implement consistency calculations  
2.12 Build Body Transformation feature

**Deliverable:** Fully functional app, all trackers working

---

### Phase 3: Polish & PWA (Weeks 5-6)

**Goal:** Animations, notifications, PWA features, testing

**Tasks:**
3.1 Add micro-animations:
   - Button presses
   - Progress fills
   - Page transitions
   - Celebrations  
3.2 Implement Web Notifications API:
   - Permission request
   - Scheduling
   - Per-habit settings  
3.3 Add optional sounds  
3.4 PWA setup:
   - Manifest.json
   - Service worker
   - Offline caching
   - Install prompt  
3.5 Comprehensive testing:
   - All user flows
   - Edge cases
   - Accessibility audit
   - Performance optimization  
3.6 Bug fixes  
3.7 Final polish  
3.8 Documentation (README)

**Deliverable:** Production-ready PWA, installable on Android

---

## 12. Quality Standards

### 12.1 Performance

- Lighthouse Performance: > 90
- Time to Interactive: < 3 seconds
- Bundle size: < 500KB (gzipped)
- 60fps animations
- No jank or stuttering

### 12.2 Accessibility

- Lighthouse Accessibility: > 90
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Touch targets ≥ 44px
- Color contrast ratios met

### 12.3 Functional

- All 8 trackers fully operational
- Data persists reliably (no loss)
- Consistency calculations accurate
- Export/import works
- Offline functionality works
- No critical bugs

### 12.4 Design

- UI matches specifications exactly
- Colors, fonts, spacing correct
- Animations smooth and polished
- Mobile responsive (320px - 767px)
- High-quality user experience

---

## 13. Future Roadmap

### V1.1 (Minor Updates)
- Bug fixes from real-world use
- UI polish based on feedback
- Performance optimizations
- Small feature additions

### V2.0 (Native iOS & Android)
- Capacitor integration
- Build native apps (APK for Android, IPA for iOS)
- Better notifications
- SQLite database
- Camera improvements
- Home screen widgets
- Custom habit creation
- Additional tracker types

### V3.0 (Cloud & Premium)
- Optional cloud sync (encrypted, user-controlled)
- Premium tier introduction:
  - AI insights (privacy-preserving)
  - Advanced analytics
  - Unlimited custom habits
  - Extended history
- Subscription model (~$3-5/month)
- One-time purchase option

### V4.0+ (Expansion)
- Community features (optional accountability partners)
- API for third-party integrations
- Wearable device integration
- Advanced data export (PDF reports)
- Multi-language support
- Themes (light mode, custom themes)

---

## Appendix A: Glossary

**Consistency:** The percentage of goals met within a time period.  
**Tracker Type:** The method of logging entries (session, incremental, streak, manual).  
**Heat Map:** Visual representation using colors to show consistency over time.  
**Day Boundary:** User-defined time when a "day" resets.  
**Promise:** User's motivational statement (displayed on app open).  
**FAB:** Floating Action Button (circular button, bottom-right).  
**Session:** A tracked activity with start and end time.  
**Streak:** Consecutive days of maintaining a habit.

---

## Appendix B: Color Reference

| Element | Color Code | Usage |
|---------|-----------|--------|
| Primary Accent | `#DB8686` | Buttons, active states, emphasis |
| Background | `#0A0A0A` | Page backgrounds |
| Surface | `#1A1A1A` | Cards, elevated elements |
| Meditation | `#C9B5E6` | Meditation habit card background |
| Work | `#8686A8` | Work habit card background |
| Workout | `#E69A9A` | Workout habit card background |
| Journal | `#E6D5C9` | Journal habit card background |
| No-Fap | `#B5C9B5` | No-Fap habit card background |
| Sleep | `#9AC4D4` | Sleep habit card background |
| Reading | `#E6D89A` | Reading habit card background |
| Hydration | `#9AB5D4` | Hydration habit card background |
| Success | `#4ADE80` | Positive feedback, high consistency |
| Warning | `#FBB F24` | Medium consistency, alerts |
| Error | `#EF4444` | Low consistency, errors |

---

**End of Document**

**Version:** 1.0  
**Total Pages:** [This document]  
**Last Updated:** February 2026  
**For:** Consistency App Development with Claude Code
