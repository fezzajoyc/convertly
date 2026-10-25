import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-[13px] font-semibold uppercase tracking-widest text-brand">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Unknown unit pair</h1>
      <p className="mx-auto mt-3 max-w-md text-[15px] text-ink/65">
        We only publish pairs backed by exact definitions — this one isn&rsquo;t in the table.
      </p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-ink px-4 py-2 text-[14px] font-semibold text-white hover:bg-ink/85">
        All categories
      </Link>
    </div>
  )
}
