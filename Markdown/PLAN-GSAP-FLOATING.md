# Plan: Integrate GSAP Floating Tabs with Design Engineer

## Goal
Embed the GSAP-driven floating tab cluster (from the floating-cursor prototype) into the main hero, overlaying it near the `Design Engineer` SVG, and expose motion controls via Leva.

## Key Current Snippets
- Main layout / Leva host (`src/App.jsx`)
  ```jsx
  return (
    <div className="stage" style={{ '--content-total-width': widthFormula }}>
      <Header />
      <IntroText paddingX={controls.introPaddingX} />
      <DesignEngineer />
      <Leva collapsed={false} />
      <div className="canvas-wrapper" style={{ '--canvas-blur': `${controls.backdropBlur}px`, '--noise-opacity': controls.noiseOpacity }}>
        <Scene ... />
      </div>
    </div>
  )
  ```

- Design Engineer positioning (`src/DesignEngineer.css`)
  ```css
  .design-engineer-container {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: var(--content-total-width);
    z-index: 50;
  }
  ```

- GSAP float pattern (from floating prototype)
  ```tsx
  gsap.set(contentRef.current, { opacity: 0, scale: 0.8 });
  gsap.to(contentRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", delay });
  const floatY = gsap.to(contentRef.current, { y: -8, duration: 8, ease: "sine.inOut", repeat: -1, yoyo: true, delay });
  const floatX = gsap.to(contentRef.current, { x: 4, duration: 9, ease: "sine.inOut", repeat: -1, yoyo: true, delay: delay + 0.5 });
  const draggable = Draggable.create(contentRef.current, {
    type: "x,y",
    inertia: false,
    onPress() { node.style.cursor = "grabbing"; node.style.zIndex = "50"; },
    onRelease() { node.style.cursor = "grab"; node.style.zIndex = ""; },
  });
  ```

- Arrow oscillation
  ```tsx
  const tl = gsap.timeline({ repeat: -1, defaults: { ease: "sine.inOut" }, delay });
  tl.to(arrowRef.current, { rotation: rotation + 3, x: 2.5, y: -2.5, duration: 2.25 })
    .to(arrowRef.current, { rotation: rotation - 3, x: -2.5, y: 2.5, duration: 2.25 })
    .to(arrowRef.current, { rotation, x: 0, y: 0, duration: 2 });
  ```

## Steps to Implement
1) Add GSAP  
   - Install `gsap`; register `Draggable` inside the floating component.  
   - Remove Framer Motion usage in the main app (not needed).

2) Create a `FloatingTabs` component  
   - Copy tab/arrow JSX and `svgPaths` from the prototype into `src/FloatingTabs.jsx` (or similar).  
   - Keep GSAP `useEffect` blocks for bobbing, arrow wiggle, hover/drag scaling, cursor state.  
   - Use inline SVG paths (no external images) for arrows.

3) Overlay near Design Engineer  
   - Render `FloatingTabs` inside `DesignEngineer` or as a sibling in `App.jsx`, absolutely positioned over the same container.  
   - Wrapper: `pointer-events: none`; each draggable item: `pointer-events: auto`.  
   - Use percentage offsets (e.g., `left/right/bottom` with `md:` variants) to stay responsive.

4) Expose controls via Leva  
   - Add a Leva folder (e.g., `"Floating Tabs"`) in `App.jsx`.  
   - Controls to add: `floatAmpX`, `floatAmpY`, `floatSpeedX`, `floatSpeedY`, `hoverScale`, `dragScale`, `arrowWiggle`, `arrowDelayOffset`, `enabled`.  
   - Pass these props to `FloatingTabs` and feed them into GSAP durations/amounts/rotation deltas.

5) Serve assets correctly  
   - Keep `Design Engineer.svg` in `public/` (or adjust import) so Vite serves it.  
   - No background images needed for the floating cluster—just the tabs/arrows.

6) Test and tune  
   - Run dev server; verify drag/hover and Leva controls adjust motion live.  
   - Check small viewports to avoid overlap with header/intro; if needed, add Draggable bounds to prevent dragging off-screen.  
   - Keep animations light (sine in/out, yoyo) and add `will-change: transform` for smoothness.

## Leva → GSAP Mapping
- `floatAmpX/Y` → `gsap.to(... { x: floatAmpX, y: floatAmpY })`
- `floatSpeedX/Y` → `duration` values for X/Y timelines.
- `hoverScale` / `dragScale` → `gsap.to` on pointer enter/press.
- `arrowWiggle` → rotation delta in the arrow timeline.
- `enabled` → conditionally render `FloatingTabs`.

## Notes / Safeguards
- Consider Draggable `bounds` or `edgeResistance` if you do not want tabs lost off-screen.
- Maintain `pointer-events: none` on the overlay container so only tabs are interactive.
- Keep performance-friendly easing (`sine.inOut`) and modest amplitudes.
