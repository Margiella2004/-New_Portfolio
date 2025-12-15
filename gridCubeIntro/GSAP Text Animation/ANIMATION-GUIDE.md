# Grid Cube Intro Animation - Implementation Guide

## Overview

This intro animation creates a cinematic experience combining 3D graphics with text animation. It transitions from a zoomed-out view to a close-up view of an iridescent cube while displaying animated text that evolves from "Design is to be Present/Past/Future" to "Design a Time Traveler".

## Animation Breakdown

### Timeline (Total: ~15 seconds)

```
0s ──────── 0.9s ──────── 2.1s ──────── 7s ──────── 8.5s ──────── 13.5s
│           │            │              │           │            │
│           │            │              │           │            │
Start    Canvas      Canvas         Text        Text         Zoom
         fade        fully        animation    fade         complete
         begins      visible      complete     complete
```

### Phase Breakdown

#### Phase 1: Initial State (0s)
**Canvas State:**
- Opacity: 0 (invisible)
- FOV: 111 (wide angle, zoomed out)
- Backdrop blur: 8px (minimal)
- Bloom threshold: 1.13

**Text State:**
- Opacity: 1 (visible)
- "Design" text ready to appear

---

#### Phase 2: Canvas Fade-In (0.9s - 2.1s, duration: 1.2s)
**What happens:**
- Canvas fades from opacity 0 → 1
- Easing: `power2.out`
- Starts 0.9 seconds after page load
- Text "Design" appears and begins sliding animation

**Why the delay:**
The 0.9s delay ensures the text animation starts first, then the 3D scene fades in as the text begins its sliding motion, creating a layered reveal effect.

---

#### Phase 3: Text Animation (0s - 7s)
**Sequence:**
1. "Design" appears (fade in)
2. Text slides left, revealing "is to be"
3. Center words flip: "Present" → "Past" → "Future"
4. Final transformation to "Design a Time Traveler"

**Timing:**
- Total duration: ~7 seconds
- Each word flip: ~0.6s with 0.8s hold time
- Final transition: 0.8s

