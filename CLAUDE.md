# GradeCube Portfolio - Claude Instructions

## Project Overview

This is a React portfolio site built with Vite, featuring project detail pages with a modular bento-box layout system.

---

## ContentModule System

The `ContentModule` component (`src/components/ContentModule.jsx`) is the core building block for all project detail pages. It handles responsive layouts, image/video media, and text content.

### Component API

```jsx
import ContentModule from '../components/ContentModule';

<ContentModule
  layout="bento-up-left"     // Required: Layout type
  title="Section Title"      // Heading text
  description="Body text..." // Paragraph content
  images={[img1, img2]}      // Array of image/video sources
  hideTopImage={false}       // Hide large top image in bento layouts
  hideText={false}           // Hide title + description entirely
  bentoTextAlign="right"     // Text alignment in bento-up-right ("left" | "right")
  className=""               // Additional CSS class
  style={{}}                 // CSS variable overrides
/>
```

### Available Layouts

| Layout | Structure | Use Case |
|--------|-----------|----------|
| `stacked` | Text → Full-width image | Hero sections, full-width showcases |
| `split-left` | Image (80%) \| Text (20%) | Feature highlights |
| `split-right` | Text (35%) \| Image (65%) | Reverse feature highlights |
| `grid-2` | Text → 2 side-by-side images | Comparisons, dual showcases |
| `bento-up-left` | Large image → [Text \| Image] | Case study sections (text on left) |
| `bento-up-right` | Large image → [Image \| Text] | Case study sections (text on right) |

### Bento Layout Visual Reference

**`bento-up-left`:**
```
┌─────────────────────────────┐
│      Large Top Image        │  ← images[0] (hideable)
└─────────────────────────────┘
┌───────────┬─────────────────┐
│   TEXT    │  Bento Image    │  ← images[1] or images[0] fallback
│  (30%)    │     (70%)       │
└───────────┴─────────────────┘
```

**`bento-up-right`:**
```
┌─────────────────────────────┐
│      Large Top Image        │  ← images[0] (hideable)
└─────────────────────────────┘
┌─────────────────┬───────────┐
│  Bento Image    │   TEXT    │  ← images[1] or images[0] fallback
│     (70%)       │  (30%)    │
└─────────────────┴───────────┘
```

### CSS Variable Overrides

Pass via the `style` prop to customize dimensions:

```jsx
style={{
  // Spacing
  '--content-module-bento-gap': '24px',           // Mobile gap
  '--content-module-bento-gap-desktop': '40px',   // Desktop gap

  // Width ratios (must total 100%)
  '--content-module-bento-text-width': '30%',
  '--content-module-bento-media-width': '70%',

  // Heights
  '--content-module-image-height-large': '720px', // Top hero image
  '--content-module-image-height-bento': '560px', // Bottom bento image

  // Border radius
  '--content-module-border-radius-mobile': '20px',
  '--content-module-border-radius-desktop': '34px',
  '--content-module-border-radius-grid-mobile': '16px',
  '--content-module-border-radius-grid-desktop': '28px'
}}
```

### Standard Style Preset

Use this preset for consistency across project pages:

```jsx
const bentoStyles = {
  '--content-module-bento-gap': '24px',
  '--content-module-bento-gap-desktop': '40px',
  '--content-module-bento-text-width': '30%',
  '--content-module-bento-media-width': '70%',
  '--content-module-image-height-bento': '560px',
  '--content-module-border-radius-mobile': '20px',
  '--content-module-border-radius-desktop': '34px'
};
```

### Media Handling

The component auto-detects file types:
- **Images**: Renders `<img>` with `loading="lazy"` and `decoding="async"`
- **Videos** (.mp4, .mov, .webm): Renders `<video autoPlay muted loop playsInline>`

---

## Common ContentModule Patterns

### 1. Image-only bento (no text, no top image)
```jsx
<ContentModule
  layout="bento-up-right"
  images={[myImage]}
  hideTopImage={true}
  hideText={true}
  style={bentoStyles}
/>
```

### 2. Text + Image bento (no top image)
```jsx
<ContentModule
  layout="bento-up-left"
  title="Feature Name"
  description="Description of the feature..."
  images={[featureImage]}
  hideTopImage={true}
  hideText={false}
  style={bentoStyles}
/>
```

### 3. Full bento with top hero image
```jsx
<ContentModule
  layout="bento-up-right"
  title="Section Title"
  description="Section details..."
  images={[heroImage, detailImage]}  // [0]=top, [1]=bottom
  style={bentoStyles}
/>
```

### 4. Side-by-side image grid
```jsx
<ContentModule
  layout="grid-2"
  title="Comparison"
  images={[leftImage, rightImage]}
  hideText={true}
  style={{
    '--content-module-border-radius-grid-mobile': '16px',
    '--content-module-border-radius-grid-desktop': '28px'
  }}
/>
```

### 5. Full-width stacked image
```jsx
<ContentModule
  layout="stacked"
  title="Showcase"
  images={[showcaseImage]}
  hideText={true}
  style={{
    '--content-module-border-radius-mobile': '20px',
    '--content-module-border-radius-desktop': '34px',
    '--content-module-image-height-large': '720px'
  }}
/>
```

---

## Project Detail Page Structure

All project detail pages follow this structure:

