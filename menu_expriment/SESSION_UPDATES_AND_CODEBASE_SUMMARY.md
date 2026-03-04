# Session Updates And Codebase Summary

## Project Summary

This project is a React + Vite + React Three Fiber scene that renders a vertical looping stack of textured planes with a custom vertex/fragment shader pipeline.

Main characteristics:

- WebGL scene rendered through `@react-three/fiber`.
- Shader material created with `@react-three/drei` `shaderMaterial`.
- Scroll behavior driven by `virtual-scroll` + spring smoothing in `useFrame`.
- Runtime tuning UI via Leva panels (`Scene`, `Geometry`, `Scroll`, `Material`, `Trig`, `Fragment`, `Interaction`, `Camera`).
- Image textures loaded from Unsplash URLs with fallback generated `DataTexture`s.
- Editorial UI overlay with project title, tags, description, and CTA button.
- Click-to-toggle interaction: images slide left to reveal expanded content.
- GSAP-powered animations with ease-in-ease-out transitions.
- Transparent canvas with layered UI underneath 3D elements.
- Scroll lock when in expanded state.

Current state is stable and builds/lints cleanly.

## Current File Responsibilities

- `src/App.jsx`
  - App composition, Leva controls, camera control, scroll physics, mesh placement.
  - Uniform updates per frame for each mesh material instance.
  - Texture loading, fallback generation, and texture disposal lifecycle handling.
  - Click-to-toggle interaction with expanded/collapsed states.
  - GSAP animation orchestration for UI transitions.
  - Editorial strip with dynamic project info based on active mesh.
- `src/shaders/vertex.glsl`
  - Plane deformation math driven by Leva trig uniforms (range, center, frequency, phase, exponent, axis mix).
- `src/shaders/fragment.glsl`
  - Texture sampling, aspect-correct UV remap, z-mask cutout using `discard`.
- `src/index.css` / `src/App.css`
  - Base layout and full-viewport canvas styling.
  - Editorial strip grid layout with responsive breakpoints.
  - Expanded state styles for title, info container, and preview images.
  - Typography using Instrument Serif (title) and IBM Plex Mono (tags).

## Current Shader/Render Behavior

- Vertex shader currently uses:
  - `pos.y += progress * uProgressMul`
  - range band from `uSmoothCenter ± (uRangeMul * uMeshHeight)`
  - `base = cos((normalizedY * uTrigFreq + uTrigPhase) * PI)`
  - hardcoded `deadZone = 0.93`
  - `curve = pow(mag, uCurvePow)` and `angle = sign(base) * curve * uAngleAmp`
  - mixed-axis rotation with `rotatex/rotatey` via `uAxisMix`
- Fragment shader currently uses:
  - `a = smoothstep(uMaskStart, uMaskEnd, vPosition.z)`
  - `if (a < 0.5) discard;`
  - output `vec4(color, 1.0)` (opaque color pass with cutout mask)

This avoids blended transparency artifacts by using cutout behavior rather than soft alpha blending.

## Session Change Log

Below is the sequence of key updates made during this session.

### 1) Initial review and diagnostics

- Reviewed project structure and source files.
- Ran:
  - `npm run lint` (pass)
  - `npm run build` (pass, chunk-size warning only)
- Reported code-quality findings (texture disposal risk, production Leva presence, etc.).

### 2) Restored bending behavior from reference screenshots

- Adjusted vertex bend logic multiple times to match original look:
  - moved translation into shader (`pos.y += progress`)
  - switched from per-object-like behavior toward per-vertex deformation
  - tested strict original-style equation
  - tuned default mask and amplitude values
- Removed duplicate y-position movement in JS while relying on shader progress.

### 3) Camera and facing-direction tweaks

- Flipped bend direction in shader more than once to align with camera-facing side.
- Adjusted camera defaults (`posY`, `lookAtX`) toward centered framing.

### 4) Transparency artifact mitigation

- Implemented cutout approach in fragment shader:
  - added `discard` threshold on computed mask alpha
  - switched to opaque output color
- Set material to non-transparent with depth write enabled in `App.jsx`.
- This was kept and is part of current state.

### 5) Trig/Bend control experiments (iterated and partially reverted)

