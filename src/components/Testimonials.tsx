"use client";

import { useState } from "react";
import { testimonials } from "@/data/testimonials";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#080808]">
      {/* Decorative subtle ambient light */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-6">
          <Quote size={13} />
          <span>Client Perspectives</span>
        </div>

        {/* 5-Star Rating Pill */}
        <div className="flex justify-center items-center gap-1.5 mb-8 text-gold">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill="currentColor" className="text-gold shadow-sm" />
          ))}
          <span className="ml-2 text-xs font-mono text-ivory/60 tracking-wider">5.0 / 5.0 VERIFIED EXPERIENCE</span>
        </div>

        {/* Active Testimonial Card */}
        <div className="relative min-h-[220px] sm:min-h-[190px] flex flex-col justify-center">
          <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl leading-relaxed sm:leading-snug text-ivory font-light italic">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          <div className="mt-8 flex flex-col items-center">
            <div className="font-display text-lg font-semibold text-gold tracking-wide">
              {t.name}
            </div>
            <div className="mt-0.5 text-xs text-ivory/60 tracking-wider uppercase font-medium">
              {t.projectType}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous client testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface-card text-ivory/70 transition-all hover:border-gold hover:text-gold hover:bg-gold/10"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                aria-label={`Jump to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-gold shadow-[0_0_12px_rgba(242,223,181,0.6)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next client testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface-card text-ivory/70 transition-all hover:border-gold hover:text-gold hover:bg-gold/10"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
