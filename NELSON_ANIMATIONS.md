# Nelson.co animation snippets and analysis

Below are the exact animation-related snippets found in the cloned `nelson.co` repo and a short description of how each works.

## 1) Canvas intro animation (requestAnimationFrame loop)
**File:** `nelson.co/components/canvas.js`

```js
const render = () => {
  for (x = 0; x <= 30; x++) {
    for (y = 0; y <= 30; y++) {
      draw(context, x, y, R(x, y, time), G(x, y, time), B(x, y, time))
    }
  }
  time = time + 0.02
  animationFrameId = window.requestAnimationFrame(render)
}
render()
return () => {
  window.cancelAnimationFrame(animationFrameId)
}
```

**How it works:**
- The component draws a 32×32 grid to a canvas on every frame.
- Color values change over time via cosine functions (`R/G/B`) to create a shifting pattern.
- The loop is driven by `requestAnimationFrame`, so it runs continuously while the component is mounted.

---

## 2) Global link hover transition
**File:** `nelson.co/styles/styles.css`

```css
a {
  @apply underline transition duration-300 ease-in-out dark:underline-dark text-secondary dark:text-darkSecondary;
}
a:hover {
  @apply underline transition duration-300 ease-in-out dark:underline-dark text-primary dark:text-darkPrimary;
}
```

**How it works:**
- Tailwind utilities add a 300ms transition to all anchors.
- On hover, the text color shifts from secondary to primary (light and dark themes).
- The underline stays, but the underline color is controlled by separate utilities in the same file.

---

## 3) SVG hover color change (group-hover)
**File:** `nelson.co/components/svg.js`

```jsx
<a
  className="self-center text-tertiary dark:text-darkTertiary opacity-80 group "
  href="https://www.are.na/gavin-nelson/notes-on-taste"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="are.na"
>
  <svg ...>
    <path
      className="transition duration-300 ease-in-out fill-current text-tertiary dark:text-darkTertiary group-hover:text-primary group-hover:dark:text-darkPrimary"
    />
  </svg>
</a>
```

**How it works:**
- The parent link has `group`, so its hover state can be used by children.
- The `<path>` uses `group-hover:*` to change the SVG fill color when the link is hovered.
- The `transition` utilities smooth the color change over 300ms.

---

## 4) Readwise hover + open/close transitions
**File:** `nelson.co/components/readwisedata.js`

```jsx
<div className="flex flex-row items-center transition-all ease-in-out 100ms group">
  <p ...>Read X highlights</p>
  <div
    onClick={() => {
      setOpen(!open)
    }}
    className={
      open
        ? "ml-1 mt-0.5 transition-all 200ms ease-in-out transform rotate-90"
        : "ml-1 mt-0.5"
    }
  >
    <Chevron />
  </div>
</div>
```

```jsx
<Link
  href={`/highlights#${highlightID}`}
  passhref
  className="relative flex-shrink-0 p-0.5 transition-all 200ms ease-in-out md:opacity-0  md:group-hover:opacity-100 group-hover:cursor-pointer"
  alt=""
>
  <svg ...>
    <path className="fill-current text-tertiary dark:text-darkTertiary" />
  </svg>
</Link>
```

**How it works:**
- The open/close chevron rotates to 90° when `open` is true; the class also includes a 200ms transition.
- The highlight link icon is hidden on desktop by default (`md:opacity-0`) and fades in on group hover (`md:group-hover:opacity-100`) with a 200ms transition.
- These are small UI affordances, not full-page animations.

---

## 5) Tailwind `enter` keyframes (defined but unused)
**File:** `nelson.co/tailwind.config.js`

```js
animation: {
  enter: "enter 1s ease-out",
},
keyframes: {
  enter: {
    "0%": {
      opacity: "0",
      transform: "translateY(-4px)",
    },
    "100%": {
      opacity: "1",
      transform: "translateY(0)",
    },
  },
},
```

**How it works:**
- This defines a reusable CSS animation named `enter` that would fade in and slide up a bit over 1s.
- It is not referenced anywhere in the JSX (no `animate-enter`), so it doesn’t run on the site unless added later.

---

## Summary
- There is **no GSAP or Framer Motion** in this repo.
- All animations are either **CSS transitions** (via Tailwind classes) or a **custom canvas loop** driven by `requestAnimationFrame`.
