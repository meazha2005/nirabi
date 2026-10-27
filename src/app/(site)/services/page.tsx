import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Phone, MessageSquare, Check, Shield, Clock, Sparkles } from "lucide-react";
import ServicesList from "@/components/ServicesList";
import FinalCTA from "@/components/FinalCTA";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Interior Design Services in Chennai — NIRABI DESIGN STUDIO",
  description:
    "End-to-end interior design and build services in Chennai: luxury villa interiors, apartment woodwork, waterproof modular kitchens, office fitouts, and complete turnkey execution.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Modern Services Hero Header */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#080808] pt-32 pb-16 lg:pt-40 lg:pb-24">
        {/* Subtle Ambient Background Gradients */}
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-gold/5 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            {/* Monogram Badge */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-[#121211] px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                NIRABI DESIGN STUDIO · CHENNAI SERVICES
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-ivory sm:text-5xl lg:text-6xl">
              Interior design and turnkey build, done right.
            </h1>

            <p className="mt-6 text-base leading-relaxed text-ivory/80 sm:text-lg">
              From compact 2BHK flats and spacious duplexes to luxury independent villas and modern commercial fitouts, we handle everything from 3D drawings to final key handover across Chennai.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded bg-gold px-6 py-3 text-xs font-bold uppercase tracking-wider text-near-black shadow-lg hover:bg-gold-light transition-all"
              >
                <span>Book Free Site Visit</span>
                <ArrowUpRight size={14} />
              </Link>

              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-ivory hover:border-gold hover:text-gold transition-all"
              >
                <Phone size={13} className="text-gold" />
                <span>Call {siteConfig.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Services Listing & Pricing Guide */}
      <ServicesList />

      {/* Global Bottom CTA */}
      <FinalCTA />
    </>
  );
}
