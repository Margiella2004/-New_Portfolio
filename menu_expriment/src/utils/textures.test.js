import { describe, expect, it } from 'vitest'
import { createFallbackTexture, extractPreviewSources } from './textures'

describe('texture utilities', () => {
  it('creates a fallback texture that is ready for upload', () => {
    const texture = createFallbackTexture(2)

    expect(texture.image.width).toBe(32)
    expect(texture.image.height).toBe(32)
    expect(texture.version).toBeGreaterThan(0)
  })

  it('extracts preview urls from loaded texture sources with fallback', () => {
    const textures = [
      { source: { data: { currentSrc: 'https://cdn.example.com/a.jpg' } } },
      { source: { data: { src: 'https://cdn.example.com/b.jpg' } } },
      { source: { data: {} } },
    ]

    const previews = extractPreviewSources(textures, [
      'https://fallback/a.jpg',
      'https://fallback/b.jpg',
      'https://fallback/c.jpg',
    ])

    expect(previews).toEqual([
      'https://cdn.example.com/a.jpg',
      'https://cdn.example.com/b.jpg',
      'https://fallback/c.jpg',
    ])
  })
})
