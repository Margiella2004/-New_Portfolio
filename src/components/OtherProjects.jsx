import { Link } from 'react-router-dom';
import './OtherProjects.css';

export default function OtherProjects({ project }) {
  if (!project) return null;

  return (
    <section className="other-projects-module">
      <div className="other-projects-inner">
        <Link
          to={`/project/${project.id}`}
          className="other-projects-card"
          aria-label={`View ${project.title}`}
          style={{ backgroundImage: `url(${project.heroImage})` }}
        >
          <div className="other-projects-content">
            <h2 className="other-projects-title">{project.title}</h2>
          </div>
        </Link>
      </div>
    </section>
  );
}
