import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import AppContent from './AppContent'
import { CONTROL_DEFAULTS } from './config/controlDefaults'

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
}))

vi.mock('./hooks/useSharedTextures', () => ({
  useSharedTextures: () => ({
    textures: [{ source: { data: { width: 1200, height: 800, src: 'https://fallback/1.jpg' } } }],
    previewSources: [
      'https://fallback/1.jpg',
      'https://fallback/2.jpg',
      'https://fallback/3.jpg',
      'https://fallback/4.jpg',
    ],
    previewImagesReady: true,
  }),
}))

vi.mock('./components/CameraController', () => ({
  default: () => <div data-testid="camera-controller" />,
}))

vi.mock('./components/GradientPlanes', () => ({
  default: ({ onActiveIndexChange, onToggleChange }) => (
    <div>
      <button type="button" onClick={() => onActiveIndexChange(2)}>activate-third</button>
      <button type="button" onClick={() => onToggleChange(1)}>expand</button>
      <button type="button" onClick={() => onToggleChange(null)}>collapse</button>
    </div>
  ),
}))

vi.mock('./components/EditorialOverlay', () => ({
  default: ({ activeProject, isExpanded }) => (
    <div data-testid="overlay" data-expanded={String(isExpanded)}>
      {activeProject?.title}
    </div>
  ),
}))

describe('AppContent', () => {
  it('updates active project and expansion state from scene callbacks', () => {
    render(<AppContent controls={CONTROL_DEFAULTS} />)

    const overlay = screen.getByTestId('overlay')
    expect(overlay).toHaveTextContent('Synechron Cube')
    expect(overlay).toHaveAttribute('data-expanded', 'false')

    fireEvent.click(screen.getByRole('button', { name: 'activate-third' }))
    expect(overlay).toHaveTextContent('Atlas Draft')

    fireEvent.click(screen.getByRole('button', { name: 'expand' }))
    expect(overlay).toHaveAttribute('data-expanded', 'true')

    fireEvent.click(screen.getByRole('button', { name: 'collapse' }))
    expect(overlay).toHaveAttribute('data-expanded', 'false')
  })
})