```jsx
import { useEffect } from 'react';
import ProjectDetailHeader from '../components/ProjectDetailHeader';
import ContentModule from '../components/ContentModule';
import OtherProjects from '../components/OtherProjects';
import Footer from '../Footer';
import { footerData } from '../footerData';
import { projectsData } from '../data/projectsData';
import './[ProjectName]Detail.css';

// Import images
import heroImage from '../../img_assets/project/hero.png';
// ... more image imports

export default function [ProjectName]Detail() {
  const project = {
    metadata: {
      date: 'Month - Month Year',
      company: 'Company Name',
      category: 'Category'
    },
    title: 'Project Title',
    description: 'Project description text...',
    skills: ['Skill 1', 'Skill 2', 'Skill 3']
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ProjectDetailHeader />
      <main className="[project]-page">
        <div className="[project]-container">

          {/* Header Section */}
          <header className="[project]-header">
            <div className="[project]-title-section">
              <div className="[project]-metadata">
                <span className="[project]-metadata-item">{project.metadata.date}</span>
                <span className="[project]-metadata-item [project]-metadata-secondary">
                  {project.metadata.company}
                </span>
                <span className="[project]-metadata-item [project]-metadata-secondary">
                  {project.metadata.category}
                </span>
              </div>
              <h1 className="[project]-title">{project.title}</h1>
            </div>
            <div className="[project]-hero-image-container">
              <img src={heroImage} alt={project.title} className="[project]-hero-image" />
            </div>
          </header>

          {/* Bio & Skills Section */}
          <section className="[project]-bio-skills">
            <div className="[project]-description">
              <p className="[project]-description-text">{project.description}</p>
            </div>
            <div className="[project]-skills">
              {project.skills.map((skill, index) => (
                <span key={index} className="[project]-skill">{skill}</span>
              ))}
            </div>
          </section>

          {/* Quote Sections */}
          <section className="[project]-quote">
            <p className="[project]-quote-text">Quote text here...</p>
          </section>

          {/* ContentModule Sections */}
          <section className="[project]-bento-section">
            <ContentModule
              layout="bento-up-left"
              title="Section Title"
              description="Section description..."
              images={[sectionImage]}
              hideTopImage={true}
              style={bentoStyles}
            />
          </section>

          {/* Alternate left/right for visual rhythm */}
          <section className="[project]-bento-section">
            <ContentModule
              layout="bento-up-right"
              title="Next Section"
              description="Next description..."
              images={[nextImage]}
              hideTopImage={true}
              bentoTextAlign="left"
              style={bentoStyles}
            />
          </section>

        </div>

        {/* Other Projects Navigation */}
        <section className="[project]-other-projects-stage">
          <OtherProjects project={projectsData.anotherProject} />
        </section>

        {/* Footer */}
        <div className="footer-layer [project]-footer-layer">
          <Footer data={footerData} />
        </div>
      </main>
    </>
  );
}
```

---

## CSS Template for Project Pages

Create `[ProjectName]Detail.css` with these base styles:

```css
/* Page Variables */
.[project]-page {
  --[project]-page-bg: #ffffff;
  --[project]-container-padding-mobile: 1.25rem;
  --[project]-container-padding-desktop: 1.25rem;
  --[project]-container-padding-top-mobile: 5rem;
  --[project]-container-padding-top-desktop: 7rem;
  --[project]-section-gap: 1.25rem;
  --[project]-quote-padding-mobile: 1.5rem;
  --[project]-quote-padding-desktop: 13rem;
}

/* Page Container */
.[project]-page {
  min-height: 100vh;
  background: var(--[project]-page-bg);
  width: 100%;
  overflow-x: hidden;
}

.[project]-container {
  max-width: 100%;
  margin: 0 auto;
  padding: var(--[project]-container-padding-top-mobile) var(--[project]-container-padding-mobile);
  display: flex;
  flex-direction: column;
  gap: var(--[project]-section-gap);
}

@media (min-width: 48rem) {
  .[project]-container {
    padding-top: var(--[project]-container-padding-top-desktop);
  }
}

/* Quote Section */
.[project]-quote {
  width: 100%;
  padding: var(--[project]-quote-padding-mobile) 0;
  display: flex;
  justify-content: center;
}

@media (min-width: 64rem) {
  .[project]-quote {
    padding: var(--[project]-quote-padding-desktop) 0;
  }
}

.[project]-quote-text {
  max-width: 50rem;
  text-align: center;
  font-family: 'Pangea Afrikan VAR 2.003', sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #3c3c3c;
}

@media (min-width: 48rem) {
  .[project]-quote-text { font-size: 1.875rem; }
}

@media (min-width: 64rem) {
  .[project]-quote-text { font-size: 2.125rem; }
}

/* Bento Sections */
.[project]-bento-section {
  width: 100%;
}

/* Footer & Other Projects */
.[project]-other-projects-stage {
  position: relative;
  width: 100%;
  background: transparent;
  z-index: 0;
}

.[project]-footer-layer {
  position: relative;
  z-index: 2;
}
```

---

## Design Patterns

### Visual Rhythm
Alternate between `bento-up-left` and `bento-up-right` layouts to create visual rhythm and prevent monotony.

### Quote Sections
Use quote sections between content modules to break up visual density and provide narrative context.

### Responsive Behavior
- Mobile (<768px): All layouts stack vertically
- Desktop (>=768px): Bento layouts split horizontally with 30/70 ratio
- Images use `object-fit: contain` to prevent cropping

### Typography
- Titles: Pangea Afrikan, weight 400
- Descriptions: Pangea Afrikan, weight 300
- Quotes: Pangea Afrikan, weight 300, centered

---

## File Locations

- Component: `src/components/ContentModule.jsx`
- Component CSS: `src/components/ContentModule.css`
- Project pages: `src/pages/[ProjectName]Detail.jsx`
- Project CSS: `src/pages/[ProjectName]Detail.css`
- Image assets: `img_assets/` or `img_assets/[project_name]/`
- Project data: `src/data/projectsData.js`
