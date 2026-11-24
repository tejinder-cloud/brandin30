import { ArrowRight, Check, MessageCircle, Minus } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { NamePreview } from '@/components/name-preview'
import { PlanButton } from '@/components/plan-button'
import { WaitlistForm } from '@/components/waitlist-form'
import { FOUNDING_SPOTS, PAY_COMPLETE_URL, PAY_STARTER_URL, PRICES, WHATSAPP_NUMBER, rupee } from '@/lib/site'

const KIT = [
  { name: 'Logo in three styles', detail: 'Icon, wordmark and combined. PNG, SVG, PDF and a favicon.', starter: true },
  { name: 'Colour palette', detail: 'Five colours with HEX, RGB and CMYK codes for screen and print.', starter: true },
  { name: 'Font pairing', detail: 'A heading font and a body font, both free for commercial use.', starter: true },
  { name: 'WhatsApp Business kit', detail: 'Profile picture, catalogue cover and a ready-to-paste description.', starter: true },
  { name: 'Instagram templates', detail: 'Five posts and three stories in your colours and fonts.', starter: false },
  { name: 'Digital business card', detail: 'A shareable card with a QR code that saves to phone contacts.', starter: false },
  { name: 'Brand voice guide', detail: 'How your business should sound, with words to use and avoid.', starter: false },
  { name: 'Brand guidelines PDF', detail: 'Logo rules, colour codes and fonts in one file for printers and designers.', starter: false },
]

const STEPS = [
  { title: 'Answer 5 questions', detail: 'Your business name, what you do, who you serve, the look you like and your colours. Hindi or Hinglish is fine.' },
  { title: 'We build your brand', detail: 'Three logo directions with matching colours and fonts, each checked for quality before you see it.' },
  { title: 'Pick one and use it today', detail: 'Founding members get the full kit on WhatsApp within 48 hours, and first access when the instant version opens.' },
]

const COMPARE = [
  { who: 'BrandIn30', cost: `${rupee(PRICES.starter)} to ${rupee(PRICES.complete)}, one time`, time: 'Within 48 hours', get: 'Full kit: logo, colours, fonts, templates, card', us: true },
  { who: 'Branding agency', cost: '₹30,000 and up', time: '2 to 4 weeks', get: 'Full kit', us: false },
  { who: 'Freelance designer', cost: '₹5,000 to ₹15,000', time: '1 to 2 weeks', get: 'Usually the logo only', us: false },
  { who: 'Do it yourself', cost: 'Free, plus your hours', time: 'A weekend or more', get: 'Whatever you manage to design', us: false },
]

const FAQ = [
  { q: 'Is it really a one-time payment?', a: 'Yes. Starter and the Complete Kit are paid once and the files are yours. Only the website plan, which is coming later, is monthly.' },
  { q: 'Can I ask for changes?', a: 'Yes. Founding members can ask for changes to their kit for 30 days after delivery.' },
  { q: 'Which files do I get?', a: 'Your logo as PNG, SVG and PDF plus a favicon, and your templates as ready-to-post images. The Complete Kit adds the brand guidelines PDF.' },
  { q: 'Do I own my logo?', a: 'Yes. Once you pay, the logo and files are yours to use for your business. The fonts are free for commercial use. Trademark registration is not included.' },
  { q: 'Is Hindi supported?', a: 'You can answer the questions in Hindi or Hinglish. The kit itself is in English for now; Hindi and Punjabi are planned.' },
]

const wrap = 'mx-auto max-w-[1180px] px-5 sm:px-8'
const band = 'py-[clamp(64px,10vw,112px)]'
const h2 = 'display text-[clamp(40px,10vw,68px)]'
const lede = 'mt-5 max-w-[46ch] text-[17px] leading-[1.7] text-mist'

