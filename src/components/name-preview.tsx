'use client'

// The hook on the landing page: type a business name and watch it land on a logo,
// a WhatsApp profile, an Instagram post and a business card.
// It is a taste of the product, not the product; the real kit has three logo options.

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const VIBES = [
  { key: 'modern', label: 'Modern', font: "'Syne Variable', sans-serif", weight: 700, bg: '#101418', ink: '#EAF2F8', accent: '#7CE0C3', onAccent: '#0B1512', radius: 14, track: '-0.02em' },
  { key: 'classic', label: 'Classic', font: "'Playfair Display Variable', serif", weight: 700, bg: '#F4EDE2', ink: '#1F3A2E', accent: '#1F3A2E', onAccent: '#F4EDE2', radius: 999, track: '0' },
  { key: 'playful', label: 'Playful', font: "'Fredoka Variable', sans-serif", weight: 600, bg: '#FFE36E', ink: '#3B1F6B', accent: '#3B1F6B', onAccent: '#FFE36E', radius: 22, track: '0' },
  { key: 'bold', label: 'Bold', font: "'Archivo Black', sans-serif", weight: 400, bg: '#1A1A1A', ink: '#FFF6EE', accent: '#FF5A36', onAccent: '#1A1A1A', radius: 4, track: '0' },
] as const

// A stand-in for the QR code on the card: a fixed pattern, not a real code.
const QR = '1110111101010111011100010101110101111'

export function NamePreview() {
  const [name, setName] = useState('')
  const [vibe, setVibe] = useState<(typeof VIBES)[number]['key']>('modern')
  const v = VIBES.find(x => x.key === vibe)!
  const shown = name.trim() || 'Your Business'
  const initial = shown.charAt(0).toUpperCase()
  const type = { fontFamily: v.font, fontWeight: v.weight, letterSpacing: v.track }
  const tile = 'overflow-hidden rounded-xl transition-colors duration-300'
  const caption = 'mt-1.5 text-[12.5px] text-mist'

  const mark = (size: number) => (
    <span
      className="flex shrink-0 items-center justify-center"
      style={{ ...type, width: size, height: size, fontSize: size * 0.48, background: v.accent, color: v.onAccent, borderRadius: Math.min(v.radius, size / 2) }}
      aria-hidden="true"
    >
      {initial}
    </span>
  )

  return (
    <div className="on-ink rounded-2xl bg-ink p-4 text-cream sm:p-5">
      <Label htmlFor="preview-name" className="mb-2 text-[15px] font-medium">Try it: type your business name</Label>
      <Input
        id="preview-name"
        type="text"
        value={name}
        maxLength={40}
        onChange={e => setName(e.target.value)}
        placeholder="e.g. Gyan Path Classes"
        autoComplete="off"
        enterKeyHint="done"
        className="bg-coal"
      />

      <div className="mt-3 grid grid-cols-4 gap-1.5" role="group" aria-label="Pick a look">
        {VIBES.map(x => (
          <button
            key={x.key}
            type="button"
            aria-pressed={vibe === x.key}
            onClick={() => setVibe(x.key)}
            className={`h-11 cursor-pointer rounded-full border text-[14px] font-medium transition-colors ${vibe === x.key ? 'border-saffron bg-saffron text-ink' : 'border-input text-cream hover:border-cream'}`}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3" aria-live="polite">
        <figure className="col-span-2">
          <div className={`${tile} flex min-h-[132px] items-center justify-center gap-3.5 px-5 py-6`} style={{ background: v.bg, color: v.ink }}>
            {mark(52)}
            <span className="min-w-0 break-words text-[clamp(22px,6.2vw,32px)] leading-[1.05]" style={type}>{shown}</span>
          </div>
          <figcaption className={caption}>Logo</figcaption>
        </figure>

        <figure>
          <div className={`${tile} flex aspect-square flex-col items-center justify-center gap-2 px-3 text-center`} style={{ background: v.bg, color: v.ink }}>
            {mark(64)}
            <span className="line-clamp-2 max-w-full break-words text-[15px] font-semibold leading-tight">{shown}</span>
            <span className="text-[12px] opacity-70">Business account</span>
          </div>
          <figcaption className={caption}>WhatsApp profile</figcaption>
        </figure>

        <figure>
          <div className={`${tile} flex aspect-square flex-col justify-between p-3.5`} style={{ background: v.accent, color: v.onAccent }}>
            <span className="text-[12px] font-semibold opacity-80">Your offer here</span>
            <span className="line-clamp-3 break-words text-[clamp(19px,5.4vw,26px)] leading-[1.05]" style={type}>{shown}</span>
          </div>
          <figcaption className={caption}>Instagram post</figcaption>
        </figure>

        <figure className="col-span-2">
          <div className={`${tile} flex items-center justify-between gap-4 p-4`} style={{ background: v.bg, color: v.ink }}>
            <div className="min-w-0">
              <span className="block break-words text-[19px] leading-tight" style={type}>{shown}</span>
              <span className="mt-2 block text-[13px] opacity-75">Your name · Owner</span>
              <span className="block text-[13px] opacity-75">+91 98xxx xxxxx</span>
            </div>
            <span className="grid shrink-0 grid-cols-6 gap-[2px] rounded-md p-1.5" style={{ background: v.ink }} aria-hidden="true">
              {QR.slice(0, 36).split('').map((c, i) => (
                <span key={i} className="h-[7px] w-[7px]" style={{ background: c === '1' ? v.bg : 'transparent' }} />
              ))}
            </span>
          </div>
          <figcaption className={caption}>Digital business card</figcaption>
        </figure>
      </div>

      <p className="mt-3 text-[13px] leading-relaxed text-mist">A quick preview, not your final kit. Your kit comes with three full logo options, colours and matching fonts.</p>
    </div>
  )
}
