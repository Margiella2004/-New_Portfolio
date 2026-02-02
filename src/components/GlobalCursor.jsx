import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import plusIcon from '../../img_assets/plus.svg'
import './GlobalCursor.css'

const DEFAULT_LABEL = 'View Projects'

const findCursorTarget = (node) => node?.closest?.('[data-cursor]')

export default function GlobalCursor() {
  const location = useLocation()
  const cursorRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [label, setLabel] = useState(DEFAULT_LABEL)
  const visibilityRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const cursorEl = cursorRef.current
    if (!cursorEl) return undefined

    let rafId = 0
    let lastX = 0
    let lastY = 0

    const update = () => {
      rafId = 0
      cursorEl.style.left = `${lastX}px`
      cursorEl.style.top = `${lastY}px`
    }

    const handleMove = (event) => {
      lastX = event.clientX
      lastY = event.clientY
      if (!visibilityRef.current) {
        visibilityRef.current = true
        setIsVisible(true)
      }
      if (!rafId) rafId = requestAnimationFrame(update)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const handleOver = (event) => {
      const target = findCursorTarget(event.target)
      if (!target || target.dataset.cursor !== 'expand') return
      setLabel(target.dataset.cursorText || DEFAULT_LABEL)
      setIsActive(true)
    }

    const handleOut = (event) => {
      const target = findCursorTarget(event.target)
      if (!target || target.dataset.cursor !== 'expand') return
      const nextTarget = findCursorTarget(event.relatedTarget)
      if (nextTarget === target) return
      setIsActive(false)
    }

    const handleDown = (event) => {
      const target = findCursorTarget(event.target)
      if (!target || target.dataset.cursor !== 'expand') return
      setIsActive(false)
    }

    document.addEventListener('pointerover', handleOver)
    document.addEventListener('pointerout', handleOut)
    document.addEventListener('pointerdown', handleDown)
    return () => {
      document.removeEventListener('pointerover', handleOver)
      document.removeEventListener('pointerout', handleOut)
      document.removeEventListener('pointerdown', handleDown)
    }
  }, [])

  useEffect(() => {
    setIsActive(false)
  }, [location.pathname, location.search, location.hash])

  const className = [
    'app-cursor',
    isVisible ? 'is-visible' : '',
    isActive ? 'is-active' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={cursorRef} className={className} aria-hidden="true">
      <span className="app-cursor-text">
        <span className="app-cursor-label">{label}</span>
        <img src={plusIcon} alt="" className="app-cursor-icon" aria-hidden="true" />
      </span>
    </div>
  )
}
