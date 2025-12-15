import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { RoundedBox, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, TiltShift2, Noise } from '@react-three/postprocessing'
import { Leva, useControls, folder } from 'leva'
import { Color, EventDispatcher } from 'three'
import { BlendFunction } from 'postprocessing'
import { Iridescence } from './IridescenceMaterial'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import '../../styles/grid-cube-intro.css'

type RoundedCubeProps = {
  width: number
  height: number
  depth: number
  colorA: string
  colorB: string
  colorC: string
  stopAB: number
  stopBC: number
  softness: number
  dirX: number
  dirY: number
  dirZ: number
  range: number
  fresnelColor: string
  fresnelAmount: number
  fresnelOffset: number
  fresnelIntensity: number
  fresnelAlpha: number
  fresnelOnly: boolean
  emissiveColor: string
  emissiveStrength: number
  radius: number
  smoothness: number
}

function RoundedCube({
  width,
  height,
  depth,
  colorA,
  colorB,
  colorC,
  stopAB,
  stopBC,
  softness,
  dirX,
  dirY,
  dirZ,
  range,
  fresnelColor,
  fresnelAmount,
  fresnelOffset,
  fresnelIntensity,
  fresnelAlpha,
  fresnelOnly,
  emissiveColor,
  emissiveStrength,
  radius,
  smoothness,
}: RoundedCubeProps) {
  const colorAArray = useMemo(() => new Color(colorA).toArray(), [colorA])
  const colorBArray = useMemo(() => new Color(colorB).toArray(), [colorB])
  const colorCArray = useMemo(() => new Color(colorC).toArray(), [colorC])
  const directionArray = useMemo(() => [dirX, dirY, dirZ], [dirX, dirY, dirZ])
  const args = useMemo(() => [width, height, depth] as [number, number, number], [width, height, depth])
  const maxRadius = Math.min(width, height, depth) / 2 - 0.001
  const safeRadius = Math.min(radius, maxRadius)

  return (
    <RoundedBox args={args} radius={safeRadius} smoothness={smoothness}>
      <Iridescence
        colorA={colorAArray}
        colorB={colorBArray}
        colorC={colorCArray}
        stopAB={stopAB}
        stopBC={stopBC}
        softness={softness}
        direction={directionArray}
        range={range}
        fresnelColor={fresnelColor}
        fresnelAmount={fresnelAmount}
        fresnelOffset={fresnelOffset}
        fresnelIntensity={fresnelIntensity}
        fresnelAlpha={fresnelAlpha}
        fresnelOnly={fresnelOnly}
        emissiveColor={emissiveColor}
        emissiveStrength={emissiveStrength}
      />
    </RoundedBox>
  )
}

type CameraRigProps = {
  camX: number
  camY: number
  camZ: number
  fov: number
}

function CameraRig({ camX, camY, camZ, fov }: CameraRigProps) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(camX, camY, camZ)
    // eslint-disable-next-line react-hooks/immutability
    camera.fov = fov
    camera.updateProjectionMatrix()
  }, [camera, camX, camY, camZ, fov])

  return null
}

type ControlsRigProps = {
  targetX: number
  targetY: number
  targetZ: number
  minDistance: number
  maxDistance: number
  enablePan: boolean
}

function ControlsRig({ targetX, targetY, targetZ, minDistance, maxDistance, enablePan }: ControlsRigProps) {
  const controlsRef = useRef<EventDispatcher | null>(null)
  const { camera } = useThree()

  useEffect(() => {
    if (!controlsRef.current) return
    // @ts-expect-error - OrbitControls target is not fully typed here
    controlsRef.current.target.set(targetX, targetY, targetZ)
    // @ts-expect-error - OrbitControls target is not fully typed here
    controlsRef.current.update()
  }, [targetX, targetY, targetZ])

  useEffect(() => {
    const ctrl: any = controlsRef.current
    if (!ctrl) return
    const handler = () => {
      const target = ctrl.target
      const targetArray = target?.toArray ? target.toArray() : [target?.x, target?.y, target?.z]
      console.log('[OrbitControls] change', {
        position: camera.position.toArray(),
        target: targetArray,
      })
    }
    ctrl.addEventListener?.('change', handler)
    handler()
    return () => {
      ctrl.removeEventListener?.('change', handler)
    }
  }, [camera])

  return (
    <OrbitControls
      // @ts-expect-error - Drei typing mismatch
      ref={controlsRef}
      enableDamping
      dampingFactor={0.1}
      minDistance={minDistance}
      maxDistance={maxDistance}
      enablePan={enablePan}
    />
  )
}

