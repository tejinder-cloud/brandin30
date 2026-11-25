import { ArrowRight, Check, MessageCircle } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Analytics } from '@/components/analytics'
import { NamePreview } from '@/components/name-preview'
import { SampleKits } from '@/components/sample-kits'
import { WaitlistForm } from '@/components/waitlist-form'
import { DELIVERY_HOURS, PACKAGE_NAME, PRICES, STYLE_COUNT, WEBSITE_LIVE_DAYS, WHATSAPP_NUMBER, rupee } from '@/lib/site'

const KEEP_LIVE_PRICE = `${rupee(PRICES.keepLive)} a month or ${rupee(PRICES.keepLiveYear)} a year`
const KEEP_LIVE = `After ${WEBSITE_LIVE_DAYS} days the link ends unless you keep it live for ${KEEP_LIVE_PRICE}.`

// Each card gets a colour and a slight tilt, so the list reads as a spread of things on a table.
const KIT = [
  { name: 'Logo files', detail: 'PNG, SVG, PDF and a favicon.', look: 'bg-field', tilt: '-rotate-1' },
  { name: 'Colour palette', detail: 'Five colours with HEX, RGB and CMYK codes for screen and print.', look: 'bg-saffron', tilt: 'rotate-1' },
  { name: 'Font pairing', detail: 'A heading font and a body font, both free for commercial use.', look: 'bg-background', tilt: '-rotate-[0.5deg]' },
  { name: 'WhatsApp Business kit', detail: 'Profile picture, catalogue cover and a ready-to-paste description.', look: 'bg-ink text-cream', tilt: 'rotate-[1.5deg]' },
  { name: 'Digital business card', detail: 'A shareable card with a QR code that saves to phone contacts.', look: 'bg-field', tilt: '-rotate-[1.5deg]' },
  { name: 'One-page website', detail: `A ready-to-upload file plus a PNG, and live on a BrandIn30 link for ${WEBSITE_LIVE_DAYS} days. ${KEEP_LIVE}`, look: 'bg-saffron', tilt: 'rotate-[0.5deg]' },
]

const STEPS = [
  { title: 'Pick a style', detail: `Choose one of ${STYLE_COUNT} ready-made brand styles.` },
  { title: 'Answer a few questions', detail: 'Your business name, what you do and who you serve.' },
  { title: `Pay ${rupee(PRICES.kit)} once`, detail: 'One package. No subscription to get your files.' },
  { title: 'Get everything', detail: `Your kit and website arrive by WhatsApp and email within ${DELIVERY_HOURS} hours.` },
]

const COMPARE = [
  { who: 'BrandIn30', cost: `${rupee(PRICES.kit)}, one time`, time: `Within ${DELIVERY_HOURS} hours of ordering`, get: 'Six-piece kit with a one-page website', us: true },
  { who: 'Branding agency', cost: '₹30,000 and up', time: '2 to 4 weeks', get: 'A full brand identity', us: false },
  { who: 'Freelance designer', cost: '₹5,000 to ₹15,000', time: '1 to 2 weeks', get: 'Usually the logo only', us: false },
  { who: 'Do it yourself', cost: 'Free, plus your hours', time: 'A weekend or more', get: 'Whatever you manage to design', us: false },
]

