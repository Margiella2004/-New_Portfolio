# Revamped Projects Page - Design Specification

## Overview
A modern projects listing page with a two-column layout featuring a navigation list on the left and detailed project preview on the right.

---

## Layout Structure

### Desktop Layout
- **Two-column layout**
  - Left: Project navigation list with vertical accent line
  - Right: Featured project preview card
  - Gap between columns: **193px**

### Page Container
- Left padding: **45px**
- Top padding: **156px** (from top to header)

---

## Typography

### Page Header
**"Projects" Title:**
- Font: Pangea Afrikan VAR 2.003 Regular
- Size: **28.753px** (1.797rem)
- Color: **#393939**
- Letter spacing: **-0.5751px** (-0.02em)
- Font weight: 400
- Font variation settings: 'ital' 0, 'XTDR' 0, 'APRT' 0, 'SPAC' 0, 'INKT' 0, 'SS01' 0, 'SS02' 0, 'SS03' 0

**Item Count ("3 items"):**
- Font: Pangea Afrikan VAR 2.003 Regular
- Size: **12.579px** (0.786rem)
- Color: **#393939**
- Letter spacing: **-0.2516px** (-0.02em)
- Font weight: 400
- Font variation settings: Same as title

### Project List (Left Column)

**Project Numbers (01, 02, 03):**
- Font: Instrument Serif Regular
- Size: **18.718px** (1.17rem)
- Letter spacing: **0.1872px** (0.01em)
- Line height: **54.17%**
- Alignment: Center
- Font style: Normal (not italic)

**Project Titles:**
- Font: Instrument Serif Italic
- Size: **60.52px** (3.783rem)
- Letter spacing: **-3.026px** (-0.05em)
- Line height: **54.17%**
- Font style: Italic
- Colors:
  - Active project: **#6f3d59** (burgundy/wine)
  - Inactive projects: **#7c7b7b** (gray)

**Project List Item Structure:**
- Each item: number + title aligned together
- Gap between items: **30.805px**

### Featured Project Card (Right Column)

**Tags:**
- Font: Inter Regular
- Size: **8.793px** (0.549rem)
- Line height: **10.678px** (1.214)
- Letter spacing: **-0.0945px** (-0.011em)
- Color: **#6f3d59**
- Border: 1px solid #6f3d59
- Background: transparent
- Padding: **6.909px vertical, 19.471px horizontal**
- Border radius: **11.934px**
- Gap between tags: **8.126px**

**View Work Button:**
- Font: Inter Regular
- Size: **9.739px** (0.609rem)
- Line height: **11.826px** (1.214)
- Letter spacing: **-0.1046px** (-0.011em)
- Color: white
- Background: **#6f3d59**
- Padding: **7.652px vertical, 21.565px horizontal**
- Border radius: **13.217px**
- Dimensions: **116px × 45px**
- Icon: Arrow (rotated 90deg), size 16.696px
- Gap between text and icon: **1.391px**

**Description Text:**
- Font: Pangea Afrikan VAR 2.003 Text Light
- Size: **18px** (1.125rem)
- Line height: **22px** (1.222)
- Letter spacing: **-0.54px** (-0.03em)
- Color: **#a58698** (muted pink/mauve)
- Font weight: 300 (light)
- Max width: **430px**
- Height: **87px** (approximately 4 lines)
- Font variation settings: 'ital' 0, 'XTDR' 50, 'APRT' 100, 'SPAC' 40, 'INKT' 1, 'SS01' 1, 'SS02' 0, 'SS03' 0

---

## Spacing & Layout

### Header Section
- Flexbox container with space-between alignment
- Height: **32px**
- Width: **1275px** (max-width, allows for scrolling)
- Gap between title and count: **1137px** (auto with space-between)

### Left Navigation Column
- Vertical accent line: **0px width** (decorative border-left)
- Line color: Likely #6f3d59
- Gap from line to content: **16.943px**
- Content max-width: **303.426px**

### Right Content Column
- Max width: **660px**
- Gap structure:
  - Image to tags/button row: **24px**
  - Tags/button row to description: **12px**

**Tags and Button Row:**
- Container width: **648.408px**
- Gap between tag group and button: **74px**
- Tag group width: **458.408px**