type SceneProps = {
  cubeProps: RoundedCubeProps
  bloomIntensity: number
  bloomThreshold: number
  bloomSmoothing: number
  bloomRadius: number
  blurEnabled: boolean
  blurStrength: number
  blurTaper: number
  blurSamples: number
  grainEnabled: boolean
  grainOpacity: number
  grainBlend: keyof typeof BlendFunction
  camX: number
  camY: number
  camZ: number
  targetX: number
  targetY: number
  targetZ: number
  fov: number
  minDistance: number
  maxDistance: number
  enablePan: boolean
}

function Scene({
  cubeProps,
  bloomIntensity,
  bloomThreshold,
  bloomSmoothing,
  bloomRadius,
  blurEnabled,
  blurStrength,
  blurTaper,
  blurSamples,
  grainEnabled,
  grainOpacity,
  grainBlend,
  camX,
  camY,
  camZ,
  targetX,
  targetY,
  targetZ,
  fov,
  minDistance,
  maxDistance,
  enablePan,
}: SceneProps) {
  return (
    <Canvas camera={{ position: [camX, camY, camZ], fov }}>
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 6, 5]} intensity={0.9} />
      <directionalLight position={[-4, -2, -4]} intensity={0.25} />
      <CameraRig camX={camX} camY={camY} camZ={camZ} fov={fov} />
      <ControlsRig
        targetX={targetX}
        targetY={targetY}
        targetZ={targetZ}
        minDistance={minDistance}
        maxDistance={maxDistance}
        enablePan={enablePan}
      />
      <RoundedCube {...cubeProps} />
      <EffectComposer>
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={bloomThreshold}
          luminanceSmoothing={bloomSmoothing}
          radius={bloomRadius}
        />
        {blurEnabled ? (
          <TiltShift2
            blur={blurStrength}
            taper={blurTaper}
            samples={blurSamples}
            start={[0, 0]}
            end={[1, 1]}
            direction={[1, 1]}
          />
        ) : null}
        {grainEnabled ? (
          <Noise premultiply opacity={grainOpacity} blendFunction={BlendFunction[grainBlend]} />
        ) : null}
      </EffectComposer>
    </Canvas>
  )
}

type GridCubeIntroProps = {
  children?: ReactNode
  showLeva?: boolean
}

