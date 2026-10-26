import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";
import DesignProcess from "@/components/DesignProcess";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import { Compass, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Studio — NIRABI DESIGN STUDIO",
  description:
    "NIRABI DESIGN STUDIO is an interior architecture and turnkey design atelier grounded in material honesty, structural clarity, and everyday living in Chennai.",
};

export default function AboutPage() {
  return (
    <>
      {/* Editorial Hero Header */}
      <section className="relative overflow-hidden bg-[#080808] pt-40 pb-20 lg:pt-48 lg:pb-28 border-b border-surface-border">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-gold/5 blur-[140px]" />
        
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-6">
            <Compass size={14} />
            <span>Atelier & Manifesto</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl text-ivory tracking-tight leading-[1.1]">
            Interior spaces, <span className="italic text-gold">thoughtfully</span> designed.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-ivory/70 leading-relaxed font-light">
            We architect environments where everyday routines feel graceful, materials feel tactile and honest, and proportions bring quiet tranquility.
          </p>
        </div>
      </section>

      <AboutSection />
      <DesignProcess />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
