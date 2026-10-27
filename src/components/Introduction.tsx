import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Introduction() {
  return (
    <section className="relative border-b border-white/10 bg-[#0A0A09] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Top Header Grid */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              Who We Are
            </span>
            <h2 className="mt-4 font-display text-3xl leading-snug text-ivory sm:text-4xl lg:text-5xl">
              We create homes that feel comfortable, practical, and beautiful.
              <span className="mt-2 block italic text-gold">
                Simple designs built to last for years.
              </span>
            </h2>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between space-y-6 text-sm leading-relaxed text-ivory/80 lg:col-span-6">
            <p>
              NIRABI DESIGN STUDIO is an interior design and turnkey execution company based in Madipakkam, Chennai. We help homeowners turn empty spaces into warm, modern, and functional homes.
            </p>
            <p>
              Whether you are moving into a new apartment, building a villa, or remodeling your existing house, we make the process easy. Our team manages 3D drawings, carpentry, modular kitchen setup, false ceiling, and painting all under one roof.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold transition-colors hover:text-gold-light"
              >
                <span>Read More About Us &amp; Our Team</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-[#0D0D0C] p-8 transition-colors hover:bg-[#121211]">
            <span className="font-mono text-xs text-gold/80 font-bold">01</span>
            <h3 className="mt-4 font-display text-xl text-ivory">Smart Space Planning</h3>
            <p className="mt-2 text-xs leading-relaxed text-ivory/70">
              Arranging every room for great walking space, plenty of natural light, and smart storage.
            </p>
          </div>

          <div className="bg-[#0D0D0C] p-8 transition-colors hover:bg-[#121211]">
            <span className="font-mono text-xs text-gold/80 font-bold">02</span>
            <h3 className="mt-4 font-display text-xl text-ivory">Quality Materials</h3>
            <p className="mt-2 text-xs leading-relaxed text-ivory/70">
              Using waterproof BWR plywood, quality teak, smooth laminates, and trusted German fittings.
            </p>
          </div>

          <div className="bg-[#0D0D0C] p-8 transition-colors hover:bg-[#121211]">
            <span className="font-mono text-xs text-gold/80 font-bold">03</span>
            <h3 className="mt-4 font-display text-xl text-ivory">Clear Honest Pricing</h3>
            <p className="mt-2 text-xs leading-relaxed text-ivory/70">
              Clear, itemized estimates with no hidden charges so you know exactly what you are paying for.
            </p>
          </div>

          <div className="bg-[#0D0D0C] p-8 transition-colors hover:bg-[#121211]">
            <span className="font-mono text-xs text-gold/80 font-bold">04</span>
            <h3 className="mt-4 font-display text-xl text-ivory">On-Time Handover</h3>
            <p className="mt-2 text-xs leading-relaxed text-ivory/70">
              Dedicated site supervisors checking daily progress to hand over your home right on schedule.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
