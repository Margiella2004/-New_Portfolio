import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { button, useControls } from 'leva'
import './HeroTextOverlay.css'

gsap.registerPlugin(useGSAP)

export default function HeroTextOverlay({
  opacity = 1,
  startDelay = 0,
  autoplayOverride,
  levaStore,
}) {
  const containerRef = useRef(null)
  const phraseRef = useRef(null)
  const timelineRef = useRef(null)

  const { fontSize, xOffset, yOffset, textColor, autoplay } = useControls(
    'Hero Text Animation',
    {
      play: button(() => timelineRef.current?.restart()),
      autoplay: { value: true, label: 'autoplay on mount' },
      fontSize: { value: 28, min: 16, max: 72, step: 1, label: 'text size' },
      xOffset: { value: 0, min: -300, max: 300, step: 1, label: 'offset X' },
      yOffset: { value: 0, min: -200, max: 200, step: 1, label: 'offset Y' },
      textColor: { value: '#ffffff', label: 'left text' },
    },
    { collapsed: false },
    { store: levaStore }
  )

  const shouldAutoplay =
    typeof autoplayOverride === 'boolean' ? autoplayOverride : autoplay

  useGSAP(
    () => {
      if (!phraseRef.current) return undefined
      gsap.set(phraseRef.current, { opacity: 0, yPercent: 18 })
      const tl = gsap.timeline({ paused: true })
      timelineRef.current = tl
      tl.to(phraseRef.current, {
        opacity: 1,
        yPercent: 0,
        duration: 0.9,
        ease: 'power2.inOut',
      })

      let delayedPlay = null
      if (shouldAutoplay) {
        delayedPlay = gsap.delayedCall(startDelay, () => tl.restart())
      }

      return () => {
        delayedPlay?.kill()
      }
    },
    { scope: containerRef, dependencies: [shouldAutoplay, startDelay] }
  )

  const sharedTextStyle = {
    fontSize: `${fontSize}px`,
    lineHeight: 1.2,
    fontFamily: "'Pangea Afrikan VAR 2.003', -apple-system, system-ui, sans-serif",
  }

  return (
    <div
      ref={containerRef}
      className="hero-text-overlay"
      style={{ opacity, transform: `translate(${xOffset}px, ${yOffset}px)` }}
    >
      <div className="hto-inner">
        <div
          ref={phraseRef}
          className="hto-phrase"
          style={{ ...sharedTextStyle, color: textColor }}
        >
          <span className="hto-phrase-base">Design is to be a</span>
          <span className="hto-phrase-em">Time Traveler</span>
        </div>
      </div>
    </div>
  )
}
