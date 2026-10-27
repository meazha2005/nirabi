"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function FinalCTA() {
  return (
    <section className="relative border-b border-white/10 bg-[#080808] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="border border-white/10 bg-[#0B0B0A] p-8 sm:p-14 lg:p-20">
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              Start Your Project
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-ivory sm:text-5xl lg:text-6xl">
              Ready to design your dream home?
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-ivory/80 sm:text-base">
              Talk to our team today for a free design consultation. Tell us about your house or flat, and we will give you customized 3D ideas and an honest, clear budget.
            </p>

            {/* Actions */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 border border-gold bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-near-black transition-all hover:bg-gold-light"
              >
                <span>Book Free Consultation</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20NIRABI%20Design%20Studio,%20I%20would%20like%20to%20discuss%20an%20interior%20design%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 border border-white/20 bg-[#121211] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-ivory transition-all hover:border-emerald-500 hover:text-emerald-400"
              >
                <MessageCircle size={15} className="text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Studio Contact Strip */}
          <div className="mt-16 grid grid-cols-1 gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-3 text-xs text-ivory/80 transition-colors hover:text-gold"
            >
              <Phone size={15} className="text-gold shrink-0" />
              <span>+91 95431 17399</span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-3 text-xs text-ivory/80 transition-colors hover:text-gold truncate"
            >
              <Mail size={15} className="text-gold shrink-0" />
              <span className="truncate">{siteConfig.contact.email}</span>
            </a>
            <div className="flex items-center gap-3 text-xs text-ivory/70">
              <MapPin size={15} className="text-gold shrink-0" />
              <span className="truncate">Madipakkam, Chennai 600091</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
