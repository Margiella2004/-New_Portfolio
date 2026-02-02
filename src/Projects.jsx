import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'
import { projects as baseProjects } from './data/projectsList'
import { projectsData } from './data/projectsData'

gsap.registerPlugin(ScrollTrigger)

const BG_IMAGE_URL =
  'https://images.unsplash.com/photo-1769882068890-1a57d4fc5a24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydGlzdGljJTIwc29mdCUyMHRleHR1cmUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2OTkwODc3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'

const FILTERS = ['All', 'UX/UI Design', 'Creative Coding']
const PROJECT_ROW_EXPANDED_HEIGHT = 350
const PROJECT_ROW_COLLAPSED_HEIGHT = 105
const toRem = (value) => `${value / 16}rem`
const isVideoSrc = (src = '') => /\.(mp4|webm|ogv|mov)(\?|#|$)/i.test(src)

const projectMetaById = Object.fromEntries(
  Object.values(projectsData).map((project) => [project.id, project])
)

const buildProjects = () =>
  baseProjects.map((project) => {
    const meta = projectMetaById[project.id]
    const type = project.tags?.includes('Creative Coding')
      ? 'Creative Coding'
      : 'UX/UI Design'

    return {
      ...project,
      date: meta?.metadata?.date ?? '',
      category: meta?.metadata?.company ?? '',
      type,
      disabled: Boolean(project.disabled),
      image1: meta?.cardImage ?? meta?.heroImage ?? project.image,
      image2:
        meta?.cardFeatureImage ??
        meta?.featureImage ??
        meta?.images?.[0] ??
        project.image,
    }
  })

function ProjectsHeader({ currentFilter, onFilterChange }) {
  const handleFilterHover = (filterKey) => {
    if (filterKey !== currentFilter) {
      onFilterChange(filterKey)
    }
  }

  return (
    <div className="projects-animate-header">
      <div className="projects-animate-title-group">
        <div className="projects-animate-status">
          <div className="projects-animate-status-dot" />
          <p className="projects-animate-status-text">2 project underway</p>
        </div>
        <h1 className="projects-animate-title">Projects</h1>
      </div>

      <div className="projects-animate-filters">
        {FILTERS.map((filter) => {
          const isSelected = currentFilter === filter
          const buttonClassName = [
            'projects-animate-filter',
            isSelected ? 'is-selected' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <button
              key={filter}
              type="button"
              onClick={() => onFilterChange(filter)}
              className={buttonClassName}
              onMouseEnter={() => handleFilterHover(filter)}
              onFocus={() => handleFilterHover(filter)}
            >
              <span className="projects-animate-filter-label">{filter}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ProjectRow({
  index = 0,
  title,
  date,
  category,
  description,
  image1,
  image2,
  onOpen,
}) {
  const isClickable = Boolean(onOpen)
  const containerRef = useRef(null)
  const dateRef = useRef(null)
  const categoryRef = useRef(null)
  const bgOverlayRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const image1Ref = useRef(null)
  const image2Ref = useRef(null)

  const PADDING = 30
  const GAP = 30
  const EXPANDED_HEIGHT = PROJECT_ROW_EXPANDED_HEIGHT
  const COLLAPSED_HEIGHT = PROJECT_ROW_COLLAPSED_HEIGHT

  const IMG1_WIDTH = 380
  const IMG1_HEIGHT = EXPANDED_HEIGHT - PADDING * 2
  const IMG2_WIDTH = 260
  const IMG2_HEIGHT = 235
  const IMG2_TOP = PADDING + IMG1_HEIGHT - IMG2_HEIGHT

  const { contextSafe } = useGSAP({ scope: containerRef })

  const handleMouseEnter = contextSafe(() => {
    if (!isClickable) return
    gsap.to(containerRef.current, {
      height: EXPANDED_HEIGHT,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: true,
    })

    gsap.to([dateRef.current, categoryRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.15,
      ease: 'power1.out',
      overwrite: true,
    })

    gsap.fromTo(
      descriptionRef.current,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.25,
        delay: 0.1,
        ease: 'power2.out',
        overwrite: true,
      }
    )

    gsap.to(bgOverlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: true,
    })

    gsap.to(titleRef.current, {
      color: '#ffffff',
      duration: 0.2,
      ease: 'power2.out',
      overwrite: true,
    })

    gsap.fromTo(
      [image1Ref.current, image2Ref.current],
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.05,
        ease: 'power2.out',
        overwrite: true,
      }
    )
  })

  const handleMouseLeave = contextSafe(() => {
    if (!isClickable) return
    gsap.to(containerRef.current, {
      height: COLLAPSED_HEIGHT,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: true,
    })

    gsap.to([dateRef.current, categoryRef.current], {
      y: 0,
      opacity: 1,
      duration: 0.25,
      delay: 0.1,
      ease: 'power2.out',
      overwrite: true,
    })

    gsap.to(descriptionRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.15,
      ease: 'power1.out',
      overwrite: true,
    })

    gsap.to(bgOverlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: true,
    })

    gsap.to(titleRef.current, {
      color: '#393939',
      duration: 0.2,
      ease: 'power2.out',
      overwrite: true,
    })

    gsap.to([image1Ref.current, image2Ref.current], {
      y: -50,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      overwrite: true,
    })
  })

  const handleKeyDown = (event) => {
    if (!isClickable) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen()
    }
  }

  const renderMedia = (src, label) => {
    if (!src) return null
    if (isVideoSrc(src)) {
      return (
        <video
          className="projects-animate-row-media"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
          <source src={src} type="video/quicktime" />
        </video>
      )
    }
    return (
      <img
        className="projects-animate-row-media"
        src={src}
        alt={label ?? ''}
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <div
      ref={containerRef}
      className={`projects-animate-row${isClickable ? ' is-clickable' : ' is-disabled'}`}
      onMouseEnter={isClickable ? handleMouseEnter : undefined}
      onMouseLeave={isClickable ? handleMouseLeave : undefined}
      onClick={isClickable ? onOpen : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      role={isClickable ? 'link' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `Open ${title} project` : undefined}
      data-cursor={isClickable ? 'expand' : undefined}
      data-cursor-text={isClickable ? 'View Projects' : undefined}
      style={{
        '--row-padding': toRem(PADDING),
        '--row-image-gap': toRem(GAP),
        '--row-image1-width': toRem(IMG1_WIDTH),
        '--row-image1-height': toRem(IMG1_HEIGHT),
        '--row-image2-width': toRem(IMG2_WIDTH),
        '--row-image2-height': toRem(IMG2_HEIGHT),
        '--row-image2-top': toRem(IMG2_TOP),
        '--row-index': index,
      }}
    >
      <div ref={bgOverlayRef} className="projects-animate-row-overlay" />

      <div
        ref={image2Ref}
        className="projects-animate-row-image projects-animate-row-image-small"
        style={{
          right: `calc(var(--row-padding) + var(--row-image1-width) + var(--row-image-gap))`,
          top: 'var(--row-image2-top)',
        }}
      >
        {renderMedia(image2, title)}
      </div>

      <div
        ref={image1Ref}
        className="projects-animate-row-image projects-animate-row-image-large"
        style={{
          right: 'var(--row-padding)',
          top: 'var(--row-padding)',
        }}
      >
        {renderMedia(image1, title)}
      </div>

      <div className="projects-animate-row-content">
        <div className="projects-animate-row-title-wrap">
          <h2 ref={titleRef} className="projects-animate-row-title">
            {title}
          </h2>
        </div>

        <div className="projects-animate-row-meta">
          <p ref={dateRef} className="projects-animate-row-date">
            {date}
          </p>
          <p ref={descriptionRef} className="projects-animate-row-description">
            {description}
          </p>
        </div>

        <div ref={categoryRef} className="projects-animate-row-category">
          <p className="projects-animate-row-category-text">{category}</p>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const listRef = useRef(null)
  const hasFilterAnimatedRef = useRef(false)
  const projects = useMemo(() => buildProjects(), [])
  const filteredProjects = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((project) => project.type === filter),
    [filter, projects]
  )


  useGSAP(
    () => {
      const headerEl = headerRef.current
      const listEl = listRef.current
      const sectionEl = sectionRef.current
      if (!headerEl || !listEl || !sectionEl) return

      const reducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

      const getTargets = () => [
        headerEl,
        ...listEl.querySelectorAll('.projects-animate-row'),
      ]

      if (reducedMotion) {
        getTargets().forEach((el) => {
          el.classList.remove('projects-enter-prepare', 'projects-enter')
        })
        return
      }

      getTargets().forEach((el) => {
        el.classList.remove('projects-enter')
        el.classList.add('projects-enter-prepare')
      })

      const runIntroAnimation = () => {
        const targets = getTargets()
        targets.forEach((el) => {
          el.classList.remove('projects-enter')
          el.classList.add('projects-enter-prepare')
        })
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            targets.forEach((el) => {
              el.classList.remove('projects-enter-prepare')
              el.classList.add('projects-enter')
            })
          })
        })
      }

      const trigger = ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top 30%',
        toggleActions: 'play none none none',
        once: true,
        onEnter: runIntroAnimation,
      })

      return () => {
        trigger.kill()
        getTargets().forEach((el) => {
          el.classList.remove('projects-enter-prepare', 'projects-enter')
        })
      }
    },
    { scope: sectionRef }
  )

  useEffect(() => {
    if (!listRef.current) return

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

    if (reducedMotion) {
      hasFilterAnimatedRef.current = true
      return
    }

    if (!hasFilterAnimatedRef.current) {
      hasFilterAnimatedRef.current = true
      return
    }

    const rows = Array.from(listRef.current.querySelectorAll('.projects-animate-row'))
    if (!rows.length) return

    rows.forEach((row) => {
      row.classList.remove('projects-enter')
      row.classList.add('projects-enter-prepare')
    })

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        rows.forEach((row) => {
          row.classList.remove('projects-enter-prepare')
          row.classList.add('projects-enter')
        })
      })
    })
  }, [filter, filteredProjects.length])

  const listStyle = {
    '--projects-row-collapsed-height': toRem(PROJECT_ROW_COLLAPSED_HEIGHT),
    '--projects-row-expanded-height': toRem(PROJECT_ROW_EXPANDED_HEIGHT),
    '--projects-row-extra-reserve': toRem(
      PROJECT_ROW_EXPANDED_HEIGHT - PROJECT_ROW_COLLAPSED_HEIGHT
    ),
    '--projects-row-count': Math.max(projects.length, 1),
    '--projects-list-offset': toRem(PROJECT_ROW_COLLAPSED_HEIGHT),
  }

  return (
    <section
      ref={sectionRef}
      className="projects-animate"
    >
      <div className="projects-animate-content">
        <div className="projects-animate-inner">
          <div ref={headerRef}>
            <ProjectsHeader
              currentFilter={filter}
              onFilterChange={setFilter}
            />
          </div>

          <div ref={listRef} className="projects-animate-list" style={listStyle}>
            {filteredProjects.map((project, index) => (
              <ProjectRow
                key={project.id}
                index={index}
                title={project.title}
                date={project.date}
                category={project.category}
                description={project.description}
                image1={project.image1}
                image2={project.image2}
                onOpen={project.disabled ? undefined : () => navigate(`/project/${project.id}`)}
              />
            ))}
            <div className="projects-animate-list-end" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
