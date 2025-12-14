import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import './Header.css'

gsap.registerPlugin(ScrollToPlugin)

export default function Header() {
  const handleNavClick = (id) => (event) => {
    event.preventDefault()
    const target = id === 'home' ? 0 : `#${id}`
    gsap.to(window, {
      duration: 0.8,
      ease: 'power2.out',
      scrollTo: { y: target, offsetY: 0 },
    })
  }

  return (
    <header className="header">
      <nav className="nav-links">
      <a href="#home" className="nav-link" onClick={handleNavClick('home')}>home</a>
      <a href="#projects" className="nav-link" onClick={handleNavClick('projects')}>projects</a>
      <a href="#about" className="nav-link" onClick={handleNavClick('about')}>about me</a>
      </nav>

      <div className="logo">
        <span className="logo-j">J</span>
        <span className="logo-text">o</span>
        <span className="logo-text logo-n">n</span>
        <span className="logo-dot">.</span>
        <span className="logo-r">R</span>
        <span className="logo-text">am</span>
      </div>

      <a href="#contact" className="contact-button" onClick={handleNavClick('contact')}>
        contact me
      </a>
    </header>
  )
}