const FAQ = [
  { q: 'Can I order today?', a: 'Not yet. Ordering opens when the style catalogue is live. Join the waitlist and you get first access. No payment is taken now.' },
  { q: 'Is it really a one-time payment?', a: `Yes. ${rupee(PRICES.kit)} is paid once and the files are yours. The only ongoing cost is optional: ${KEEP_LIVE_PRICE} if you want your website to stay live on a BrandIn30 link after the first ${WEBSITE_LIVE_DAYS} days.` },
  { q: `What happens to my website after ${WEBSITE_LIVE_DAYS} days?`, a: `${KEEP_LIVE} Either way you keep the ready-to-upload file and the PNG.` },
  { q: 'Which files do I get?', a: 'Your logo as PNG, SVG and PDF plus a favicon, your colour palette and font pairing, your WhatsApp Business kit, your digital business card, and your website as a ready-to-upload file plus a PNG.' },
  { q: 'Are Instagram templates included?', a: 'No, they are not part of this package. They will be available later as an add-on.' },
  { q: 'Do I own my logo?', a: 'Yes. Once you pay, the logo and files are yours to use for your business. The fonts are free for commercial use. Trademark registration is not included.' },
  { q: 'Is Hindi supported?', a: 'You can answer the questions in Hindi or Hinglish. The kit itself is in English for now; Hindi and Punjabi are planned.' },
]

const STRIP = ['Logo files', 'Colour palette', 'Font pairing', 'WhatsApp Business kit', 'Digital business card', 'One-page website']
const STATEMENT = 'A new business gets judged in seconds: on a signboard, a WhatsApp profile, a website. You should look the same, and look good, on every one of them.'.split(' ')

const wrap = 'mx-auto max-w-[1180px] px-5 sm:px-8'
const band = 'py-[clamp(64px,10vw,112px)]'
const h2 = 'display text-[clamp(44px,11.5vw,84px)]'

