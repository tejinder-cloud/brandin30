import { Check, MessageCircle, Minus, Plus } from 'lucide-react'
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

const cta = 'inline-flex h-14 items-center justify-center rounded-full px-7 text-[16px] font-bold transition-opacity hover:opacity-90'

export default function Home() {
  return (
    <div className="site min-h-screen bg-ink text-cream">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-saffron focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>

      <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-8">
          <a href="#main" className="font-display text-[21px] font-extrabold tracking-tight">Brand<span className="text-saffron">In30</span></a>
          <a href="#join" className="inline-flex h-11 items-center rounded-full bg-saffron px-5 text-[14px] font-bold text-ink hover:opacity-90">Get early access</a>
        </div>
      </header>

      <main id="main">
        <section className="mx-auto grid max-w-[1180px] gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14 lg:pb-24 lg:pt-16">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#4a2f10] bg-ember px-4 py-1.5 text-[13.5px] font-medium text-saffron-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-saffron" aria-hidden="true" />
              Founding members: first {FOUNDING_SPOTS} kits at {rupee(PRICES.founding)}
            </p>
            <h1 className="mt-6 font-display text-[clamp(44px,11.5vw,84px)] font-extrabold leading-[0.92] tracking-[-0.035em]">
              Fire your <span className="text-saffron">branding</span> agency.
            </h1>
            <p className="mt-6 max-w-[540px] text-[18px] leading-[1.65] text-mist">
              Answer 5 questions. Get your <span className="text-cream">logo, colours, fonts, Instagram posts, WhatsApp kit and business card</span>. Agencies charge ₹30,000 or more for the same work.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#pricing" className={`${cta} bg-saffron text-ink`}>Become a founding member</a>
              <a href="#join" className={`${cta} border border-line text-cream hover:border-[#555]`}>Join the free waitlist</a>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-mist">
              {['One-time price', 'No design skills needed', 'Made for businesses in India'].map(t => (
                <li key={t} className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-saffron" aria-hidden="true" />{t}</li>
              ))}
            </ul>
          </div>
          <NamePreview />
        </section>

        <section className="border-t border-line" aria-labelledby="kit-title">
          <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 lg:py-24">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
              <div>
                <p className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-saffron">What’s in the kit</p>
                <h2 id="kit-title" className="mt-4 font-display text-[clamp(32px,6.5vw,40px)] font-extrabold leading-[1.02] tracking-[-0.03em]">Everything a new business needs to look established.</h2>
                <p className="mt-5 max-w-[420px] text-[17px] leading-[1.65] text-mist">Starter covers the essentials. The Complete Kit adds everything you need to post, print and hand to a designer.</p>
              </div>
              <ol className="border-t border-line">
                {KIT.map((k, i) => (
                  <li key={k.name} className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-3 border-b border-line py-5 sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:items-baseline">
                    <span className="font-display text-[15px] font-bold text-[#77776f]" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-[18px] font-medium text-cream">{k.name}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-mist">{k.detail}</p>
                    </div>
                    <span className={`col-start-2 mt-2 w-fit rounded-full px-3 py-1 text-[12px] font-medium sm:col-start-3 sm:mt-0 ${k.starter ? 'bg-[#1f1f1f] text-mist' : 'bg-ember text-saffron-soft'}`}>{k.starter ? 'Starter and Complete' : 'Complete Kit'}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-coal" aria-labelledby="how-title">
          <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 lg:py-24">
            <p className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-saffron">How it works</p>
            <h2 id="how-title" className="mt-4 max-w-[720px] font-display text-[clamp(31px,6.5vw,60px)] font-extrabold leading-[0.98] tracking-[-0.03em]">Five questions in. A brand out.</h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className="border-t-2 border-saffron pt-5">
                  <span className="font-display text-[15px] font-bold text-saffron-soft">Step {i + 1}</span>
                  <h3 className="mt-2 font-display text-[24px] font-bold leading-tight">{s.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.65] text-mist">{s.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-line" aria-labelledby="compare-title">
          <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 lg:py-24">
            <p className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-saffron">Your options</p>
            <h2 id="compare-title" className="mt-4 max-w-[720px] font-display text-[clamp(31px,6.5vw,60px)] font-extrabold leading-[0.98] tracking-[-0.03em]">What a brand usually costs.</h2>
            <div className="mt-9 hidden overflow-hidden rounded-2xl border border-line md:block">
              <table className="w-full text-left text-[15.5px]">
                <thead>
                  <tr className="bg-coal text-[12.5px] uppercase tracking-[0.12em] text-mist">
                    <th scope="col" className="px-6 py-4 font-bold">Option</th><th scope="col" className="px-6 py-4 font-bold">Typical cost</th><th scope="col" className="px-6 py-4 font-bold">Time</th><th scope="col" className="px-6 py-4 font-bold">What you get</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(c => (
                    <tr key={c.who} className={`border-t border-line ${c.us ? 'bg-ember' : ''}`}>
                      <th scope="row" className={`px-6 py-5 font-medium ${c.us ? 'text-saffron-soft' : 'text-cream'}`}>{c.who}</th>
                      <td className="px-6 py-5 text-cream">{c.cost}</td><td className="px-6 py-5 text-mist">{c.time}</td><td className="px-6 py-5 text-mist">{c.get}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-8 flex flex-col gap-3 md:hidden">
              {COMPARE.map(c => (
                <li key={c.who} className={`rounded-2xl border p-5 ${c.us ? 'border-[#4a2f10] bg-ember' : 'border-line bg-coal'}`}>
                  <h3 className={`text-[18px] font-medium ${c.us ? 'text-saffron-soft' : 'text-cream'}`}>{c.who}</h3>
                  <p className="mt-1 text-[17px] text-cream">{c.cost}</p>
                  <p className="mt-1 text-[15px] text-mist">{c.time} · {c.get}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] text-[#8c8c84]">Agency, freelancer and do-it-yourself figures are typical ranges in India and vary by city and scope.</p>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-16 border-t border-line bg-coal" aria-labelledby="pricing-title">
          <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 lg:py-24">
            <p className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-saffron">Pricing</p>
            <h2 id="pricing-title" className="mt-4 max-w-[720px] font-display text-[clamp(31px,6.5vw,60px)] font-extrabold leading-[0.98] tracking-[-0.03em]">Pay once. It’s yours.</h2>
            <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:items-stretch">
              <article className="flex flex-col rounded-3xl border border-line bg-ink p-7">
                <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-mist">Starter</h3>
                <p className="mt-4 font-display text-[52px] font-extrabold leading-none tracking-[-0.03em]">{rupee(PRICES.starter)}</p>
                <p className="mt-2 text-[14px] text-mist">One time</p>
                <ul className="mt-6 flex flex-col gap-3 text-[15.5px]">
                  {KIT.filter(k => k.starter).map(k => <li key={k.name} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-saffron" aria-hidden="true" />{k.name}</li>)}
                </ul>
                <div className="mt-auto pt-8">
                  <PlanButton plan="starter" href={PAY_STARTER_URL || undefined} className={`${cta} w-full border border-line text-cream hover:border-[#555]`}>
                    {PAY_STARTER_URL ? `Pre-order for ${rupee(PRICES.starter)}` : 'Reserve Starter'}
                  </PlanButton>
                </div>
              </article>

              <article className="flex flex-col rounded-3xl bg-saffron p-7 text-ink">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.14em]">Complete Kit</h3>
                  <span className="rounded-full bg-ink px-3 py-1 text-[12px] font-bold text-saffron-soft">Founding price</span>
                </div>
                <p className="mt-4 font-display text-[52px] font-extrabold leading-none tracking-[-0.03em]">{rupee(PRICES.founding)}</p>
                <p className="mt-2 text-[14px] font-medium"><span className="line-through">{rupee(PRICES.complete)}</span> after the first {FOUNDING_SPOTS} kits · One time</p>
                <ul className="mt-6 flex flex-col gap-3 text-[15.5px] font-medium">
                  <li className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />Everything in Starter</li>
                  {KIT.filter(k => !k.starter).map(k => <li key={k.name} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />{k.name}</li>)}
                  <li className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />Delivered on WhatsApp within 48 hours</li>
                </ul>
                <div className="mt-auto pt-8">
                  <PlanButton plan="complete" href={PAY_COMPLETE_URL || undefined} className={`${cta} w-full bg-ink text-saffron-soft`}>
                    {PAY_COMPLETE_URL ? `Pre-order for ${rupee(PRICES.founding)}` : `Reserve at ${rupee(PRICES.founding)}`}
                  </PlanButton>
                </div>
              </article>

              <article className="flex flex-col rounded-3xl border border-dashed border-[#444] bg-ink p-7">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-mist">Kit + Website</h3>
                  <span className="rounded-full bg-[#1f1f1f] px-3 py-1 text-[12px] font-medium text-mist">Coming soon</span>
                </div>
                <p className="mt-4 font-display text-[52px] font-extrabold leading-none tracking-[-0.03em]">{rupee(PRICES.website)}<span className="text-[20px] font-bold text-mist"> /month</span></p>
                <p className="mt-2 text-[14px] text-mist">After buying the Complete Kit</p>
                <ul className="mt-6 flex flex-col gap-3 text-[15.5px]">
                  {['A one-page website in your brand', 'Enquiries sent to your WhatsApp', 'Update it by sending a WhatsApp message', 'A monthly report of visitors and enquiries'].map(t => <li key={t} className="flex gap-3"><Minus className="mt-0.5 h-5 w-5 shrink-0 text-[#77776f]" aria-hidden="true" />{t}</li>)}
                </ul>
                <div className="mt-auto pt-8">
                  <PlanButton plan="website" className={`${cta} w-full border border-line text-cream hover:border-[#555]`}>Tell me when it opens</PlanButton>
                </div>
              </article>
            </div>
            {!PAY_COMPLETE_URL && <p className="mt-5 text-[14px] text-mist">Online payment opens shortly. Reserving holds your founding price; you pay nothing now.</p>}
          </div>
        </section>

        <section className="border-t border-line" aria-labelledby="faq-title">
          <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16 lg:py-24">
            <h2 id="faq-title" className="font-display text-[clamp(32px,6.5vw,40px)] font-extrabold leading-[1.02] tracking-[-0.03em]">Questions people ask.</h2>
            <div className="border-t border-line">
              {FAQ.map(f => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex min-h-16 items-center justify-between gap-4 py-4 text-[18px] font-medium">
                    {f.q}
                    <Plus className="faq-plus h-5 w-5 shrink-0 text-saffron transition-transform" aria-hidden="true" />
                  </summary>
                  <p className="max-w-[640px] pb-5 text-[16px] leading-[1.7] text-mist">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="join" className="scroll-mt-16 border-t border-line bg-coal" aria-labelledby="join-title">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
            <div>
              <p className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-saffron">Early access</p>
              <h2 id="join-title" className="mt-4 font-display text-[clamp(32px,6.5vw,40px)] font-extrabold leading-[1.02] tracking-[-0.03em]">Get your brand before your competitor does.</h2>
              <p className="mt-5 max-w-[460px] text-[17px] leading-[1.65] text-mist">Leave your WhatsApp number. The first {FOUNDING_SPOTS} people to order get the Complete Kit at {rupee(PRICES.founding)} in place of {rupee(PRICES.complete)}.</p>
            </div>
            <div className="rounded-3xl border border-line bg-ink p-6 sm:p-8"><WaitlistForm /></div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-5 py-8 text-[14px] text-mist sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="font-display text-[18px] font-extrabold text-cream">Brand<span className="text-saffron">In30</span></span>
          <span>A product of The Growth Lab · Mohali, Punjab</span>
          <span>© 2026 BrandIn30</span>
        </div>
      </footer>

      {WHATSAPP_NUMBER && (
        <a href={`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi BrandIn30, I have a question')}`} target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp"
          className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#06260f] shadow-[0_6px_24px_rgba(0,0,0,.5)]">
          <MessageCircle className="h-7 w-7" aria-hidden="true" />
        </a>
      )}
    </div>
  )
}
