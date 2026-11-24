'use client'

// Build dashboard for BrandIn30, ported from the My LabOS /ops page.
// Reads everything through one database function (brandin30_ops) that only answers admins.
// Refreshes every minute.

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2, RefreshCw, Check, AlertTriangle, CircleDot, User, Bot, Flag } from 'lucide-react'
import { db } from '@/lib/supabase'

type Milestone = { day: number; title: string; phase: string; planned_on: string; your_part: string | null; flag: string | null; status: 'planned' | 'in_progress' | 'done' | 'blocked'; done_at: string | null }
type Task = { id: string; day: number | null; title: string; owner: 'You' | 'Claude'; status: 'todo' | 'doing' | 'done' | 'blocked'; due_on: string | null; note: string | null }
type Risk = { id: string; kind: 'risk' | 'issue'; title: string; impact: 'High' | 'Medium' | 'Low'; owner: string; mitigation: string | null; status: 'open' | 'watching' | 'closed'; raised_on: string }
type Decision = { id: string; decided_on: string; decision: string; why: string | null }
type Agent = { name: string; team: string; job: string; phase: number; build_day: number | null; status: 'planned' | 'building' | 'testing' | 'live' | 'paused' }
type Budget = { item: string; purpose: string; monthly_inr: number | null; status: string }
type Activity = { id: number; at: string; actor: string; text: string }
type WaitRow = { id: string; created_at: string; name: string; phone: string; business_type: string | null; plan: string | null; source: string | null }
type Waitlist = { total: number; last7: number; starter: number; complete: number; website: number; rows: WaitRow[] }
type Data = { milestones: Milestone[]; tasks: Task[]; risks: Risk[]; decisions: Decision[]; agents: Agent[]; budget: Budget[]; activity: Activity[]; waitlist: Waitlist }

const card = 'bg-white border border-[#E8ECF1] rounded-[18px] shadow-[0_1px_2px_rgba(15,23,42,.04)]'
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
// Dates are plain YYYY-MM-DD strings; compare them as strings and print them without time zones.
const todayIST = () => new Date(Date.now() + 5.5 * 3600000).toISOString().slice(0, 10)
const short = (d: string) => `${Number(d.slice(8, 10))} ${MONTHS[Number(d.slice(5, 7)) - 1]}`
const weekday = (d: string) => DAYS[new Date(d + 'T00:00:00Z').getUTCDay()]
const daysBetween = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000)
const ago = (iso: string) => {
  const m = Math.round((Date.now() - Date.parse(iso)) / 60000)
  if (m < 1) return 'just now'; if (m < 60) return `${m} min ago`
  const h = Math.round(m / 60); if (h < 24) return `${h} h ago`
  return `${Math.round(h / 24)} d ago`
}

const TASK_TONE: Record<Task['status'], string> = { todo: 'bg-slate-100 text-slate-700', doing: 'bg-blue-50 text-blue-800', done: 'bg-emerald-50 text-emerald-800', blocked: 'bg-red-50 text-red-700' }
const TASK_LABEL: Record<Task['status'], string> = { todo: 'To do', doing: 'In progress', done: 'Done', blocked: 'Blocked' }
const AGENT_TONE: Record<Agent['status'], string> = { planned: 'bg-slate-100 text-slate-700', building: 'bg-blue-50 text-blue-800', testing: 'bg-amber-50 text-amber-900', live: 'bg-emerald-50 text-emerald-800', paused: 'bg-red-50 text-red-700' }
const IMPACT_TONE: Record<Risk['impact'], string> = { High: 'bg-red-50 text-red-700', Medium: 'bg-amber-50 text-amber-900', Low: 'bg-slate-100 text-slate-700' }
const PLAN_LABEL: Record<string, string> = { starter: 'Starter', complete: 'Complete Kit', website: 'Kit + Website' }

