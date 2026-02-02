import { useEffect, useState } from 'react'

const parseColor = (value) => {
  if (!value || value === 'transparent') return null
  const match = value
    .replace(/\s+/g, '')
    .match(/^rgba?\((\d+),(\d+),(\d+)(?:,([0-9.]+))?\)$/i)
  if (!match) return null
  const r = Number(match[1])
  const g = Number(match[2])
  const b = Number(match[3])
  const a = match[4] === undefined ? 1 : Number(match[4])
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b) || Number.isNaN(a)) return null
  return { r, g, b, a }
}

const getEffectiveBackground = (element) => {
  let node = element
  let depth = 0
  while (node && depth < 12) {
    const style = window.getComputedStyle(node)
    const color = parseColor(style.backgroundColor)
    if (color && color.a > 0.05) return color
    node = node.parentElement
    depth += 1
  }
  return { r: 255, g: 255, b: 255, a: 1 }
}

const getLuminance = ({ r, g, b }) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

export default function useHeaderBlend(headerRef) {
  const [blendActive, setBlendActive] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    let rafId = null

    const updateHeaderBlend = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const header = headerRef?.current
        if (!header) return
        const rect = header.getBoundingClientRect()
        const sampleXs = [0.2, 0.5, 0.8].map(
          (t) => Math.min(window.innerWidth - 1, rect.left + rect.width * t)
        )
        const probeY = Math.min(window.innerHeight - 1, rect.bottom + 6)
        let lightCount = 0
        let darkCount = 0

        for (const x of sampleXs) {
          const element = document.elementFromPoint(x, probeY)
          if (!element) continue
          if (element.closest('.header')) continue
          if (element.closest('.hero-section')) {
            darkCount += 1
            continue
          }
          const bgColor = getEffectiveBackground(element)
          const isLight = getLuminance(bgColor) > 0.6
          if (isLight) {
            lightCount += 1
          } else {
            darkCount += 1
          }
        }

        if (lightCount === 0 && darkCount === 0) return
        const shouldBlend = lightCount > darkCount
        setBlendActive((current) => (current === shouldBlend ? current : shouldBlend))
      })
    }

    updateHeaderBlend()
    window.addEventListener('scroll', updateHeaderBlend, { passive: true })
    window.addEventListener('resize', updateHeaderBlend)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', updateHeaderBlend)
      window.removeEventListener('resize', updateHeaderBlend)
    }
  }, [headerRef])

  return blendActive
}
