import { Leva, useControls } from 'leva'
import AppContent from '../AppContent'
import { CONTROL_SCHEMAS } from '../config/controlSchemas'

function DevControlsApp() {
  const scene = useControls('Scene', CONTROL_SCHEMAS.scene)
  const geometry = useControls('Geometry', CONTROL_SCHEMAS.geometry)
  const scroll = useControls('Scroll', CONTROL_SCHEMAS.scroll)
  const material = useControls('Material', CONTROL_SCHEMAS.material)
  const trig = useControls('Sphere Bend', CONTROL_SCHEMAS.trig)
  const fragment = useControls('Fragment', CONTROL_SCHEMAS.fragment)
  const interaction = useControls('Interaction', CONTROL_SCHEMAS.interaction)
  const cameraControls = useControls('Camera', CONTROL_SCHEMAS.cameraControls)

  return (
    <>
      <Leva collapsed={false} />
      <AppContent
        controls={{ scene, geometry, scroll, material, trig, fragment, interaction, cameraControls }}
      />
    </>
  )
}

export default DevControlsApp
