import MaskReveal from "@/components/animations/MaskReveal";
import TextReveal from "@/components/animations/TextReveal";
import { Compass, Sparkles, CheckCircle2, ShieldCheck, Award } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#0A0A0A]">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* Main Grid: Manifesto & Philosophy */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              <Compass size={13} />
              <span>Studio Heritage & Philosophy</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight leading-[1.15]">
              Design led by material honesty and everyday living.
            </h2>
            <p className="mt-6 text-base text-ivory/75 leading-relaxed font-light">
              Founded in Chennai, NIRABI DESIGN STUDIO is an architectural and luxury interior atelier crafting residential and executive sanctuaries. We reject transient ornament in pursuit of timeless spatial proportion.
            </p>
            <p className="mt-4 text-sm text-ivory/65 leading-relaxed">
              Every commission begins with an understanding of human rhythm: how morning light falls across natural stone, the quiet acoustics of private suites, and the tactile warmth of hand-finished timber joinery.
            </p>

            {/* 4 Architectural Pillars */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <div className="font-display text-sm font-semibold text-ivory">Spatial Purity</div>
                  <div className="text-[11px] text-ivory/50">Uncluttered geometric balance</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <div className="font-display text-sm font-semibold text-ivory">Material Honesty</div>
                  <div className="text-[11px] text-ivory/50">Noble stone & certified timber</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <div className="font-display text-sm font-semibold text-ivory">Turnkey Delivery</div>
                  <div className="text-[11px] text-ivory/50">Single-point studio governance</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <div className="font-display text-sm font-semibold text-ivory">10-Year Warranty</div>
                  <div className="text-[11px] text-ivory/50">Hardware & finish endurance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <MaskReveal
                src="/images/about/studio-detail.jpg"
                alt="Architectural detail from a NIRABI DESIGN STUDIO project"
                className="aspect-[4/3] w-full"
              />
            </div>
            
            {/* Floating Telemetry Box */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-gold/40 bg-[#121212]/95 p-5 shadow-2xl backdrop-blur-md hidden sm:block max-w-[240px]">
              <div className="flex items-center gap-2 text-gold">
                <Award size={18} />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">Turnkey Standard</span>
              </div>
              <p className="mt-1 text-xs text-ivory/70">
                120+ Commissions crafted across Chennai with 100% on-time milestone delivery.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
