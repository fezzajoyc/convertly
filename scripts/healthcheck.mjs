#!/usr/bin/env node
const SITE_URL = (process.env.SITE_URL ?? '').replace(/\/+$/, '')
if (!SITE_URL) { console.error('[health] SITE_URL not configured'); process.exit(1) }
const failures = []
const check = async (name, fn) => {
  try { await fn(); console.log(`[health] ✓ ${name}`) } catch (err) { failures.push(name); console.error(`[health] ✗ ${name}: ${err.message}`) }
}
const get = async (path, timeout = 30_000) => {
  const res = await fetch(`${SITE_URL}${path}`, { signal: AbortSignal.timeout(timeout), headers: { 'User-Agent': 'convertly-healthcheck' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}
await check('home renders', async () => {
  const html = await get('/')
  if (!/exact international definitions/i.test(html)) throw new Error('missing attribution')
})
await check('api exact conversion', async () => {
  const body = JSON.parse(await get('/api/convert?from=in&to=cm&value=1'))
  if (body.to?.value !== 2.54) throw new Error(`bad: ${body.to?.value}`)
})
await check('pair page renders', async () => {
  const html = await get('/convert/cm-to-inches')
  if (!/0.3937/.test(html)) throw new Error('missing factor')
})
await check('value page renders', async () => {
  const html = await get('/convert/165-cm-to-inches')
  if (!/165/.test(html)) throw new Error('missing value')
})
await check('sitemap covers pairs', async () => {
  const xml = await get('/sitemap.xml', 60_000)
  const count = (xml.match(/<url>/g) ?? []).length
  if (count < 500) throw new Error(`only ${count} URLs`)
})
if (failures.length > 0) { console.error(`[health] FAILED: ${failures.join(' | ')}`); process.exit(1) }
console.log('[health] all checks passed')
