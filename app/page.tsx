import Link from 'next/link'
import type { Metadata } from 'next'
import { CATEGORIES } from '@/lib/units'

export const revalidate = 604800

export const metadata: Metadata = {
  title: 'Unit Conversion — Exact SI Definitions, Instant Browser Math',
  description: '500+ unit conversion pairs across length, weight, temperature, volume, area, speed, time, data, pressure and energy — exact international definitions, instant browser math.',
  alternates: { canonical: '/' },
}

export default function Home() {
  return (
    <div>
      <p className="text-[13px] font-semibold uppercase tracking-widest text-brand">
        {CATEGORIES.length} categories · ~500 pairs · exact SI definitions
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Unit conversion, done precisely</h1>
      <p className="mt-3 text-[15px] text-ink/65">
        Every pair uses exact international definitions — the same factors printed on each page.
        Runs entirely in your browser: no cookies, no sign-up, instant.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {CATEGORIES.map((c) => (
          <Link key={c.key} href={`/category/${c.key}`} className="group rounded-xl border border-ink/10 bg-white p-5">
            <span className="block text-[15px] font-semibold group-hover:text-brand">{c.label}</span>
            <span className="mt-1 block text-[13px] text-ink/55">
              {c.units.map((u) => u.symbol).slice(0, 6).join(' · ')}
              {c.units.length > 6 ? ' …' : ''}
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-[13px] text-ink/50">
        Popular: <Link href="/convert/cm-to-inches" className="text-brand hover:underline">cm to inches</Link>,{' '}
        <Link href="/convert/kg-to-lbs" className="text-brand hover:underline">kg to lbs</Link>,{' '}
        <Link href="/convert/miles-to-km" className="text-brand hover:underline">miles to km</Link>,{' '}
        <Link href="/convert/c-to-f" className="text-brand hover:underline">°C to °F</Link>
      </p>
    </div>
  )
}
