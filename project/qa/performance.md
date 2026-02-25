# Performance — Budgets & Targets

---

## Core Metrics (Lighthouse)

| Metric | Target |
|--------|--------|
| Performance Score | ≥ 90 |
| Accessibility Score | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 80 |
| Time to Interactive (TTI) | < 3 seconds |
| First Contentful Paint (FCP) | < 1.5 seconds |
| Cumulative Layout Shift (CLS) | < 0.1 |

---

## Bundle Size Targets

| Asset | Limit |
|-------|-------|
| Total JS (gzipped) | < 500KB |
| Initial JS bundle | < 200KB |
| CSS (gzipped) | < 50KB |
| Critical CSS (inline) | < 10KB |

---

## Animation Performance

- **All animations must run at 60fps** — test with Chrome DevTools Performance panel
- Use GPU-composited properties only: `transform`, `opacity`
- Never animate: `width`, `height`, `top`, `left`, `margin`, `padding` (causes layout/repaint)
- Use `will-change: transform` sparingly on animated elements
- Timer updates: every 1 second is fine; don't use `requestAnimationFrame` for 1-second intervals

---

## Storage Performance

- localStorage reads are synchronous — minimize reads in render
- Cache habit data in React Context/state; don't read localStorage on every render
- Write only when data changes; don't write on every re-render

---

## Image Optimization

- Profile photos: compress before storing as base64
- Progress photos (body transformation): warn user about storage impact
- Icons: use MUI icon font or SVG (not image files)
- App icons: provide in appropriate sizes for PWA manifest

---

## Lighthouse Testing

Run Lighthouse in Chrome DevTools:
1. Open Chrome DevTools
2. Tab: "Lighthouse"
3. Mode: "Navigation"
4. Device: "Mobile"
5. Run analysis

Run on:
- Dashboard (most complex, most habits)
- Stats page (charts rendering)
- Calendar page (heat map grid)

---

## Performance During Development

- Use `npm run dev` for development (Vite HMR)
- Use `npm run build && npm run preview` to test production build performance
- Check bundle: `npx vite-bundle-visualizer` after build
