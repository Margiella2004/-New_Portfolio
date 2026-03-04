import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

function RotatingTitles3D({
  titles = [],
  scrollProgressRef,
  titleSettings = {
    fontSize: 0.3,
    color: '#000000',
    opacity: 1.0,
    xOffset: 0,
    zOffset: -1.2,
    baseRotationX: 24,
    baseRotationY: 0,
    baseRotationZ: 0,
    invertDirection: true,
    // Cylinder settings
    cylinderRadius: 3.2,
    angleSpacing: 33,
    scrollSpeed: 0.9,
  },
}) {
  const groupRefs = useRef([])
  const textRefs = useRef([])
  const count = titles.length

  const fontProps = {
    // TODO: Replace with Pangea Afrikan bold when font file is added
    // font: '/fonts/PangeaAfrikan-Bold.ttf',
    font: '/fonts/InstrumentSerif-Italic.ttf',
    fontSize: titleSettings.fontSize,
    letterSpacing: -0.02,
    lineHeight: 1,
    fontWeight: 900,
    'material-toneMapped': false,
  }

  // Convert degrees to radians for base rotations
  const baseRotY = (titleSettings.baseRotationY * Math.PI) / 180
  const baseRotZ = (titleSettings.baseRotationZ * Math.PI) / 180

  useFrame(() => {
    if (count === 0) return
    const currentScroll = scrollProgressRef?.current ?? 0

    for (let index = 0; index < count; index++) {
      const group = groupRefs.current[index]
      const textMesh = textRefs.current[index]
      if (!group) continue

      // Center index around 0
      const centeredIndex = index - (count - 1) * 0.5

      // Calculate angle: base offset + scroll
      const scrollDir = titleSettings.invertDirection ? -1 : 1
      const angleOffset = centeredIndex * titleSettings.angleSpacing
      const scrollAngle = currentScroll * titleSettings.scrollSpeed * (180 / Math.PI)
      const totalAngleDeg = angleOffset + (scrollDir * scrollAngle)
      const totalAngleRad = (totalAngleDeg * Math.PI) / 180

      // Cylindrical position (rotating around X-axis)
      const radius = titleSettings.cylinderRadius
      group.position.x = titleSettings.xOffset
      group.position.y = radius * Math.sin(totalAngleRad)
      group.position.z = radius * Math.cos(totalAngleRad) + titleSettings.zOffset

      // Rotate to face tangent of cylinder
      group.rotation.x = -totalAngleRad
      group.rotation.y = baseRotY
      group.rotation.z = baseRotZ

      // Fade titles that are behind or far rotated
      const fadeAngle = 60  // Start fading at 60 degrees
      const fadeRange = 30  // Fully faded at 90 degrees
      const absAngle = Math.abs(totalAngleDeg % 360)
      const normalizedAngle = absAngle > 180 ? 360 - absAngle : absAngle
      const opacity = Math.max(0, 1 - Math.max(0, (normalizedAngle - fadeAngle) / fadeRange))

      // Update visibility
      group.visible = opacity > 0.01

      // Update text opacity
      if (textMesh && textMesh.material) {
        textMesh.material.opacity = opacity * titleSettings.opacity
      }
    }
  })

  if (count === 0) return null

  return (
    <group>
      {titles.map((title, i) => (
        <group
          key={`title-3d-${i}`}
          ref={(el) => {
            groupRefs.current[i] = el
          }}
        >
          <Text
            ref={(el) => {
              textRefs.current[i] = el
            }}
            color={titleSettings.color}
            anchorX="center"
            anchorY="middle"
            material-transparent={true}
            material-depthTest={false}
            renderOrder={100}
            {...fontProps}
          >
            {title}
          </Text>
        </group>
      ))}
    </group>
  )
}

export default RotatingTitles3D
