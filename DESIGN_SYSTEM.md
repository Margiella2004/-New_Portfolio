# GradCube Design System

## Project Overview

**GradCube** is a portfolio website for Jonathan Ramesh, an interdisciplinary designer focusing on UX Design and Engineering. The project combines React, Three.js, and GSAP to create an immersive, animated experience showcasing design work.

### Tech Stack
- **Framework:** React 19.2.0 with Vite
- **3D Graphics:** Three.js, React Three Fiber, React Three Drei
- **Animation:** GSAP with ScrollTrigger, Motion library
- **Routing:** React Router DOM
- **Styling:** CSS Modules (component-scoped)
- **Build Tool:** Vite

---

## Typography

### Font Families

#### Primary Font: Pangea Afrikan VAR 2.003
Variable font with multiple axes for fine-tuned control:
- **Axes:** `ital`, `XTDR`, `APRT`, `SPAC`, `INKT`, `SS01`, `SS02`, `SS03`
- **Weights:** 300 (light), 400 (regular), 500 (medium), 700 (bold)
- **Usage:** Body text, navigation, buttons, most UI elements

#### Accent Font: Instrument Serif
- **Style:** Primarily italic
- **Usage:** Large display text, project titles, logo characters (J, R)
- **Context:** Used for emphasis and visual hierarchy

#### System Fallbacks
```css
font-family: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
```

### Type Scale

| Element | Font | Size | Weight | Letter Spacing | Line Height |
|---------|------|------|--------|----------------|-------------|
| Hero Title (Projects) | Instrument Serif | 176.154px | italic | -3.5231px | 0.9 |
| Hero Subtitle | Pangea Afrikan | 150.318px | 300 | -7.5159px | 0.9 |
| Large Display | Instrument Serif | 138.709px | italic | -9.7096px | - |
| Section Title | Pangea Afrikan | 34.422px | 300 | -1.0327px | 41.307px |
| Project Title | Instrument Serif | 72px | italic | -2px | 1 |
| Body Text | Pangea Afrikan | 20px | 300 | -0.5px | 1.4 |
| Navigation | Pangea Afrikan | 16.408px | 500 | -0.3931px | 22.266px |
| Button Text | Pangea Afrikan | 11-12px | 400-500 | -0.28px | 15.904px |
| Small Label | Pangea Afrikan | 10.725px | 700 | 0.9653px | - |

---

## Color System

### Primary Palette

```css
/* Backgrounds */
--bg-primary: #ffffff;
--bg-dark: #242424;
--bg-glass: rgba(32, 32, 36, 0.8);
--bg-brand: #6f3c59;

/* Text Colors */
--text-primary: #0f172a;
--text-secondary: #363636;
--text-tertiary: #3c3c3c;
--text-muted: #7c7b7b;
--text-light: #a58698;
--text-white: #ffffff;
--text-off-white: #ededed;

/* Brand/Accent */
--accent-primary: #6f3d59;
--accent-hover: #5a3148;

/* Borders */
--border-light: rgba(255, 255, 255, 0.5);
--border-medium: #868686;
--border-white: #fffafa;

/* Gradients (3D Cube) */
--gradient-a: #000000;
--gradient-b: #ffffff;
--gradient-c: #b7d7ff;
--fresnel-color: #6dffb1;
--emissive-color: #baffdf;
```

### Semantic Colors

| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary Action | Brand Purple | #6f3c59 | Buttons, active states, indicators |
| Hover State | Dark Purple | #5a3148 | Interactive element hover |
| Inactive/Muted | Gray | #7c7b7b | Inactive nav, secondary text |
| Active Link | White | #ffffff | Active navigation items |
| Description | Muted Pink | #a58698 | Secondary descriptions |

---

## Layout System

### Container Widths

```css
:root {
  --page-width: 94vw;
  --page-max-width: 1520px;
  --content-total-width: calc(90vw - [padding]px);
}
```

### Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 480px) { }

