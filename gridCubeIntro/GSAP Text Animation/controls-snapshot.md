# Intro & Cube Control States (Start vs End)

Comprehensive list of Leva values for both the starting (defaults) and latest captured states, covering the GSAP intro text and the cube scene.

## Intro Text (Leva)
- Start (defaults): `fontSize` 34, `xOffset` 0, `yOffset` 0, `textColor` #000000, `centerColor` #6b7280, `autoplay` true
- Latest captured: `fontSize` 34, `xOffset` 0, `yOffset` 0, `textColor` #000000, `centerColor` #d8d7d7, `autoplay` true

## Cube & Camera (Leva)
- Start (defaults):  
  - Gradient: `colorA` #000000, `colorB` #ffffff, `colorC` #b7d7ff, `stopAB` 0.91, `stopBC` 0.76, `softness` 0, `dirX` 1.4, `dirY` 0.2, `dirZ` -0.6, `range` 5  
  - Fresnel: `fresnelColor` #6dffb1, `fresnelAmount` 2.44, `fresnelOffset` 0.29, `fresnelIntensity` 5.58, `fresnelAlpha` 0.83, `fresnelOnly` false, `emissiveColor` #baffdf, `emissiveStrength` 0.29  
  - Effects: `bloomIntensity` 0.21, `bloomThreshold` 1.13, `bloomSmoothing` 1.46, `bloomRadius` 2.12, `blurEnabled` false, `blurStrength` 0.4, `blurTaper` 1.0, `blurSamples` 10, `grainEnabled` true, `grainOpacity` 1.0, `grainBlend` SOFT_LIGHT  
  - Geometry: `width` 2.1, `height` 1.55, `depth` 1.5, `radius` 0.5, `smoothness` 24  
  - Camera/Controls: `camX` -1.7, `camY` -0.6, `camZ` -6.5, `targetX` -0.2, `targetY` 0.0, `targetZ` -0.8, `fov` 12, `minDistance` 7.3, `maxDistance` 33.0, `enablePan` true  
  - Background: `backdropBlur` 70, `noiseOpacity` 0.1

- Latest captured: identical to start (no cube-side changes were logged)
  - Gradient: `colorA` #000000, `colorB` #ffffff, `colorC` #b7d7ff, `stopAB` 0.91, `stopBC` 0.76, `softness` 0, `dirX` 1.4, `dirY` 0.2, `dirZ` -0.6, `range` 5  
  - Fresnel: `fresnelColor` #6dffb1, `fresnelAmount` 2.44, `fresnelOffset` 0.29, `fresnelIntensity` 5.58, `fresnelAlpha` 0.83, `fresnelOnly` false, `emissiveColor` #baffdf, `emissiveStrength` 0.29  
  - Effects: `bloomIntensity` 0.21, `bloomThreshold` 1.13, `bloomSmoothing` 1.46, `bloomRadius` 2.12, `blurEnabled` false, `blurStrength` 0.4, `blurTaper` 1.0, `blurSamples` 10, `grainEnabled` true, `grainOpacity` 1.0, `grainBlend` SOFT_LIGHT  
  - Geometry: `width` 2.1, `height` 1.55, `depth` 1.5, `radius` 0.5, `smoothness` 24  
  - Camera/Controls: `camX` -1.7, `camY` -0.6, `camZ` -6.5, `targetX` -0.2, `targetY` 0.0, `targetZ` -0.8, `fov` 12, `minDistance` 7.3, `maxDistance` 33.0, `enablePan` true  
  - Background: `backdropBlur` 70, `noiseOpacity` 0.1

## Orbit Controls
- Start: position/target derived from camera defaults above; initial log emitted on mount.
- Latest captured: logs show position/target updates when you move the view; if untouched, they remain equal to the start values.

---

## Intro Animation States

### Mobile Version
**Starting State:**
- FOV: 111
- backdropBlur: 8
- bloomThreshold: 1.13
- canvasOpacity: 0
- textOpacity: 1

**Ending State (after 3s zoom):**
- FOV: 16
- backdropBlur: 130
- bloomThreshold: 0.94
- canvasOpacity: 1
- textOpacity: 0

**Animation Details:**
- Canvas fade-in: 0.9s delay, then 1.2s fade
- Text visible time: ~8.6s total (including 1.5s hold)
- Zoom duration: 3s
- FOV easing: power2.inOut
- Blur easing: expo.in (slow start, fast end)

### Desktop Version
**Starting State:**
- FOV: 111
- backdropBlur: 8
- bloomThreshold: 1.13
- canvasOpacity: 0
- textOpacity: 1

**Ending State (after 3s zoom):**
- FOV: 8 (more zoomed in than mobile)
- backdropBlur: 130
- bloomThreshold: 0.94
- canvasOpacity: 1
- textOpacity: 0

**Animation Details:**
- Same as mobile, but zooms in further
