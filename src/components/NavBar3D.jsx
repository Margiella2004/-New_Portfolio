import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

function NavBar3D({
  activeNav,
  onActiveNavChange,
  items = ['Home', 'Shop', 'About'],
  className = 'navbar-3d',
  indicatorClassName = 'navbar-3d-indicator',
  itemClassName = 'navbar-3d-item',
}) {
  const indicatorRef = useRef(null)
  const itemRefs = useRef({})
  const hasInitializedRef = useRef(false)

  const moveIndicator = useCallback((animate) => {
    const activeNode = itemRefs.current[activeNav]
    const indicatorNode = indicatorRef.current
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
  }, [activeNav])

  useLayoutEffect(() => {
    moveIndicator(hasInitializedRef.current)
    hasInitializedRef.current = true
  }, [moveIndicator])

  useEffect(() => {
    const onResize = () => moveIndicator(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [moveIndicator])

  return (
    <nav className={className}>
      <span ref={indicatorRef} className={indicatorClassName} aria-hidden="true" />
      {items.map((item) => (
        <button
          key={item}
          type="button"
          ref={(node) => {
            if (node) itemRefs.current[item] = node
          }}
          className={`${itemClassName} ${activeNav === item ? 'active' : ''}`}
          onClick={() => onActiveNavChange(item)}
        >
          {item}
        </button>
      ))}
    </nav>
  )
}

export default NavBar3D
