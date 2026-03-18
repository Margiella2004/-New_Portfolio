import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, TiltShift2, Noise } from '@react-three/postprocessing'
import { LevaPanel, useControls, folder, useCreateStore } from 'leva'
import { Color } from 'three'
import { BlendFunction } from 'postprocessing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { Iridescence } from './IridescenceMaterial'
import HeaderNew from './components/HeaderNew'
import IntroText from './IntroText'
import DesignEngineer from './DesignEngineer'
import HeroTextOverlay from './HeroTextOverlay'
import Projects from './Projects'
import { preloadAssets } from './preloadAssets'
import './App.css'
import heroLogo from '../img_assets/logo.svg'
import useHeaderBlend from './hooks/useHeaderBlend'

gsap.registerPlugin(ScrollTrigger)

const INTRO_BLOOM_START = {
  threshold: 1.35,
  smoothing: 1.65,
  radius: 3.0,
}
const INTRO_BLOOM_PEAK_DELTA = {
  threshold: 0.5,
  smoothing: 0.35,
  radius: 1.2,
}
const INTRO_BLOOM_PEAK_DELAY = 0.5
const INTRO_BLOOM_PEAK_DURATION = 1.8
const INTRO_BLOOM_RETURN_DURATION = 1.8
const INTRO_FRESNEL_START = 0.09
const INTRO_FRESNEL_PEAK_DELTA = 0.5
const INTRO_FRESNEL_PEAK_DURATION = 1.8
const INTRO_FRESNEL_RETURN_DURATION = 1.8
const INTRO_TEXT_START_DELAY = 0
const INTRO_TEXT_FADE_DURATION = 0.25
const INTRO_TEXT_VISIBLE_DURATION = 2.5
const INTRO_HEADER_FADE_START = 2.6
const INTRO_HEADER_FADE_DURATION = 0.4

