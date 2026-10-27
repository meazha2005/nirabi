"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const MOODS = [
  { id: "minimal-clean", label: "Minimal & Clean", desc: "Handle-less cabinets, warm oak wood, and bright open rooms", image: "/generated/style_minimal.jpg" },
  { id: "luxury-marble", label: "Luxury Marble", desc: "Polished marble flooring, gold accents, and grand cove lighting", image: "/generated/style_luxury.jpg" },
  { id: "modern-coastal", label: "Modern Coastal", desc: "Airy living spaces, light fabrics, and refreshing open layouts", image: "/generated/style_coastal.jpg" },
  { id: "traditional-teak", label: "Traditional South Indian", desc: "Rich teakwood, brass lamps, Kadappa stone, and pooja carvings", image: "/generated/style_traditional.jpg" },
  { id: "warm-earthy", label: "Warm & Earthy", desc: "Earthy wall tones, cozy textures, and soft comfortable furniture", image: "/generated/style_warm.jpg" },
  { id: "glass-metal", label: "Glass & Black Metal", desc: "Modern fluted glass partitions and sleek dark metal frames", image: "/generated/style_industrial.jpg" },
  { id: "executive-wood", label: "Executive Wood Finish", desc: "Dark walnut veneer, clean straight lines, and warm spotlights", image: "/generated/style_executive.jpg" },
  { id: "indoor-garden", label: "Indoor Plants & Light", desc: "Indoor green corners, skylight corners, and natural stones", image: "/generated/style_natural.jpg" },
];

export default function StyleQuiz() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const directionSummary =
    selected.length === 0
      ? null
      : selected
          .map((id) => MOODS.find((m) => m.id === id)?.label)
          .filter(Boolean)
          .join(" · ");

  const openConcierge = () => {
    const detail = { detail: { context: { design_style: directionSummary } } };
    window.dispatchEvent(new CustomEvent("nirabi:open-chat", detail));
  };

  return (
    <section className="relative border-b border-white/10 bg-[#080808] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              Choose Your Style
            </span>
            <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
              What Style Do You Like?
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-ivory/70">
            Tap on any style you like. We will customize your 3D design and quotation based on your choices.
          </p>
        </div>

        {/* Style Cards Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {MOODS.map((mood) => {
            const isSelected = selected.includes(mood.id);
            return (
              <button
                key={mood.id}
                onClick={() => toggle(mood.id)}
                aria-pressed={isSelected}
                className={`group relative flex flex-col justify-between overflow-hidden border p-4 text-left transition-all duration-300 focus:outline-none ${
                  isSelected
                    ? "border-gold bg-[#141310]"
                    : "border-white/10 bg-[#0C0C0B] hover:border-white/30 hover:bg-[#111110]"
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#181817]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mood.image}
                    alt={mood.label}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center bg-gold text-near-black">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold tracking-wide ${isSelected ? "text-gold" : "text-ivory"}`}>
                      {mood.label}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-ivory/60 line-clamp-2">
                    {mood.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Direction Action Bar */}
        {directionSummary && (
          <div className="mt-8 flex flex-col justify-between gap-6 border border-gold/40 bg-[#121211] p-6 sm:flex-row sm:items-center">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-medium">
                Styles You Selected
              </span>
              <p className="mt-1 font-display text-xl text-ivory">{directionSummary}</p>
            </div>
            <button
              onClick={openConcierge}
              className="inline-flex items-center justify-center gap-2 border border-gold bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-near-black transition-colors hover:bg-gold-light shrink-0"
            >
              <span>Get Free Quote for This Style</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
