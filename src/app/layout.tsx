import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/bricolage-grotesque/wdth.css'
import '@fontsource-variable/syne'
import '@fontsource-variable/playfair-display'
import '@fontsource-variable/fredoka'
import '@fontsource/archivo-black'
import './globals.css'
import { SITE_URL } from '@/lib/site'
import { Analytics } from '@/components/analytics'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'BrandIn30: your logo, brand kit and one-page website', template: '%s · BrandIn30' },
  description: 'Logo, colours, fonts, Instagram posts, WhatsApp kit, business card and a one-page website for your business. ₹2,499, one time. Made for small businesses in India.',
  openGraph: {
    title: 'BrandIn30: fire your branding agency',
    description: 'Pick a style, answer a few questions. Get your logo, colours, fonts, Instagram posts, WhatsApp kit, business card and a one-page website. ₹2,499, one time.',
    url: SITE_URL,
    siteName: 'BrandIn30',
    locale: 'en_IN',
    type: 'website',
  },
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }] },
}

export const viewport: Viewport = { themeColor: '#fbf6f1', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className="h-full antialiased">
      <body className="min-h-full" suppressHydrationWarning>{children}<Analytics /></body>
    </html>
  )
}
