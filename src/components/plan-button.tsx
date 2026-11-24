'use client'

// A pricing button. With a Razorpay link it opens the payment page;
// without one it takes the visitor to the waitlist form with that plan chosen.

import type { PlanKey } from '@/lib/site'

export function PlanButton({ plan, href, className, children }: { plan: PlanKey; href?: string; className: string; children: React.ReactNode }) {
  if (href) return <a href={href} className={className} target="_blank" rel="noopener">{children}</a>
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.dispatchEvent(new CustomEvent('bi30-plan', { detail: plan }))
        document.getElementById('join')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.setTimeout(() => document.getElementById('join-name')?.focus({ preventScroll: true }), 600)
      }}
    >
      {children}
    </button>
  )
}
