"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Menu, Phone, Mail, MapPin, ArrowUpRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

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
      <header
        style={{ transform: "translateZ(0)" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out will-change-transform ${
          scrolled
            ? "bg-[#090909]/95 backdrop-blur-md border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
            : "bg-gradient-to-b from-[#080808]/90 via-[#080808]/40 to-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 lg:px-10 ${
            scrolled ? "h-20 py-3" : "h-24 py-5"
          }`}
        >
          {/* Brand Identity */}
          <Link href="/" className="group flex items-center gap-3.5 focus:outline-none">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-sm border border-gold/30 bg-[#121211] p-1 transition-colors group-hover:border-gold">
              <Image
                src="/logo.png"
                alt="NIRABI DESIGN STUDIO"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg tracking-wider font-semibold text-ivory transition-colors group-hover:text-gold">
                NIRABI
              </span>
              <span className="text-[9px] uppercase tracking-[0.28em] text-gold/80 font-medium -mt-0.5">
                Design Studio · Chennai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {siteConfig.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative text-[12px] tracking-[0.14em] uppercase font-semibold transition-colors duration-200 ${
                    active ? "text-gold" : "text-ivory/70 hover:text-ivory"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-gold transition-all duration-200 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}

            <div className="h-4 w-px bg-white/15" />

            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 border border-gold/50 bg-gold/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold transition-all duration-200 hover:border-gold hover:bg-gold hover:text-near-black"
            >
              <span>{siteConfig.primaryCta}</span>
              <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 bg-[#121211] text-ivory transition-colors hover:border-gold/50 hover:text-gold md:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Architectural Drawer */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-[#090909] text-ivory transition-all duration-300 ease-out md:hidden ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
        }`}
        aria-hidden={!open}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 bg-[#0D0D0C]">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-sm border border-gold/30 bg-[#121211] p-1">
              <Image src="/logo.png" alt="NIRABI Logo" fill className="object-contain p-0.5" priority />
            </div>
            <div>
              <div className="font-display text-base font-semibold text-ivory">NIRABI</div>
              <div className="text-[9px] uppercase tracking-[0.24em] text-gold">Design Studio · Chennai</div>
            </div>
          </div>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 text-ivory/80 transition-colors hover:border-gold hover:text-gold"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-1 flex-col justify-center gap-5 px-8 py-6">
          {siteConfig.nav.map((item, i) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`group flex items-baseline justify-between border-b border-white/5 pb-3 font-display text-2xl leading-tight transition-colors ${
                  active ? "text-gold" : "text-ivory hover:text-gold"
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs font-semibold text-gold/70">0{i + 1}</span>
                  <span>{item.label}</span>
                </div>
                <ArrowUpRight size={16} className="text-white/20 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold" />
              </Link>
            );
          })}
        </nav>

        {/* Studio Direct Shortcuts Footer */}
        <div className="border-t border-white/10 bg-[#0C0C0B] px-8 pb-8 pt-6 space-y-4">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center gap-2 border border-gold bg-gold px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-near-black transition-colors hover:bg-gold-light"
          >
            <span>{siteConfig.primaryCta}</span>
            <ArrowUpRight size={14} />
          </Link>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center justify-center gap-2 border border-white/10 bg-[#141413] py-2.5 text-xs font-mono text-ivory/80 hover:text-gold transition-colors"
            >
              <Phone size={13} className="text-gold" />
              <span>Call Studio</span>
            </a>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20NIRABI%20Design%20Studio,%20I%20would%20like%20to%20discuss%20an%20architectural%20interior%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-white/10 bg-[#141413] py-2.5 text-xs font-mono text-ivory/80 hover:text-gold transition-colors"
            >
              <MessageCircle size={13} className="text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="text-[11px] text-ivory/50 flex items-start gap-2 pt-1 leading-relaxed">
            <MapPin size={13} className="text-gold shrink-0 mt-0.5" />
            <span>Madipakkam, Chennai, Tamil Nadu 600091</span>
          </div>
        </div>
      </div>
    </>
  );
}
