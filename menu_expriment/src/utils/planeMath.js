import * as THREE from 'three'

export function wrapToRange(value, min, max) {
  const range = max - min
  if (range <= 0) return value
  return ((((value - min) % range) + range) % range) + min
}

export function randomFromIndex(index, seed) {
  const x = Math.sin(((index + 1) * 127.1) + (seed * 311.7)) * 43758.5453123
  return x - Math.floor(x)
}

export function getMeshDimensions(index, geometry) {
  const baseWidth = geometry.width * geometry.widthBias
  const baseHeight = geometry.height

  if (!geometry.varySizes) {
    return { width: baseWidth, height: baseHeight }
  }

  const widthNoise = (randomFromIndex(index, geometry.variationSeed) * 2) - 1
  const heightNoise = (randomFromIndex(index, geometry.variationSeed + 97.31) * 2) - 1

  const widthScale = THREE.MathUtils.clamp(1 + (widthNoise * geometry.widthVariation), 0.45, 2.5)
  const heightScale = THREE.MathUtils.clamp(1 + (heightNoise * geometry.heightVariation), 0.45, 2.5)

  return {
    width: Math.max(baseWidth * widthScale, 0.2),
    height: Math.max(baseHeight * heightScale, 0.2),
  }
}

export function computeBendAngle(progress, meshWidth, meshHeight, trig) {
  const width = Math.max(meshWidth, 0.0001)
  const height = Math.max(meshHeight, 0.0001)
  const halfDiagonal = 0.5 * Math.hypot(width, height)
  const radiusMultiplier = Math.max(trig.sphereRadiusMultiplier, 1.0001)
  const radius = Math.max(halfDiagonal * radiusMultiplier, halfDiagonal + 0.0001)

  const y = (progress * trig.progressMultiplier) - trig.sphereCenterY
  const maxOffset = Math.max(radius - 0.0001, 0.0001)
  const clampedY = THREE.MathUtils.clamp(y, -maxOffset, maxOffset)
  const denom = Math.sqrt(Math.max((radius * radius) - (clampedY * clampedY), 0.0001))
  const baseSlope = clampedY / denom
  const slope = baseSlope * trig.bendStrength

  return Math.atan(slope)
}