function KitGroup({ title, price, note, items }: { title: string; price: string; note: string; items: typeof KIT }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-cream pb-3">
        <h3 className="display text-[30px]">{title}</h3>
        <p className="display text-[30px] text-saffron">{price}</p>
      </div>
      <p className="mt-3 text-[14px] text-mist">{note}</p>
      <ul className="mt-2">
        {items.map(k => (
          <li key={k.name} className="border-b border-line py-4">
            <h4 className="text-[18px] font-medium text-cream">{k.name}</h4>
            <p className="mt-1 text-[15.5px] leading-relaxed text-mist">{k.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Home() {
  return (
    <div className="site min-h-screen bg-ink text-cream">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>

      <header className="sticky top-0 z-40 bg-ink">
        <div className={`${wrap} flex h-16 items-center justify-between`}>
          <a href="#main" className="display text-[26px] tracking-[-0.01em]">Brand<span className="text-saffron">In30</span></a>
          <Button asChild><a href="#join">Get early access</a></Button>
        </div>
      </header>

      <main id="main">
        <section className="on-saffron bg-saffron text-ink">
          <div className={`${wrap} grid gap-10 pb-14 pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14 lg:pb-24 lg:pt-20`}>
            <div className="min-w-0">
              <p className="rise inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[13.5px] font-medium text-saffron-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-saffron" aria-hidden="true" />
                Founding members: first {FOUNDING_SPOTS} kits at {rupee(PRICES.founding)}
              </p>
              <h1 className="rise display mt-6 text-[clamp(64px,19vw,96px)] leading-[0.86]" style={{ '--i': 1 } as React.CSSProperties}>
                Fire your branding agency.
              </h1>
              <p className="rise mt-6 max-w-[34ch] text-[19px] font-medium leading-[1.55] text-rust sm:text-[20px]" style={{ '--i': 2 } as React.CSSProperties}>
                Answer 5 questions. Get your logo, colours, fonts, Instagram posts, WhatsApp kit and business card. Agencies charge ₹30,000 or more for the same work.
              </p>
              <div className="rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ '--i': 3 } as React.CSSProperties}>
                <Button asChild variant="ink" size="xl"><a href="#pricing">Become a founding member <ArrowRight aria-hidden="true" /></a></Button>
                <Button asChild variant="outline-ink" size="xl"><a href="#join">Join the free waitlist</a></Button>
              </div>
              <ul className="rise mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] font-medium text-rust" style={{ '--i': 4 } as React.CSSProperties}>
                {['One-time price', 'No design skills needed', 'Made for businesses in India'].map(t => (
                  <li key={t} className="inline-flex items-center gap-2"><Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rise min-w-0" style={{ '--i': 3 } as React.CSSProperties}><NamePreview /></div>
          </div>
        </section>

        <section aria-labelledby="kit-title">
          <div className={`${wrap} ${band}`}>
            <h2 id="kit-title" className={`${h2} max-w-[16ch]`}>Everything a new business needs to look established.</h2>
            <p className={lede}>Starter covers the essentials. The Complete Kit adds everything you need to post, print and hand to a designer.</p>
            <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
              <KitGroup title="Starter" price={rupee(PRICES.starter)} note="One time. The essentials." items={KIT.filter(k => k.starter)} />
              <KitGroup title="Complete Kit" price={rupee(PRICES.founding)} note={`One time. Everything in Starter, plus these. ${rupee(PRICES.complete)} after the first ${FOUNDING_SPOTS} kits.`} items={KIT.filter(k => !k.starter)} />
            </div>
          </div>
        </section>

        <section className="bg-coal" aria-labelledby="how-title">
          <div className={`${wrap} ${band}`}>
            <h2 id="how-title" className={h2}>Five questions in. A brand out.</h2>
            <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {STEPS.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[56px_minmax(0,1fr)] gap-x-4 md:block">
                  <span className="display block text-[84px] leading-[0.8] text-saffron md:text-[112px]" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3 className="display text-[28px] md:mt-5">{s.title}</h3>
                    <p className="mt-3 max-w-[38ch] text-[16px] leading-[1.7] text-mist">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="compare-title">
          <div className={`${wrap} ${band}`}>
            <h2 id="compare-title" className={h2}>What a brand usually costs.</h2>
            <div className="mt-10 hidden overflow-hidden rounded-2xl border border-line md:block">
              <table className="w-full text-left text-[16px]">
                <thead>
                  <tr className="bg-coal text-[14px] text-mist">
                    <th scope="col" className="px-6 py-4 font-medium">Option</th><th scope="col" className="px-6 py-4 font-medium">Typical cost</th><th scope="col" className="px-6 py-4 font-medium">Time</th><th scope="col" className="px-6 py-4 font-medium">What you get</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(c => (
                    <tr key={c.who} className={c.us ? 'bg-saffron font-medium text-ink' : 'border-t border-line'}>
                      <th scope="row" className={`px-6 py-5 ${c.us ? 'font-bold' : 'font-medium text-cream'}`}>{c.who}</th>
                      <td className={`px-6 py-5 ${c.us ? '' : 'text-cream'}`}>{c.cost}</td><td className={`px-6 py-5 ${c.us ? '' : 'text-mist'}`}>{c.time}</td><td className={`px-6 py-5 ${c.us ? '' : 'text-mist'}`}>{c.get}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-8 flex flex-col gap-3 md:hidden">
              {COMPARE.map(c => (
                <li key={c.who} className={`rounded-2xl p-5 ${c.us ? 'bg-saffron text-ink' : 'bg-coal'}`}>
                  <h3 className={`text-[15px] font-medium ${c.us ? 'text-rust' : 'text-mist'}`}>{c.who}</h3>
                  <p className="display mt-1.5 text-[28px] leading-[1.05]">{c.cost}</p>
                  <p className={`mt-2 text-[15px] ${c.us ? 'font-medium text-rust' : 'text-mist'}`}>{c.time} · {c.get}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13.5px] text-mist">Agency, freelancer and do-it-yourself figures are typical ranges in India and vary by city and scope.</p>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-16 bg-coal" aria-labelledby="pricing-title">
          <div className={`${wrap} ${band}`}>
            <h2 id="pricing-title" className={h2}>Pay once. It’s yours.</h2>
            <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:items-stretch">
              <article className="on-saffron flex flex-col rounded-2xl bg-saffron p-6 text-ink sm:p-7 lg:order-2">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[17px] font-bold">Complete Kit</h3>
                  <Badge className="bg-ink px-3 py-1 text-[12.5px] font-bold text-saffron-soft">Founding price</Badge>
                </div>
                <p className="display mt-5 text-[76px] leading-[0.85]">{rupee(PRICES.founding)}</p>
                <p className="mt-3 text-[14.5px] font-medium text-rust"><s>{rupee(PRICES.complete)}</s> after the first {FOUNDING_SPOTS} kits · One time</p>
                <ul className="mt-6 flex flex-col gap-3 text-[16px] font-medium">
                  <li className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={3} aria-hidden="true" />Everything in Starter</li>
                  {KIT.filter(k => !k.starter).map(k => <li key={k.name} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={3} aria-hidden="true" />{k.name}</li>)}
                  <li className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={3} aria-hidden="true" />Delivered on WhatsApp within 48 hours</li>
                </ul>
                <div className="mt-auto pt-8">
                  <PlanButton plan="complete" href={PAY_COMPLETE_URL || undefined} variant="ink" className="w-full">
                    {PAY_COMPLETE_URL ? `Pre-order for ${rupee(PRICES.founding)}` : `Reserve at ${rupee(PRICES.founding)}`}
                  </PlanButton>
                </div>
              </article>

              <article className="flex flex-col rounded-2xl bg-ink p-6 sm:p-7 lg:order-1">
                <h3 className="text-[17px] font-bold">Starter</h3>
                <p className="display mt-5 text-[76px] leading-[0.85]">{rupee(PRICES.starter)}</p>
                <p className="mt-3 text-[14.5px] text-mist">One time</p>
                <ul className="mt-6 flex flex-col gap-3 text-[16px]">
                  {KIT.filter(k => k.starter).map(k => <li key={k.name} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-saffron" aria-hidden="true" />{k.name}</li>)}
                </ul>
                <div className="mt-auto pt-8">
                  <PlanButton plan="starter" href={PAY_STARTER_URL || undefined} variant="outline" className="w-full">
                    {PAY_STARTER_URL ? `Pre-order for ${rupee(PRICES.starter)}` : 'Reserve Starter'}
                  </PlanButton>
                </div>
              </article>

              <article className="flex flex-col rounded-2xl border border-dashed border-input p-6 sm:p-7 lg:order-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[17px] font-bold">Kit + Website</h3>
                  <Badge variant="secondary" className="px-3 py-1 text-[12.5px] text-mist">Coming soon</Badge>
                </div>
                <p className="display mt-5 text-[76px] leading-[0.85] text-mist">{rupee(PRICES.website)}<span className="text-[24px]"> /month</span></p>
                <p className="mt-3 text-[14.5px] text-mist">Not on sale yet. After buying the Complete Kit.</p>
                <ul className="mt-6 flex flex-col gap-3 text-[16px] text-mist">
                  {['A one-page website in your brand', 'Enquiries sent to your WhatsApp', 'Update it by sending a WhatsApp message', 'A monthly report of visitors and enquiries'].map(t => <li key={t} className="flex gap-3"><Minus className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />{t}</li>)}
                </ul>
                <div className="mt-auto pt-8">
                  <PlanButton plan="website" variant="outline" className="w-full">Tell me when it opens</PlanButton>
                </div>
              </article>
            </div>
            {!PAY_COMPLETE_URL && <p className="mt-5 text-[14.5px] text-mist">Online payment opens shortly. Reserving holds your founding price; you pay nothing now.</p>}
          </div>
        </section>

        <section aria-labelledby="faq-title">
          <div className={`${wrap} ${band} grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16`}>
            <h2 id="faq-title" className={h2}>Questions people ask.</h2>
            <Accordion type="single" collapsible className="border-t border-line">
              {FAQ.map(f => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent className="max-w-[62ch] text-[16.5px] leading-[1.7] text-mist">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="join" className="on-saffron scroll-mt-16 bg-saffron text-ink" aria-labelledby="join-title">
          <div className={`${wrap} ${band} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16`}>
            <div>
              <h2 id="join-title" className={`${h2} max-w-[13ch]`}>Get your brand before your competitor does.</h2>
              <p className="mt-5 max-w-[40ch] text-[18px] font-medium leading-[1.6] text-rust">Leave your WhatsApp number. The first {FOUNDING_SPOTS} people to order get the Complete Kit at {rupee(PRICES.founding)} in place of {rupee(PRICES.complete)}.</p>
            </div>
            <div className="on-ink rounded-2xl bg-ink p-5 text-cream sm:p-8"><WaitlistForm /></div>
          </div>
        </section>
      </main>

      <footer>
        <div className={`${wrap} flex flex-col gap-3 py-8 text-[14px] text-mist sm:flex-row sm:items-center sm:justify-between`}>
          <span className="display text-[22px] text-cream">Brand<span className="text-saffron">In30</span></span>
          <span>A product of The Growth Lab · Mohali, Punjab</span>
          <span>© 2026 BrandIn30</span>
        </div>
      </footer>

      {WHATSAPP_NUMBER && (
        <a href={`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi BrandIn30, I have a question')}`} target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp"
          className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#06260f] shadow-[0_4px_8px_rgba(0,0,0,.45)]">
          <MessageCircle className="h-7 w-7" aria-hidden="true" />
        </a>
      )}
    </div>
  )
}
