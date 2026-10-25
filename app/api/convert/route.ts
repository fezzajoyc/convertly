import { NextResponse } from 'next/server'
import { CATEGORIES, categoryByUnit, convert, unitIn } from '@/lib/units'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const value = Number(searchParams.get('value') ?? 1)

  if (!from || !to) {
    return NextResponse.json(
      { categories: CATEGORIES.map((c) => ({ key: c.key, label: c.label, units: c.units.map((u) => u.id) })), usage: '?from=cm&to=in&value=165' },
      { headers: { 'access-control-allow-origin': '*' } },
    )
  }
  const cat = categoryByUnit(from)
  if (!cat || !unitIn(cat, to)) return NextResponse.json({ error: 'incompatible units' }, { status: 400 })
  if (!Number.isFinite(value)) return NextResponse.json({ error: 'bad value' }, { status: 400 })
  const f = unitIn(cat, from)!
  const t = unitIn(cat, to)!
  return NextResponse.json(
    { from: { unit: f.symbol, value }, to: { unit: t.symbol, value: convert(value, f, t, cat) }, source: 'exact international definitions' },
    { headers: { 'access-control-allow-origin': '*', 'cache-control': 'public, max-age=86400' } },
  )
}
