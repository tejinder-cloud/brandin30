'use client'

// Waitlist form. Saves through one database function that validates the name and number
// again on the server, so nothing here needs to be trusted.

import { useEffect, useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { db } from '@/lib/supabase'
import { BUSINESS_TYPES, PRICES, rupee, type PlanKey } from '@/lib/site'

const PLANS: { key: PlanKey; label: string }[] = [
  { key: 'complete', label: `Complete Kit, founding price ${rupee(PRICES.founding)}` },
  { key: 'starter', label: `Starter, ${rupee(PRICES.starter)}` },
  { key: 'website', label: `Kit + Website, ${rupee(PRICES.website)} a month` },
]

const tenDigits = (raw: string) => {
  let d = raw.replace(/\D/g, '')
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2)
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1)
  return d
}

export function WaitlistForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [type, setType] = useState('')
  const [plan, setPlan] = useState<PlanKey>('complete')
  const [errors, setErrors] = useState<{ name?: string; phone?: string; form?: string }>({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const onPlan = (e: Event) => {
      const p = (e as CustomEvent).detail
      if (p === 'starter' || p === 'complete' || p === 'website') setPlan(p)
    }
    window.addEventListener('bi30-plan', onPlan)
    return () => window.removeEventListener('bi30-plan', onPlan)
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (name.trim().length < 2) next.name = 'Enter your name.'
    if (!/^[6-9]\d{9}$/.test(tenDigits(phone))) next.phone = 'Enter a 10-digit mobile number.'
    setErrors(next)
    if (next.name || next.phone) return

    setBusy(true)
    const params = new URLSearchParams(window.location.search)
    const source = [params.get('utm_source'), params.get('utm_campaign'), document.referrer ? new URL(document.referrer).hostname : ''].filter(Boolean).join(' / ')
    let reply: { ok?: boolean; error?: string } | null = null
    let failed = false
    try {
      const { data, error } = await db().rpc('brandin30_join_waitlist', {
        p_name: name.trim(), p_phone: tenDigits(phone), p_business_type: type || null, p_plan: plan, p_source: source || null,
      })
      reply = data as { ok?: boolean; error?: string } | null
      failed = !!error
    } catch {
      failed = true
    }
    setBusy(false)
    if (failed || !reply?.ok) {
      if (reply?.error === 'name') setErrors({ name: 'Enter your name.' })
      else if (reply?.error === 'phone') setErrors({ phone: 'Enter a 10-digit mobile number.' })
      else setErrors({ form: 'That didn’t save. Check your connection and try again.' })
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-[#4a2f10] bg-ember p-6" role="status">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-saffron text-ink"><Check className="h-5 w-5" aria-hidden="true" /></span>
        <p className="font-display text-[24px] font-bold leading-tight text-cream">You’re on the list, {name.trim().split(' ')[0]}.</p>
        <p className="text-[15px] leading-relaxed text-mist">We’ll message you on WhatsApp at {tenDigits(phone)} when your place opens. One message, no spam.</p>
      </div>
    )
  }

  const field = 'h-13 w-full rounded-xl border bg-ink px-4 text-[17px] text-cream placeholder:text-[#77776f]'
  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="join-name" className="mb-1.5 block text-[14px] text-mist">Your name</label>
        <input id="join-name" type="text" autoComplete="name" value={name} maxLength={80}
          onChange={e => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: undefined }) }}
          aria-invalid={!!errors.name} aria-describedby={errors.name ? 'join-name-error' : undefined}
          className={`${field} ${errors.name ? 'border-[#ff8a7a]' : 'border-line'}`} />
        {errors.name && <p id="join-name-error" className="mt-1.5 text-[14px] text-[#ff8a7a]">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="join-phone" className="mb-1.5 block text-[14px] text-mist">WhatsApp number</label>
        <div className={`flex h-13 items-center rounded-xl border bg-ink ${errors.phone ? 'border-[#ff8a7a]' : 'border-line'}`}>
          <span className="pl-4 pr-2 text-[17px] text-mist" aria-hidden="true">+91</span>
          <input id="join-phone" type="tel" inputMode="numeric" autoComplete="tel-national" value={phone} maxLength={14}
            onChange={e => { setPhone(e.target.value); if (errors.phone) setErrors({ ...errors, phone: undefined }) }}
            aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'join-phone-error' : undefined}
            placeholder="98xxx xxxxx"
            className="h-full w-full rounded-r-xl bg-transparent pr-4 text-[17px] text-cream placeholder:text-[#77776f]" />
        </div>
        {errors.phone && <p id="join-phone-error" className="mt-1.5 text-[14px] text-[#ff8a7a]">{errors.phone}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="join-type" className="mb-1.5 block text-[14px] text-mist">Type of business</label>
          <select id="join-type" value={type} onChange={e => setType(e.target.value)} className={`${field} border-line appearance-none`}>
            <option value="">Choose one</option>
            {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="join-plan" className="mb-1.5 block text-[14px] text-mist">I’m interested in</label>
          <select id="join-plan" value={plan} onChange={e => setPlan(e.target.value as PlanKey)} className={`${field} border-line appearance-none`}>
            {PLANS.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
          </select>
        </div>
      </div>
      {errors.form && <p className="rounded-xl bg-[#3a1512] px-4 py-3 text-[14px] text-[#ffb4a8]" role="alert">{errors.form}</p>}
      <button type="submit" disabled={busy} className="mt-1 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-saffron px-8 text-[17px] font-bold text-ink transition-opacity hover:opacity-90 disabled:opacity-60">
        {busy && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
        {busy ? 'Saving' : 'Join the waitlist'}
      </button>
      <p className="text-[13px] text-mist">No payment now. We’ll message you once on WhatsApp when your place opens.</p>
    </form>
  )
}
