import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { Instagram, Linkedin, Facebook, Phone, Mail, MapPin, ArrowUpRight, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-surface-border bg-[#080808] text-ivory">
      {/* Huge subtle architectural watermark in footer background */}
      <div className="pointer-events-none absolute -bottom-10 right-0 select-none font-display text-[140px] font-bold tracking-tighter text-white/[0.02] sm:text-[200px] lg:text-[240px]">
        NIRABI
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand & Manifesto Column (4 Cols) */}
          <div className="flex flex-col items-start lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3.5 transition-transform hover:scale-105">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-gold/40 p-2 bg-[#121212] shadow-lg">
                <Image src="/logo.png" alt="NIRABI Logo" fill className="object-contain p-1" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-wider text-ivory">
                  NIRABI
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-medium -mt-1">
                  Design Studio
                </span>
              </div>
            </Link>

            <p className="mt-6 font-display text-lg italic text-gold/90 max-w-sm">
              &ldquo;{siteConfig.tagline}&rdquo;
            </p>

            <p className="mt-3 max-w-sm text-xs leading-relaxed text-ivory/65">
              {siteConfig.heroSupportingText}
            </p>

            {/* Social Media Link Pills */}
            <div className="mt-8 flex items-center gap-3">
              {siteConfig.contact.instagram && (
                <a
                  href={siteConfig.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#121212] text-ivory/70 transition-all hover:border-gold hover:text-gold hover:bg-gold/10 hover:shadow-[0_0_15px_rgba(242,223,181,0.25)]"
                  aria-label="Instagram"
                >
                  <Instagram size={17} />
                </a>
              )}
              {siteConfig.contact.facebook && (
                <a
                  href={siteConfig.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#121212] text-ivory/70 transition-all hover:border-gold hover:text-gold hover:bg-gold/10 hover:shadow-[0_0_15px_rgba(242,223,181,0.25)]"
                  aria-label="Facebook"
                >
                  <Facebook size={17} />
                </a>
              )}
              {siteConfig.contact.linkedin && (
                <a
                  href={siteConfig.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#121212] text-ivory/70 transition-all hover:border-gold hover:text-gold hover:bg-gold/10 hover:shadow-[0_0_15px_rgba(242,223,181,0.25)]"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={17} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Navigation Links (2 Cols) */}
          <div className="flex flex-col lg:col-span-2">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-6">
              Navigation
            </div>
            <ul className="space-y-3.5 text-xs text-ivory/70">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">Home Studio</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">About Studio & Philosophy</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold transition-colors">Design Disciplines</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-gold transition-colors">Curated Portfolio</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">Private Consultation</Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-gold transition-colors text-ivory/40">Studio Portal</Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct Column (3 Cols) */}
          <div className="flex flex-col lg:col-span-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-6">
              Studio Flagship
            </div>
            <ul className="space-y-4 text-xs text-ivory/80">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-3 font-semibold transition-colors hover:text-gold"
                >
                  <Phone size={15} className="text-gold shrink-0" />
                  <span className="font-mono">{siteConfig.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-gold break-all"
                >
                  <Mail size={15} className="text-gold shrink-0" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 leading-relaxed pt-1">
                <MapPin size={17} className="text-gold shrink-0 mt-0.5" />
                <span className="text-ivory/65 leading-relaxed">
                  {siteConfig.contact.address}
                </span>
              </li>
            </ul>

            <div className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-gold transition-all hover:bg-gold hover:text-near-black"
              >
                <span>Schedule Consultation</span>
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Map Preview (3 Cols) */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#121212] lg:col-span-3 relative shadow-2xl">
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-near-black/90 px-3 py-1 text-[10px] font-semibold text-gold border border-gold/30 backdrop-blur-md">
              <Sparkles size={10} />
              <span>Madipakkam Studio</span>
            </div>
            <iframe
              title="NIRABI DESIGN STUDIO Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15551.493922119799!2d80.1871239!3d12.9799547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525df1f6305a2f%3A0xc3b2e54c6fa2f1c8!2sMoovarasanpet%2C%20Madipakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "220px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full grayscale invert contrast-125 opacity-75 transition-opacity hover:opacity-100"
            />
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-ivory/50 sm:flex-row">
          <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>

          <div className="flex items-center gap-2 text-ivory/50 font-mono text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span>Chennai, Tamil Nadu · Luxury Architectural Interiors</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
