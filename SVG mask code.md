# SVG mask code

This file documents the current SVG mask implementation used to create the "cutout to hero" effect in the Projects section.

## Overview
- The Projects section renders an SVG `<mask>` that starts as a full white fill.
- Each project card has its own `<rect>` inside the mask that becomes black on hover (cutout).
- The card mask rect is updated on hover and during the expand animation so it stays aligned.
- The moving category highlight (if present) can be used as a separate mask rect.

## Key JSX (Projects mask layer)
Location: `src/Projects.jsx`

```jsx
<div className="projects-mask-layer" aria-hidden="true">
  <svg className="projects-mask-svg">
    <defs>
      <mask id="projects-hole-mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
        <rect width="100%" height="100%" fill="#ffffff" />

        {/* Moving highlight cutout (if used) */}
        <rect
          ref={highlightRectRef}
          x="0"
          y="0"
          width="0"
          height="0"
          rx="12"
          ry="12"
          fill="#000000"
        />

        {/* One cutout rect per card */}
        {filteredProjects.map((project, index) => (
          <rect
            key={project.id}
            ref={(node) => {
              if (node) cardHoleRefs.current[index] = node
            }}
            x="0"
            y="0"
            width="0"
            height="0"
            rx="0"
            ry="0"
            fill="#000000"
          />
        ))}
      </mask>
    </defs>
    <rect
      className="projects-mask-fill"
      width="100%"
      height="100%"
      mask="url(#projects-hole-mask)"
    />
  </svg>
</div>
```

## Card mask updates (hover + resize)
Location: `src/Projects.jsx`

```jsx
const setCardHoleFromElement = useCallback((index, element, immediate = false) => {
  if (!maskRef.current || !element) return
  const holeRect = cardHoleRefs.current[index]
  if (!holeRect) return

  const containerRect = maskRef.current.getBoundingClientRect()
  const rect = element.getBoundingClientRect()
  const x = rect.left - containerRect.left
  const y = rect.top - containerRect.top

  const nextAttrs = {
    x,
    y,
    width: rect.width,
    height: rect.height,
    rx: 0,
    ry: 0,
  }

  if (prefersReducedMotion || immediate) {
    holeRect.setAttribute('x', `${x}`)
    holeRect.setAttribute('y', `${y}`)
    holeRect.setAttribute('width', `${rect.width}`)
    holeRect.setAttribute('height', `${rect.height}`)
    holeRect.setAttribute('rx', '0')
    holeRect.setAttribute('ry', '0')
  } else {
    cardHoleTweensRef.current[index]?.kill()
    cardHoleTweensRef.current[index] = gsap.to(holeRect, {
      duration: 0.22,
      ease: 'power2.out',
      attr: nextAttrs,
    })
  }

  cardHoleTargetsRef.current.set(index, element)
}, [prefersReducedMotion])
```

```jsx
const clearCardHole = useCallback((index) => {
  const holeRect = cardHoleRefs.current[index]
  if (!holeRect) return

  if (prefersReducedMotion) {
    holeRect.setAttribute('width', '0')
    holeRect.setAttribute('height', '0')
  } else {
    cardHoleTweensRef.current[index]?.kill()
    cardHoleTweensRef.current[index] = gsap.to(holeRect, {
      duration: 0.2,
      ease: 'power2.inOut',
      attr: { width: 0, height: 0 },
    })
  }

  cardHoleTargetsRef.current.delete(index)
}, [prefersReducedMotion])
```

```jsx
useEffect(() => {
  const handlePositionUpdate = () => {
    cardHoleTargetsRef.current.forEach((element, index) => {
      setCardHoleFromElement(index, element, true)
    })
  }
  window.addEventListener('scroll', handlePositionUpdate, { passive: true })
  window.addEventListener('resize', handlePositionUpdate)
  return () => {
    window.removeEventListener('scroll', handlePositionUpdate)
    window.removeEventListener('resize', handlePositionUpdate)
  }
}, [setCardHoleFromElement])
```

## Card hover hook
Location: `src/Projects.jsx`

```jsx
gsap.to(containerRef.current, {
  height: EXPANDED_HEIGHT,
  duration: 0.3,
  ease: 'power2.out',
  overwrite: true,
  onUpdate: () => {
    if (containerRef.current) onHoleEnter?.(index, containerRef.current, true)
  },
})

if (containerRef.current) {
  onHoleEnter?.(index, containerRef.current, false)
}
```

## CSS (mask layer)
Location: `src/Projects.css`

```css
.projects-mask-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.projects-mask-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.projects-mask-fill {
  fill: #ffffff;
}
```
