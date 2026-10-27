"use client";

import { useState } from "react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  return (
    <section className="relative border-b border-white/10 bg-[#0A0A09] py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
            Client Reviews
          </span>
          <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
            What Our Clients Say
          </h2>
        </div>

        {/* Quote Card */}
        <div className="mt-12 border border-white/10 bg-[#0C0C0B] p-8 sm:p-12 lg:p-16 text-center">
          <p className="font-display text-2xl leading-relaxed text-ivory sm:text-3xl">
            &ldquo;{current.quote}&rdquo;
          </p>

          <div className="mt-8 flex flex-col items-center justify-center">
            <span className="font-display text-base font-semibold text-gold">
              {current.client}
            </span>
            <span className="mt-1 font-mono text-xs uppercase tracking-wider text-ivory/70">
              {current.title}
            </span>
            <span className="mt-0.5 font-mono text-[11px] uppercase text-ivory/50">
              {current.location}
            </span>
          </div>

          {/* Numbered Index Switcher */}
          <div className="mt-10 flex justify-center gap-3">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                aria-label={`View review ${i + 1}`}
                className={`flex h-8 items-center px-3 font-mono text-xs transition-all border ${
                  i === index
                    ? "border-gold bg-gold/10 text-gold font-bold"
                    : "border-white/10 text-ivory/40 hover:border-white/30 hover:text-ivory"
                }`}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
