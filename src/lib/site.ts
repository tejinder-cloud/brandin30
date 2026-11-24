// Everything about the offer lives here, so prices and wording change in one place.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://brandin30.in'

// Ten digits, no country code. The floating WhatsApp button only shows when this is set.
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '').slice(-10)

// One package, paid once. keepLive is the optional monthly fee to keep the website link running.
export const PRICES = { kit: 2499, keepLive: 499 }
export const PACKAGE_NAME = 'BrandIn30 Brand Kit + Website'
export const WEBSITE_LIVE_DAYS = 60
export const STYLE_COUNT = 20
export const DELIVERY_HOURS = 48

export const rupee = (n: number) => '₹' + n.toLocaleString('en-IN')

export const BUSINESS_TYPES = ['Coaching or tuition', 'Clinic or healthcare', 'Boutique or fashion', 'Cafe or food', 'Salon or beauty', 'Shop or retail', 'Freelancer or consultant', 'Something else']

// Sample kits. The section on the home page stays hidden while this list is empty.
// To switch it on: put the approved images in public/samples/ and add one entry per kit, e.g.
//   { business: 'Name of the sample business', type: 'Coaching institute', style: 'Name of the brand style',
//     images: [{ src: '/samples/coaching-logo.png', alt: 'Logo', label: 'Logo' }] }
export type SampleKit = { business: string; type: string; style: string; images: { src: string; alt: string; label: string }[] }
export const SAMPLE_KITS: SampleKit[] = []
