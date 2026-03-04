import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import logoMark from '../../img_assets/logo.svg'
import './HeaderNew.css'

const PRIMARY_NAV_ITEMS = ['Home', 'Projects', 'About']

export default function HeaderNew({ innerRef, activeSection, blendActive }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [activePrimaryNav, setActivePrimaryNav] = useState('Home')

  const primaryIndicatorRef = useRef(null)
  const primaryItemRefs = useRef({})
  const primaryInitializedRef = useRef(false)

  // Sync primary nav with activeSection prop
  useLayoutEffect(() => {
    if (location.hash === '#about') {
      setActivePrimaryNav('About')
    } else if (location.pathname.startsWith('/project/')) {
      setActivePrimaryNav('Projects')
    } else if (activeSection === 'home') {
      setActivePrimaryNav('Home')
    } else if (activeSection === 'projects') {
      setActivePrimaryNav('Projects')
    } else if (activeSection === 'contact') {
      setActivePrimaryNav('About')
    }
  }, [activeSection, location.hash])

  // Move primary indicator
  const movePrimaryIndicator = useCallback((animate) => {
    const activeNode = primaryItemRefs.current[activePrimaryNav]
    const indicatorNode = primaryIndicatorRef.current
    if (!activeNode || !indicatorNode) return

    const nextState = {
      x: activeNode.offsetLeft,
      y: activeNode.offsetTop,
      width: activeNode.offsetWidth,
      height: activeNode.offsetHeight,
    }

    if (!animate) {
      gsap.set(indicatorNode, nextState)
      return
    }

    gsap.to(indicatorNode, {
      ...nextState,
      duration: 0.42,
      ease: 'power2.inOut',
      overwrite: 'auto',
    })
  }, [activePrimaryNav])

  useLayoutEffect(() => {
    movePrimaryIndicator(primaryInitializedRef.current)
    primaryInitializedRef.current = true
  }, [movePrimaryIndicator])

  useLayoutEffect(() => {
    const onResize = () => {
      movePrimaryIndicator(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [movePrimaryIndicator])

  useLayoutEffect(() => {
    const updateOffset = () => {
      const header = innerRef?.current || document.querySelector('.header-new')
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

  const handlePrimaryNavClick = (item) => {
    const sectionId = item.toLowerCase()

    // Projects tab scrolls to the on-page projects reveal anchor.
    if (sectionId === 'projects') {
      if (location.pathname.startsWith('/project/')) {
        navigate('/projects')
        setActivePrimaryNav(item)
        return
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('projects-tab-clicked'))
      }
      navigate({ pathname: '/', hash: '#projects' })
      setActivePrimaryNav(item)
      return
    }

    // About opens the global about overlay.
    if (sectionId === 'about') {
      navigate({ pathname: location.pathname, hash: '#about' })
      setActivePrimaryNav(item)
      return
    }

    // Home
    navigate('/')
    setActivePrimaryNav(item)
  }

  const handleLogoClick = (event) => {
    event?.preventDefault()
    navigate('/')
    setActivePrimaryNav('Home')
  }

  return (
    <header ref={innerRef} className={`header-new${blendActive ? ' header-new--blend' : ''}`}>
      {/* Brand */}
      <a href="/" className="header-new-brand" onClick={handleLogoClick} aria-label="Go to home">
        <img src={logoMark} alt="" className="header-new-brand-icon" aria-hidden="true" />
        <span className="header-new-brand-name">jon.ram</span>
      </a>

      {/* Primary Pill Navigation */}
      <nav className="header-navbar header-navbar-primary">
        <span ref={primaryIndicatorRef} className="header-navbar-indicator" aria-hidden="true" />
        {PRIMARY_NAV_ITEMS.map((item) => (
          <button
            key={item}
            type="button"
            ref={(node) => {
              if (node) primaryItemRefs.current[item] = node
            }}
            className={`header-navbar-item ${activePrimaryNav === item ? 'active' : ''}`}
            onClick={() => handlePrimaryNavClick(item)}
          >
            {item}
          </button>
        ))}
      </nav>
    </header>
  )
}
