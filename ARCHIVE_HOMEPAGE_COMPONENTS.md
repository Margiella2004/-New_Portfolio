# Archived Homepage Components

This file contains the archived code for the Projects section and FloatingTabs from the homepage.

---

## Projects.jsx

```jsx
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
```

---

## Projects.css

```css
.projects-animate {
  position: relative;
  width: 100%;
}

@keyframes projects-enter {
  0% {
    opacity: 0;
    transform: translateY(-0.25rem);
    filter: blur(0.1875rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.projects-enter-prepare {
  opacity: 0;
  transform: translateY(-0.25rem);
  filter: blur(0.1875rem);
}

.projects-enter {
  animation: projects-enter 0.5s ease-in-out both;
  animation-delay: calc(var(--row-index, 0) * 0.12s);
  will-change: transform, opacity, filter;
}

.projects-animate-content {
  position: relative;
  z-index: 10;
  width: 100%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  padding: 5rem 1.25rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow-x: hidden;
}

.projects-animate-inner {
  width: var(--content-total-width, var(--page-width, 90vw));
  max-width: var(--page-max-width, 87.5rem);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  position: relative;
  z-index: 1;
}

.projects-animate-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.25rem;
  width: 100%;
}

.projects-animate-title-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.125rem;
}

.projects-animate-status {
  display: flex;
  align-items: center;
  gap: 0.3125rem;
}

.projects-animate-status-dot {
  width: 0.5625rem;
  height: 0.5625rem;
  background: #6f3d59;
  border-radius: 62.4375rem;
  animation: projectsPulse 2s ease-in-out infinite;
}

.projects-animate-status-text {
  margin: 0;
  color: #967286;
  font-size: 0.75rem;
  letter-spacing: -0.015rem;
}

.projects-animate-title {
  margin: 0;
  color: #393939;
  font-size: 1.8125rem;
  letter-spacing: -0.03625rem;
  font-weight: 400;
}

.projects-animate-filters {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  position: relative;
  align-items: center;
}

.projects-animate-filter {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0.375rem 1.5625rem;
  border-radius: 0.625rem;
  border: none;
  background: transparent;
  color: #393939;
  font-size: 1rem;
  line-height: 1;
  letter-spacing: -0.02rem;
  cursor: pointer;
  font-weight: 400;
  transition: none;
  z-index: 1;
}

.projects-animate-filter:hover,
.projects-animate-filter:focus-visible {
  outline: none;
}

.projects-animate-filter.is-selected {
  background: #6f3c59;
  color: #ffffff;
  font-weight: 500;
  text-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.3);
}

.projects-animate-filter-label {
  position: relative;
  z-index: 1;
}

.projects-animate-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #ffffff;
  margin-top: var(--projects-list-offset, 0rem);
  min-height: calc(
    (var(--projects-row-collapsed-height, 6.5625rem) * var(--projects-row-count, 1)) +
    var(--projects-row-extra-reserve, 0rem) +
    var(--projects-list-offset, 0rem)
  );
}

.projects-animate-list-end {
  border-top: 0.0625rem solid #1e1e1e;
  width: 100%;
}

.projects-animate-row {
  width: 100%;
  border-top: 0.0625rem solid #1e1e1e;
  height: var(--projects-row-collapsed-height, 6.5625rem);
  position: relative;
  overflow: hidden;
  background: inherit;
  outline: none;
  transition: background 0.2s ease;
}

.projects-animate-row.is-clickable {
  cursor: pointer;
}

.projects-animate-row.is-clickable:focus-visible {
  outline: 0.125rem solid #6f3d59;
  outline-offset: 0.125rem;
}

.projects-animate-row.is-clickable:hover {
  background: #6f3c59 !important;
}


.projects-animate-row-overlay {
  position: absolute;
  inset: 0;
  background: inherit;
  z-index: 0;
  transition: opacity 0.3s ease;
}

.projects-animate-row.is-clickable:hover .projects-animate-row-overlay {
  opacity: 0 !important;
}

.projects-animate-row-image {
  position: absolute;
  z-index: 20;
  opacity: 0;
  transform: translateY(-3.125rem);
  will-change: transform, opacity;
  display: flex;
  align-items: center;
  justify-content: center;
}

.projects-animate-row-image-large {
  width: var(--row-image1-width, 23rem);
  height: var(--row-image1-height, 18.125rem);
}

.projects-animate-row-image-small {
  width: var(--row-image2-width, 15.625rem);
  height: var(--row-image2-height, 11.4375rem);
}

.projects-animate-row-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
}

.projects-animate-row-image-small .projects-animate-row-media {
  object-fit: contain;
  object-position: bottom center;
}

.projects-animate-row-content {
  position: relative;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--row-padding, 1.875rem);
}

.projects-animate-row-title-wrap {
  flex-shrink: 0;
  position: relative;
  z-index: 40;
}

.projects-animate-row-title {
  margin: 0;
  font-family: 'Instrument Serif', serif;
  font-style: italic;
  font-size: 2.5rem;
  line-height: 0.704;
  color: #393939;
  letter-spacing: -0.125rem;
}

.projects-animate-row-meta {
  position: absolute;
  left: 26%;
  top: 50%;
  transform: translateY(-50%);
  width: 18.75rem;
}

.projects-animate-row-date {
  margin: 0;
  font-size: 1rem;
  line-height: 0.704;
  color: #000000;
  letter-spacing: -0.05rem;
  text-align: left;
}

.projects-animate-row-description {
  margin: 0;
  font-size: 1rem;
  line-height: 1.22;
  color: #ffffff;
  letter-spacing: -0.05rem;
  width: 17.5rem;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
}

.projects-animate-row-category {
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
  position: relative;
  z-index: 30;
}

.projects-animate-row-category-text {
  margin: 0;
  font-size: 1rem;
  line-height: 0.704;
  color: #000000;
  letter-spacing: -0.05rem;
  text-align: right;
}

@keyframes projectsPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

---

## FloatingTabs.jsx

```jsx
import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'
import './FloatingTabs.css'

