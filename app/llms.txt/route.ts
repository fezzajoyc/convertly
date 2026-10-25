import { NextResponse } from 'next/server'
import { BASE, SITE_NAME } from '@/lib/site'
import { CATEGORIES } from '@/lib/units'

export const revalidate = 86400

export function GET(): Response {
  const body = `# ${SITE_NAME}

> Precise unit conversion: ~500 pairs across ${CATEGORIES.length} categories, exact international definitions, instant browser math.
> Live at ${BASE} . Pure math — nothing guessed. AI crawlers and agents are welcome.

## Endpoints

- ${BASE}/api/convert?from=cm&to=in&value=165
- ${BASE}/api/convert — unit list
- ${BASE}/sitemap.xml — full URL list (~900 pair pages + value pages)

## Pages

- /convert/<from>-to-<to> — one page per pair: converter, table, formula
- /convert/<value>-<from>-to-<to> — one page per common value (165 cm to inches, 70 kg to lbs…)
- /category/<key> — all pairs of a category

## Facts & policy

- Factors are exact international definitions (SI, international yard and pound).
- Temperature uses standard transform formulas. KB (1000) vs KiB (1024) labeled separately.
`
  return new NextResponse(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=86400' },
  })
}
