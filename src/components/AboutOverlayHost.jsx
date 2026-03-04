import { useCallback, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import '../Footer.css'
import './AboutOverlayHost.css'

function removeHash(navigate, location) {
  navigate(
    {
      pathname: location.pathname,
      search: location.search,
    },
    { replace: true }
  )
}

export default function AboutOverlayHost() {
  const location = useLocation()
  const navigate = useNavigate()
  const isOpen = location.hash === '#about'
  const hostRef = useRef(null)
  const backdropRef = useRef(null)
  const containerRef = useRef(null)

  const handleClose = useCallback(() => {
    removeHash(navigate, location)
  }, [location, navigate])

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return undefined

    const body = document.body
    const html = document.documentElement
    const previousBodyOverflow = body.style.overflow
    const previousHtmlOverflow = html.style.overflow
    body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'

    return () => {
      body.style.overflow = previousBodyOverflow
      html.style.overflow = previousHtmlOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClose, isOpen])

  useGSAP(
    () => {
      const host = hostRef.current
      if (!host) return

      const paras = host.querySelectorAll('.aboutme-para')
      const underlines = host.querySelectorAll('.aboutme-underline')

      gsap.set(paras, { opacity: 0, y: -4, filter: 'blur(3px)' })
      gsap.set(underlines, { backgroundSize: '0% 2px' })

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.to(
        paras,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.5,
          ease: 'power2.inOut',
          stagger: 0.12,
        },
        0.58
      )
      tl.to(
        underlines,
        {
          backgroundSize: '100% 2px',
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
        },
        '>-0.12'
      )
    },
    { scope: hostRef, dependencies: [isOpen] }
  )

  if (!isOpen) return null

  return (
    <div
      ref={hostRef}
      className="about-overlay-host"
      role="dialog"
      aria-modal="true"
      aria-label="About"
    >
      <button
        ref={backdropRef}
        type="button"
        className="about-overlay-backdrop"
        aria-label="Close about"
        onClick={handleClose}
      />
      <section ref={containerRef} className="about-overlay-container">
        <div className="module-footer about-overlay-original">
          <div className="footer-inner aboutme-inner">
            <div className="aboutme-bio">
              <p className="aboutme-para aboutme-para--large">
                Hi, I&rsquo;m a{' '}
                <span className="aboutme-italic aboutme-underline">Ux &amp; 3d Designer</span>{' '}
                who merges coding with design to create better products, prioritizing{' '}
                <span className="aboutme-italic aboutme-underline">User-Centric Design</span>{' '}
                above all.
              </p>

              <p className="aboutme-para aboutme-para--medium">
                I am currently a design engineer at{' '}
                <span className="aboutme-italic aboutme-underline">Sensigo</span>{' '}
                where I work with AI And Product Design aswell.
              </p>

              <p className="aboutme-para aboutme-para--medium">
                My{' '}
                <span className="aboutme-italic aboutme-underline">art</span>{' '}
                and{' '}
                <span className="aboutme-italic aboutme-underline">engineering</span>{' '}
                background boosts my critical thinking, enabling a logical and abstract approach
                to product development.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
