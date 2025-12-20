### 1. `/components/Portfolio.jsx`

This is the main component containing the structure and logic.

```jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import "../styles/Portfolio.css";

const projects = [
  {
    id: 1,
    number: '01',
    title: 'Synecron Cube',
    image: "https://images.unsplash.com/photo-1764437358272-79ecc4647866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGRpZ2l0YWwlMjBhcnQlMjBwdXJwbGV8ZW58MXx8fHwxNzY2MTc1ODQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ['UX Design', 'UX Research', 'Engineering'],
    description: "Jonathan Ramesh is a Interdisciplinary Designer focusing on UX Design and Engineering. Jonathan combines his coding experince and design education to create products focused on bringing back human centered design.",
    color: '#6F3D59'
  },
  {
    id: 2,
    number: '02',
    title: 'Gaurdian App',
    image: "https://images.unsplash.com/photo-1639503547276-90230c4a4198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHNlY3VyaXR5JTIwc2hpZWxkJTIwZGlnaXRhbCUyMGRhdGElMjBzaW1wbGlzdGljfGVufDF8fHx8MTc2NjE3Mjc2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ['Security', 'Mobile App', 'Encryption'],
    description: "Guardian App provides state-of-the-art personal security through real-time threat monitoring and secure communication channels. Designed for journalists and activists working in high-risk environments.",
    color: '#6F3D59'
  },
  {
    id: 3,
    number: '03',
    title: 'Wander App',
    image: "https://images.unsplash.com/photo-1461183479101-6c14cd5299c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1hcCUyMG5hdmlnYXRpb24lMjB0cmF2ZWwlMjBzaW1wbGlzdGljfGVufDF8fHx8MTc2NjE3Mjc2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ['Travel', 'Discovery', 'Social'],
    description: "Wander helps travelers discover hidden gems and connect with local communities. By leveraging AI-driven recommendations, it curates personalized itineraries that go beyond the typical tourist traps.",
    color: '#6F3D59'
  }
];

export function Portfolio() {
  const [activeId, setActiveId] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Hook to detect screen size for animation calculation
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
    };
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeProject = projects.find(p => p.id === activeId) || projects[0];

  // Animation Stride Calculation
  // Desktop: Title (~72px) + Gap (10px) = 82px
  // Mobile: Title (~43px) + Gap (22px) = 65px
  const stride = isMobile ? 65 : 82;

  return (
    <div className="portfolio-container">
      <div className="portfolio-wrapper">
        
        {/* Header */}
        <div className="portfolio-header">
          <h1 className="header-title">Projects</h1>
          <span className="header-count">{projects.length} items</span>
        </div>

        {/* Main Content Grid */}
        <div className="portfolio-content-grid">
          
          {/* Left Column: List with Timeline */}
          <div className="project-list-container">
            {/* Timeline Track */}
            <div className="timeline-track">
              <div className="timeline-line"></div>
              <motion.div 
                className="active-indicator"
                initial={false}
                animate={{ 
                  y: (activeId - 1) * stride
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>

            {/* List Items */}
            <div className="project-list">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setActiveId(project.id)}
                  className={`project-btn ${activeId === project.id ? 'active' : ''}`}
                >
                  <span className="project-number">
                    {project.number}
                  </span>
                  <span className="project-title">
                    {project.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="project-details">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="project-details-inner"
                style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '24px' : '30px' }}
              >
                {/* Image */}
                <div className="image-container">
                  <img 
                    src={activeProject.image} 
                    alt={activeProject.title}
                    className="project-image"
                  />
                </div>

                {/* Info Container - Updated DOM Structure */}
                <div className="info-container">
                  {/* 1. Tags */}
                  <div className="tags-group">
                    {activeProject.tags.map((tag) => (
                      <div key={tag} className="tag-badge">
                        {tag}
                      </div>
                    ))}
                  </div>

                  {/* 2. Button (Moved here for Grid placement) */}
                  <button className="view-work-btn">
                    <span className="btn-text">view work</span>
                    <ArrowUpRight className="arrow-icon" />
                  </button>

                  {/* 3. Description */}
                  <p className="project-description">
                    {activeProject.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
```

### 2. `/styles/Portfolio.css`

This file contains the styling, including the mobile responsive adjustments.

