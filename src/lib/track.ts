// One place to record an event in both GA4 and Microsoft Clarity.
// Never pass names, phone numbers or anything a visitor typed.

type Win = Window & { gtag?: (...args: unknown[]) => void; clarity?: (...args: unknown[]) => void }

export function track(event: string, params?: Record<string, string>) {
  if (typeof window === 'undefined') return
  const w = window as Win
  try {
    w.gtag?.('event', event, params)
    w.clarity?.('event', event)
  } catch {
    // Measurement must never break the page.
  }
}
