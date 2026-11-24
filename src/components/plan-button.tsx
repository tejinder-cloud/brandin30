'use client'

// A pricing button. With a Razorpay link it opens the payment page;
// without one it takes the visitor to the waitlist form with that plan chosen.

import type { VariantProps } from 'class-variance-authority'
import { Button, buttonVariants } from '@/components/ui/button'
import type { PlanKey } from '@/lib/site'

type Props = { plan: PlanKey; href?: string; className?: string; children: React.ReactNode } & Pick<VariantProps<typeof buttonVariants>, 'variant'>

export function PlanButton({ plan, href, variant, className, children }: Props) {
  if (href) {
    return (
      <Button asChild variant={variant} size="xl" className={className}>
        <a href={href} target="_blank" rel="noopener">{children}</a>
      </Button>
    )
  }
  return (
    <Button
      type="button"
      variant={variant}
      size="xl"
      className={className}
      onClick={() => {
        window.dispatchEvent(new CustomEvent('bi30-plan', { detail: plan }))
        document.getElementById('join')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.setTimeout(() => document.getElementById('join-name')?.focus({ preventScroll: true }), 600)
      }}
    >
      {children}
    </Button>
  )
}
