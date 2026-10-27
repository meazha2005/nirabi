import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export default function BeforeAfterSection() {
  return (
    <section className="relative border-b border-white/10 bg-[#080808] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              Before &amp; After
            </span>
            <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
              Complete Home Transformation
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-ivory/70">
            Drag the slider left and right to see how we transform empty concrete rooms into ready-to-live homes.
          </p>
        </div>

        <div className="mt-8">
          <BeforeAfterSlider
            beforeSrc="/generated/renovation_before.jpg"
            afterSrc="/generated/renovation_after.jpg"
            beforeLabel="Before Work"
            afterLabel="Finished Home"
          />
        </div>

        <div className="mt-6 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-start">
          <div>
            <h3 className="font-display text-2xl text-ivory">Alwarpet Apartment Renovation</h3>
            <p className="mt-1 text-xs text-gold/80 font-mono uppercase tracking-wider">
              Alwarpet, Chennai · 3,400 sq.ft · Complete Turnkey Handover
            </p>
          </div>
          <p className="max-w-xl text-xs leading-relaxed text-ivory/75">
            We removed unwanted partition walls to open up the living and dining areas, laid new polished flooring, installed hidden warm cove lighting, and built custom storage wardrobes throughout the house.
          </p>
        </div>
      </div>
    </section>
  );
}
