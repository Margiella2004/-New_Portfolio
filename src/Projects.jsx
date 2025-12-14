import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Projects.css';

const projects = [
  {
    title: "Guardian App",
    description: "A series of my works that are personal projects and some I have done in past professional roles. One thing remains constant is combining both my engineering background and Design education in order to build the best product for my user.",
    tags: ["UX Design", "UX Research", "Engineering"],
    colors: ["bg-color-1", "bg-color-2", "bg-color-3"],
    images: [
      "https://images.unsplash.com/photo-1533234944761-2f5337579079?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ]
  },
  {
    title: "Wander App",
    description: "A series of my works that are personal projects and some I have done in past professional roles.",
    tags: ["UX Design", "UX Research"],
    colors: ["bg-color-1", "bg-color-2"],
    images: [
      "https://images.unsplash.com/photo-1692681157014-2f7ee75c0ea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ]
  },
  {
    title: "Synechron Cube",
    description: "A series of my works that are personal projects and some I have done in past professional roles.",
    tags: ["3D Engineering", "Interaction Design"],
    colors: ["bg-color-4", "bg-color-5"],
    images: [
      "https://images.unsplash.com/photo-1626705343685-eb1e06c9271f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ]
  }
];

function Pill({ text, color }) {
  return (
    <div className={`pill ${color}`}>
      <div className="pill-inner">
        <p className="pill-text">{text}</p>
      </div>
      <div aria-hidden="true" className="pill-border" />
    </div>
  );
}

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    projects.forEach((_, index) => {
      const isHovered = hoveredIndex === index;
      const targetGradient = `.project-gradient-${index}`;
      const targetTitle = `.project-title-${index}`;
      const targetDesc = `.project-desc-${index}`;

      if (isHovered) {
        gsap.to(targetGradient, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
        gsap.to(targetTitle, { color: "#ffffff", duration: 0.5, ease: "power2.inOut" });
        gsap.to(targetDesc, { color: "#fbfbfb", duration: 0.5, ease: "power2.inOut" });
      } else {
        gsap.to(targetGradient, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
        gsap.to(targetTitle, { color: "#232125", duration: 0.5, ease: "power2.inOut" });
        gsap.to(targetDesc, { color: "#9f9fa9", duration: 0.5, ease: "power2.inOut" });
      }
    });
  }, { scope: containerRef, dependencies: [hoveredIndex] });

  return (
    <div className="projects-container">
      {/* Inner Content Container */}
      <div className="projects-inner">

        {/* Header Section */}
        <div className="projects-header-section">
          <div className="projects-header">
            <h2 className="projects-title">Projects</h2>
            <span className="projects-count">3 items</span>
          </div>

          {/* Intro Paragraph */}
          <div className="projects-intro">
             <p className="projects-intro-text">
               A series of my works that are personal projects and some I have done in past professional roles.
               One thing remains constant is combining both my engineering background and Design education
               in order to build the best product for my user.
             </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="projects-grid" ref={containerRef}>

          {/* Card 1: Guardian App */}
          <div
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="project-card project-card-large"
          >
            {/* Gradient Background */}
            <div className="project-gradient-0" />

            {/* Border */}
            <div className="project-border" />

            <div className="project-card-content">

              {/* Left Content (Text) */}
              <div className="project-text-section">
                 <div className="project-text-content">
                   <h3 className="project-title-0 project-title">
                     {projects[0].title}
                   </h3>
                   <p className="project-desc-0 project-description">
                     {projects[0].description}
                   </p>
                 </div>
                 <div className="project-tags">
                   {projects[0].tags.map((tag, i) => (
                     <Pill key={i} text={tag} color={projects[0].colors[i]} />
                   ))}
                 </div>
              </div>

              {/* Right Content (Images) */}
              <div className="project-images-large">
                  {/* Image 1 (Large) */}
                  <div className="project-image-container project-image-main">
                    <img
                      src={projects[0].images[0]}
                      alt={projects[0].title}
                      className="project-image"
                    />
                  </div>
                  {/* Image 2 (Small) */}
                  <div className="project-image-container project-image-secondary">
                    <img
                      src={projects[0].images[1]}
                      alt="Detail"
                      className="project-image"
                    />
                  </div>
              </div>

            </div>
          </div>

          {/* Bottom Row: Wander App & Synechron Cube */}
          <div className="projects-bottom-row">

            {/* Card 2: Wander App */}
            <div
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="project-card project-card-small"
            >
               {/* Gradient Background */}
               <div className="project-gradient-1" />

               <div className="project-border" />
               <div className="project-card-content-vertical">
                  <div className="project-content-vertical">
                     {/* Text Section */}
                     <div className="project-text-vertical">
                        <div className="project-text-content">
                          <h3 className="project-title-1 project-title">
                            {projects[1].title}
                          </h3>
                          <p className="project-desc-1 project-description">
                            {projects[1].description}
                          </p>
                        </div>
                        <div className="project-tags">
                          {projects[1].tags.map((tag, i) => (
                             <Pill key={i} text={tag} color={projects[1].colors[i]} />
                          ))}
                        </div>
                     </div>

                     {/* Image Section */}
                     <div className="project-image-container project-image-single">
                        <img
                          src={projects[1].images[0]}
                          alt={projects[1].title}
                          className="project-image"
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* Card 3: Synechron Cube */}
            <div
              onMouseEnter={() => setHoveredIndex(2)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="project-card project-card-small"
            >
               {/* Gradient Background */}
               <div className="project-gradient-2" />

               <div className="project-border" />
               <div className="project-card-content-vertical">
                  <div className="project-content-vertical">
                     {/* Text Section */}
                     <div className="project-text-vertical">
                        <div className="project-text-content">
                          <h3 className="project-title-2 project-title">
                            {projects[2].title}
                          </h3>
                          <p className="project-desc-2 project-description">
                            {projects[2].description}
                          </p>
                        </div>
                        <div className="project-tags">
                          {projects[2].tags.map((tag, i) => (
                             <Pill key={i} text={tag} color={projects[2].colors[i]} />
                          ))}
                        </div>
                     </div>

                     {/* Image Section */}
                     <div className="project-image-container project-image-single">
                        <img
                          src={projects[2].images[0]}
                          alt={projects[2].title}
                          className="project-image"
                        />
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
