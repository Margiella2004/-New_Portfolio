import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

const App = lazy(() => import('./App.jsx'))
const GuardianAppDetail = lazy(() => import('./pages/GuardianAppDetail'))
const WanderAppDetail = lazy(() => import('./pages/WanderAppDetail'))
const SynechronCubeDetail = lazy(() => import('./pages/SynechronCubeDetail'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
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
