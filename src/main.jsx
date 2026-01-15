import { StrictMode, Suspense, lazy, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'

const App = lazy(() => import('./App.jsx'))
const GuardianAppDetail = lazy(() => import('./pages/GuardianAppDetail'))
const WanderAppDetail = lazy(() => import('./pages/WanderAppDetail'))
const SynechronCubeDetail = lazy(() => import('./pages/SynechronCubeDetail'))

if (import.meta.env.DEV) {
  document.documentElement.classList.add('show-leva')
}

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const { hash } = location
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    const targetId = hash.replace('#', '')
    if (!targetId) return

    let cancelled = false
    let attempts = 0
    const prefersReducedMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false

    const tryScroll = () => {
      if (cancelled) return
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        })
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToHash />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/project/guardian-app" element={<GuardianAppDetail />} />
          <Route path="/project/wander-app" element={<WanderAppDetail />} />
          <Route path="/project/synechron-cube" element={<SynechronCubeDetail />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
