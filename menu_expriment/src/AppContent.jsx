import { useMemo, useState } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { PROJECT_COPY } from './constants/projects'
import { UNSPLASH_PLACEHOLDERS } from './constants/images'
import { useSharedTextures } from './hooks/useSharedTextures'
import CameraController from './components/CameraController'
import GradientPlanes from './components/GradientPlanes'
import NavBar from './components/NavBar'
import EditorialOverlay from './components/EditorialOverlay'
import './App.css'

function AppContent({ controls }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [uiAnimating, setUiAnimating] = useState(false)
  const [activeNav, setActiveNav] = useState('Home')
  const [activeTag, setActiveTag] = useState('Featured')
  const [isIntroComplete, setIsIntroComplete] = useState(false)
  const expandedTopOffsetRem = 12.2

  const isExpanded = expandedIndex !== null
  const { scene, geometry, scroll, material, trig, fragment, interaction, cameraControls } = controls

  const { textures, previewSources, previewImagesReady } = useSharedTextures(UNSPLASH_PLACEHOLDERS)

  const projects = useMemo(
    () =>
      Array.from({ length: scene.meshCount }, (_, index) => {
        const copy = PROJECT_COPY[index % PROJECT_COPY.length]
        return {
          ...copy,
          title: index < PROJECT_COPY.length ? copy.title : `${copy.title} ${index + 1}`,
        }
      }),
    [scene.meshCount]
  )

  const safeActiveProjectIndex = THREE.MathUtils.clamp(activeProjectIndex, 0, Math.max(projects.length - 1, 0))
  const activeProject = projects[safeActiveProjectIndex] ?? projects[0]
  const canvasDpr = uiAnimating ? [0.75, 1.25] : [1, 2]

  return (
    <main className="app" style={{ background: scene.background }}>
      <NavBar activeNav={activeNav} onActiveNavChange={setActiveNav} />
      <NavBar
        activeNav={activeTag}
        onActiveNavChange={setActiveTag}
        items={['Featured', 'Trending', 'Minimal', 'Studio', 'Archive']}
        className="navbar navbar-secondary"
      />
      <Canvas dpr={canvasDpr} gl={{ alpha: true }}>
        <CameraController cameraControls={cameraControls} />
        <GradientPlanes
          scene={scene}
          geometry={geometry}
          scroll={scroll}
          material={material}
          trig={trig}
          fragment={fragment}
          interaction={interaction}
          textures={textures}
          onActiveIndexChange={setActiveProjectIndex}
          onToggleChange={setExpandedIndex}
          isExpanded={isExpanded}
          onIntroComplete={() => setIsIntroComplete(true)}
        />
      </Canvas>
      <EditorialOverlay
        activeProject={activeProject}
        isExpanded={isExpanded}
        isIntroComplete={isIntroComplete}
        previewSources={previewSources}
        previewImagesReady={previewImagesReady}
        onAnimatingChange={setUiAnimating}
        expandedTopOffsetRem={expandedTopOffsetRem}
      />
    </main>
  )
}

export default AppContent