gsap.registerPlugin(Draggable)

const svgPaths = {
  arrowFill: 'M8.62993 17.3546C8.11411 18.5152 7.8562 19.0955 7.51634 19.259C7.2084 19.4072 6.84691 19.3924 6.55205 19.2197C6.22665 19.029 6.01687 18.4296 5.5973 17.2308L0.453158 2.5333C0.098368 1.51961 -0.0790272 1.01276 0.033754 0.678435C0.136221 0.374682 0.374682 0.136221 0.678435 0.033754C1.01276 -0.0790272 1.51961 0.098368 2.53329 0.453158L17.2308 5.5973C18.4296 6.01687 19.029 6.22665 19.2197 6.55205C19.3924 6.84691 19.4072 7.2084 19.259 7.51634C19.0955 7.8562 18.5152 8.11411 17.3546 8.62993L11.8882 11.0594C11.6782 11.1527 11.5733 11.1994 11.4834 11.2656C11.4002 11.3268 11.3268 11.4002 11.2656 11.4834C11.1994 11.5733 11.1527 11.6782 11.0594 11.8882L8.62993 17.3546Z',
  arrowStroke:
    'M0.852616 0.549882C0.86322 0.546334 0.942849 0.526288 1.21785 0.59578C1.48379 0.662989 1.83672 0.785969 2.35359 0.966874L17.0509 6.11141C17.6602 6.32467 18.0831 6.47294 18.38 6.60652C18.526 6.67223 18.6212 6.72609 18.6827 6.76961C18.7426 6.81205 18.7531 6.83236 18.7501 6.82723C18.8312 6.96564 18.8382 7.13579 18.7686 7.28035C18.7712 7.27504 18.7626 7.29654 18.7061 7.34383C18.6484 7.39221 18.5573 7.45295 18.4171 7.53035C18.1321 7.68763 17.7226 7.86982 17.1329 8.13191L11.6671 10.5616C11.4787 10.6453 11.3089 10.7177 11.1602 10.8272C11.0331 10.9209 10.9209 11.0331 10.8272 11.1602C10.7177 11.3089 10.6453 11.4787 10.5616 11.6671L8.13191 17.1329C7.86982 17.7226 7.68763 18.1321 7.53035 18.4171C7.45295 18.5573 7.39221 18.6484 7.34383 18.7061C7.29654 18.7626 7.27504 18.7712 7.28035 18.7686C7.13579 18.8382 6.96564 18.8312 6.82723 18.7501C6.83236 18.7531 6.81205 18.7426 6.76961 18.6827C6.72609 18.6212 6.67223 18.526 6.60652 18.38C6.47294 18.0831 6.32467 17.6602 6.11141 17.0509L0.966874 2.35359C0.785969 1.83672 0.662989 1.48379 0.59578 1.21785C0.526288 0.942849 0.546334 0.86322 0.549882 0.852616C0.597985 0.710019 0.710019 0.597985 0.852616 0.549882Z',
}

