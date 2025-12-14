# Portfolio Design System

**Last Updated:** December 13, 2024 (Make Code Live integration, floating tabs)
**Project:** Jonathan Ramesh Portfolio
**Tech Stack:** React + Vite + Three.js + React Three Fiber + GSAP

---

## Table of Contents

1. [Typography](#typography)
2. [Color System](#color-system)
3. [Spacing & Layout](#spacing--layout)
4. [Components](#components)
5. [CSS Variables](#css-variables)
6. [3D Scene Parameters](#3d-scene-parameters)
7. [Effects & Post-Processing](#effects--post-processing)
8. [Responsive Breakpoints](#responsive-breakpoints)

---

## Typography

### Font Families

**Primary Font:** `Pangea Afrikan VAR 2.003` (blocked in some environments; falls back to system)
- Used for: Body text, intro text, navigation
- Weights: 300 (Light), 400 (Regular)
- Fallbacks: `-apple-system, system-ui, sans-serif`

**Display Font:** `Instrument Serif`
- Used for: Logo characters (J, R), decorative elements
- Style: Italic
- Fallbacks: `serif`

**UI Font:** `Inter`
- Used for: Buttons, navigation links, UI elements
- Weights: 400 (Regular), 500 (Medium)
- Fallbacks: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

**System Default:**
```css
font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
```

### Type Scale

| Element | Size | Line Height | Letter Spacing | Weight |
|---------|------|-------------|----------------|--------|
| Intro Text | 30.094px | 29px | -0.9028px | 400 |
| Nav Links | 16.408px | 22.266px | -0.3931px | 500 |
| Logo | 35.011px | normal | -1.4004px | 300/italic |
| Contact Button | 11.72px | 15.904px | -0.2808px | 500 |
| "who is this guy" | 12px | 17.731px | -0.36px | 400 |
| Link Buttons | 9.739px | 11.826px | -0.1046px | 400 |

### Special Typography

**Logo Composition:**
- "J" - Instrument Serif Italic, -3.008cqw letter spacing
- "o" - Pangea Light
- "n" - Pangea Light, 0.3501px letter spacing
- "." - Pangea Light, 2.1007px letter spacing
- "R" - Instrument Serif Italic
- "am" - Pangea Light

---

## Color System

### Primary Colors

**Text Colors:**
```css
--text-primary: #0f172a      /* Body text (dark slate) */
--text-light: #fcfcfc        /* Intro text (off-white) */
--text-nav: #ededed          /* Navigation links (light gray) */
--text-button: #373743       /* Link button text (dark gray) */
```

**Background Colors:**
```css
--bg-primary: #ffffff        /* Canvas background (white) */
--bg-header: rgba(255, 255, 255, 0.3)  /* Header glass effect */
--bg-button: #6f3c59         /* Contact button (mauve/purple) */
--bg-link: #ffffff           /* Link buttons (white) */
```

**Gradient Colors (3D Cube):**
```css
--gradient-a: #000000        /* Black */
--gradient-b: #ffffff        /* White */
--gradient-c: #b7d7ff        /* Light blue */
```

**Fresnel/Glow Colors:**
```css
--fresnel-color: #6dffb1     /* Mint green edge glow */
--emissive-color: #baffdf    /* Light cyan emissive */
```

### Opacity Values

```css
--header-bg-opacity: 0.3
--noise-opacity: 0.10
--design-engineer-opacity: 0.86
```

---

## Spacing & Layout

### CSS Variables

```css
--content-total-width: calc(90vw - [padding × 2]px)  /* Dynamic width */
--canvas-blur: 70px                                   /* Canvas blur amount */
--noise-opacity: 0.10                                 /* Noise texture opacity */
```

### Spacing Scale

**Padding:**
- Horizontal Padding (adjustable): `72px` (default, range: 0-200px)
- Header: `10.939px 24.612px`
- Contact Button: `8.79px 27.347px`
- Link Buttons: `7.652px 21.565px`

**Gaps:**
- Intro Section: `19px` (vertical gap)
- Link Buttons: `13px` (horizontal gap)
- Intro Text → Links: `14px` (vertical gap)
- Nav Links: `43px` (horizontal gap)

**Positioning:**
- Header Top: `20px`
- Intro Section Top: `147px`
- Design Engineer Bottom: `40px`

### Layout Widths

```css
/* Fixed Widths */
--intro-text-width: 572.646px
--header-max-width: 1200px

/* Dynamic Widths */
--design-engineer-width: calc(90vw - [padding × 2]px)
```

---

## Components

### Header

**Structure:** Fixed position glassmorphic navigation bar

**Styling:**
```css
position: fixed;
top: 20px;
left: 50%;
transform: translateX(-50%);
width: calc(100% - 40px);
max-width: 1200px;
padding: 10.939px 24.612px;
background: rgba(255, 255, 255, 0.3);
backdrop-filter: blur(67.342px);
border: 1.367px solid rgba(255, 255, 255, 0.5);
border-radius: 6.837px;
box-shadow:
  0px 5.469px 5.469px 0px rgba(0, 0, 0, 0.25),
  0px 5.469px 28.167px 0px rgba(0, 0, 0, 0.1);
z-index: 1000;
```

**Elements:**
- Navigation Links (left)
- Logo (center, absolute)
- Contact Button (right)

---

### Intro Text Section

**Position:** `absolute, top: 147px`

**Structure:**
- Horizontal decorative line
- "who is this guy" with arrow
- Main intro paragraph
- Link buttons (linkedin, resume, github)

**Intro Text Styling:**
```css
font-size: 30.094px;
line-height: 29px;
letter-spacing: -0.9028px;
width: 572.646px;
color: #fcfcfc;
```

---

### Link Buttons

**Structure:** White pill-shaped buttons with text and arrow icon

**Styling:**
```css
background: white;
padding: 7.652px 21.565px;
border-radius: 13.217px;
gap: 1.391px;
font-size: 9.739px;
color: #373743;
```

**Arrow:** Rotated 90 degrees, size: 16.696px × 16.696px

**Behavior:**
- Opens in new tab (`target="_blank"`)
- Security: `rel="noopener noreferrer"`

---

### Design Engineer SVG

**Position:** `absolute, bottom: 40px, centered`

**Width:** Responsive via CSS variable
```javascript
calc(90vw - introPaddingX × 2)
```

**Effects:**
```css
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
```

**SVG Specs:**
- Natural size: 994px × 163px
- Color: rgba(255, 255, 255, 0.86)
- Typography: Mixed Instrument Serif Italic and Pangea Light

---

### Contact Button

**Styling:**
```css
background: #6f3c59;
padding: 8.79px 27.347px;
border-radius: 39.067px;
box-shadow:
  0px 1.953px 3.907px 0px rgba(0, 0, 0, 0.08),
  0px 0.977px 1.953px 0px rgba(0, 0, 0, 0.04),
  inset 0px 1.953px 6.348px 0px rgba(255, 255, 255, 0.7),
  inset 0px -1.953px 0.977px 0px rgba(0, 0, 0, 0.05);
```

---

### Projects
- File: `src/Projects.jsx` / `Projects.css`
- Behavior: GSAP hover fades on per-card gradients/title/description; stacked layout with rounded top container after the sticky hero.

### Make Code Live Section
- File: `src/MakeCodeLiveSection.jsx` / `src/MakeCodeLiveSection.css`
- Placement: Renders after Projects; transparent background (inherits page backdrop).
- Structure: Divider line; text + portrait hero; lists (Companies, Certifications); CTA with inline arrow path; portrait served from `/make-code-live-portrait.png`.
- Styling: White typography, no text shadows; Instrument Serif for subheads, Inter/system for body/CTA.

## CSS Variables

### Usage

**Dynamic Variables (set via inline styles):**

```javascript
// On .stage element
style={{
  '--content-total-width': `calc(90vw - ${introPaddingX * 2}px)`,
  '--canvas-blur': `${backdropBlur}px`,
  '--noise-opacity': noiseOpacity
}}
```

**Constants:**
```javascript
const CONTENT_WIDTH = 572.646  // Removed (not used anymore)
```

---

## 3D Scene Parameters

### Geometry

```javascript
width: 2.10
height: 1.55
depth: 1.50
radius: 0.50
smoothness: 24
```

### Gradient

```javascript
colorA: '#000000'
colorB: '#ffffff'
colorC: '#b7d7ff'
stopAB: 0.91      // Gradient stop between A and B
stopBC: 0.76      // Gradient stop between B and C
softness: 0.0     // Gradient softness
dirX: 1.4         // Gradient direction X
dirY: 0.2         // Gradient direction Y
dirZ: -0.6        // Gradient direction Z
range: 5.0        // Gradient range
```

### Fresnel (Edge Glow)

```javascript
fresnelColor: '#6dffb1'
fresnelAmount: 2.44
fresnelOffset: 0.29
fresnelIntensity: 5.58
fresnelAlpha: 0.83
fresnelOnly: false
```

### Emissive

```javascript
emissiveColor: '#baffdf'
emissiveStrength: 0.29
```

### Camera

```javascript
pos X: -1.7
pos Y: -0.6
pos Z: -6.5
target X: -0.2
target Y: 0.0
target Z: -0.8
fov: 12           // Telephoto effect (narrow FOV)
minDistance: 7.3
maxDistance: 33.0
enablePan: true
```

### Lighting

```javascript
// Ambient Light
intensity: 0.6

// Directional Light 1
position: [5, 6, 5]
intensity: 0.9

// Directional Light 2
position: [-4, -2, -4]
intensity: 0.25
```

---

## Effects & Post-Processing

### Bloom

```javascript
bloomIntensity: 0.21
bloomThreshold: 1.13
bloomSmoothing: 1.46
bloomRadius: 2.12
```

### Blur (Tilt-Shift)

```javascript
blurEnabled: false
blurStrength: 0.4
blurTaper: 1.0
blurSamples: 10
```

### Grain (Noise)

```javascript
grainEnabled: true
grainOpacity: 1.0
grainBlend: 'SOFT_LIGHT'
```

### Canvas Blur

```javascript
backdropBlur: 70px        // Applied to canvas element
```

### Noise Texture Overlay

```css
background-image: url("data:image/svg+xml,...")  /* SVG noise */
opacity: var(--noise-opacity, 0.10)
```

---

## Responsive Breakpoints

### Media Queries

**768px and below (Tablet):**
```css
- Header padding: 8px 16px
- Nav gap: 20px
- Logo: 24px
- Intro section padding: 0 40px
- Intro content: flex-direction column
- Intro text: 24px font size, 100% width
- Design Engineer: 90% width, max 572.646px
```

**600px and below:**
```css
- Nav gap: 12px
- Nav links: 12px
- Logo: 20px
```

**480px and below (Mobile):**
```css
- Header padding: 6px 12px
- Nav gap: 8px
- Nav links: 10px
- Logo: 16px
- Contact button: 8px font, 4px 10px padding
- Intro section padding: 0 20px
- Intro text: 18px font size
- Design Engineer: bottom 20px
```

---

## Component File Structure

```
src/
├── App.jsx                 # Main app, Leva controls, 3D scene, scrolling hero
├── App.css                 # Sticky hero, stage styles, projects wrapper
├── index.css               # Global styles, root element
├── Header.jsx              # Navigation header
├── Header.css              # Header styles
├── IntroText.jsx           # Intro section with text and links
├── IntroText.css           # Intro text and link button styles
├── DesignEngineer.jsx      # Design Engineer SVG component (desktop + mobile)
├── DesignEngineer.css      # Design Engineer positioning, responsive SVG swap
├── Projects.jsx            # Projects section with 3 project cards (NEW)
├── Projects.css            # Projects styling, GSAP hover effects (NEW)
└── IridescenceMaterial.jsx # Custom shader material
```

**New Dependencies:**
- `motion@^12.23.24` - Scroll-based animations
- `gsap@^3.14.2` - Advanced animations for project card hovers
- `@gsap/react@^2.1.2` - React integration for GSAP

---

## Design Principles

### Visual Hierarchy

1. **Design Engineer** (bottom) - Largest, most prominent
2. **Intro Text** (top right) - Secondary focus
3. **Header** (top) - Tertiary, subtle
4. **3D Gradient Cube** - Background element, heavily blurred

### Spacing Philosophy

- **Consistent gaps:** 13px, 14px, 19px
- **Breathing room:** Large padding values for spaciousness
- **Optical alignment:** Absolute positioning for precise control

### Color Philosophy

- **Minimal palette:** Black, white, blue, purple, green
- **High contrast:** White text on dark gradients
- **Subtle accents:** Fresnel glow adds visual interest
- **Glass morphism:** Semi-transparent header with blur

### Typography Philosophy

- **Tight letter spacing:** Negative values for modern look
- **Mixed fonts:** Serif for accent, sans-serif for body
- **Hierarchy through size:** Clear distinction between elements

---

## Performance Considerations

### Optimization Techniques

- **Memoization:** Color arrays and direction vectors memoized in RoundedCube
- **Conditional rendering:** Effects only render when enabled
- **CSS variables:** Dynamic values without re-rendering
- **Backdrop filter:** Hardware-accelerated blur effects

### Adjustable Parameters

All 3D parameters are live-adjustable via **Leva** debug panel:
- Geometry dimensions
- Gradient colors and direction
- Camera position and FOV
- Effects intensity
- Background blur and texture

---

## Scrolling Hero Effect (NEW)

### Overview
The portfolio now features a sticky hero section that remains fixed at the top of the viewport while the projects section slides up and covers it during scroll. This is a popular effect used by creative technologists.

### Architecture

**HTML Structure:**
```jsx
<div ref={containerRef} className="stage">
  <Header />              {/* Fixed position, z-index: 1000 */}
  <Leva />                {/* Fixed position, library managed */}

  <div className="hero-section">  {/* Sticky, z-index: 0 */}
    <IntroText />         {/* Absolute positioned */}
    <DesignEngineer />    {/* Absolute positioned */}
    <div className="canvas-wrapper">  {/* Absolute, z-index: 1 */}
      <Scene />           {/* Three.js canvas */}
    </div>
  </div>

  <div className="projects-wrapper">  {/* Relative, z-index: 10 */}
    <Projects />
  </div>
</div>
```

**CSS Architecture:**
```css
#root {
  margin: 0;
  /* No height constraint - grows with content */
}

.stage {
  width: 100%;
  position: relative;
  background: #ffffff;
  /* No min-height, no overflow - natural document scroll */
}

.hero-section {
  position: -webkit-sticky; /* Safari support */
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  /* No overflow - allows sticky to work */}

.projects-wrapper {
  position: relative;
  z-index: 10;  /* Higher than hero, so it covers */
  width: 100%;
  min-height: 100vh;
}
```

### How It Works

1. **Natural Document Scroll:** The page grows taller than viewport (hero 100vh + projects ~100vh+), enabling document scroll
2. **Sticky Positioning:** `.hero-section` sticks to `top: 0` as you scroll
3. **Z-Index Layering:** Projects (z-10) slides over hero (z-0) due to higher z-index
4. **White Background:** Projects section has white background that occludes the hero

### Critical Requirements for Sticky to Work

- ✅ Parent container must NOT have `overflow: hidden` or `overflow-y: auto`
- ✅ Parent must NOT have fixed height that constrains growth
- ✅ Sticky element must have `top`, `bottom`, `left`, or `right` specified
- ✅ Content after sticky element must create scroll space

### Z-Index Hierarchy (Final)

From highest to lowest:
1. **Header**: 1000 (fixed, always on top)
2. **Leva Panel**: ~9999 (library managed)
3. **Projects Section**: 10 (slides over hero)
4. **Canvas Noise Overlay**: 10 (inside canvas-wrapper)
5. **Canvas Wrapper**: 1 (Three.js background)
6. **Hero Section**: 0 (sticky container)

---

## Projects Section (NEW)

### Component Structure

**Projects.jsx:**
- 3 project cards: Guardian App, Wander App, Synechron Cube
- GSAP hover animations (gradient overlay, text color changes)
- Responsive grid layout (1 large + 2 small cards)
- Tag pills with custom colors

**Key Features:**
- **Hover Effect:** Gradient overlay fades in (opacity 0→1), title/description change to white
- **Animation:** GSAP with `power2.inOut` easing, 0.5s duration
- **Responsive:** Stacks vertically on mobile (≤768px)

**Project Data Structure:**
```javascript
{
  title: "Project Name",
  description: "Project description...",
  tags: ["Tag 1", "Tag 2"],
  colors: ["bg-color-1", "bg-color-2"],  // Pill colors
  images: ["url1", "url2"]  // Project images
}
```

### Projects Styling

**Main Container:**
```css
.projects-container {
  background: white;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  box-shadow: 0px -4px 7.5px -0.9px rgba(0, 0, 0, 0.07);
  min-height: 100vh;
}
```

**Card Colors:**
- bg-color-1: `#bad7a8` (light green)
- bg-color-2: `#aaa8d7` (light purple)
- bg-color-3: `#d7d6a8` (light yellow)
- bg-color-4: `#d7a8a8` (light red)
- bg-color-5: `#d7a8cc` (light pink)

**Gradient Overlay:**
```css
background: linear-gradient(to bottom, #af4b70, #ffffff);
opacity: 0; /* Hidden by default, shows on hover */
```

---

## Mobile Responsiveness (UPDATED)

### Design Engineer SVG Swap

**Desktop (>768px):** `Design Engineer.svg`
**Mobile (≤768px):** `Design Engineer_Mobile.svg`

**Implementation:**
```jsx
<div className="design-engineer-container">
  <img src={designEngineerSvg} className="design-engineer-svg design-engineer-desktop" />
  <img src={designEngineerMobileSvg} className="design-engineer-svg design-engineer-mobile" />
</div>
```

**CSS:**
```css
.design-engineer-desktop {
  display: block;
}

.design-engineer-mobile {
  display: none;
}

@media (max-width: 768px) {
  .design-engineer-desktop { display: none; }
  .design-engineer-mobile { display: block; }
}
```

### Projects Section Responsive

**Desktop:**
- 1 large horizontal card (Guardian)
- 2 small vertical cards side-by-side (Wander, Synechron)

**Tablet (≤768px):**
- All cards stack vertically
- Cards max-width: 530px

**Mobile (≤480px):**
- Reduced padding and spacing
- Optimized image sizes

---

## Performance Considerations (UPDATED)

### Optimization Techniques

- **Memoization:** Color arrays and direction vectors memoized in RoundedCube
- **GSAP Scoping:** Animations scoped to containerRef to prevent memory leaks
- **Conditional Effects:** Only render enabled post-processing effects
- **CSS Variables:** Dynamic values without re-rendering
- **Backdrop Filter:** Hardware-accelerated blur effects
- **Lazy Loading:** Project images can be lazy loaded (future enhancement)

### Scroll Performance

- Natural document scroll (no JavaScript scroll listeners affecting performance)
- Sticky positioning handled natively by browser
- No scroll event throttling needed
- GPU-accelerated transforms for smooth animations

---

## Future Modifications (UPDATED)

### To Add:

- [x] ~~Projects section~~ ✅ COMPLETED
- [x] ~~Scroll animations~~ ✅ COMPLETED (scrolling hero effect)
- [ ] Actual links for linkedin, resume, github buttons
- [ ] Mobile menu for navigation
- [ ] Additional pages/sections
- [ ] Loading states
- [ ] Fade/scale animations on hero scroll (optional)

### To Refine:

- [ ] Font loading strategy (Pangea Afrikan currently using system fallback)
- [ ] Image optimization (download Figma API images locally)
- [ ] Accessibility (ARIA labels, focus states, keyboard navigation)
- [ ] SEO meta tags
- [ ] Real project content (replace placeholder images/text)
- [ ] Project detail pages/modals

---

## Implementation Notes (UPDATED)

### Scrolling Hero Effect

**Key Learnings:**
- Sticky positioning requires parent to NOT have `overflow: hidden` or constrained height
- Natural document scroll is more performant than internal scroll containers
- Removing `min-height` constraints from container allows natural growth
- Safari requires `-webkit-sticky` prefix

**Debug Process:**
- Console logs revealed page was scrollable but hero wasn't sticking
- Issue was `overflow: hidden` on `.hero-section` preventing sticky behavior
- Removing height constraints from `#root` and `.stage` allowed natural scroll

### Projects Section

**GSAP Integration:**
- Used `useGSAP` hook for React integration
- Scoped animations to `containerRef` for cleanup
- Dependencies array `[hoveredIndex]` ensures animations run on hover state change
- Class-based targeting (`.project-gradient-0`, etc.) for specific card animations

### Mobile SVG Swap

**Approach:**
- Render both SVGs, hide one with CSS
- Media query at 768px breakpoint
- No JavaScript required - pure CSS solution
- Both images load but only one displays (could optimize with lazy loading)

---

## Notes (UPDATED)

- **Design Engineer width:** Dynamically calculated as `90vw - (padding × 2)`
- **Intro text width:** Fixed at 572.646px
- **Viewport-based sizing:** Ensures responsive behavior across all screen sizes
- **Scrolling hero effect:** Popular creative technologist effect now implemented
- **Natural document scroll:** More performant than overflow scroll containers
- **Debug logging:** Available in console for troubleshooting (can be removed for production)
- **Font fallback:** Using system fonts instead of Pangea Afrikan (font not loaded)
- **Figma images:** IntroText uses Figma API URLs (should be downloaded for production)

---

**End of Design System Documentation**
