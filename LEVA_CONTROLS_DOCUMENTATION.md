# Leva Panel Controls Documentation

This document contains all the Leva control panel settings used in the gradeCube project. These controls were used for fine-tuning the 3D cube gradient effect, camera positioning, and visual effects.

---

## Gradient Controls

Controls for the gradient shader applied to the 3D cube.

| Parameter | Default Value | Min | Max | Step | Description |
|-----------|---------------|-----|-----|------|-------------|
| `colorA` | `#6218a7` | - | - | - | First gradient color (purple) |
| `colorB` | `#ff0c0c` | - | - | - | Second gradient color (red) |
| `colorC` | `#ffffff` | - | - | - | Third gradient color (white) |
| `stopAB` | `0.91` | `0.05` | `0.95` | `0.01` | Gradient stop between color A and B |
| `stopBC` | `0.76` | `0.1` | `0.99` | `0.01` | Gradient stop between color B and C |
| `softness` | `0.0` | `0.0` | `0.5` | `0.005` | Gradient softness/blending |
| `dirX` | `1.4` | `-3` | `3` | `0.1` | Gradient direction X-axis |
| `dirY` | `0.2` | `-3` | `3` | `0.1` | Gradient direction Y-axis |
| `dirZ` | `-0.6` | `-3` | `3` | `0.1` | Gradient direction Z-axis |
| `range` | `5.0` | `0.1` | `5` | `0.1` | Gradient range/spread |

---

## Fresnel Controls

Controls for the fresnel effect (rim lighting) on the cube.

| Parameter | Default Value | Min | Max | Step | Description |
|-----------|---------------|-----|-----|------|-------------|
| `fresnelColor` | `#6dffb1` | - | - | - | Fresnel rim color (mint green) |
| `fresnelAmount` | `2.44` | `0` | `8` | `0.01` | Fresnel effect strength |
| `fresnelOffset` | `0.29` | `0` | `1` | `0.001` | Fresnel offset from edge |
| `fresnelIntensity` | `5.58` | `0` | `10` | `0.01` | Fresnel brightness intensity |
| `fresnelAlpha` | `0.83` | `0` | `1` | `0.01` | Fresnel opacity/alpha |
| `fresnelOnly` | `false` | - | - | - | Show only fresnel (debug mode) |
| `emissiveColor` | `#baffdf` | - | - | - | Emissive glow color (light cyan) |
| `emissiveStrength` | `0.29` | `0` | `5` | `0.01` | Emissive glow strength |

---

## Effects Controls

Post-processing visual effects applied to the scene.

| Parameter | Default Value | Min | Max | Step | Description |
|-----------|---------------|-----|-----|------|-------------|
| `bloomIntensity` | `0.21` | `0` | `5` | `0.01` | Bloom effect intensity |
| `bloomThreshold` | `0.94` | `0` | `2` | `0.01` | Brightness threshold for bloom |
| `bloomSmoothing` | `1.46` | `0` | `2` | `0.01` | Bloom edge smoothing |
| `bloomRadius` | `2.12` | `0` | `5` | `0.01` | Bloom effect radius |
| `blurEnabled` | `false` | - | - | - | Enable blur effect |
| `blurStrength` | `0.4` | `0` | `4` | `0.01` | Blur strength amount |
| `blurTaper` | `1.0` | `0` | `4` | `0.01` | Blur taper/falloff |
| `blurSamples` | `10` | `4` | `24` | `1` | Number of blur samples (quality) |
| `grainEnabled` | `true` | - | - | - | Enable film grain effect |
| `grainOpacity` | `1.0` | `0` | `1` | `0.01` | Film grain opacity |
| `grainBlend` | `SOFT_LIGHT` | - | - | - | Grain blend mode options:<br>- SOFT_LIGHT<br>- OVERLAY<br>- MULTIPLY<br>- SCREEN<br>- ADD |

---

## Geometry Controls

Controls for the 3D cube geometry shape.

| Parameter | Default Value | Min | Max | Step | Description |
|-----------|---------------|-----|-----|------|-------------|
| `width` | `2.10` | `0.2` | `6` | `0.05` | Cube width (X dimension) |
| `height` | `1.55` | `0.2` | `6` | `0.05` | Cube height (Y dimension) |
| `depth` | `1.50` | `0.2` | `6` | `0.05` | Cube depth (Z dimension) |
| `radius` | `0.50` | `0` | `3` | `0.01` | Corner radius (roundness) |
| `smoothness` | `24` | `1` | `24` | `1` | Corner smoothness (segments) |

---

