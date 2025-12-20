# Portfolio Design System

**Last Updated:** December 18, 2025 (Synechron Cube: new media blocks, Leva CSS controls, spacing alignment)
**Project:** Jonathan Ramesh Portfolio
**Tech Stack:** React + Vite + Three.js + React Three Fiber + GSAP + React Router

---

## Table of Contents

1. [Typography](#typography)
2. [Color System](#color-system)
3. [Spacing & Layout](#spacing--layout)
4. [Components](#components)
5. [Routing System](#routing-system)
6. [Project Detail Pages](#project-detail-pages)
7. [Synechron Cube Page (Custom Layout)](#synechron-cube-page-custom-layout)
8. [CSS Variables System](#css-variables-system)
9. [ContentModule Component](#contentmodule-component)
10. [3D Scene Parameters](#3d-scene-parameters)
11. [Effects & Post-Processing](#effects--post-processing)
12. [Responsive Breakpoints](#responsive-breakpoints)
13. [Footer Scroll Behavior](#footer-scroll-behavior)
14. [Intro Animation](#intro-animation)

---

## Typography

### Font Families

**Primary Sans-Serif Font:** `Pangea Afrikan VAR 2.003`
- Used for: **ALL sans-serif text** including body text, intro text, navigation, buttons, UI elements, tags, descriptions
- Weights: 300 (Light), 400 (Regular), 500 (Medium)
- Fallbacks: `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`
- **IMPORTANT:** No Inter font is used anywhere in the system - all sans-serif text uses Pangea Afrikan VAR 2.003

**Display Font:** `Instrument Serif`
- Used for: Logo characters (J, R), project titles, decorative elements
- Style: Italic
- Fallbacks: `serif`

**Standard Declaration:**
```css
font-family: 'Pangea Afrikan VAR 2.003', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Scale

| Element | Size | Line Height | Letter Spacing | Weight |
|---------|------|-------------|----------------|--------|
| Intro Text | 30.094px | 29px | -0.9028px | 400 |
| Nav Links | 16.408px | 22.266px | -0.3931px | 500 |
| Logo | 35.011px | normal | -1.4004px | 300/italic |
| Contact Button | 11.72px | 15.904px | -0.2808px | 500 |
| "who is this guy" | 12px | 17.731px | -0.36px | 400 |
| Link Buttons | 9.739px | 11.826px | -0.1046px | 400 |

### Special Typography

**Logo Composition:**
- "J" - Instrument Serif Italic, -3.008cqw letter spacing
- "o" - Pangea Light
- "n" - Pangea Light, 0.3501px letter spacing
- "." - Pangea Light, 2.1007px letter spacing
- "R" - Instrument Serif Italic
- "am" - Pangea Light

---

## Color System

### Primary Colors

**Text Colors:**
```css
--text-primary: #0f172a      /* Body text (dark slate) */
--text-light: #fcfcfc        /* Intro text (off-white) */
--text-nav: #ededed          /* Navigation links (light gray) */
--text-button: #373743       /* Link button text (dark gray) */
```

**Background Colors:**
```css
--bg-primary: #ffffff        /* Canvas background (white) */
--bg-header: rgba(255, 255, 255, 0.3)  /* Header glass effect */
--bg-button: #6f3c59         /* Contact button (mauve/purple) */
--bg-link: #ffffff           /* Link buttons (white) */
```

**Accent Colors:**
```css
--accent-gold: #e1d590       /* Highlight accent (timeline dots, optional CTA accents) */
```

**Gradient Colors (3D Cube):**
```css
--gradient-a: #000000        /* Black */
--gradient-b: #ffffff        /* White */
--gradient-c: #b7d7ff        /* Light blue */
```

**Fresnel/Glow Colors:**
```css
--fresnel-color: #6dffb1     /* Mint green edge glow */
--emissive-color: #baffdf    /* Light cyan emissive */
```

### Opacity Values

```css
--header-bg-opacity: 0.3
--noise-opacity: 0.10
--design-engineer-opacity: 0.86
```

---

## Spacing & Layout

### CSS Variables

```css
--content-total-width: calc(90vw - [padding × 2]px)  /* Dynamic width */
--canvas-blur: 70px                                   /* Canvas blur amount */
--noise-opacity: 0.10                                 /* Noise texture opacity */
```

### Spacing Scale

**Padding:**
- Horizontal Padding (adjustable): `72px` (default, range: 0-200px)
- Header: `10.939px 24.612px`
- Contact Button: `8.79px 27.347px`
- Link Buttons: `7.652px 21.565px`

**Gaps:**
- Intro Section: `19px` (vertical gap)
- Link Buttons: `13px` (horizontal gap)
- Intro Text → Links: `14px` (vertical gap)
- Nav Links: `43px` (horizontal gap)
- Projects Header Section: `80px` (bottom margin - doubled for better separation)

**Positioning:**
- Header Top: `20px`
- Intro Section Top: `147px`
- Design Engineer Bottom: `40px`

### Layout Widths

```css
/* Fixed Widths */
--intro-text-width: 572.646px
--header-max-width: 1200px

/* Dynamic Widths */
--design-engineer-width: calc(90vw - [padding × 2]px)
```

---

## Components

### Header

**Structure:** Fixed position glassmorphic navigation bar

**Styling:**
```css
position: fixed;
top: 20px;
left: 50%;
transform: translateX(-50%);
width: calc(100% - 40px);
max-width: 1200px;
padding: 10.939px 24.612px;
background: rgba(255, 255, 255, 0.3);
backdrop-filter: blur(67.342px);
border: 1.367px solid rgba(255, 255, 255, 0.5);
border-radius: 6.837px;
box-shadow:
  0px 5.469px 5.469px 0px rgba(0, 0, 0, 0.25),
  0px 5.469px 28.167px 0px rgba(0, 0, 0, 0.1);
z-index: 1000;
```

**Elements:**
- Navigation Links (left)
- Logo (center, absolute)
- Contact Button (right)

---

### Intro Text Section

**Position:** `absolute, top: 147px`

**Structure:**
- Horizontal decorative line
- "who is this guy" with arrow
- Main intro paragraph
- Link buttons (linkedin, resume, github)

**Intro Text Styling:**
```css
font-size: 30.094px;
line-height: 29px;
letter-spacing: -0.9028px;
width: 572.646px;
color: #fcfcfc;
```

---

### Link Buttons

**Structure:** White pill-shaped buttons with text and arrow icon

**Styling:**
```css
background: white;
padding: 7.652px 21.565px;
border-radius: 13.217px;
gap: 1.391px;
font-size: 9.739px;
color: #373743;
```

**Arrow:** Rotated 90 degrees, size: 16.696px × 16.696px

**Behavior:**
- Opens in new tab (`target="_blank"`)
- Security: `rel="noopener noreferrer"`

---

### Design Engineer SVG

**Position:** `absolute, bottom: 40px, centered`

**Width:** Responsive via CSS variable
```javascript
calc(90vw - introPaddingX × 2)
```

**Effects:**
```css
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
```

**SVG Specs:**
- Natural size: 994px × 163px
- Color: rgba(255, 255, 255, 0.86)
- Typography: Mixed Instrument Serif Italic and Pangea Light

---

### Contact Button

**Styling:**
```css
background: #6f3c59;
padding: 8.79px 27.347px;
border-radius: 39.067px;
box-shadow:
  0px 1.953px 3.907px 0px rgba(0, 0, 0, 0.08),
  0px 0.977px 1.953px 0px rgba(0, 0, 0, 0.04),
  inset 0px 1.953px 6.348px 0px rgba(255, 255, 255, 0.7),
  inset 0px -1.953px 0.977px 0px rgba(0, 0, 0, 0.05);
```

---

### Projects
- File: `src/Projects.jsx` / `Projects.css`
- Behavior: GSAP hover fades on per-card gradients/title/description; stacked layout with rounded top container after the sticky hero.

### Make Code Live Section
- File: `src/MakeCodeLiveSection.jsx` / `src/MakeCodeLiveSection.css`
- Placement: Renders after Projects; transparent background (inherits page backdrop).
- Structure: Divider line; text + portrait hero; lists (Companies, Certifications); CTA with inline arrow path; portrait served from `/make-code-live-portrait.png`.
- Styling: White typography, no text shadows; Instrument Serif for subheads, Pangea Afrikan for body/CTA.

---

## Routing System

### Overview

The portfolio uses **React Router DOM** for client-side navigation between the home page and individual project detail pages.

### Installation

```bash
npm install react-router-dom --legacy-peer-deps
```

**Note:** `--legacy-peer-deps` flag required due to peer dependency conflicts with three.js and postprocessing versions.

### Route Structure

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/project/guardian-app" element={<GuardianAppDetail />} />
    <Route path="/project/wander-app" element={<WanderAppDetail />} />
    <Route path="/project/synechron-cube" element={<SynechronCubeDetail />} />
  </Routes>
</BrowserRouter>
```

### Navigation Implementation

**From Projects Section:**
```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
const handleProjectClick = (projectId) => {
  navigate(`/project/${projectId}`);
};
```

**In Project Detail Header:**
```jsx
// Navigation links
<a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>home</a>
<a href="/#projects">projects</a>
<a href="/#about">about me</a>
```

### Scroll Behavior

All project detail pages automatically scroll to top on mount:
```jsx
useEffect(() => {
  window.scrollTo(0, 0);
}, [project.id]);
```

---

## Project Detail Pages

### Overview

Project detail pages use a **reusable template architecture** where a single `ProjectDetailTemplate` component renders different project data. This ensures consistency across all project pages while maintaining flexibility.

### Architecture

**Data Layer:**
- `src/data/projectsData.js` - Centralized data store for all projects
- Each project has: metadata, title, description, skills, tags, images, other projects

**Template Layer:**
- `src/components/ProjectDetailTemplate.jsx` - Reusable template component
- `src/components/ProjectDetailTemplate.css` - Template styling
- `src/components/ProjectDetailHeader.jsx` - Fixed navigation header
- `src/components/ProjectCard.jsx` - Card component for "Other Projects"

**Page Layer:**
- `src/pages/GuardianAppDetail.jsx`
- `src/pages/WanderAppDetail.jsx`
- `src/pages/SynechronCubeDetail.jsx`

### Data Structure

```javascript
export const projectsData = {
  guardianApp: {
    id: 'guardian-app',
    metadata: {
      date: 'Jan-Mar 2025',
      company: 'Guardian',
      category: 'Healthcare'
    },
    title: 'Guardian App',
    heroImage: '/path/to/image.jpg',
    description: 'Project description...',
    skills: ['User Research', 'Interaction Design', 'Prototyping'],
    tags: [
      { label: 'UX Design', color: '#bad7a8' },
      { label: 'Healthcare', color: '#aaa8d7' }
    ],
    images: {
      main: '/path/to/main.jpg',
      secondary: '/path/to/secondary.jpg'
    }
  },
  // ... other projects
};

export const getOtherProjects = (currentProjectId) => {
  return Object.values(projectsData).filter(
    project => project.id !== currentProjectId
  );
};
```

### Template Usage

Each project page simply imports the template and passes project data:

```jsx
import ProjectDetailTemplate from '../components/ProjectDetailTemplate';
import { projectsData } from '../data/projectsData';

export default function GuardianAppDetail() {
  return <ProjectDetailTemplate project={projectsData.guardianApp} />;
}
```

### Styling Specifications

**Page Container:**
```css
.project-detail-page {
  min-height: 100vh;
  background: white;
  padding-top: 80px; /* Account for fixed navbar */
}
```

**Content Container:**
- Mobile: `padding: 20px 20px 40px`, `gap: 2rem`
- Desktop (≥768px): `padding: 40px 0 60px`, `gap: 3rem` (matches home page)

**Hero Image Heights:**
- Mobile: `500px`
- Tablet (≥768px): `600px`
- Desktop (≥1024px): `750px` (significantly increased for prominence)

**Project Cards ("Other Projects"):**
- Layout: Flexbox row with `justify-content: space-between`
- Card sizing: `flex: 1` to fill available width
- Image heights:
  - Mobile: `350px`
  - Desktop (≥1024px): `450px`

### Header Component

The project detail header replicates the main header structure:
- Left: Navigation links (home, projects, about me)
- Center: Logo (clickable, navigates to home)
- Right: Contact button
- Mobile: Hamburger menu with slide-in panel

**Key Features:**
- Fixed position at top
- Glassmorphic background
- Logo has pointer events enabled for clickability
- Navigation uses `navigate()` to prevent full page reload

---

## Synechron Cube Page (Custom Layout)

### Overview

The Synechron Cube page (`/project/synechron-cube`) uses a **custom layout** different from other project pages. It features a modern, contemporary design with minimal padding (~20px), full-width images, and a modular content system powered by CSS variables.

### Architecture

**Unlike other project pages**, Synechron Cube does NOT use `ProjectDetailTemplate`. Instead, it has a custom implementation with unique sections:

**File Structure:**
- `src/pages/SynechronCubeDetail.jsx` - Custom page component
- `src/pages/SynechronCubeDetail.css` - Page-specific CSS with variables
- `src/components/ContentModule.jsx` - Flexible content module component (6 layouts)
- `src/components/ContentModule.css` - ContentModule CSS with variables

### Page Structure

```jsx
<>
  <ProjectDetailHeader />
  <main className="synechron-cube-page">
    <div className="synechron-cube-container">
      {/* 1. Header Section */}
      <header className="synechron-cube-header">
        <div className="synechron-cube-metadata">May-June 2025 | Synechron | Fintech</div>
        <h1 className="synechron-cube-title">Synechron Cube</h1>
        <div className="synechron-cube-hero-image-container">
          <img src={heroImage} />
        </div>
      </header>

      {/* 2. Bio & Skills Section (Staggered Layout) */}
      <section className="synechron-cube-bio-skills">
        <div className="synechron-cube-description">
          <p>{description}</p>
        </div>
        <div className="synechron-cube-skills">
          {skills.map(skill => <span>{skill}</span>)}
        </div>
      </section>

      {/* 3. Grid Image Section */}
      <section className="synechron-cube-grid">
        <img src={numberGridImage} />
      </section>

      {/* 4. Centered Quote */}
      <section className="synechron-cube-quote">
        <p>{quote}</p>
      </section>

      {/* 5. Content Modules (3 instances + timeline under Why A Cube) */}
      {contentModules.map(module => (
        <ContentModule
          layout={module.layout}
          title={module.title}
          description={module.description}
          images={module.images}
          overlayContent={module.overlayText}
        />
      ))}

      {/* 6. Quote Divider (between legacy + new sections) */}
      <section className="synechron-cube-quote">
        <p>{quote}</p>
      </section>

      {/* 7. New Sections */}
      <section className="synechron-cube-new-sections">
        {/* Feature block: intro media + bento-left (top image hidden) */}
        <section className="synechron-cube-added-block">
          <div className="synechron-cube-feature-image-container">
            <video src={featureBlock.bigImage} />
          </div>
          <ContentModule layout="bento-up-left" />
        </section>

        {/* Two-up bento media */}
        <section className="synechron-cube-bento-pair">
          <video />
          <video />
        </section>
      </section>
    </div>
  </main>
</>
```

### Data Structure Extension

The Synechron Cube data in `projectsData.js` has **additional fields** beyond standard projects:

```javascript
synechronCube: {
  // Standard fields
  id: 'synechron-cube',
  metadata: { date, company, category },
  title: 'Synechron Cube',
  heroImage: '/path/to/hero.jpg',
  description: '...',
  skills: ['Babylon.js', 'Interaction Design', ...],
  tags: [{ label, color }, ...],
  images: ['...'],

  // CUSTOM FIELDS for Synechron Cube page
  numberGridImage: '/Frame 58.png',  // Static grid image
  quote: 'Centered quote text...',   // Centered quote section
  contentModules: [                   // Array of content modules
    {
      layout: 'bento-up-left',
      title: 'Why A Cube?',
      description: 'The 8 faces allowed...',
      images: ['url1'],
      overlayText: '8 faces'
    },
    {
      layout: 'bento-up-left',
      title: 'Process Sketches',
      description: '...',
      images: ['url1', 'url2']
    },
    {
      layout: 'bento-up-right',
      title: 'Model/Texture',
      description: '...',
      images: ['url1', 'url2']
    }
  ],
  featureBlock: {
    bigImage: '/movies_for_portfolio/Intro.mov',
    bentoLeft: {
      layout: 'bento-up-left',
      title: 'Prototype Flow',
      description: '...',
      images: ['/movies_for_portfolio/secondcube.mov']
    }
  },
  bentoPairImages: [
    '/movies_for_portfolio/thirdcube.mov',
    '/movies_for_portfolio/fourthcube.mov'
  ]
}
```

### Modern Spacing System

**Design Philosophy:** Consistent **~20px padding** throughout, with images taking up maximum screen space for a modern, contemporary feel.

**CSS Variables (SynechronCubeDetail.css):**
```css
.synechron-cube-page {
  /* Container */
  --synechron-container-max-width: 100%;
  --synechron-container-padding-mobile: 1.25rem;   /* 20px */
  --synechron-container-padding-desktop: 1.25rem;  /* 20px */
  --synechron-container-padding-bottom: 6rem;      /* 96px */

  /* Section gaps */
  --synechron-section-gap-mobile: 1.25rem;  /* 20px */
  --synechron-section-gap-desktop: 1.25rem; /* 20px */

  /* Header section */
  --synechron-header-gap: 2.5rem;           /* 40px */

  /* Bio & Skills */
  --synechron-bio-skills-gap-mobile: 2rem;  /* 32px */
  --synechron-bio-skills-gap-lg: 3rem;      /* 48px */

  /* Quote section */
  --synechron-quote-padding-mobile: 1.5rem;  /* 24px */
  --synechron-quote-padding-desktop: 13rem;  /* 208px */

  /* New sections */
  --synechron-added-block-gap: 1.25rem;      /* 20px */
  --synechron-new-sections-gap: 1.25rem;     /* 20px */
  --synechron-bento-pair-gap: 1.25rem;       /* 20px */

  /* Typography */
  --synechron-title-font-size-mobile: 3.75rem;   /* 60px */
  --synechron-title-font-size-md: 5rem;          /* 80px */
  --synechron-title-font-size-lg: 6.25rem;       /* 100px */
}
```

**Key Spacing Principles:**
- **Consistent padding:** Always 20px regardless of screen size
- **Unified gaps:** Section spacing is standardized to 20px
- **Full-width images:** Container max-width 100% allows edge-to-edge visuals
- **Responsive scaling:** As screen shrinks, only image width changes (not padding)
- **Modern feel:** Tight spacing creates contemporary, magazine-like aesthetic

### Responsive Behavior

**Mobile to Desktop:**
- **Padding:** Stays constant at ~20px
- **Images:** Scale from full mobile width to full desktop width
- **Gaps:** Remain consistent at 20px
- **Typography:** Scales from 60px → 100px for titles

**Reverse (Desktop to Mobile):**
- **Images:** Get narrower to fit viewport
- **Spacing:** Decreases slightly (40px → 32px)
- **Layout:** Bento layouts stack vertically on mobile

### Live CSS Controls (Synechron Only)

Synechron Cube exposes a **Leva control panel** on this page only for real-time adjustment of spacing, sizing, and module dimensions. The panel writes CSS variables directly onto `.synechron-cube-page` and `ContentModule` instances.

---

## CSS Variables System

### Philosophy

All Synechron Cube components use **CSS variables** for maximum modularity and easy theming. Every color, spacing, font size, and dimension is defined as a variable.

### Benefits

- **Easy customization:** Change one variable to update entire component
- **Consistent theming:** All values defined in one place
- **Maintainability:** Clear naming makes purpose obvious
- **Responsive design:** Variables can change at breakpoints
- **Future-proof:** Easy to add dark mode, alternate themes, etc.

### Variable Naming Convention

**Pattern:** `--{component}-{property}-{variant}`

**Examples:**
```css
--content-module-gap-mobile
--content-module-gap-desktop
--content-module-border-radius-mobile
--content-module-title-color
--number-grid-cell-hover-bg
--synechron-container-padding-mobile
```

### Variable Categories

**1. Colors**
```css
--content-module-title-color: #323232;
--content-module-description-color: #5f5d5d;
--content-module-overlay-text-color: #ffffff;
```

**2. Spacing**
```css
--content-module-gap-mobile: 1.5rem;
--content-module-gap-desktop: 2rem;
--content-module-text-gap: 1rem;
```

**3. Typography**
```css
--content-module-title-font-size-mobile: 1.875rem;
--content-module-description-font-weight: 300;
--content-module-description-line-height: 1.6;
```

**4. Dimensions**
```css
--content-module-image-height-large: 560px;
--content-module-border-radius-mobile: 2.5rem;
--content-module-split-width: 50%;
```

**5. Transitions**
```css
--content-module-image-transition: transform 700ms ease;
```

### Implementation Example

**Component CSS:**
```css
.content-module {
  /* Define variables */
  --content-module-gap-mobile: 1.5rem;
  --content-module-gap-desktop: 2rem;
}

.content-module-stacked {
  /* Use variables */
  gap: var(--content-module-gap-mobile);
}

@media (min-width: 768px) {
  .content-module-stacked {
    gap: var(--content-module-gap-desktop);
  }
}
```

**Customization:**
```css
/* Override variables for custom styling */
.synechron-cube-content-module {
  --content-module-gap-mobile: 2rem;  /* Increase gap */
  --content-module-title-color: #000;  /* Change color */
}
```

---

## ContentModule Component

### Overview

ContentModule is a **flexible, reusable content layout component** with **6 different layout variants**. All styling is controlled via CSS variables for easy customization.

**Location:**
- `src/components/ContentModule.jsx`
- `src/components/ContentModule.css`

### Layout Variants

**1. Stacked**
```
[Title + Description]
[Large Image]
```
- Text above, large image below
- Image: aspect-ratio 16/9 on mobile, fixed height (560px) on desktop

**2. Split-Left**
```
[Image] [Title + Description]
```
- Square image on left, text on right
- 50/50 split on desktop, stacks on mobile
- Supports overlay content on image

**3. Split-Right**
```
[Title + Description] [Image]
```
- Text on left, square image on right
- 50/50 split on desktop, stacks on mobile

**4. Grid-2**
```
[Title + Description]
[Image 1] [Image 2]
```
- Text above, 2 images in grid below
- Images: aspect-ratio 4/3
- 2-column grid on desktop, stacks on mobile

**5. Bento-Up-Left**
```
[Large Image Top]
[Text] [Image Right]
```
- Large image at top
- Bottom row: text left, image right
- Stacks vertically on mobile

**6. Bento-Up-Right**
```
[Large Image Top]
[Image Left] [Text]
```
- Large image at top
- Bottom row: image left, text right
- Stacks vertically on mobile

### Component API

**Props:**
```javascript
{
  title: string,              // Module title
  description: string,        // Module description
  images: string[],          // Array of image URLs
  layout: string,            // Layout variant (see above)
  className?: string,        // Additional CSS classes
  overlayContent?: string    // Text to overlay on image (split-left only)
}
```

**Usage:**
```jsx
<ContentModule
  layout="split-left"
  title="Why A Cube?"
  description="The 8 faces allowed for 8 different topics..."
  images={['url1']}
  overlayContent="8 faces"
  className="custom-class"
/>
```

### CSS Variables (ContentModule.css)

**Complete variable list:**
```css
.content-module {
  /* Colors */
  --content-module-title-color: #323232;
  --content-module-description-color: #5f5d5d;
  --content-module-overlay-text-color: #ffffff;
  --content-module-image-opacity: 1;
  --content-module-image-opacity-dark: 0.9;

  /* Spacing */
  --content-module-gap-mobile: 1.5rem;
  --content-module-gap-desktop: 2rem;
  --content-module-bento-gap: 1.5rem;
  --content-module-bento-gap-desktop: 2.5rem;
  --content-module-text-gap: 1rem;

  /* Border Radius */
  --content-module-border-radius-mobile: 2.5rem;
  --content-module-border-radius-desktop: 4.25rem;
  --content-module-border-radius-grid-mobile: 1.875rem;
  --content-module-border-radius-grid-desktop: 3.75rem;

  /* Typography */
  --content-module-title-font-size-mobile: 1.875rem;
  --content-module-title-font-size-md: 2rem;
  --content-module-title-font-weight: 400;
  --content-module-description-font-size-mobile: 1.125rem;
  --content-module-description-font-weight: 300;
  --content-module-description-line-height: 1.6;
  --content-module-overlay-font-size-mobile: 3.75rem;
  --content-module-overlay-font-size-lg: 6.25rem;

  /* Dimensions */
  --content-module-image-height-large: 560px;
  --content-module-split-width: 50%;

  /* Transitions */
  --content-module-image-transition: transform 700ms ease;
}
```

### Hover Effects

**Image Scale on Hover:**
```css
.content-module-image-container:hover .content-module-image {
  transform: scale(1.05);
}
```

- Smooth 700ms transition
- 5% scale increase
- GPU-accelerated transform

### Responsive Design

**Mobile (< 768px):**
- All layouts stack vertically
- Smaller font sizes
- Reduced gaps (24px)
- Smaller border radius (40px)

**Desktop (≥ 768px):**
- Layouts arrange horizontally
- Larger font sizes
- Increased gaps (32-40px)
- Larger border radius (68px)

### Image Handling

**Aspect Ratios:**
- Square: `1 / 1` (split layouts)
- Video: `16 / 9` (stacked, bento)
- Grid: `4 / 3` (grid-2 layout)

**Background Colors:**
- Light: `#f3f3f3` (default)
- Dark: `#000000` (large images, split images)

**Object Fit:**
- All images: `cover` (fills container, crops if needed)

---

## CSS Variables

### Usage (Legacy)

### Usage

**Dynamic Variables (set via inline styles):**

```javascript
// On .stage element
style={{
  '--content-total-width': `calc(90vw - ${introPaddingX * 2}px)`,
  '--canvas-blur': `${backdropBlur}px`,
  '--noise-opacity': noiseOpacity
}}
```

**Constants:**
```javascript
const CONTENT_WIDTH = 572.646  // Removed (not used anymore)
```

---

## 3D Scene Parameters

### Geometry

```javascript
width: 2.10
height: 1.55
depth: 1.50
radius: 0.50
smoothness: 24
```

### Gradient

```javascript
colorA: '#000000'
colorB: '#ffffff'
colorC: '#b7d7ff'
stopAB: 0.91      // Gradient stop between A and B
stopBC: 0.76      // Gradient stop between B and C
softness: 0.0     // Gradient softness
dirX: 1.4         // Gradient direction X
dirY: 0.2         // Gradient direction Y
dirZ: -0.6        // Gradient direction Z
range: 5.0        // Gradient range
```

### Fresnel (Edge Glow)

```javascript
fresnelColor: '#6dffb1'
fresnelAmount: 2.44
fresnelOffset: 0.29
fresnelIntensity: 5.58
fresnelAlpha: 0.83
fresnelOnly: false
```

### Emissive

```javascript
emissiveColor: '#baffdf'
emissiveStrength: 0.29
```

### Camera

```javascript
pos X: -1.7
pos Y: -0.6
pos Z: -6.5
target X: -0.2
target Y: 0.0
target Z: -0.8
fov: 12           // Telephoto effect (narrow FOV)
minDistance: 7.3
maxDistance: 33.0
enablePan: true
```

### Lighting

```javascript
// Ambient Light
intensity: 0.6

// Directional Light 1
position: [5, 6, 5]
intensity: 0.9

// Directional Light 2
position: [-4, -2, -4]
intensity: 0.25
```

---

## Effects & Post-Processing

### Bloom

```javascript
bloomIntensity: 0.21
bloomThreshold: 1.13
bloomSmoothing: 1.46
bloomRadius: 2.12
```

### Blur (Tilt-Shift)

```javascript
blurEnabled: false
blurStrength: 0.4
blurTaper: 1.0
blurSamples: 10
```

### Grain (Noise)

```javascript
grainEnabled: true
grainOpacity: 1.0
grainBlend: 'SOFT_LIGHT'
```

### Canvas Blur

```javascript
backdropBlur: 70px        // Applied to canvas element
```

### Noise Texture Overlay

```css
background-image: url("data:image/svg+xml,...")  /* SVG noise */
opacity: var(--noise-opacity, 0.10)
```

---

## Responsive Breakpoints

### Media Queries

**768px and below (Tablet):**
```css
- Header padding: 8px 16px
- Nav gap: 20px
- Logo: 24px
- Intro section padding: 0 40px
- Intro content: flex-direction column
- Intro text: 24px font size, 100% width
- Design Engineer: 90% width, max 572.646px
- Project cards: Stack vertically, max-width 530px
```

**600px and below:**
```css
- Nav gap: 12px
- Nav links: 12px
- Logo: 20px
```

**480px and below (Mobile):**
```css
- Header padding: 6px 12px
- Nav gap: 8px
- Nav links: 10px
- Logo: 16px
- Contact button: 8px font, 4px 10px padding
- Intro section padding: 0 20px
- Intro text: 18px font size
- Design Engineer: bottom 20px
```

### Card Heights (Projects Section)

**All Breakpoints:**
```css
.project-card-large {
  min-height: 60vh; /* 60% of viewport height */
}

.project-card-small {
  min-height: 60vh; /* 60% of viewport height */
}
```

**Image Heights:**
- Mobile: `400px` (main), `350px` (single cards)
- Desktop (≥768px): `500px` (main), `340px` (secondary), `450px` (single cards)

**Rationale:** Card heights set to 60vh to ensure projects are prominent and fill significant viewport space, creating stronger visual impact.

---

## Footer Scroll Behavior

### Overview

The footer implements a complex scroll behavior where it scrolls OVER the pinned "About Me" section AFTER the FOV (field of view) animation completes. This creates a layered scrolling effect.

### Implementation Architecture

**Three ScrollTrigger Instances:**

1. **About Section Pin** - Pins the about section for the entire duration (FOV + footer)
2. **FOV Decrease** - Animates camera FOV from 5 to 0 during first 1.5 viewport heights
3. **Footer Reveal** - Controls footer position with translateY during scroll

### Code Implementation

```javascript
const fovAnimationDistance = window.innerHeight * 1.5;
const footerHeight = footerRef.current.offsetHeight;

// 1. Pin about section
ScrollTrigger.create({
  trigger: aboutRef.current,
  start: 'top top',
  end: () => `+=${fovAnimationDistance + footerHeight}`,
  pin: true,
  pinSpacing: false, // Critical: allows footer to scroll over
  id: 'about-pin',
});

// 2. FOV animation
ScrollTrigger.create({
  trigger: aboutRef.current,
  start: 'top top',
  end: () => `+=${fovAnimationDistance}`,
  scrub: 1,
  onUpdate: (self) => {
    const fovDecrease = 5 - (self.progress * 5);
    setScrollFov(fovDecrease);
  }
});

// 3. Footer position control
ScrollTrigger.create({
  trigger: aboutRef.current,
  start: 'top top',
  end: () => `+=${fovAnimationDistance + footerHeight}`,
  scrub: true,
  onUpdate: (self) => {
    const fovProgress = Math.min(
      self.progress / (fovAnimationDistance / (fovAnimationDistance + footerHeight)),
      1
    );

    if (fovProgress < 1) {
      // FOV still animating - keep footer below viewport
      footerRef.current.style.transform = `translateY(${footerHeight}px)`;
    } else {
      // FOV done - calculate footer scroll
      const footerProgress =
        (self.progress - (fovAnimationDistance / (fovAnimationDistance + footerHeight))) /
        (footerHeight / (fovAnimationDistance + footerHeight));
      const translateY = footerHeight * (1 - footerProgress);
      footerRef.current.style.transform = `translateY(${translateY}px)`;
    }
  },
  onLeave: () => {
    footerRef.current.style.transform = 'translateY(0px)';
  },
  onLeaveBack: () => {
    footerRef.current.style.transform = `translateY(${footerHeight}px)`;
  }
});
```

### Key Concepts

**pinSpacing: false**
- Allows footer to overlap pinned section
- Without this, ScrollTrigger creates space for the footer

**translateY Control**
- Footer starts below viewport: `translateY(footerHeight)`
- During FOV animation: stays hidden below
- After FOV completes: gradually scrolls up with `translateY` from full height to 0
- Final position: `translateY(0)` - fully visible

**Timing Calculation**
- Total scroll distance: `fovAnimationDistance + footerHeight`
- FOV portion: `fovAnimationDistance / total`
- Footer portion: `footerHeight / total`
- Progress tracking ensures footer only moves after FOV completes

### Z-Index Layering

```css
.about-section {
  z-index: 5;  /* Pinned section */
}

.footer {
  z-index: 15;  /* Higher than about section to scroll over it */
}
```

---

## Intro Animation

### Overview

The intro animation plays once per browser session using `sessionStorage`. It includes GSAP timeline animations for the header, intro text, design engineer SVG, and canvas elements.

### Storage Strategy

**sessionStorage (Current Implementation):**
- Clears when browser tab/window closes
- Animation replays in new sessions
- Key: `hasPlayedIntro`

**Why sessionStorage over localStorage:**
- User experience: Fresh animations after closing browser feel natural
- No persistence between sessions prevents stale behavior
- Restart-friendly: npm server restarts don't affect behavior

### Implementation

```javascript
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const forceIntro = urlParams.get('intro') === 'true';

  const hasPlayedIntro = !forceIntro && sessionStorage.getItem('hasPlayedIntro') === 'true';

  if (hasPlayedIntro) {
    // Skip animation, set final state
    setIntroComplete(true);
    setHeaderVisible(true);
    setIntroTextVisible(true);
    setDesignEngineerVisible(true);
    return;
  }

  // Play animation
  const tl = gsap.timeline({
    onComplete: () => {
      setIntroComplete(true);
      sessionStorage.setItem('hasPlayedIntro', 'true');
    }
  });

  // Timeline animations...
}, []);
```

### Force Replay

Users can force the intro animation using a URL parameter:
```
http://localhost:5173/?intro=true
```

### Debug Logging

Console logs track intro behavior:
- `🎬 Intro Debug:` - Shows hasPlayedIntro and forceIntro status
- `⏭️  Skipping intro - already played` - Animation skipped
- `▶️  Playing intro animation` - Animation starting

### Animation Sequence

1. **Canvas blur** - Fades in with blur effect
2. **Header** - Slides down from top
3. **Intro text** - Fades in with slight delay
4. **Design Engineer SVG** - Slides up from bottom
5. **Final state** - All elements visible, interactions enabled

---

## Component File Structure

```
src/
├── App.jsx                             # Main app, Leva controls, 3D scene, scrolling hero
├── App.css                             # Sticky hero, stage styles, projects wrapper
├── main.jsx                            # Entry point with React Router (UPDATED)
├── index.css                           # Global styles, root element
├── Header.jsx                          # Navigation header
├── Header.css                          # Header styles (Pangea Afrikan typography)
├── IntroText.jsx                       # Intro section with text and links
├── IntroText.css                       # Intro text and link button styles (Pangea Afrikan)
├── DesignEngineer.jsx                  # Design Engineer SVG component (desktop + mobile)
├── DesignEngineer.css                  # Design Engineer positioning, responsive SVG swap
├── Projects.jsx                        # Projects section with 3 project cards
├── Projects.css                        # Projects styling, GSAP hover effects, 60vh card heights
├── IridescenceMaterial.jsx             # Custom shader material
│
├── components/
│   ├── ProjectDetailTemplate.jsx      # Reusable template for project pages
│   ├── ProjectDetailTemplate.css      # Template styling, matches home page
│   ├── ProjectDetailHeader.jsx        # Fixed header for project pages
│   ├── ProjectCard.jsx                # Card component for "Other Projects"
│   ├── ProjectCard.css                # Project card styling
│   ├── ContentModule.jsx              # Flexible content layout (6 variants) - SYNECHRON ONLY
│   ├── ContentModule.css              # ContentModule styling with CSS variables - SYNECHRON ONLY
│   ├── NumberGrid.jsx                 # Interactive grid component (DEPRECATED - not used)
│   └── NumberGrid.css                 # NumberGrid styling (DEPRECATED - not used)
│
├── pages/
│   ├── GuardianAppDetail.jsx          # Guardian App project page (uses template)
│   ├── WanderAppDetail.jsx            # Wander App project page (uses template)
│   ├── SynechronCubeDetail.jsx        # Synechron Cube project page (CUSTOM LAYOUT)
│   └── SynechronCubeDetail.css        # Synechron Cube page styling with CSS variables
│
└── data/
    └── projectsData.js                 # Centralized project data store (NEW)
```

**Dependencies:**
- `react-router-dom@^6.x` - Client-side routing (NEW)
- `motion@^12.23.24` - Scroll-based animations
- `gsap@^3.14.2` - Advanced animations for project card hovers
- `@gsap/react@^2.1.2` - React integration for GSAP

---

## Design Principles

### Visual Hierarchy

1. **Design Engineer** (bottom) - Largest, most prominent
2. **Intro Text** (top right) - Secondary focus
3. **Header** (top) - Tertiary, subtle
4. **3D Gradient Cube** - Background element, heavily blurred

### Spacing Philosophy

- **Consistent gaps:** 13px, 14px, 19px
- **Breathing room:** Large padding values for spaciousness
- **Optical alignment:** Absolute positioning for precise control

### Color Philosophy

- **Minimal palette:** Black, white, blue, purple, green
- **High contrast:** White text on dark gradients
- **Subtle accents:** Fresnel glow adds visual interest
- **Glass morphism:** Semi-transparent header with blur

### Typography Philosophy

- **Tight letter spacing:** Negative values for modern look
- **Mixed fonts:** Serif for accent, sans-serif for body
- **Hierarchy through size:** Clear distinction between elements

---

## Performance Considerations

### Optimization Techniques

- **Memoization:** Color arrays and direction vectors memoized in RoundedCube
- **Conditional rendering:** Effects only render when enabled
- **CSS variables:** Dynamic values without re-rendering
- **Backdrop filter:** Hardware-accelerated blur effects

### Adjustable Parameters

All 3D parameters are live-adjustable via **Leva** debug panel:
- Geometry dimensions
- Gradient colors and direction
- Camera position and FOV
- Effects intensity
- Background blur and texture

---

## Scrolling Hero Effect (NEW)

### Overview
The portfolio now features a sticky hero section that remains fixed at the top of the viewport while the projects section slides up and covers it during scroll. This is a popular effect used by creative technologists.

### Architecture

**HTML Structure:**
```jsx
<div ref={containerRef} className="stage">
  <Header />              {/* Fixed position, z-index: 1000 */}
  <Leva />                {/* Fixed position, library managed */}

  <div className="hero-section">  {/* Sticky, z-index: 0 */}
    <IntroText />         {/* Absolute positioned */}
    <DesignEngineer />    {/* Absolute positioned */}
    <div className="canvas-wrapper">  {/* Absolute, z-index: 1 */}
      <Scene />           {/* Three.js canvas */}
    </div>
  </div>

  <div className="projects-wrapper">  {/* Relative, z-index: 10 */}
    <Projects />
  </div>
</div>
```

**CSS Architecture:**
```css
#root {
  margin: 0;
  /* No height constraint - grows with content */
}

.stage {
  width: 100%;
  position: relative;
  background: #ffffff;
  /* No min-height, no overflow - natural document scroll */
}

.hero-section {
  position: -webkit-sticky; /* Safari support */
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  /* No overflow - allows sticky to work */}

.projects-wrapper {
  position: relative;
  z-index: 10;  /* Higher than hero, so it covers */
  width: 100%;
  min-height: 100vh;
}
```

### How It Works

1. **Natural Document Scroll:** The page grows taller than viewport (hero 100vh + projects ~100vh+), enabling document scroll
2. **Sticky Positioning:** `.hero-section` sticks to `top: 0` as you scroll
3. **Z-Index Layering:** Projects (z-10) slides over hero (z-0) due to higher z-index
4. **White Background:** Projects section has white background that occludes the hero

### Critical Requirements for Sticky to Work

- ✅ Parent container must NOT have `overflow: hidden` or `overflow-y: auto`
- ✅ Parent must NOT have fixed height that constrains growth
- ✅ Sticky element must have `top`, `bottom`, `left`, or `right` specified
- ✅ Content after sticky element must create scroll space

### Z-Index Hierarchy (Final)

From highest to lowest:
1. **Header**: 1000 (fixed, always on top)
2. **Leva Panel**: ~9999 (library managed)
3. **Projects Section**: 10 (slides over hero)
4. **Canvas Noise Overlay**: 10 (inside canvas-wrapper)
5. **Canvas Wrapper**: 1 (Three.js background)
6. **Hero Section**: 0 (sticky container)

---

## Projects Section (NEW)

### Component Structure

**Projects.jsx:**
- 3 project cards: Guardian App, Wander App, Synechron Cube
- GSAP hover animations (gradient overlay, text color changes)
- Responsive grid layout (1 large + 2 small cards)
- Tag pills with custom colors

**Key Features:**
- **Hover Effect:** Gradient overlay fades in (opacity 0→1), title/description change to white
- **Animation:** GSAP with `power2.inOut` easing, 0.5s duration
- **Responsive:** Stacks vertically on mobile (≤768px)

**Project Data Structure:**
```javascript
{
  title: "Project Name",
  description: "Project description...",
  tags: ["Tag 1", "Tag 2"],
  colors: ["bg-color-1", "bg-color-2"],  // Pill colors
  images: ["url1", "url2"]  // Project images
}
```

### Projects Styling

**Main Container:**
```css
.projects-container {
  background: white;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  box-shadow: 0px -4px 7.5px -0.9px rgba(0, 0, 0, 0.07);
  min-height: 100vh;
}
```

**Card Colors:**
- bg-color-1: `#bad7a8` (light green)
- bg-color-2: `#aaa8d7` (light purple)
- bg-color-3: `#d7d6a8` (light yellow)
- bg-color-4: `#d7a8a8` (light red)
- bg-color-5: `#d7a8cc` (light pink)

**Gradient Overlay:**
```css
background: linear-gradient(to bottom, #af4b70, #ffffff);
opacity: 0; /* Hidden by default, shows on hover */
```

---

## Mobile Responsiveness (UPDATED)

### Design Engineer SVG Swap

**Desktop (>768px):** `Design Engineer.svg`
**Mobile (≤768px):** `Design Engineer_Mobile.svg`

**Implementation:**
```jsx
<div className="design-engineer-container">
  <img src={designEngineerSvg} className="design-engineer-svg design-engineer-desktop" />
  <img src={designEngineerMobileSvg} className="design-engineer-svg design-engineer-mobile" />
</div>
```

**CSS:**
```css
.design-engineer-desktop {
  display: block;
}

.design-engineer-mobile {
  display: none;
}

@media (max-width: 768px) {
  .design-engineer-desktop { display: none; }
  .design-engineer-mobile { display: block; }
}
```

### Projects Section Responsive

**Desktop:**
- 1 large horizontal card (Guardian)
- 2 small vertical cards side-by-side (Wander, Synechron)

**Tablet (≤768px):**
- All cards stack vertically
- Cards max-width: 530px

**Mobile (≤480px):**
- Reduced padding and spacing
- Optimized image sizes

---

## Performance Considerations (UPDATED)

### Optimization Techniques

- **Memoization:** Color arrays and direction vectors memoized in RoundedCube
- **GSAP Scoping:** Animations scoped to containerRef to prevent memory leaks
- **Conditional Effects:** Only render enabled post-processing effects
- **CSS Variables:** Dynamic values without re-rendering
- **Backdrop Filter:** Hardware-accelerated blur effects
- **Lazy Loading:** Project images can be lazy loaded (future enhancement)

### Scroll Performance

- Natural document scroll (no JavaScript scroll listeners affecting performance)
- Sticky positioning handled natively by browser
- No scroll event throttling needed
- GPU-accelerated transforms for smooth animations

---

## Future Modifications (UPDATED)

### To Add:

- [x] ~~Projects section~~ ✅ COMPLETED
- [x] ~~Scroll animations~~ ✅ COMPLETED (scrolling hero effect)
- [x] ~~Project detail pages~~ ✅ COMPLETED (routing + template system)
- [x] ~~Mobile menu for navigation~~ ✅ COMPLETED (header + project detail header)
- [ ] Actual links for linkedin, resume, github buttons
- [ ] Additional pages/sections (contact page, etc.)
- [ ] Loading states for route transitions
- [ ] Fade/scale animations on hero scroll (optional)
- [ ] Lazy loading for project images

### To Refine:

- [x] ~~Font loading strategy~~ ✅ COMPLETED (unified Pangea Afrikan VAR 2.003)
- [ ] Image optimization (download Figma API images locally)
- [ ] Accessibility (ARIA labels, focus states, keyboard navigation)
- [ ] SEO meta tags and Open Graph tags
- [ ] Real project content (replace placeholder images/text)
- [ ] Smooth page transitions between routes
- [ ] Project detail page animations on scroll

---

## Implementation Notes (UPDATED)

### Scrolling Hero Effect

**Key Learnings:**
- Sticky positioning requires parent to NOT have `overflow: hidden` or constrained height
- Natural document scroll is more performant than internal scroll containers
- Removing `min-height` constraints from container allows natural growth
- Safari requires `-webkit-sticky` prefix

**Debug Process:**
- Console logs revealed page was scrollable but hero wasn't sticking
- Issue was `overflow: hidden` on `.hero-section` preventing sticky behavior
- Removing height constraints from `#root` and `.stage` allowed natural scroll

### Project Detail Pages

**Key Decisions:**
- **Template Architecture:** Single reusable template component instead of duplicating code
- **Centralized Data:** All project data in one file (`projectsData.js`) for easy management
- **Helper Function:** `getOtherProjects()` automatically filters current project from "Other Projects"
- **Scroll Behavior:** `useEffect` with `window.scrollTo(0, 0)` ensures users start at page top
- **Routing:** Client-side routing with React Router for smooth navigation without full page reload

**Styling Consistency:**
- Project detail pages match home page padding/spacing (40px desktop, 20px mobile)
- Hero images significantly taller (750px desktop) for visual impact
- Cards use `flex: 1` to fill available width edge-to-edge

### Projects Section

**GSAP Integration:**
- Used `useGSAP` hook for React integration
- Scoped animations to `containerRef` for cleanup
- Dependencies array `[hoveredIndex]` ensures animations run on hover state change
- Class-based targeting (`.project-gradient-0`, etc.) for specific card animations

**Card Height Strategy:**
- Set to `60vh` for prominent viewport presence
- Ensures projects are visually striking regardless of screen size
- Doubled header margin (80px) creates better visual separation

### Typography Unification

**Process:**
- Searched entire codebase for "Inter" font usage
- Replaced all instances with "Pangea Afrikan VAR 2.003"
- Updated 6 files across components:
  - Header.css (3 instances)
  - ProjectCard.css (2 instances)
  - IntroText.css (1 instance)
- Verified no Inter fonts remain in system

### Mobile SVG Swap

**Approach:**
- Render both SVGs, hide one with CSS
- Media query at 768px breakpoint
- No JavaScript required - pure CSS solution
- Both images load but only one displays (could optimize with lazy loading)

### Footer Scroll Over About Section

**Challenge:**
- Footer needed to scroll OVER pinned about section AFTER FOV animation
- Initial attempt used `pinSpacing: true` which created space instead of overlay

**Solution:**
- `pinSpacing: false` to allow overlay
- Complex translateY control keeps footer below viewport during FOV
- After FOV completes, footer scrolls up with calculated progress
- Three separate ScrollTrigger instances coordinate the behavior

### Intro Animation Storage

**Challenge:**
- localStorage persisted across server restarts, preventing replay
- User wanted fresh intro on new browser sessions

**Solution:**
- Changed to sessionStorage which clears on browser/tab close
- Added URL parameter (`?intro=true`) to force replay for debugging
- Console logging helps troubleshoot animation behavior

---

## Notes (UPDATED)

### Layout & Sizing
- **Design Engineer width:** Dynamically calculated as `90vw - (padding × 2)`
- **Intro text width:** Fixed at 572.646px
- **Card heights:** All project cards set to 60vh for prominent viewport presence
- **Viewport-based sizing:** Ensures responsive behavior across all screen sizes
- **Scrolling hero effect:** Popular creative technologist effect now implemented
- **Natural document scroll:** More performant than overflow scroll containers

### Typography
- **Unified Font System:** ALL sans-serif text uses Pangea Afrikan VAR 2.003 exclusively
- **No Inter Font:** Inter completely removed from system - verified across all files
- **Font Fallbacks:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`
- **Serif Font:** Instrument Serif used only for logo characters and project titles

### Routing & Navigation
- **Client-Side Routing:** React Router DOM handles all navigation
- **Scroll Reset:** Project detail pages automatically scroll to top on mount
- **Navigation Links:** Use `navigate()` to prevent full page reloads
- **URL Structure:** `/project/{project-id}` format for clean URLs

### Project Detail Pages
- **Template Architecture:** Single reusable component serves all project pages
- **Centralized Data:** `projectsData.js` contains all project information
- **Auto-filtering:** "Other Projects" automatically excludes current project
- **Consistent Styling:** Matches home page padding and spacing exactly

### Animations & Behavior
- **Intro Animation:** Uses sessionStorage, replays on new browser sessions
- **Footer Scroll:** Complex translateY behavior scrolls over pinned about section
- **FOV Animation:** Completes BEFORE footer begins scrolling
- **Debug Logging:** Console logs available for troubleshooting intro/scroll behavior

### Spacing Updates
- **Projects Header:** 80px bottom margin (doubled from original 40px)
- **Project Cards:** Large gaps and spacing for visual breathing room
- **Hero Images:** 750px height on desktop for maximum impact

### Performance
- **GSAP Scoping:** Animations scoped to refs for proper cleanup
- **Natural Scroll:** Browser-native scroll more performant than JS listeners
- **GPU Acceleration:** Transform-based animations for smooth performance
- **Component Memoization:** Color arrays and vectors memoized in 3D scene

### Production Considerations
- **Figma Images:** IntroText uses Figma API URLs (should be downloaded for production)
- **Image Optimization:** Project images should be optimized and served locally
- **Debug Logs:** Can be removed for production builds
- **SEO:** Add meta tags and Open Graph tags for social sharing
- **Accessibility:** ARIA labels and keyboard navigation to be added

### Synechron Cube Integration (December 16, 2025)

**Overview:**
Integrated Synechron Cube page with modern, contemporary design using CSS variables for maximum modularity.

**Key Decisions:**
- **Custom Layout:** Chose NOT to use ProjectDetailTemplate for design flexibility
- **CSS Variables:** All styling (colors, spacing, typography) defined as variables for easy customization
- **Modern Spacing:** Consistent 20px padding with full-width images for contemporary feel
- **ContentModule Component:** Created reusable component with 6 layout variants
- **Static Grid Image:** Replaced interactive NumberGrid with static image (`/Frame 58.png`)
- **Why A Cube Layout Refresh (Dec 17, 2025):** Image/text swapped to split-left with a 70/30 width split, 16:9 image, top-aligned text, reduced corner radii, and local asset (`/Frame 56.png`)
- **Timeline:** GSAP timeline respects container padding, measures circle centers for exact line endpoints, and switches to vertical layout on tablet/mobile

**Components Created:**
1. **ContentModule.jsx/css** - Flexible layout component (stacked, split-left, split-right, grid-2, bento-up-left, bento-up-right)
2. **SynechronCubeDetail.jsx/css** - Custom page with modular sections
3. **NumberGrid.jsx/css** - (DEPRECATED) Created but replaced with static image

**Data Structure Extension:**
Extended `projectsData.js` synechronCube object with:
- `numberGridImage` - Static grid image path
- `quote` - Centered quote text
- `contentModules[]` - Array of content module configurations

**Styling Philosophy:**
- **Minimal padding:** ~20px throughout for modern aesthetic
- **Full-width images:** Container max-width 100% for edge-to-edge visuals
- **Reduced gaps:** 32-40px section spacing (vs. 48-80px on other pages)
- **Responsive scaling:** Padding stays constant, only images/gaps scale
- **Magazine-like:** Tight, contemporary spacing creates visual impact

**CSS Variables Benefits:**
- All colors, spacing, typography defined as variables
- Easy to customize entire page by changing a few variables
- Future-proof for dark mode, alternate themes
- Clear naming convention: `--{component}-{property}-{variant}`

**Lessons Learned:**
- CSS variables provide excellent modularity for complex layouts
- Consistent padding across breakpoints creates modern feel
- Full-width images require max-width: 100% on container
- ContentModule pattern highly reusable for future project pages

---

**End of Design System Documentation**
