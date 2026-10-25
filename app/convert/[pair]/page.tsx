import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import AdSlot from '@/components/AdSlot'
import Converter from '@/components/Converter'
import { jsonLdScript, breadcrumbLd } from '@/lib/jsonld'
import { BASE } from '@/lib/site'
import { CATEGORIES, categoryByKey, categoryByUnit, convert, fmtConv, unitIn } from '@/lib/units'

/** 单位对页 + 数值页双模式(路由级区分):
 *    /convert/cm-to-inches        → 单位对页
 *    /convert/165-cm-to-inches    → 数值页(高频真实值,如身高/体重)
 *  全部换算为精确国际定义,互链反向对与邻近值。 */

export const revalidate = 604800
export const dynamicParams = true

const VALUE_SETS: Record<string, number[]> = {
  'cm-to-inches': [100, 120, 140, 150, 155, 160, 165, 170, 175, 180, 185, 190, 200],
  'inches-to-cm': [6, 12, 24, 32, 40, 48, 60],
  'cm-to-feet': [150, 155, 160, 165, 170, 175, 180, 185, 190, 200],
  'feet-to-cm': [4, 5, 6, 7],
  'kg-to-lbs': [40, 50, 60, 65, 70, 75, 80, 85, 90, 100, 120, 150],
  'lbs-to-kg': [100, 120, 130, 140, 150, 160, 180, 200, 220, 250],
  'kg-to-stone': [50, 60, 70, 80, 90, 100, 120],
  'stone-to-kg': [8, 10, 12, 14, 16, 18, 20],
  'miles-to-km': [1, 5, 10, 15, 20, 26.2, 30, 50, 100],
  'km-to-miles': [1, 5, 10, 21.0975, 42.195, 100],
  'c-to-f': [-40, -20, 0, 10, 20, 25, 30, 37, 40, 100],
  'f-to-c': [-40, 0, 32, 50, 68, 72, 77, 98.6, 104, 212],
  'kmh-to-mph': [30, 50, 60, 80, 100, 120, 130],
  'mph-to-kmh': [25, 55, 65, 70, 100],
  'kg-to-oz': [1, 2, 5],
  'oz-to-g': [1, 8, 16],
  'gal-to-l': [1, 5, 10],
  'l-to-gal': [1, 2, 5, 10],
  'mb-to-gb': [100, 500, 1000],
  'gb-to-mb': [1, 16, 64, 128, 256, 512],
}

interface Parsed {
  catKey: string
  fromId: string
  toId: string
  value: number | null
}

function parsePair(pair: string): Parsed | null {
  const m = pair.match(/^(?:(\d+(?:\.\d+)?)-)?([a-z0-9]+)-to-([a-z0-9]+)$/)
  if (!m) return null
  const value = m[1] ? Number(m[1]) : null
  const cat = categoryByUnit(m[2])
  if (!cat) return null
  const from = unitIn(cat, m[2])
  const to = unitIn(cat, m[3])
  if (!from || !to) return null
  return { catKey: cat.key, fromId: m[2], toId: m[3], value }
}

export function generateStaticParams() {
  const out: Array<{ pair: string }> = []
  for (const cat of CATEGORIES) {
    if (cat.transform) {
      for (const a of cat.units) for (const b of cat.units) if (a.id !== b.id) out.push({ pair: `${a.id}-to-${b.id}` })
      continue
    }
    for (const a of cat.units) for (const b of cat.units) if (a.id !== b.id) out.push({ pair: `${a.id}-to-${b.id}` })
  }
  for (const [pair, values] of Object.entries(VALUE_SETS)) {
    for (const v of values) out.push({ pair: `${v}-${pair}` })
  }
  return out
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>
}): Promise<Metadata> {
  const { pair } = await params
  const p = parsePair(pair)
  if (!p) return {}
  const cat = categoryByKey(p.catKey)!
  const from = unitIn(cat, p.fromId)!
  const to = unitIn(cat, p.toId)!
  const valuePart = p.value != null ? `${p.value} ` : ''
  return {
    title: `${valuePart}${from.name} to ${to.name} — Instant Conversion`,
    description: `Convert ${valuePart}${from.symbol} to ${to.symbol}${p.value != null ? ` = ${fmtConv(convert(p.value, from, to, cat))} ${to.symbol}` : ''}. Exact international definitions, instant browser math, full conversion table.`,
    alternates: { canonical: `/convert/${pair}` },
  }
}

