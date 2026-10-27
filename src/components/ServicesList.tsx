"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { services } from "@/data/services";

export default function ServicesList() {
  const [activeId, setActiveId] = useState<string>(services[0]?.id || "villa-architecture");
  const activeService = services.find((s) => s.id === activeId) || services[0];

  return (
    <section className="relative border-b border-white/10 bg-[#080808] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left Column: Interactive Capabilities Directory */}
          <div className="lg:col-span-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              Our Capabilities
            </span>
            <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
              Interior Design &amp; Build
            </h2>

            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {services.map((service, i) => {
                const isSelected = service.id === activeId;
                return (
                  <div key={service.id} className="group">
                    <button
                      onClick={() => setActiveId(service.id)}
                      className={`flex w-full items-center justify-between py-5 text-left transition-colors focus:outline-none ${
                        isSelected ? "text-gold" : "text-ivory hover:text-gold"
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-gold/70">
                          0{i + 1}
                        </span>
                        <span className="font-display text-xl sm:text-2xl">
                          {service.title}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className={`transition-transform duration-300 ${
                          isSelected ? "rotate-45 text-gold" : "text-ivory/30 group-hover:text-gold"
                        }`}
                      />
                    </button>

                    {/* Mobile Expansion Drawer */}
                    {isSelected && (
                      <div className="pb-6 pt-2 lg:hidden space-y-4">
                        <p className="text-xs leading-relaxed text-ivory/70">
                          {service.description}
                        </p>
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={service.image}
                            alt={service.title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="space-y-1.5 text-[11px] text-ivory/70 border-t border-white/10 pt-3">
                          <div className="flex items-center gap-2"><Clock size={12} className="text-gold" /> <span>{service.timeline}</span></div>
                          <div className="flex items-center gap-2"><ShieldCheck size={12} className="text-gold" /> <span>{service.scope}</span></div>
                        </div>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 border border-gold bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-near-black hover:bg-gold-light"
                        >
                          <span>Get Quote for {service.title}</span>
                          <ArrowUpRight size={13} />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Desktop Service Preview */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-28 border border-white/10 bg-[#0C0C0B] p-8">
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-white/10 bg-[#141413]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-all duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#080808]/85 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-gold border border-white/10">
                  {activeService.timeline}
                </div>
              </div>

              <div className="mt-6">
                <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-medium">
                  {activeService.scope}
                </span>
                <h3 className="mt-1 font-display text-2xl text-ivory">
                  {activeService.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-ivory/70">
                  {activeService.description}
                </p>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ivory/50 block font-medium">What We Deliver</span>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-ivory/80">
                    {activeService.deliverables?.map((del, dIdx) => (
                      <span key={dIdx} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-gold shrink-0" />
                        <span className="truncate">{del}</span>
                      </span>
                    )) || (
                      <>
                        <span className="flex items-center gap-2"><CheckCircle2 size={13} className="text-gold" /> 3D Walkthroughs</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={13} className="text-gold" /> Full Electrical &amp; Lighting Plans</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-gold bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-near-black transition-colors hover:bg-gold-light"
                  >
                    <span>Get a Quote for This Service</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
