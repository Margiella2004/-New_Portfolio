---
name: project-detail-writing
description: Generate new project detail pages using the ContentModule bento box system. Invoke with /project-detail-writing when creating portfolio project pages.
---

# Project Detail Writing Skill

## Overview
This skill enables Claude to generate new project detail pages following the established patterns from SynechronCubeDetail, GuardianAppDetail, and WanderAppDetail pages.

---

## Page Architecture

### Component Hierarchy
```
<ProjectDetailHeader />        // Navigation bar
<main className="[project]-page">
  <div className="[project]-container">
    <header>                   // Title + Hero
    <section bio-skills>       // Description + Skills pills
    <section bento/quote>...   // Multiple content sections
  </div>
  <OtherProjects />            // Cross-project link
  <Footer />                   // Global footer
</main>
```

---

## Section Templates

### 1. Header Section
**Purpose**: Project title, metadata, and hero image

**Structure**:
```jsx
<header className="[project]-header">
  <div className="[project]-title-section">
    <div className="[project]-metadata">
      <span className="[project]-metadata-item">{metadata.date}</span>
      <span className="[project]-metadata-item [project]-metadata-secondary">{metadata.company}</span>
      <span className="[project]-metadata-item [project]-metadata-secondary">{metadata.category}</span>
    </div>
    <h1 className="[project]-title">{project.title}</h1>
  </div>
  <div className="[project]-hero-image-container">
    <img src={heroImage} alt={project.title} className="[project]-hero-image" />
  </div>
</header>
```

**Data Requirements**:
- `metadata.date`: String (e.g., "November - December 2025")
- `metadata.company`: String (e.g., "Hackathon")
- `metadata.category`: String (e.g., "Elder care")
- `title`: String
- `heroImage`: Imported image path

---

### 2. Bio & Skills Section
**Purpose**: Project description and skill tags

**Structure**:
```jsx
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
```

**Data Requirements**:
- `description`: String (1-3 sentences)
- `skills`: Array of strings (e.g., ['UX Research', 'UI Design', 'React'])

---

### 3. Quote Section
**Purpose**: Narrative text between content sections

**Structure**:
```jsx
<section className="[project]-quote">
  <p className="[project]-quote-text">{quoteText}</p>
</section>
```

**Usage**: Place between bento sections to provide narrative flow

---

### 4. Bento Box Components (ContentModule)

The `ContentModule` component is the core building block for visual content.

**Import**:
```jsx
import ContentModule from '../components/ContentModule';
```

**Available Layouts**:

| Layout | Description | Images Needed |
|--------|-------------|---------------|
| `stacked` | Text top, full-width image bottom | 1 |
| `split-left` | Image left (80%), text right (20%) | 1 |
| `split-right` | Text left (35%), image right (65%) | 1 |
| `grid-2` | Text top, 2 images side-by-side | 2 |
| `bento-up-left` | Large image top, text left + image right bottom | 2 |
| `bento-up-right` | Large image top, image left + text right bottom | 2 |

**Props**:
```typescript
{
  layout: 'stacked' | 'split-left' | 'split-right' | 'grid-2' | 'bento-up-left' | 'bento-up-right';
  title: string;
  description: string;
  images: string[];           // Array of image imports
  hideTopImage?: boolean;     // Default: false - hides large top image in bento layouts
  hideText?: boolean;         // Default: false - hides title/description
  bentoTextAlign?: 'left' | 'right';  // Default: 'right'
  className?: string;
  style?: object;             // CSS variable overrides
}
```

**Standard Style Object** (for bento layouts):
```jsx
style={{
  '--content-module-bento-gap': '24px',
  '--content-module-bento-gap-desktop': '40px',
  '--content-module-bento-text-width': '30%',
  '--content-module-bento-media-width': '70%',
  '--content-module-image-height-bento': '560px',
  '--content-module-border-radius-mobile': '20px',
  '--content-module-border-radius-desktop': '34px'
}}
```

**Standard Style Object** (for stacked layouts):
```jsx
style={{
  '--content-module-border-radius-mobile': '20px',
  '--content-module-border-radius-desktop': '34px',
  '--content-module-image-height-large': '720px'
}}
```

---

## Layout Patterns by Use Case

### For Research/Process Images (full-width):
```jsx
<ContentModule
  layout="stacked"
  title="Section Title"
  description=""
  images={[fullWidthImage]}
  hideText={true}
  style={{ ... }}
/>
```

### For Image + Description (text left):
```jsx
<ContentModule
  layout="bento-up-left"
  title="Feature Title"
  description="Feature description text..."
  images={[mainImage]}
  hideTopImage={true}
  hideText={false}
  style={{ ... }}
/>
```

### For Image + Description (text right):
```jsx
<ContentModule
  layout="bento-up-right"
  title="Feature Title"
  description="Feature description text..."
  images={[mainImage]}
  hideTopImage={true}
  hideText={false}
  bentoTextAlign="right"
  style={{ ... }}
/>
```

