## Footer Integration Plan

Goal: add the existing `footer-react` component to the main app after `MakeCodeLiveSection`, keeping style/stacking consistent.

1) Copy component into src
   - Add `Footer.jsx` and `Footer.css` to `src/` based on `footer-react` versions.
   - Add `footerData` (or inline data) to a small module in `src/` (e.g., `footerData.js`) for easy edits.
2) Wire fonts or adjust
   - If `Pangea Afrikan` / `Instrument Serif` aren’t globally loaded, swap to the app’s existing font stack (Inter/Pangea variants already used) to avoid missing font warnings.
3) Import and render
   - In `App.jsx`, import `Footer` (and `footerData` if used).
   - Render `<Footer data={footerData} />` immediately after `<MakeCodeLiveSection />`.
4) Style alignment
   - Ensure `Footer.css` is imported in `Footer.jsx` and that its container width/padding matches nearby sections (consider reusing `max-width` patterns from `MakeCodeLiveSection`).
   - Confirm z-index isn’t needed; footer should sit in normal flow beneath prior content.
5) Responsive check
   - Verify mobile stacking: social links column layout, wordmark scaling, and padding adjustments.
6) Sanity pass
   - Run `npm run lint` for any import/style issues.
   - Visual check in the browser for spacing/contrast transitions between sections.
