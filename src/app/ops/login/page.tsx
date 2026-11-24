'use client'

// Sign-in for the dashboards. Same account as the My LabOS admin, because both products share one Supabase project.

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { db } from '@/lib/supabase'

export default function OpsLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) { setErr('Enter your email and password.'); return }
    setBusy(true); setErr('')
    try {
      const { error } = await db().auth.signInWithPassword({ email: email.trim(), password })
      if (error) { setErr('That email and password didn’t match. Try again.'); return }
      router.push('/ops')
    } catch (e) {
      setErr((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F7F9] p-6 text-slate-900">
      <form onSubmit={submit} noValidate className="flex w-full max-w-[380px] flex-col gap-4 rounded-[18px] border border-[#E8ECF1] bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,.04)]">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">BrandIn30</p>
          <h1 className="text-[22px] font-semibold tracking-[-0.02em]">Team sign-in</h1>
          <p className="mt-1 text-[13.5px] text-slate-500">Use the same email and password as your My LabOS admin account.</p>
        </div>
        <div>
          <label htmlFor="ops-email" className="mb-1 block text-[13px] font-medium text-slate-700">Email</label>
          <input id="ops-email" type="email" autoComplete="email" value={email} onChange={e => { setEmail(e.target.value); setErr('') }} className="h-11 w-full rounded-xl border border-slate-300 px-3 text-[15px]" />
        </div>
        <div>
          <label htmlFor="ops-password" className="mb-1 block text-[13px] font-medium text-slate-700">Password</label>
          <input id="ops-password" type="password" autoComplete="current-password" value={password} onChange={e => { setPassword(e.target.value); setErr('') }} className="h-11 w-full rounded-xl border border-slate-300 px-3 text-[15px]" />
        </div>
        {err && <p className="rounded-xl bg-red-50 px-3 py-2 text-[13.5px] text-red-700" role="alert">{err}</p>}
        <button type="submit" disabled={busy} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 text-[14px] font-semibold text-white disabled:opacity-60">
          {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}Sign in
        </button>
      </form>
    </div>
  )
}
