import type { Metadata } from "next";
import ProjectGallery from "@/components/ProjectGallery";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Our Projects — NIRABI DESIGN STUDIO",
  description: "Explore completed interior design projects in Chennai by NIRABI DESIGN STUDIO, including villas, apartments, modular kitchens, and office fitouts.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="relative border-b border-white/10 bg-[#080808] pb-16 pt-36 lg:pb-24 lg:pt-44">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
            Our Work · Completed Projects
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl text-ivory sm:text-5xl lg:text-6xl">
            Explore our completed homes and offices across Chennai.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80">
            Take a look at our recent interior design projects. Each project was custom-designed and executed to fit the client&rsquo;s personal taste, floor plan, and budget.
          </p>
        </div>
      </section>

      <ProjectGallery />
      <FinalCTA />
    </>
  );
}
