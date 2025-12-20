# Plan: Integrate “Make Code Live” Hero Into Main App

## Quick Analysis (Make Code Live)
- Structure: Single-page hero in `Make Code Live/src/app/App.tsx` with background image, intro paragraph, portrait image, two info columns (Companies/Certifications), and CTA arrow (`svgPaths.p18087100`).
- Styling: Tailwind utility classes via imported `tailwind.css`/`theme.css`; inline font family `"Inter"`. Uses absolute background with overlay blend; layout centered in a max-width container.
- Assets: Two Figma-hosted PNGs (`imgScreenshot20251212At101636Pm1` for background, `imgLetsgo1` portrait). One inline SVG path for the CTA arrow.
- Dependencies: Heavy Radix/MUI/etc. listed but unused in the hero; adds `motion` dependency but not used. Tailwind v4 + Vite v6 in this subproject. Fonts beyond Inter aren’t loaded here either.
- Content specifics: Text and lists are hardcoded; sizes are pixel-based but responsive through Tailwind flex/stack changes. CTA is static (no link).

## Integration Goals
Bring the hero layout/content into the main app (`src/App.jsx`) without Tailwind or extra dependencies, keeping the main design system and Leva/canvas intact, and place it immediately after the Projects section. Omit the imported background image—use the main page background instead; only the foreground content matters.

## Plan (Steps)
1) **Asset prep**
   - Keep only the portrait image (self-host in `public/` as WebP/AVIF). Skip the hero’s background image; rely on the main page’s existing background.
   - Keep the CTA arrow path inline (`svgPaths.p18087100`) or copy the minimal `svgPaths` file into `src/assets`.

2) **Layout component**
   - Rebuild the hero as a React component (e.g., `MakeCodeLiveHero.jsx`) using standard CSS (no Tailwind) aligned with existing typography/colors. Port the structure: top line, intro text, portrait block, info lists, CTA row.
   - Use flex + media queries to mirror the existing responsive stacks (column on mobile, row on desktop).

3) **Styling without Tailwind**
   - Create a scoped CSS module/stylesheet (e.g., `MakeCodeLiveHero.css`) that mirrors key Tailwind values (spacing, font sizes, tracking, grayscale on the portrait, opacity overlay).
   - Use existing fonts from the main app; if Inter is required, load it globally once.

4) **Placement in main page**
   - Mount immediately after the Projects section in `src/App.jsx`. Ensure absolute-positioned canvas/header don’t collide; wrap in a relative container with adequate padding so the fixed header doesn’t overlap.

5) **Behavior + a11y**
   - Add real CTA destination (mailto/section anchor) and `aria-label`.
   - Provide meaningful `alt` text for portrait/background; set `aria-hidden` on decorative elements.

6) **Remove unused baggage**
   - Do not bring over Tailwind, Radix, MUI, or `motion` dependencies into the main app; only copy the minimal hero component + assets + tiny `svgPaths`.

7) **Performance + responsiveness**
   - Use CSS `object-fit: cover` for the background with a lightweight overlay; consider lazy-loading the portrait.
   - Verify on mobile that content doesn’t clash with the fixed header; adjust top padding if needed.

8) **Testing**
   - Run `npm run dev` to visually confirm layout, then `npm run build` for a clean build. Check in multiple viewport widths and ensure Leva panel/canvas are unaffected.

9) **Visibility handoff on scroll**
   - Add a scroll-triggered opacity handoff: as the user reaches the Projects section, fade out the hero overlays (`IntroText`, `DesignEngineer`) and fade in the Make Code Live content. Use a scroll listener or an intersection observer/GSAP scroll trigger to drive opacity, ensuring the canvas and header remain untouched.
