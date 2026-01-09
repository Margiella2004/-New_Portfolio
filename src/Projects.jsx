import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'
import { projects } from './data/projectsList'

gsap.registerPlugin(ScrollTrigger)


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

// Polaroid Images Component
function PolaroidImages() {
  return (
    <div className="polaroid-container">
      <div className="polaroid polaroid-1">
        <img src={projects[0].image} alt="" />
      </div>
      <div className="polaroid polaroid-2">
        <img src={projects[1].image} alt="" />
      </div>
      <div className="polaroid polaroid-3">
        <img src={projects[2].image} alt="" />
      </div>
    </div>
  )
}

export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id)
  const [isMobile, setIsMobile] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [cutoutRect, setCutoutRect] = useState(null)
  const containerRef = useRef(null)
  const indicatorRef = useRef(null)
  const previewRef = useRef(null)
  const introTitleRef = useRef(null)
  const introDescRef = useRef(null)
  const projectsSectionRef = useRef(null)
  const scrollTriggerRef = useRef(null)
  const cutoutRectRef = useRef(null)
  const windowFramePlayedRef = useRef(false)
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
  const isGuardianProject = activeProject.id === 'guardian-app'
  const isWanderProject = activeProject.id === 'wander-app'
  const isImageClickable = Boolean(activeProject?.id)
  const handleImageClick = () => {
    if (!isImageClickable) return
    navigate(`/project/${activeProject.id}`)
  }
  const handleImageKeyDown = (event) => {
    if (!isImageClickable) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleImageClick()
    }
  }
  const stride = isMobile ? 65 : 82

  useLayoutEffect(() => {
    if (!containerRef.current) return

    const updateCutout = () => {
      const container = containerRef.current
      if (!container) return

      const styles = getComputedStyle(container)
      const parseLength = (value, fallback) => {
        if (!value) return fallback
        const trimmed = String(value).trim()
        const numeric = parseFloat(trimmed)
        if (Number.isNaN(numeric)) return fallback
        if (trimmed.endsWith('rem')) {
          const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
          return numeric * rootSize
        }
        if (trimmed.endsWith('vw')) return (numeric / 100) * window.innerWidth
        if (trimmed.endsWith('vh')) return (numeric / 100) * window.innerHeight
        return numeric
      }

      const padding = parseLength(styles.getPropertyValue('--projects-intro-padding'), 65)
      const cutoutHeight = parseLength(styles.getPropertyValue('--projects-cutout-height'), 300)
      const cutoutY = parseLength(styles.getPropertyValue('--projects-cutout-y'), 120)
      const cutoutRadius = parseLength(styles.getPropertyValue('--projects-cutout-radius'), 16)
      const containerWidth = container.clientWidth
      const containerHeight = Math.max(container.scrollHeight, container.clientHeight)
      const cutoutWidth = Math.max(0, containerWidth - padding * 2)

      setCutoutRect({
        x: padding,
        y: cutoutY,
        width: cutoutWidth,
        height: cutoutHeight,
        radius: cutoutRadius,
        containerWidth,
        containerHeight,
      })
    }

    updateCutout()

    const resizeObserver = new ResizeObserver(updateCutout)
    resizeObserver.observe(containerRef.current)

    return () => resizeObserver.disconnect()
  }, [])

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

  // Window frame expand animation (earlier than other animations)
  useEffect(() => {
    if (!cutoutRectRef.current || !cutoutRect || !introTitleRef.current) return

    const fullWidth = cutoutRect.width
    const startX = cutoutRect.x + fullWidth

    let tween

    if (windowFramePlayedRef.current) {
      gsap.set(cutoutRectRef.current, {
        attr: { width: fullWidth, x: cutoutRect.x },
      })
      return undefined
    }

    // Set initial state - width 0, positioned at right edge
    gsap.set(cutoutRectRef.current, {
      attr: { width: 0, x: startX },
    })

    // Animate to full width once, then keep it there
    tween = gsap.to(cutoutRectRef.current, {
      attr: { width: fullWidth, x: cutoutRect.x },
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: introTitleRef.current,
        start: 'top 60%',
        toggleActions: 'play none none none',
        once: true,
        onEnter: () => {
          windowFramePlayedRef.current = true
        },
      },
    })

    return () => {
      if (tween?.scrollTrigger) tween.scrollTrigger.kill()
      tween?.kill()
    }
  }, [cutoutRect])

  // Intro scroll animations
  useEffect(() => {
    if (!introTitleRef.current || !introDescRef.current) return

    // Split description text into words
    const descText = introDescRef.current.textContent
    const words = descText.split(' ')
    introDescRef.current.innerHTML = words
      .map((word) => `<span class="word-wrapper"><span class="word">${word}</span></span>`)
      .join(' ')

    const wordElements = introDescRef.current.querySelectorAll('.word')
    const titleLetters = introTitleRef.current.querySelectorAll('.projects-intro-title-p, .projects-intro-title-rest')
    const polaroids = document.querySelectorAll('.polaroid')

    // Set initial states - vertical slide up effect for title
    gsap.set(titleLetters, { yPercent: 100, opacity: 0 })
    gsap.set(wordElements, { opacity: 0, y: 30 })

    // Set initial states for polaroids - slide from left, already rotated
    gsap.set(polaroids, {
      opacity: 0,
      x: -80,
      rotation: (index) => index === 0 ? -3.3 : 5.763
    })

    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: introTitleRef.current,
        start: 'top 30%',
        toggleActions: 'play none none none',
        once: true,
      },
    })

    // Vertical slide reveal for title
    tl.to(titleLetters, {
      yPercent: 0,
      opacity: 1,
      duration: 2,
      stagger: 0.15,
      ease: 'expo.out',
    })

    // Polaroids slide in from left (subtle, horizontal only)
    tl.to(
      polaroids,
      {
        opacity: 1,
        x: 0,
        duration: 2,
        stagger: 0.15,
        ease: 'power2.out',
      },
      '-=1.5'
    )

    // Word reveal animation
    tl.to(
      wordElements,
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.08,
        ease: 'power2.out',
      },
      '-=1.8'
    )

    return () => {
      tl.kill()
    }
  }, [])

  // Auto-scroll animation through projects
  useEffect(() => {
    if (hasUserInteracted) return

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
    })

    tl.call(() => setActiveId(projects[0].id))
      .to({}, { duration: 3 })
      .call(() => setActiveId(projects[1].id))
      .to({}, { duration: 3 })
      .call(() => setActiveId(projects[2].id))
      .to({}, { duration: 3 })

    scrollTriggerRef.current = tl

    return () => {
      tl.kill()
    }
  }, [hasUserInteracted])

  // Handle user click - disable scroll animation
  const handleProjectClick = (projectId) => {
    setHasUserInteracted(true)
    setActiveId(projectId)
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill()
    }
  }

  return (
    <section
      ref={containerRef}
      className={`projects-container${cutoutRect ? ' has-cutout' : ''}`}
    >
      <svg
        className="projects-cutout-defs"
        aria-hidden="true"
        focusable="false"
        width="0"
        height="0"
      >
        <defs>
          <mask
            id="projects-cutout-mask"
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={cutoutRect?.containerWidth || 0}
            height={cutoutRect?.containerHeight || 0}
          >
            <rect
              x="0"
              y="0"
              width={cutoutRect?.containerWidth || 0}
              height={cutoutRect?.containerHeight || 0}
              fill="#ffffff"
            />
            {cutoutRect && (
              <rect
                ref={cutoutRectRef}
                x={cutoutRect.x}
                y={cutoutRect.y}
                width={cutoutRect.width}
                height={cutoutRect.height}
                rx={cutoutRect.radius}
                ry={cutoutRect.radius}
                fill="#000000"
              />
            )}
          </mask>
        </defs>
      </svg>
      {/* Intro Section - Full Viewport */}
      <div className="projects-intro">
        <div className="projects-intro-content">
          <div className="projects-intro-header">
            <h1 ref={introTitleRef} className="projects-intro-title">
              <span className="title-mask">
                <span className="projects-intro-title-p">P</span>
              </span>
              <span className="title-mask">
                <span className="projects-intro-title-rest">rojects</span>
              </span>
            </h1>
            <PolaroidImages />
          </div>
          <p ref={introDescRef} className="projects-intro-description">
            Jonathan Ramesh is a Interdisciplinary Designer focusing on UX Design and Engineering.
          </p>
        </div>
      </div>

      {/* Original Projects Content */}
      <div ref={projectsSectionRef} className="projects-inner">
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
                  onClick={() => handleProjectClick(project.id)}
                  aria-pressed={activeId === project.id}
                >
                  <span className="projects-item-number">{project.number}</span>
                  <span className="projects-item-title">{project.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div
            ref={previewRef}
            className={`project-preview${isWanderProject ? ' is-muted' : ''}`}
          >
            <div
              className={`project-image-frame${isGuardianProject ? ' project-image-frame--contain' : ''}${
                isImageClickable ? ' is-clickable' : ''
              }`}
              onClick={isImageClickable ? handleImageClick : undefined}
              onKeyDown={isImageClickable ? handleImageKeyDown : undefined}
              role={isImageClickable ? 'button' : undefined}
              tabIndex={isImageClickable ? 0 : undefined}
              aria-label={isImageClickable ? `Open ${activeProject.title} project` : undefined}
            >
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className={`project-image${isGuardianProject ? ' project-image--contain' : ''}`}
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
                className={`project-cta${isWanderProject ? ' is-disabled' : ''}`}
                onClick={() => {
                  if (!isWanderProject) navigate(`/project/${activeProject.id}`)
                }}
                aria-label={`View work for ${activeProject.title}`}
                disabled={isWanderProject}
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