const defaultTabs = [
  {
    id: 'ux-research',
    label: 'UX Research',
    position: { left: '18%', top: '26%' },
    arrowPosition: { left: '32%', bottom: '-24px' },
    baseRotation: -34,
    delay: 0.3,
  },
  {
    id: 'branding',
    label: 'Branding',
    position: { left: '38%', top: '86%' },
    arrowPosition: { left: '52%', top: '96%' },
    baseRotation: 6,
    delay: 1.1,
  },
  {
    id: 'creative-direction',
    label: 'Creative Direction',
    position: { left: '50%', top: '22%' },
    arrowPosition: { right: '14%', top: '96%' },
    baseRotation: 270,
    delay: 0.6,
  },
  {
    id: 'typography',
    label: 'Typography',
    position: { left: '72%', top: '88%' },
    arrowPosition: { left: '50%', top: '-26px' },
    baseRotation: -10,
    delay: 1.5,
  },
  {
    id: 'ui-design',
    label: 'UI Design',
    position: { left: '84%', top: '28%' },
    arrowPosition: { left: '14%', top: '102%' },
    baseRotation: -76,
    delay: 0,
  },
  {
    id: 'react',
    label: 'React',
    position: { left: '54%', top: '92%' },
    arrowPosition: { left: '50%', top: '-26px' },
    baseRotation: 20,
    delay: 0.9,
  },
  {
    id: 'three-d-engineering',
    label: '3D Engineering',
    position: { left: '26%', top: '74%' },
    arrowPosition: { left: '18%', top: '100%' },
    baseRotation: -18,
    delay: 0.45,
  },
]

const ARROW_ROTATION_OFFSET = -45
const INTRO_REVEAL_STAGGER = 0.12

