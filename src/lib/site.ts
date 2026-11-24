// Everything about the offer lives here, so prices and links change in one place.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://brandin30.in'

// Razorpay payment page links. Until they are set in Vercel, the buttons reserve a place on the waitlist.
export const PAY_STARTER_URL = process.env.NEXT_PUBLIC_PAY_STARTER_URL || ''
export const PAY_COMPLETE_URL = process.env.NEXT_PUBLIC_PAY_COMPLETE_URL || ''

// Ten digits, no country code. The floating WhatsApp button only shows when this is set.
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '').slice(-10)

export type PlanKey = 'starter' | 'complete' | 'website'

export const PRICES = { starter: 999, complete: 2499, founding: 1499, website: 499 }
export const FOUNDING_SPOTS = 20

export const rupee = (n: number) => '₹' + n.toLocaleString('en-IN')

export const BUSINESS_TYPES = ['Coaching or tuition', 'Boutique or fashion', 'Clinic or healthcare', 'Cafe or food', 'Salon or beauty', 'Shop or retail', 'Freelancer or consultant', 'Something else']
