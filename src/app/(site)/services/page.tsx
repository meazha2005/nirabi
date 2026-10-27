import type { Metadata } from "next";
import ServicesList from "@/components/ServicesList";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Our Interior Services — NIRABI DESIGN STUDIO",
  description: "Explore our interior design services in Chennai: villa interiors, apartment woodwork, modular kitchens, office fitouts, and complete turnkey solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative border-b border-white/10 bg-[#080808] pb-16 pt-36 lg:pb-24 lg:pt-44">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
            Our Interior Services
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl text-ivory sm:text-5xl lg:text-6xl">
            Complete interior design from empty rooms to move-in ready.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80">
            Whether you need an entire villa designed, a fresh modular kitchen, or smart wardrobes for your flat, explore our complete range of interior services below.
          </p>
        </div>
      </section>

      <ServicesList />
      <FinalCTA />
    </>
  );
}
