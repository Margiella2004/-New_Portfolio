import * as THREE from 'three'

export function prepareTexture(texture) {
  texture.colorSpace = THREE.SRGBColorSpace
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = false
  return texture
}

export function disposeTexture(texture) {
  if (!texture || texture.userData.__disposed) return
  texture.dispose()
  texture.userData.__disposed = true
}

export function createFallbackTexture(index) {
  const size = 32
  const data = new Uint8Array(size * size * 4)
  const rBase = (index * 47) % 255
  const gBase = (index * 91) % 255
  const bBase = (index * 137) % 255

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const pixelIndex = (y * size + x) * 4
      data[pixelIndex] = Math.min(255, rBase + (x * 4))
      data[pixelIndex + 1] = Math.min(255, gBase + (y * 4))
      data[pixelIndex + 2] = Math.min(255, bBase + ((x + y) * 2))
      data[pixelIndex + 3] = 255
    }
  }

  const texture = prepareTexture(new THREE.DataTexture(data, size, size, THREE.RGBAFormat))
  texture.needsUpdate = true
  return texture
}

export function extractPreviewSources(textures, fallbackSources) {
  return textures.map((texture, index) => {
    const source = texture?.source?.data
    if (source?.currentSrc) return source.currentSrc
    if (source?.src) return source.src
    return fallbackSources[index]
  })
}
