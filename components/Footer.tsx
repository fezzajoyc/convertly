import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto w-full max-w-3xl px-5 py-8 text-[13px] leading-relaxed text-ink/55">
        <p>
          Every conversion uses exact international definitions (SI, international yard and pound
          agreement) — the same factors printed on the page. Temperature uses standard transform
          formulas. KB vs KiB (decimal vs binary) are labeled, never conflated.
        </p>
        <p className="mt-3">Runs entirely in your browser. No cookies, nothing sent anywhere.</p>
        <p className="mt-3">
          <Link href="/sitemap.xml" className="underline decoration-ink/30 underline-offset-2 hover:text-ink">Sitemap</Link> ·{' '}
          <Link href="/llms.txt" className="underline decoration-ink/30 underline-offset-2 hover:text-ink">llms.txt</Link> ·{' '}
          <Link href="/api/convert" className="underline decoration-ink/30 underline-offset-2 hover:text-ink">JSON API</Link>
        </p>
      </div>
    </footer>
  )
}
