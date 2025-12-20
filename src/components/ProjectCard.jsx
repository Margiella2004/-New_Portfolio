import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <div className="project-detail-card" onClick={handleClick}>
      <div className="project-detail-card-content">
        {/* Header Section */}
        <div className="project-detail-card-header">
          <h3 className="project-detail-card-title">{project.title}</h3>
          <p className="project-detail-card-description">
            A series of my works that are personal projects and some I have done in past professional roles
          </p>
        </div>

        {/* Tags */}
        <div className="project-detail-card-tags">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="project-detail-card-tag"
              style={{ backgroundColor: tag.color }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Image */}
        <div className="project-detail-card-image-container">
          <img
            src={project.heroImage}
            alt={project.title}
            className="project-detail-card-image"
          />
        </div>
      </div>

      <div className="project-detail-card-border" />
    </div>
  );
}