export default function FloatingTabs({
  enabled = true,
  introActive = false,
  floatAmpX = 6,
  floatAmpY = 10,
  floatSpeedX = 9,
  floatSpeedY = 8,
  hoverScale = 1.05,
  dragScale = 1.1,
  arrowWiggle = 3,
  arrowDelayOffset = 0,
}) {
  const containerRef = useRef(null)
  const tabRefs = useRef([])
  const arrowRefs = useRef([])
  const targetRef = useRef(null)

  const tabs = useMemo(() => defaultTabs, [])

  useEffect(() => {
    if (!enabled) return

    targetRef.current = document.querySelector('.design-engineer-container')
    const floatTweens = []
    const arrowTweens = []
    const draggables = []
    const cleanupHandlers = []

    tabs.forEach((tab, index) => {
      const node = tabRefs.current[index]
      const arrowNode = arrowRefs.current[index]
      if (!node) return

      gsap.set(node, { opacity: introActive ? 0 : 1, scale: introActive ? 0.92 : 1 })

      const xRange = floatAmpX
      const yRange = floatAmpY

      const floatY = gsap.fromTo(
        node,
        { y: -(yRange / 2) },
        {
          y: yRange / 2,
          duration: floatSpeedY,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: tab.delay || 0,
        }
      )

      const floatX = gsap.fromTo(
        node,
        { x: -(xRange / 2) },
        {
          x: xRange / 2,
          duration: floatSpeedX,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: (tab.delay || 0) + 0.4,
        }
      )

      floatTweens.push(floatX, floatY)

      const hoverIn = () =>
        gsap.to(node, { scale: hoverScale, duration: 0.22, ease: 'power1.out' })
      const hoverOut = () =>
        gsap.to(node, { scale: 1, duration: 0.22, ease: 'power1.out' })
      const press = () =>
        gsap.to(node, { scale: dragScale, duration: 0.16, ease: 'power1.out' })
      const release = () =>
        gsap.to(node, { scale: hoverScale, duration: 0.18, ease: 'power1.out' })

      node.addEventListener('pointerenter', hoverIn)
      node.addEventListener('pointerleave', hoverOut)
      cleanupHandlers.push(() => {
        node.removeEventListener('pointerenter', hoverIn)
        node.removeEventListener('pointerleave', hoverOut)
      })

      const dragInstance = Draggable.create(node, {
        type: 'x,y',
        inertia: false,
        onPress() {
          node.style.cursor = 'grabbing'
          node.style.zIndex = '60'
          press()
        },
        onRelease() {
          node.style.cursor = 'grab'
          node.style.zIndex = ''
          release()
        },
        onDrag() {
          node.style.cursor = 'grabbing'
        },
        onDragEnd() {
          node.style.cursor = 'grab'
        },
      })

      draggables.push(dragInstance[0])
      node.style.cursor = 'grab'

      if (arrowNode) {
        const tl = gsap.timeline({
          repeat: -1,
          defaults: { ease: 'sine.inOut' },
          delay: (tab.delay || 0) + arrowDelayOffset,
        })

        tl.to(arrowNode, {
          x: 2.5,
          y: -2.5,
          duration: 2.25,
        })
          .to(arrowNode, {
            x: -2.5,
            y: 2.5,
            duration: 2.25,
          })
          .to(arrowNode, {
            x: 0,
            y: 0,
            duration: 2,
          })

        arrowTweens.push(tl)
      }
    })

    const updateArrowAim = () => {
      const target = targetRef.current
      if (!target) return
      const targetRect = target.getBoundingClientRect()
      const targetX = targetRect.left + targetRect.width / 2
      const targetY = targetRect.top + targetRect.height / 2

      tabs.forEach((tab, index) => {
        const node = tabRefs.current[index]
        const arrowNode = arrowRefs.current[index]
        if (!node || !arrowNode) return
        const rect = node.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const angle = Math.atan2(targetY - centerY, targetX - centerX) * (180 / Math.PI)
        gsap.set(arrowNode, { rotation: angle + ARROW_ROTATION_OFFSET })
      })
    }

    updateArrowAim()
    gsap.ticker.add(updateArrowAim)
    const handleResize = () => updateArrowAim()
    window.addEventListener('resize', handleResize)

    return () => {
      gsap.ticker.remove(updateArrowAim)
      window.removeEventListener('resize', handleResize)
      floatTweens.forEach((tween) => tween.kill())
      arrowTweens.forEach((tl) => tl.kill())
      draggables.forEach((drag) => drag?.kill())
      cleanupHandlers.forEach((fn) => fn())
    }
  }, [
    enabled,
    floatAmpX,
    floatAmpY,
    floatSpeedX,
    floatSpeedY,
    hoverScale,
    dragScale,
    arrowWiggle,
    arrowDelayOffset,
    introActive,
    tabs,
  ])

  useEffect(() => {
    if (!enabled) return
    if (introActive) return

    const reveals = []
    tabs.forEach((tab, index) => {
      const node = tabRefs.current[index]
      if (!node) return
      gsap.set(node, { opacity: 0, scale: 0.92 })
      reveals.push(
        gsap.to(node, {
          opacity: 1,
          scale: 1,
          duration: 0.55,
          ease: 'power2.out',
          delay: index * INTRO_REVEAL_STAGGER,
        })
      )
    })

    return () => {
      reveals.forEach((tween) => tween.kill())
    }
  }, [enabled, introActive, tabs])

  if (!enabled) return null

  return (
    <div className="floating-tabs" ref={containerRef} aria-hidden="true">
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          className={`floating-tab floating-tab-${tab.id}`}
          style={tab.position}
          ref={(el) => {
            tabRefs.current[index] = el
          }}
        >
          <div
            className="floating-tab-inner"
          >
            <span className="floating-tab-label">{tab.label}</span>
            <div className="floating-tab-border" />
          </div>

          <div
          className="floating-tab-arrow"
          style={tab.arrowPosition}
          ref={(el) => {
            arrowRefs.current[index] = el
          }}
        >
          <svg
            viewBox="0 0 20 20"
            className="floating-tab-arrow-icon"
          >
            <path
              d={svgPaths.arrowStroke}
              stroke="currentColor"
              strokeLinejoin="bevel"
              strokeOpacity="0.9"
              strokeWidth="1.1"
              fill="none"
            />
          </svg>
          </div>
        </div>
      ))}
    </div>
  )
}
```

---

## FloatingTabs.css

```css
.floating-tabs {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: min(98vw, var(--page-max-width, 96rem));
  height: 30rem;
  pointer-events: none;
  z-index: 60;
}

.floating-tab {
  position: absolute;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 6.5rem;
  height: 2.125rem;
  transform: translate(-50%, -50%);
  will-change: transform;
}

