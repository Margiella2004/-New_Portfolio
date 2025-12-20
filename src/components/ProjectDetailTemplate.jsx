import { useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetailHeader from './ProjectDetailHeader';
import { getOtherProjects } from '../data/projectsData';
import './ProjectDetailTemplate.css';

export default function ProjectDetailTemplate({ project }) {
  const otherProjects = getOtherProjects(project.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  return (
    <>
      <ProjectDetailHeader />
      <main className="project-detail-page">
        <div className="project-detail-container">
        {/* Header Section */}
        <header className="project-detail-header">
          {/* Metadata & Title */}
          <div className="project-detail-title-section">
            <div className="project-detail-metadata">
              <span className="project-detail-metadata-date">
                {project.metadata.date}
              </span>
              <span className="project-detail-metadata-company">
                {project.metadata.company}
              </span>
              <span className="project-detail-metadata-category">
                {project.metadata.category}
              </span>
            </div>
            <h1 className="project-detail-title">{project.title}</h1>
          </div>

          {/* Hero Image */}
          <div className="project-detail-hero-image">
            <img
              src={project.heroImage}
              alt={project.title}
              className="project-detail-hero-img"
            />
          </div>
        </header>

        {/* Content Section */}
        <section className="project-detail-content">
          {/* Description - Left Aligned */}
          <div className="project-detail-description">
            <p className="project-detail-description-text">
              {project.description}
            </p>
          </div>

          {/* Skills List - Right Aligned */}
          <div className="project-detail-skills">
            {project.skills.map((skill, index) => (
              <span key={index} className="project-detail-skill">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Other Projects Section */}
        <section className="project-detail-other-projects">
          <h2 className="project-detail-other-projects-title">
            Other Projects
          </h2>

          <div className="project-detail-other-projects-grid">
            {otherProjects.map((otherProject, index) => (
              <ProjectCard key={index} project={otherProject} />
            ))}
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
