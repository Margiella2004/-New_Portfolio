# Intro Animation (Removed)

This document captures the intro animation and scroll-lock logic that previously lived in `src/App.jsx`.
The runtime code has been removed so the page loads in its final state immediately.

## What It Did
- Locked page scroll during the intro sequence.
- Animated canvas opacity, intro text opacity, camera FOV, background blur, and bloom threshold.
- Hid the header/hero content until the intro finished.
- Used `sessionStorage` to skip the intro after the first run (unless forced via URL).

## Code (As Removed)
Note: Emoji in console logs were removed to keep this file ASCII-only.

```jsx
const [canvasOpacity, setCanvasOpacity] = useState(0)
const [introTextOpacity, setIntroTextOpacity] = useState(1)
const [animatedFov, setAnimatedFov] = useState(111)
const [animatedBlur, setAnimatedBlur] = useState(8)
const [animatedBloomThreshold, setAnimatedBloomThreshold] = useState(1.13)
const [introComplete, setIntroComplete] = useState(false)
const textFadeStartedRef = useRef(false)

const introTargetsRef = useRef({
  fov: controls.fov,
  blur: controls.backdropBlur,
  bloomThreshold: controls.bloomThreshold,
})

useEffect(() => {
  introTargetsRef.current = {
    fov: controls.fov,
    blur: controls.backdropBlur,
    bloomThreshold: controls.bloomThreshold,
  }
}, [controls.fov, controls.backdropBlur, controls.bloomThreshold])

useEffect(() => {
  const html = document.documentElement
  const body = document.body
  const previousBodyOverflow = body.style.overflow
  const previousHtmlOverflow = html.style.overflow

  const urlParams = new URLSearchParams(window.location.search)
  const forceIntro = urlParams.get('intro') === 'true'

  sessionStorage.removeItem('hasPlayedIntro')
  const hasPlayedIntro =
    !forceIntro && sessionStorage.getItem('hasPlayedIntro') === 'true'

  if (debugEnabled) {
    console.log('Intro Debug:', {
      hasPlayedIntro,
      forceIntro,
      sessionStorage: sessionStorage.getItem('hasPlayedIntro'),
    })
  }

  if (hasPlayedIntro) {
    if (debugEnabled) {
      console.log('Skipping intro - already played')
    }

    setIntroComplete(true)
    setCanvasOpacity(1)
    setIntroTextOpacity(0)
    setAnimatedFov(controls.fov)
    setAnimatedBlur(controls.backdropBlur)
    setAnimatedBloomThreshold(controls.bloomThreshold)

    if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 1, y: 0, pointerEvents: 'auto' })
    }
    if (heroContentRef.current) {
      gsap.set(heroContentRef.current, { opacity: 1, pointerEvents: 'auto' })
    }

    return
  }

  if (debugEnabled) {
    console.log('Playing intro animation')
  }

  body.style.overflow = 'hidden'
  html.style.overflow = 'hidden'

  const animState = { fov: 111, blur: 8, bloomThreshold: 1.13 }

  if (headerRef.current) {
    gsap.set(headerRef.current, { opacity: 0, y: -10, pointerEvents: 'none' })
  }
  if (heroContentRef.current) {
    gsap.set(heroContentRef.current, { opacity: 0, pointerEvents: 'none' })
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    onComplete: () => {
      setIntroComplete(true)
      sessionStorage.setItem('hasPlayedIntro', 'true')
      body.style.overflow = previousBodyOverflow
      html.style.overflow = previousHtmlOverflow
    },
  })

  tl.to({}, { duration: 0.9 }, 0)
    .to(
      {},
      {
        duration: 1.2,
        ease: 'power2.out',
        onUpdate() {
          setCanvasOpacity(this.progress())
        },
      },
      0.9
    )
    .to({}, { duration: 5.3 }, '>')
    .to({}, { duration: 1.5 }, '>')
    .to(
      {},
      {
        duration: 0.8,
        ease: 'power2.inOut',
        onUpdate() {
          textFadeStartedRef.current = true
          setIntroTextOpacity(1 - this.progress())
        },
      },
      '>'
    )
    .to(
      animState,
      {
        fov: introTargetsRef.current.fov,
        duration: 5,
        ease: 'expo.out',
        onUpdate: () => setAnimatedFov(animState.fov),
      },
      '>'
    )
    .to(
      animState,
      {
        blur: introTargetsRef.current.blur,
        duration: 3,
        ease: 'expo.in',
        onUpdate: () => setAnimatedBlur(animState.blur),
      },
      '<'
    )
    .to(
      animState,
      {
        bloomThreshold: introTargetsRef.current.bloomThreshold,
        duration: 5,
        ease: 'power2.inOut',
        onUpdate: () =>
          setAnimatedBloomThreshold(animState.bloomThreshold),
      },
      '<'
    )
    .add(() => {
      if (headerRef.current) {
        gsap.to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          onStart: () => {
            headerRef.current.style.pointerEvents = 'auto'
          },
        })
      }
      if (heroContentRef.current) {
        gsap.to(heroContentRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          onStart: () => {
            heroContentRef.current.style.pointerEvents = 'auto'
          },
        })
      }
    }, '-=1')

  return () => {
    tl.kill()
    body.style.overflow = previousBodyOverflow
    html.style.overflow = previousHtmlOverflow
  }
}, [])
```
