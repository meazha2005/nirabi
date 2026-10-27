import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

export default function HomeServicesOverview() {
  const featuredServices = services.slice(0, 4);

  return (
    <section className="relative border-b border-white/10 bg-[#0A0A09] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              What We Do
            </span>
            <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
              Our Interior Services
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold/80 transition-colors hover:text-gold"
          >
            <span>View All Services</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 4-Column Services Grid */}
        <div className="mt-8 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service, i) => (
            <Link
              key={service.id}
              href="/services"
              className="group flex flex-col justify-between bg-[#0C0C0B] p-6 transition-colors hover:bg-[#121211]"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-white/10 bg-[#141413]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#080808]/85 px-2 py-0.5 font-mono text-[10px] text-gold border border-white/10 font-bold">
                    0{i + 1}
                  </div>
                </div>

                <h3 className="mt-5 font-display text-lg text-ivory transition-colors group-hover:text-gold">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ivory/70 line-clamp-3">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-wider text-gold/80 group-hover:text-gold">
                <span>See Details</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
