import { describe, expect, it } from 'vitest'
import { computeBendAngle, getMeshDimensions, wrapToRange } from './planeMath'

describe('planeMath utilities', () => {
  it('wraps values into the target range', () => {
    expect(wrapToRange(7, -5, 5)).toBe(-3)
    expect(wrapToRange(-6, -5, 5)).toBe(4)
    expect(wrapToRange(1, 0, 0)).toBe(1)
  })

  it('returns base dimensions when variation is disabled', () => {
    const geometry = {
      width: 4,
      height: 2,
      widthBias: 1.2,
      varySizes: false,
      widthVariation: 0,
      heightVariation: 0,
      variationSeed: 11,
    }

    expect(getMeshDimensions(0, geometry)).toEqual({ width: 4.8, height: 2 })
  })

  it('computes stable bend values for default trig controls', () => {
    const trig = {
      progressMultiplier: 1,
      sphereRadiusMultiplier: 2,
      sphereCenterY: 0,
      bendStrength: 1,
    }

    const value = computeBendAngle(0.2, 4.35, 2.95, trig)

    expect(Number.isFinite(value)).toBe(true)
    expect(Math.abs(value)).toBeLessThanOrEqual(Math.PI / 2)
  })
})
