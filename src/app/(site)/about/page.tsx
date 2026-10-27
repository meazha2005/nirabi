import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";
import DesignProcess from "@/components/DesignProcess";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "About Us — NIRABI DESIGN STUDIO",
  description: "Learn about NIRABI DESIGN STUDIO, our experienced team of interior designers and carpenters in Madipakkam, Chennai.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative border-b border-white/10 bg-[#080808] pb-16 pt-36 lg:pb-24 lg:pt-44">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
            About Us · Chennai Studio
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl text-ivory sm:text-5xl lg:text-6xl">
            We design and build modern homes with honest craftsmanship.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80">
            At NIRABI DESIGN STUDIO, we make home interiors simple, transparent, and long-lasting. Meet our team, explore our 6-step process, and see why homeowners across Chennai trust us with their dream homes.
          </p>
        </div>
      </section>

      <AboutSection />
      <DesignProcess />
      <FinalCTA />
    </>
  );
}
