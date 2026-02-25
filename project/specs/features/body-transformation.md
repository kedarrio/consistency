# Body Transformation — Feature Specification

> Sub-feature of the Workout habit tracker.

---

## Overview

Body transformation allows users to upload progress photos alongside their workout logs, track weight over time, and view a visual timeline of physical changes.

---

## Setup (Onboarding)

On Screen 5 of onboarding (if Workout was selected):
- Toggle: "Enable Body Transformation" (default OFF)
- If ON:
  - Height input (cm or ft/in)
  - Current weight (kg or lbs)
  - Photo frequency: Daily | Weekly (segmented)
  - If Weekly: Day selector (Mon, Tue, Wed, Thu, Fri, Sat, Sun)

---

## Photo Upload

On Workout Detail Page, when body transformation is enabled:
- A "Photo" section appears below the session area
- Shows most recent photo (if any)
- "Upload Progress Photo" button

On tap:
- Options: "Take Photo" | "Choose from Gallery"
- After selection: preview + weight input for that day
- Save: stores photo as base64 + weight + date

---

## Photo Gallery

Within Workout Detail Page or accessible via a "View History" button:

```
┌────────────────────┐
│  [Photo grid]      │   thumbnails, tappable
│  ● Feb 24, 70 kg   │
│  ● Feb 17, 71 kg   │
│  ● Feb 10, 72 kg   │
└────────────────────┘
```

Tap photo → full screen view with:
- Date
- Weight at time of photo
- Option to delete

---

## Before/After Comparison

"Compare" button opens a split-screen view:
- Left: oldest/selected photo
- Right: newest/selected photo
- Swipeable selection (user picks which photos to compare)

---

## Timelapse Mode

"Timelapse" button plays all photos in sequence:
- Duration: ~0.5 seconds per photo
- Auto-plays oldest to newest
- Pause/play control
- Speed control (slow / normal / fast)

---

## Weight Tracking

Each photo entry includes optional weight.

Weight trend chart (line chart):
- X: dates of photos
- Y: weight in kg (or lbs)
- Line chart (see `design/components/charts.md`)

---

## Privacy

All photos stored locally as base64 in localStorage. Never uploaded to any server.

Storage warning: base64 images are large. After ~20 photos, warn user about storage.