export default function GridCubeIntro({ children, showLeva = true }: GridCubeIntroProps) {
  // Animation state
  const [animatedFov, setAnimatedFov] = useState(111)
  const [animatedBlur, setAnimatedBlur] = useState(8)
  const [animatedBloomThreshold, setAnimatedBloomThreshold] = useState(1.13)
  const [canvasOpacity, setCanvasOpacity] = useState(0)
  const [textOpacity, setTextOpacity] = useState(1)

  const containerRef = useRef<HTMLDivElement>(null)
  const textOverlayRef = useRef<HTMLDivElement>(null)

  const controls = useControls({
    Gradient: folder(
      {
        colorA: { value: '#000000' },
        colorB: { value: '#ffffff' },
        colorC: { value: '#b7d7ff' },
        stopAB: { value: 0.91, min: 0.05, max: 0.95, step: 0.01 },
        stopBC: { value: 0.76, min: 0.1, max: 0.99, step: 0.01 },
        softness: { value: 0.0, min: 0.0, max: 0.5, step: 0.005 },
        dirX: { value: 1.4, min: -3, max: 3, step: 0.1, label: 'dir X' },
        dirY: { value: 0.2, min: -3, max: 3, step: 0.1, label: 'dir Y' },
        dirZ: { value: -0.6, min: -3, max: 3, step: 0.1, label: 'dir Z' },
        range: { value: 5.0, min: 0.1, max: 5, step: 0.1 },
      },
      { collapsed: false }
    ),
    Fresnel: folder(
      {
        fresnelColor: { value: '#6dffb1' },
        fresnelAmount: { value: 2.44, min: 0, max: 8, step: 0.01 },
        fresnelOffset: { value: 0.29, min: 0, max: 1, step: 0.001 },
        fresnelIntensity: { value: 5.58, min: 0, max: 10, step: 0.01 },
        fresnelAlpha: { value: 0.83, min: 0, max: 1, step: 0.01 },
        fresnelOnly: { value: false, label: 'fresnel only' },
        emissiveColor: { value: '#baffdf' },
        emissiveStrength: { value: 0.29, min: 0, max: 5, step: 0.01 },
      },
      { collapsed: false }
    ),
    Effects: folder(
      {
        bloomIntensity: { value: 0.21, min: 0, max: 5, step: 0.01 },
        bloomThreshold: { value: 1.13, min: 0, max: 2, step: 0.01 },
        bloomSmoothing: { value: 1.46, min: 0, max: 2, step: 0.01 },
        bloomRadius: { value: 2.12, min: 0, max: 5, step: 0.01 },
        blurEnabled: { value: false, label: 'blur on' },
        blurStrength: { value: 0.4, min: 0, max: 4, step: 0.01, label: 'blur' },
        blurTaper: { value: 1.0, min: 0, max: 4, step: 0.01, label: 'taper' },
        blurSamples: { value: 10, min: 4, max: 24, step: 1, label: 'samples' },
        grainEnabled: { value: true, label: 'grain on' },
        grainOpacity: { value: 1.0, min: 0, max: 1, step: 0.01, label: 'grain' },
        grainBlend: {
          value: 'SOFT_LIGHT',
          options: ['SOFT_LIGHT', 'OVERLAY', 'MULTIPLY', 'SCREEN', 'ADD'],
          label: 'blend',
        },
      },
      { collapsed: false }
    ),
    Geometry: folder(
      {
        width: { value: 2.1, min: 0.2, max: 6, step: 0.05 },
        height: { value: 1.55, min: 0.2, max: 6, step: 0.05 },
        depth: { value: 1.5, min: 0.2, max: 6, step: 0.05 },
        radius: { value: 0.5, min: 0, max: 3, step: 0.01 },
        smoothness: { value: 24, min: 1, max: 24, step: 1 },
      },
      { collapsed: false }
    ),
    Camera: folder(
      {
        camX: { value: -1.7, min: -20, max: 20, step: 0.1, label: 'pos X' },
        camY: { value: -0.6, min: -20, max: 20, step: 0.1, label: 'pos Y' },
        camZ: { value: -6.5, min: -20, max: 20, step: 0.1, label: 'pos Z' },
        targetX: { value: -0.2, min: -10, max: 10, step: 0.05, label: 'target X' },
        targetY: { value: 0.0, min: -10, max: 10, step: 0.05, label: 'target Y' },
        targetZ: { value: -0.8, min: -10, max: 10, step: 0.05, label: 'target Z' },
        fov: { value: 111, min: 10, max: 120, step: 1 },
        minDistance: { value: 7.3, min: 0.1, max: 20, step: 0.1 },
        maxDistance: { value: 33.0, min: 0.1, max: 50, step: 0.1 },
        enablePan: { value: true },
      },
      { collapsed: false }
    ),
    Background: folder(
      {
        backdropBlur: { value: 8, min: 0, max: 300, step: 1, label: 'canvas blur' },
        noiseOpacity: { value: 0.1, min: 0, max: 0.5, step: 0.01, label: 'texture' },
      },
      { collapsed: false }
    ),
  })

  const {
    colorA,
    colorB,
    colorC,
    stopAB,
    stopBC,
    softness,
    dirX,
    dirY,
    dirZ,
    range,
    fresnelColor,
    fresnelAmount,
    fresnelOffset,
    fresnelIntensity,
    fresnelAlpha,
    fresnelOnly,
    emissiveColor,
    emissiveStrength,
    bloomIntensity,
    bloomThreshold,
    bloomSmoothing,
    bloomRadius,
    blurEnabled,
    blurStrength,
    blurTaper,
    blurSamples,
    grainEnabled,
    grainOpacity,
    grainBlend,
    width,
    height,
    depth,
    radius,
    smoothness,
    camX,
    camY,
    camZ,
    targetX,
    targetY,
    targetZ,
    fov,
    minDistance,
    maxDistance,
    enablePan,
    backdropBlur,
    noiseOpacity,
  } = controls as any

  useEffect(() => {
    console.log('[Leva] GridCubeIntro controls', {
      colorA,
      colorB,
      colorC,
      stopAB,
      stopBC,
      softness,
      dirX,
      dirY,
      dirZ,
      range,
      fresnelColor,
      fresnelAmount,
      fresnelOffset,
      fresnelIntensity,
      fresnelAlpha,
      fresnelOnly,
      emissiveColor,
      emissiveStrength,
      bloomIntensity,
      bloomThreshold,
      bloomSmoothing,
      bloomRadius,
      blurEnabled,
      blurStrength,
      blurTaper,
      blurSamples,
      grainEnabled,
      grainOpacity,
      grainBlend,
      width,
      height,
      depth,
      radius,
      smoothness,
      camX,
      camY,
      camZ,
      targetX,
      targetY,
      targetZ,
      fov,
      minDistance,
      maxDistance,
      enablePan,
      backdropBlur,
      noiseOpacity,
    })
  }, [
    colorA,
    colorB,
    colorC,
    stopAB,
    stopBC,
    softness,
    dirX,
    dirY,
    dirZ,
    range,
    fresnelColor,
    fresnelAmount,
    fresnelOffset,
    fresnelIntensity,
    fresnelAlpha,
    fresnelOnly,
    emissiveColor,
    emissiveStrength,
    bloomIntensity,
    bloomThreshold,
    bloomSmoothing,
    bloomRadius,
    blurEnabled,
    blurStrength,
    blurTaper,
    blurSamples,
    grainEnabled,
    grainOpacity,
    grainBlend,
    width,
    height,
    depth,
    radius,
    smoothness,
    camX,
    camY,
    camZ,
    targetX,
    targetY,
    targetZ,
    fov,
    minDistance,
    maxDistance,
    enablePan,
    backdropBlur,
    noiseOpacity,
  ])

  // Master intro animation timeline
  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: false })

      // Phase 1: Canvas fade-in (starts 0.4s later at ~0.9s)
      tl.to(
        {},
        {
          duration: 0.9,
        },
        0
      ) // Initial delay
        .to(
          {},
          {
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: function () {
              const progress = this.progress()
              setCanvasOpacity(progress)
            },
          },
          0.9
        ) // Canvas fade in

      // Phase 2: Wait for text animation to complete (~7s total from start)
      tl.to({}, { duration: 5.3 }, '>')

      // Phase 2.5: Let text stay visible for 1.5 seconds
      tl.to({}, { duration: 1.5 }, '>')

      // Phase 3: Text fade out
      tl.to(
        {},
        {
          duration: 0.8,
          ease: 'power2.inOut',
          onUpdate: function () {
            const progress = 1 - this.progress()
            setTextOpacity(progress)
          },
        },
        '>'
      )

      // Phase 4: Zoom animation (FOV + Blur + Bloom with different easings)
      const animState = { fov: 111, blur: 8, bloomThreshold: 1.13 }

      // FOV animation - expo ease out (5 seconds)
      tl.to(
        animState,
        {
          fov: 10,
          duration: 5,
          ease: 'expo.out',
          onUpdate: () => {
            setAnimatedFov(animState.fov)
          },
        },
        '>'
      )

      // Blur animation - 3 seconds, ends at 3s mark
      tl.to(
        animState,
        {
          blur: 130,
          duration: 3,
          ease: 'expo.in',
          onUpdate: () => {
            setAnimatedBlur(animState.blur)
          },
        },
        '<'
      )

      // Bloom threshold animation (runs with zoom)
      tl.to(
        animState,
        {
          bloomThreshold: 0.94,
          duration: 5,
          ease: 'power2.inOut',
          onUpdate: () => {
            setAnimatedBloomThreshold(animState.bloomThreshold)
          },
        },
        '<'
      )

      return () => {
        tl.kill()
      }
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="gridcube-stage"
      style={{
        '--canvas-blur': `${animatedBlur}px`,
        '--noise-opacity': noiseOpacity,
      } as React.CSSProperties}
    >
      {showLeva ? <Leva collapsed={false} /> : null}
      <div className="gridcube-canvas-shell" style={{ opacity: canvasOpacity }}>
        <Scene
          cubeProps={controls as unknown as RoundedCubeProps}
          bloomIntensity={bloomIntensity}
          bloomThreshold={animatedBloomThreshold}
          bloomSmoothing={bloomSmoothing}
          bloomRadius={bloomRadius}
          blurEnabled={blurEnabled}
          blurStrength={blurStrength}
          blurTaper={blurTaper}
          blurSamples={blurSamples}
          grainEnabled={grainEnabled}
          grainOpacity={grainOpacity}
          grainBlend={grainBlend}
          camX={camX}
          camY={camY}
          camZ={camZ}
          targetX={targetX}
          targetY={targetY}
          targetZ={targetZ}
          fov={animatedFov}
          minDistance={minDistance}
          maxDistance={maxDistance}
          enablePan={enablePan}
        />
        {children ? (
          <div ref={textOverlayRef} className="gridcube-overlay" style={{ opacity: textOpacity }}>
            {children}
          </div>
        ) : null}
      </div>
    </div>
  )
}
