import { useEffect, useRef } from 'react'
import HeaderNew from '../components/HeaderNew'
import Projects3D from '../components/Projects3D'
import './Projects3DPage.css'

export default function Projects3DPage() {
  const headerRef = useRef(null)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="projects-3d-page">
      <HeaderNew
        innerRef={headerRef}
        activeSection="projects"
        blendActive={false}
      />
      <Projects3D />
    </div>
  )
}
