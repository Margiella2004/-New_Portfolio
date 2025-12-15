import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { RoundedBox, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, TiltShift2, Noise } from '@react-three/postprocessing'
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
import './App.css'

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
}) {
  const controlsRef = useRef(null)

  useEffect(() => {
    if (!controlsRef.current) return
    controlsRef.current.target.set(targetX, targetY, targetZ)
    controlsRef.current.update()
  }, [targetX, targetY, targetZ])

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.1}
      minDistance={minDistance}
      maxDistance={maxDistance}
      enablePan={enablePan}
    />
  )
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
}) {
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

  const [canvasOpacity, setCanvasOpacity] = useState(0)
  const [introTextOpacity, setIntroTextOpacity] = useState(1)
  const [animatedFov, setAnimatedFov] = useState(111)
  const [animatedBlur, setAnimatedBlur] = useState(8)
  const [animatedBloomThreshold, setAnimatedBloomThreshold] = useState(1.13)
  const [introComplete, setIntroComplete] = useState(false)
  const [scrollFov, setScrollFov] = useState(0)
  const textFadeStartedRef = useRef(false)

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
        fov: { value: 10, min: 10, max: 120, step: 1 },
        minDistance: { value: 7.3, min: 0.1, max: 20, step: 0.1 },
        maxDistance: { value: 33.0, min: 0.1, max: 50, step: 0.1 },
        enablePan: { value: true },
      },
      { collapsed: false }
    ),
    Background: folder(
      {
        backdropBlur: { value: 130, min: 0, max: 300, step: 1, label: 'canvas blur' },
        noiseOpacity: { value: 0.10, min: 0, max: 0.5, step: 0.01, label: 'texture' },
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

  const introTargetsRef = useRef({
    fov: controls.fov,
    blur: controls.backdropBlur,
    bloomThreshold: controls.bloomThreshold,
  })

  useEffect(() => {
    introTargetsRef.current = {
      fov: controls.fov,
      blur: controls.backdropBlur,
      bloomThreshold: controls.bloomThreshold,
    }
  }, [controls.fov, controls.backdropBlur, controls.bloomThreshold])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const html = document.documentElement
    const body = document.body
    const previousBodyOverflow = body.style.overflow
    const previousHtmlOverflow = html.style.overflow

    body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'

    const animState = { fov: 111, blur: 8, bloomThreshold: 1.13 }

    if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 0, y: -10, pointerEvents: 'none' })
    }
    if (heroContentRef.current) {
      gsap.set(heroContentRef.current, { opacity: 0, pointerEvents: 'none' })
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        setIntroComplete(true)
        body.style.overflow = previousBodyOverflow
        html.style.overflow = previousHtmlOverflow
      },
    })

    tl.to({}, { duration: 0.9 }, 0)
      .to(
        {},
        {
          duration: 1.2,
          ease: 'power2.out',
          onUpdate() {
            setCanvasOpacity(this.progress())
          },
        },
        0.9
      )
      .to({}, { duration: 5.3 }, '>')
      .to({}, { duration: 1.5 }, '>')
      .to(
        {},
        {
          duration: 0.8,
          ease: 'power2.inOut',
          onUpdate() {
            textFadeStartedRef.current = true
            setIntroTextOpacity(1 - this.progress())
          },
        },
        '>'
      )
      .to(
        animState,
        {
          fov: introTargetsRef.current.fov,
          duration: 5,
          ease: 'expo.out',
          onUpdate: () => setAnimatedFov(animState.fov),
        },
        '>'
      )
      .to(
        animState,
        {
          blur: introTargetsRef.current.blur,
          duration: 3,
          ease: 'expo.in',
          onUpdate: () => setAnimatedBlur(animState.blur),
        },
        '<'
      )
      .to(
        animState,
        {
          bloomThreshold: introTargetsRef.current.bloomThreshold,
          duration: 5,
          ease: 'power2.inOut',
          onUpdate: () => setAnimatedBloomThreshold(animState.bloomThreshold),
        },
        '<'
      )
      .add(() => {
        if (headerRef.current) {
          gsap.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            onStart: () => {
              headerRef.current.style.pointerEvents = 'auto'
            },
          })
        }
        if (heroContentRef.current) {
          gsap.to(heroContentRef.current, {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            onStart: () => {
              heroContentRef.current.style.pointerEvents = 'auto'
            },
          })
        }
      }, '-=1')

    return () => {
      tl.kill()
      body.style.overflow = previousBodyOverflow
      html.style.overflow = previousHtmlOverflow
    }
  }, [])

  // Debug logging for Design Engineer width calculation
  const paddingValue = controls.introPaddingX
  const paddingTotal = paddingValue * 2
  const widthFormula = `calc(90vw - ${paddingTotal}px)`

  console.log('========== DESIGN ENGINEER WIDTH DEBUG ==========')
  console.log('Padding (one side):', paddingValue, 'px')
  console.log('Padding (both sides):', paddingTotal, 'px')
  console.log('Width Formula:', widthFormula)
  console.log('Viewport Width:', window.innerWidth, 'px')
  console.log('90% of Viewport:', window.innerWidth * 0.9, 'px')
  console.log('Expected Final Width:', (window.innerWidth * 0.9) - paddingTotal, 'px')
  console.log('=================================================')
  console.log('App render pipeline: Hero -> Projects -> MakeCodeLiveSection')

  const effectiveFov = introComplete ? controls.fov + scrollFov : animatedFov
  const effectiveBlur = introComplete ? controls.backdropBlur : animatedBlur
  const effectiveBloomThreshold = introComplete ? controls.bloomThreshold : animatedBloomThreshold

  useEffect(() => {
    if (!introComplete) return undefined
    if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 1, y: 0, clearProps: 'opacity,y' })
    }
    const ctx = gsap.context(() => {
      if (!heroContentRef.current || !projectsRef.current) return

      ScrollTrigger.create({
        trigger: projectsRef.current,
        start: 'top top',
        end: 'top top',
        onEnter: () => {
          gsap.to(heroContentRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: 'power1.out',
          })
        },
        onLeaveBack: () => {
          gsap.to(heroContentRef.current, {
            opacity: 1,
            duration: 0.4,
            ease: 'power1.out',
          })
        },
      })

      // FOV increase as scrolling from hero to projects
      if (heroSectionRef.current && projectsRef.current) {
        ScrollTrigger.create({
          trigger: projectsRef.current,
          start: 'top bottom',
          end: 'top top',
          markers: true,
          id: 'fov-increase',
          scrub: 1,
          onUpdate: (self) => {
            const fovIncrease = self.progress * 5 // Increase FOV by max 5
            setScrollFov(fovIncrease)
          }
        })
      }

      if (aboutRef.current) {
        // Pin the about section - keep it pinned until FOV returns to normal
        ScrollTrigger.create({
          trigger: aboutRef.current,
          start: 'top top',
          end: '+=100%', // Pin for full viewport height
          pin: true,
          pinSpacing: true, // This creates space so footer doesn't scroll up
          markers: true,
          id: 'about-pin',
        })

        // FOV decrease through about section to bring cube back
        ScrollTrigger.create({
          trigger: aboutRef.current,
          start: 'top top',
          end: '+=100%',
          markers: true,
          id: 'fov-decrease',
          scrub: 0,
          onUpdate: (self) => {
            const fovDecrease = 5 - (self.progress * 5) // Decrease from 5 back to 0
            setScrollFov(fovDecrease)
          }
        })
      }

      if (canvasWrapperRef.current && footerRef.current) {
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => canvasWrapperRef.current.classList.add('canvas-disabled'),
          onEnterBack: () => canvasWrapperRef.current.classList.add('canvas-disabled'),
          onLeaveBack: () => canvasWrapperRef.current.classList.remove('canvas-disabled'),
          onLeave: () => canvasWrapperRef.current.classList.remove('canvas-disabled'),
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [introComplete])

  return (
    <div ref={containerRef} className="stage" style={{ '--content-total-width': widthFormula }}>
      <Header innerRef={headerRef} />
      <Leva collapsed={false} />

      {/* Sticky Hero Section */}
      <div ref={heroSectionRef} id="home" className="hero-section">
        <HeroTextOverlay opacity={introTextOpacity} />
        <div
          ref={heroContentRef}
          className="hero-overlay"
          style={{ opacity: 0, pointerEvents: 'none' }}
        >
          <IntroText paddingX={controls.introPaddingX} />
          <DesignEngineer />
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
        </div>

        <div
          className="canvas-wrapper"
          ref={canvasWrapperRef}
          style={{
            '--canvas-blur': `${effectiveBlur}px`,
            '--noise-opacity': controls.noiseOpacity,
            opacity: canvasOpacity,
          }}
        >
          <Scene
            cubeProps={controls}
            bloomIntensity={controls.bloomIntensity}
            bloomThreshold={effectiveBloomThreshold}
            bloomSmoothing={controls.bloomSmoothing}
            bloomRadius={controls.bloomRadius}
            blurEnabled={controls.blurEnabled}
            blurStrength={controls.blurStrength}
            blurTaper={controls.blurTaper}
            blurSamples={controls.blurSamples}
            grainEnabled={controls.grainEnabled}
            grainOpacity={controls.grainOpacity}
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
