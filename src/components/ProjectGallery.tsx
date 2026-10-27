"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, projectCategories } from "@/data/projects";

export default function ProjectGallery() {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>("All");

  const filtered = useMemo(
    () => (category === "All" ? projects : projects.filter((p) => p.category === category)),
    [category]
  );

  return (
    <section className="relative border-b border-white/10 bg-[#080808] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
            Filter by Category
          </span>

          <div className="flex flex-wrap gap-2">
            {projectCategories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-all ${
                    active
                      ? "border-gold bg-gold text-near-black font-semibold"
                      : "border-white/10 bg-[#0E0E0D] text-ivory/60 hover:border-white/30 hover:text-ivory"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Architectural Portfolio Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group flex flex-col justify-between border border-white/10 bg-[#0C0C0B] transition-colors hover:border-gold/30 hover:bg-[#121211]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141413]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.heroImage}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#080808]/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-gold border border-white/10">
                  {project.category}
                </div>
              </div>

              <div className="p-6">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ivory/50">
                  {project.location} · {project.year}
                </span>
                <h3 className="mt-2 font-display text-xl text-ivory transition-colors group-hover:text-gold">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ivory/60 line-clamp-2">
                  {project.concept}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-medium text-ivory/60">
                  <span>{project.sizeSqft} sq.ft</span>
                  <span className="inline-flex items-center gap-1 font-semibold uppercase tracking-wider text-[11px] text-gold group-hover:text-gold-light">
                    <span>View Project</span>
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
