import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import FinalCTA from "@/components/FinalCTA";

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
      {/* Hero Cover Header */}
      <section className="relative flex min-h-[75vh] items-end bg-[#080808] pt-32 pb-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.heroImage}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
          <Link
            href="/projects"
            className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-gold hover:text-gold-light transition-colors font-medium"
          >
            <ArrowLeft size={13} />
            <span>Back to All Projects</span>
          </Link>

          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold block font-semibold">
              {project.category} · {project.location}
            </span>
            <h1 className="mt-2 font-display text-4xl text-ivory sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
          </div>

          {/* Project Header Specifications Bar */}
          <div className="mt-8 grid grid-cols-2 divide-x divide-white/10 border border-white/10 bg-[#0C0C0B]/90 backdrop-blur-md sm:grid-cols-4">
            <div className="p-4 sm:p-5">
              <span className="font-mono text-[10px] uppercase text-ivory/50 block">Category</span>
              <span className="mt-0.5 text-xs font-medium text-ivory block">{project.category}</span>
            </div>
            <div className="p-4 sm:p-5">
              <span className="font-mono text-[10px] uppercase text-ivory/50 block">Floor Area</span>
              <span className="mt-0.5 text-xs font-medium text-ivory block">{project.sizeSqft} sq.ft</span>
            </div>
            <div className="p-4 sm:p-5">
              <span className="font-mono text-[10px] uppercase text-ivory/50 block">Location</span>
              <span className="mt-0.5 text-xs font-medium text-ivory block">{project.location}</span>
            </div>
            <div className="p-4 sm:p-5">
              <span className="font-mono text-[10px] uppercase text-ivory/50 block">Year Completed</span>
              <span className="mt-0.5 text-xs font-medium text-gold block">{project.year}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Details */}
      <section className="relative border-b border-white/10 bg-[#080808] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              About This Project
            </span>
            <h2 className="mt-4 font-display text-2xl leading-relaxed text-ivory sm:text-3xl">
              {project.concept}
            </h2>
          </div>

          {/* 4 Details Quadrants */}
          <div className="mt-14 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2">
            <div className="bg-[#0C0C0B] p-8">
              <span className="font-mono text-xs text-gold/80 block font-bold">01 / MATERIALS USED</span>
              <h3 className="mt-2 font-display text-lg text-ivory">Key Materials</h3>
              <p className="mt-3 text-xs leading-relaxed text-ivory/70">{project.materials}</p>
            </div>

            <div className="bg-[#0C0C0B] p-8">
              <span className="font-mono text-xs text-gold/80 block font-bold">02 / WHAT WE DID</span>
              <h3 className="mt-2 font-display text-lg text-ivory">Design &amp; Layout</h3>
              <p className="mt-3 text-xs leading-relaxed text-ivory/70">{project.designApproach}</p>
            </div>

            <div className="bg-[#0C0C0B] p-8">
              <span className="font-mono text-xs text-gold/80 block font-bold">03 / PROJECT HIGHLIGHTS</span>
              <h3 className="mt-2 font-display text-lg text-ivory">Challenges Solved</h3>
              <p className="mt-3 text-xs leading-relaxed text-ivory/70">{project.challenges}</p>
            </div>

            <div className="bg-[#0C0C0B] p-8">
              <span className="font-mono text-xs text-gold/80 block font-bold">04 / THE RESULT</span>
              <h3 className="mt-2 font-display text-lg text-ivory">Completed Home</h3>
              <p className="mt-3 text-xs leading-relaxed text-ivory/70">{project.result}</p>
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="mt-16 space-y-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold block font-semibold">
              Project Photos
            </span>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((img, i) => (
                <div key={`${img}-${i}`} className="overflow-hidden border border-white/10 bg-[#121211]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${project.title} photo ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Navigator */}
      <section className="border-b border-white/10 bg-[#0C0C0B] py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-medium">Next Project</span>
              <h3 className="mt-1 font-display text-3xl text-ivory transition-colors group-hover:text-gold sm:text-4xl">
                {next.title}
              </h3>
              <span className="mt-1 text-xs text-ivory/50 block">
                {next.category} · {next.location}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 border border-gold bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-wider text-near-black transition-colors group-hover:bg-gold-light">
              <span>View Next Project</span>
              <ArrowUpRight size={14} />
            </div>
          </Link>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
