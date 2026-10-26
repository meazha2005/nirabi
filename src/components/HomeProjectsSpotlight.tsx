"use client";

import Link from "next/link";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";

export default function HomeProjectsSpotlight() {
  const spotlightProjects = projects.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-24 lg:py-32 border-t border-b border-surface-border">
      {/* Decorative architectural grid lines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              <Compass size={13} />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight">
              Curated Living Spaces
            </h2>
          </div>
          <Link
            href="/projects"
            data-cursor="explore"
            className="group inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-surface-card px-6 py-3 text-xs font-bold uppercase tracking-wider text-gold transition-all duration-300 hover:bg-gold hover:text-near-black hover:shadow-[0_0_25px_rgba(242,223,181,0.3)]"
          >
            <span>Explore All Commissions</span>
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {spotlightProjects.map((project, idx) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#121212] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-2xl"
            >
              {/* Media Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-near-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-108"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-near-black/85 backdrop-blur-md border border-gold/30 px-3 py-1 text-[10px] font-semibold text-gold uppercase tracking-wider">
                  <Sparkles size={10} />
                  <span>{project.category}</span>
                </div>

                {/* Index badge */}
                <div className="absolute top-4 right-4 z-10 rounded-full bg-near-black/70 backdrop-blur-md px-2.5 py-0.5 font-mono text-[10px] text-ivory/60 border border-white/10">
                  0{idx + 1}
                </div>
              </div>

              {/* Card Meta Description */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-2xl text-ivory group-hover:text-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-ivory/50 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-near-black">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-ivory/65 line-clamp-2 leading-relaxed">
                    {project.concept}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-[11px] text-ivory/50">
                  <span>{project.location}</span>
                  <span className="font-mono text-gold/80">{project.sizeSqft} sq.ft</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
