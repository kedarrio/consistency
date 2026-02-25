# Manual Entry Tracking — Feature Specification

> Applies to: Journal

---

## Overview

Manual entry trackers allow users to log entries at any time using either text or photos. No timer needed — just tap FAB and add an entry.

---

## Adding Entry (via FAB)

1. User on Journal Detail Page
2. Tap FAB (bottom-right)
3. Entry modal opens (bottom sheet)
4. User chooses mode: Text | Photo (tab toggle)
5. Fills in content
6. Saves

---

## Text Entry Mode

```
Date picker (defaults to today, can backdate)
Time picker (optional)
─────────────────────────
Large text area (unlimited length)
  Placeholder: "Write anything..."
─────────────────────────
[Cancel]  [Save]
```

---

## Photo Entry Mode

```
Date picker (defaults to today)
Time picker (optional)
─────────────────────────
[Take Photo]  [Choose from Gallery]

[Photo preview area — shows after selection]
Caption text field (optional)
Multiple photos: show + button to add more
─────────────────────────
[Cancel]  [Save]
```

Photo storage: base64-encoded in localStorage. Warn user if storage is getting full (estimate).

---

## Multiple Entries Per Day

- Users can add multiple entries on the same day
- Each entry is independent (separate `id`, `timestamp`)
- Consistency calculation counts distinct DAYS with entries, not number of entries

---

## Backdating

Date picker allows selecting past dates. This is intentional — users can log yesterday's journal entry if they forgot.

---

## Entry Display in Logs

Each journal entry in the log list shows:
- Date & time (Plex Mono, 14px, `#A0A0A0`)
- Type badge: "TEXT" or "PHOTO" (small label)
- Preview: first 50 chars of text, OR thumbnail of first photo
- Tap: opens full view/edit modal

---

## Edit Entry

- Tap entry → edit modal (pre-filled)
- Can change date, time, content
- Photos: can remove individual photos, add new ones
- Save → updates entry in storage

---

## Delete Entry

- From within edit modal: "Delete" button (danger)
- Or from Logs → long-press → select → delete
