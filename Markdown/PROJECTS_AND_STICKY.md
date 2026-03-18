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
  - 3D cube `Scene` (`@react-three/fiber`)

### Motion and Performance

- Intro timeline (GSAP) controls initial bloom/fresnel/text/header reveal.
- Lenis smooth scrolling is enabled when not in low-power mode.
- Low-power mode disables/reduces expensive visual effects and caps DPR.

### Important Notes

- Home supports projects overlay flow via `#projects` and `projects-tab-clicked` handling in `src/App.jsx`.
- Floating tabs were removed from home render and from home Leva controls.

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
- Click behavior: single click on the active plane triggers transition, flatten/fade, then navigation.
- Active/select state stability now includes hysteresis to reduce boundary flicker.

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

### 4. Header + Nav Unification Updates

- Removed secondary header nav pills (`Featured`, `Trending`, `Recent`, `All`) from `HeaderNew`.
- Unified detail pages to use `HeaderNew` instead of `ProjectDetailHeader`:
  - `src/pages/WanderAppDetail.jsx`
  - `src/pages/GuardianAppDetail.jsx`
  - `src/pages/IHateMyCommuteDetail.jsx`
  - `src/pages/SynechronCubeDetail.jsx`
  - `src/components/ProjectDetailTemplate.jsx`
- Projects-tab routing behavior:
  - from detail routes (`/project/...`) -> navigates to `/projects`
  - from home route -> navigates to `/#projects`

### 5. About Overlay Updates

- Added global hash-based About overlay host:
  - `src/components/AboutOverlayHost.jsx`
  - `src/components/AboutOverlayHost.css`
- Mounted globally in `src/main.jsx`.
- About overlay now:
  - opens from `#about`
  - fills viewport
  - keeps navbar visible above overlay
  - uses archived About copy/styles (inverse theme variant)
  - animates in via backdrop fade + panel slide-up

### 6. Projects Transition + Selection Stability

All changes in `src/components/GradientPlanes.jsx` unless noted.

- Updated project selection transition easing to ease-in-out.
- Added intro settle offset so final intro selected tile lands lower.
- Added stronger active-index hysteresis and stable active-index rendering path.
- Restricted clickability to a single active in-range tile to avoid dual-select appearance.
- Fixed active tile computation order issues that caused apparent mid-scroll flicker.

### 7. Leva and Defaults Updates

- Split home/projects Leva usage and visibility behavior during section switching.
- Projects trig control range:
  - `sphereCenterY` max increased from `2` to `5` in `src/components/Projects3D.jsx`
- Projects camera default zoom updated to `1.53`:
  - `src/config/controlDefaults.js`
  - `src/config/controlSchemas.js`

### 8. Detail Pages Visual Inversion

- Inverted project detail pages for dark-first consistency with white navbar.
- Updated page-level and shared module styles:
  - `src/pages/WanderAppDetail.css`
  - `src/pages/GuardianAppDetail.css`
  - `src/pages/IHateMyCommuteDetail.css`
  - `src/pages/SynechronCubeDetail.css`
  - `src/components/ContentModule.css`
  - `src/components/ProjectDetailTemplate.css`
  - `src/components/OtherProjects.css`

### 9. Home Cleanup

- Removed floating tabs from home:
  - removed `FloatingTabs` import/render block in `src/App.jsx`
  - removed `"Floating Tabs"` Leva folder in `src/App.jsx`

## Files Touched in This Progress Update

- Code:
  - `src/components/GradientPlanes.jsx`
  - `src/components/HeaderNew.jsx`
  - `src/components/AboutOverlayHost.jsx`
  - `src/components/AboutOverlayHost.css`
  - `src/pages/WanderAppDetail.jsx`
  - `src/pages/GuardianAppDetail.jsx`
  - `src/pages/IHateMyCommuteDetail.jsx`
  - `src/pages/SynechronCubeDetail.jsx`
  - `src/components/ProjectDetailTemplate.jsx`
  - `src/pages/WanderAppDetail.css`
  - `src/pages/GuardianAppDetail.css`
  - `src/pages/IHateMyCommuteDetail.css`
  - `src/pages/SynechronCubeDetail.css`
  - `src/components/ContentModule.css`
  - `src/components/ProjectDetailTemplate.css`
  - `src/components/OtherProjects.css`
  - `src/components/Projects3D.jsx`
  - `src/config/controlDefaults.js`
  - `src/config/controlSchemas.js`
  - `src/App.jsx`
  - `src/main.jsx`
- Documentation:
  - `Markdown/PROJECTS_AND_STICKY.md`
