import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects as baseProjects } from './data/projectsList'
import { projectsData } from './data/projectsData'
import './Projects.css'

const metaById = Object.fromEntries(
  Object.values(projectsData).map((project) => [project.id, project])
)

const getTagLabel = (tag) => {
  if (!tag) return null
  if (typeof tag === 'string') return tag
  return tag.label ?? null
}

const buildProjects = () =>
  baseProjects.map((project, index) => {
    const meta = metaById[project.id]
    const description =
      (meta?.description && meta.description.trim()) || project.description || ''
    const tags = (meta?.tags ?? project.tags ?? [])
      .map(getTagLabel)
      .filter(Boolean)
      .slice(0, 3)

    return {
      id: project.id,
      number: project.number ?? String(index + 1).padStart(2, '0'),
      title: project.title ?? meta?.title ?? project.id,
      description,
      tags,
      image:
        meta?.cardImage ??
        meta?.heroImage ??
        meta?.featureImage ??
        project.image ??
        '',
      route: `/project/${project.id}`,
    }
  })

function ArrowIcon() {
  return (
    <svg
      className="projects-menu-view-work-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
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
  const navigate = useNavigate()
  const projects = useMemo(() => buildProjects(), [])
  const [activeId, setActiveId] = useState(projects[0]?.id ?? null)

  const activeIndex = Math.max(
    0,
    projects.findIndex((project) => project.id === activeId)
  )
  const activeProject = projects[activeIndex] ?? projects[0]

  if (!activeProject) return null

  const openProject = (project) => {
    if (!project?.route) return
    navigate(project.route)
  }

  const handleProjectHeadingClick = (project) => {
    if (project.id === activeProject.id) {
      openProject(project)
      return
    }
    setActiveId(project.id)
  }

  return (
    <section
      className="projects-menu"
      style={{
        '--projects-count': projects.length,
        '--projects-active-index': activeIndex,
      }}
    >
      <header className="projects-menu-header">
        <h1 className="projects-menu-title">Projects</h1>
        <p className="projects-menu-count">{projects.length} items</p>
      </header>

      <div className="projects-menu-layout">
        <nav className="projects-menu-nav" aria-label="Project list">
          <div className="projects-menu-rail" aria-hidden="true">
            <span className="projects-menu-rail-active" />
          </div>

          <div className="projects-menu-items">
            {projects.map((project) => {
              const isActive = project.id === activeProject.id
              return (
                <button
                  key={project.id}
                  type="button"
                  className={`projects-menu-item${isActive ? ' is-active' : ''}`}
                  onClick={() => handleProjectHeadingClick(project)}
                  aria-label={
                    isActive
                      ? `Open ${project.title} project`
                      : `Preview ${project.title} project`
                  }
                >
                  <span className="projects-menu-item-number">{project.number}</span>
                  <span className="projects-menu-item-title">{project.title}</span>
                </button>
              )
            })}
          </div>
        </nav>

        <article className="projects-menu-preview" aria-live="polite">
          <button
            type="button"
            className="projects-menu-hero"
            onClick={() => openProject(activeProject)}
            aria-label={`Open ${activeProject.title} project`}
          >
            <img
              src={activeProject.image}
              alt={`${activeProject.title} preview`}
              className="projects-menu-hero-image"
              loading="eager"
              decoding="async"
            />
          </button>

          <div className="projects-menu-meta">
            <div className="projects-menu-tags">
              {activeProject.tags.map((tag) => (
                <span key={`${activeProject.id}-${tag}`} className="projects-menu-tag">
                  {tag}
                </span>
              ))}
            </div>

            <button
              type="button"
              className="projects-menu-view-work"
              onClick={() => openProject(activeProject)}
              aria-label={`View work for ${activeProject.title}`}
            >
              <span>view work</span>
              <ArrowIcon />
            </button>

            <p className="projects-menu-description">{activeProject.description}</p>
          </div>
        </article>
      </div>
    </section>
  )
}
