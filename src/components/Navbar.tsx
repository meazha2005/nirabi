"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Menu, Phone, ArrowUpRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import Magnetic from "@/components/animations/Magnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      {/* Floating Capsule Header */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-5 lg:px-8">
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border transition-all duration-500 ease-out-expo ${
            scrolled
              ? "border-surface-border-gold bg-[#0A0A0A]/85 px-4 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-2xl sm:px-6 sm:py-3"
              : "border-white/10 bg-[#0E0E0E]/60 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:px-6 sm:py-3.5"
          }`}
        >
          {/* Brand Identity */}
          <Link href="/" className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/30 bg-surface-dark p-1 shadow-sm transition-colors group-hover:border-gold">
              <Image
                src="/logo.png"
                alt="NIRABI DESIGN STUDIO"
                width={30}
                height={30}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm tracking-[0.14em] font-semibold text-ivory transition-colors group-hover:text-gold sm:text-base">
                NIRABI
              </span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-gold font-medium -mt-0.5 opacity-90">
                Design Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex rounded-full border border-white/5 bg-white/[0.02] px-3 py-1">
            {siteConfig.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor="explore"
                  className={`relative rounded-full px-4 py-1.5 text-xs font-medium tracking-wider transition-all duration-300 ${
                    active
                      ? "bg-gold text-near-black font-semibold shadow-sm"
                      : "text-ivory/70 hover:text-ivory hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-ivory/80 transition-all hover:border-gold/40 hover:text-gold hover:bg-gold/5"
            >
              <Phone size={13} className="text-gold" />
              <span>{siteConfig.contact.phone}</span>
            </a>

            <Magnetic strength={20}>
              <Link
                href="/contact"
                data-cursor="explore"
                className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gold px-5 py-2 text-xs font-semibold text-near-black shadow-gold-glow transition-all duration-300 hover:bg-gold-light hover:shadow-gold-glow-lg hover:scale-[1.03]"
              >
                <span>{siteConfig.primaryCta}</span>
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 sm:hidden">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              aria-label="Call NIRABI Studio"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-surface-dark text-gold"
            >
              <Phone size={15} />
            </a>

            <button
              aria-label="Toggle navigation menu"
              onClick={() => setOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-surface-dark text-ivory"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Architectural Drawer */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col justify-between bg-[#080808]/98 px-6 pb-8 pt-6 backdrop-blur-2xl transition-all duration-500 ease-out-expo md:hidden ${
          open ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-4"
        }`}
        aria-hidden={!open}
      >
        {/* Mobile Header Bar */}
        <div className="flex items-center justify-between border-b border-surface-border pb-5">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gold/40 p-1 bg-surface-dark">
              <Image src="/logo.png" alt="NIRABI" width={32} height={32} className="object-contain" priority />
            </div>
            <div>
              <div className="font-display text-sm font-semibold tracking-wider text-ivory">NIRABI</div>
              <div className="text-[8px] uppercase tracking-[0.25em] text-gold font-medium">Design Studio</div>
            </div>
          </div>
          <button
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-surface-dark text-gold transition-colors hover:bg-gold/15"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Navigation Stagger */}
        <nav className="my-auto flex flex-col gap-5 py-6">
          {siteConfig.nav.map((item, i) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`group flex items-baseline justify-between font-display text-3xl transition-all duration-300 ${
                  active ? "text-gold" : "text-ivory hover:text-gold"
                }`}
                style={{
                  transitionDelay: open ? `${i * 45}ms` : "0ms",
                  transform: open ? "translateY(0)" : "translateY(12px)",
                  opacity: open ? 1 : 0,
                }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs font-semibold text-gold/70">0{i + 1}</span>
                  <span>{item.label}</span>
                </div>
                <ArrowUpRight size={20} className="text-ivory/20 transition-transform group-hover:text-gold group-hover:translate-x-1" />
              </Link>
            );
          })}
        </nav>

        {/* Mobile Drawer Footer */}
        <div className="space-y-4 rounded-2xl border border-surface-border bg-surface-card p-5">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-center text-xs font-bold uppercase tracking-wider text-near-black shadow-gold-glow"
          >
            <Sparkles size={14} />
            <span>{siteConfig.primaryCta}</span>
          </Link>

          <div className="flex flex-col gap-2 pt-2 text-xs text-ivory/60 border-t border-surface-border">
            <div className="flex items-center justify-between">
              <span>Direct Hotline:</span>
              <a href={`tel:${siteConfig.contact.phone}`} className="font-semibold text-gold">
                {siteConfig.contact.phone}
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span>Studio Address:</span>
              <span className="text-[11px] text-ivory/80 text-right max-w-[190px]">Madipakkam, Chennai</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
