export default function AboutSection() {
  return (
    <section className="relative border-b border-white/10 bg-[#080808] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Two-Column Section */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              About Our Studio
            </span>
            <h2 className="mt-4 font-display text-3xl leading-snug text-ivory sm:text-4xl lg:text-5xl">
              Quality interiors built with honest craftsmanship.
            </h2>
            <div className="mt-6 border-l border-gold/40 pl-4">
              <p className="font-display text-base italic text-gold/90">
                &ldquo;We don&rsquo;t just decorate rooms. We build practical, beautiful homes where families love to live.&rdquo;
              </p>
            </div>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-ivory/80 lg:col-span-7">
            <p>
              NIRABI DESIGN STUDIO is an interior design and turnkey construction company based in Madipakkam, Chennai. We design and build complete interiors for independent villas, residential flats, duplexes, and commercial spaces across Chennai.
            </p>
            <p>
              We believe that good home interior should be practical, long-lasting, and stress-free. We listen to what you need, design floor layouts with plenty of walking space and natural light, and show you photorealistic 3D views so you can visualize everything clearly before execution starts.
            </p>
            <p>
              Instead of outsourcing to unpredictable local subcontractors, NIRABI works with our own experienced carpenters, stone masons, false ceiling technicians, and painters. We take single-point responsibility for quality, schedule, and clean site handover.
            </p>

            {/* Studio Metrics Matrix */}
            <div className="mt-8 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
              <div className="bg-[#0C0C0B] p-4 text-center">
                <span className="font-display text-2xl font-bold text-gold">120+</span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-ivory/60">Homes Built</span>
              </div>
              <div className="bg-[#0C0C0B] p-4 text-center">
                <span className="font-display text-2xl font-bold text-gold">150k+</span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-ivory/60">Sq. Ft. Completed</span>
              </div>
              <div className="bg-[#0C0C0B] p-4 text-center">
                <span className="font-display text-2xl font-bold text-gold">100%</span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-ivory/60">Turnkey Delivery</span>
              </div>
              <div className="bg-[#0C0C0B] p-4 text-center">
                <span className="font-display text-2xl font-bold text-gold">Chennai</span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-ivory/60">Madipakkam Studio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Image Frame */}
        <div className="mt-16 overflow-hidden rounded-sm border border-white/10 bg-[#121211]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/generated/service_turnkey.jpg"
            alt="NIRABI DESIGN STUDIO carpentry and turnkey execution"
            loading="lazy"
            decoding="async"
            className="aspect-[21/9] w-full object-cover brightness-[0.85]"
          />
        </div>
      </div>
    </section>
  );
}
