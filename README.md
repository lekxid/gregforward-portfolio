# GregForward portfolio

Adeleke Gregory Ajayi's cloud, DevOps, networking, and AI learning portfolio.

## Website

https://gregforward.lekxid.workers.dev

Responsive static frontend with project filters, four project detail pages, a documented architecture walkthrough, a downloadable resume, and accessible contact composition.

## Development

No package installation or build framework is required.

```
node --check assets/app.js
node scripts/check.mjs --build
python -m http.server 8765 --directory dist
```

The production artifact contains only public assets. The original profile photo remains in source; the frontend loads a smaller, metadata-stripped WebP derivative.

## Infrastructure scope

The existing project documents an Azure Ubuntu VM, Docker, Caddy, Flask/Gunicorn, PostgreSQL, and WireGuard. The current public hostname serves GitHub Pages. Backend source and active VM configuration are not in this repository. No live infrastructure status is asserted without measurements.

Direct website contact delivery is not connected. The form opens a clearly labeled email draft. See OPERATIONS.md for monitoring contracts, deployment, rollback, and safe Azure continuation.