function Sticker({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-block rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-bold text-cream ${className}`}>{children}</span>
}

export default function Home() {
  return (
    <div className="site min-h-screen bg-background text-foreground">
      <Analytics />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream">Skip to content</a>

      <header className="sticky top-0 z-40 border-b border-border bg-blush">
        <div className={`${wrap} flex h-16 items-center justify-between`}>
          <a href="#main" className="display text-[26px]">Brand<span className="text-saffron-deep">In30</span></a>
          <Button asChild><a href="#join">Join the waitlist</a></Button>
        </div>
      </header>

      <main id="main">
        <section className="overflow-hidden bg-blush">
          <div className={`${wrap} grid gap-12 pb-16 pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14 lg:pb-24 lg:pt-16`}>
            <div className="min-w-0">
              <p className="rise"><Sticker className="-rotate-2">Ordering opens soon</Sticker></p>
              <h1 className="rise display mt-5 text-[clamp(68px,20.5vw,128px)] leading-[0.84] text-saffron-deep" style={{ '--i': 1 } as React.CSSProperties}>
                Fire your branding agency.
              </h1>
              <p className="rise mt-6 max-w-[36ch] text-[19px] font-medium leading-[1.55] sm:text-[20px]" style={{ '--i': 2 } as React.CSSProperties}>
                Pick a style, answer a few questions. Get your logo, colours, fonts, WhatsApp kit, business card and a one-page website.
              </p>
              <div className="rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ '--i': 3 } as React.CSSProperties}>
                <Button asChild size="xl"><a href="#join">Join the waitlist <ArrowRight aria-hidden="true" /></a></Button>
                <Button asChild variant="outline" size="xl"><a href="#kit">See what’s in the kit</a></Button>
              </div>
              <p className="rise mt-5 max-w-[40ch] text-[15px] text-muted-foreground" style={{ '--i': 4 } as React.CSSProperties}>
                Ordering is not open yet. Waitlist members get first access when it opens.
              </p>
              <ul className="rise mt-6 flex flex-wrap gap-2" style={{ '--i': 4 } as React.CSSProperties}>
                <li><Sticker className="rotate-1">{rupee(PRICES.kit)}, one time</Sticker></li>
                <li><Sticker className="-rotate-1">No design skills needed</Sticker></li>
                <li><Sticker className="rotate-2">Made for businesses in India</Sticker></li>
              </ul>
            </div>
            <div className="rise min-w-0" style={{ '--i': 3 } as React.CSSProperties}><NamePreview /></div>
          </div>
        </section>

        <div className="overflow-hidden border-y-2 border-ink bg-saffron py-3" aria-hidden="true">
          <div className="marquee-track flex w-max animate-marquee">
            {[0, 1].map(n => (
              <ul key={n} className="flex shrink-0">
                {STRIP.map(t => <li key={t} className="display flex items-center gap-6 pr-6 text-[24px]">{t}<span className="h-2 w-2 rounded-full bg-ink" /></li>)}
              </ul>
            ))}
          </div>
        </div>

        <section aria-label="Why it matters">
          <div className={`${wrap} ${band}`}>
            <p className="fill mx-auto max-w-[22ch] text-center font-display text-[clamp(30px,7.4vw,58px)] font-bold leading-[1.06] tracking-[-0.02em] [font-stretch:87%]">
              {STATEMENT.map((w, i) => <span key={i} style={{ '--w': i } as React.CSSProperties}>{w} </span>)}
            </p>
          </div>
        </section>

        <SampleKits wrap={wrap} band={band} h2={h2} />

        <section id="kit" className="scroll-mt-16 bg-blush" aria-labelledby="kit-title">
          <div className={`${wrap} ${band}`}>
            <Sticker className="-rotate-2">{PACKAGE_NAME}</Sticker>
            <h2 id="kit-title" className={`${h2} mt-4`}>Six things. <span className="text-saffron-deep">One price.</span></h2>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {KIT.map(k => (
                <li key={k.name} className={`rounded-2xl border-2 border-ink p-5 sm:p-6 ${k.look} ${k.tilt}`}>
                  <h3 className="display text-[28px]">{k.name}</h3>
                  <p className="mt-3 text-[16px] leading-[1.55]">{k.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="how-title">
          <div className={`${wrap} ${band}`}>
            <Sticker className="rotate-2">Coming soon, not live yet</Sticker>
            <h2 id="how-title" className={`${h2} mt-4`}>How it will work.</h2>
            <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {STEPS.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[56px_minmax(0,1fr)] gap-x-4 lg:block">
                  <span className="display block text-[84px] leading-[0.8] text-saffron-deep lg:text-[104px]" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3 className="display text-[28px] lg:mt-5">{s.title}</h3>
                    <p className="mt-3 max-w-[34ch] text-[16px] leading-[1.65] text-muted-foreground">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-blush" aria-labelledby="compare-title">
          <div className={`${wrap} ${band}`}>
            <h2 id="compare-title" className={h2}>What a brand usually costs.</h2>
            <div className="mt-10 hidden overflow-hidden rounded-2xl border-2 border-ink bg-field md:block">
              <table className="w-full text-left text-[16px]">
                <thead>
                  <tr className="text-[14px] text-muted-foreground">
                    <th scope="col" className="px-6 py-4 font-medium">Option</th><th scope="col" className="px-6 py-4 font-medium">Typical cost</th><th scope="col" className="px-6 py-4 font-medium">Time</th><th scope="col" className="px-6 py-4 font-medium">What you get</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(c => (
                    <tr key={c.who} className={`border-t border-border ${c.us ? 'bg-saffron font-medium' : ''}`}>
                      <th scope="row" className={`px-6 py-5 ${c.us ? 'font-bold' : 'font-medium'}`}>{c.who}</th>
                      <td className="px-6 py-5">{c.cost}</td><td className={`px-6 py-5 ${c.us ? '' : 'text-muted-foreground'}`}>{c.time}</td><td className={`px-6 py-5 ${c.us ? '' : 'text-muted-foreground'}`}>{c.get}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-8 flex flex-col gap-3 md:hidden">
              {COMPARE.map(c => (
                <li key={c.who} className={`rounded-2xl border-2 border-ink p-5 ${c.us ? 'bg-saffron' : 'bg-field'}`}>
                  <h3 className={`text-[15px] font-medium ${c.us ? 'text-rust' : 'text-muted-foreground'}`}>{c.who}</h3>
                  <p className="display mt-1.5 text-[30px]">{c.cost}</p>
                  <p className={`mt-2 text-[15px] ${c.us ? 'font-medium text-rust' : 'text-muted-foreground'}`}>{c.time} · {c.get}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13.5px] text-muted-foreground">Agency, freelancer and do-it-yourself figures are typical ranges in India and vary by city and scope.</p>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-16" aria-labelledby="pricing-title">
          <div className={`${wrap} ${band}`}>
            <h2 id="pricing-title" className={h2}>Pay once. It’s yours.</h2>
            <article className="panel-dark mt-10 grid gap-8 rounded-2xl p-6 sm:p-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
              <div className="flex flex-col">
                <h3 className="text-[18px] font-bold">{PACKAGE_NAME}</h3>
                <p className="display mt-5 text-[clamp(88px,24vw,132px)] leading-[0.82] text-saffron">{rupee(PRICES.kit)}</p>
                <p className="mt-3 text-[16px] text-muted-foreground">One time. One package.</p>
                <div className="mt-8 rounded-xl bg-field p-5">
                  <h4 className="text-[15px] font-bold">About the website</h4>
                  <p className="mt-2 text-[15.5px] leading-[1.6] text-muted-foreground">You get it as a ready-to-upload file plus a PNG. It is also live on a BrandIn30 link for {WEBSITE_LIVE_DAYS} days. {KEEP_LIVE}</p>
                </div>
                <div className="mt-auto pt-8">
                  <Button asChild size="xl" className="w-full"><a href="#join">Join the waitlist <ArrowRight aria-hidden="true" /></a></Button>
                  <p className="mt-3 text-[14.5px] text-muted-foreground">Ordering is not open yet. No payment is taken now.</p>
                </div>
              </div>
              <ul className="flex flex-col gap-3.5 text-[17px] lg:border-l lg:border-border lg:pl-14">
                {KIT.map(k => <li key={k.name} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-saffron" strokeWidth={3} aria-hidden="true" />{k.name}</li>)}
              </ul>
            </article>
          </div>
        </section>

        <section className="bg-blush" aria-labelledby="faq-title">
          <div className={`${wrap} ${band} grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16`}>
            <h2 id="faq-title" className={h2}>Things you might ask.</h2>
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {FAQ.map(f => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent className="text-[16.5px] leading-[1.6]">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="join" className="scroll-mt-16 bg-saffron" aria-labelledby="join-title">
          <div className={`${wrap} ${band} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16`}>
            <div>
              <Sticker className="-rotate-2">Free to join</Sticker>
              <h2 id="join-title" className={`${h2} mt-4 max-w-[12ch]`}>Get your brand before your competitor does.</h2>
              <p className="mt-5 max-w-[38ch] text-[18px] font-medium leading-[1.6] text-rust">Leave your WhatsApp number. Waitlist members get first access when ordering opens.</p>
            </div>
            <div className="panel-dark rounded-2xl p-5 sm:p-8 lg:-rotate-1"><WaitlistForm /></div>
          </div>
        </section>
      </main>

      <footer className="overflow-hidden bg-saffron">
        <div className={`${wrap} border-t-2 border-ink pt-10`}>
          <p className="display text-[clamp(32px,7vw,52px)]">Okay, that’s the whole pitch.</p>
          <div className="mt-6 flex flex-col gap-2 text-[14.5px] font-medium text-rust sm:flex-row sm:justify-between">
            <span>A product of The Growth Lab</span>
            <span>© 2026 BrandIn30</span>
          </div>
        </div>
        <p className="display mt-6 translate-y-[0.12em] whitespace-nowrap text-center text-[19.5vw] leading-[0.8] text-cream" aria-hidden="true">BrandIn30</p>
      </footer>

      {WHATSAPP_NUMBER && (
        <a href={`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi BrandIn30, I have a question')}`} target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp"
          className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-[#25D366] text-[#06260f]">
          <MessageCircle className="h-7 w-7" aria-hidden="true" />
        </a>
      )}
    </div>
  )
}
