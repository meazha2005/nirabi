"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Sparkles, MessageSquare } from "lucide-react";
import { services } from "@/data/services";

export default function ServicesList() {
  const [active, setActive] = useState<string>(services[0].id);
  const activeService = services.find((s) => s.id === active) || services[0];

  const openConciergeForService = (serviceTitle: string) => {
    const detail = { detail: { context: { project_type: serviceTitle } } };
    window.dispatchEvent(new CustomEvent("nirabi:open-chat", detail));
    window.dispatchEvent(new CustomEvent("yavi:open-chat", detail));
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-[#080808]">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-start">
          {/* Left Column: Interactive Discipline List */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-8">
              Available Studio Disciplines ({services.length})
            </div>

            <ul className="divide-y divide-white/10 border-t border-b border-white/10">
              {services.map((service, i) => {
                const isSelected = active === service.id;
                return (
                  <li
                    key={service.id}
                    onMouseEnter={() => setActive(service.id)}
                    className={`group transition-all duration-300 ${
                      isSelected ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                    }`}
                  >
                    <button
                      onClick={() => setActive(service.id)}
                      className="w-full text-left py-6 px-3 flex flex-col focus:outline-none"
                    >
                      <div className="flex w-full items-center justify-between gap-4">
                        <div className="flex items-center gap-5">
                          <span className="font-mono text-xs text-gold/70">
                            0{i + 1}
                          </span>
                          <span
                            className={`font-display text-xl sm:text-2xl transition-colors duration-300 ${
                              isSelected ? "text-gold font-bold" : "text-ivory group-hover:text-gold"
                            }`}
                          >
                            {service.title}
                          </span>
                        </div>

                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                            isSelected
                              ? "border-gold bg-gold text-near-black shadow-md"
                              : "border-white/10 text-ivory/40 group-hover:border-gold/40 group-hover:text-gold"
                          }`}
                        >
                          <ArrowUpRight size={16} />
                        </div>
                      </div>

                      {/* Mobile Accordion Preview */}
                      <div
                        className={`w-full overflow-hidden transition-all duration-500 ease-out-expo lg:hidden ${
                          isSelected ? "mt-4 max-h-[420px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                        }`}
                      >
                        <p className="text-xs text-ivory/70 mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg mb-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={service.image}
                            alt={service.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openConciergeForService(service.title);
                          }}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-near-black"
                        >
                          <MessageSquare size={13} />
                          <span>Consult for {service.title}</span>
                        </button>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column: Desktop Sticky Preview Frame */}
          <div className="sticky top-28 hidden lg:block">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#121212] p-3 shadow-2xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-near-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out-expo hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 opacity-70" />

                <div className="absolute top-4 left-4 rounded-full bg-near-black/85 backdrop-blur-md border border-gold/30 px-3.5 py-1 text-[10px] font-semibold text-gold uppercase tracking-wider">
                  Featured Discipline
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-ivory">
                  {activeService.title}
                </h3>
                <p className="mt-3 text-xs text-ivory/70 leading-relaxed">
                  {activeService.description}
                </p>

                <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-ivory/60">
                  <div className="flex items-center gap-2 text-gold">
                    <CheckCircle2 size={14} />
                    <span>Custom tailored 3D walkthrough and specifications</span>
                  </div>
                  <div className="flex items-center gap-2 text-gold">
                    <CheckCircle2 size={14} />
                    <span>10-Year hardware and joinery warranty</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => openConciergeForService(activeService.title)}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-xs font-bold uppercase tracking-wider text-near-black hover:bg-gold-light transition-all shadow-md"
                  >
                    <MessageSquare size={14} />
                    <span>Inquire for {activeService.title}</span>
                  </button>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-surface-card px-4 py-3 text-xs font-semibold text-ivory hover:border-gold hover:text-gold transition-all"
                  >
                    Form →
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
