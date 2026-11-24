'use client'

// Waitlist form. There is one package, so every sign-up is recorded against the same plan value.
// Saves through one database function that validates the name and number
// again on the server, so nothing here needs to be trusted.

import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { db } from '@/lib/supabase'
import { BUSINESS_TYPES } from '@/lib/site'
import { track } from '@/components/analytics'

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
  const [errors, setErrors] = useState<{ name?: string; phone?: string; form?: string }>({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

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
        p_name: name.trim(), p_phone: tenDigits(phone), p_business_type: type || null, p_plan: 'complete', p_source: source || null,
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
    track('waitlist_join', { business_type: type || 'not given' })
    setDone(true)
  }

  if (done) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl bg-field p-6" role="status">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-saffron text-ink"><Check className="h-5 w-5" aria-hidden="true" /></span>
        <p className="display text-[30px] text-foreground">You’re on the list, {name.trim().split(' ')[0]}.</p>
        <p className="text-[15px] leading-relaxed text-muted-foreground">We’ll message you on WhatsApp at {tenDigits(phone)} when ordering opens. One message, no spam.</p>
      </div>
    )
  }

  const label = 'mb-2 text-[14px] font-medium text-muted-foreground'
  const error = 'mt-1.5 text-[14px] text-destructive'
  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <div>
        <Label htmlFor="join-name" className={label}>Your name</Label>
        <Input id="join-name" type="text" autoComplete="name" value={name} maxLength={80}
          onChange={e => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: undefined }) }}
          aria-invalid={!!errors.name} aria-describedby={errors.name ? 'join-name-error' : undefined} />
        {errors.name && <p id="join-name-error" className={error}>{errors.name}</p>}
      </div>
      <div>
        <Label htmlFor="join-phone" className={label}>WhatsApp number</Label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[17px] text-muted-foreground" aria-hidden="true">+91</span>
          <Input id="join-phone" type="tel" inputMode="numeric" autoComplete="tel-national" value={phone} maxLength={14}
            onChange={e => { setPhone(e.target.value); if (errors.phone) setErrors({ ...errors, phone: undefined }) }}
            aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'join-phone-error' : undefined}
            placeholder="98xxx xxxxx" className="pl-14" />
        </div>
        {errors.phone && <p id="join-phone-error" className={error}>{errors.phone}</p>}
      </div>
      <div>
        <Label htmlFor="join-type" className={label}>Type of business</Label>
        <NativeSelect id="join-type" value={type} onChange={e => setType(e.target.value)}>
          <NativeSelectOption value="">Choose one</NativeSelectOption>
          {BUSINESS_TYPES.map(t => <NativeSelectOption key={t} value={t}>{t}</NativeSelectOption>)}
        </NativeSelect>
      </div>
      {errors.form && <p className="rounded-xl bg-[#3a1512] px-4 py-3 text-[14px] text-[#ffb4a8]" role="alert">{errors.form}</p>}
      <Button type="submit" size="xl" disabled={busy} className="mt-1 w-full">
        {busy && <Loader2 className="animate-spin" aria-hidden="true" />}
        {busy ? 'Saving' : 'Join the waitlist'}
      </Button>
      <p className="text-[13px] text-muted-foreground">No payment now. We’ll message you once on WhatsApp when ordering opens.</p>
    </form>
  )
}
