"use client";

import { useState } from "react";
import TextReveal from "@/components/animations/TextReveal";
import { Sparkles, Check, ArrowRight, Wand2 } from "lucide-react";

const STYLES = [
  { id: "minimal", label: "Minimalist Pure", tag: "Spatial Simplicity", image: "/images/styles/minimal.jpg" },
  { id: "modern", label: "Warm Modernism", tag: "Clean Geometries", image: "/images/styles/modern.jpg" },
  { id: "luxury", label: "Dark Luxury", tag: "Deep Obsidian & Brass", image: "/images/styles/luxury.jpg" },
  { id: "contemporary", label: "Contemporary", tag: "Sculptural Forms", image: "/images/styles/contemporary.jpg" },
  { id: "warm", label: "Warm Timber", tag: "Oak & Travertine", image: "/images/styles/warm.jpg" },
  { id: "traditional", label: "Heritage Revival", tag: "Classic Indian Arch", image: "/images/styles/traditional.jpg" },
  { id: "industrial", label: "Refined Loft", tag: "Steel & Fluted Glass", image: "/images/styles/industrial.jpg" },
  { id: "natural", label: "Biophilic Sanctuary", tag: "Botanicals & Light", image: "/images/styles/natural.jpg" },
];

export default function StyleQuiz() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const direction =
    selected.length === 0
      ? null
      : selected
          .map((id) => STYLES.find((s) => s.id === id)?.label)
          .filter(Boolean)
          .join(" + ");

  const openConcierge = () => {
    const detail = { detail: { context: { design_style: direction } } };
    window.dispatchEvent(new CustomEvent("nirabi:open-chat", detail));
    window.dispatchEvent(new CustomEvent("yavi:open-chat", detail));
  };

  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#080808]">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            <Wand2 size={13} />
            <span>Aesthetic Discovery</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight">
            Define Your Spatial Mood
          </h2>
          <p className="mt-3 text-sm text-ivory/65 leading-relaxed">
            Select one or multiple sensibilities below. Our studio concierge will tailor material swatches and 3D architectural renders around your preferences.
          </p>
        </div>

        {/* 8-Card Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
          {STYLES.map((style) => {
            const isSelected = selected.includes(style.id);
            return (
              <button
                key={style.id}
                onClick={() => toggle(style.id)}
                aria-pressed={isSelected}
                className={`group relative aspect-[4/5] overflow-hidden rounded-2xl border text-left transition-all duration-500 ease-out-expo ${
                  isSelected
                    ? "border-gold ring-2 ring-gold/70 shadow-[0_0_30px_rgba(242,223,181,0.35)] scale-[1.02]"
                    : "border-white/10 hover:border-gold/40 hover:-translate-y-1"
                }`}
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={style.image}
                  alt={style.label}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                />

                {/* Shading Vignette */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 ${
                    isSelected ? "opacity-90" : "opacity-75 group-hover:opacity-85"
                  }`}
                />

                {/* Selection Checkmark Indicator */}
                <div
                  className={`absolute top-3.5 right-3.5 flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
                    isSelected
                      ? "border-gold bg-gold text-near-black shadow-lg"
                      : "border-white/20 bg-black/40 text-transparent group-hover:border-white/40"
                  }`}
                >
                  <Check size={14} className={isSelected ? "text-near-black" : "opacity-0"} />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="text-[10px] uppercase tracking-wider text-gold/80 font-mono mb-0.5">
                    {style.tag}
                  </div>
                  <div
                    className={`font-display text-lg font-medium transition-colors ${
                      isSelected ? "text-gold" : "text-ivory group-hover:text-gold"
                    }`}
                  >
                    {style.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Selection Result Bar */}
        {direction && (
          <div className="mt-12 rounded-3xl border border-gold/40 bg-gradient-to-r from-[#141414] via-[#1A1A1A] to-[#141414] p-8 shadow-2xl backdrop-blur-md text-center max-w-3xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
              Your Tailored Aesthetic Direction
            </span>
            <p className="mt-2 font-display text-2xl sm:text-3xl italic text-gold">
              &ldquo;{direction}&rdquo;
            </p>
            <p className="mt-2 text-xs text-ivory/60">
              Ready to see this sensibility tailored to your floor plan and spatial volume?
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={openConcierge}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-bold uppercase tracking-wider text-near-black transition-all hover:bg-gold-light hover:shadow-[0_0_25px_rgba(242,223,181,0.4)]"
              >
                <Sparkles size={14} />
                <span>Transmit To NIRABI Concierge</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
