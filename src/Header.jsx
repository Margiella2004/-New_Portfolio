import { useLayoutEffect, useState } from 'react'
import './Header.css'

export default function Header({ innerRef, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)

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

  const scrollToSection = (id) => {
    const prefersReducedMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false

    if (id === 'home') {
      window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
      return
    }

    const element = document.getElementById(id)
    if (!element) return
    element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
    const fallbackOffset = getHeaderOffset()
    if (fallbackOffset) {
      window.scrollBy({ top: -fallbackOffset, left: 0, behavior: 'auto' })
    }
  }

  const handleNavClick = (id) => (event) => {
    event.preventDefault()
    scrollToSection(id)
    setMenuOpen(false)
  }

  return (
    <>
      <header ref={innerRef} className="header">
        <div className="logo">
          <span className="logo-j">J</span>
          <span className="logo-text">o</span>
          <span className="logo-text logo-n">n</span>
          <span className="logo-dot">.</span>
          <span className="logo-r">R</span>
          <span className="logo-text">am</span>
        </div>

        <nav className="nav-links">
          <a
            href="#home"
            className={`nav-link${activeSection === 'home' ? ' is-active' : ''}`}
            onClick={handleNavClick('home')}
          >
            home
          </a>
          <a
            href="#projects"
            className={`nav-link${activeSection === 'projects' ? ' is-active' : ''}`}
            onClick={handleNavClick('projects')}
          >
            projects
          </a>
          <a
            href="#about"
            className={`nav-link${activeSection === 'about' ? ' is-active' : ''}`}
            onClick={handleNavClick('about')}
          >
            about me
          </a>
        </nav>

        <a href="#contact" className="contact-button desktop-contact" onClick={handleNavClick('contact')}>
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
              href="#home"
              className={`mobile-nav-link${activeSection === 'home' ? ' is-active' : ''}`}
              onClick={handleNavClick('home')}
            >
              home
            </a>
            <a
              href="#projects"
              className={`mobile-nav-link${activeSection === 'projects' ? ' is-active' : ''}`}
              onClick={handleNavClick('projects')}
            >
              projects
            </a>
            <a
              href="#about"
              className={`mobile-nav-link${activeSection === 'about' ? ' is-active' : ''}`}
              onClick={handleNavClick('about')}
            >
              about me
            </a>
            <a
              href="#contact"
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
