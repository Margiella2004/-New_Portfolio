import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { button, useControls } from 'leva'
import './HeroTextOverlay.css'

gsap.registerPlugin(useGSAP)

export default function HeroTextOverlay({ opacity = 1 }) {
  const containerRef = useRef(null)
  const leftContainerRef = useRef(null)
  const designerRef = useRef(null)
  const isToBeRef = useRef(null)
  const connectorWrapperRef = useRef(null)
  const inTheRef = useRef(null)
  const aRef = useRef(null)

  const rightContainerRef = useRef(null)
  const presentRef = useRef(null)
  const pastRef = useRef(null)
  const futureRef = useRef(null)
  const timeTravelerRef = useRef(null)

  const timelineRef = useRef(null)

  const { fontSize, xOffset, yOffset, textColor, centerColor, autoplay } = useControls(
    'Hero Text Animation',
    {
      play: button(() => timelineRef.current?.restart()),
      autoplay: { value: true, label: 'autoplay on mount' },
      fontSize: { value: 28, min: 16, max: 72, step: 1, label: 'text size' },
      xOffset: { value: 0, min: -300, max: 300, step: 1, label: 'offset X' },
      yOffset: { value: 0, min: -200, max: 200, step: 1, label: 'offset Y' },
      textColor: { value: '#000000', label: 'left text' },
      centerColor: { value: '#6b7280', label: 'center text' },
    },
    { collapsed: false }
  )

  useGSAP(
    () => {
      timelineRef.current?.kill()
      const tl = gsap.timeline({ paused: true })
      timelineRef.current = tl

      gsap.set(leftContainerRef.current, { x: 65, yPercent: -50 })
      gsap.set(designerRef.current, { opacity: 0 })
      gsap.set([isToBeRef.current, connectorWrapperRef.current], { opacity: 0 })
      gsap.set(aRef.current, { opacity: 0, position: 'absolute', left: 0, top: 0 })

      gsap.set([presentRef.current, pastRef.current, futureRef.current, timeTravelerRef.current], {
        yPercent: 100,
        opacity: 0,
      })

      tl.to(designerRef.current, { opacity: 1, duration: 1.5, ease: 'power2.out' }).to({}, { duration: 0.5 })

      const slideDuration = 1.2
      tl.to(leftContainerRef.current, { x: -48, duration: slideDuration, ease: 'power3.inOut' }, 'slide')
        .to(isToBeRef.current, { opacity: 1, duration: slideDuration * 0.8, ease: 'power2.out' }, 'slide+=0.2')
        .to(connectorWrapperRef.current, { opacity: 1, duration: slideDuration * 0.8, ease: 'power2.out' }, 'slide+=0.3')
        .to(presentRef.current, { yPercent: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }, 'slide+=0.4')

      const flipSpeed = 0.6
      const stayDuration = 0.8

      tl.to(
        presentRef.current,
        { yPercent: -100, opacity: 0, duration: flipSpeed, ease: 'expo.inOut' },
        `+=${stayDuration}`
      ).fromTo(
        pastRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: flipSpeed, ease: 'expo.out' },
        '<0.1'
      )

      tl.to(
        pastRef.current,
        { yPercent: -100, opacity: 0, duration: flipSpeed, ease: 'expo.inOut' },
        `+=${stayDuration}`
      ).fromTo(
        futureRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: flipSpeed, ease: 'expo.out' },
        '<0.1'
      )

      const finalTransitionSpeed = 0.8
      tl.to(
        futureRef.current,
        { yPercent: -100, opacity: 0, duration: flipSpeed, ease: 'expo.inOut' },
        `+=${stayDuration}`
      )
        .to(leftContainerRef.current, { x: -84, duration: finalTransitionSpeed, ease: 'power3.inOut' }, '<')
        .to(inTheRef.current, { opacity: 0, duration: 0.2 }, '<')
        .to(connectorWrapperRef.current, { width: 14, duration: finalTransitionSpeed, ease: 'power3.inOut' }, '<')
        .to(aRef.current, { opacity: 1, duration: 0.2 }, '<0.1')
        .fromTo(
          timeTravelerRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: finalTransitionSpeed, ease: 'expo.out' },
          '<0.1'
        )

      if (autoplay) {
        tl.restart()
      }
    },
    { scope: containerRef, dependencies: [autoplay] }
  )

  useEffect(() => () => timelineRef.current?.kill(), [])

  const sharedTextStyle = {
    fontSize: `${fontSize}px`,
    lineHeight: 1.2,
    fontFamily: '"Instrument Serif", serif',
  }

  return (
    <div
      ref={containerRef}
      className="hero-text-overlay"
      style={{ opacity, transform: `translate(${xOffset}px, ${yOffset}px)` }}
    >
      <div className="hto-inner">
        <div
          ref={leftContainerRef}
          className="hto-left"
          style={{ ...sharedTextStyle, color: textColor }}
        >
          <span ref={designerRef}>Design</span>
          <div ref={isToBeRef} className="hto-inline">
            <span>is</span>
            <span>to</span>
            <span>be</span>
          </div>
          <div ref={connectorWrapperRef} className="hto-connector">
            <div className="hto-inline hto-invisible">
              <span>in</span>
              <span>the</span>
            </div>
            <div ref={inTheRef} className="hto-inline hto-absolute">
              <span>in</span>
              <span>the</span>
            </div>
            <span ref={aRef} className="hto-absolute">
              a
            </span>
          </div>
        </div>

        <div
          ref={rightContainerRef}
          className="hto-right"
          style={{ ...sharedTextStyle, color: '#ffffff', fontStyle: 'italic' }}
        >
          <span style={{ position: 'absolute', overflow: 'hidden', display: 'inline-block', height: `${fontSize * 1.2}px`, lineHeight: 1.2 }}>
            <span ref={presentRef} style={{ display: 'block', fontStyle: 'italic', lineHeight: 1.2 }}>
              Present
            </span>
          </span>
          <span style={{ position: 'absolute', overflow: 'hidden', display: 'inline-block', height: `${fontSize * 1.2}px`, lineHeight: 1.2 }}>
            <span ref={pastRef} style={{ display: 'block', fontStyle: 'italic', lineHeight: 1.2 }}>
              Past
            </span>
          </span>
          <span style={{ position: 'absolute', overflow: 'hidden', display: 'inline-block', height: `${fontSize * 1.2}px`, lineHeight: 1.2 }}>
            <span ref={futureRef} style={{ display: 'block', fontStyle: 'italic', lineHeight: 1.2 }}>
              Future
            </span>
          </span>
          <span style={{ position: 'absolute', overflow: 'hidden', display: 'inline-block', height: `${fontSize * 1.2}px`, lineHeight: 1.2 }}>
            <span ref={timeTravelerRef} style={{ display: 'block', fontStyle: 'italic', lineHeight: 1.2 }}>
              Time Traveler
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
