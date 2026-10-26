"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";
import { projects, projectCategories } from "@/data/projects";

export default function ProjectGallery() {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>("All");

  const filtered = useMemo(
    () => (category === "All" ? projects : projects.filter((p) => p.category === category)),
    [category]
  );

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-[#080808]">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* Filter Pills Bar */}
        <div className="mb-14 flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-1">
              Curated Filter
            </div>
            <div className="text-xs text-ivory/50">
              Showing {filtered.length} Architectural Commissions
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {projectCategories.map((cat) => {
              const isSelected = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isSelected
                      ? "bg-gold text-near-black shadow-[0_0_20px_rgba(242,223,181,0.4)]"
                      : "border border-white/10 bg-[#121212] text-ivory/70 hover:border-gold/40 hover:text-ivory"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#121212] transition-all duration-500 hover:-translate-y-2 hover:border-gold/50 hover:shadow-2xl"
            >
              {/* Media Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-near-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-108"
                />
                
                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />

                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-near-black/85 backdrop-blur-md border border-gold/30 px-3 py-1 text-[10px] font-semibold text-gold uppercase tracking-wider">
                  <Sparkles size={10} />
                  <span>{project.category}</span>
                </div>

                <div className="absolute top-4 right-4 z-10 rounded-full bg-near-black/70 backdrop-blur-md px-2.5 py-0.5 font-mono text-[10px] text-ivory/60 border border-white/10">
                  {project.year}
                </div>
              </div>

              {/* Project Meta Information */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-2xl font-bold text-ivory group-hover:text-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-ivory/50 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-near-black">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>

                  <p className="mt-2.5 text-xs text-ivory/65 line-clamp-2 leading-relaxed">
                    {project.concept}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-[11px] text-ivory/50">
                  <span className="flex items-center gap-1.5">
                    <span className="text-gold">•</span> {project.location}
                  </span>
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
