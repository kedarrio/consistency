# Data Export & Import — Feature Specification

> Export/import functionality from Settings → Data Management.

---

## Export

### CSV Export

For spreadsheet analysis. One file containing all habit data.

```
Date,Habit,Type,Duration(min),Count,Notes
2026-02-24,Meditation,session,25,,Morning calm
2026-02-24,Hydration,incremental,,6,
2026-02-24,Workout,session,45,,Cardio - Heavy intensity
```

For streak habits:
```
Date,Habit,Type,StreakBroken,Notes
2026-01-15,No-Fap,streak-reset,23,Felt stressed
```

### JSON Export

Full backup. Exports the entire `consistency_habits` and `consistency_user` objects. Can be used to restore the app.

```json
{
  "exportDate": "2026-02-25T10:30:00Z",
  "version": "1.0.0",
  "user": { ... },
  "habits": { ... }
}
```

Note: Photos (base64) are included in JSON export. File will be large if many photos.

---

## Export Flow

1. Settings → Data Management → "Export Data"
2. Modal opens with format selector: CSV | JSON
3. User selects format and taps "Export"
4. Generate content as string
5. Create `Blob` and `URL.createObjectURL`
6. Trigger download via `<a>` element with `download` attribute
7. File saved to device Downloads folder

```javascript
function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
```

---

## Import

### Flow

1. Settings → Data Management → "Import Data"
2. File picker opens (accept: `.json`, `.csv`)
3. Parse and validate file
4. If valid JSON: show options:
   - **Merge:** Add imported entries to existing data (keep both)
   - **Overwrite:** Replace all data with imported data
5. Confirmation modal: "This will [merge/overwrite] your data. Continue?"
6. On confirm: write to localStorage

### Validation

```javascript
function validateImport(data) {
  if (!data.version || !data.habits) {
    throw new Error("Invalid file format");
  }
  // Check each habit has required fields
  // ...
}
```

Show helpful error message if file is malformed.

### CSV Import

CSV import is best-effort — import only supports entries, not settings or user profile. This is simpler than JSON restore.

---

## Clear All Data

1. Settings → Data Management → "Clear All Data"
2. Warning modal with two-step confirmation:
   - Explain what will be deleted (all habits, entries, settings, photos)
   - Input: user must type "DELETE" exactly
   - "Delete Everything" button enabled only when text matches
3. On confirm:
   - `localStorage.clear()`
   - Redirect to onboarding

Filename format: `consistency-export-2026-02-25.json` or `consistency-export-2026-02-25.csv`
