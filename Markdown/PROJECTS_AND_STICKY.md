# Home + Projects Current Architecture and Progress

This document tracks the current home hero and `/projects` behavior, plus the latest bugfix progress around plane selection state.

## Current Entry Points

- Home route: `src/main.jsx` -> `<Route path="/" element={<App />} />`
- Projects route: `src/main.jsx` -> `<Route path="/projects" element={<Projects3DPage />} />`
- Projects page shell: `src/pages/Projects3DPage.jsx`

## Home Section (Current)

### Composition

- `src/App.jsx` renders a single fullscreen hero section with:
  - `HeaderNew`
  - `HeroTextOverlay`
  - `IntroText`
  - `DesignEngineer`
  - `FloatingTabs`
  - 3D cube `Scene` (`@react-three/fiber`)

### Motion and Performance

- Intro timeline (GSAP) controls initial bloom/fresnel/text/header reveal.
- Lenis smooth scrolling is enabled when not in low-power mode.
- Low-power mode disables/reduces expensive visual effects and caps DPR.

### Important Notes

- Home currently exposes only `id="home"`; hash targets like `#projects` and `#contact` are not mounted in the current hero-only structure.

## Projects Section (`/projects`) (Current)

### Composition

- `src/components/Projects3D.jsx` mounts:
  - `Canvas`
  - `GradientPlanes`
  - optional `RotatingTitles3D`
  - `EditorialOverlay`

### Data Flow

- `src/adapters/projectAdapter.js` adapts `projectsList` and `projectsData` into the scene/overlay format.
- `useSharedTexturesWithRenderer` handles texture loading and fallback.

### Interaction Model

- Scroll: `VirtualScroll` + spring integration in `GradientPlanes`.
- Click behavior: first click selects plane; second click navigates to project route.

## Progress Log (This Session)

### 1. Root Cause Analysis Completed

- Reviewed home and projects architecture in:
  - `src/App.jsx`
  - `src/components/Projects3D.jsx`
  - `src/components/GradientPlanes.jsx`
  - `src/components/HeaderNew.jsx`
  - supporting CSS and data adapter files

### 2. Plane Selection Reset Fixes Implemented

All changes were applied in `src/components/GradientPlanes.jsx`.

- Added reset behavior so selection no longer remains sticky after scrolling away.
- Added deterministic reset conditions for infinite loop behavior:
  - reset when selected plane leaves click/interact range
  - reset when selected plane is no longer the focused in-range plane
- Enforced single selection:
  - selecting a plane now replaces previous selection (`new Set([index])`)
- Ensured non-selected planes remain default (not hidden by selection state).
- Updated active/full-opacity logic:
  - full opacity is tied to the in-range focused plane, not stale selected index.

### 3. Validation

- Linted updated component:
  - `npx eslint src/components/GradientPlanes.jsx`
  - status: passing

## Files Touched in This Progress Update

- Code:
  - `src/components/GradientPlanes.jsx`
- Documentation:
  - `Markdown/PROJECTS_AND_STICKY.md`
