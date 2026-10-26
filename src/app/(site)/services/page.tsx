import type { Metadata } from "next";
import ServicesList from "@/components/ServicesList";
import FinalCTA from "@/components/FinalCTA";
import { Sparkles, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Design Services — NIRABI DESIGN STUDIO",
  description:
    "Comprehensive architectural interior disciplines: Villa Architecture, Apartment Design, Modular Kitchens, Turnkey Solutions, and Commercial Sanctuaries across Chennai.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Editorial Services Hero */}
      <section className="relative overflow-hidden bg-[#080808] pt-40 pb-20 lg:pt-48 lg:pb-28 border-b border-surface-border">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-gold/5 blur-[140px]" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-6">
            <Layers size={14} />
            <span>Architectural Capabilities</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl text-ivory tracking-tight leading-[1.1]">
            Capabilities shaped around <span className="italic text-gold">your space</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-ivory/70 leading-relaxed font-light">
            From comprehensive residential turnkey executions to precision modular culinary suites and modern workspace design, explore our dedicated capabilities.
          </p>
        </div>
      </section>

      <ServicesList />
      <FinalCTA />
    </>
  );
}
