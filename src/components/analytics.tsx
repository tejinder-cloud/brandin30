'use client'

// Visitor tracking: Microsoft Clarity and Google Analytics 4.
// Each loads only when its ID is set in the environment, and never on the team dashboard.

import Script from 'next/script'
import { usePathname } from 'next/navigation'

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }
}

export function Analytics() {
  const path = usePathname()
  if (path?.startsWith('/ops')) return null
  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      )}
    </>
  )
}

// Record a named action, such as a waitlist sign-up, in both tools. Safe to call when neither is loaded.
export function track(event: string, params?: Record<string, string>) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', event, params || {})
  window.clarity?.('event', event)
}
