import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import {
  createFallbackTexture,
  disposeTexture,
  extractPreviewSources,
  prepareTexture,
} from '../utils/textures'

export function useSharedTextures(imageUrls) {
  const fallbackTextures = useMemo(
    () => imageUrls.map((_, index) => createFallbackTexture(index)),
    [imageUrls]
  )
  const [textures, setTextures] = useState(fallbackTextures)
  const [previewSources, setPreviewSources] = useState(imageUrls)
  const [previewImagesReady, setPreviewImagesReady] = useState(false)
  const texturesRef = useRef(textures)

  useEffect(() => {
    texturesRef.current = textures
  }, [textures])

  useEffect(() => {
    let cancelled = false
    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin('anonymous')
    let loadedTextures = []

    Promise.all(
      imageUrls.map(
        (url) =>
          new Promise((resolve) => {
            loader.load(
              url,
              (texture) => resolve(prepareTexture(texture)),
              undefined,
              () => resolve(null)
            )
          })
      )
    ).then((loaded) => {
      loadedTextures = loaded.filter(Boolean)
      if (cancelled) {
        loadedTextures.forEach(disposeTexture)
        return
      }

      const resolved = loaded.map((texture, index) => texture ?? fallbackTextures[index])
      const staleFallbacks = fallbackTextures.filter((texture, index) => resolved[index] !== texture)

      staleFallbacks.forEach(disposeTexture)
      setTextures(resolved)
      setPreviewSources(extractPreviewSources(resolved, imageUrls))
      setPreviewImagesReady(true)
    })

    return () => {
      cancelled = true
      loadedTextures.forEach(disposeTexture)
    }
  }, [fallbackTextures, imageUrls])

  useEffect(
    () => () => {
      texturesRef.current.forEach(disposeTexture)
    },
    []
  )

  return {
    textures,
    previewSources,
    previewImagesReady,
  }
}
