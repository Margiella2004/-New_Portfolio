import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import VirtualScroll from 'virtual-scroll'
import vertexShader from '../shaders/vertex.glsl?raw'
import fragmentShader from '../shaders/fragment.glsl?raw'
import { computeBendAngle, getMeshDimensions, wrapToRange } from '../utils/planeMath'

const GradientMaterial = shaderMaterial(
  {
    progress: 0,
    uMeshWidth: 1,
    uMeshHeight: 1,
    uProgressMul: 1,
    uRangeMul: 1,
    uSmoothCenter: 0,
    uAngleAmp: 1,
    uUseMask: 1,
    uMaskStart: -0.35,
    uMaskEnd: 0,
    uPlaneAspect: 1,
    uImageAspect: 1,
    uImageOpacity: 1,
    uVisibilityOpacity: 1,
    uBgColor: new THREE.Color('#ffffff'),
    texture1: null,
  },
  vertexShader,
  fragmentShader
)

extend({ GradientMaterial })
const DISABLE_RAYCAST = () => null

function GradientPlanes({
  scene,
  geometry,
  scroll,
  material,
  trig,
  fragment,
  interaction,
  textures,
  onActiveIndexChange,
  onToggleChange,
  isExpanded,
  onIntroComplete,
  onScrollChange,
  onNavigate,
  onTransitionStateChange,
}) {
  const easeInOutCubic = (t) => (
    t < 0.5
      ? 4 * t * t * t
      : 1 - (Math.pow(-2 * t + 2, 3) / 2)
  )
  const INTRO_DURATION = 2.4
  const INTRO_SCROLL_MULTIPLIER = 3.4
  const INTRO_SETTLE_SCROLL_MULTIPLIER = -0.18
  const ACTIVE_INDEX_HYSTERESIS_FACTOR = 0.12
  const ACTIVE_INDEX_HYSTERESIS_MIN = 0.1
  const TRANSITION_FADE_DURATION = 0.95
  const TRANSITION_HOLD_DURATION = 1.0
  const NAVIGATION_TRANSITION_DURATION = TRANSITION_FADE_DURATION + TRANSITION_HOLD_DURATION
  const meshRefs = useRef([])
  const hitAreaRefs = useRef([])
  const materialRefs = useRef([])
  const targetScroll = useRef(0)
  const currentScroll = useRef(0)
  const scrollVelocity = useRef(0)
  const visibilityOpacityRefs = useRef([])
  const toggledMeshIndices = useRef(new Set())
  const clickableMeshIndices = useRef(new Set())
  const lastActiveIndexRef = useRef(-1)
  const collapseTimeoutsRef = useRef(new Set())
  const backgroundColorRef = useRef(new THREE.Color(scene.background))
  const introProgressRef = useRef(0)
  const introCompletedRef = useRef(false)
  const selectionTransitionRef = useRef({
    active: false,
    index: -1,
    elapsed: 0,
    progress: 0,
    navigated: false,
  })

  const meshDimensions = useMemo(
    () => Array.from({ length: scene.meshCount }, (_, index) => getMeshDimensions(index, geometry)),
    [scene.meshCount, geometry]
  )

  useEffect(() => {
    // Don't create VirtualScroll when expanded to allow native scrolling
    if (isExpanded) return

    const scroller = new VirtualScroll({
      mouseMultiplier: scroll.mouseMultiplier,
      touchMultiplier: scroll.touchMultiplier,
      firefoxMultiplier: scroll.firefoxMultiplier,
      passive: true,
    })

    const onScroll = (event) => {
      if (selectionTransitionRef.current.active) return
      // Ignore scroll events from editorial scroll area
      const target = event.originalEvent?.target
      if (target?.closest?.('.editorial-info-scroll')) return
      targetScroll.current = event.y / scroll.sensitivity
    }

    scroller.on(onScroll)

    return () => {
      scroller.off(onScroll)
      scroller.destroy()
    }
  }, [
    isExpanded,
    scroll.firefoxMultiplier,
    scroll.mouseMultiplier,
    scroll.sensitivity,
    scroll.touchMultiplier,
  ])

  useEffect(
    () => () => {
      collapseTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
      collapseTimeoutsRef.current.clear()
      onTransitionStateChange?.(false)
    },
    [onTransitionStateChange]
  )

  useEffect(() => {
    backgroundColorRef.current.set(scene.background)
  }, [scene.background])

  useFrame((_, delta) => {
    const selectionTransition = selectionTransitionRef.current
    if (selectionTransition.active) {
      selectionTransition.elapsed += delta
      selectionTransition.progress = Math.min(
        selectionTransition.elapsed / TRANSITION_FADE_DURATION,
        1
      )
      if (
        !selectionTransition.navigated &&
        selectionTransition.elapsed >= NAVIGATION_TRANSITION_DURATION
      ) {
        selectionTransition.navigated = true
        const navigated = onNavigate?.(selectionTransition.index)
        if (navigated === false) {
          onTransitionStateChange?.(false)
          selectionTransitionRef.current = {
            active: false,
            index: -1,
            elapsed: 0,
            progress: 0,
            navigated: false,
          }
        }
      }
    }
    const isSelectionTransition = selectionTransition.active
    const selectedTransitionIndex = selectionTransition.index
    const selectionEase = easeInOutCubic(selectionTransition.progress ?? 0)

    let introOpacity = 1
    let introScrollOffset = 0
    if (!introCompletedRef.current) {
      introProgressRef.current = Math.min(introProgressRef.current + (delta / INTRO_DURATION), 1)
      const t = introProgressRef.current
      const eased = 1 - Math.pow(1 - t, 5)
      introOpacity = eased
      introScrollOffset = (1 - eased) * scene.gap * INTRO_SCROLL_MULTIPLIER

      if (t >= 1) {
        introCompletedRef.current = true
        onIntroComplete?.()
      }
    }

    if (toggledMeshIndices.current.size > 0) {
      const nextSet = new Set()
      toggledMeshIndices.current.forEach((index) => {
        if (index < scene.meshCount) nextSet.add(index)
      })
      toggledMeshIndices.current = nextSet
    }

    if (isSelectionTransition) {
      targetScroll.current = currentScroll.current
      scrollVelocity.current = 0
    } else {
      const position = currentScroll.current
      const velocity = scrollVelocity.current
      const displacement = targetScroll.current - position
      const springForce = displacement * scroll.stiffness
      const dampingForce = -velocity * scroll.damping
      const acceleration = (springForce + dampingForce) / Math.max(scroll.mass, 0.0001)
      const nextVelocity = THREE.MathUtils.clamp(
        velocity + (acceleration * delta),
        -scroll.maxVelocity,
        scroll.maxVelocity
      )
      const nextPosition = position + (nextVelocity * delta)

      if (Math.abs(displacement) < 0.0001 && Math.abs(nextVelocity) < 0.0001) {
        currentScroll.current = targetScroll.current
        scrollVelocity.current = 0
      } else {
        currentScroll.current = nextPosition
        scrollVelocity.current = nextVelocity
      }
    }

    const introSettleOffset = introCompletedRef.current
      ? scene.gap * INTRO_SETTLE_SCROLL_MULTIPLIER
      : 0
    const combinedScroll = currentScroll.current + introScrollOffset + introSettleOffset

    // Share scroll state with parent for RotatingTitles
    onScrollChange?.(combinedScroll)

    const nextClickableMeshIndices = new Set()
    const centerDistanceByIndex = []
    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY
    let focusedIndex = -1
    let focusedDistance = Number.POSITIVE_INFINITY
    const hasToggledMeshes = interaction.enableClickToggle && toggledMeshIndices.current.size > 0
    let shouldResetToggledMeshes = false
    let selectedOutOfRange = false
    const activeIndexForRender = isSelectionTransition
      ? selectedTransitionIndex
      : lastActiveIndexRef.current
    const toggleResetDistance = Math.max(
      (interaction.centerWindow ?? 0.35) * 1.25,
      scene.gap * 0.35
    )

    for (let index = 0; index < scene.meshCount; index += 1) {
      const mesh = meshRefs.current[index]
      if (!mesh) continue
      const isSelectedTransitionMesh =
        isSelectionTransition && index === selectedTransitionIndex
      const isToggledMesh = toggledMeshIndices.current.has(index)
      const transitionVisibility = isSelectionTransition
        ? (isSelectedTransitionMesh
            ? 1
            : 1 - THREE.MathUtils.smoothstep(selectionEase, 0.02, 0.92))
        : 1
      const visibilityOpacity = THREE.MathUtils.damp(
        visibilityOpacityRefs.current[index] ?? 1,
        transitionVisibility,
        interaction.visibilityResponse ?? interaction.toggleResponse,
        delta
      )
      visibilityOpacityRefs.current[index] = visibilityOpacity
      mesh.visible = visibilityOpacity > 0.001 || transitionVisibility > 0.001

      const centeredIndex = index - (scene.meshCount - 1) * 0.5
      const loopLength = Math.max(scene.meshCount * scene.gap, 0.0001)
      const halfLoop = loopLength * 0.5
      const rawOffset = centeredIndex * -scene.gap - combinedScroll
      const wrappedOffset = wrapToRange(rawOffset, -halfLoop, halfLoop)
      const offset = isSelectedTransitionMesh
        ? THREE.MathUtils.lerp(wrappedOffset, 0, selectionEase)
        : wrappedOffset
      const progressY = offset * trig.progressMultiplier
      const offsetAbs = Math.abs(offset)
      centerDistanceByIndex[index] = offsetAbs
      if (hasToggledMeshes && isToggledMesh && offsetAbs > toggleResetDistance) {
        shouldResetToggledMeshes = true
      }

      if (offsetAbs < closestDistance) {
        closestDistance = offsetAbs
        closestIndex = index
      }

      mesh.position.y = 0

      const mat = materialRefs.current[index]
      if (!mat) continue

      const dimensions = meshDimensions[index] ?? {
        width: geometry.width * geometry.widthBias,
        height: geometry.height,
      }
      const angle = computeBendAngle(offset, dimensions.width, dimensions.height, trig)
      const isFlat = Math.abs(angle) <= interaction.flatAngleThreshold
      const isNearCenter = Math.abs(offset) <= interaction.centerWindow
      const canInteract = isFlat || isNearCenter

      if (hasToggledMeshes && isToggledMesh && !canInteract) {
        selectedOutOfRange = true
      }

      if (!isSelectionTransition && canInteract) {
        if (offsetAbs < focusedDistance) {
          focusedDistance = offsetAbs
          focusedIndex = index
        }
        nextClickableMeshIndices.add(index)
      }

      const targetX =
        isSelectionTransition
          ? 0
          : (
            interaction.enableClickToggle &&
            toggledMeshIndices.current.has(index) &&
            (interaction.requireFlatForShift ? canInteract : true)
              ? interaction.toggleShiftX
              : 0
          )

      mesh.position.x = THREE.MathUtils.damp(
        mesh.position.x,
        targetX,
        interaction.toggleResponse,
        delta
      )

      const shiftRange = Math.max(Math.abs(interaction.toggleShiftX), 0.0001)
      const slideProgress = THREE.MathUtils.clamp(Math.abs(mesh.position.x) / shiftRange, 0, 1)
      const easedSlideProgress = Math.pow(
        slideProgress,
        Math.max(interaction.slideFadeExponent, 0.0001)
      )

      // Base opacity based on distance from center (non-active tiles are much greyer/transparent)
      const distanceFade = Math.max(0.15, 1 - (offsetAbs * 0.4))
      // Full opacity is only for planes currently in interaction range.
      const isActiveIndex = isSelectionTransition
        ? isSelectedTransitionMesh
        : index === activeIndexForRender
      const baseOpacity = isActiveIndex ? 1 : distanceFade * 0.35

      const minOpacity = THREE.MathUtils.clamp(interaction.slideFadeMinOpacity, 0.15, 1)
      let imageOpacity =
        interaction.enableClickToggle && shiftRange > 0.0001
          ? baseOpacity * (1 - ((1 - minOpacity) * easedSlideProgress))
          : baseOpacity
      if (isSelectionTransition) {
        const transitionImageFade = isSelectedTransitionMesh
          ? 1
          : 1 - THREE.MathUtils.smoothstep(selectionEase, 0.02, 0.82)
        imageOpacity *= transitionImageFade
      }

      let bendStrength =
        interaction.enableClickToggle && shiftRange > 0.0001
          ? THREE.MathUtils.lerp(trig.bendStrength, 0, easedSlideProgress)
          : trig.bendStrength
      if (isSelectedTransitionMesh) {
        bendStrength = THREE.MathUtils.lerp(bendStrength, 0, selectionEase)
      }

      const hitArea = hitAreaRefs.current[index]
      if (hitArea) {
        hitArea.position.y = progressY
        hitArea.position.z = interaction.hitPlaneZ
      }

      mat.progress = offset
      mat.uMeshWidth = dimensions.width
      mat.uMeshHeight = dimensions.height
      mat.uProgressMul = trig.progressMultiplier
      mat.uRangeMul = trig.sphereRadiusMultiplier
      mat.uSmoothCenter = trig.sphereCenterY
      mat.uAngleAmp = bendStrength
      mat.uUseMask = fragment.enableMask ? 1 : 0
      mat.uMaskStart = fragment.maskStart
      mat.uMaskEnd = fragment.maskEnd
      mat.uImageOpacity = imageOpacity
      mat.uVisibilityOpacity = visibilityOpacity * introOpacity
      mat.uBgColor = backgroundColorRef.current

      const texture = textures[index % textures.length]
      mat.texture1 = texture
      mat.uPlaneAspect = dimensions.width / Math.max(dimensions.height, 0.0001)
      const imageWidth = texture?.image?.width ?? texture?.source?.data?.width ?? 1
      const imageHeight = texture?.image?.height ?? texture?.source?.data?.height ?? 1
      mat.uImageAspect = imageWidth / Math.max(imageHeight, 0.0001)

      mat.wireframe = material.wireframe
      mat.transparent = true
      mat.depthWrite = (visibilityOpacity * introOpacity) > 0.99
      mat.opacity = 1
    }

    if (!isSelectionTransition && hasToggledMeshes && selectedOutOfRange) {
      shouldResetToggledMeshes = true
    }

    if (
      !isSelectionTransition &&
      hasToggledMeshes &&
      (focusedIndex < 0 || !toggledMeshIndices.current.has(focusedIndex))
    ) {
      shouldResetToggledMeshes = true
    }

    if (shouldResetToggledMeshes) {
      toggledMeshIndices.current = new Set()
    }

    let activeIndex = isSelectionTransition
      ? selectedTransitionIndex
      : (
        focusedIndex >= 0
          ? focusedIndex
          : (lastActiveIndexRef.current >= 0 ? lastActiveIndexRef.current : closestIndex)
      )
    if (!isSelectionTransition) {
      const previousActiveIndex = lastActiveIndexRef.current
      const hasPrevious =
        previousActiveIndex >= 0 && previousActiveIndex < scene.meshCount
      const shouldCheckHysteresis =
        hasPrevious && activeIndex !== previousActiveIndex

      if (shouldCheckHysteresis) {
        const previousDistance = centerDistanceByIndex[previousActiveIndex] ?? Number.POSITIVE_INFINITY
        const nextDistance = centerDistanceByIndex[activeIndex] ?? Number.POSITIVE_INFINITY
        const hysteresis = Math.max(
          scene.gap * ACTIVE_INDEX_HYSTERESIS_FACTOR,
          ACTIVE_INDEX_HYSTERESIS_MIN
        )
        const previousIsStillInFocusWindow =
          focusedIndex >= 0
            ? nextClickableMeshIndices.has(previousActiveIndex)
            : true

        // Prevent flicker near tile boundaries. Switch only when the new tile is
        // meaningfully closer to center than the currently active tile.
        if (previousIsStillInFocusWindow && nextDistance + hysteresis >= previousDistance) {
          activeIndex = previousActiveIndex
        }
      }
    }
    clickableMeshIndices.current = (
      isSelectionTransition ||
      activeIndex < 0 ||
      !nextClickableMeshIndices.has(activeIndex)
    )
      ? new Set()
      : new Set([activeIndex])
    if (lastActiveIndexRef.current !== activeIndex) {
      lastActiveIndexRef.current = activeIndex
      onActiveIndexChange?.(activeIndex)
      // Clear toggled state when scrolling to a new tile.
      if (!isSelectionTransition && toggledMeshIndices.current.size > 0) {
        toggledMeshIndices.current = new Set()
      }
    }
  })

  return (
    <group position={[0, scene.groupY, 0]}>
      {Array.from({ length: scene.meshCount }).map((_, index) => {
        const dimensions = meshDimensions[index] ?? {
          width: geometry.width * geometry.widthBias,
          height: geometry.height,
        }

        return (
          <mesh
            key={index}
            ref={(node) => {
              meshRefs.current[index] = node
            }}
            raycast={DISABLE_RAYCAST}
          >
            <planeGeometry
              args={[dimensions.width, dimensions.height, geometry.segmentsX, geometry.segmentsY]}
            />
            <gradientMaterial
              ref={(node) => {
                materialRefs.current[index] = node
              }}
              wireframe={material.wireframe}
              transparent={false}
              opacity={1}
              depthWrite
            />
            <mesh
              ref={(node) => {
                hitAreaRefs.current[index] = node
              }}
              position={[0, 0, interaction.hitPlaneZ]}
              onClick={(event) => {
                event.stopPropagation()
                if (selectionTransitionRef.current.active) return
                if (!clickableMeshIndices.current.has(index)) return
                toggledMeshIndices.current = new Set()
                onToggleChange?.(index)
                onTransitionStateChange?.(true)
                selectionTransitionRef.current = {
                  active: true,
                  index,
                  elapsed: 0,
                  progress: 0,
                  navigated: false,
                }
              }}
            >
              <planeGeometry
                args={[
                  dimensions.width + interaction.hitPaddingX,
                  dimensions.height + interaction.hitPaddingY,
                  1,
                  1,
                ]}
              />
              <meshBasicMaterial
                transparent
                opacity={0}
                depthWrite={false}
                side={THREE.DoubleSide}
              />
            </mesh>
          </mesh>
        )
      })}
    </group>
  )
}

export default GradientPlanes