let introHasRunOnce = false

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
  const homeLevaStore = useCreateStore()
  // Container ref for scroll structure
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const heroContentRef = useRef(null)
  const heroEndRef = useRef(null)
  const heroSectionRef = useRef(null)
  const projectsSectionRef = useRef(null)
  const canvasWrapperRef = useRef(null)
  const introTimelineRef = useRef(null)
  const introHasRunRef = useRef(false)
  const introActiveRef = useRef(false)

  const enableScrollStopBC = false
  const [introTextOpacity, setIntroTextOpacity] = useState(0)
  const [introBloom, setIntroBloom] = useState({ ...INTRO_BLOOM_START })
  const [introFresnelOffset, setIntroFresnelOffset] = useState(INTRO_FRESNEL_START)
  const [introActive, setIntroActive] = useState(true)
  const scrollFov = 0
  const scrollStopBCRef = useRef(0)
  const scrollStopBCTargetRef = useRef(0)
  const scrollStopBCBaseRef = useRef(null)
  const scrollStopBCBaselinePendingRef = useRef(null)
  const scrollStopBCMetaRef = useRef({ time: 0, value: 0 })
  const [activeSection, setActiveSection] = useState('home')
  const headerBlendActive = useHeaderBlend(headerRef)
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

  useEffect(() => {
    if (!lowPowerMode) return
    scrollStopBCRef.current = 0
    scrollStopBCTargetRef.current = 0
    scrollStopBCBaseRef.current = null
    scrollStopBCBaselinePendingRef.current = null
    scrollStopBCMetaRef.current = { time: 0, value: 0 }
  }, [lowPowerMode])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    if (lowPowerMode) return undefined

    const lenis = new Lenis({
      duration: 0.5,
      lerp: 0.32,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.6,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [lowPowerMode])

  useEffect(() => {
    let range = {
      start: 0,
      end: 0,
      distance: 0,
      ready: false,
    }
    let rafId = 0
    let ticking = false

    const getDistance = () => {
      if (window.innerWidth >= 1024) return 900
      if (window.innerWidth >= 768) return 700
      return 500
    }

    const computeRange = () => {
      const distance = getDistance()
      return {
        start: 0,
        end: distance,
        distance,
        ready: true,
      }
    }

    const update = () => {
      if (!range.ready) {
        range = computeRange()
        if (!range.ready) return
      }

      const y = window.scrollY
      const clampedY = Math.max(range.start, Math.min(y, range.end))
      const progress = range.distance ? (clampedY - range.start) / range.distance : 0
      if (enableScrollStopBC) {
        updateScrollStopBC(progress * 0.76)
      }

      if (heroContentRef.current) {
        if (introActive) {
          heroContentRef.current.style.opacity = '0'
          return
        }

        heroContentRef.current.style.opacity = '1'
      }
    }

    const scheduleUpdate = () => {
      if (ticking) return
      ticking = true
      rafId = requestAnimationFrame(() => {
        update()
        ticking = false
      })
    }

    const handleResize = () => {
      range = computeRange()
      scheduleUpdate()
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', handleResize)
    range = computeRange()
    scheduleUpdate()

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', handleResize)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [
    enableScrollStopBC,
    introActive,
    updateScrollStopBC,
  ])

  useEffect(() => {
    if (typeof window === 'undefined' || !heroEndRef.current) return undefined

    let heroRange = {
      start: 0,
      end: 0,
      distance: 0,
      ready: false,
    }
    let rafId = 0
    let ticking = false

    const getHeroFadeDistance = () => {
      if (window.innerWidth >= 1024) return 1400
      if (window.innerWidth >= 768) return 1400
      return 1400
    }

    const computeHeroRange = () => {
      const distance = getHeroFadeDistance()
      return {
        start: 0,
        end: distance,
        distance,
        ready: true,
      }
    }

    const update = () => {
      if (!heroRange.ready) {
        heroRange = computeHeroRange()
      }
      const y = window.scrollY
      const heroClampedY = Math.max(heroRange.start, Math.min(y, heroRange.end))
      const heroProgress = heroRange.distance
        ? (heroClampedY - heroRange.start) / heroRange.distance
        : 0

      if (introActiveRef.current) {
        heroEndRef.current.style.opacity = '0'
        heroEndRef.current.style.pointerEvents = 'none'
        return
      }

      const revealStart = 0.7
      const revealProgress = Math.min(
        1,
        Math.max(0, (heroProgress - revealStart) / (1 - revealStart))
      )
      heroEndRef.current.style.opacity = String(revealProgress)
      heroEndRef.current.style.pointerEvents = revealProgress > 0.1 ? 'auto' : 'none'
      heroEndRef.current.style.setProperty(
        '--hero-end-offset',
        `${(1 - revealProgress) * 16}px`
      )
    }

    const scheduleUpdate = () => {
      if (ticking) return
      ticking = true
      rafId = requestAnimationFrame(() => {
        update()
        ticking = false
      })
    }

    const handleResize = () => {
      heroRange = computeHeroRange()
      scheduleUpdate()
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', handleResize)
    heroRange = computeHeroRange()
    scheduleUpdate()

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', handleResize)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])


  useEffect(() => {
    let active = true
    preloadAssets().then(() => {
      if (active) setAssetsReady(true)
    })
    return () => {
      active = false
    }
  }, [])

  const defaultBackdropBlur = isChromium ? 73 : 128
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
        bloomIntensity: { value: 0.3, min: 0, max: 5, step: 0.01 },
        bloomThreshold: { value: 0.98, min: 0, max: 2, step: 0.01 },
        bloomSmoothing: { value: 1.49, min: 0, max: 2, step: 0.01 },
        bloomRadius: { value: 2.26, min: 0, max: 5, step: 0.01 },
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
        camZ: { value: 5.2, min: -20, max: 20, step: 0.1, label: 'pos Z' },
        targetX: { value: -0.2, min: -10, max: 10, step: 0.05, label: 'target X' },
        targetY: { value: 0.0, min: -10, max: 10, step: 0.05, label: 'target Y' },
        targetZ: { value: -0.8, min: -10, max: 10, step: 0.05, label: 'target Z' },
        fov: { value: defaultFov, min: 5, max: 120, step: 1 },
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
  }, { store: homeLevaStore })

  useEffect(() => {
    introActiveRef.current = introActive
  }, [introActive])

  useEffect(() => {
    const skipIntro =
      typeof window !== 'undefined' &&
      window.sessionStorage?.getItem('skipIntro') === '1'
    const currentHash = typeof window !== 'undefined' ? window.location.hash : ''
    const isHomeTab = !currentHash || currentHash === '#home'

    if (skipIntro || !isHomeTab) {
      window.sessionStorage?.removeItem('skipIntro')
      introHasRunRef.current = true
      introHasRunOnce = true
      setIntroActive(false)
      setIntroTextOpacity(0)
      setIntroBloom({
        threshold: controls.bloomThreshold,
        smoothing: controls.bloomSmoothing,
        radius: controls.bloomRadius,
      })
      setIntroFresnelOffset(controls.fresnelOffset)
      return undefined
    }

    if (introHasRunRef.current || introHasRunOnce) {
      introHasRunRef.current = true
      setIntroActive(false)
      setIntroTextOpacity(0)
      setIntroBloom({
        threshold: controls.bloomThreshold,
        smoothing: controls.bloomSmoothing,
        radius: controls.bloomRadius,
      })
      setIntroFresnelOffset(controls.fresnelOffset)
      return undefined
    }

    introHasRunRef.current = true
    introHasRunOnce = true

    const body = document.body
    const html = document.documentElement
    const previousBodyOverflow = body.style.overflow
    const previousHtmlOverflow = html.style.overflow
    const clampValue = (value, min, max) => Math.min(max, Math.max(min, value))
    const bloomStart = {
      threshold: INTRO_BLOOM_START.threshold,
      smoothing: INTRO_BLOOM_START.smoothing,
      radius: INTRO_BLOOM_START.radius,
    }
    const bloomBase = {
      threshold: controls.bloomThreshold,
      smoothing: controls.bloomSmoothing,
      radius: controls.bloomRadius,
    }
    const bloomPeak = {
      threshold: clampValue(
        bloomBase.threshold - INTRO_BLOOM_PEAK_DELTA.threshold,
        0,
        2
      ),
      smoothing: clampValue(
        bloomBase.smoothing - INTRO_BLOOM_PEAK_DELTA.smoothing,
        0,
        2
      ),
      radius: clampValue(
        bloomBase.radius - INTRO_BLOOM_PEAK_DELTA.radius,
        0,
        5
      ),
    }
    const bloomState = { ...bloomStart }
    const fresnelBase = controls.fresnelOffset
    const fresnelPeak = clampValue(
      fresnelBase - INTRO_FRESNEL_PEAK_DELTA,
      0,
      1
    )
    const fresnelState = { offset: INTRO_FRESNEL_START }
    const textState = { opacity: 0 }

    setIntroActive(true)
    setIntroBloom({ ...bloomStart })
    setIntroFresnelOffset(INTRO_FRESNEL_START)
    setIntroTextOpacity(0)

    if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 0, y: -10, pointerEvents: 'none' })
    }
    if (heroContentRef.current) {
      gsap.set(heroContentRef.current, { opacity: 0, pointerEvents: 'none' })
    }

    body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        setIntroBloom({
          threshold: controls.bloomThreshold,
          smoothing: controls.bloomSmoothing,
          radius: controls.bloomRadius,
        })
        setIntroFresnelOffset(controls.fresnelOffset)
        setIntroActive(false)
        setIntroTextOpacity(0)
        body.style.overflow = previousBodyOverflow
        html.style.overflow = previousHtmlOverflow
      },
    })
    introTimelineRef.current = tl

    tl.to(
      bloomState,
      {
        threshold: bloomPeak.threshold,
        smoothing: bloomPeak.smoothing,
        radius: bloomPeak.radius,
        duration: INTRO_BLOOM_PEAK_DURATION,
        ease: 'power2.inOut',
        onUpdate: () => setIntroBloom({ ...bloomState }),
      },
      INTRO_BLOOM_PEAK_DELAY
    ).to(
      bloomState,
      {
        threshold: bloomBase.threshold,
        smoothing: bloomBase.smoothing,
        radius: bloomBase.radius,
        duration: INTRO_BLOOM_RETURN_DURATION,
        ease: 'power2.inOut',
        onUpdate: () => setIntroBloom({ ...bloomState }),
      },
      '>'
    )

    tl.to(
      fresnelState,
      {
        offset: fresnelPeak,
        duration: INTRO_FRESNEL_PEAK_DURATION,
        ease: 'power2.inOut',
        onUpdate: () => setIntroFresnelOffset(fresnelState.offset),
      },
      INTRO_BLOOM_PEAK_DELAY
    ).to(
      fresnelState,
      {
        offset: fresnelBase,
        duration: INTRO_FRESNEL_RETURN_DURATION,
        ease: 'power2.inOut',
        onUpdate: () => setIntroFresnelOffset(fresnelState.offset),
      },
      '>'
    )

    tl.to(
      textState,
      {
        opacity: 1,
        duration: INTRO_TEXT_FADE_DURATION,
        ease: 'power2.inOut',
        onUpdate: () => setIntroTextOpacity(textState.opacity),
      },
      INTRO_TEXT_START_DELAY
    ).to(
      textState,
      {
        opacity: 0,
        duration: INTRO_TEXT_FADE_DURATION,
        ease: 'power2.inOut',
        onUpdate: () => setIntroTextOpacity(textState.opacity),
      },
      INTRO_TEXT_START_DELAY + INTRO_TEXT_VISIBLE_DURATION
    )

    if (heroContentRef.current) {
      tl.to(
        heroContentRef.current,
        {
          opacity: 1,
          duration: INTRO_HEADER_FADE_DURATION,
          ease: 'power2.inOut',
          onStart: () => {
            heroContentRef.current.style.pointerEvents = 'auto'
          },
        },
        INTRO_HEADER_FADE_START
      )
    }

    return () => {
      tl.kill()
      body.style.overflow = previousBodyOverflow
      html.style.overflow = previousHtmlOverflow
      if (import.meta.env.DEV) {
        introHasRunRef.current = false
        introHasRunOnce = false
      }
    }
  }, [
    controls.bloomRadius,
    controls.bloomSmoothing,
    controls.bloomThreshold,
    controls.fresnelOffset,
  ])

  useEffect(() => {
    if (lowPowerMode) return undefined
    const frameInterval = 1000 / 30

    const tick = () => {
      const now = performance.now()
      const lastMouse = mouseActivityRef.current
      if (lastMouse && now - lastMouse > 500) {
        mouseBloomTargetRef.current = { x: 0.5, y: 0.5 }
        mouseActivityRef.current = 0
      }
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
    console.log('App render pipeline: Hero section only')
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
  const introBloomActive = introActive
  const baseBloomThreshold = introBloomActive
    ? introBloom?.threshold ?? controls.bloomThreshold
    : controls.bloomThreshold
  const baseBloomSmoothing = introBloomActive
    ? introBloom?.smoothing ?? controls.bloomSmoothing
    : controls.bloomSmoothing
  const baseBloomRadius = introBloomActive
    ? introBloom?.radius ?? controls.bloomRadius
    : controls.bloomRadius
  const baseFresnelOffset = introBloomActive
    ? introFresnelOffset ?? controls.fresnelOffset
    : controls.fresnelOffset

  const mouseTrackingEnabled =
    activeSection === 'home' &&
    !lowPowerMode &&
    !introActive
  const bloomMouseX = mouseTrackingEnabled ? (mouseBloom.x - 0.5) * 2 : 0
  const bloomMouseY = mouseTrackingEnabled ? (mouseBloom.y - 0.5) * 2 : 0
  const dynamicBloomIntensity = clamp(
    controls.bloomIntensity + bloomMouseX * 0.05 + bloomMouseY * 0.035,
    0,
    5
  )
  const dynamicBloomThreshold = clamp(
    baseBloomThreshold + bloomMouseY * 0.04,
    0,
    2
  )
  const dynamicBloomSmoothing = clamp(
    baseBloomSmoothing + bloomMouseX * 0.05 - bloomMouseY * 0.02,
    0,
    2
  )
  const bloomRadiusScale = lowPowerMode ? 0.7 : 1
  const dynamicBloomRadius = clamp(
    baseBloomRadius + bloomMouseX * 0.14,
    0,
    5
  ) * bloomRadiusScale
  const dynamicFresnelOffset = clamp(
    baseFresnelOffset + bloomMouseX * 0.06 + bloomMouseY * 0.045,
    0,
    1
  )
  const dynamicSoftness = clamp(
    controls.softness + bloomMouseY * 0.08 + bloomMouseX * 0.04,
    0,
    0.5
  )

  useEffect(() => {
    if (!headerRef.current) return undefined

    if (introActive) {
      gsap.set(headerRef.current, { opacity: 0, y: -10, pointerEvents: 'none' })
      return undefined
    }

    gsap.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: INTRO_HEADER_FADE_DURATION,
      ease: 'power2.inOut',
      overwrite: 'auto',
      onStart: () => {
        if (headerRef.current) {
          headerRef.current.style.pointerEvents = 'auto'
        }
      },
      onComplete: () => {
        if (headerRef.current) {
          gsap.set(headerRef.current, { clearProps: 'opacity,y' })
        }
      },
    })
  }, [introActive])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroContentRef.current) return

      ScrollTrigger.refresh()
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('scrolltrigger-ready'))
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!heroSectionRef.current) {
      return undefined
    }

    const getAbsoluteTop = (element) => {
      let top = 0
      let node = element
      while (node) {
        top += node.offsetTop || 0
        node = node.offsetParent
      }
      return top
    }

    const getHeaderOffset = () => {
      const header = headerRef.current || document.querySelector('.header')
      if (!header) return 0
      const rect = header.getBoundingClientRect()
      const extraOffset = 8
      return rect.height + Math.max(rect.top, 0) + extraOffset
    }

    const sections = [
      { id: 'home', element: heroSectionRef.current },
      { id: 'projects', element: projectsSectionRef.current },
    ].filter((section) => section.element)

    let rafId = null

    const updateActiveSection = () => {
      const offset = getHeaderOffset() + 4
      const scrollPosition = window.scrollY + offset
      let nextSection = sections[0]?.id || 'home'

      for (const section of sections) {
        const sectionTop = getAbsoluteTop(section.element)
        if (scrollPosition >= sectionTop) {
          nextSection = section.id
        } else {
          break
        }
      }

      setActiveSection((current) =>
        current === nextSection ? current : nextSection
      )
    }

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
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
      <LevaPanel
        store={homeLevaStore}
        collapsed={false}
        hidden={false}
        fill={false}
        flat={false}
        oneLineLabels={false}
        hideTitleBar={false}
        titleBar={{ title: 'Home 3D', drag: true, filter: true }}
      />

      <HeaderNew
        innerRef={headerRef}
        activeSection={activeSection}
        blendActive={headerBlendActive}
        hidden={introActive}
      />

      {/* Sticky Hero Section */}
      <div
        ref={heroSectionRef}
        id="home"
        className="hero-section"
      >
        <HeroTextOverlay
          autoplayOverride={true}
          opacity={introTextOpacity}
          startDelay={INTRO_TEXT_START_DELAY}
          levaStore={homeLevaStore}
        />
        <div
          ref={heroContentRef}
          className="hero-overlay"
          style={{ opacity: 1, pointerEvents: 'auto' }}
        >
          <IntroText paddingX={controls.introPaddingX} />
          <DesignEngineer />
        </div>

        <div ref={heroEndRef} className="hero-end-callout" aria-hidden="true">
          <img src={heroLogo} alt="" className="hero-end-logo" />
          <div className="hero-end-text">
            <p className="hero-end-title">Call me beep me if you want to reach me</p>
            <p className="hero-end-email">jonatharameshdesign@gmail.com</p>
          </div>
        </div>

        <div
          className="canvas-wrapper"
          ref={canvasWrapperRef}
          style={{
            '--canvas-blur': `${effectiveBlur}px`,
            '--noise-opacity': effectiveNoiseOpacity,
            '--canvas-saturation': saturationFactor,
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
          />
        </div>
      </div>

      <div
        ref={projectsSectionRef}
        id="projects"
        className="projects-wrapper"
      >
        <Projects />
      </div>

    </div>
  )
}

export default App
