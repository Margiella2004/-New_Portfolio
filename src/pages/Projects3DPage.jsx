import { useEffect, useRef } from 'react'
import HeaderNew from '../components/HeaderNew'
import Projects from '../Projects'
import './Projects3DPage.css'

export default function Projects3DPage() {
  const headerRef = useRef(null)

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
      <main className="projects-3d-page-content">
        <Projects />
      </main>
    </div>
  )
}
