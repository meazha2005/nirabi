import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function FeaturedProject() {
  const project = projects[0];

  return (
    <section className="relative border-b border-white/10 bg-[#080808] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Metadata */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              Featured Project
            </span>
            <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
              {project.title}
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

        {/* Hero Architectural Visual Frame */}
        <div className="mt-8">
          <Link href={`/projects/${project.slug}`} className="group block">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-white/10 bg-[#121211] lg:aspect-[21/9]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.heroImage}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                    {project.category} · {project.location}
                  </span>
                  <h3 className="mt-1 font-display text-2xl text-ivory transition-colors group-hover:text-gold sm:text-4xl">
                    {project.title}
                  </h3>
                </div>

                <span className="inline-flex items-center gap-2 border border-gold/40 bg-[#0E0E0D]/90 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold backdrop-blur-sm transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-near-black">
                  <span>View Project Details</span>
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </Link>

          {/* Project Specifications Matrix */}
          <div className="mt-4 grid grid-cols-2 divide-x divide-white/10 border border-white/10 bg-[#0C0C0B] sm:grid-cols-4">
            <div className="p-4 sm:p-5">
              <span className="font-mono text-[10px] text-ivory/50 uppercase tracking-wider">Property Type</span>
              <p className="mt-1 text-xs font-medium text-ivory">{project.category} Home</p>
            </div>
            <div className="p-4 sm:p-5">
              <span className="font-mono text-[10px] text-ivory/50 uppercase tracking-wider">Built-Up Area</span>
              <p className="mt-1 text-xs font-medium text-ivory">{project.sizeSqft} sq.ft</p>
            </div>
            <div className="p-4 sm:p-5">
              <span className="font-mono text-[10px] text-ivory/50 uppercase tracking-wider">Location</span>
              <p className="mt-1 text-xs font-medium text-ivory">{project.location}</p>
            </div>
            <div className="p-4 sm:p-5">
              <span className="font-mono text-[10px] text-ivory/50 uppercase tracking-wider">Key Work</span>
              <p className="mt-1 text-xs font-medium text-gold truncate">Complete Interior &amp; Woodwork</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
