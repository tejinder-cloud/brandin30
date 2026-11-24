// Sample kits: one swipeable board per sample business.
// Renders nothing until SAMPLE_KITS in src/lib/site.ts has entries, so nothing fake is ever shown.

import { SAMPLE_KITS } from '@/lib/site'

export function SampleKits({ wrap, band, h2 }: { wrap: string; band: string; h2: string }) {
  if (SAMPLE_KITS.length === 0) return null
  return (
    <section id="samples" className="scroll-mt-16" aria-labelledby="samples-title">
      <div className={`${wrap} ${band}`}>
        <h2 id="samples-title" className={h2}>See what you get.</h2>
        <div className="mt-10 flex flex-col gap-14">
          {SAMPLE_KITS.map(kit => (
            <article key={kit.business}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="inline-block -rotate-2 rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-bold text-cream">Sample Kit</span>
                <h3 className="display text-[30px]">{kit.business}</h3>
                <p className="text-[15px] text-muted-foreground">{kit.type} · {kit.style}</p>
              </div>
              <ul className="-mx-5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8" aria-label={`Sample Kit for ${kit.business}`}>
                {kit.images.map(img => (
                  <li key={img.src} className="w-[78%] shrink-0 snap-center sm:w-[340px]">
                    <figure>
                      {/* Plain img: these are a handful of static files, sized by the row. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/5] w-full rounded-2xl border border-border bg-field object-cover" />
                      <figcaption className="mt-2 text-[14px] text-muted-foreground">{img.label}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
