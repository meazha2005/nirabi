"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import { services } from "@/data/services";

export default function HomeServicesOverview() {
  const featuredServices = services.slice(0, 4);

  const serviceHighlights: Record<string, string[]> = {
    "residential-interiors": ["Full-home architecture", "Custom wall paneling", "Curated lighting"],
    "villa-interiors": ["Double-height volumes", "Private courtyards", "Bespoke Italian marble"],
    "apartment-interiors": ["Space optimization", "Smart hidden storage", "Modular partition systems"],
    "modular-kitchens": ["German soft-close systems", "Quartz countertops", "Acrylic finishes"],
  };

  return (
    <section className="relative bg-[#0C0C0C] py-24 sm:py-32 border-t border-b border-surface-border">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-gold">
              <Sparkles size={12} />
              <span className="eyebrow text-gold">Architectural Disciplines</span>
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl text-ivory">
              Tailored Spatial Solutions
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-ivory/60 max-w-lg leading-relaxed">
              From large-scale private residences to precision kitchen systems, each discipline is engineered with zero compromise.
            </p>
          </div>

          <Link
            href="/services"
            data-cursor="explore"
            className="inline-flex items-center gap-2 rounded-full border border-surface-border-gold bg-surface-card px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-near-black shadow-sm"
          >
            <span>View All 8 Disciplines</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service, idx) => {
            const highlights = serviceHighlights[service.id] || ["Turnkey execution", "Material honesty"];
            return (
              <Link
                key={service.id}
                href="/services"
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-surface-border bg-surface-card transition-all duration-500 hover:border-gold/50 hover:bg-surface-elevated hover:-translate-y-1.5 shadow-xl"
              >
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden bg-near-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                  <span className="absolute top-3.5 left-3.5 rounded-full border border-white/10 bg-near-black/75 px-2.5 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-widest text-gold backdrop-blur-md">
                    0{idx + 1}
                  </span>
                </div>

                {/* Body Content */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ivory transition-colors group-hover:text-gold">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-ivory/60 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Features checklist */}
                    <div className="mt-4 space-y-1.5 pt-3 border-t border-surface-border">
                      {highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[10px] text-ivory/70">
                          <CheckCircle2 size={11} className="text-gold shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-xs font-semibold text-gold pt-3 border-t border-surface-border/50">
                    <span className="uppercase tracking-wider text-[10px]">Learn More</span>
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>

                {/* Bottom Gold Progress Glow */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-500 ease-out-expo group-hover:w-full" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