export default function OpsPage() {
  const router = useRouter()
  const [d, setD] = useState<Data | null>(null)
  const [state, setState] = useState<'loading' | 'login' | 'denied' | 'ok'>('loading')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState('')
  const [updated, setUpdated] = useState<number>(0)
  const [weekOnly, setWeekOnly] = useState(true)
  const [who, setWho] = useState('')

  const load = useCallback(async () => {
    try {
      const { data: { session } } = await db().auth.getSession()
      if (!session) { setState('login'); return }
      const { data, error } = await db().rpc('brandin30_ops')
      if (error) { setErr(error.message || 'Could not load'); setState('ok'); return }
      const j = data as (Data & { error?: string; email?: string }) | null
      if (!j || j.error === 'not_allowed') { setWho(j?.email || session.user.email || ''); setState('denied'); return }
      setD(j); setErr(''); setUpdated(Date.now()); setState('ok')
    } catch (e) {
      setErr((e as Error).message || 'Could not load'); setState('ok')
    }
  }, [])
  useEffect(() => { const first = setTimeout(load, 0), t = setInterval(load, 60000); return () => { clearTimeout(first); clearInterval(t) } }, [load])

  const setStatus = async (action: 'task' | 'milestone' | 'risk', id: string | number, status: string) => {
    setBusy(`${action}:${id}`)
    const { data, error } = await db().rpc('brandin30_ops_set', { p_action: action, p_id: String(id), p_status: status })
    setBusy('')
    if (error || !(data as { ok?: boolean } | null)?.ok) { setErr(error?.message || 'Could not save'); return }
    load()
  }

  const v = useMemo(() => {
    if (!d || !d.milestones.length) return null
    const today = todayIST()
    const M = d.milestones, T = d.tasks
    const current = [...M].reverse().find(m => m.planned_on <= today) || M[0]
    const onSale = M.find(m => m.flag === 'on_sale') || M[M.length - 1]
    const last = M[M.length - 1]
    const done = T.filter(t => t.status === 'done').length
    const overdue = T.filter(t => t.status !== 'done' && t.due_on && t.due_on < today)
    const blocked = T.filter(t => t.status === 'blocked')
    const health: 'green' | 'amber' | 'red' = blocked.length || overdue.length > 2 ? 'red' : overdue.length ? 'amber' : 'green'
    const waiting = T.filter(t => t.owner === 'You' && t.status !== 'done').sort((a, b) => (a.due_on || '9').localeCompare(b.due_on || '9'))
    const weekEnd = new Date(Date.parse(today) + 7 * 86400000).toISOString().slice(0, 10)
    const week = T.filter(t => (t.due_on && t.due_on <= weekEnd && (t.status !== 'done' || t.due_on >= today)) || t.status === 'doing')
    const next3 = M.filter(m => m.planned_on > today && m.status !== 'done').slice(0, 3)
    const phases: { name: string; days: Milestone[] }[] = []
    for (const m of M) { const p = phases.find(x => x.name === m.phase); if (p) p.days.push(m); else phases.push({ name: m.phase, days: [m] }) }
    const live = d.agents.filter(a => a.status === 'live').length
    const daysDone = M.filter(m => m.status === 'done').length
    return { today, current, onSale, last, done, total: T.length, daysDone, pct: Math.round(daysDone / M.length * 100), overdue, blocked, health, waiting, week, next3, phases, live, toSale: daysBetween(today, onSale.planned_on) }
  }, [d])

  if (state === 'loading') return <Center><Loader2 className="w-5 h-5 animate-spin" aria-label="Loading" /></Center>
  if (state === 'login') return <Center>Sign in first. <Link href="/ops/login" className="text-blue-700 font-semibold ml-1 underline">Sign in</Link></Center>
  if (state === 'denied') return (
    <Center>
      <div className="flex flex-col items-center gap-3 text-center max-w-md">
        <span>This page is only for the BrandIn30 team.</span>
        <span>You&rsquo;re signed in as <b>{who || 'unknown'}</b>, which isn&rsquo;t on the admin list.</span>
        <button type="button" onClick={async () => { await db().auth.signOut(); router.push('/ops/login') }} className="h-10 px-4 rounded-xl bg-blue-700 text-white text-sm font-semibold">Sign out and try another account</button>
      </div>
    </Center>
  )
  if (!d || !v) return <Center>{err || 'Could not load'}</Center>

  const HEALTH = {
    green: { dot: 'bg-emerald-500', text: 'On track', note: 'No overdue or blocked tasks', box: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    amber: { dot: 'bg-amber-500', text: 'At risk', note: `${v.overdue.length} overdue task${v.overdue.length === 1 ? '' : 's'}`, box: 'bg-amber-50 text-amber-900 border-amber-200' },
    red: { dot: 'bg-red-500', text: 'Off track', note: `${v.blocked.length} blocked · ${v.overdue.length} overdue`, box: 'bg-red-50 text-red-800 border-red-200' },
  }[v.health]
  const tasks = weekOnly ? v.week : d.tasks

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-slate-900">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6 md:py-9 flex flex-col gap-5">

        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-slate-500">Project · BrandIn30</p>
            <h1 className="text-[28px] font-semibold tracking-[-0.025em]">Company build</h1>
            <p className="text-sm text-slate-600">From a selling page to a brand engine and a team of agents that runs the business.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-2 h-9 px-3 rounded-full border text-[13px] font-semibold ${HEALTH.box}`}><span className={`w-2.5 h-2.5 rounded-full ${HEALTH.dot}`} />{HEALTH.text}</span>
            <button type="button" onClick={load} className="h-9 px-3 rounded-full border border-slate-200 bg-white text-[13px] text-slate-700 inline-flex items-center gap-1.5 hover:bg-slate-50"><RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />{updated ? ago(new Date(updated).toISOString()) : 'Refresh'}</button>
          </div>
        </header>
        {err && <div className="rounded-xl bg-red-50 text-red-700 text-sm px-4 py-2" role="alert">{err}</div>}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Plan progress" value={`${v.pct}%`} note={`${v.daysDone} of ${d.milestones.length} days done · ${v.done} of ${v.total} tasks`} bar={v.pct} />
          <Stat label="Today" value={`Day ${v.current.day} of ${v.last.day}`} note={v.current.title} />
          <Stat label="Kits on sale" value={short(v.onSale.planned_on)} note={v.toSale > 0 ? `${v.toSale} days to go` : v.toSale === 0 ? 'Today' : 'Date passed'} />
          <Stat label="Waiting on you" value={String(v.waiting.length)} note={HEALTH.note} warn={v.waiting.some(t => t.due_on && t.due_on <= v.today)} />
        </div>

        <WaitlistCard w={d.waitlist} />

        <section className={card + ' p-5'}>
          <SectionTitle title="Plan" note={`${short(d.milestones[0].planned_on)} to ${short(v.last.planned_on)} · 6 working days a week`} />
          <div>
            <div className="flex flex-wrap gap-x-5 gap-y-4 pt-1">
              {v.phases.map(p => (
                <div key={p.name} className="flex flex-col gap-2">
                  <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-slate-500">{p.name}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.days.map(m => {
                      const isToday = m.day === v.current.day
                      const tone = m.status === 'done' ? 'bg-emerald-600 text-white border-emerald-600' : m.status === 'blocked' ? 'bg-red-50 text-red-700 border-red-300' : m.status === 'in_progress' ? 'bg-blue-50 text-blue-800 border-blue-400' : 'bg-white text-slate-700 border-slate-200'
                      return (
                        <div key={m.day} title={`Day ${m.day} · ${short(m.planned_on)} · ${m.title}`} className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center ${tone} ${isToday ? 'ring-2 ring-blue-600 ring-offset-2' : ''} ${m.flag ? 'outline outline-2 outline-dashed outline-slate-400 outline-offset-2' : ''}`}>
                          <span className="text-[13px] font-semibold leading-none">{m.status === 'done' ? <Check className="w-4 h-4" aria-label={`Day ${m.day} done`} /> : m.day}</span>
                          <span className="text-[10.5px] mt-1 opacity-80 whitespace-nowrap">{short(m.planned_on)}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-[12px] text-slate-600">
            <Legend cls="bg-emerald-600" label="Done" /><Legend cls="bg-blue-50 border border-blue-400" label="In progress" /><Legend cls="bg-white border border-slate-300" label="Planned" />
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded ring-2 ring-blue-600" />Today</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded outline outline-2 outline-dashed outline-slate-400" />Launch: kits on sale, then website tier</span>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-5">
          <section className={card + ' p-5 lg:col-span-2'}>
            <div className="flex items-center justify-between gap-2 mb-3">
              <h2 className="text-[16px] font-semibold">Tasks</h2>
              <div className="flex gap-1">
                {([[true, 'Next 7 days'], [false, 'All']] as [boolean, string][]).map(([k, l]) => <button key={l} type="button" aria-pressed={weekOnly === k} onClick={() => setWeekOnly(k)} className={`h-8 px-3 rounded-lg text-[12.5px] font-semibold ${weekOnly === k ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}>{l}</button>)}
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {tasks.map(t => {
                const late = t.status !== 'done' && t.due_on && t.due_on < v.today
                return (
                  <div key={t.id} className="py-2.5 flex items-center gap-3">
                    <button type="button" aria-label={t.status === 'done' ? `Mark not done: ${t.title}` : `Mark done: ${t.title}`} onClick={() => setStatus('task', t.id, t.status === 'done' ? 'todo' : 'done')} className={`w-6 h-6 shrink-0 rounded-md border flex items-center justify-center ${t.status === 'done' ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-400 bg-white hover:border-slate-600'}`}>
                      {busy === `task:${t.id}` ? <Loader2 className="w-3 h-3 animate-spin" /> : t.status === 'done' && <Check className="w-3.5 h-3.5" />}
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className={`text-[14px] ${t.status === 'done' ? 'line-through text-slate-500' : ''}`}>{t.title}</div>
                      <div className="text-[12px] text-slate-600 flex flex-wrap items-center gap-x-2">
                        <span className="inline-flex items-center gap-1">{t.owner === 'You' ? <User className="w-3 h-3" aria-hidden="true" /> : <Bot className="w-3 h-3" aria-hidden="true" />}{t.owner}</span>
                        {t.day && <span>· Day {t.day}</span>}
                        {t.due_on && <span className={late ? 'text-red-700 font-medium' : ''}>· due {weekday(t.due_on)} {short(t.due_on)}{late ? ' (late)' : ''}</span>}
                        {t.note && <span className="text-slate-500">· {t.note}</span>}
                      </div>
                    </div>
                    <select aria-label={`Status of: ${t.title}`} value={t.status} onChange={e => setStatus('task', t.id, e.target.value)} className={`h-8 rounded-full px-2 text-[11.5px] font-semibold border-0 ${TASK_TONE[t.status]}`}>
                      {(Object.keys(TASK_LABEL) as Task['status'][]).map(s => <option key={s} value={s}>{TASK_LABEL[s]}</option>)}
                    </select>
                  </div>
                )
              })}
              {!tasks.length && <p className="py-6 text-sm text-slate-600 text-center">Nothing due in the next 7 days.</p>}
            </div>
          </section>

          <div className="flex flex-col gap-5">
            <section className={card + ' p-5'}>
              <SectionTitle title="Waiting on you" note={v.waiting.length ? 'Oldest first' : ''} />
              <div className="flex flex-col gap-2">
                {v.waiting.slice(0, 6).map(t => (
                  <div key={t.id} className="flex items-start gap-2 text-[13.5px]">
                    <CircleDot className={`w-4 h-4 mt-0.5 shrink-0 ${t.due_on && t.due_on <= v.today ? 'text-amber-600' : 'text-slate-400'}`} aria-hidden="true" />
                    <div><div>{t.title}</div>{t.due_on && <div className="text-[12px] text-slate-600">Day {t.day} · {weekday(t.due_on)} {short(t.due_on)}</div>}</div>
                  </div>
                ))}
                {v.waiting.length > 6 && <p className="text-[12px] text-slate-600">+ {v.waiting.length - 6} more later in the plan</p>}
                {!v.waiting.length && <p className="text-sm text-slate-600">Nothing. All clear.</p>}
              </div>
            </section>
            <section className={card + ' p-5'}>
              <SectionTitle title="Next 3 days" />
              <div className="flex flex-col gap-3">
                {v.next3.map(m => (
                  <div key={m.day} className="flex gap-3">
                    <div className="w-12 shrink-0 text-center"><div className="text-[11px] text-slate-500">{weekday(m.planned_on)}</div><div className="text-[13px] font-semibold">{short(m.planned_on)}</div></div>
                    <div className="text-[13.5px]"><div className="font-medium">Day {m.day} · {m.title}</div>{m.your_part && <div className="text-[12px] text-slate-600">You: {m.your_part}</div>}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section className={card + ' p-5'}>
          <SectionTitle title="Risks and issues" note={`${d.risks.filter(r => r.status !== 'closed').length} open`} />
          <div className="overflow-x-auto">
            <table className="w-full text-[13.5px] min-w-[760px]">
              <thead><tr className="text-left text-[11px] uppercase tracking-[0.06em] text-slate-500"><th className="pb-2 font-semibold">Type</th><th className="pb-2 font-semibold">What</th><th className="pb-2 font-semibold">Impact</th><th className="pb-2 font-semibold">Owner</th><th className="pb-2 font-semibold">What we do about it</th><th className="pb-2 font-semibold">Status</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {d.risks.map(r => (
                  <tr key={r.id} className={r.status === 'closed' ? 'opacity-60' : ''}>
                    <td className="py-2.5 pr-3 align-top"><span className={`inline-flex items-center gap-1 text-[12px] font-semibold ${r.kind === 'issue' ? 'text-red-700' : 'text-slate-700'}`}>{r.kind === 'issue' ? <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" /> : <Flag className="w-3.5 h-3.5" aria-hidden="true" />}{r.kind === 'issue' ? 'Issue' : 'Risk'}</span></td>
                    <td className="py-2.5 pr-3 align-top font-medium">{r.title}</td>
                    <td className="py-2.5 pr-3 align-top"><span className={`px-2 py-0.5 rounded-full text-[11.5px] font-semibold ${IMPACT_TONE[r.impact]}`}>{r.impact}</span></td>
                    <td className="py-2.5 pr-3 align-top">{r.owner}</td>
                    <td className="py-2.5 pr-3 align-top text-slate-700">{r.mitigation}</td>
                    <td className="py-2.5 align-top">
                      <select aria-label={`Status of risk: ${r.title}`} value={r.status} onChange={e => setStatus('risk', r.id, e.target.value)} className="h-8 rounded-full px-2 text-[11.5px] font-semibold bg-slate-100 text-slate-700 border-0 capitalize">
                        {['open', 'watching', 'closed'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-5">
          <section className={card + ' p-5'}>
            <SectionTitle title="Agent roster" note={`${v.live} of ${d.agents.length} live`} />
            <div className="divide-y divide-slate-100">
              {d.agents.map(a => (
                <div key={a.name} className="py-2.5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0"><Bot className="w-4 h-4 text-slate-600" aria-hidden="true" /></div>
                  <div className="min-w-0 flex-1"><div className="text-[14px] font-medium">{a.name} <span className="text-[12px] font-normal text-slate-500">· {a.team}</span></div><div className="text-[12px] text-slate-600">{a.job}</div></div>
                  <div className="text-right shrink-0"><span className={`px-2 py-0.5 rounded-full text-[11.5px] font-semibold capitalize ${AGENT_TONE[a.status]}`}>{a.status}</span><div className="text-[11px] text-slate-500 mt-1">{a.build_day ? `Day ${a.build_day}` : `Phase ${a.phase}`}</div></div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-5">
            <section className={card + ' p-5'}>
              <SectionTitle title="Recent activity" note="Sign-ups and agents post here" />
              <div className="flex flex-col gap-2.5 max-h-[280px] overflow-y-auto">
                {d.activity.map(a => (
                  <div key={a.id} className="flex gap-2.5 text-[13.5px]">
                    <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${a.actor === 'You' ? 'bg-blue-600' : a.actor === 'Website' ? 'bg-orange-500' : 'bg-slate-400'}`} />
                    <div><span className="font-medium">{a.actor}</span> <span className="text-slate-700">{a.text}</span><div className="text-[11.5px] text-slate-500">{ago(a.at)}</div></div>
                  </div>
                ))}
              </div>
            </section>
            <section className={card + ' p-5'}>
              <SectionTitle title="Running costs" note="Amounts fill in as each tool is set up" />
              <div className="divide-y divide-slate-100">
                {d.budget.map(b => (
                  <div key={b.item} className="py-2 flex items-center gap-3 text-[13.5px]">
                    <div className="flex-1 min-w-0"><div className="font-medium">{b.item}</div><div className="text-[12px] text-slate-600">{b.purpose}</div></div>
                    <div className="text-right"><div className="tabular-nums">{b.monthly_inr == null ? '—' : '₹' + Number(b.monthly_inr).toLocaleString('en-IN') + '/mo'}</div><div className="text-[11px] text-slate-500 capitalize">{b.status}</div></div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section className={card + ' p-5'}>
          <SectionTitle title="Decisions log" note={`${d.decisions.length} decisions`} />
          <div className="divide-y divide-slate-100">
            {d.decisions.map(x => (
              <div key={x.id} className="py-2.5 grid grid-cols-[64px_1fr] gap-3 text-[13.5px]">
                <span className="text-slate-500 tabular-nums">{short(x.decided_on)}</span>
                <div><div className="font-medium">{x.decision}</div>{x.why && <div className="text-[12.5px] text-slate-600">{x.why}</div>}</div>
              </div>
            ))}
          </div>
        </section>

        <p className="text-center text-[12px] text-slate-500 pb-4">Updates every minute. Only visible to the BrandIn30 team. <button type="button" className="underline" onClick={async () => { await db().auth.signOut(); router.push('/ops/login') }}>Sign out</button></p>
      </div>
    </div>
  )
}

const Center = ({ children }: { children: React.ReactNode }) => <div className="min-h-screen flex items-center justify-center p-6 text-sm text-slate-700 bg-[#F6F7F9]">{children}</div>
const SectionTitle = ({ title, note }: { title: string; note?: string }) => <div className="flex items-baseline justify-between gap-2 mb-3"><h2 className="text-[16px] font-semibold">{title}</h2>{note && <span className="text-[12px] text-slate-500">{note}</span>}</div>
const Legend = ({ cls, label }: { cls: string; label: string }) => <span className="inline-flex items-center gap-1.5"><span className={`w-3 h-3 rounded ${cls}`} />{label}</span>
const Stat = ({ label, value, note, bar, warn }: { label: string; value: string; note: string; bar?: number; warn?: boolean }) => (
  <div className={card + ' p-4 flex flex-col gap-1'}>
    <span className="text-[11px] font-semibold tracking-[0.06em] uppercase text-slate-500">{label}</span>
    <span className={`text-[24px] font-semibold tracking-[-0.02em] tabular-nums ${warn ? 'text-amber-700' : ''}`}>{value}</span>
    {bar != null && <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden"><div className="h-full bg-blue-600 rounded-full" style={{ width: `${bar}%` }} /></div>}
    <span className="text-[12.5px] text-slate-600 line-clamp-2">{note}</span>
  </div>
)

// Everyone who joined the waitlist on the selling page, newest first. The demand gate is 10 paid pre-orders.
function WaitlistCard({ w }: { w: Waitlist }) {
  const when = (iso: string) => new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' })
  return (
    <section className={card + ' p-5'}>
      <SectionTitle title="Waitlist" note={`${w.total} sign-ups · ${w.last7} in the last 7 days`} />
      <div className="grid grid-cols-3 gap-3 mb-4">
        {([['Complete Kit', w.complete], ['Starter', w.starter], ['Kit + Website', w.website]] as [string, number][]).map(([l, n]) => (
          <div key={l} className="rounded-xl bg-slate-50 px-3 py-2.5"><div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-slate-500">{l}</div><div className="text-[20px] font-semibold tabular-nums">{n}</div></div>
        ))}
      </div>
      {!w.rows.length ? <p className="text-sm text-slate-600">No sign-ups yet. They appear here the moment someone fills in the form on the selling page.</p> : (
        <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
          <table className="w-full text-[13px] min-w-[640px]">
            <thead className="sticky top-0 bg-white"><tr className="text-left text-[11px] uppercase tracking-[0.06em] text-slate-500">
              <th className="py-2 pr-3 font-semibold">Name</th><th className="py-2 pr-3 font-semibold">WhatsApp</th><th className="py-2 pr-3 font-semibold">Business</th><th className="py-2 pr-3 font-semibold">Interested in</th><th className="py-2 pr-3 font-semibold">Came from</th><th className="py-2 font-semibold">When</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {w.rows.map(r => (
                <tr key={r.id}>
                  <td className="py-2 pr-3 font-medium">{r.name}</td>
                  <td className="py-2 pr-3 tabular-nums whitespace-nowrap"><a href={`https://wa.me/91${r.phone}`} target="_blank" rel="noreferrer" className="text-emerald-800 underline">{r.phone}</a></td>
                  <td className="py-2 pr-3">{r.business_type || <span className="text-slate-400">—</span>}</td>
                  <td className="py-2 pr-3">{r.plan ? PLAN_LABEL[r.plan] || r.plan : <span className="text-slate-400">—</span>}</td>
                  <td className="py-2 pr-3 text-slate-600 max-w-[180px] truncate">{r.source || 'Direct'}</td>
                  <td className="py-2 whitespace-nowrap text-slate-600">{when(r.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
