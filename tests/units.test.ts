import { describe, expect, it } from 'vitest'
import { CATEGORIES, categoryByUnit, convert, unitIn } from '@/lib/units'

describe('conversion math (exact anchors)', () => {
  it('1 inch = 2.54 cm exactly (international definition)', () => {
    const cat = categoryByUnit('in')!
    expect(convert(1, unitIn(cat, 'in')!, unitIn(cat, 'cm')!, cat)).toBe(2.54)
  })

  it('1 kg = 2.2046226218 lbs (exact factor)', () => {
    const cat = categoryByUnit('kg')!
    expect(convert(1, unitIn(cat, 'kg')!, unitIn(cat, 'lb')!, cat)).toBeCloseTo(2.2046226218, 9)
  })

  it('-40°C = -40°F (crossing point)', () => {
    const cat = categoryByUnit('c')!
    expect(convert(-40, unitIn(cat, 'c')!, unitIn(cat, 'f')!, cat)).toBe(-40)
  })

  it('0°C = 32°F, 100°C = 212°F', () => {
    const cat = categoryByUnit('c')!
    expect(convert(0, unitIn(cat, 'c')!, unitIn(cat, 'f')!, cat)).toBe(32)
    expect(convert(100, unitIn(cat, 'c')!, unitIn(cat, 'f')!, cat)).toBe(212)
  })

  it('0 K = -273.15°C', () => {
    const cat = categoryByUnit('k')!
    expect(convert(0, unitIn(cat, 'k')!, unitIn(cat, 'c')!, cat)).toBe(-273.15)
  })

  it('5 km = 3.106856 miles', () => {
    const cat = categoryByUnit('km')!
    expect(convert(5, unitIn(cat, 'km')!, unitIn(cat, 'mi')!, cat)).toBeCloseTo(3.106856, 5)
  })

  it('1 gal (US) = 3.785411784 L', () => {
    const cat = categoryByUnit('gal')!
    expect(convert(1, unitIn(cat, 'gal')!, unitIn(cat, 'l')!, cat)).toBe(3.785411784)
  })
})

describe('structure', () => {
  it('9 categories, unit ids unique within category and dash-safe', () => {
    expect(CATEGORIES.length).toBeGreaterThanOrEqual(9)
    for (const c of CATEGORIES) {
      for (const u of c.units) {
        expect(u.id.includes('-to-'), u.id).toBe(false)
      }
    }
  })
})
