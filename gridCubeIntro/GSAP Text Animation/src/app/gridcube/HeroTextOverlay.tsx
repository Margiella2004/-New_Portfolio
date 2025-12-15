import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { button, useControls } from 'leva'

gsap.registerPlugin(useGSAP)

export default function HeroTextOverlay() {
  const containerRef = useRef<HTMLDivElement>(null)

  const leftContainerRef = useRef<HTMLDivElement>(null)
  const designerRef = useRef<HTMLSpanElement>(null)
  const isToBeRef = useRef<HTMLDivElement>(null)
  const connectorWrapperRef = useRef<HTMLDivElement>(null)
  const inTheRef = useRef<HTMLDivElement>(null)
  const aRef = useRef<HTMLSpanElement>(null)

  const rightContainerRef = useRef<HTMLDivElement>(null)
  const presentRef = useRef<HTMLSpanElement>(null)
  const pastRef = useRef<HTMLSpanElement>(null)
  const futureRef = useRef<HTMLSpanElement>(null)
  const timeTravelerRef = useRef<HTMLSpanElement>(null)

  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const { fontSize, xOffset, yOffset, textColor, centerColor, autoplay } = useControls(
    'Intro Text',
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

  useEffect(() => {
    console.log('[Leva] Intro Text controls', {
      fontSize,
      xOffset,
      yOffset,
      textColor,
      centerColor,
      autoplay,
    })
  }, [fontSize, xOffset, yOffset, textColor, centerColor, autoplay])

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

      tl.to(pastRef.current, { yPercent: -100, opacity: 0, duration: flipSpeed, ease: 'expo.inOut' }, `+=${stayDuration}`).fromTo(
        futureRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: flipSpeed, ease: 'expo.out' },
        '<0.1'
      )

      const finalTransitionSpeed = 0.8
      tl.to(futureRef.current, { yPercent: -100, opacity: 0, duration: flipSpeed, ease: 'expo.inOut' }, `+=${stayDuration}`)
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

  useEffect(() => {
    return () => {
      timelineRef.current?.kill()
    }
  }, [])

  const sharedTextStyle = {
    fontSize: `${fontSize}px`,
    lineHeight: 1.2,
    fontFamily: '"Instrument Serif", serif',
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full pointer-events-none"
      style={{ transform: `translate(${xOffset}px, ${yOffset}px)` }}
    >
      <div className="relative z-10 w-full h-full">
        <div
          ref={leftContainerRef}
          className="absolute right-1/2 top-1/2 flex items-center justify-end gap-[0.18em] tracking-tight whitespace-nowrap will-change-transform"
          style={{ ...sharedTextStyle, color: textColor }}
        >
          <span ref={designerRef}>Design</span>
          <div ref={isToBeRef} className="flex items-center gap-[0.18em]">
            <span>is</span>
            <span>to</span>
            <span>be</span>
          </div>
          <div ref={connectorWrapperRef} className="relative h-[1.2em] overflow-hidden flex items-center justify-start">
            <div className="invisible flex items-center gap-[0.18em]">
              <span>in</span>
              <span>the</span>
            </div>
            <div ref={inTheRef} className="absolute left-0 top-0 flex items-center gap-[0.18em] whitespace-nowrap">
              <span>in</span>
              <span>the</span>
            </div>
            <span ref={aRef} className="absolute left-0 top-0 opacity-0">
              a
            </span>
          </div>
        </div>

        <div
          ref={rightContainerRef}
          className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 tracking-tight whitespace-nowrap z-20 flex items-center justify-center"
          style={{ ...sharedTextStyle, color: centerColor, fontStyle: 'italic' }}
        >
          <span className="absolute overflow-hidden inline-block">
            <span ref={presentRef} className="block italic">
              Present
            </span>
          </span>
          <span className="absolute overflow-hidden inline-block">
            <span ref={pastRef} className="block italic">
              Past
            </span>
          </span>
          <span className="absolute overflow-hidden inline-block">
            <span ref={futureRef} className="block italic">
              Future
            </span>
          </span>
          <span className="absolute overflow-hidden inline-block">
            <span ref={timeTravelerRef} className="block tracking-tight italic">
              Time Traveler
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
