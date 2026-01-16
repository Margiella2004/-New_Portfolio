import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, TiltShift2, Noise } from '@react-three/postprocessing'
import { Perf } from 'r3f-perf'
import { Leva, useControls, folder } from 'leva'
import { Color } from 'three'
import { BlendFunction } from 'postprocessing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Iridescence } from './IridescenceMaterial'
import Header from './Header'
import IntroText from './IntroText'
import DesignEngineer from './DesignEngineer'
import FloatingTabs from './FloatingTabs'
import HeroTextOverlay from './HeroTextOverlay'
import Projects from './Projects'
import MakeCodeLiveSection from './MakeCodeLiveSection'
import Footer from './Footer'
import { footerData } from './footerData'
import { preloadAssets } from './preloadAssets'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function ScrollStopBCUpdater({
  materialRef,
  scrollStopBCRef,
  scrollStopBCTargetRef,
  scrollStopBCBaseRef,
  scrollStopBCBaselinePendingRef,
  baseStopBC,
  lowPowerMode,
  mouseActivityRef,
}) {
  const lastStopBCRef = useRef(null)

  useFrame(() => {
    if (!materialRef.current) return
    if (lowPowerMode) {
      if (lastStopBCRef.current !== baseStopBC) {
        materialRef.current.uStopBC = baseStopBC
        lastStopBCRef.current = baseStopBC
      }
      return
    }

    const now = typeof performance !== 'undefined' ? performance.now() : Date.now()
    const lastMouse = mouseActivityRef?.current ?? 0
    const recentMouse = now - lastMouse < 220
    const scrollInfluence = recentMouse ? 0.6 : 1
    const target = scrollStopBCTargetRef?.current ?? 0
    const pendingBaseline = scrollStopBCBaselinePendingRef?.current
    if (scrollStopBCBaseRef?.current === null && pendingBaseline !== null) {
      const currentUniform = materialRef.current.uStopBC ?? baseStopBC
      scrollStopBCBaseRef.current = currentUniform + pendingBaseline * scrollInfluence
      scrollStopBCRef.current = pendingBaseline
      scrollStopBCBaselinePendingRef.current = null
      lastStopBCRef.current = currentUniform
      return
    }

    const current = scrollStopBCRef?.current ?? 0
    const nextCurrent = current + (target - current) * 0.12
    scrollStopBCRef.current = nextCurrent

    if (
      scrollStopBCBaseRef?.current !== null &&
      target === 0 &&
      Math.abs(nextCurrent) < 0.001
    ) {
      scrollStopBCBaseRef.current = null
      scrollStopBCRef.current = 0
      scrollStopBCBaselinePendingRef.current = null
      if (lastStopBCRef.current !== baseStopBC) {
        materialRef.current.uStopBC = baseStopBC
        lastStopBCRef.current = baseStopBC
      }
      return
    }

    const baseline = scrollStopBCBaseRef?.current ?? baseStopBC
    const nextStopBC = baseline - nextCurrent * scrollInfluence
    const lastStopBC = lastStopBCRef.current

    if (lastStopBC !== null && Math.abs(nextStopBC - lastStopBC) < 0.001) {
      return
    }

    materialRef.current.uStopBC = nextStopBC
    lastStopBCRef.current = nextStopBC
  })

  return null
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
  materialRef,
}) {
  const colorAArray = useMemo(() => new Color(colorA).toArray(), [colorA])
  const colorBArray = useMemo(() => new Color(colorB).toArray(), [colorB])
  const colorCArray = useMemo(() => new Color(colorC).toArray(), [colorC])
  const directionArray = useMemo(() => [dirX, dirY, dirZ], [dirX, dirY, dirZ])
  const args = useMemo(() => [width, height, depth], [width, height, depth])
  const maxRadius = Math.min(width, height, depth) / 2 - 0.001
  const safeRadius = Math.min(radius, maxRadius)

  return (
    <RoundedBox args={args} radius={safeRadius} smoothness={smoothness}>
      <Iridescence
        ref={materialRef}
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

function CameraRig({ camX, camY, camZ, fov }) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(camX, camY, camZ)
    // eslint-disable-next-line react-hooks/immutability
    camera.fov = fov
    camera.updateProjectionMatrix()
  }, [camera, camX, camY, camZ, fov])

  return null
}

