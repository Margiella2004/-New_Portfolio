import { useEffect, useRef } from 'react'
import { PerspectiveCamera } from '@react-three/drei'

function CameraController({ cameraControls }) {
  const cameraRef = useRef(null)

  useEffect(() => {
    const camera = cameraRef.current
    if (!camera) return

    const roll =
      cameraControls.orientation === 'vertical'
        ? 0
        : cameraControls.orientation === 'horizontal'
          ? 1.5708
          : cameraControls.roll

    camera.position.set(cameraControls.posX, cameraControls.posY, cameraControls.posZ)
    camera.fov = cameraControls.fov
    camera.zoom = cameraControls.zoom
    camera.near = cameraControls.near
    camera.far = cameraControls.far
    camera.focus = cameraControls.focus
    camera.up.set(Math.sin(roll), Math.cos(roll), 0)
    camera.lookAt(cameraControls.lookAtX, cameraControls.lookAtY, cameraControls.lookAtZ)
    camera.updateProjectionMatrix()
  }, [
    cameraControls.orientation,
    cameraControls.roll,
    cameraControls.posX,
    cameraControls.posY,
    cameraControls.posZ,
    cameraControls.fov,
    cameraControls.zoom,
    cameraControls.near,
    cameraControls.far,
    cameraControls.focus,
    cameraControls.lookAtX,
    cameraControls.lookAtY,
    cameraControls.lookAtZ,
  ])

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[cameraControls.posX, cameraControls.posY, cameraControls.posZ]}
      fov={cameraControls.fov}
      zoom={cameraControls.zoom}
      near={cameraControls.near}
      far={cameraControls.far}
    />
  )
}

export default CameraController
