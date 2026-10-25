import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Convertly — Unit Conversion',
    short_name: 'Convertly',
    description: 'Precise unit conversion with exact SI definitions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#edf1f7',
    theme_color: '#3d5afe',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
