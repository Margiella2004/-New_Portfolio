import { projects } from '../data/projectsList'
import { projectsData } from '../data/projectsData'

/**
 * Adapts portfolio project data to the menu experiment format
 * @returns {Array} Projects in the format expected by GradientPlanes/EditorialOverlay
 */
export function getAdaptedProjects() {
  return projects.map((project) => {
    // Get additional data from projectsData if available
    const fullData = Object.values(projectsData).find(p => p.id === project.id)

    return {
      id: project.id,
      title: project.title,
      tags: project.tags,
      description: project.description,
      cta: 'View Project',
      image: project.image,
      route: `/project/${project.id}`,
      // Include preview images if available
      previewImages: fullData?.images || [project.image],
    }
  })
}

/**
 * Get image URLs for 3D plane textures
 * @returns {Array<string>} Array of image URLs
 */
export function getProjectImageUrls() {
  return projects.map(project => project.image)
}

/**
 * Get route for a project by ID
 * @param {string} projectId
 * @returns {string} Route path
 */
export function getProjectRoute(projectId) {
  const project = projects.find(p => p.id === projectId)
  return project ? `/project/${project.id}` : '/'
}
