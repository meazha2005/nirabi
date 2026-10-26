import type { Metadata } from "next";
import ProjectGallery from "@/components/ProjectGallery";
import FinalCTA from "@/components/FinalCTA";
import { Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Curated Projects — NIRABI DESIGN STUDIO",
  description:
    "Explore built works by NIRABI DESIGN STUDIO across luxury villas, urban apartments, bespoke kitchens, and commercial interiors in Chennai.",
};

export default function ProjectsPage() {
  return (
    <>
      {/* Editorial Projects Hero */}
      <section className="relative overflow-hidden bg-[#080808] pt-40 pb-16 lg:pt-48 lg:pb-24 border-b border-surface-border">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-gold/5 blur-[140px]" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-6">
            <Compass size={14} />
            <span>Built Works & Commissions</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl text-ivory tracking-tight leading-[1.1]">
            A selection of spaces we&rsquo;ve <span className="italic text-gold">shaped</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-ivory/70 leading-relaxed font-light">
            Each project is an architectural study in natural light, authentic materials, and turnkey engineering tailored to our clients&rsquo; lifestyle.
          </p>
        </div>
      </section>

      <ProjectGallery />
      <FinalCTA />
    </>
  );
}
