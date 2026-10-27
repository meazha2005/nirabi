const PHASES = [
  {
    step: "01",
    phase: "Site Visit & Discussion",
    summary: "We visit your property, take accurate room measurements, and discuss what you and your family need.",
    deliverable: "Floor Measurements & Plan",
  },
  {
    step: "02",
    phase: "Layout Planning",
    summary: "We design smart room layouts showing where furniture, wardrobes, and kitchen cabinets fit best.",
    deliverable: "2D Furniture Layout Plan",
  },
  {
    step: "03",
    phase: "3D Visuals & Quotation",
    summary: "We show you photorealistic 3D views of each room so you can see colors, lights, and finishes before we start.",
    deliverable: "Realistic 3D Views & Clear Quote",
  },
  {
    step: "04",
    phase: "Material Selection",
    summary: "Together, we pick the right plywood, laminates, countertops, paints, and hardware fittings to match your budget.",
    deliverable: "Approved Material Samples",
  },
  {
    step: "05",
    phase: "Execution & Quality Check",
    summary: "Our carpenters, electricians, and painters work on-site under strict daily supervision with weekly photo updates.",
    deliverable: "Multi-Stage Quality Check",
  },
  {
    step: "06",
    phase: "Deep Clean & Handover",
    summary: "We carry out full deep cleaning, check all doors, drawers, and lights, and hand you the keys with our warranty.",
    deliverable: "Move-In Ready Home & Warranty",
  },
];

export default function DesignProcess() {
  return (
    <section className="relative border-b border-white/10 bg-[#0A0A09] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              How We Work
            </span>
            <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
              Our Simple 6-Step Process
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-ivory/70">
            From our first conversation to the day we hand over your keys, here is how we make it simple.
          </p>
        </div>

        {/* 6-Phase Grid */}
        <div className="mt-8 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {PHASES.map((p) => (
            <div
              key={p.step}
              className="group flex flex-col justify-between bg-[#0C0C0B] p-8 transition-colors hover:bg-[#121211]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-gold">STEP {p.step}</span>
                  <span className="font-mono text-[10px] uppercase text-ivory/50">0{p.step} of 06</span>
                </div>
                <h3 className="mt-4 font-display text-xl text-ivory transition-colors group-hover:text-gold">
                  {p.phase}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-ivory/70">
                  {p.summary}
                </p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ivory/50 block">What You Get</span>
                <span className="text-xs font-medium text-gold mt-0.5 block">{p.deliverable}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