- Attempted to map flat-top equation to Leva controls.
- Added/remapped controls, then reverted/retuned multiple times per feedback.
- Added and later removed protective spacing logic for overlaps.
- Added and later removed a dedicated `Bend` panel model.

### 6) lil-gui experiment

- Installed `lil-gui`, added left-side panel and wired it to bend uniforms.
- Removed `lil-gui` fully after request:
  - uninstalled package
  - removed GUI code and import

### 7) Final requested state restoration

- Restored previous Leva manipulation path (`Trig` section re-enabled).
- Kept cutout/opaque render fix.
- Removed temporary fixed-bend constant path.

### 8) Post-review hardening patch

- Fixed fallback texture upload path:
  - fallback `DataTexture` now sets `texture.needsUpdate = true`.
- Added texture cleanup/disposal protections:
  - dispose loaded textures on cancelled async loads
  - dispose active texture set on unmount
  - protected against double-dispose with a userData marker
- Removed dead `pixels` uniform and related resize update path.
- Moved camera projection updates from per-frame work to dependency-based `useEffect`.
- Rewired vertex shader so existing `Trig` Leva controls actively drive deformation again.

### 9) Camera default orientation update

- Changed Camera Leva default orientation to `vertical` (was `horizontal`).

## Reverted Experiments (not in final code)

- Custom `Bend` Leva section replacing `Trig`.
- Direct `lil-gui` panel control path.
- Dynamic gap safety clamp.
- Some alternate flat-top equations and sign behaviors.
- Local-space mask variant (`vPosition = pos`) in vertex shader.

## Current Controls In Leva

- `Scene`: background, mesh count, gap, group offset
- `Geometry`: plane width/height + subdivisions
- `Scroll`: sensitivity + spring physics + multipliers
- `Material`: wireframe
- `Trig`: bend-related parameters (currently wired in JS uniforms)
- `Fragment`: mask toggle and thresholds
- `Camera`: position/look/fov/roll/orientation (default orientation now `vertical`)

## Validation Status

Latest checks:

- `npm run lint`: pass
- `npm run build`: pass
- `npm run lint` after default-orientation change: pass

### 10) Editorial Strip UI Implementation

- Added editorial overlay section with project information:
  - Left-aligned italic title using Instrument Serif font
  - Right-aligned info container with tags, description, and CTA button
  - Horizontal divider line at 50% viewport height
- Project copy data structure (`PROJECT_COPY`) with title, tags, description, and CTA
- Active project updates dynamically based on which mesh is closest to center

### 11) Click-to-Toggle Interaction

- Added click interaction on meshes to toggle expanded/collapsed state
- Image slides left (`toggleShiftX: -3.5`) when clicked
- `toggleResponse` controls animation speed (set to 6 for smooth movement)
- Only flat/center meshes are clickable (controlled by `flatAngleThreshold` and `centerWindow`)

### 12) GSAP Animation Integration

- Installed `gsap` for smooth animations with `power2.inOut` easing
- Animations triggered on expand/collapse:
  - Right container slides left by 18rem when expanded
  - Preview images grid (2x2) fades in and expands below content
  - Left title fades out, expanded title fades in above right container
- Collapse animations are faster than expand to prevent visual conflicts:
  - Container close: 0.25s
  - Previews close: 0.2s
  - Expanded title fade out: 0.15s
  - Left title fade in: 0.4s with 0.5s delay

### 13) Scroll Lock on Expanded State

- Scroll is disabled when an image is in expanded/clicked state
- User must click the image again to return to default state before scrolling resumes
- `isExpanded` state passed to `GradientPlanes` to control scroll behavior

### 14) Transparent Canvas with Layered UI

- Canvas background set to transparent (`gl={{ alpha: true }}`, `background: none`)
- Body background is white (`#ffffff`)
- Editorial strip sits at z-index 1, below canvas at z-index 2
- Non-3D elements render underneath the 3D canvas elements

## Current Controls In Leva

- `Scene`: background, mesh count, gap, group offset
- `Geometry`: plane width/height + subdivisions + size variation
- `Scroll`: sensitivity + spring physics + multipliers
- `Material`: wireframe
- `Trig`: bend-related parameters (currently wired in JS uniforms)
- `Fragment`: mask toggle and thresholds
- `Interaction`: click toggle, shift amount, flat threshold, center window, toggle response
- `Camera`: position/look/fov/roll/orientation (default orientation now `vertical`)

