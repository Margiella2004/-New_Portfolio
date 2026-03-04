import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { LevaPanel, useControls, useCreateStore } from 'leva'
import GradientPlanes from './GradientPlanes'
import RotatingTitles3D from './RotatingTitles3D'
import CameraController from './CameraController'
import EditorialOverlay from './EditorialOverlay'
import { useSharedTexturesWithRenderer } from '../hooks/useSharedTextures'
import { CONTROL_DEFAULTS } from '../config/controlDefaults'
import { getAdaptedProjects, getProjectImageUrls } from '../adapters/projectAdapter'
import './Projects3D.css'

// Inner scene component that has access to the renderer
function Scene3D({
  imageUrls,
  controlSettings,
  transparentBackground,
  onActiveIndexChange,
  onScrollChange,
  onNavigate,
  onTransitionStateChange,
  scrollProgressRef,
  projectTitles,
}) {
  const { textures } = useSharedTexturesWithRenderer(imageUrls)

  return (
    <>
      {!transparentBackground ? <color attach="background" args={[controlSettings.scene.background]} /> : null}
      <CameraController cameraControls={controlSettings.cameraControls} />
      <GradientPlanes
        scene={controlSettings.scene}
        geometry={controlSettings.geometry}
        scroll={controlSettings.scroll}
        material={controlSettings.material}
        trig={controlSettings.trig}
        fragment={controlSettings.fragment}
        interaction={controlSettings.interaction}
        textures={textures}
        onActiveIndexChange={onActiveIndexChange}
        onScrollChange={onScrollChange}
        onNavigate={onNavigate}
        onTransitionStateChange={onTransitionStateChange}
      />
      {controlSettings.titles.enabled && (
        <Suspense fallback={null}>
          <RotatingTitles3D
            titles={projectTitles}
            scrollProgressRef={scrollProgressRef}
            titleSettings={controlSettings.titles}
          />
        </Suspense>
      )}
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

function Projects3D({
  className = '',
  style = undefined,
  showLeva = true,
  pointerEvents = 'auto',
  transparentBackground = false,
}) {
  const navigate = useNavigate()
  const projectsLevaStore = useCreateStore()
  const adaptedProjects = useMemo(() => getAdaptedProjects(), [])
  const imageUrls = useMemo(() => getProjectImageUrls(), [])
  const projectTitles = useMemo(() => adaptedProjects.map(p => p.title), [adaptedProjects])

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPageTransitioning, setIsPageTransitioning] = useState(false)
  const scrollProgressRef = useRef(0)

  // Leva controls
  const sceneControls = useControls('Projects Scene', {
    background: { value: CONTROL_DEFAULTS.scene.background, label: 'Background' },
    gap: { value: CONTROL_DEFAULTS.scene.gap, min: 1, max: 10, step: 0.1, label: 'Gap' },
    groupY: { value: CONTROL_DEFAULTS.scene.groupY, min: -5, max: 5, step: 0.1, label: 'Group Y' },
  }, { store: projectsLevaStore })

  const geometryControls = useControls('Projects Geometry', {
    width: { value: CONTROL_DEFAULTS.geometry.width, min: 1, max: 10, step: 0.1, label: 'Width' },
    height: { value: CONTROL_DEFAULTS.geometry.height, min: 1, max: 10, step: 0.1, label: 'Height' },
    widthBias: { value: CONTROL_DEFAULTS.geometry.widthBias, min: 0.5, max: 2, step: 0.1, label: 'Width Bias' },
    varySizes: { value: CONTROL_DEFAULTS.geometry.varySizes, label: 'Vary Sizes' },
    widthVariation: { value: CONTROL_DEFAULTS.geometry.widthVariation, min: 0, max: 0.9, step: 0.01, label: 'Width Variation' },
    heightVariation: { value: CONTROL_DEFAULTS.geometry.heightVariation, min: 0, max: 0.9, step: 0.01, label: 'Height Variation' },
    variationSeed: { value: CONTROL_DEFAULTS.geometry.variationSeed, min: 0, max: 200, step: 1, label: 'Variation Seed' },
    segmentsX: { value: CONTROL_DEFAULTS.geometry.segmentsX, min: 1, max: 300, step: 1, label: 'Segments X' },
    segmentsY: { value: CONTROL_DEFAULTS.geometry.segmentsY, min: 1, max: 300, step: 1, label: 'Segments Y' },
  }, { store: projectsLevaStore })

  const scrollControls = useControls('Projects Scroll', {
    sensitivity: { value: CONTROL_DEFAULTS.scroll.sensitivity, min: 100, max: 3000, step: 50, label: 'Sensitivity' },
    stiffness: { value: CONTROL_DEFAULTS.scroll.stiffness, min: 10, max: 300, step: 5, label: 'Stiffness' },
    damping: { value: CONTROL_DEFAULTS.scroll.damping, min: 1, max: 50, step: 1, label: 'Damping' },
    mass: { value: CONTROL_DEFAULTS.scroll.mass, min: 0.1, max: 5, step: 0.1, label: 'Mass' },
    maxVelocity: { value: CONTROL_DEFAULTS.scroll.maxVelocity, min: 0.5, max: 30, step: 0.1, label: 'Max Velocity' },
    mouseMultiplier: { value: CONTROL_DEFAULTS.scroll.mouseMultiplier, min: 0.1, max: 5, step: 0.1, label: 'Mouse Mult' },
    touchMultiplier: { value: CONTROL_DEFAULTS.scroll.touchMultiplier, min: 0.1, max: 5, step: 0.1, label: 'Touch Mult' },
    firefoxMultiplier: { value: CONTROL_DEFAULTS.scroll.firefoxMultiplier, min: 1, max: 120, step: 1, label: 'Firefox Mult' },
  }, { store: projectsLevaStore })

  const materialControls = useControls('Projects Material', {
    wireframe: { value: CONTROL_DEFAULTS.material.wireframe, label: 'Wireframe' },
  }, { store: projectsLevaStore })

  const trigControls = useControls('Projects Trig (Bending)', {
    progressMultiplier: { value: CONTROL_DEFAULTS.trig.progressMultiplier, min: -2, max: 2, step: 0.01, label: 'Progress Mult' },
    sphereRadiusMultiplier: { value: CONTROL_DEFAULTS.trig.sphereRadiusMultiplier, min: 1, max: 10, step: 0.1, label: 'Sphere Radius' },
    sphereCenterY: { value: CONTROL_DEFAULTS.trig.sphereCenterY, min: -2, max: 5, step: 0.1, label: 'Sphere Center Y' },
    bendStrength: { value: CONTROL_DEFAULTS.trig.bendStrength, min: -5, max: 5, step: 0.1, label: 'Bend Strength' },
  }, { store: projectsLevaStore })

  const fragmentControls = useControls('Projects Fragment', {
    enableMask: { value: CONTROL_DEFAULTS.fragment.enableMask, label: 'Enable Mask' },
    maskStart: { value: CONTROL_DEFAULTS.fragment.maskStart, min: -5, max: 5, step: 0.01, label: 'Mask Start' },
    maskEnd: { value: CONTROL_DEFAULTS.fragment.maskEnd, min: -5, max: 5, step: 0.01, label: 'Mask End' },
  }, { store: projectsLevaStore })

  const interactionControls = useControls('Projects Interaction', {
    enableClickToggle: { value: CONTROL_DEFAULTS.interaction.enableClickToggle, label: 'Click Toggle' },
    toggleShiftX: { value: CONTROL_DEFAULTS.interaction.toggleShiftX, min: -8, max: 8, step: 0.01, label: 'Toggle Shift X' },
    requireFlatForShift: { value: CONTROL_DEFAULTS.interaction.requireFlatForShift, label: 'Require Flat Shift' },
    flatAngleThreshold: { value: CONTROL_DEFAULTS.interaction.flatAngleThreshold, min: 0, max: 1, step: 0.005, label: 'Flat Angle Thresh' },
    centerWindow: { value: CONTROL_DEFAULTS.interaction.centerWindow, min: 0, max: 4, step: 0.01, label: 'Center Window' },
    toggleResponse: { value: CONTROL_DEFAULTS.interaction.toggleResponse, min: 1, max: 40, step: 0.1, label: 'Toggle Response' },
    visibilityResponse: { value: CONTROL_DEFAULTS.interaction.visibilityResponse, min: 1, max: 40, step: 0.1, label: 'Visibility Response' },
    hitPaddingX: { value: CONTROL_DEFAULTS.interaction.hitPaddingX, min: 0, max: 4, step: 0.01, label: 'Hit Padding X' },
    hitPaddingY: { value: CONTROL_DEFAULTS.interaction.hitPaddingY, min: 0, max: 4, step: 0.01, label: 'Hit Padding Y' },
    hitPlaneZ: { value: CONTROL_DEFAULTS.interaction.hitPlaneZ, min: 0, max: 1, step: 0.005, label: 'Hit Plane Z' },
    slideFadeMinOpacity: { value: CONTROL_DEFAULTS.interaction.slideFadeMinOpacity, min: 0.2, max: 1, step: 0.01, label: 'Slide Min Opacity' },
    slideFadeExponent: { value: CONTROL_DEFAULTS.interaction.slideFadeExponent, min: 0.2, max: 4, step: 0.01, label: 'Slide Fade Exp' },
  }, { store: projectsLevaStore })

  const titleControls = useControls('Projects Titles (3D)', {
    enabled: { value: false, label: 'Enabled' },
    fontSize: { value: 0.3, min: 0.1, max: 3, step: 0.1, label: 'Font Size' },
    color: { value: '#000000', label: 'Color' },
    opacity: { value: 1.0, min: 0, max: 1, step: 0.05, label: 'Opacity' },
    // Position
    xOffset: { value: 0, min: -5, max: 5, step: 0.1, label: 'X Offset' },
    zOffset: { value: -1.2, min: -5, max: 5, step: 0.1, label: 'Z Offset' },
    // Base Rotation
    baseRotationX: { value: 24, min: -180, max: 180, step: 1, label: 'Base Rot X (deg)' },
    baseRotationY: { value: 0, min: -180, max: 180, step: 1, label: 'Base Rot Y (deg)' },
    baseRotationZ: { value: 0, min: -180, max: 180, step: 1, label: 'Base Rot Z (deg)' },
    // Cylinder settings
    cylinderRadius: { value: 3.2, min: 0.5, max: 10, step: 0.1, label: 'Cylinder Radius' },
    angleSpacing: { value: 33, min: 5, max: 90, step: 1, label: 'Angle Spacing (deg)' },
    scrollSpeed: { value: 0.9, min: 0.1, max: 2, step: 0.05, label: 'Scroll Speed' },
    // Direction
    invertDirection: { value: true, label: 'Invert Direction' },
  }, { store: projectsLevaStore })

  const cameraControls = useControls('Projects Camera', {
    orientation: {
      value: CONTROL_DEFAULTS.cameraControls.orientation,
      options: ['vertical', 'horizontal', 'manual'],
      label: 'Orientation',
    },
    posX: { value: CONTROL_DEFAULTS.cameraControls.posX, min: -10, max: 10, step: 0.01, label: 'Position X' },
    posY: { value: CONTROL_DEFAULTS.cameraControls.posY, min: -10, max: 10, step: 0.01, label: 'Position Y' },
    posZ: { value: CONTROL_DEFAULTS.cameraControls.posZ, min: 1, max: 20, step: 0.1, label: 'Position Z' },
    lookAtX: { value: CONTROL_DEFAULTS.cameraControls.lookAtX, min: -10, max: 10, step: 0.01, label: 'LookAt X' },
    lookAtY: { value: CONTROL_DEFAULTS.cameraControls.lookAtY, min: -10, max: 10, step: 0.01, label: 'LookAt Y' },
    lookAtZ: { value: CONTROL_DEFAULTS.cameraControls.lookAtZ, min: -10, max: 10, step: 0.01, label: 'LookAt Z' },
    roll: { value: CONTROL_DEFAULTS.cameraControls.roll, min: -3.1416, max: 3.1416, step: 0.0001, label: 'Roll' },
    fov: { value: CONTROL_DEFAULTS.cameraControls.fov, min: 30, max: 120, step: 1, label: 'FOV' },
    zoom: { value: CONTROL_DEFAULTS.cameraControls.zoom, min: 0.1, max: 5, step: 0.01, label: 'Zoom' },
    near: { value: CONTROL_DEFAULTS.cameraControls.near, min: 0.01, max: 5, step: 0.01, label: 'Near' },
    far: { value: CONTROL_DEFAULTS.cameraControls.far, min: 10, max: 5000, step: 1, label: 'Far' },
    focus: { value: CONTROL_DEFAULTS.cameraControls.focus, min: 0, max: 100, step: 0.1, label: 'Focus' },
  }, { store: projectsLevaStore })

  // Typography controls for editorial overlay
  const typographyControls = useControls('Projects Typography', {
    // Title (left panel)
    titleFont: {
      value: 'Instrument Serif',
      options: ['Instrument Serif', 'Pangea Afrikan', 'Georgia', 'Arial', 'Helvetica'],
      label: 'Title Font',
    },
    titleSize: { value: 2.7, min: 1, max: 6, step: 0.1, label: 'Title Size (rem)' },
    titleWeight: { value: 600, min: 100, max: 900, step: 100, label: 'Title Weight' },
    titleItalic: { value: false, label: 'Title Italic' },
    titleColor: { value: '#ffffff', label: 'Title Color' },
    titleLetterSpacing: { value: -0.1, min: -0.5, max: 0.5, step: 0.01, label: 'Title Spacing (rem)' },
    // Tags
    tagsFont: {
      value: 'IBM Plex Mono',
      options: ['IBM Plex Mono', 'Pangea Afrikan', 'Monaco', 'Consolas', 'Arial'],
      label: 'Tags Font',
    },
    tagsSize: { value: 0.95, min: 0.5, max: 2, step: 0.05, label: 'Tags Size (rem)' },
    tagsWeight: { value: 500, min: 100, max: 900, step: 100, label: 'Tags Weight' },
    tagsColor: { value: '#ffffff', label: 'Tags Color' },
    // Description
    descFont: {
      value: 'Pangea Afrikan',
      options: ['Pangea Afrikan', 'Instrument Serif', 'Georgia', 'Arial', 'Helvetica'],
      label: 'Desc Font',
    },
    descSize: { value: 0.9, min: 0.5, max: 2, step: 0.05, label: 'Desc Size (rem)' },
    descWeight: { value: 500, min: 100, max: 900, step: 100, label: 'Desc Weight' },
    descColor: { value: '#c4c4c4', label: 'Desc Color' },
    descLineHeight: { value: 1.42, min: 1, max: 2, step: 0.02, label: 'Desc Line Height' },
    // Triangle
    triangleColor: { value: '#6f6f6f', label: 'Triangle Color' },
    triangleSize: { value: 0.5, min: 0.5, max: 3, step: 0.1, label: 'Triangle Size (rem)' },
    triangleGap: { value: 1.2, min: 0, max: 5, step: 0.1, label: 'Triangle Gap (rem)' },
  }, { store: projectsLevaStore })

  // Build control settings from Leva
  const controlSettings = useMemo(() => ({
    scene: {
      ...CONTROL_DEFAULTS.scene,
      background: sceneControls.background,
      gap: sceneControls.gap,
      groupY: sceneControls.groupY,
      meshCount: adaptedProjects.length,
    },
    geometry: {
      ...CONTROL_DEFAULTS.geometry,
      width: geometryControls.width,
      height: geometryControls.height,
      widthBias: geometryControls.widthBias,
      varySizes: geometryControls.varySizes,
      widthVariation: geometryControls.widthVariation,
      heightVariation: geometryControls.heightVariation,
      variationSeed: geometryControls.variationSeed,
      segmentsX: geometryControls.segmentsX,
      segmentsY: geometryControls.segmentsY,
    },
    scroll: {
      ...CONTROL_DEFAULTS.scroll,
      sensitivity: scrollControls.sensitivity,
      stiffness: scrollControls.stiffness,
      damping: scrollControls.damping,
      mass: scrollControls.mass,
      maxVelocity: scrollControls.maxVelocity,
      mouseMultiplier: scrollControls.mouseMultiplier,
      touchMultiplier: scrollControls.touchMultiplier,
      firefoxMultiplier: scrollControls.firefoxMultiplier,
    },
    material: {
      ...CONTROL_DEFAULTS.material,
      wireframe: materialControls.wireframe,
    },
    trig: {
      progressMultiplier: trigControls.progressMultiplier,
      sphereRadiusMultiplier: trigControls.sphereRadiusMultiplier,
      sphereCenterY: trigControls.sphereCenterY,
      bendStrength: trigControls.bendStrength,
    },
    fragment: {
      ...CONTROL_DEFAULTS.fragment,
      enableMask: fragmentControls.enableMask,
      maskStart: fragmentControls.maskStart,
      maskEnd: fragmentControls.maskEnd,
    },
    interaction: {
      ...CONTROL_DEFAULTS.interaction,
      enableClickToggle: interactionControls.enableClickToggle,
      toggleShiftX: interactionControls.toggleShiftX,
      requireFlatForShift: interactionControls.requireFlatForShift,
      flatAngleThreshold: interactionControls.flatAngleThreshold,
      centerWindow: interactionControls.centerWindow,
      toggleResponse: interactionControls.toggleResponse,
      visibilityResponse: interactionControls.visibilityResponse,
      hitPaddingX: interactionControls.hitPaddingX,
      hitPaddingY: interactionControls.hitPaddingY,
      hitPlaneZ: interactionControls.hitPlaneZ,
      slideFadeMinOpacity: interactionControls.slideFadeMinOpacity,
      slideFadeExponent: interactionControls.slideFadeExponent,
    },
    titles: {
      enabled: titleControls.enabled,
      fontSize: titleControls.fontSize,
      color: titleControls.color,
      opacity: titleControls.opacity,
      xOffset: titleControls.xOffset,
      zOffset: titleControls.zOffset,
      baseRotationX: titleControls.baseRotationX,
      baseRotationY: titleControls.baseRotationY,
      baseRotationZ: titleControls.baseRotationZ,
      // Cylinder settings
      cylinderRadius: titleControls.cylinderRadius,
      angleSpacing: titleControls.angleSpacing,
      scrollSpeed: titleControls.scrollSpeed,
      invertDirection: titleControls.invertDirection,
    },
    cameraControls: {
      ...CONTROL_DEFAULTS.cameraControls,
      orientation: cameraControls.orientation,
      posX: cameraControls.posX,
      posY: cameraControls.posY,
      posZ: cameraControls.posZ,
      lookAtX: cameraControls.lookAtX,
      lookAtY: cameraControls.lookAtY,
      lookAtZ: cameraControls.lookAtZ,
      roll: cameraControls.roll,
      fov: cameraControls.fov,
      zoom: cameraControls.zoom,
      near: cameraControls.near,
      far: cameraControls.far,
      focus: cameraControls.focus,
    },
  }), [
    sceneControls, geometryControls, scrollControls, trigControls,
    materialControls, fragmentControls, interactionControls,
    titleControls, cameraControls, adaptedProjects.length
  ])

  const handleActiveIndexChange = useCallback((index) => {
    setActiveIndex(index)
  }, [])

  const handleScrollChange = useCallback((scroll) => {
    scrollProgressRef.current = scroll
  }, [])

  const handleNavigate = useCallback((index) => {
    const project = adaptedProjects[index]
    if (project?.route) {
      navigate(project.route)
      return true
    }
    return false
  }, [adaptedProjects, navigate])

  // Get active project based on activeIndex
  const activeProject = adaptedProjects[activeIndex] || adaptedProjects[0]

  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const root = document.documentElement
    if (isPageTransitioning) {
      root.classList.add('projects-nav-transition')
    } else {
      root.classList.remove('projects-nav-transition')
    }
    return () => {
      root.classList.remove('projects-nav-transition')
    }
  }, [isPageTransitioning])

  return (
    <div
      className={`projects-3d ${className}`.trim()}
      style={{ ...style, pointerEvents }}
    >
      {showLeva ? (
        <LevaPanel
          store={projectsLevaStore}
          collapsed={false}
          titleBar={{ title: 'Projects 3D', drag: true, filter: false }}
        />
      ) : null}
      <Canvas
        className="projects-3d-canvas"
        dpr={[1, 2]}
        gl={{ alpha: true }}
      >
        <Scene3D
          imageUrls={imageUrls}
          controlSettings={controlSettings}
          transparentBackground={transparentBackground}
          onActiveIndexChange={handleActiveIndexChange}
          onScrollChange={handleScrollChange}
          onNavigate={handleNavigate}
          onTransitionStateChange={setIsPageTransitioning}
          scrollProgressRef={scrollProgressRef}
          projectTitles={projectTitles}
        />
      </Canvas>
      <EditorialOverlay activeProject={activeProject} typography={typographyControls} />
    </div>
  )
}

export default Projects3D
