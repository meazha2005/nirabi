import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import TextReveal from "@/components/animations/TextReveal";
import { projects } from "@/data/projects";
import { Layers, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function BeforeAfterSection() {
  const project = projects.find((p) => p.beforeImage && p.afterImage) ?? projects[1];

  return (
    <section className="relative overflow-hidden border-t border-surface-border bg-gradient-to-b from-[#080808] via-[#0E0E0E] to-[#080808] py-24 lg:py-32">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              <Layers size={13} />
              <span>Architectural Metamorphosis</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight">
              From Raw Concept to Refined Reality
            </h2>
          </div>
          <p className="text-sm text-ivory/65 max-w-md leading-relaxed">
            Witness how NIRABI transforms raw concrete volumes into warm, curated architectural living environments with tailored joinery and luminous materials.
          </p>
        </div>

        {/* The Slider Component */}
        <BeforeAfterSlider
          beforeSrc={project.beforeImage || "/images/projects/apartment/before.jpg"}
          afterSrc={project.afterImage || "/images/projects/apartment/after.jpg"}
          beforeLabel="Bare Concrete Shell"
          afterLabel="Turnkey Architectural Delivery"
        />

        {/* Specification Card Below Slider */}
        <div className="mt-10 grid gap-6 rounded-3xl border border-white/10 bg-[#121212]/90 p-8 shadow-xl backdrop-blur-md lg:grid-cols-3 lg:items-center">
          <div className="lg:col-span-2">
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Featured Commission</span>
            <h3 className="mt-1 font-display text-2xl text-ivory sm:text-3xl">{project.title}</h3>
            <p className="mt-2 text-xs sm:text-sm text-ivory/70 leading-relaxed max-w-2xl">
              {project.concept}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-ivory/60">
              <span className="flex items-center gap-1.5 text-gold">
                <CheckCircle2 size={14} /> Full Turnkey Joinery
              </span>
              <span className="flex items-center gap-1.5 text-gold">
                <CheckCircle2 size={14} /> Custom Lighting Integration
              </span>
              <span className="flex items-center gap-1.5 text-gold">
                <CheckCircle2 size={14} /> Precision Acoustic Partitioning
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 border-t border-surface-border pt-6 lg:border-t-0 lg:border-l lg:border-surface-border lg:pl-8 lg:pt-0">
            <div className="text-left lg:text-right">
              <div className="text-[11px] uppercase tracking-wider text-ivory/50">Location & Size</div>
              <div className="font-semibold text-ivory text-sm mt-0.5">{project.location} · {project.sizeSqft} sq.ft</div>
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-xs font-semibold text-gold transition-all hover:bg-gold hover:text-near-black shadow-md"
            >
              <span>Explore Case Study</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
