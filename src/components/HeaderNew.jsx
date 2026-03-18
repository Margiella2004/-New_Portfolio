import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import logoMark from '../../img_assets/logo.svg'
import './HeaderNew.css'

const PRIMARY_NAV_ITEMS = ['Home', 'Projects', 'About']

export default function HeaderNew({ innerRef, activeSection, blendActive, hidden = false }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [activePrimaryNav, setActivePrimaryNav] = useState('Home')

  const primaryIndicatorRef = useRef(null)
  const primaryItemRefs = useRef({})
  const primaryInitializedRef = useRef(false)

  useLayoutEffect(() => {
    if (location.pathname === '/about') {
      setActivePrimaryNav('About')
      return
    }

    if (
      location.pathname.startsWith('/project/') ||
      location.pathname === '/projects' ||
      location.hash === '#projects' ||
      activeSection === 'projects'
    ) {
      setActivePrimaryNav('Projects')
      return
    }

    setActivePrimaryNav('Home')
  }, [activeSection, location.hash, location.pathname])

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

    if (sectionId === 'projects') {
      navigate({ pathname: '/', hash: '#projects' })
      setActivePrimaryNav(item)
      return
    }

    if (sectionId === 'about') {
      navigate('/about')
      setActivePrimaryNav(item)
      return
    }

    navigate('/')
    setActivePrimaryNav(item)
  }

  const handleLogoClick = (event) => {
    event?.preventDefault()
    navigate('/')
    setActivePrimaryNav('Home')
  }

  return (
    <header
      ref={innerRef}
      className={`header-new${blendActive ? ' header-new--blend' : ''}`}
      style={hidden ? { opacity: 0, pointerEvents: 'none' } : undefined}
    >
      <a href="/" className="header-new-brand" onClick={handleLogoClick} aria-label="Go to home">
        <img src={logoMark} alt="" className="header-new-brand-icon" aria-hidden="true" />
        <span className="header-new-brand-name">jon.ram</span>
      </a>

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
