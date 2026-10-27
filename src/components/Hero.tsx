"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col justify-between overflow-hidden bg-[#080808] pt-32 lg:min-h-screen lg:pt-36">
      {/* Background Architectural Imagery & Overlays */}
      <div className="absolute inset-0 z-0 select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/generated/hero_villa.jpg"
          alt="Modern home interiors by NIRABI DESIGN STUDIO"
          className="h-full w-full object-cover object-center brightness-[0.7] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-[#080808]/40 to-transparent" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
        <div className="max-w-3xl">
          {/* Studio Monogram Badge */}
          <div className="mb-6 inline-flex items-center gap-3 border border-gold/30 bg-[#121211]/85 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">
              NIRABI DESIGN STUDIO · CHENNAI
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl leading-[1.1] text-ivory sm:text-6xl lg:text-7xl">
            We design and build beautiful homes in Chennai.
          </h1>

          {/* Subtext */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg">
            From modern apartments and independent villas to stylish modular kitchens and complete renovations, we handle everything from design to final key handover.
          </p>

          {/* Dual CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 border border-gold bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-near-black transition-all hover:bg-gold-light"
            >
              <span>{siteConfig.primaryCta}</span>
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/services"
              className="group inline-flex items-center gap-2.5 border border-white/20 bg-[#141413]/70 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-ivory backdrop-blur-sm transition-all hover:border-gold hover:text-gold"
            >
              <span>{siteConfig.secondaryCta}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
