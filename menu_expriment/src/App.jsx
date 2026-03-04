import { Suspense, lazy } from 'react'
import AppContent from './AppContent'
import { CONTROL_DEFAULTS } from './config/controlDefaults'

function App() {
  if (import.meta.env.DEV) {
    const DevControlsApp = lazy(() => import('./debug/DevControlsApp'))
    return (
      <Suspense fallback={<AppContent controls={CONTROL_DEFAULTS} />}>
        <DevControlsApp />
      </Suspense>
    )
  }

  return <AppContent controls={CONTROL_DEFAULTS} />
}

export default App
