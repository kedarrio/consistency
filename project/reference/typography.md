# Typography — Usage Examples & Rules

---

## The Two Fonts

### Playfair Display (Headings)
```
Font family: 'Playfair Display', Georgia, serif
Weight: 600 (Semi-bold)
Use for: Page titles, section headers, habit names, large numbers, important labels
```

### IBM Plex Mono (Data)
```
Font family: 'IBM Plex Mono', 'Courier New', monospace
Weight: 400 (Regular)
Use for: All numbers, timestamps, percentages, stats, labels, body copy, notes
```

---

## Font Size Scale

| Token | Size | Font | Weight | Example Use |
|-------|------|------|--------|-------------|
| h1 | 32px | Playfair | 600 | Rarely used (could be onboarding hero) |
| h2 | 24px | Playfair | 600 | Page titles in top nav |
| h3 | 20px | Playfair | 600 | Section headers, card headers |
| body | 16px | IBM Plex Mono | 400 | Body text, large labels |
| bodySmall | 14px | IBM Plex Mono | 400 | Supporting text, secondary info |
| caption | 12px | IBM Plex Mono | 400 | Timestamps, metadata |
| dateLarge | 48px | Playfair | 600 | Streak count, incremental count on detail page |
| dataHero | 64px | Playfair | 600 | Overall consistency % on Stats page |

---

## Specific Usage Examples

### Page Titles (in top nav)
```
"Consistency" — Playfair, 24px, white
"Statistics" — Playfair, 24px, white
"Meditation" — Playfair, 24px, white (habit detail)
```

### Habit Card Elements
```
Habit Name:  Playfair, 20px, #2A2A2A
Count:       IBM Plex Mono, 16px, #2A2A2A
Format:      "9/20m" or "6/8 glasses"
```

### Large Numbers (Detail Pages)
```
Streak:      "23 days 🔥" — Playfair, 48px, #DB8686
Percentage:  "78%" — Playfair, 64px, #DB8686
Count:       "6 / 8" — Playfair, 48px, white
Timer:       "05m13s" — Playfair, 32px, white
```

### Stats and Data
```
Label:       "Overall consistency" — Plex Mono, 16px, #A0A0A0
Value:       "78%" — Playfair, 32px, habit color
Sub-label:   "this week" — Plex Mono, 14px, #6A6A6A
Timestamp:   "Feb 24, 2026 • 8:00 AM" — Plex Mono, 14px, #A0A0A0
Duration:    "25 minutes" — Plex Mono, 18px, white
```

### Onboarding
```
Logo:        "Consistency" — Playfair, 48px, white
Tagline:     "one day at a time" — Plex Mono, 16px, #A0A0A0
Headings:    "How it works" — Playfair, 28px, white
Body:        Plex Mono, 16px, white
```

---

## Rules

1. **Playfair = meaning, Plex = data** — never swap
2. **Always use Playfair for habit names** — even small sizes
3. **All numbers in IBM Plex Mono** — even large count displays (48px) use Plex, but consistency % uses Playfair for emphasis
4. **Line height:** Headings = 1.2, Body = 1.5
5. **No bold IBM Plex Mono** — regular weight only for data
6. **No italic Playfair** except for quoted promise text on profile page

---

## Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500&family=Playfair+Display:wght@600&display=swap" rel="stylesheet">
```
