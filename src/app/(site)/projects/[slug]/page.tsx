import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import MaskReveal from "@/components/animations/MaskReveal";
import TextReveal from "@/components/animations/TextReveal";
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Layers, Compass, Ruler, Calendar, MapPin } from "lucide-react";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — NIRABI DESIGN STUDIO`,
    description: project.concept,
    openGraph: { title: project.title, description: project.concept, images: [project.heroImage] },
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const index = projects.findIndex((p) => p.slug === params.slug);
  if (index === -1) return notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      {/* Hero Case Study Header */}
      <section className="relative flex min-h-[75vh] items-end bg-[#080808] pt-32 pb-16 lg:pb-24 overflow-hidden border-b border-surface-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.heroImage}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover opacity-45 filter contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10 text-ivory">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-light mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Back to All Projects
          </Link>

          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-near-black/80 border border-gold/40 px-3.5 py-1 text-xs font-semibold text-gold uppercase tracking-wider backdrop-blur-md">
            <Sparkles size={11} />
            <span>{project.category} Architecture</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-ivory">
            {project.title}
          </h1>

          {/* Telemetry Specs Bar */}
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 rounded-2xl border border-white/10 bg-[#121212]/80 p-4 text-xs backdrop-blur-md">
            <div className="flex items-center gap-2 text-ivory/80">
              <MapPin size={15} className="text-gold" />
              <span>Location: <strong className="text-ivory font-medium">{project.location}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-ivory/80">
              <Ruler size={15} className="text-gold" />
              <span>Total Footprint: <strong className="text-ivory font-medium">{project.sizeSqft} sq.ft</strong></span>
            </div>
            <div className="flex items-center gap-2 text-ivory/80">
              <Calendar size={15} className="text-gold" />
              <span>Handover Year: <strong className="text-ivory font-medium">{project.year}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Narrative Section */}
      <section className="relative mx-auto max-w-5xl px-6 py-20 lg:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold mb-3 block">
            Spatial Concept & Intent
          </span>
          <p className="font-display text-2xl sm:text-3xl lg:text-4xl leading-relaxed text-ivory font-light italic">
            &ldquo;{project.concept}&rdquo;
          </p>
        </div>

        {/* 4 Architectural Pillars Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#121212] p-8 transition-all hover:border-gold/40">
            <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider">
              <Layers size={14} />
              <span>Material Palette</span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-ivory/80 leading-relaxed font-light">
              {project.materials}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#121212] p-8 transition-all hover:border-gold/40">
            <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider">
              <Compass size={14} />
              <span>Design Approach</span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-ivory/80 leading-relaxed font-light">
              {project.designApproach}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#121212] p-8 transition-all hover:border-gold/40">
            <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Engineering Considerations</span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-ivory/80 leading-relaxed font-light">
              {project.challenges}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#121212] p-8 transition-all hover:border-gold/40">
            <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 size={14} />
              <span>Turnkey Result</span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-ivory/80 leading-relaxed font-light">
              {project.result}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Showcase Grid */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="mb-10 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-1 block">
            Visual Documentation
          </span>
          <h2 className="font-display text-3xl text-ivory">Spatial Photography</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.gallery.map((src, i) => (
            <div
              key={src}
              className="overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-xl group"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <MaskReveal
                  src={src}
                  alt={`${project.title} — detail ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Next Project Footer Bar */}
      <section className="border-t border-surface-border bg-[#0A0A0A] py-16">
        <Link
          href={`/projects/${next.slug}`}
          data-cursor="view"
          className="group mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10"
        >
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Next Commission</div>
            <div className="mt-2 font-display text-3xl sm:text-4xl text-ivory transition-transform duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-gold">
              {next.title} →
            </div>
          </div>
          <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold group-hover:bg-gold group-hover:text-near-black transition-colors">
            <ArrowRight size={20} />
          </div>
        </Link>
      </section>
    </>
  );
}
