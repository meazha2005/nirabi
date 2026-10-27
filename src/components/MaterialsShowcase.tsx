"use client";

import { useState } from "react";

const MATERIALS = [
  { id: "wood", name: "Teak & Oak Wood", desc: "Strong solid wood and durable veneers for wardrobes and doors.", image: "/generated/material_wood.jpg" },
  { id: "marble", name: "Italian Marble", desc: "Polished natural marble for living room floors and TV walls.", image: "/generated/material_marble.jpg" },
  { id: "stone", name: "Granite & Stone", desc: "Tough, scratch-proof stone for kitchen counters and sinks.", image: "/generated/material_stone.jpg" },
  { id: "fabric", name: "Linen & Fabrics", desc: "Soft, breathable fabrics for comfortable sofas and beds.", image: "/generated/material_fabric.jpg" },
  { id: "metal", name: "Brass & Matte Metal", desc: "Rust-resistant handles, hinges, and metallic profiles.", image: "/generated/material_metal.jpg" },
  { id: "glass", name: "Fluted Glass", desc: "Modern textured glass dividers for stylish room privacy.", image: "/generated/material_glass.jpg" },
];

export default function MaterialsShowcase() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative border-b border-white/10 bg-[#0A0A09] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              Quality Materials
            </span>
            <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
              Materials We Use
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-ivory/70">
            Durable, high-quality materials that are easy to clean and built to last.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {MATERIALS.map((m) => (
            <div
              key={m.id}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative aspect-square overflow-hidden rounded-sm border border-white/10 bg-[#121211]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.image}
                alt={m.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#080808]/95 via-[#080808]/40 to-transparent p-4">
                <span className="font-display text-sm text-ivory group-hover:text-gold transition-colors font-medium">{m.name}</span>
                <p
                  className={`text-[10px] text-ivory/70 transition-all duration-300 ${
                    hovered === m.id ? "mt-1 max-h-12 opacity-100" : "max-h-0 overflow-hidden opacity-0"
                  }`}
                >
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
