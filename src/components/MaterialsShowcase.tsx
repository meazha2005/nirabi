"use client";

import { useState } from "react";
import { Sparkles, Layers } from "lucide-react";

const MATERIALS = [
  {
    id: "wood",
    name: "Smoked American Oak",
    category: "Veneer & Timber",
    desc: "Natural grain flitches, hand-waxed for matte tactile warmth across bespoke cabinetry and wall paneling.",
    image: "/images/materials/wood.jpg",
  },
  {
    id: "marble",
    name: "Calacatta Gold & Travertine",
    category: "Natural Stone",
    desc: "Honed and bookmatched veins with anti-stain seals, creating timeless island counters and vanity credenzas.",
    image: "/images/materials/marble.jpg",
  },
  {
    id: "metal",
    name: "Champagne Brushed Brass",
    category: "Architectural Hardware",
    desc: "PVD-coated architectural metalwork, door profiles, and lighting tracks finished in subtle champagne tones.",
    image: "/images/materials/metal.jpg",
  },
  {
    id: "glass",
    name: "Fluted & Ribbed Glass",
    category: "Spatial Division",
    desc: "Acoustic reeded partitions creating luminous visual boundaries between formal living and private wings.",
    image: "/images/materials/glass.jpg",
  },
  {
    id: "stone",
    name: "Textured Slate & Basalt",
    category: "Porous Mineral",
    desc: "Rough-hewn monolithic accents providing organic counterbalance to polished interior surfaces.",
    image: "/images/materials/stone.jpg",
  },
  {
    id: "fabric",
    name: "Belgian Linen & Bouclé",
    category: "Soft Tactility",
    desc: "High-rub count woven textures offering ergonomic luxury across custom seating and acoustic headboards.",
    image: "/images/materials/fabric.jpg",
  },
];

export default function MaterialsShowcase() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#0A0A0A] border-t border-surface-border">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              <Layers size={13} />
              <span>Material Integrity</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight">
              Honest Textures & Master Tactility
            </h2>
          </div>
          <p className="text-sm text-ivory/65 max-w-md leading-relaxed">
            Every NIRABI interior is anchored in noble raw materials that age with dignity. We curate sustainable woods, natural stone slabs, and tactile textiles.
          </p>
        </div>

        {/* 6-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MATERIALS.map((m) => (
            <div
              key={m.id}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#121212] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-2xl"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-near-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.image}
                  alt={m.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/30 to-transparent opacity-80" />
                <div className="absolute top-4 left-4 rounded-full bg-near-black/85 backdrop-blur-md border border-gold/30 px-3 py-1 text-[10px] font-semibold text-gold uppercase tracking-wider">
                  {m.category}
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-display text-xl text-ivory group-hover:text-gold transition-colors duration-300">
                    {m.name}
                  </h3>
                  <p className="mt-2 text-xs text-ivory/70 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-[11px] text-gold/80 font-mono">
                  <span>100% Studio Sourced</span>
                  <Sparkles size={12} className="text-gold" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