function ControlsRig({
  targetX,
  targetY,
  targetZ,
  minDistance,
  maxDistance,
  enablePan,
  enableDamping = true,
  dampingFactor = 0.1,
}) {
  const controlsRef = useRef(null)
  const { camera } = useThree()

  useEffect(() => {
    if (!controlsRef.current) return
    controlsRef.current.target.set(targetX, targetY, targetZ)
    controlsRef.current.update()
  }, [targetX, targetY, targetZ])

  useEffect(() => {
    if (!import.meta.env.DEV) return undefined
    const controls = controlsRef.current
    if (!controls) return undefined

    const handleChange = () => {
      const { x, y, z } = camera.position
      const { x: tx, y: ty, z: tz } = controls.target
      console.log('[OrbitControls] camera', {
        x: Number(x.toFixed(3)),
        y: Number(y.toFixed(3)),
        z: Number(z.toFixed(3)),
        targetX: Number(tx.toFixed(3)),
        targetY: Number(ty.toFixed(3)),
        targetZ: Number(tz.toFixed(3)),
      })
    }

    controls.addEventListener('change', handleChange)
    return () => {
      controls.removeEventListener('change', handleChange)
    }
  }, [camera])

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping={enableDamping}
      dampingFactor={dampingFactor}
      minDistance={minDistance}
      maxDistance={maxDistance}
      enablePan={enablePan}
      enableRotate={false}
      enableZoom={false}
    />
  )
}

function Scene({
  cubeProps,
  scrollStopBCRef,
  scrollStopBCTargetRef,
  scrollStopBCBaseRef,
  scrollStopBCBaselinePendingRef,
  mouseActivityRef,
  bloomIntensity,
  bloomThreshold,
  bloomSmoothing,
  bloomRadius,
  bloomLevels,
  bloomMipmapBlur,
  bloomResolutionScale,
  composerMultisampling,
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
  dpr,
  lowPowerMode,
  showPerf,
}) {
  const materialRef = useRef(null)

  return (
    <Canvas
      camera={{ position: [camX, camY, camZ], fov }}
      dpr={dpr}
      gl={{
        antialias: !lowPowerMode,
        powerPreference: lowPowerMode ? 'low-power' : 'high-performance',
      }}
    >
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
        enableDamping={!lowPowerMode}
      />
      {showPerf ? (
        <Perf
          position="top-left"
          style={{
            zIndex: 2147483647,
            transform: 'scale(1.5)',
            transformOrigin: 'top left',
          }}
        />
      ) : null}
      <RoundedCube {...cubeProps} materialRef={materialRef} />
      <ScrollStopBCUpdater
        materialRef={materialRef}
        scrollStopBCRef={scrollStopBCRef}
        scrollStopBCTargetRef={scrollStopBCTargetRef}
        scrollStopBCBaseRef={scrollStopBCBaseRef}
        scrollStopBCBaselinePendingRef={scrollStopBCBaselinePendingRef}
        baseStopBC={cubeProps.stopBC ?? 0}
        lowPowerMode={lowPowerMode}
        mouseActivityRef={mouseActivityRef}
      />
      <EffectComposer multisampling={composerMultisampling} disableNormalPass>
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={bloomThreshold}
          luminanceSmoothing={bloomSmoothing}
          radius={bloomRadius}
          levels={bloomLevels}
          mipmapBlur={bloomMipmapBlur}
          resolutionScale={bloomResolutionScale}
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
          <Noise
            premultiply
            opacity={grainOpacity}
            blendFunction={BlendFunction[grainBlend]}
          />
        ) : null}
      </EffectComposer>
    </Canvas>
  )
}

