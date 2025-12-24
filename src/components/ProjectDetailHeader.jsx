import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Header.css';

export default function ProjectDetailHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (path) => (event) => {
    event.preventDefault();
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <div className="logo" onClick={handleLogoClick} style={{ pointerEvents: 'auto', cursor: 'pointer' }}>
          <span className="logo-j">J</span>
          <span className="logo-text">o</span>
          <span className="logo-text logo-n">n</span>
          <span className="logo-dot">.</span>
          <span className="logo-r">R</span>
          <span className="logo-text">am</span>
        </div>

        <nav className="nav-links">
          <a href="/" className="nav-link" onClick={handleNavClick('/')}>home</a>
          <a href="/#projects" className="nav-link" onClick={handleNavClick('/#projects')}>projects</a>
          <a href="/#about" className="nav-link" onClick={handleNavClick('/#about')}>about me</a>
        </nav>

        <a href="/#contact" className="contact-button desktop-contact" onClick={handleNavClick('/#contact')}>
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
            <a href="/" className="mobile-nav-link" onClick={handleNavClick('/')}>home</a>
            <a href="/#projects" className="mobile-nav-link" onClick={handleNavClick('/#projects')}>projects</a>
            <a href="/#about" className="mobile-nav-link" onClick={handleNavClick('/#about')}>about me</a>
          </nav>
        </div>
      </div>
    </>
  );
}
