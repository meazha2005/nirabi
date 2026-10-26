import TextReveal from "@/components/animations/TextReveal";
import { Compass, Layers, ShieldCheck } from "lucide-react";

export default function Introduction() {
  const pillars = [
    {
      num: "01",
      title: "Spatial Purity",
      desc: "Fluid proportions, uncluttered circulation paths, and the intentional choreography of natural daylight.",
      icon: Compass,
    },
    {
      num: "02",
      title: "Material Honesty",
      desc: "Authentic American oak, honed travertine, fluted glass, and hand-finished brushed brass surfaces that age gracefully.",
      icon: Layers,
    },
    {
      num: "03",
      title: "Turnkey Precision",
      desc: "Complete architectural ownership from 3D visual renderings and shop drawings to factory joinery and white-glove handover.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-24 sm:py-32 border-b border-surface-border">
      {/* Subtle Background Watermark */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.02]">
        <span className="font-display text-[14rem] md:text-[22rem] font-bold text-white tracking-widest leading-none">
          NIRABI
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        {/* Editorial Manifesto Quote */}
        <div className="mx-auto max-w-4xl text-center">
          <TextReveal className="eyebrow text-gold">The Studio Manifesto</TextReveal>
          
          <TextReveal delay={0.1} as="p" className="mt-6 font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.25] text-ivory">
            We sculpt environments that transcend fleeting decoration — crafting spaces of stillness, proportion, and quiet grandeur.
          </TextReveal>

          <TextReveal delay={0.2} as="p" className="mt-5 font-serif italic text-xl sm:text-2xl text-gold">
            Interior architecture shaped around how you live, breathe, and gather.
          </TextReveal>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group relative overflow-hidden rounded-2xl border border-surface-border bg-surface-card p-8 transition-all duration-500 hover:border-gold/40 hover:bg-surface-elevated hover:-translate-y-1"
              >
                <div className="flex items-center justify-between pb-6 border-b border-surface-border">
                  <span className="font-mono text-xs font-semibold text-gold tracking-widest">
                    DISCIPLINE {pillar.num}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-110">
                    <Icon size={16} />
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-display text-xl font-semibold text-ivory transition-colors group-hover:text-gold">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-ivory/65">
                    {pillar.desc}
                  </p>
                </div>

                {/* Subtle Hover Accent Line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-500 ease-out-expo group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
