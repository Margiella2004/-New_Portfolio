import { StrictMode, Suspense, lazy, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import posthog from 'posthog-js'
import './index.css'

const App = lazy(() => import('./App.jsx'))
const GuardianAppDetail = lazy(() => import('./pages/GuardianAppDetail'))
const WanderAppDetail = lazy(() => import('./pages/WanderAppDetail'))
const SynechronCubeDetail = lazy(() => import('./pages/SynechronCubeDetail'))

const posthogKey = import.meta.env.VITE_POSTHOG_KEY
const posthogHost = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com'

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

if (typeof window !== 'undefined' && posthogKey) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    capture_pageview: false,
  })
}

if (import.meta.env.DEV) {
  document.documentElement.classList.add('show-leva')
}

function PosthogPageView() {
  const location = useLocation()

  useEffect(() => {
    if (!posthogKey) return
    posthog.capture('$pageview')
  }, [location.pathname, location.search, location.hash])

  return null
}

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const getHeaderOffset = () => {
      const header = document.querySelector('.header')
      if (!header) return 0
      const rect = header.getBoundingClientRect()
      const extraOffset = 8
      return rect.height + Math.max(rect.top, 0) + extraOffset
    }

    const scrollToElement = (element) => {
      const headerOffset = getHeaderOffset()
      const elementTop = element.getBoundingClientRect().top + window.scrollY
      const targetTop = Math.max(0, elementTop - headerOffset)
      const prefersReducedMotion =
        window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
      window.scrollTo({
        top: targetTop,
        left: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
    }

    const { hash } = location
    if (!hash) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      })
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }, 0)
      return
    }

    const targetId = hash.replace('#', '')
    if (!targetId) return

    let cancelled = false
    let attempts = 0
    const tryScroll = () => {
      if (cancelled) return
      const element = document.getElementById(targetId)
      if (element) {
        scrollToElement(element)
        return
      }

      attempts += 1
      if (attempts < 10) {
        setTimeout(tryScroll, 80)
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    }

    tryScroll()
    return () => {
      cancelled = true
    }
  }, [location])

  return null
}

function RouteLoadingFallback({ onLoadingChange }) {
  useEffect(() => {
    onLoadingChange(true)
    return () => onLoadingChange(false)
  }, [onLoadingChange])

  return null
}

function RouteLoadingOverlay({ active }) {
  return (
    <div
      className={`asset-preload route-preload${active ? ' is-visible' : ''}`}
      aria-hidden={!active}
    >
      <span className="route-preload-text">Loading</span>
    </div>
  )
}

function AppShell() {
  const [routeLoading, setRouteLoading] = useState(false)

  return (
    <BrowserRouter>
      <PosthogPageView />
      <ScrollToHash />
      <RouteLoadingOverlay active={routeLoading} />
      <Suspense fallback={<RouteLoadingFallback onLoadingChange={setRouteLoading} />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/project/guardian-app" element={<GuardianAppDetail />} />
          <Route path="/project/wander-app" element={<WanderAppDetail />} />
          <Route path="/project/synechron-cube" element={<SynechronCubeDetail />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppShell />
  </StrictMode>,
)