export default async function ConvertPage({
  params,
}: {
  params: Promise<{ pair: string }>
}) {
  const { pair } = await params
  const p = parsePair(pair)
  if (!p) notFound()
  const cat = categoryByKey(p.catKey)!
  const from = unitIn(cat, p.fromId)!
  const to = unitIn(cat, p.toId)!
  const value = p.value ?? 1
  const one = convert(1, from, to, cat)
  const result = convert(value, from, to, cat)
  const reverse = `${to.id}-to-${from.id}`
  const reversePair = `/convert/${reverse}`
  const hasReverse = CATEGORIES.some((c) => unitIn(c, to.id) && unitIn(c, from.id))

  const faqLd = jsonLdScript({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How many ${to.name.toLowerCase()} is 1 ${from.name.toLowerCase()}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `1 ${from.symbol} = ${fmtConv(one)} ${to.symbol} (exact international definition).`,
        },
      },
      {
        '@type': 'Question',
        name: `How do you convert ${from.symbol} to ${to.symbol}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: cat.transform
            ? `${from.name} → ${to.name} uses the standard temperature transform formulas, shown with the table on this page.`
            : `Multiply the ${from.symbol} value by ${fmtConv(one)} to get ${to.symbol}.`,
        },
      },
    ],
  })

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />

      <p className="text-[13px] font-semibold uppercase tracking-widest text-brand">
        {cat.label} · exact definitions
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {value != null ? `${value} ${from.name} to ${to.name}` : `${from.name} to ${to.name}`}
      </h1>
      <p className="mt-3 text-[15px] text-ink/65">
        {value != null
          ? `${value} ${from.symbol} equals ${fmtConv(result)} ${to.symbol} — instant math below updates as you type.`
          : `1 ${from.symbol} = ${fmtConv(one)} ${to.symbol}. Type any value — conversion is instant, in your browser.`}
      </p>

      <div className="mt-6">
        <Converter cat={cat} from={from} to={to} initial={value} />
      </div>

      <AdSlot slot="convert-below-widget" />

      <section className="mt-8 rounded-xl border border-ink/10 bg-white p-5">
        <h2 className="text-[15px] font-semibold">Conversion table</h2>
        <div className="mt-3 grid gap-1.5 text-[13.5px] sm:grid-cols-2">
          {(from.common.length > 1 ? from.common : to.common).slice(0, 10).map((v) => (
            <div key={v} className="flex items-baseline justify-between gap-3 border-b border-ink/5 py-1">
              <span className="text-ink/60">{fmtConv(v)} {from.symbol}</span>
              <span className="font-semibold">{fmtConv(convert(v, from, to, cat))} {to.symbol}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] text-ink/50">
          Formula: {cat.transform ? 'standard temperature transforms (°C ↔ °F ↔ K).' : `multiply ${from.symbol} by ${fmtConv(one)}.`} Exact international definitions.
        </p>
      </section>

      {hasReverse ? (
        <nav className="mt-8 flex flex-wrap gap-3 text-[14px]">
          <Link href={reversePair} className="rounded-lg bg-ink px-4 py-2 font-semibold text-white hover:bg-ink/85">
            ← Reverse: {to.name} to {from.name}
          </Link>
          <Link href={`/category/${cat.key}`} className="rounded-lg border border-ink/15 px-4 py-2 font-semibold hover:border-ink/40">
            All {cat.label.toLowerCase()} conversions
          </Link>
        </nav>
      ) : null}
    </div>
  )
}
