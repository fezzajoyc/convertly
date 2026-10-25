import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CATEGORIES, categoryByKey, convert, fmtConv, unitIn } from '@/lib/units'

export const revalidate = 604800

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ key: c.key }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>
}): Promise<Metadata> {
  const { key } = await params
  const cat = categoryByKey(key)
  if (!cat) return {}
  return {
    title: `${cat.label} Conversion — All Units (${cat.units.map((u) => u.symbol).join(', ')})`,
    description: `Every ${cat.label.toLowerCase()} conversion pair with exact definitions and instant browser math.`,
    alternates: { canonical: `/category/${cat.key}` },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ key: string }>
}) {
  const { key } = await params
  const cat = categoryByKey(key)
  if (!cat) notFound()
  const baseUnit = cat.units[0]
  const pairs = cat.units.filter((u) => u.id !== baseUnit.id)

  return (
    <div>
      <p className="text-[13px] font-semibold uppercase tracking-widest text-brand">
        {cat.label} · base: {cat.base} ({cat.baseSymbol})
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{cat.label} conversions</h1>
      <p className="mt-3 text-[15px] text-ink/65">
        All pairs from the base unit {cat.baseSymbol}. Every row links to a dedicated converter page
        with the full table.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-ink/10 bg-white">
        {pairs.map((u) => {
          const base = unitIn(cat, baseUnit.id)!
          const one = convert(1, base, u, cat)
          return (
            <Link
              key={u.id}
              href={`/convert/${baseUnit.id}-to-${u.id}`}
              className="flex items-baseline justify-between gap-3 border-b border-ink/5 px-4 py-2.5 text-[14px] last:border-0 hover:bg-brand/5"
            >
              <span className="font-medium">1 {cat.base} → {u.name}</span>
              <span className="font-semibold">{fmtConv(one)} {u.symbol}</span>
            </Link>
          )
        })}
      </div>

      <p className="mt-3 text-[12px] text-ink/50">
        Reverse and cross-pair pages (e.g. {pairs[0] ? `${pairs[0].symbol} → ${cat.baseSymbol}` : ''}) are linked from each converter page.
      </p>
    </div>
  )
}
