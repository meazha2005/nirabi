import { Layers, ArrowRight } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    subtitle: "Spatial Assessment",
    desc: "We analyze your physical floor plan, architectural orientation, natural light paths, and personal lifestyle rituals.",
  },
  {
    n: "02",
    title: "Consult",
    subtitle: "Aesthetic Blueprint",
    desc: "A focused dialogue establishing your design sensibility, material preferences, timeline requirements, and budget parameters.",
  },
  {
    n: "03",
    title: "Concept",
    subtitle: "3D Spatial Visualization",
    desc: "Photo-realistic 3D walkthroughs, lighting schemas, and physical material palette boards for your review.",
  },
  {
    n: "04",
    title: "Technical",
    subtitle: "CAD & Joinery Engineering",
    desc: "Millimeter-precise architectural drawings, plumbing, electrical, HVAC schematics, and custom furniture details.",
  },
  {
    n: "05",
    title: "Execute",
    subtitle: "Turnkey Craftsmanship",
    desc: "End-to-end on-site execution led by master carpenters and site engineers, with continuous quality checkpoints.",
  },
  {
    n: "06",
    title: "Handover",
    subtitle: "White-Glove Commissioning",
    desc: "Deep acoustic cleaning, final artisanal styling, comprehensive documentation, and 10-year warranty activation.",
  },
];

export default function DesignProcess() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#080808] border-t border-surface-border">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              <Layers size={13} />
              <span>Rigorous Methodology</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight">
              Six Steps from Plan to Sanctuary
            </h2>
          </div>
          <p className="text-sm text-ivory/65 max-w-md leading-relaxed">
            Our turnkey process eliminates intermediate friction. We own every phase from preliminary structural sketches to final white-glove handover.
          </p>
        </div>

        {/* Desktop 6-Card Horizontal Flow */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-4">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#121212] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-gold/50 hover:bg-[#161616] hover:shadow-2xl"
            >
              <div>
                <div className="font-mono text-3xl font-light text-gold/40 group-hover:text-gold transition-colors duration-300">
                  {step.n}
                </div>
                <div className="mt-4 font-display text-xl font-bold text-ivory group-hover:text-gold transition-colors">
                  {step.title}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-gold/80 font-mono mt-1">
                  {step.subtitle}
                </div>
              </div>
              <p className="mt-6 text-xs text-ivory/60 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile / Tablet Vertical Timeline */}
        <div className="flex flex-col lg:hidden space-y-6">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="relative flex gap-5 rounded-2xl border border-white/10 bg-[#121212] p-6 shadow-sm"
            >
              <div className="font-mono text-2xl font-bold text-gold shrink-0">
                {step.n}
              </div>
              <div>
                <div className="font-display text-xl font-bold text-ivory">{step.title}</div>
                <div className="text-[10px] uppercase tracking-wider text-gold/80 font-mono mt-0.5">
                  {step.subtitle}
                </div>
                <p className="mt-2 text-xs text-ivory/70 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
