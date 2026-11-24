'use client'

// The hook on the landing page: type a business name and watch it take on a look.
// It is a taste of the product, not the product; the real kit has three logo options.

import { useState } from 'react'

const VIBES = [
  { key: 'modern', label: 'Modern', font: "'Syne Variable', sans-serif", weight: 700, bg: '#101418', ink: '#EAF2F8', accent: '#7CE0C3', onAccent: '#0B1512', radius: 14, track: '-0.02em' },
  { key: 'classic', label: 'Classic', font: "'Playfair Display Variable', serif", weight: 700, bg: '#F4EDE2', ink: '#1F3A2E', accent: '#1F3A2E', onAccent: '#F4EDE2', radius: 999, track: '0' },
  { key: 'playful', label: 'Playful', font: "'Fredoka Variable', sans-serif", weight: 600, bg: '#FFE36E', ink: '#3B1F6B', accent: '#3B1F6B', onAccent: '#FFE36E', radius: 22, track: '0' },
  { key: 'bold', label: 'Bold', font: "'Archivo Black', sans-serif", weight: 400, bg: '#1A1A1A', ink: '#FFF6EE', accent: '#FF5A36', onAccent: '#1A1A1A', radius: 4, track: '0' },
] as const

export function NamePreview() {
  const [name, setName] = useState('')
  const [vibe, setVibe] = useState<(typeof VIBES)[number]['key']>('modern')
  const v = VIBES.find(x => x.key === vibe)!
  const shown = name.trim() || 'Your Business'
  const initial = shown.charAt(0).toUpperCase()

  return (
    <div className="rounded-3xl border border-line bg-coal p-5 sm:p-6">
      <label htmlFor="preview-name" className="block text-[15px] font-medium text-cream">Try it: type your business name</label>
      <input
        id="preview-name"
        type="text"
        value={name}
        maxLength={40}
        onChange={e => setName(e.target.value)}
        placeholder="e.g. Gyan Path Classes"
        autoComplete="off"
        className="mt-2 h-13 w-full rounded-xl border border-line bg-ink px-4 text-[17px] text-cream placeholder:text-[#77776f]"
      />

      <div
        className="mt-4 flex min-h-[190px] flex-col items-center justify-center gap-3 rounded-2xl px-4 py-7 text-center transition-colors duration-300"
        style={{ background: v.bg, color: v.ink }}
        aria-live="polite"
      >
        <span
          className="flex h-14 w-14 items-center justify-center text-[26px]"
          style={{ background: v.accent, color: v.onAccent, borderRadius: v.radius, fontFamily: v.font, fontWeight: v.weight }}
          aria-hidden="true"
        >
          {initial}
        </span>
        <span
          className="max-w-full break-words text-[clamp(24px,6vw,34px)] leading-tight"
          style={{ fontFamily: v.font, fontWeight: v.weight, letterSpacing: v.track }}
        >
          {shown}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2" role="group" aria-label="Pick a look">
        {VIBES.map(x => (
          <button
            key={x.key}
            type="button"
            aria-pressed={vibe === x.key}
            onClick={() => setVibe(x.key)}
            className={`h-11 rounded-full border text-[14px] font-medium transition-colors ${vibe === x.key ? 'border-saffron bg-saffron text-ink' : 'border-line bg-ink text-cream hover:border-[#555]'}`}
          >
            {x.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-mist">A quick preview. Your kit comes with three full logo options, colours and matching fonts.</p>
    </div>
  )
}