/* Small Tablet */
@media (max-width: 600px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Desktop */
@media (max-width: 1024px) { }
```

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| xs | 6-10px | Small gaps, inner padding |
| sm | 15-24px | Component spacing |
| md | 34-50px | Section padding |
| lg | 65-100px | Large section padding |
| xl | 156-330px | Major section spacing |

### Grid Systems

**Projects Intro:**
- Full viewport width sections
- Flex column layout with gaps

**Projects Content:**
- Flex layout with 100px gap
- Left navigation (303.426px max)
- Right preview (900px max)

**Content Modules (Flexible Layouts):**
1. **Stacked:** Text top, image bottom
2. **Split Left:** Image left, text right
3. **Split Right:** Text left, image right
4. **Grid 2:** Text top, 2 images side-by-side
5. **Bento Up Left:** Large image top, text left + image right bottom
6. **Bento Up Right:** Large image top, image left + text right bottom

---

## Component Library

### Header Component
**Location:** `src/Header.jsx`

**Features:**
- Fixed positioning at top
- Glassmorphic background (backdrop-filter blur)
- Centered logo with navigation on sides
- Active state indicator
- Responsive mobile menu

**Styling:**
```css
background: rgba(32, 32, 36, 0.8);
backdrop-filter: blur(67.342px);
border: 1.367px solid rgba(255, 255, 255, 0.5);
border-radius: 6.837px;
box-shadow: 0px 5.469px 5.469px rgba(0, 0, 0, 0.25);
```

### Projects Timeline
**Location:** `src/Projects.jsx`

**Features:**
- Vertical timeline with animated indicator
- Auto-scroll through projects (stops on user interaction)
- Image preview with slide animation
- Tag system with border style
- "view work" CTA button

**Pattern:**
- Timeline: 4px width indicator, 1px line
- Item gap: 10px vertical
- Number + Title layout with baseline alignment

### Content Module
**Location:** `src/components/ContentModule.jsx`

**Props:**
- `title`: Section heading
- `description`: Body text
- `images`: Array of image/video sources
- `layout`: Layout variant (stacked, split-left, split-right, grid-2, bento-up-left, bento-up-right)
- `hideTopImage`: Boolean to hide top image in bento layouts
- `hideText`: Boolean to hide text content
- `bentoTextAlign`: Text alignment for bento layouts

**Media Handling:**
- Automatically detects video files (.mp4, .mov, .webm)
- Renders `<video>` with autoplay, muted, loop, playsInline
- Fallback to `<img>` for images

### Stacked Reveal Section
**Location:** `src/components/StackedRevealSection.jsx`

**Purpose:**
- Single pinned "reveal from underneath" section (used for Other Projects on detail pages)
- Creates a slow vertical reveal without opacity fades

**Props:**
- `className`: Additional classes for the stage wrapper
- `innerClassName`: Additional classes for the inner wrapper
- `revealOffsetFactor`: Initial Y offset relative to stage height (default `0.6`)
- `revealDistanceFactor`: Scroll distance multiplier for the reveal (default `1.15`)
- `pinSpacing`: Controls layout spacing during pin (default `true`)

**Usage Notes:**
- Stage is `height: 100vh` and pinned with ScrollTrigger
- Inner content animates `y` from offset to `0` using scrub
- Pair with z-index + negative margin stacking for "underlay" reveals

### Footer
**Location:** `src/Footer.jsx`

**Structure:**
- Social links row (right-aligned)
- Email section (full-width divider)
- Projects list (numbered)
- Wordmark + copyright

**Background:** `#6f3c59` (brand purple)

---

## Animation System

### GSAP Configuration

**Plugins Used:**
- ScrollTrigger
- ScrollToPlugin

**Common Easing Curves:**
```javascript
ease: 'power2.out'    // Smooth deceleration
ease: 'power2.inOut'  // Balanced
ease: 'power3.out'    // Sharper deceleration
ease: 'expo.out'      // Very smooth, long tail
ease: 'none'          // Linear (for scrub)
```

### Scroll Animations

**Hero Intro Sequence:**
1. Canvas fade in (0.9s delay, 1.2s duration)
2. Delay (5.3s)
3. Text fade out (0.8s)
4. FOV zoom (5s expo.out)
5. Blur decrease (3s expo.in)
6. Bloom threshold adjust (5s power2.inOut)
7. Header/content fade in (0.8s)

**Session Storage:**
- `hasPlayedIntro` - Skips intro on subsequent visits
- Can be forced with `?intro=true` URL parameter

**Projects Slide:**
```javascript
ScrollTrigger.create({
  trigger: projectsRef.current,
  start: 'top top',
  end: '+=600',
  scrub: true,
  pin: true,
  pinSpacing: true
})
```

**Stacked Reveal (Other Projects):**
- Uses `StackedRevealSection` with a pinned stage and scrubbed `y` animation
- Common pattern for "reveal under previous section":
  - Stage pinned (`height: 100vh`)
  - Inner translated down by `revealOffsetFactor`
  - Wrapper stacked using `margin-top: -100vh` + z-index

**FOV Camera Animation:**
- Increases by 5 when scrolling from hero to projects
- Decreases by 5 when scrolling to about section
- Controlled via state: `scrollFov`

### Mouse Tracking (Hero Section)

**Dynamic Bloom Effects:**
- Tracks mouse position (normalized 0-1)
- Smoothed with lerp (0.08 factor)
- Affects bloom intensity, threshold, smoothing, radius
- Affects fresnel offset and gradient softness

**Implementation:**
- RequestAnimationFrame loop
- Separated target/current refs for smooth interpolation
- Only active when `introComplete && activeSection === 'home'`

---

## 3D Canvas System

### Three.js Scene
**Location:** `src/App.jsx` (Scene component)

**Components:**
1. **RoundedCube:** Custom geometry with iridescent material
2. **CameraRig:** Dynamic FOV and position control
3. **ControlsRig:** OrbitControls with constraints
4. **EffectComposer:** Post-processing effects

### Post-Processing Effects

**Bloom:**
- Intensity: 0.21 (base) + mouse interaction
- Threshold: 0.94 (base)
- Smoothing: 1.46
- Radius: 2.12

**Noise/Grain:**
- Opacity: 1.0
- Blend mode: SOFT_LIGHT
- Applied as SVG texture overlay

**Blur:**
- Backdrop filter: 130px (default)
- Animated during intro sequence

### Iridescent Material
**Location:** `src/IridescenceMaterial.jsx`

**Features:**
- Tri-color gradient system (colorA, colorB, colorC)
- Directional gradient control (dirX, dirY, dirZ)
- Fresnel rim lighting
- Emissive glow
- Custom shader material

**Key Parameters:**
- `stopAB`: 0.91 (gradient stop)
- `stopBC`: 0.76 (gradient stop)
- `fresnelAmount`: 2.44
- `fresnelIntensity`: 5.58

---

## Border Radius System

```css
/* Tokens */
--radius-xs: 6.837px;
--radius-sm: 12-16px;
--radius-md: 26px;
--radius-lg: 34-39.067px;
--radius-pill: 999px;

/* Usage */
.header { border-radius: var(--radius-xs); }
.button { border-radius: 39.067px; }
.project-image { border-radius: 26px; }
.polaroid { border-radius: 34px; }
.project-tag { border-radius: 14px; }
```

---

## Glassmorphism Style

**Pattern:**
```css
background: rgba(32, 32, 36, 0.8);
backdrop-filter: blur(67.342px);
-webkit-backdrop-filter: blur(67.342px);
border: 1.367px solid rgba(255, 255, 255, 0.5);
```

**Usage:**
- Header navigation
- Mobile menu overlay
- Floating UI elements

---

## Image Assets

### Organization
```
/img_assets/
  - Frame [number].png      # Design mockups
  - IMG_[number].png        # Photos/screenshots
```

### Loading Strategy
- Static imports in detail pages
- Lazy loading not implemented
- Videos: autoplay, muted, loop, playsInline

---

## Navigation Pattern

### Smooth Scroll
```javascript
gsap.to(window, {
  duration: 0.8,
  ease: 'power2.out',
  scrollTo: { y: target, offsetY: 0 }
})
```

### Active Section Detection
- ScrollTrigger tracking
- State: `activeSection` ('home', 'projects', 'about', 'contact')
- Updates nav styling and mouse tracking behavior

### Routing
- Home: `/`
- Project Details: `/project/:id`
  - synechron-cube
  - guardian-app
  - wander-app

---

## Button Styles

### Primary Button (CTA)
```css
background: #6f3d59;
border-radius: 39.067px;
padding: 8.79px 27.347px;
color: #ededed;
font-size: 11.72px;
font-weight: 500;

/* Shadows */
box-shadow:
  0px 1.953px 3.907px rgba(0, 0, 0, 0.08),
  0px 0.977px 1.953px rgba(0, 0, 0, 0.04),
  inset 0px 1.953px 6.348px rgba(255, 255, 255, 0.7),
  inset 0px -1.953px 0.977px rgba(0, 0, 0, 0.05);

/* Hover */
transform: translateY(-1px);
opacity: 0.9;
```

### Secondary Button (Project View)
```css
background: #6f3d59;
border-radius: 16px;
width: 130px;
height: 50px;
color: #ffffff;
font-size: 11px;

/* Hover */
background: #5a3148;
```

---

## Accessibility Features

### ARIA Labels
- Menu buttons: `aria-label="Menu"`
- Interactive elements have descriptive labels
- Project buttons: `aria-pressed` state

### Keyboard Navigation
- Focus visible styles: `outline: 2px solid #6f3d59; outline-offset: 4px;`
- Semantic HTML elements (header, nav, section, button)

### Screen Readers
- `aria-hidden="true"` on decorative elements
- Alt text on images
- Descriptive link text

---

## Performance Optimizations

### Animation Performance
- `will-change: transform` on animated elements
- RequestAnimationFrame for smooth interpolation
- GSAP's optimized rendering

### Three.js Optimizations
- Geometry caching with useMemo
- Selective rendering updates
- Disabled canvas pointer events when not visible

### Session Management
- Intro animation cached via sessionStorage
- Prevents redundant heavy animations
- URL parameter override: `?intro=true`

---

## File Structure

```
src/
├── App.jsx                       # Main app, 3D scene, scroll logic
├── App.css                       # App-level styles
├── index.css                     # Global styles, CSS variables
├── main.jsx                      # React entry point
├── Header.jsx/css                # Navigation header
├── Footer.jsx/css                # Footer component
├── Projects.jsx/css              # Projects section
├── IntroText.jsx/css             # Hero intro text
├── DesignEngineer.jsx/css        # Design engineer section
├── MakeCodeLiveSection.jsx/css   # About section
├── HeroTextOverlay.jsx/css       # Hero overlay text
├── FloatingTabs.jsx/css          # Floating UI (commented out)
├── IridescenceMaterial.jsx       # Custom Three.js shader
├── footerData.js                 # Footer content data
├── components/
│   ├── ContentModule.jsx/css     # Flexible layout component
│   ├── ProjectCard.jsx/css       # Project card component
│   ├── ProjectDetailHeader.jsx   # Detail page header
│   ├── ProjectDetailTemplate.jsx # Template for project pages
│   ├── NumberGrid.jsx/css        # Number grid component
│   ├── StackedRevealSection.jsx  # Pinned stacked reveal wrapper
│   ├── StackedRevealSection.css  # Stacked reveal styles
│   └── SynechronTimeline.jsx/css # Timeline component
├── pages/
│   ├── GuardianAppDetail.jsx/css
│   ├── WanderAppDetail.jsx
│   └── SynechronCubeDetail.jsx/css
└── img_assets/                   # Images and videos
```

---

## Development Guidelines

### Code Style
- **Components:** Functional components with hooks
- **State:** useState for local, refs for animation targets
- **Effects:** useEffect for side effects, useLayoutEffect for DOM measurements
- **Memoization:** useMemo for expensive calculations

### Naming Conventions
- **Components:** PascalCase (e.g., `ProjectCard`)
- **CSS Classes:** kebab-case with BEM-like structure (e.g., `project-card__title`)
- **Variables:** camelCase
- **Constants:** UPPER_SNAKE_CASE or camelCase for configs

### CSS Organization
- Component-specific styles in separate .css files
- Global variables in `index.css`
- Inline styles for dynamic/computed values
- Avoid !important

### Animation Best Practices
1. Use GSAP for complex timelines
2. RequestAnimationFrame for continuous updates
3. Cleanup animations in useEffect returns
4. Kill tweens before creating new ones
5. Use refs for DOM targets, not state

---

## Browser Support

### Target Browsers
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox
- WebGL for Three.js
- Backdrop filter support (with fallbacks)

### Polyfills
- None explicitly included
- Vite handles module transpilation

---

## Future Considerations

### Potential Improvements
1. **Performance:**
   - Lazy load images/videos
   - Code splitting by route
   - Reduce initial bundle size

2. **Accessibility:**
   - Reduced motion preferences
   - Better focus management
   - Enhanced screen reader support

3. **Features:**
   - Dark mode toggle
   - More project detail pages
   - Blog section
   - Case study templates

4. **SEO:**
   - Meta tags
   - Open Graph tags
   - Structured data

---

## Credits

**Design & Development:** Jonathan Ramesh
**Framework:** React + Vite
**Animation:** GSAP
**3D Graphics:** Three.js
**Fonts:** Pangea Afrikan VAR, Instrument Serif

---

*Last Updated: December 2025*
