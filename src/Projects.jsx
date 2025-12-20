import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import './Projects.css'
import synechronIntroImage from '../img_assets/Syenchron cube intro.png'

const projects = [
  {
    id: 'synechron-cube',
    number: '01',
    title: 'Synechron Cube',
    image: synechronIntroImage,
    tags: ['UX Design', 'UX Research', 'Engineering'],
    description:
      'Jonathan Ramesh is a Interdisciplinary Designer focusing on UX Design and Engineering. Jonathan combines his coding experince and design education to create products focused on bringing back human centered design.',
  },
  {
    id: 'guardian-app',
    number: '02',
    title: 'Guardian App',
    image:
      'https://images.unsplash.com/photo-1639503547276-90230c4a4198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHNlY3VyaXR5JTIwc2hpZWxkJTIwZGlnaXRhbCUyMGRhdGElMjBzaW1wbGlzdGljfGVufDF8fHx8MTc2NjE3Mjc2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Security', 'Mobile App', 'Encryption'],
    description:
      'Guardian App provides state-of-the-art personal security through real-time threat monitoring and secure communication channels. Designed for journalists and activists working in high-risk environments.',
  },
  {
    id: 'wander-app',
    number: '03',
    title: 'Wander App',
    image:
      'https://images.unsplash.com/photo-1461183479101-6c14cd5299c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1hcCUyMG5hdmlnYXRpb24lMjB0cmF2ZWwlMjBzaW1wbGlzdGljfGVufDF8fHx8MTc2NjE3Mjc2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Travel', 'Discovery', 'Social'],
    description:
      'Wander helps travelers discover hidden gems and connect with local communities. By leveraging AI-driven recommendations, it curates personalized itineraries that go beyond the typical tourist traps.',
  },
]

function ArrowUpRightIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id)
  const [isMobile, setIsMobile] = useState(false)
  const indicatorRef = useRef(null)
  const previewRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)')
    const updateMatch = (event) => setIsMobile(event.matches)
    updateMatch(mediaQuery)

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMatch)
    } else {
      mediaQuery.addListener(updateMatch)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateMatch)
      } else {
        mediaQuery.removeListener(updateMatch)
      }
    }
  }, [])

  const activeIndex = projects.findIndex((project) => project.id === activeId)
  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeId) || projects[0],
    [activeId]
  )
  const stride = isMobile ? 65 : 82

  useLayoutEffect(() => {
    if (!indicatorRef.current) return
    gsap.to(indicatorRef.current, {
      y: activeIndex * stride,
      duration: 0.35,
      ease: 'power2.out',
    })
  }, [activeIndex, stride])

  useLayoutEffect(() => {
    if (!previewRef.current) return
    gsap.killTweensOf(previewRef.current)
    gsap.fromTo(
      previewRef.current,
      { autoAlpha: 0, x: -60, y: 0 },
      { autoAlpha: 1, x: 0, y: 0, duration: 0.45, ease: 'power3.out' }
    )
  }, [activeId])

  return (
    <section className="projects-container">
      <div className="projects-inner">
        <header className="projects-header">
          <h2 className="projects-title">Projects</h2>
          <span className="projects-count">{projects.length} items</span>
        </header>

        <div className="projects-content">
          <div className="projects-nav">
            <div className="projects-timeline" aria-hidden="true">
              <div className="projects-line" />
              <div ref={indicatorRef} className="projects-indicator" />
            </div>

            <div className="projects-list">
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  className={`projects-item${
                    activeId === project.id ? ' is-active' : ''
                  }`}
                  onClick={() => setActiveId(project.id)}
                  aria-pressed={activeId === project.id}
                >
                  <span className="projects-item-number">{project.number}</span>
                  <span className="projects-item-title">{project.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div ref={previewRef} className="project-preview">
            <div className="project-image-frame">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="project-image"
              />
            </div>

            <div className="project-meta">
              <div className="project-tags">
                {activeProject.tags.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                className="project-cta"
                onClick={() => navigate(`/project/${activeProject.id}`)}
                aria-label={`View work for ${activeProject.title}`}
              >
                <span className="project-cta-text">view work</span>
                <ArrowUpRightIcon className="project-cta-icon" />
              </button>

              <p className="project-description">{activeProject.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
