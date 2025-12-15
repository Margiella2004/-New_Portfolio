import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './MakeCodeLiveSection.css'

gsap.registerPlugin(ScrollTrigger)

const arrowPath = "M28.1456 36.8544C28.6175 37.3263 29.3825 37.3263 29.8544 36.8544L37.5442 29.1646C38.0161 28.6928 38.0161 27.9277 37.5442 27.4558C37.0723 26.9839 36.3072 26.9839 35.8354 27.4558L29 34.2912L22.1646 27.4558C21.6928 26.9839 20.9277 26.9839 20.4558 27.4558C19.9839 27.9277 19.9839 28.6928 20.4558 29.1646L28.1456 36.8544ZM0 15.1562V16.3646H26V15.1562V13.9479H0V15.1562ZM29 18.1563H27.7917V36H29H30.2083V18.1563H29ZM26 15.1562V16.3646C26.9895 16.3646 27.7917 17.1667 27.7917 18.1563H29H30.2083C30.2083 15.8321 28.3242 13.9479 26 13.9479V15.1562Z"

export default function MakeCodeLiveSection() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const portraitRef = useRef(null)
  const listsRef = useRef(null)
  const ctaRef = useRef(null)

  console.log('[MakeCodeLiveSection] render start')

  useEffect(() => {
    console.log('[MakeCodeLiveSection] mounted and ready')

    // Set initial state - hidden
    gsap.set([textRef.current, portraitRef.current, listsRef.current, ctaRef.current], {
      opacity: 0
    })

    // Create scroll-linked fade-in animation (directly tied to scroll position)
    const triggers = []

    // Text fade-in linked to scroll - NO scrub delay, instant response
    triggers.push(ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'top top',
      markers: true,
      id: 'about-text-fadein',
      scrub: 0,
      onUpdate: (self) => {
        if (textRef.current) textRef.current.style.opacity = self.progress
      }
    }))

    // Portrait fade-in linked to scroll
    triggers.push(ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'top top',
      markers: true,
      id: 'about-portrait-fadein',
      scrub: 0,
      onUpdate: (self) => {
        const delayedProgress = Math.max(0, (self.progress - 0.2) / 0.8)
        if (portraitRef.current) portraitRef.current.style.opacity = delayedProgress
      }
    }))

    // Lists fade-in linked to scroll
    triggers.push(ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'top top',
      markers: true,
      id: 'about-lists-fadein',
      scrub: 0,
      onUpdate: (self) => {
        const delayedProgress = Math.max(0, (self.progress - 0.4) / 0.6)
        if (listsRef.current) listsRef.current.style.opacity = delayedProgress
      }
    }))

    // CTA fade-in linked to scroll
    triggers.push(ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'top top',
      markers: true,
      id: 'about-cta-fadein',
      scrub: 0,
      onUpdate: (self) => {
        const delayedProgress = Math.max(0, (self.progress - 0.6) / 0.4)
        if (ctaRef.current) ctaRef.current.style.opacity = delayedProgress
      }
    }))

    return () => {
      triggers.forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="make-live-section">
      <div className="make-live-inner">
        <div className="make-live-divider" aria-hidden="true" />

        <div className="make-live-hero">
          <div ref={textRef} className="make-live-text">
            <h2>
              Jonathan Ramesh is a Interdisciplinary Designer focusing on UX
              Design and Engineering. Jonathan combines his coding experince and
              design education to create products focused on bringing back human
              centered design
            </h2>
          </div>

          <div ref={portraitRef} className="make-live-portrait">
            <img
              src="/make-code-live-portrait.png"
              alt="Portrait of Jonathan Ramesh"
              className="make-live-portrait-image"
            />
          </div>
        </div>

        <div ref={listsRef} className="make-live-footer">
          <div className="make-live-lists">
            <div className="make-live-list">
              <h3>Companies</h3>
              <div className="make-live-list-items">
                <p>Sensigo (Oct 2025 - Present)</p>
                <p>Synechron (May 2024-2025)</p>
                <p>MedRcm (May 2022- Jun 2022)</p>
              </div>
            </div>

            <div className="make-live-list">
              <h3>Certifications</h3>
              <div className="make-live-list-items">
                <p>AI For UX Research</p>
                <p>Three.js Journey</p>
                <p>Introduction to Web Accesibility</p>
              </div>
            </div>
          </div>

          <a ref={ctaRef} className="make-live-cta" href="#contact" aria-label="Start a project together">
            <span>lets get working</span>
            <svg viewBox="0 0 38 38" className="make-live-cta-icon" aria-hidden="true">
              <path d={arrowPath} fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
