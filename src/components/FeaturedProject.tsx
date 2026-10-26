import Link from "next/link";
import MaskReveal from "@/components/animations/MaskReveal";
import TextReveal from "@/components/animations/TextReveal";
import { projects } from "@/data/projects";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";

export default function FeaturedProject() {
  const project = projects[0];

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-gold">
            <Sparkles size={12} />
            <TextReveal className="eyebrow text-gold">Flagship Commission</TextReveal>
          </div>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl text-ivory">
            {project.title}
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-ivory/60 font-mono">
          <Compass size={14} className="text-gold" />
          <span>{project.location} · {project.sizeSqft} SQ.FT · YEAR {project.year}</span>
        </div>
      </div>

      {/* Cinematic Showcase Container */}
      <Link href={`/projects/${project.slug}`} data-cursor="view" className="group relative block">
        <div className="relative overflow-hidden rounded-3xl border border-surface-border bg-surface-card shadow-2xl transition-all duration-700 hover:border-gold/50">
          <MaskReveal
            src={project.heroImage}
            alt={project.title}
            className="aspect-[16/10] sm:aspect-[21/10] w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
          />

          {/* Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/20 to-transparent pointer-events-none" />

          {/* Floating Glassmorphic Details Card */}
          <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 rounded-2xl border border-white/10 bg-[#0E0E0E]/80 p-6 backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:border-gold/40">
            <div className="max-w-xl">
              <span className="inline-block rounded-full bg-gold/15 border border-gold/30 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold mb-2">
                {project.category} Architecture
              </span>
              <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-normal">
                {project.concept}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-bold text-near-black uppercase tracking-wider transition-all duration-300 group-hover:bg-gold-light group-hover:shadow-gold-glow shrink-0">
              <span>View Case Study</span>
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
