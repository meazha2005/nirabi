"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  Layers,
  PhoneCall,
  MessageCircle,
  Hammer,
  BadgeCheck
} from "lucide-react";
import { services, Service } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";

const CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "residential", label: "Villas & Homes" },
  { id: "kitchen", label: "Modular Kitchens" },
  { id: "commercial", label: "Offices & Retail" },
  { id: "renovation", label: "Renovation & Furniture" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

export default function ServicesList() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return services;
    if (activeCategory === "residential") {
      return services.filter((s) => s.id === "villa-architecture" || s.id === "luxury-residences" || s.id === "turnkey-contracts");
    }
    if (activeCategory === "kitchen") {
      return services.filter((s) => s.id === "bespoke-culinary-suites");
    }
    if (activeCategory === "commercial") {
      return services.filter((s) => s.id === "corporate-workspaces" || s.id === "boutique-commercial");
    }
    if (activeCategory === "renovation") {
      return services.filter((s) => s.id === "apartment-transformations" || s.id === "custom-furniture-millwork");
    }
    return services;
  }, [activeCategory]);

  const handleInquire = (serviceTitle: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("nirabi:open-chat", {
          detail: { context: { service_interest: serviceTitle } },
        })
      );
    }
  };

  return (
    <div className="bg-[#080808] text-ivory">
      {/* Category Filter Pills */}
      <section className="sticky top-20 z-30 border-b border-white/10 bg-[#080808]/95 backdrop-blur-md py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all ${
                    active
                      ? "bg-gold text-near-black shadow-md font-semibold"
                      : "bg-[#141414] text-ivory/70 border border-white/10 hover:border-gold/40 hover:text-ivory"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <span className="hidden sm:inline-block font-mono text-xs text-gold/80">
            Showing {filteredServices.length} of {services.length} Services
          </span>
        </div>
      </section>

      {/* Main Services Card Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                className="group flex flex-col justify-between overflow-hidden rounded-md border border-white/10 bg-[#0E0E0E] transition-all duration-300 hover:border-gold/40 hover:bg-[#121212] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Visual Header */}
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181818]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-transparent opacity-80" />

                    {/* Service Index & Scope Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="rounded bg-[#080808]/90 px-2.5 py-1 font-mono text-xs font-bold text-gold border border-white/15">
                        0{index + 1}
                      </span>
                      <span className="rounded bg-[#080808]/90 px-3 py-1 font-mono text-[11px] text-ivory/80 border border-white/15">
                        {service.scope}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1.5 rounded bg-gold/90 px-2.5 py-1 text-[11px] font-semibold text-near-black">
                        <Clock size={11} />
                        {service.timeline}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold tracking-tight text-ivory group-hover:text-gold transition-colors">
                      {service.title}
                    </h2>
                    <p className="mt-1.5 text-xs font-medium text-gold/90">
                      {service.tagline}
                    </p>
                    <p className="mt-4 text-xs leading-relaxed text-ivory/70">
                      {service.description}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="mt-6 rounded-sm border border-white/5 bg-[#141414] p-4">
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-ivory/50">
                        What We Deliver:
                      </span>
                      <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {service.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-xs text-ivory/85">
                            <CheckCircle2 size={13} className="text-gold shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="flex items-center justify-between border-t border-white/10 bg-[#0A0A0A] px-6 py-4 sm:px-8">
                  <button
                    onClick={() => handleInquire(service.title)}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-light transition-colors"
                  >
                    <span>Instant Quote</span>
                    <Sparkles size={13} />
                  </button>

                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-1.5 rounded bg-white/10 px-4 py-2 text-xs font-semibold text-ivory hover:bg-gold hover:text-near-black transition-all"
                  >
                    <span>Book Site Visit</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
