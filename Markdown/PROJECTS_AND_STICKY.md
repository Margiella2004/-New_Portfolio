# Projects Pages + Sticky Behavior Overview

This document summarizes how the projects pages are structured and where sticky/scroll reveal behavior is implemented.

## Projects Section (Home Page)

**Entry point**
- `src/App.jsx` renders the projects section inside `#projects` and controls the hero -> projects transition.

**Layout**
- The hero is sticky (`.hero-section`) and the projects section slides over it.
- The projects content is built in `src/Projects.jsx` with its styles in `src/Projects.css`.

**Sticky behavior (home)**
- `src/App.css`:
  - `.hero-section` uses `position: sticky` and `top: 0`.
  - `.projects-wrapper` has higher z-index so it visually covers the hero.
- `src/App.jsx`:
  - The projects container is pinned and horizontally slides in with GSAP ScrollTrigger.
  - FOV animation is tied to scroll as the hero transitions into projects.

## Project Detail Pages

There are two patterns in the codebase:

1) **Template-based details**
- `src/components/ProjectDetailTemplate.jsx` and `src/components/ProjectDetailTemplate.css`.
- Used by `src/pages/WanderAppDetail.jsx`.
- Includes an "Other Projects" grid at the bottom (static, non-sticky).

2) **Custom detail pages**
- `src/pages/SynechronCubeDetail.jsx` (custom layout and media blocks).
- `src/pages/GuardianAppDetail.jsx` (custom layout, timeline, and scroll reveals).

## Guardian App Page (Custom + Sticky Reveal)

**Structure**
- `src/pages/GuardianAppDetail.jsx` lays out the Guardian content, then two reveal stages:
  1) Full-screen final image stage.
  2) Full-screen "Other Projects" stage (Synechron Cube).
  3) Footer module at the bottom.

**Other Projects module**
- `src/components/OtherProjects.jsx` and `src/components/OtherProjects.css`.
- Renders a full-bleed background image with the project title overlaid.

**Sticky / reveal behavior**
- `src/pages/GuardianAppDetail.jsx` uses GSAP ScrollTrigger to pin and translate:
  - Final image stage pins and slides up to reveal the Other Projects stage underneath.
  - Other Projects stage pins and slides up to reveal the Footer underneath.
- `src/pages/GuardianAppDetail.css` defines the 100vh reveal stages and ensures the media fills the viewport.

## Footer Reveal (Home Page)

**Sticky behavior**
- `src/App.jsx` uses ScrollTrigger to pin the about section and translate the footer into view after the FOV animation finishes.
- The footer is rendered in `src/Footer.jsx` with styles in `src/Footer.css`.

## Files to Inspect

- `src/App.jsx`
- `src/App.css`
- `src/Projects.jsx`
- `src/Projects.css`
- `src/pages/GuardianAppDetail.jsx`
- `src/pages/GuardianAppDetail.css`
- `src/components/OtherProjects.jsx`
- `src/components/OtherProjects.css`
- `src/Footer.jsx`
- `src/Footer.css`
