import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const sectionRef = useRef(null)
  const topRef = useRef(null)
  const para1Ref = useRef(null)
  const para2Ref = useRef(null)
  const para3Ref = useRef(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const reducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

      const targets = [
        topRef.current,
        para1Ref.current,
        para2Ref.current,
        para3Ref.current,
      ].filter(Boolean)

      const underlines = section.querySelectorAll('.aboutme-underline')
      const dot = section.querySelector('.aboutme-status-dot')
      const statusText = section.querySelector('.aboutme-status-text')
      const heading = section.querySelector('.aboutme-heading')
      const paras = section.querySelectorAll('.aboutme-para')

      if (reducedMotion) {
        const allBgs = [
          section,
          document.querySelector('.projects-animate-content'),
          section.closest('.projects-wrapper'),
          ...document.querySelectorAll(
            '.projects-animate-list, .projects-animate-row, .projects-animate-row-overlay, .projects-animate-list-end'
          ),
        ].filter(Boolean)
        allBgs.forEach((el) => gsap.set(el, { backgroundColor: '#6f3d59' }))
        gsap.set(dot, { backgroundColor: '#e6e6e6' })
        gsap.set(statusText, { color: '#e6e6e6' })
        gsap.set(heading, { color: '#ffffff' })
        gsap.set(paras, { color: '#ffffff' })
        underlines.forEach((el) => {
          el.style.backgroundSize = '100% 2px'
        })
        return
      }

      // ── Scroll-scrubbed background + text color tween ──
      // Animate the projects container + wrapper so the whole page transitions
      const projectsContent = document.querySelector('.projects-animate-content')
      const projectsWrapper = section.closest('.projects-wrapper')

      const colorTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'top 55%',
          scrub: true,
        },
      })

      // Every element with a white background in the projects + about me area
      const allWhiteBgs = [
        section,
        projectsContent,
        projectsWrapper,
        ...document.querySelectorAll(
          '.projects-animate-list, .projects-animate-row, .projects-animate-row-overlay, .projects-animate-list-end'
        ),
      ].filter(Boolean)

      allWhiteBgs.forEach((el) => {
        colorTl.to(el, { backgroundColor: '#6f3d59', ease: 'none' }, 0)
      })
      colorTl.to(dot, { backgroundColor: '#e6e6e6', ease: 'none' }, 0)
      colorTl.to(statusText, { color: '#e6e6e6', ease: 'none' }, 0)
      colorTl.to(heading, { color: '#ffffff', ease: 'none' }, 0)
      colorTl.to(paras, { color: '#ffffff', ease: 'none' }, 0)

      // ── Entrance animation (projects-style) ──
      gsap.set(targets, {
        opacity: 0,
        y: -4,
        filter: 'blur(3px)',
      })

      gsap.set(underlines, {
        backgroundSize: '0% 2px',
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          toggleActions: 'play none none none',
          once: true,
        },
      })

      // Stagger entrance
      tl.to(targets, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.5,
        ease: 'power2.inOut',
        stagger: 0.12,
      })

      // Draw underlines after entrance
      tl.to(
        underlines,
        {
          backgroundSize: '100% 2px',
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '>-0.15'
      )
    },
    { scope: sectionRef }
  )

  return (
    <div ref={sectionRef} className="module-content module-footer">
      <div className="footer-inner aboutme-inner">
        {/* Status & Heading */}
        <div ref={topRef} className="aboutme-top">
          <div className="aboutme-status">
            <span className="aboutme-status-dot" />
            <span className="aboutme-status-text">Looking for work</span>
          </div>
          <h2 className="aboutme-heading">About Me</h2>
        </div>

        {/* Bio Paragraphs */}
        <div className="aboutme-bio">
          <p ref={para1Ref} className="aboutme-para aboutme-para--large">
            Hi, I&rsquo;m a{' '}
            <span className="aboutme-italic aboutme-underline">Ux &amp; 3d Designer</span>{' '}
            who merges coding with design to create better products, prioritizing{' '}
            <span className="aboutme-italic aboutme-underline">User-Centric Design</span>{' '}
            above all.
          </p>

          <p ref={para2Ref} className="aboutme-para aboutme-para--medium">
            I am currently a design engineer at{' '}
            <span className="aboutme-italic aboutme-underline">Sensigo</span>{' '}
            where I work with AI And Product Design aswell.
          </p>

          <p ref={para3Ref} className="aboutme-para aboutme-para--medium">
            My{' '}
            <span className="aboutme-italic aboutme-underline">art</span>{' '}
            and{' '}
            <span className="aboutme-italic aboutme-underline">engineering</span>{' '}
            background boosts my critical thinking, enabling a logical and abstract approach to product development.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