.floating-tab-inner {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 2.25rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.floating-tab-label {
  font-family: 'Pangea Afrikan VAR 2.003', -apple-system, system-ui, sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1rem;
  letter-spacing: -0.01rem;
  color: white;
  white-space: nowrap;
  position: relative;
  z-index: 1;
}

.floating-tab-border {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 0.0625rem solid rgba(255, 255, 255, 0.7);
  pointer-events: none;
}

.floating-tab-arrow {
  position: absolute;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.floating-tab-arrow-icon {
  width: 100%;
  height: 100%;
  display: block;
  color: #ffffff;
}

@media (max-width: 64rem) {
  .floating-tabs {
    height: 24rem;
    bottom: 0.5rem;
  }

  .floating-tab {
    min-width: 5.75rem;
    height: 1.875rem;
  }

  .floating-tab-inner {
    padding: 0 2rem;
  }

  .floating-tab-label {
    font-size: 0.6875rem;
  }

  .floating-tab-arrow {
    width: 0.875rem;
    height: 0.875rem;
  }
}

@media (max-width: 48rem) {
  .floating-tabs {
    width: 94vw;
    height: 18rem;
    bottom: 0.25rem;
  }

  .floating-tab {
    min-width: 5.25rem;
    height: 1.75rem;
  }

  .floating-tab-inner {
    padding: 0 1.75rem;
  }

  .floating-tab-label {
    font-size: 0.625rem;
  }

  .floating-tab-arrow {
    width: 0.75rem;
    height: 0.75rem;
  }

  .floating-tab-ux-research { left: 16% !important; top: 4% !important; }
  .floating-tab-creative-direction { left: 52% !important; top: 10% !important; }
  .floating-tab-ui-design { left: 84% !important; top: 16% !important; }
  .floating-tab-three-d-engineering { left: 28% !important; top: 22% !important; }
  .floating-tab-typography { left: 70% !important; top: 80% !important; }
  .floating-tab-branding { left: 42% !important; top: 88% !important; }
  .floating-tab-react { left: 56% !important; top: 96% !important; }
}

@media (max-width: 35rem) {
  .floating-tabs {
    height: 16rem;
  }

  .floating-tab {
    min-width: 4.75rem;
    height: 1.625rem;
  }

  .floating-tab-inner {
    padding: 0 1.6rem;
  }

  .floating-tab-label {
    font-size: 0.59375rem;
  }

  .floating-tab-arrow {
    width: 0.6875rem;
    height: 0.6875rem;
  }

  .floating-tab-ux-research { left: 14% !important; top: 2% !important; }
  .floating-tab-creative-direction { left: 50% !important; top: 8% !important; }
  .floating-tab-ui-design { left: 84% !important; top: 14% !important; }
  .floating-tab-three-d-engineering { left: 28% !important; top: 20% !important; }
  .floating-tab-typography { left: 70% !important; top: 82% !important; }
  .floating-tab-branding { left: 42% !important; top: 90% !important; }
  .floating-tab-react { left: 56% !important; top: 98% !important; }
}
```

---

# Change Log

## Session: March 2, 2026

### 1. Updated Default Control Values

**File: `src/config/controlDefaults.js`**

Updated the following default values based on user's Leva panel screenshots:

| Section | Property | Old Value | New Value |
|---------|----------|-----------|-----------|
| Scene | background | `#ffffff` | `#000000` |
| Geometry | width | `4.35` | `5.9` |
| Geometry | height | `2.95` | `4.5` |
| Geometry | widthBias | `1` | `1.3` |
| Scroll | sensitivity | `1000` | `1350` |
| Trig | progressMultiplier | `-0.74` | `-1.1` |
| Trig | sphereRadiusMultiplier | `3.9` | `8.9` |
| Trig | sphereCenterY | `-0.2` | `-0.9` |
| Trig | bendStrength | `-2.3` | `3.4` |
| Camera | posZ | `5` | `7.3` |
| Camera | fov | `70` | `81` |

### 2. Updated Typography Defaults

**File: `src/components/Projects3D.jsx`**

Updated typography controls default values:

| Property | Old Value | New Value |
|----------|-----------|-----------|
| titleSize | `3` | `3.8` |
| titleWeight | `400` | `600` |
| titleItalic | `true` | `false` |
| titleColor | `#000000` | `#f0f0f0` |
| titleLetterSpacing | `-0.15` | `-0.1` |
| tagsColor | `#9a9494` | `#ffffff` |
| descSize | `1` | `0.9` |
| descWeight | `400` | `500` |
| descColor | `#000000` | `#898989` |
| descLineHeight | `1.22` | `1.42` |
| triangleColor | `#ffffff` | `#6f6f6f` |
| triangleSize | `1` | `0.5` |
| triangleGap | `1.5` | `1.2` |

### 3. Fixed Opacity Bug

**File: `src/components/GradientPlanes.jsx`**

**Bug:** Images would stay at full opacity after being selected instead of returning to greyed-out state when scrolling away.

**Fix:** Added logic to clear the `toggledMeshIndices` set when the active index changes (when scrolling to a new tile).

```javascript
// Added at line ~294-298
if (lastActiveIndexRef.current !== activeIndex) {
  lastActiveIndexRef.current = activeIndex
  onActiveIndexChange?.(activeIndex)
  // Clear toggled state when scrolling to a new tile
  if (toggledMeshIndices.current.size > 0) {
    toggledMeshIndices.current = new Set()
  }
}
```

This ensures that when the user scrolls to a different tile, all previously selected tiles return to their greyed-out state.
