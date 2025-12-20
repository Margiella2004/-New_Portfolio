import { useState } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import './Header.css'

gsap.registerPlugin(ScrollToPlugin)

export default function Header({ innerRef, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = (id) => (event) => {
    event.preventDefault()
    const target = id === 'home' ? 0 : `#${id}`
    gsap.to(window, {
      duration: 0.8,
      ease: 'power2.out',
      scrollTo: { y: target, offsetY: 0 },
    })
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
          </nav>
        </div>
      </div>
    </>
  )
}
