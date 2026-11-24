import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/syne'
import '@fontsource-variable/playfair-display'
import '@fontsource-variable/fredoka'
import '@fontsource/archivo-black'
import './globals.css'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'BrandIn30: your logo and full brand kit from 5 questions', template: '%s · BrandIn30' },
  description: 'Logo, colours, fonts, Instagram posts, WhatsApp kit and business card for your business. One-time price from ₹999. Made for small businesses in India.',
  openGraph: {
    title: 'BrandIn30: fire your branding agency',
    description: 'Answer 5 questions. Get your logo, colours, fonts, Instagram posts, WhatsApp kit and business card. From ₹999, one time.',
    url: SITE_URL,
    siteName: 'BrandIn30',
    locale: 'en_IN',
    type: 'website',
  },
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }] },
}

export const viewport: Viewport = { themeColor: '#0c0c0c', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className="h-full antialiased">
      <body className="min-h-full" suppressHydrationWarning>{children}</body>
    </html>
  )
}
