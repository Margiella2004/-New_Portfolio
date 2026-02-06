import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoMark from '../../img_assets/logo.svg';
import '../Header.css';
import useHeaderBlend from '../hooks/useHeaderBlend';

export default function ProjectDetailHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const blendActive = useHeaderBlend(headerRef);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path) => (event) => {
    event.preventDefault();
    if (typeof window !== 'undefined' && path.startsWith('/')) {
      window.sessionStorage?.setItem('skipIntro', '1');
    }
    if (path.includes('#')) {
      const [, hash] = path.split('#');
      navigate({ pathname: '/', hash: `#${hash}` });
    } else if (location.pathname !== '/') {
      navigate(path);
    } else {
      window.history.replaceState(null, '', '/');
    }
    setMenuOpen(false);
  };

  const handleLogoClick = (event) => {
    event?.preventDefault();
    if (typeof window !== 'undefined') {
      window.sessionStorage?.setItem('skipIntro', '1');
    }
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <>
      <header ref={headerRef} className={`header${blendActive ? ' header--blend' : ''}`}>
        <a href="/" className="brand" onClick={handleLogoClick} aria-label="Go to home">
          <img src={logoMark} alt="" className="brand-icon" aria-hidden="true" />
          <span className="brand-name">jon.ram</span>
        </a>

        <nav className="nav-links">
          <a href="/" className="nav-link" onClick={handleNavClick('/')}>home</a>
          <a href="/#projects" className="nav-link" onClick={handleNavClick('/#projects')}>projects</a>
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
            <a href="/" className="mobile-nav-link" onClick={handleNavClick('/')}>home</a>
            <a href="/#projects" className="mobile-nav-link" onClick={handleNavClick('/#projects')}>projects</a>
          </nav>
        </div>
      </div>
    </>
  );
}
