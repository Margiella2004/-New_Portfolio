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
}) {
  const INTRO_DURATION = 2.4
  const INTRO_SCROLL_MULTIPLIER = 3.4
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
    },
    []
  )

  useEffect(() => {
    backgroundColorRef.current.set(scene.background)
  }, [scene.background])

  useFrame((_, delta) => {
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

    const nextClickableMeshIndices = new Set()
    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY
    let focusedIndex = -1
    let focusedDistance = Number.POSITIVE_INFINITY
    const hasToggledMeshes = interaction.enableClickToggle && toggledMeshIndices.current.size > 0

    for (let index = 0; index < scene.meshCount; index += 1) {
      const mesh = meshRefs.current[index]
      if (!mesh) continue
      const isToggledMesh = toggledMeshIndices.current.has(index)
      const shouldShowMesh = !hasToggledMeshes || isToggledMesh
      const visibilityOpacity = THREE.MathUtils.damp(
        visibilityOpacityRefs.current[index] ?? 1,
        shouldShowMesh ? 1 : 0,
        interaction.visibilityResponse ?? interaction.toggleResponse,
        delta
      )
      visibilityOpacityRefs.current[index] = visibilityOpacity
      mesh.visible = visibilityOpacity > 0.001 || shouldShowMesh

      const centeredIndex = index - (scene.meshCount - 1) * 0.5
      const loopLength = Math.max(scene.meshCount * scene.gap, 0.0001)
      const halfLoop = loopLength * 0.5
      const rawOffset = centeredIndex * -scene.gap - (currentScroll.current + introScrollOffset)
      const offset = wrapToRange(rawOffset, -halfLoop, halfLoop)
      const progressY = offset * trig.progressMultiplier
      const offsetAbs = Math.abs(offset)

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

      if (canInteract) {
        nextClickableMeshIndices.add(index)
        if (offsetAbs < focusedDistance) {
          focusedDistance = offsetAbs
          focusedIndex = index
        }
      }

      const targetX =
        interaction.enableClickToggle &&
        toggledMeshIndices.current.has(index) &&
        (interaction.requireFlatForShift ? canInteract : true)
          ? interaction.toggleShiftX
          : 0

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
      const minOpacity = THREE.MathUtils.clamp(interaction.slideFadeMinOpacity, 0.15, 1)
      const imageOpacity =
        interaction.enableClickToggle && shiftRange > 0.0001
          ? 1 - ((1 - minOpacity) * easedSlideProgress)
          : 1
      const bendStrength =
        interaction.enableClickToggle && shiftRange > 0.0001
          ? THREE.MathUtils.lerp(trig.bendStrength, 0, easedSlideProgress)
          : trig.bendStrength

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

    clickableMeshIndices.current = nextClickableMeshIndices
    const activeIndex = focusedIndex >= 0 ? focusedIndex : closestIndex
    if (lastActiveIndexRef.current !== activeIndex) {
      lastActiveIndexRef.current = activeIndex
      onActiveIndexChange?.(activeIndex)
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
                if (!clickableMeshIndices.current.has(index)) return
                const isToggled = toggledMeshIndices.current.has(index)
                if (isToggled) {
                  onToggleChange?.(null)
                  const timeoutId = window.setTimeout(() => {
                    collapseTimeoutsRef.current.delete(timeoutId)
                    const next = new Set(toggledMeshIndices.current)
                    next.delete(index)
                    toggledMeshIndices.current = next
                  }, 350)
                  collapseTimeoutsRef.current.add(timeoutId)
                } else {
                  const next = new Set(toggledMeshIndices.current)
                  next.add(index)
                  toggledMeshIndices.current = next
                  onToggleChange?.(index)
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