**Typography:**
- Font: "Instrument Serif"
- Size: 28px
- Left text: Black (#000000)
- Center text: Gray (#6b7280 → #d8d7d7)
- Italics: Present, Past, Future, Time Traveler

---

#### Phase 4: Text Hold & Fade Out (7s - 8.5s)
**What happens:**
1. Text holds at "Design a Time Traveler" (1.5s)
2. Text fades out (0.8s, ease: `power2.inOut`)

**Purpose:**
Gives viewers time to read the final message before transitioning to the 3D focus.

---

#### Phase 5: Zoom & Blur Animation (8.5s - 13.5s, duration: 5s)

**FOV Animation (5 seconds):**
- Start: FOV 111 (zoomed out)
- End: FOV 10 (zoomed in/telephoto)
- Easing: `expo.out` (starts fast, dramatic slow-down)
- Effect: Creates smooth zoom-in with exponential deceleration

**Blur Animation (3 seconds, ends at 11.5s):**
- Start: 8px backdrop blur
- End: 130px backdrop blur
- Duration: 3 seconds (stops 2s before zoom completes)
- Easing: `expo.in` (slow start, accelerates)
- Effect: Blur builds gradually then rapidly increases

**Bloom Animation (5 seconds):**
- Start: threshold 1.13 (less bloom)
- End: threshold 0.94 (more bloom/glow)
- Easing: `power2.inOut`
- Effect: Gradual increase in glow/brightness

**Why blur ends early:**
The blur completes at the 3-second mark, leaving the final 2 seconds of zoom with clear, sharp visuals. This creates a "reveal" moment as the blur settles and the cube comes into focus.

---

## Technical Implementation

### File Structure
```
src/
├── app/
│   ├── App.tsx                          # Main app component
│   └── gridcube/
│       ├── GridCubeIntro.tsx           # Main 3D scene + animation orchestration
│       ├── HeroTextOverlay.tsx         # Text animation component
│       ├── IridescenceMaterial.tsx     # Custom shader material
│       └── ...
└── styles/
    └── grid-cube-intro.css             # Styling for canvas wrapper
```

### Key Components

#### 1. GridCubeIntro.tsx
**Purpose:** Orchestrates the entire intro animation

**Key Features:**
- Manages animated state (FOV, blur, opacity)
- Creates master GSAP timeline
- Renders 3D scene with Three.js/React Three Fiber
- Applies post-processing effects (Bloom, Noise)

**Animation State:**
```typescript
const [animatedFov, setAnimatedFov] = useState(111)
const [animatedBlur, setAnimatedBlur] = useState(8)
const [animatedBloomThreshold, setAnimatedBloomThreshold] = useState(1.13)
const [canvasOpacity, setCanvasOpacity] = useState(0)
const [textOpacity, setTextOpacity] = useState(1)
```

**Master Timeline:**
```typescript
useGSAP(() => {
  const tl = gsap.timeline({ paused: false })

  // Phase 1: Canvas fade-in (0.9s delay + 1.2s fade)
  tl.to({}, { duration: 0.9 }, 0)
    .to({}, {
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: function () {
        setCanvasOpacity(this.progress())
      }
    }, 0.9)

  // Phase 2: Wait for text animation (~5.3s)
  tl.to({}, { duration: 5.3 }, '>')

  // Phase 2.5: Text hold (1.5s)
  tl.to({}, { duration: 1.5 }, '>')

  // Phase 3: Text fade out (0.8s)
  tl.to({}, {
      duration: 0.8,
      ease: 'power2.inOut',
      onUpdate: function () {
        setTextOpacity(1 - this.progress())
      }
    }, '>')

  // Phase 4: Zoom animations
  const animState = { fov: 111, blur: 8, bloomThreshold: 1.13 }

  // FOV (5s)
  tl.to(animState, {
      fov: 10,
      duration: 5,
      ease: 'expo.out',
      onUpdate: () => setAnimatedFov(animState.fov)
    }, '>')

  // Blur (3s)
  tl.to(animState, {
      blur: 130,
      duration: 3,
      ease: 'expo.in',
      onUpdate: () => setAnimatedBlur(animState.blur)
    }, '<')

  // Bloom (5s)
  tl.to(animState, {
      bloomThreshold: 0.94,
      duration: 5,
      ease: 'power2.inOut',
      onUpdate: () => setAnimatedBloomThreshold(animState.bloomThreshold)
    }, '<')
}, { scope: containerRef })
```

---

#### 2. HeroTextOverlay.tsx
**Purpose:** Handles the text animation sequence

**Key Features:**
- GSAP timeline for text transformations
- Word-by-word reveal and flip animations
- Controlled by parent via opacity state

**Animation Technique:**
- Uses `yPercent` for slide-in/slide-out effects
- Stagger timing for natural word transitions
- Absolute positioning for overlapping animations

---

## How to Implement

### Step 1: Install Dependencies
```bash
npm install gsap @gsap/react three @react-three/fiber @react-three/drei @react-three/postprocessing
```

### Step 2: Basic Setup
```tsx
import GridCubeIntro from './app/gridcube/GridCubeIntro'
import HeroTextOverlay from './app/gridcube/HeroTextOverlay'

function App() {
  return (
    <div className="w-full h-screen bg-[#fbfbfa] overflow-hidden">
      <GridCubeIntro showLeva={false}>
        <HeroTextOverlay />
      </GridCubeIntro>
    </div>
  )
}
```

### Step 3: Customization

#### Adjust Animation Timing
In `GridCubeIntro.tsx`, modify durations:
```typescript
// Canvas fade delay
tl.to({}, { duration: 0.9 }, 0)  // Change 0.9 to adjust delay

// Text hold time
tl.to({}, { duration: 1.5 }, '>') // Change 1.5 for longer/shorter hold

// Zoom duration
duration: 5  // Change to speed up/slow down zoom
```

#### Change Visual Settings
```typescript
// Initial state (zoomed out)
const [animatedFov, setAnimatedFov] = useState(111)  // Higher = more zoomed out
const [animatedBlur, setAnimatedBlur] = useState(8)  // Starting blur amount

// Final state (zoomed in)
fov: 10        // Lower = more zoomed in
blur: 130      // Final blur amount
```

#### Modify Easing Curves
```typescript
// Available easing options:
ease: 'power2.out'   // Gentle slow-down
ease: 'power4.out'   // Stronger slow-down
ease: 'expo.out'     // Exponential slow-down (current)
ease: 'expo.in'      // Exponential acceleration
ease: 'power2.inOut' // Ease in and out
```

---

## Customization Guide

### Mobile vs Desktop
Save different states for responsive design:

**Mobile (less dramatic):**
```typescript
// Ending state
fov: 16           // Less zoomed in
blur: 100         // Less blur
duration: 3       // Faster animation
```

**Desktop (current):**
```typescript
// Ending state
fov: 10           // More zoomed in
blur: 130         // More blur
duration: 5       // Slower, more cinematic
```

### Text Content
Edit in `HeroTextOverlay.tsx`:
```tsx
<span>Design</span>  // Change initial word
<span>Present</span> // Change flipping words
<span>Time Traveler</span> // Change final phrase
```

### Colors & Materials
Modify Leva controls in `GridCubeIntro.tsx`:
```typescript
colorA: { value: '#000000' }  // Gradient color 1
colorB: { value: '#ffffff' }  // Gradient color 2
colorC: { value: '#b7d7ff' }  // Gradient color 3
fresnelColor: { value: '#6dffb1' }  // Edge glow color
```

---

## Performance Considerations

### Optimization Tips
1. **Disable Leva in Production:**
   ```tsx
   <GridCubeIntro showLeva={false}>
   ```

2. **Reduce Post-Processing:**
   - Lower bloom radius for better performance
   - Disable grain effect if not needed

3. **Adjust Geometry:**
   - Reduce `smoothness` value for fewer polygons
   - Use lower resolution for mobile devices

### Browser Support
- Requires WebGL 2.0 support
- Best performance on modern browsers (Chrome, Firefox, Safari, Edge)
- Consider fallback for older browsers

---

## Troubleshooting

### Animation doesn't play
- Check that `autoplay` is enabled in Leva controls
- Verify GSAP is properly installed
- Check browser console for errors

### Text doesn't appear
- Ensure font "Instrument Serif" is loaded
- Check text opacity state
- Verify text component is rendered as child

### 3D scene is blank
- Confirm Three.js dependencies are installed
- Check canvas is not hidden (opacity should be > 0 after fade-in)
- Verify camera position and FOV values

### Performance issues
- Reduce post-processing effects
- Lower bloom quality settings
- Disable shadows if enabled
- Check device GPU capabilities

---

## Credits & Dependencies

**Animation:**
- GSAP 3.14+ (GreenSock Animation Platform)
- @gsap/react for React integration

**3D Graphics:**
- Three.js 0.170+
- @react-three/fiber (React renderer for Three.js)
- @react-three/drei (helper components)
- @react-three/postprocessing (post-effects)

**UI Components:**
- Leva (debug controls, optional in production)

---

## Next Steps

1. **Add Sound:** Consider adding subtle sound effects for text transitions
2. **Loading State:** Add a loading screen while 3D assets initialize
3. **Skip Button:** Allow users to skip the intro animation
4. **Analytics:** Track completion rate of the intro sequence
5. **A/B Testing:** Test different timing variations

---

## Summary

This intro animation creates a professional, cinematic experience by:
- Layering 2D text animation over 3D graphics
- Using careful timing to guide viewer attention
- Employing exponential easing for dramatic effect
- Coordinating multiple animation properties (FOV, blur, bloom, opacity)
- Ending with a clear, focused view of the main content

The result is a smooth, engaging introduction that sets the tone for a premium web experience.