function App() {
  // Container ref for scroll structure
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const heroContentRef = useRef(null)
  const heroSectionRef = useRef(null)
  const projectsRef = useRef(null)
  const canvasWrapperRef = useRef(null)
  const footerRef = useRef(null)
  const aboutRef = useRef(null)

  const canvasOpacity = 1
  const introTextOpacity = 0
  const scrollFov = 0
  const scrollStopBCRef = useRef(0)
  const scrollStopBCTargetRef = useRef(0)
  const scrollStopBCBaseRef = useRef(null)
  const scrollStopBCBaselinePendingRef = useRef(null)
  const scrollStopBCMetaRef = useRef({ time: 0, value: 0 })
  const [activeSection, setActiveSection] = useState('home')
  const [mouseBloom, setMouseBloom] = useState({ x: 0.5, y: 0.5 })
  const [assetsReady, setAssetsReady] = useState(false)
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )
  const mouseBloomTargetRef = useRef({ x: 0.5, y: 0.5 })
  const mouseBloomCurrentRef = useRef({ x: 0.5, y: 0.5 })
  const mouseBloomRafRef = useRef(null)
  const mouseBloomLastTimeRef = useRef(0)
  const mouseBloomStateRef = useRef({ x: 0.5, y: 0.5 })
  const mouseActivityRef = useRef(0)
  const defaultFov = typeof window !== 'undefined' && window.innerWidth <= 768 ? 22 : 12
  const isLowPower = useMemo(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4
    const lowCores = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4
    return Boolean(reducedMotion || lowMemory || lowCores)
  }, [])
  const debugEnabled = import.meta.env.DEV
  const lowPowerMode = isLowPower
  const isFirefox = useMemo(() => {
    if (typeof navigator === 'undefined') return false
    return /firefox/i.test(navigator.userAgent)
  }, [])
  const isSafari = useMemo(() => {
    if (typeof navigator === 'undefined') return false
    const ua = navigator.userAgent
    return /safari/i.test(ua) && !/chrome|chromium|crios|android/i.test(ua)
  }, [])
  const isChromium = !isFirefox && !isSafari
  const preloadBlocking = useMemo(() => {
    if (typeof window === 'undefined') return false
    return new URLSearchParams(window.location.search).get('preload') === 'block'
  }, [])
  const showPerf = useMemo(() => {
    if (typeof window === 'undefined') return false
    const params = new URLSearchParams(window.location.search)
    if (import.meta.env.DEV) return true
    const perfEnabled = import.meta.env.VITE_ENABLE_PERF === 'true'
    return perfEnabled && params.get('perf') === 'true'
  }, [])
  const updateScrollStopBC = useCallback(
    (value) => {
      if (lowPowerMode) return
      const step = 0.002
      const minInterval = 1000 / 30
      const quantized = Math.round(value / step) * step
      const now = typeof performance !== 'undefined' ? performance.now() : Date.now()
      const last = scrollStopBCMetaRef.current

      if (quantized === last.value && now - last.time < minInterval) return

      if (scrollStopBCBaseRef.current === null) {
        scrollStopBCBaselinePendingRef.current = quantized
      }
      scrollStopBCTargetRef.current = quantized
      scrollStopBCMetaRef.current = { time: now, value: quantized }
    },
    [lowPowerMode]
  )
  const resetScrollStopBC = useCallback(() => {
    scrollStopBCTargetRef.current = 0
    scrollStopBCMetaRef.current = { time: 0, value: 0 }
    scrollStopBCBaselinePendingRef.current = null
  }, [])

  useEffect(() => {
    if (!lowPowerMode) return
    scrollStopBCRef.current = 0
    scrollStopBCTargetRef.current = 0
    scrollStopBCBaseRef.current = null
    scrollStopBCBaselinePendingRef.current = null
    scrollStopBCMetaRef.current = { time: 0, value: 0 }
  }, [lowPowerMode])

  useEffect(() => {
    let active = true
    preloadAssets().then(() => {
      if (active) setAssetsReady(true)
    })
    return () => {
      active = false
    }
  }, [])

  const defaultBackdropBlur = isChromium ? 87 : 128
  const defaultSaturation = isChromium ? 0.79 : 1.55
  const controls = useControls({
    Gradient: folder(
      {
        colorA: { value: '#6218a7' },
        colorB: { value: '#ff0c0c' },
        colorC: { value: '#ffffff' },
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
        fresnelAmount: { value: 1.74, min: 0, max: 8, step: 0.01 },
        fresnelOffset: { value: 0.114, min: 0, max: 1, step: 0.001 },
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
        bloomThreshold: { value: 0.94, min: 0, max: 2, step: 0.01 },
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
        width: { value: 2.10, min: 0.2, max: 6, step: 0.05 },
        height: { value: 1.55, min: 0.2, max: 6, step: 0.05 },
        depth: { value: 1.50, min: 0.2, max: 6, step: 0.05 },
        radius: { value: 0.50, min: 0, max: 3, step: 0.01 },
        smoothness: { value: 16, min: 1, max: 24, step: 1 },
      },
      { collapsed: false }
    ),
    Camera: folder(
      {
        camX: { value: -1.7, min: -20, max: 20, step: 0.1, label: 'pos X' },
        camY: { value: -2.8, min: -20, max: 20, step: 0.1, label: 'pos Y' },
        camZ: { value: -6.5, min: -20, max: 20, step: 0.1, label: 'pos Z' },
        targetX: { value: -0.2, min: -10, max: 10, step: 0.05, label: 'target X' },
        targetY: { value: 0.0, min: -10, max: 10, step: 0.05, label: 'target Y' },
        targetZ: { value: -0.8, min: -10, max: 10, step: 0.05, label: 'target Z' },
        fov: { value: defaultFov, min: 10, max: 120, step: 1 },
        minDistance: { value: 7.3, min: 0.1, max: 20, step: 0.1 },
        maxDistance: { value: 33.0, min: 0.1, max: 50, step: 0.1 },
        enablePan: { value: true },
      },
      { collapsed: false }
    ),
    Background: folder(
      {
        backdropBlur: { value: defaultBackdropBlur, min: 0, max: 300, step: 1, label: 'canvas blur' },
        blurMode: {
          value: 'css',
          options: ['css', 'none'],
          label: 'blur mode',
        },
        noiseOpacity: { value: 0.07, min: 0, max: 0.5, step: 0.01, label: 'texture' },
        saturation: { value: defaultSaturation, min: 0, max: 2, step: 0.01, label: 'saturation' },
      },
      { collapsed: false }
    ),
    'Intro Text': folder(
      {
        introPaddingX: { value: 0, min: 0, max: 200, step: 1, label: 'horizontal padding' },
      },
      { collapsed: false }
    ),
    'Floating Tabs': folder(
      {
        tabsEnabled: { value: true, label: 'enabled' },
        tabsFloatAmpX: { value: 6, min: 0, max: 30, step: 0.5, label: 'float X' },
        tabsFloatAmpY: { value: 10, min: 0, max: 30, step: 0.5, label: 'float Y' },
        tabsFloatSpeedX: { value: 9, min: 1, max: 20, step: 0.5, label: 'speed X' },
        tabsFloatSpeedY: { value: 8, min: 1, max: 20, step: 0.5, label: 'speed Y' },
        tabsHoverScale: { value: 1.05, min: 1, max: 1.6, step: 0.01, label: 'hover scale' },
        tabsDragScale: { value: 1.1, min: 1, max: 2, step: 0.01, label: 'drag scale' },
        tabsArrowWiggle: { value: 3, min: 0, max: 12, step: 0.1, label: 'arrow wiggle' },
        tabsArrowDelayOffset: { value: 0, min: -2, max: 2, step: 0.1, label: 'arrow delay' },
      },
      { collapsed: true }
    ),
  })

  useEffect(() => {
    if (lowPowerMode) return undefined
    const frameInterval = 1000 / 30

    const tick = () => {
      const now = performance.now()
      if (now - mouseBloomLastTimeRef.current < frameInterval) {
        mouseBloomRafRef.current = requestAnimationFrame(tick)
        return
      }
      mouseBloomLastTimeRef.current = now

      const current = mouseBloomCurrentRef.current
      const target = mouseBloomTargetRef.current
      const nextX = current.x + (target.x - current.x) * 0.08
      const nextY = current.y + (target.y - current.y) * 0.08

      mouseBloomCurrentRef.current = { x: nextX, y: nextY }

      const last = mouseBloomStateRef.current
      if (
        Math.abs(nextX - last.x) > 0.001 ||
        Math.abs(nextY - last.y) > 0.001
      ) {
        const next = { x: nextX, y: nextY }
        mouseBloomStateRef.current = next
        setMouseBloom(next)
      }

      mouseBloomRafRef.current = requestAnimationFrame(tick)
    }

    mouseBloomRafRef.current = requestAnimationFrame(tick)
    return () => {
      if (mouseBloomRafRef.current) {
        cancelAnimationFrame(mouseBloomRafRef.current)
      }
    }
  }, [lowPowerMode])

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
  const clamp01 = (value) => clamp(value, 0, 1)

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleHeroPointerMove = (event) => {
    if (lowPowerMode) return
    // Use window dimensions since projects section covers hero
    const x = clamp01(event.clientX / window.innerWidth)
    const y = clamp01(event.clientY / window.innerHeight)
    mouseBloomTargetRef.current = { x, y }
    mouseActivityRef.current = typeof performance !== 'undefined'
      ? performance.now()
      : Date.now()
  }

  const handleHeroPointerLeave = () => {
    if (lowPowerMode) return
    mouseBloomTargetRef.current = { x: 0.5, y: 0.5 }
    mouseActivityRef.current = 0
  }

  // Debug logging for Design Engineer width calculation
  const paddingValue = controls.introPaddingX
  const paddingTotal = paddingValue * 2
  const widthFormula = `calc(90vw - ${paddingTotal}px)`

  if (debugEnabled) {
    console.log('========== DESIGN ENGINEER WIDTH DEBUG ==========')
    console.log('Padding (one side):', paddingValue, 'px')
    console.log('Padding (both sides):', paddingTotal, 'px')
    console.log('Width Formula:', widthFormula)
    console.log('Viewport Width:', window.innerWidth, 'px')
    console.log('90% of Viewport:', window.innerWidth * 0.9, 'px')
    console.log('Expected Final Width:', (window.innerWidth * 0.9) - paddingTotal, 'px')
    console.log('=================================================')
    console.log('App render pipeline: Hero -> Projects -> MakeCodeLiveSection')
  }

  const dprCap = lowPowerMode ? 1 : viewportWidth <= 768 ? 1.25 : 1.5
  const effectiveDpr = typeof window !== 'undefined'
    ? Math.min(window.devicePixelRatio || 1, dprCap)
    : dprCap
  const blurScale = clamp(viewportWidth / 1024, 0.2, 1)
  const noiseScale = clamp(viewportWidth / 1024, 0.5, 1)
  const bloomLevels = lowPowerMode ? 4 : 8
  const bloomResolutionScale = lowPowerMode ? 0.35 : 0.5
  const bloomMipmapBlur = !lowPowerMode
  const composerMultisampling = lowPowerMode ? 0 : 2
  const blurEnabled = !lowPowerMode && controls.blurEnabled
  const grainEnabled = !lowPowerMode && controls.grainEnabled
  const effectiveGrainOpacity = grainEnabled ? controls.grainOpacity : 0
  const effectiveSmoothness = lowPowerMode
    ? Math.min(controls.smoothness, 12)
    : controls.smoothness
  const blurModeParam = useMemo(() => {
    if (typeof window === 'undefined') return null
    const value = new URLSearchParams(window.location.search).get('blur')
    if (value === 'css' || value === 'none') return value
    return null
  }, [])
  const blurScaleParam = useMemo(() => {
    if (typeof window === 'undefined') return 1
    const raw = new URLSearchParams(window.location.search).get('blurScale')
    const parsed = raw ? Number(raw) : 1
    return Number.isFinite(parsed) ? parsed : 1
  }, [])
  const blurMode = lowPowerMode ? 'none' : (blurModeParam ?? controls.blurMode)
  const browserBlurBoost = isFirefox ? 1.25 : isSafari ? 0.9 : 1.0
  const browserNoiseBoost = isFirefox || isSafari ? 1 : 1.0
  const browserSaturation = isFirefox || isSafari ? 1 : 2.5
  const blurScaleFactor = browserBlurBoost * blurScaleParam
  const saturationFactor = browserSaturation * controls.saturation

  const effectiveFov = controls.fov + scrollFov
  const effectiveBlur = blurMode === 'css'
    ? controls.backdropBlur * blurScale * (1 / effectiveDpr) * blurScaleFactor
    : 0
  const effectiveNoiseOpacity = lowPowerMode
    ? 0
    : controls.noiseOpacity * noiseScale * browserNoiseBoost
  const effectiveBloomThreshold = controls.bloomThreshold

  const mouseTrackingEnabled = activeSection !== 'contact' && !lowPowerMode
  const bloomMouseX = mouseTrackingEnabled ? (mouseBloom.x - 0.5) * 2 : 0
  const bloomMouseY = mouseTrackingEnabled ? (mouseBloom.y - 0.5) * 2 : 0
  const dynamicBloomIntensity = clamp(
    controls.bloomIntensity + bloomMouseX * 0.05 + bloomMouseY * 0.035,
    0,
    5
  )
  const dynamicBloomThreshold = clamp(
    effectiveBloomThreshold + bloomMouseY * 0.04,
    0,
    2
  )
  const dynamicBloomSmoothing = clamp(
    controls.bloomSmoothing + bloomMouseX * 0.05 - bloomMouseY * 0.02,
    0,
    2
  )
  const bloomRadiusScale = lowPowerMode ? 0.7 : 1
  const dynamicBloomRadius = clamp(
    controls.bloomRadius + bloomMouseX * 0.14,
    0,
    5
  ) * bloomRadiusScale
  const dynamicFresnelOffset = clamp(
    controls.fresnelOffset + bloomMouseX * 0.06 + bloomMouseY * 0.045,
    0,
    1
  )
  const dynamicSoftness = clamp(
    controls.softness + bloomMouseY * 0.08 + bloomMouseX * 0.04,
    0,
    0.5
  )

  useEffect(() => {
    if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 1, y: 0, clearProps: 'opacity,y' })
    }
    const ctx = gsap.context(() => {
      if (!heroContentRef.current || !projectsRef.current) return

      // Use matchMedia for responsive scroll triggers
      ScrollTrigger.matchMedia({
        // Desktop (1024px and up)
        "(min-width: 1024px)": function() {
          // Hero content fade during stopBC animation
          gsap.to(heroContentRef.current, {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: projectsRef.current,
              start: 'top top',
              end: '+=1400',
              scrub: 1,
              invalidateOnRefresh: true,
            }
          })

          // Animate stopBC gradient value to 0
          if (!lowPowerMode) {
            ScrollTrigger.create({
              trigger: projectsRef.current,
              start: 'top top',
              end: '+=900',
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                updateScrollStopBC(self.progress * 0.76)
              },
              onLeave: resetScrollStopBC,
              onLeaveBack: resetScrollStopBC,
            })
          }

          const projectsContainer = projectsRef.current.querySelector('.projects-container')
          if (projectsContainer) {
            gsap.set(projectsContainer, { xPercent: 100 })

            gsap.to(projectsContainer, {
              xPercent: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: projectsRef.current,
                start: 'top top',
                end: '+=1000',
                scrub: true,
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true,
              },
            })
          }
        },

        // Tablet (768px - 1023px)
        "(min-width: 768px) and (max-width: 1023px)": function() {
          // Hero content fade during stopBC animation
          gsap.to(heroContentRef.current, {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: projectsRef.current,
              start: 'top top',
              end: '+=1400',
              scrub: 1,
              invalidateOnRefresh: true,
            }
          })

          // Animate stopBC gradient value to 0
          if (!lowPowerMode) {
            ScrollTrigger.create({
              trigger: projectsRef.current,
              start: 'top top',
              end: '+=700',
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                updateScrollStopBC(self.progress * 0.76)
              },
              onLeave: resetScrollStopBC,
              onLeaveBack: resetScrollStopBC,
            })
          }

          const projectsContainer = projectsRef.current.querySelector('.projects-container')
          if (projectsContainer) {
            gsap.set(projectsContainer, { xPercent: 100 })

            gsap.to(projectsContainer, {
              xPercent: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: projectsRef.current,
                start: 'top top',
                end: '+=700',
                scrub: true,
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true,
              },
            })
          }
        },

        // Mobile (below 768px)
        "(max-width: 767px)": function() {
          // Hero content fade during stopBC animation
          gsap.to(heroContentRef.current, {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: projectsRef.current,
              start: 'top top',
              end: '+=1400',
              scrub: 1,
              invalidateOnRefresh: true,
            }
          })

          // Animate stopBC gradient value to 0
          if (!lowPowerMode) {
            ScrollTrigger.create({
              trigger: projectsRef.current,
              start: 'top top',
              end: '+=500',
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                updateScrollStopBC(self.progress * 0.76)
              },
              onLeave: resetScrollStopBC,
              onLeaveBack: resetScrollStopBC,
            })
          }

          const projectsContainer = projectsRef.current.querySelector('.projects-container')
          if (projectsContainer) {
            gsap.set(projectsContainer, { xPercent: 100 })

            gsap.to(projectsContainer, {
              xPercent: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: projectsRef.current,
                start: 'top top',
                end: '+=500',
                scrub: true,
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true,
              },
            })
          }
        },
      })

      // FOV animation removed - FOV now stays constant during scroll

      if (aboutRef.current && footerRef.current) {
        const footerEl = footerRef.current

        // Pin the about section while footer scrolls over it
        const getHoldDistance = () => {
          const isMobile = window.matchMedia("(max-width: 767px)").matches
          const isTablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches

          if (isMobile) return window.innerHeight * 1.5
          if (isTablet) return window.innerHeight * 2.2
          return window.innerHeight * 3.2
        }

        const getFooterHeight = () => {
          const height = footerEl.getBoundingClientRect().height || footerEl.offsetHeight || 0
          return height || window.innerHeight
        }

        const getFooterTotalDistance = () => getHoldDistance() + getFooterHeight()

        const hideFooter = () => {
          const footerHeight = getFooterHeight()
          footerEl.style.transform = `translateY(${footerHeight}px)`
        }

        gsap.set(aboutRef.current, { autoAlpha: 0 })

        // Initially hide footer below viewport
        hideFooter()

        ScrollTrigger.create({
          trigger: aboutRef.current,
          start: 'top top',
          end: () => `+=${getFooterTotalDistance()}`,
          pin: true,
          pinSpacing: true,
          id: 'about-pin',
          refreshPriority: 1,
          invalidateOnRefresh: true,
          onEnter: () => gsap.set(aboutRef.current, { autoAlpha: 1 }),
          onLeaveBack: () => gsap.set(aboutRef.current, { autoAlpha: 0 }),
        })

        // Control footer position - scroll it up to reveal
        ScrollTrigger.create({
          trigger: aboutRef.current,
          start: 'top top',
          end: () => `+=${getFooterTotalDistance()}`,
          id: 'footer-reveal',
          scrub: true,
          refreshPriority: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (!footerEl) return
            const footerHeight = getFooterHeight()
            const holdDistance = getHoldDistance()
            const footerTotalDistance = holdDistance + footerHeight

            // Keep footer hidden during hold distance, then reveal
            const holdProgress = holdDistance / footerTotalDistance

            if (self.progress < holdProgress) {
              // Still in hold phase - keep footer below viewport
              footerEl.style.transform = `translateY(${footerHeight}px)`
            } else {
              // Calculate reveal progress after hold
              const revealProgress = (self.progress - holdProgress) / (1 - holdProgress)
              const translateY = footerHeight * (1 - revealProgress)
              footerEl.style.transform = `translateY(${translateY}px)`
            }
          },
          onLeave: () => {
            if (!footerEl) return
            footerEl.style.transform = 'translateY(0px)'
          },
          onLeaveBack: () => {
            if (!footerEl) return
            hideFooter()
          }
        })

        const aboutSection = aboutRef.current.querySelector('.make-live-section')
        const aboutText = aboutRef.current.querySelector('.make-live-text')
        const aboutPortrait = aboutRef.current.querySelector('.make-live-portrait')
        const aboutLists = aboutRef.current.querySelector('.make-live-lists')
        const aboutCta = aboutRef.current.querySelector('.make-live-cta')

        if (aboutSection && aboutText && aboutPortrait && aboutLists && aboutCta) {
          gsap.set([aboutText, aboutPortrait, aboutLists, aboutCta], { opacity: 0 })

          // Responsive start and end positions
          let startOffset, endDistance
          if (isMobile) {
            startOffset = 150
            endDistance = 500
          } else if (isTablet) {
            startOffset = 200
            endDistance = 700
          } else {
            startOffset = 300
            endDistance = 900
          }

          const aboutTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: aboutSection,
              start: `top top+=${startOffset}`,
              end: `+=${endDistance}`,
              scrub: true,
              id: 'about-fadein',
              invalidateOnRefresh: true,
              refreshPriority: 0,
            },
          })

          aboutTimeline
            .to(aboutText, { opacity: 1, duration: 0.3 })
            .to(aboutPortrait, { opacity: 1, duration: 0.3 }, 0.1)
            .to(aboutLists, { opacity: 1, duration: 0.3 }, 0.2)
            .to(aboutCta, { opacity: 1, duration: 0.3 }, 0.3)
        }

        ScrollTrigger.refresh()
      }

      if (heroSectionRef.current) {
        ScrollTrigger.create({
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom center',
          onEnter: () => setActiveSection('home'),
          onEnterBack: () => setActiveSection('home'),
        })
      }

      if (projectsRef.current) {
        ScrollTrigger.create({
          trigger: projectsRef.current,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection('projects'),
          onEnterBack: () => setActiveSection('projects'),
        })
      }

      if (aboutRef.current) {
        ScrollTrigger.create({
          trigger: aboutRef.current,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection('about'),
          onEnterBack: () => setActiveSection('about'),
        })
      }

      if (footerRef.current) {
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection('contact'),
          onEnterBack: () => setActiveSection('contact'),
        })
      }

      if (canvasWrapperRef.current && footerRef.current) {
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => canvasWrapperRef.current?.classList.add('canvas-disabled'),
          onEnterBack: () => canvasWrapperRef.current?.classList.add('canvas-disabled'),
          onLeaveBack: () => canvasWrapperRef.current?.classList.remove('canvas-disabled'),
          onLeave: () => canvasWrapperRef.current?.classList.remove('canvas-disabled'),
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])


  if (preloadBlocking && !assetsReady) {
    return (
      <div className="asset-preload">
        <div className="asset-preload-inner">Loading assets...</div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="stage"
      style={{ '--content-total-width': widthFormula }}
      onPointerMove={handleHeroPointerMove}
      onPointerLeave={handleHeroPointerLeave}
    >
      {/* Leva Debug Panel - Force Visible */}
      <Leva
        collapsed={false}
        hidden={false}
        fill={false}
        flat={false}
        oneLineLabels={false}
        hideTitleBar={false}
      />

      <Header innerRef={headerRef} activeSection={activeSection} />

      {/* Sticky Hero Section */}
      <div
        ref={heroSectionRef}
        id="home"
        className="hero-section"
      >
        <HeroTextOverlay opacity={introTextOpacity} />
        <div
          ref={heroContentRef}
          className="hero-overlay"
          style={{ opacity: 1, pointerEvents: 'auto' }}
        >
          <IntroText paddingX={controls.introPaddingX} />
          <DesignEngineer />
          {/*
            <FloatingTabs
              enabled={controls.tabsEnabled}
              floatAmpX={controls.tabsFloatAmpX}
              floatAmpY={controls.tabsFloatAmpY}
              floatSpeedX={controls.tabsFloatSpeedX}
              floatSpeedY={controls.tabsFloatSpeedY}
              hoverScale={controls.tabsHoverScale}
              dragScale={controls.tabsDragScale}
              arrowWiggle={controls.tabsArrowWiggle}
              arrowDelayOffset={controls.tabsArrowDelayOffset}
            />
          */}
        </div>

        <div
          className="canvas-wrapper"
          ref={canvasWrapperRef}
          style={{
            '--canvas-blur': `${effectiveBlur}px`,
            '--noise-opacity': effectiveNoiseOpacity,
            '--canvas-saturation': saturationFactor,
            opacity: canvasOpacity,
          }}
        >
          <Scene
            cubeProps={{
              ...controls,
              stopBC: controls.stopBC,
              softness: dynamicSoftness,
              fresnelOffset: dynamicFresnelOffset,
              smoothness: effectiveSmoothness,
            }}
            scrollStopBCRef={scrollStopBCRef}
            scrollStopBCTargetRef={scrollStopBCTargetRef}
            scrollStopBCBaseRef={scrollStopBCBaseRef}
            scrollStopBCBaselinePendingRef={scrollStopBCBaselinePendingRef}
            mouseActivityRef={mouseActivityRef}
            bloomIntensity={dynamicBloomIntensity}
            bloomThreshold={dynamicBloomThreshold}
            bloomSmoothing={dynamicBloomSmoothing}
            bloomRadius={dynamicBloomRadius}
            bloomLevels={bloomLevels}
            bloomMipmapBlur={bloomMipmapBlur}
            bloomResolutionScale={bloomResolutionScale}
            composerMultisampling={composerMultisampling}
            blurEnabled={blurEnabled}
            blurStrength={controls.blurStrength}
            blurTaper={controls.blurTaper}
            blurSamples={controls.blurSamples}
            grainEnabled={grainEnabled}
            grainOpacity={effectiveGrainOpacity}
            grainBlend={controls.grainBlend}
            camX={controls.camX}
            camY={controls.camY}
            camZ={controls.camZ}
            targetX={controls.targetX}
            targetY={controls.targetY}
            targetZ={controls.targetZ}
            fov={effectiveFov}
            minDistance={controls.minDistance}
            maxDistance={controls.maxDistance}
            enablePan={controls.enablePan}
            dpr={effectiveDpr}
            lowPowerMode={lowPowerMode}
            showPerf={showPerf}
          />
        </div>
      </div>

      {/* Projects Section - Slides up */}
      <div ref={projectsRef} id="projects" className="projects-wrapper">
        <Projects />
      </div>

      {/* Make Code Live content */}
      <div ref={aboutRef} id="about">
        <MakeCodeLiveSection />
      </div>

      <div ref={footerRef} id="contact" className="footer-layer">
        <Footer data={footerData} />
      </div>
    </div>
  )
}

export default App