## Dependencies

- `react`, `react-dom` - UI framework
- `three` - 3D rendering
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Helpers and abstractions
- `leva` - Runtime tuning UI
- `virtual-scroll` - Smooth scroll handling
- `gsap` - Animation library

## Validation Status

Latest checks:

- `npm run lint`: pass
- `npm run build`: pass
- `npm run lint` after default-orientation change: pass

## Notes

- Build still reports large bundle warning from Vite/Rollup (`>500kB` chunk warning).
- Current code keeps the anti-artifact cutout approach and now includes texture lifecycle hardening.
- GSAP animations use `power2.inOut` for consistent ease-in-ease-out behavior.

## Latest Session Addendum

### 15) Expanded panel scroll and clipping fixes

- Moved touch blocking from the full app shell to the canvas layer so editorial scroll can work in expanded state.
- Removed restrictive expanded height clamps and switched to viewport-based limits.
- Made the expanded right panel itself (`.editorial-info`) the primary scroll container.
- Updated wheel/touch event interception to target the expanded panel node directly.

### 16) Expanded top offset controls and defaults

- Added top-left `- / +` controls to tune expanded top offset in real time.
- Wired offset through React state into a CSS variable (`--expanded-offset`) on the overlay.
- Range expanded to `0rem`..`34rem`.
- Set default expanded top offset to `12.2rem`.
- Kept this offset expansion-only (collapsed/default state remains `margin-top: 0`).

### 17) Collapse/expand animation sequencing refinements

- Collapse sequence changed to top-to-bottom exit order:
  - expanded title
  - tags
  - description
  - CTA
  - preview images (staggered)
- Prevented first-frame collapse snapping by freezing expanded width/padding at collapse start and animating back later.
- Kept expanded top spacing visible during collapse; offset drops near the end of exit.
- Updated expand timeline so right container movement/expansion completes before inner clicked-state content reveals.

### 18) Right panel width and image sizing experiments

- Added expanded-only width growth for the right container and larger preview images for visual exploration.
- Tuned responsive expanded widths/heights at `1200px`, `980px`, and `700px` breakpoints.
- Reduced expanded left shift distance (`--info-shift-expanded`) after tuning feedback.
- Reduced expanded width by ~20% across breakpoints after initial expansion pass.

### 19) Nav animation upgrade

- Reworked nav active state to use a GSAP-animated sliding indicator/pill.
- Indicator animates to clicked tab position/size and repositions on resize.
- Removed static per-button active background fill in favor of animated indicator layer.

### 20) Interaction visual tests (kept vs reverted)

- Kept: higher clicked-state image opacity (`slideFadeMinOpacity` default raised to `0.85`).
- Reverted: 180-degree Y-axis spin on click/collapse (GSAP rotation test removed).

### 21) Current validation snapshot

- `npm run lint`: pass
- `npm run test -- --run`: pass
- `npm run build`: pass
- Build still emits Vite/Rollup large chunk warning (`>500kB`).

### 22) Latest tuning pass (post-addendum)

- Resolved expand-start size flash:
  - Removed forced collapsed-width application during non-clicked -> clicked transition.
  - Moved main UI animation sequencing to `useLayoutEffect` to avoid pre-paint visual flicker.
- Refined clicked-state timing:
  - Ensured container move/expand phase completes before internal clicked-state content reveal.
- Strengthened clicked -> default width return:
  - On collapse, clear inline width/padding/margin before measuring target default width.
  - Collapse now animates back to the live current CSS width/padding of the right container.
- Continued right-panel width exploration:
  - Increased expanded widths multiple times across base + responsive breakpoints to preview larger layouts.
  - Current expanded width rules are significantly larger than earlier 20% reduction pass.
- Scroll behavior:
  - Expanded right panel remains the scroll container (`.is-expanded .editorial-info`).
- Typography tweak retained:
  - Editorial tags are larger and wrapped for readability (`font-size` increased, `flex-wrap: wrap`).
- State correction:
  - During iterative revert/restore requests, final state was restored to the latest requested “current” variant before continuing width tuning.

### 23) Latest validation snapshot

- `npm run lint`: pass
- `npm run test -- --run`: pass
- `npm run build`: pass
- Build still reports Vite/Rollup large chunk warning (`>500kB`).