### Hero Image
- Dimensions: **660px × 322px**
- Border radius: **26px**
- Background: black (#000000)
- Overflow: hidden (clip)
- Inner image positioning:
  - Position: absolute
  - Left: **37.31px**
  - Top: **-31px**
  - Size: **799px × 418px**
  - Object-fit: cover
  - Object-position: 50% 50%

---

## Colors

### Primary Colors
- **Burgundy/Wine (Active)**: #6f3d59
- **Gray (Inactive)**: #7c7b7b
- **Muted Pink (Description)**: #a58698
- **Dark Gray (Header)**: #393939
- **White**: #ffffff
- **Black (Image BG)**: #000000

### Color Usage
- Active project indicator: #6f3d59
- Inactive projects: #7c7b7b
- Tags border/text: #6f3d59
- Button background: #6f3d59
- Button text: white
- Description: #a58698
- Page header text: #393939

---

## Component Structure

### Page Hierarchy
```
Page Container (45px left padding, 156px top padding)
├── Header (Projects + 3 items)
│   └── Top: 156px from page top
│
└── Main Content (Top: 233px from page top)
    ├── Left Column (Project List)
    │   ├── Vertical accent line
    │   └── Projects (01-03)
    │       └── Gap: 30.805px between items
    │
    └── Right Column (Featured Project) [Gap: 193px from left]
        ├── Hero Image (660×322px, r:26px)
        ├── Tags + Button Row [Gap: 24px from image]
        │   ├── Tags (gap: 8.126px)
        │   └── Button [Gap: 74px from tags]
        └── Description [Gap: 12px from tags/button]
```

---

## Mobile Layout (iPhone 16)

### Mobile Structure
- **Single-column stacked layout**
  - Header at top
  - Project navigation list
  - Hero image (full-width)
  - Tags row
  - Description
  - Button (stacked below description)

### Mobile Container & Positioning
- Border radius: **20px** (device container)
- Header padding: **20px** from top and left
- Project list: **22px** from left, **96.5px** from top
- Hero image: **13px** from left, **271px** from top
- Content section: **23px** from left, **607px** from top

### Mobile Typography Changes

**Page Title "Projects":**
- Size: **25px** (1.5625rem) - reduced from 28.753px
- Letter spacing: **-0.5px** (-0.02em)
- All other properties same as desktop

**Item Count "3 items":**
- Size: **12.579px** (0.786rem) - same as desktop

**Project Numbers:**
- Size: **13.347px** (0.834rem) - reduced from 18.718px
- Letter spacing: **0.1335px** (0.01em)
- Line height: **54.17%** - same as desktop

**Project Titles:**
- Size: **43.154px** (2.697rem) - reduced from 60.52px
- Letter spacing: **-2.1577px** (-0.05em)
- Line height: **54.17%** - same as desktop
- Colors: Same as desktop (#6f3d59 active, #7c7b7b inactive)

**Description Text:**
- Size: **13px** (0.8125rem) - reduced from 18px
- Line height: **18px** (1.385) - reduced from 22px
- Letter spacing: **-0.39px** (-0.03em)
- Max width: **361px** - reduced from 430px
- Height: **87px** (maintains same line count)

**Tags & Button:**
- All sizes remain the same as desktop
- Same styling and dimensions

### Mobile Spacing

**Project List:**
- Gap between projects: **21.965px** - reduced from 30.805px
- Gap from vertical line to content: **12.081px** - reduced from 16.943px
- Content width: **216.358px** - reduced from 303.426px

**Hero Image Section:**
- Image dimensions: **370px × 322px** - reduced width from 660px
- Border radius: **26px** - same as desktop
- Gap to content below: **24px** - same as desktop

**Content Below Image:**
- Container width: **370px**
- Gap between tags and description: **12px** - same as desktop
- Gap between description and button: **24px** - NEW (button moves below)

**Tags Row:**
- Layout: Horizontal row (same as desktop)
- Gap between tags: **8.126px** - same as desktop
- Container width: **361px**
- Button is NO LONGER beside tags - moved below description

### Mobile Layout Flow
```
Mobile Container (20px padding)
├── Header (20px top)
│   ├── "Projects" title (25px)
│   └── "3 items" count (12.579px)
│
├── Project List (22px left, 96.5px top)
│   ├── Vertical accent line
│   └── Projects (01-03)
│       └── Gap: 21.965px between items
│
├── Hero Image (13px left, 271px top)
│   └── Size: 370×322px
│
└── Content Section (23px left, 607px top)
    ├── Tags Row
    │   └── Gap: 8.126px between tags
    ├── Description [Gap: 12px from tags]
    │   └── Width: 361px
    └── Button [Gap: 24px from description]
        └── Size: 116×45px (same as desktop)
```

### Mobile Hero Image Positioning
- Container: **370px × 322px**
- Border radius: **26px**
- Background: black
- Inner image:
  - Position: absolute
  - Left: **-42px**
  - Top: **-14px**
  - Size: **669px × 350px**
  - Object-fit: cover
  - Object-position: 50% 50%

---

## Interactive States (Assumptions)
- **Hover on inactive projects**: Likely transition to #6f3d59
- **Hover on button**: Possibly darker shade of #6f3d59 or scale effect
- **Hover on tags**: Possibly filled background with #6f3d59
- **Active project indicator**: Left border or background highlight

---

## Assets
- Hero image: Screenshot 2025-12-19 at 8.49.00 AM 1
- Arrow icon: material-symbols-light:arrow-back (rotated 90deg)
- Vertical line decoration (SVG): Frame 2147238386

---

## Development Notes

### Font Loading Required
1. **Pangea Afrikan VAR 2.003** (Regular, Text Light)
2. **Instrument Serif** (Regular, Italic)
3. **Inter** (Regular)

### CSS Custom Properties Suggested
```css
/* Colors */
--projects-primary: #6f3d59;
--projects-inactive: #7c7b7b;
--projects-description: #a58698;
--projects-header: #393939;

/* Desktop Spacing */
--projects-column-gap: 193px;
--projects-list-gap-desktop: 30.805px;
--projects-list-line-gap-desktop: 16.943px;
--projects-card-gap: 24px;
--projects-tag-gap: 8.126px;
--projects-tag-button-gap: 74px;

/* Mobile Spacing */
--projects-list-gap-mobile: 21.965px;
--projects-list-line-gap-mobile: 12.081px;
--projects-desc-button-gap: 24px;

/* Desktop Typography */
--projects-title-size-desktop: 1.797rem; /* 28.753px */
--projects-number-size-desktop: 1.17rem; /* 18.718px */
--projects-name-size-desktop: 3.783rem; /* 60.52px */
--projects-desc-size-desktop: 1.125rem; /* 18px */
--projects-desc-line-height-desktop: 22px;

/* Mobile Typography */
--projects-title-size-mobile: 1.5625rem; /* 25px */
--projects-number-size-mobile: 0.834rem; /* 13.347px */
--projects-name-size-mobile: 2.697rem; /* 43.154px */
--projects-desc-size-mobile: 0.8125rem; /* 13px */
--projects-desc-line-height-mobile: 18px;

/* Shared Typography */
--projects-item-size: 0.786rem; /* 12.579px - same on both */
--projects-tag-size: 0.549rem; /* 8.793px - same on both */
--projects-button-size: 0.609rem; /* 9.739px - same on both */

/* Container Widths */
--projects-hero-width-desktop: 660px;
--projects-hero-width-mobile: 370px;
--projects-hero-height: 322px;
--projects-content-width-desktop: 430px;
--projects-content-width-mobile: 361px;
```

---

## Breakpoint Recommendations

### Suggested Breakpoints
```css
/* Mobile: < 768px */
@media (max-width: 767px) {
  /* Single column layout */
  /* Mobile typography sizes */
  /* Button stacks below description */
}

/* Desktop: >= 768px */
@media (min-width: 768px) {
  /* Two-column layout */
  /* Desktop typography sizes */
  /* Button beside tags */
}
```

### Key Layout Changes at Breakpoint
1. **Layout**: Single column → Two column
2. **Button position**: Below description → Beside tags
3. **Hero width**: 370px → 660px
4. **Typography**: Mobile scale → Desktop scale
5. **Spacing**: Tighter gaps → Wider gaps
6. **Project list**: Stacked above image → Left column

---

## Implementation Priority
1. ✅ Desktop layout structure (two-column grid)
2. ✅ Mobile layout structure (single-column stack)
3. ✅ Typography system (desktop + mobile scales)
4. Hero image component with responsive sizing
5. Tag and button components
6. Interactive states and hover effects
7. Smooth transitions between breakpoints

---

## Key Design Decisions

### Layout Philosophy
- **Desktop**: Side-by-side navigation emphasizes browsing
- **Mobile**: Vertical stack prioritizes content consumption
- **Button placement**: Desktop encourages quick action (beside tags), Mobile follows natural flow (after description)

### Typography Scale
- **Consistent reduction ratio**: ~0.71x from desktop to mobile for major text
- **Preserved elements**: Tags, buttons, item count maintain size for usability
- **Line height adjustments**: Tighter on mobile for better vertical rhythm

### Color Strategy
- **Active state**: Burgundy (#6f3d59) creates clear hierarchy
- **Inactive state**: Gray (#7c7b7b) reduces visual noise
- **Description**: Muted pink (#a58698) complements burgundy without competing
- **Consistent across breakpoints**: No color changes between desktop/mobile

---

*Last Updated: 2025-12-19*
*Status: ✅ Complete - Desktop and Mobile specifications finalized*
