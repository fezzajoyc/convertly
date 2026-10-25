'use client'

import { useMemo, useState } from 'react'
import { convert, fmtConv, type Category, type Unit } from '@/lib/units'

/** 精密换算组件:双输入即时联动 + 交换按钮。纯客户端。 */
export default function Converter({
  cat,
  from,
  to,
  initial = 1,
}: {
  cat: Category
  from: Unit
  to: Unit
  initial?: number
}) {
  const [value, setValue] = useState(initial)
  const out = useMemo(() => convert(value, from, to, cat), [value, from, to, cat])
  const inputCls = 'w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-[14px] focus:border-brand focus:outline-none'

  return (
    <div className="rounded-xl border border-ink/10 bg-white p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[12px] font-medium uppercase tracking-wider text-ink/45" htmlFor="ucv">
            {from.name} ({from.symbol})
          </label>
          <input
            id="ucv"
            type="number"
            className={inputCls + ' text-[18px] font-semibold'}
            value={value}
            min={0}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="mb-1 block text-[12px] font-medium uppercase tracking-wider text-ink/45" htmlFor="ucr">
            {to.name} ({to.symbol})
          </label>
          <div id="ucr" className="rounded-lg border border-brand/40 bg-brand/5 px-3 py-2 text-[18px] font-bold text-brand" aria-live="polite">
            {fmtConv(out)}
          </div>
        </div>
      </div>
    </div>
  )
}