### For Side-by-Side Comparison:
```jsx
<ContentModule
  layout="grid-2"
  title="Comparison Title"
  description=""
  images={[imageOne, imageTwo]}
  hideText={true}
  style={{ ... }}
/>
```

### For Image Only (no text):
```jsx
<ContentModule
  layout="bento-up-right"
  title=""
  description=""
  images={[image]}
  hideTopImage={true}
  hideText={true}
  style={{ ... }}
/>
```

---

## CSS Naming Convention

All CSS classes follow the pattern: `[project-name]-[element]-[modifier]`

Examples:
- `guardian-app-header`
- `wander-app-quote-text`
- `synechron-cube-metadata-secondary`

---

## CSS Variables System

### Page-Level Variables (defined on `.{project}-page`):
```css
/* Colors */
--[project]-page-bg: #ffffff;
--[project]-title-color: #000000;
--[project]-metadata-primary-color: #363636;
--[project]-metadata-secondary-color: #919191;
--[project]-description-color: #3c3c3c;
--[project]-quote-color: #3c3c3c;

/* Spacing */
--[project]-container-padding-mobile: 1.25rem;
--[project]-container-padding-desktop: 1.25rem;
--[project]-container-padding-top-mobile: 5rem;
--[project]-container-padding-top-desktop: 7rem;
--[project]-section-gap-mobile: 1.25rem;
--[project]-section-gap-desktop: 1.25rem;

/* Header */
--[project]-header-gap: 5rem;
--[project]-title-section-gap: 1rem;

/* Hero */
--[project]-hero-height-mobile: 25rem;
--[project]-hero-height-md: 37.5rem;
--[project]-hero-height-lg: 43.75rem;
--[project]-hero-border-radius-mobile: 1.25rem;
--[project]-hero-border-radius-desktop: 2.1875rem;

/* Quote */
--[project]-quote-padding-mobile: 1.5rem;
--[project]-quote-padding-desktop: 13rem;

/* Typography */
--[project]-title-font-size-mobile: 3.75rem;
--[project]-title-font-size-md: 5rem;
--[project]-quote-font-size-mobile: 1.5rem;
--[project]-quote-font-size-md: 1.875rem;
```

---

## Media/Video Support

ContentModule automatically handles video files (.mp4, .mov, .webm):
```jsx
// Works automatically - just import the video
import demoClip from '../../img_assets/demo.mov';

<ContentModule
  layout="bento-up-right"
  images={[demoClip]}  // Videos work the same as images
  ...
/>
```

---

## Required Imports Template

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
import heroImage from '../../img_assets/[project]/hero.png';
// ... additional image imports
```

---

## Page Structure Template

```jsx
export default function [ProjectName]Detail() {
  const project = {
    metadata: {
      date: '[Month] - [Month] [Year]',
      company: '[Company Name]',
      category: '[Category]'
    },
    title: '[Project Title]',
    description: '[Project description paragraph]',
    skills: ['Skill 1', 'Skill 2', 'Skill 3']
  };

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
            {/* ... header content */}
          </header>

          {/* Bio & Skills Section */}
          <section className="[project]-bio-skills">
            {/* ... bio content */}
          </section>

          {/* Content Sections - Mix of quotes and bento boxes */}
          <section className="[project]-quote">
            {/* ... quote content */}
          </section>

          <section className="[project]-bento-section">
            <ContentModule ... />
          </section>

          {/* ... more sections */}

        </div>
        <section className="[project]-other-projects-stage">
          <OtherProjects project={projectsData.[otherProject]} />
        </section>
        <div className="footer-layer [project]-footer-layer">
          <Footer data={footerData} />
        </div>
      </main>
    </>
  );
}
```

---

## Content Flow Best Practices

1. **Start with context**: Open with a quote that sets up the project narrative
2. **Alternate layouts**: Don't use the same bento layout consecutively
3. **Break up visuals with quotes**: Use quotes to provide narrative between image-heavy sections
4. **Text alignment variety**: Alternate between `bentoTextAlign="left"` and `"right"`
5. **Full-width for impact**: Use `stacked` layout for key process/research artifacts
6. **Grid for comparisons**: Use `grid-2` for before/after or side-by-side comparisons

---

## Checklist for New Project Detail Page

- [ ] Create `[ProjectName]Detail.jsx` in `/src/pages/`
- [ ] Create `[ProjectName]Detail.css` in `/src/pages/`
- [ ] Import and organize all images/videos
- [ ] Define project object with metadata, title, description, skills
- [ ] Build header section with metadata + hero
- [ ] Build bio/skills section
- [ ] Create content sections using ContentModule + quotes
- [ ] Add OtherProjects section linking to another project
- [ ] Add Footer
- [ ] Add route in router configuration
- [ ] Add project data to `projectsData.js` if needed for OtherProjects
