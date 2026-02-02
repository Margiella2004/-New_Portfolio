import { useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header({ innerRef, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    const updateOffset = () => {
      const header = innerRef?.current || document.querySelector('.header')
      if (!header) return
      const rect = header.getBoundingClientRect()
      const extraOffset = 8
      const offset = rect.height + Math.max(rect.top, 0) + extraOffset
      document.documentElement.style.setProperty('--header-offset', `${offset}px`)
    }

    updateOffset()
    window.addEventListener('resize', updateOffset)
    return () => window.removeEventListener('resize', updateOffset)
  }, [innerRef])

  const getHeaderOffset = () => {
    const header = innerRef?.current || document.querySelector('.header')
    if (!header) return 0
    const rect = header.getBoundingClientRect()
    const extraOffset = 8
    return rect.height + Math.max(rect.top, 0) + extraOffset
  }

  const parseOffsetValue = (value) => {
    if (!value) return 0
    const trimmed = String(value).trim()
    const numeric = parseFloat(trimmed)
    if (Number.isNaN(numeric)) return 0
    if (trimmed.endsWith('rem')) {
      const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      return numeric * rootSize
    }
    if (trimmed.endsWith('vh')) return (numeric / 100) * window.innerHeight
    if (trimmed.endsWith('vw')) return (numeric / 100) * window.innerWidth
    return numeric
  }

  const scrollToSection = (id) => {
    const prefersReducedMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false

    if (id === 'home') {
      window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
      return
    }

    const element = document.getElementById(id)
    if (!element) return
    const headerOffset = getHeaderOffset()
    const extraOffset = parseOffsetValue(element.dataset.scrollOffset)
    const elementTop = element.getBoundingClientRect().top + window.scrollY
    const targetTop = Math.max(0, elementTop - headerOffset + extraOffset)
    window.scrollTo({ top: targetTop, left: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  const handleNavClick = (id) => (event) => {
    event.preventDefault()
    navigate(id === 'home' ? '/' : `/#${id}`)
    scrollToSection(id)
    setMenuOpen(false)
  }

  const handleLogoClick = () => {
    navigate('/')
    scrollToSection('home')
    setMenuOpen(false)
  }

  const handleLogoKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleLogoClick()
    }
  }

  return (
    <>
      <header ref={innerRef} className="header">
        <div
          className="logo"
          role="button"
          tabIndex={0}
          aria-label="Go to home"
          onClick={handleLogoClick}
          onKeyDown={handleLogoKeyDown}
        >
          <span className="logo-j">J</span>
          <span className="logo-text">o</span>
          <span className="logo-text logo-n">n</span>
          <span className="logo-dot">.</span>
          <span className="logo-r">R</span>
          <span className="logo-text">am</span>
        </div>

        <nav className="nav-links">
          <a
            href="/"
            className={`nav-link${activeSection === 'home' ? ' is-active' : ''}`}
            onClick={handleNavClick('home')}
          >
            home
          </a>
          <a
            href="/#projects"
            className={`nav-link${activeSection === 'projects' ? ' is-active' : ''}`}
            onClick={handleNavClick('projects')}
          >
            projects
          </a>
        </nav>

        <a
          href="/#contact"
          className="contact-button desktop-contact"
          onClick={handleNavClick('contact')}
        >
          contact me
        </a>

        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          menu
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            ✕
          </button>
          <nav className="mobile-nav">
            <a
              href="/"
              className={`mobile-nav-link${activeSection === 'home' ? ' is-active' : ''}`}
              onClick={handleNavClick('home')}
            >
              home
            </a>
            <a
              href="/#projects"
              className={`mobile-nav-link${activeSection === 'projects' ? ' is-active' : ''}`}
              onClick={handleNavClick('projects')}
            >
              projects
            </a>
            <a
              href="/#contact"
              className={`mobile-nav-link${activeSection === 'contact' ? ' is-active' : ''}`}
              onClick={handleNavClick('contact')}
            >
              contact me
            </a>
          </nav>
        </div>
      </div>
    </>
  )
}