## Camera Controls

Camera position, target, and settings.

| Parameter | Default Value | Min | Max | Step | Description |
|-----------|---------------|-----|-----|------|-------------|
| `camX` | `-1.7` | `-20` | `20` | `0.1` | Camera position X |
| `camY` | `-2.8` | `-20` | `20` | `0.1` | Camera position Y |
| `camZ` | `-6.5` | `-20` | `20` | `0.1` | Camera position Z |
| `targetX` | `-0.2` | `-10` | `10` | `0.05` | Camera look-at target X |
| `targetY` | `0.0` | `-10` | `10` | `0.05` | Camera look-at target Y |
| `targetZ` | `-0.8` | `-10` | `10` | `0.05` | Camera look-at target Z |
| `fov` | `12` | `10` | `120` | `1` | Field of view (degrees) |
| `minDistance` | `7.3` | `0.1` | `20` | `0.1` | Minimum zoom distance |
| `maxDistance` | `33.0` | `0.1` | `50` | `0.1` | Maximum zoom distance |
| `enablePan` | `true` | - | - | - | Enable camera panning |

---

## Background Controls

Background effects and styling.

| Parameter | Default Value | Min | Max | Step | Description |
|-----------|---------------|-----|-----|------|-------------|
| `backdropBlur` | `130` | `0` | `300` | `1` | Canvas backdrop blur amount (CSS) |
| `noiseOpacity` | `0.10` | `0` | `0.5` | `0.01` | Noise texture overlay opacity |

---

## Intro Text Controls

Controls for the intro text section positioning.

| Parameter | Default Value | Min | Max | Step | Description |
|-----------|---------------|-----|-----|------|-------------|
| `introPaddingX` | `0` | `0` | `200` | `1` | Horizontal padding for intro text |

---

## Floating Tabs Controls

Controls for floating tab animations (currently disabled in UI).

| Parameter | Default Value | Min | Max | Step | Description |
|-----------|---------------|-----|-----|------|-------------|
| `tabsEnabled` | `true` | - | - | - | Enable floating tabs |
| `tabsFloatAmpX` | `6` | `0` | `30` | `0.5` | Horizontal float amplitude |
| `tabsFloatAmpY` | `10` | `0` | `30` | `0.5` | Vertical float amplitude |
| `tabsFloatSpeedX` | `9` | `1` | `20` | `0.5` | Horizontal float speed |
| `tabsFloatSpeedY` | `8` | `1` | `20` | `0.5` | Vertical float speed |
| `tabsHoverScale` | `1.05` | `1` | `1.6` | `0.01` | Scale on hover |
| `tabsDragScale` | `1.1` | `1` | `2` | `0.01` | Scale when dragging |
| `tabsArrowWiggle` | `3` | `0` | `12` | `0.1` | Arrow wiggle animation |
| `tabsArrowDelayOffset` | `0` | `-2` | `2` | `0.1` | Arrow animation delay offset |

---

## Usage Notes

### How to Recreate the Leva Panel

If you need to add back the Leva controls for development/debugging:

1. **Install Leva** (if not already installed):
   ```bash
   npm install leva
   ```

2. **Import Leva in your component**:
   ```javascript
   import { Leva, useControls, folder } from 'leva'
   ```

3. **Add the useControls hook** with the configuration above:
   ```javascript
   const controls = useControls({
     Gradient: folder({ /* ... gradient settings ... */ }),
     Fresnel: folder({ /* ... fresnel settings ... */ }),
     // ... etc
   })
   ```

4. **Render the Leva panel**:
   ```jsx
   <Leva collapsed={false} />
   ```

### Tips

- Use `folder()` to organize controls into collapsible sections
- Set `collapsed: false` to keep folders open by default
- The `label` property provides a custom display name for the control
- Color pickers are automatically created for hex color values
- Use `options` array for dropdown/select controls

### File Locations

- Main Leva setup: `src/App.jsx` (lines 242-343)
- Additional Leva controls: `src/pages/SynechronCubeDetail.jsx`
- Leva component renders:
  - `src/App.jsx` (line 954)
  - `src/pages/SynechronCubeDetail.jsx` (line 125)

---

## Animation Targets

These specific controls are used for intro animation sequences:

```javascript
{
  fov: 12,              // Animates during intro
  backdropBlur: 130,    // Animates during intro
  bloomThreshold: 0.94  // Animates during intro
}
```

The intro animation transitions these values to create the initial "zoom in" effect when the page loads.

---

*Last Updated: 2025-12-31*
*Project: gradeCube Portfolio*
