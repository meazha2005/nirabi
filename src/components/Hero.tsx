"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/siteConfig";
import { ArrowUpRight, Sparkles, ShieldCheck, Compass, Award, Phone } from "lucide-react";
import Magnetic from "@/components/animations/Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(badgeRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .fromTo(title1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.35)
        .fromTo(title2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.85 }, 0.5)
        .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.65)
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.8)
        .fromTo(statsRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8 }, 1.0);

      // Parallax scroll on hero photography
      if (imgWrapRef.current) {
        gsap.to(imgWrapRef.current, {
          y: "18%",
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#080808] pt-28 sm:pt-32 lg:pt-36"
    >
      {/* Background Visual Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Golden Ambient Aura */}
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 h-[550px] w-[800px] rounded-full bg-gold/10 blur-[130px] opacity-70 animate-glow" />
        <div className="absolute top-[40%] right-[-10%] h-[400px] w-[500px] rounded-full bg-gold/5 blur-[120px] opacity-40" />

        {/* Photography with gradient vignette */}
        <div ref={imgWrapRef} className="absolute inset-0 h-[115%] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/hero-living-room.jpg"
            alt="Warm sunlit contemporary living space designed by NIRABI DESIGN STUDIO"
            className="h-full w-full object-cover object-center opacity-30 md:opacity-40"
          />
          {/* High-Contrast Luxury Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]" />
        </div>
      </div>

      {/* Main Hero Content */}
      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-6xl px-6 py-6 sm:py-10 lg:px-8">
        <div className="max-w-3xl">
          {/* Studio Eyebrow Pill */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 rounded-full border border-surface-border-gold bg-[#121212]/80 px-4 py-1.5 backdrop-blur-md shadow-sm">
            <Sparkles size={12} className="text-gold animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold sm:text-[11px]">
              Bespoke Interior Architecture · Chennai
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-6 font-display text-4xl text-ivory tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem] leading-[1.04]">
            <div ref={title1Ref}>Where Spaces</div>
            <div ref={title2Ref} className="italic font-serif font-normal mt-1 gold-gradient-text">
              Become Stories.
            </div>
          </h1>

          {/* Subheading */}
          <p ref={descRef} className="mt-6 max-w-xl text-sm leading-relaxed text-ivory/70 sm:text-base md:text-lg">
            NIRABI DESIGN STUDIO transforms residential villas, apartments, and commercial spaces into timeless architectural sanctuaries across Chennai. Tailored to your lifestyle with material honesty and turnkey precision.
          </p>

          {/* Action Row */}
          <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
            <Magnetic strength={25}>
              <Link
                href="/projects"
                data-cursor="explore"
                className="group relative inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-near-black shadow-gold-glow transition-all duration-300 hover:bg-gold-light hover:shadow-gold-glow-lg hover:scale-[1.02]"
              >
                <span>Explore Portfolio</span>
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>

            <Link
              href="/contact"
              data-cursor="explore"
              className="group inline-flex items-center gap-2 rounded-full border border-surface-border-gold bg-surface-card/60 px-6 py-3.5 text-xs font-semibold tracking-wider text-gold backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold/15 hover:text-ivory"
            >
              <span>{siteConfig.primaryCta}</span>
              <Compass size={15} className="text-gold/80 transition-transform duration-300 group-hover:rotate-45" />
            </Link>

            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-ivory/70 hover:text-gold transition-colors py-2 px-3"
            >
              <Phone size={14} className="text-gold" />
              <span>{siteConfig.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Architectural Telemetry Bar (Value Props) */}
      <div ref={statsRef} className="relative z-10 border-t border-surface-border bg-[#0A0A0A]/80 backdrop-blur-xl py-6">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                <Award size={18} />
              </div>
              <div>
                <div className="font-display text-lg font-bold text-ivory sm:text-xl">120+</div>
                <div className="text-[10px] uppercase tracking-wider text-ivory/50">Spaces Sculpted</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="font-display text-lg font-bold text-ivory sm:text-xl">100%</div>
                <div className="text-[10px] uppercase tracking-wider text-ivory/50">Turnkey Execution</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                <Compass size={18} />
              </div>
              <div>
                <div className="font-display text-lg font-bold text-ivory sm:text-xl">10-Year</div>
                <div className="text-[10px] uppercase tracking-wider text-ivory/50">Material Warranty</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                <Sparkles size={18} />
              </div>
              <div>
                <div className="font-display text-lg font-bold text-ivory sm:text-xl">Madipakkam</div>
                <div className="text-[10px] uppercase tracking-wider text-ivory/50">Chennai Flagship</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