```css
/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=Inter:wght@400;500;600&display=swap');

/* Base Styles */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: white;
  overflow-x: hidden;
}

::selection {
  background-color: #6F3D59;
  color: white;
}

/* Main Container */
.portfolio-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 30px;
}

.portfolio-wrapper {
  width: 100%;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
  gap: 45px;
}

/* Header */
.portfolio-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.header-title {
  font-size: 29px;
  font-weight: 400;
  letter-spacing: -0.5px;
  margin: 0;
  color: #393939;
}

.header-count {
  font-size: 13px;
  color: #393939;
  letter-spacing: -0.25px;
}

/* Main Content Grid */
.portfolio-content-grid {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 100px;
  width: 100%;
}

/* Left Column: List */
.project-list-container {
  display: flex;
  gap: 17px;
  flex-shrink: 0;
}

.timeline-track {
  width: 4px;
  position: relative;
  margin-top: 12px;
}

.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 1px;
  background-color: rgba(201, 167, 186, 0.5);
}

.active-indicator {
  position: absolute;
  left: -1.5px;
  width: 4px;
  height: 60px;
  background-color: #6F3D59;
  border-radius: 999px;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.project-btn {
  display: flex;
  align-items: baseline;
  text-align: left;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  transition: opacity 0.3s;
}

.project-btn:hover {
  opacity: 0.8;
}

.project-number {
  font-family: 'Instrument Serif', serif;
  font-size: 20px;
  margin-right: 15px;
  color: #7C7B7B;
  transition: color 0.3s;
}

.project-title {
  font-family: 'Instrument Serif', serif;
  font-size: 72px;
  font-style: italic;
  line-height: 1;
  letter-spacing: -2px;
  color: #7C7B7B;
  transition: color 0.3s;
  white-space: nowrap;
}

.project-btn.active .project-number,
.project-btn.active .project-title {
  color: #6F3D59;
}

/* Right Column: Details */
.project-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 900px;
  width: 100%;
}

.image-container {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 8.5;
  border-radius: 26px;
  overflow: hidden;
  background-color: black;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Info Container - Grid Layout for Desktop */
.info-container {
  display: grid;
  grid-template-columns: 1fr auto; /* Tags | Button */
  grid-template-areas:
    "tags button"
    "desc desc";
  column-gap: 20px;
  row-gap: 16px;
  align-items: center;
}

.tags-group {
  grid-area: tags;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.view-work-btn {
  grid-area: button;
  width: 130px;
  height: 50px;
  background-color: #6F3D59;
  border-radius: 16px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 0;
  justify-self: end;
}

.view-work-btn:hover {
  background-color: #5a3148;
}

.tag-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  border: 1px solid #6F3D59;
  border-radius: 14px;
  color: #6F3D59;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: -0.1px;
  white-space: nowrap;
}

.btn-text {
  color: white;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: -0.1px;
}

.arrow-icon {
  width: 18px;
  height: 18px;
  color: white;
}

.project-description {
  grid-area: desc;
  width: 100%;
  max-width: 600px;
  color: #A58698;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.4;
  letter-spacing: -0.5px;
  margin: 0;
}

/* =========================================
   Mobile / Responsive Styles
   ========================================= */

@media (max-width: 1024px) {
  .portfolio-content-grid {
    flex-direction: column;
    align-items: stretch;
    gap: 40px;
  }
  
  .project-list-container {
    width: 100%;
  }

  .project-list {
    width: 100%;
  }
  
  /* Mobile Typography & Layout matches iPhone design */
  .header-title {
    font-size: 25px;
  }
  
  .header-count {
    font-size: 12.5px;
  }

  .timeline-track {
    margin-top: 8px; /* Adjusted for smaller title */
  }

  .active-indicator {
    height: 38px; /* Adjusted for smaller title height */
  }

  .project-number {
    font-size: 13.5px;
    margin-right: 12px;
  }

  .project-title {
    font-size: 43px; /* Mobile size */
    letter-spacing: -2px;
  }

  .project-list {
    gap: 22px; /* Gap from mobile design */
  }

  .image-container {
    aspect-ratio: auto;
    height: 322px; /* Fixed height from design */
  }
  
  /* Info Container Reordering for Mobile */
  .info-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }

  .tags-group {
    order: 1;
    width: 100%;
    /* Horizontal scroll if needed or wrap */
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 4px; /* Space for scrollbar if any */
  }

  .tag-badge {
    padding: 7px 19px;
    font-size: 9px;
    border-radius: 12px;
  }

  .project-description {
    order: 2;
    font-size: 13px; /* Mobile size */
    line-height: 1.5;
    max-width: 100%;
  }

  .view-work-btn {
    order: 3;
    width: 116px;
    height: 45px;
    border-radius: 13px;
    justify-self: start; /* Reset grid align */
  }

  .btn-text {
    font-size: 10px;
  }

  .arrow-icon {
    width: 17px;
    height: 17px;
  }
}
```

### 3. `/App.tsx`

The entry point file.

```tsx
import { Portfolio } from "./components/Portfolio.jsx";

export default function App() {
  return (
    <Portfolio />
  );
}
```