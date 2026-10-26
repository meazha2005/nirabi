"use client";

import TextReveal from "@/components/animations/TextReveal";
import { siteConfig } from "@/data/siteConfig";
import { Sparkles, Phone, ArrowRight, MessageSquare } from "lucide-react";

export default function FinalCTA() {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent("nirabi:open-chat"));
    window.dispatchEvent(new CustomEvent("yavi:open-chat"));
  };

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-28 lg:py-36 border-t border-surface-border">
      {/* Background Architectural Imagery with Deep Vignette */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/cta/final-cta.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-20 filter contrast-125"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]" />

      {/* Radial Gold Flare in Center */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[130px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-6">
          <Sparkles size={14} />
          <span>Begin Your Transformation</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ivory tracking-tight leading-[1.15]">
          Let us shape an interior that feels <span className="italic text-gold">uniquely yours</span>.
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-ivory/70 leading-relaxed font-light">
          From full villa interior architecture to tailored modular kitchens and workspace design in Chennai, our studio brings museum-grade refinement into daily life.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
          <a
            href="/contact"
            data-cursor="explore"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-wider text-near-black transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_35px_rgba(242,223,181,0.5)] hover:-translate-y-0.5"
          >
            <span>{siteConfig.primaryCta}</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>

          <button
            onClick={openChat}
            data-cursor="explore"
            className="group inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-surface-card/80 px-8 py-4 text-xs font-bold uppercase tracking-wider text-gold backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold/15 hover:-translate-y-0.5"
          >
            <MessageSquare size={15} />
            <span>Consult Design Concierge</span>
          </button>
        </div>

        {/* Direct Studio Phone Pill */}
        <div className="mt-8">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="inline-flex items-center gap-2 text-xs font-mono text-ivory/50 hover:text-gold transition-colors"
          >
            <Phone size={13} className="text-gold" />
            <span>Studio Direct Line: {siteConfig.contact.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
