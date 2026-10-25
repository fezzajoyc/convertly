import type { MetadataRoute } from 'next'
import { BASE } from '@/lib/site'
import { CATEGORIES } from '@/lib/units'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const urls: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
  ]
  for (const cat of CATEGORIES) {
    urls.push({ url: `${BASE}/category/${cat.key}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 })
    for (const a of cat.units) {
      for (const b of cat.units) {
        if (a.id === b.id) continue
        urls.push({ url: `${BASE}/convert/${a.id}-to-${b.id}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 })
      }
    }
  }
  // 数值页(高频真实值)
  const VALUE_SETS: Array<[string, number[]]> = [
    ['cm-to-inches', [100, 120, 140, 150, 155, 160, 165, 170, 175, 180, 185, 190, 200]],
    ['cm-to-feet', [150, 155, 160, 165, 170, 175, 180, 185, 190, 200]],
    ['kg-to-lbs', [40, 50, 60, 65, 70, 75, 80, 85, 90, 100, 120, 150]],
    ['lbs-to-kg', [100, 120, 130, 140, 150, 160, 180, 200, 220, 250]],
    ['miles-to-km', [1, 5, 10, 26.2, 100]],
    ['km-to-miles', [1, 5, 10, 42.195, 100]],
    ['c-to-f', [-40, 0, 37, 100]],
    ['f-to-c', [-40, 32, 98.6, 212]],
  ]
  for (const [pair, values] of VALUE_SETS) {
    for (const v of values) {
      urls.push({ url: `${BASE}/convert/${v}-${pair}`, lastModified: now, changeFrequency: 'monthly', priority: 0.55 })
    }
  }
  return urls
}
