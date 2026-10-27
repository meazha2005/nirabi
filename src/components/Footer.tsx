import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060606] text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-5">
            <Link href="/" className="group inline-flex items-center gap-3.5 focus:outline-none">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm border border-gold/30 bg-[#121211] p-1 transition-colors group-hover:border-gold">
                <Image src="/logo.png" alt="NIRABI Logo" fill className="object-contain p-0.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-wider text-ivory">
                  NIRABI
                </span>
                <span className="text-[10px] uppercase tracking-[0.26em] text-gold font-medium -mt-1">
                  Design Studio · Chennai
                </span>
              </div>
            </Link>

            <p className="mt-6 max-w-sm font-display text-base italic text-gold/90">
              &ldquo;{siteConfig.tagline}&rdquo;
            </p>

            <p className="mt-3 max-w-sm text-xs leading-relaxed text-ivory/70">
              Complete home interior design and turnkey execution in Chennai. We design and build comfortable, beautiful spaces you will love to live in.
            </p>

            <div className="mt-8 space-y-2.5 text-xs">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2.5 text-ivory/80 transition-colors hover:text-gold"
              >
                <Phone size={13} className="text-gold" />
                <span>+91 95431 17399</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20NIRABI%20Design%20Studio`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-ivory/80 transition-colors hover:text-emerald-400"
              >
                <MessageCircle size={13} className="text-emerald-400" />
                <span>WhatsApp: +91 95431 17399</span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2.5 text-ivory/80 transition-colors hover:text-gold"
              >
                <Mail size={13} className="text-gold" />
                <span>{siteConfig.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Directory */}
          <div className="lg:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-medium">
              Quick Links
            </span>
            <ul className="mt-6 space-y-3 text-xs uppercase tracking-wider font-medium text-ivory/70">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Studio Location & Map Preview */}
          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-medium">
              Our Studio Location
            </span>
            <div className="mt-6 space-y-2 text-xs text-ivory/70">
              <div className="flex items-start gap-2.5 leading-relaxed">
                <MapPin size={15} className="text-gold shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="pt-2 text-[11px] text-ivory/50">
                Monday – Saturday: 9:30 AM – 7:30 PM<br />
                Sundays: Strictly by Prior Appointment
              </div>
            </div>

            {/* Dark Styled Map Preview */}
            <div className="mt-6 h-36 w-full overflow-hidden rounded-sm border border-white/10 bg-[#141413]">
              <iframe
                title="NIRABI DESIGN STUDIO Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.898687705139!2d80.19017687574768!3d12.978335914725048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d8048995a97%3A0xe543fa01815dbb26!2sMoovarasanpet%2C%20Madipakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.9)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-[11px] text-ivory/40 sm:flex-row sm:items-center">
          <div>
            © {new Date().getFullYear()} NIRABI DESIGN STUDIO. All rights reserved.
          </div>
          <div className="font-mono text-[10px] tracking-wider text-ivory/50">
            12°59'N 80°11'E · MADIPAKKAM, CHENNAI, TAMIL NADU
          </div>
        </div>
      </div>
    </footer>
  );
}
