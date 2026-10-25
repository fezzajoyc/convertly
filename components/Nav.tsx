import Link from 'next/link'
import { SITE_NAME } from '@/lib/site'
import { CATEGORIES } from '@/lib/units'

export default function Nav() {
  return (
    <header className="border-b border-ink/10 bg-white">
      <nav className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-[14px] font-bold text-white">C</span>
          <span className="text-[17px] font-semibold tracking-tight">{SITE_NAME}</span>
        </Link>
        <div className="flex items-center gap-4 text-[13.5px] font-medium text-ink/70">
          {CATEGORIES.map((c) => (
            <Link key={c.key} href={`/category/${c.key}`} className="hidden hover:text-ink sm:inline">
              {c.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
