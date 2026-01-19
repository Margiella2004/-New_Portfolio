# Implementation Plan

## Overview
This plan covers:
1) Refactoring `src/App.jsx` into smaller, testable modules.
2) Running a Lighthouse audit and capturing baseline metrics.

## Scope
- Architecture refactor only (no UI/UX changes beyond what is required for structural separation).
- Lighthouse run against the production build using `vite preview`.

## Architecture Refactor Plan
1) **Create scene module**
   - Move 3D scene pieces into `src/scene/`.
   - Candidates: `Scene`, `RoundedCube`, `ControlsRig`, `CameraRig`, `ScrollStopBCUpdater`.
   - Keep low-power and DPR logic close to the scene API surface.

2) **Create animation hooks**
   - Move GSAP/ScrollTrigger logic into `src/hooks/`.
   - Candidates: `useHeroScroll`, `useProjectsScroll`, `useFooterScroll`, `useSectionTracking`.
   - Replace `querySelector` calls with refs passed from the parent.

3) **Create page sections**
   - Move each top-level section into `src/sections/`.
   - Candidates: `HeroSection`, `ProjectsSection`, `AboutSection`, `FooterSection`.
   - Each section owns its local markup and refs; App coordinates layout.

4) **Centralize controls/config**
   - Move Leva config into `src/config/controls.js`.
   - Centralize debug flags and feature toggles in `src/config/runtime.js`.

5) **Recompose `App.jsx`**
   - `App.jsx` becomes a lightweight composition root.
   - Responsibilities: wire refs, pass props, and render sections.

6) **Regression checklist**
   - Verify scroll-triggered animations still fire.
   - Verify routing and hash navigation still work.
   - Verify low-power mode behavior unchanged.

## Lighthouse Audit Plan
1) **Build**
   - `npm run build`

2) **Preview**
   - `npm run preview -- --host 127.0.0.1 --port 4173`

3) **Lighthouse run**
   - `npx -y lighthouse http://127.0.0.1:4173 --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/gradecube-lighthouse.json --chrome-flags="--headless --disable-gpu --no-sandbox"`

4) **Capture baseline**
   - Record category scores + key metrics (FCP, LCP, TBT, CLS, SI, TTI).
   - Save a short summary in `docs/lighthouse-baseline.md`.

5) **Rerun after refactor**
   - Compare before/after scores to confirm no regressions.

## Deliverables
- Modularized scene/animation/section code structure.
- `docs/lighthouse-baseline.md` with initial scores and metrics.
- Updated `src/App.jsx` focused on composition only.

## Out of Scope
- UX changes, visual redesigns, or copy edits.
- Performance optimizations beyond what is required by the refactor.
