import { useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoMark from '../img_assets/logo.svg'
import './Header.css'

export default function Header({ innerRef, activeSection, blendActive }) {
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

  const handleLogoClick = (event) => {
    event?.preventDefault()
    navigate('/')
    scrollToSection('home')
    setMenuOpen(false)
  }

  return (
    <>
      <header ref={innerRef} className={`header${blendActive ? ' header--blend' : ''}`}>
        <a href="/" className="brand" onClick={handleLogoClick} aria-label="Go to home">
          <img src={logoMark} alt="" className="brand-icon" aria-hidden="true" />
          <span className="brand-name">jon.ram</span>
        </a>

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

        <button
          className="menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          menu
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            close
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
          </nav>
        </div>
      </div>
    </>
  )
}
