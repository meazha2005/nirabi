import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function HomeProjectsSpotlight() {
  const spotlight = projects.slice(1, 4);

  return (
    <section className="relative border-b border-white/10 bg-[#0A0A09] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              Our Recent Work
            </span>
            <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
              Completed Projects in Chennai
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold/80 transition-colors hover:text-gold"
          >
            <span>View All Projects</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 3-Column Projects Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {spotlight.map((project, i) => (
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
                <div className="absolute top-3 left-3 border border-white/10 bg-[#080808]/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
                  0{i + 2}
                </div>
              </div>

              <div className="p-6">
                <span className="font-mono text-[10px] uppercase tracking-wider text-gold/80 font-medium">
                  {project.category} · {project.location}
                </span>
                <h3 className="mt-2 font-display text-xl text-ivory transition-colors group-hover:text-gold">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ivory/70 line-clamp-2">
                  {project.concept}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-medium text-ivory/60">
                  <span>Area: {project.sizeSqft} sq.ft</span>
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
