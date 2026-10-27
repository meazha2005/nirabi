"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { siteConfig } from "@/data/siteConfig";
import { Phone, Mail, MapPin, CheckCircle2, ArrowUpRight } from "lucide-react";

const INDIAN_PHONE_RE = /^(\+91[-\s]?)?[6-9]\d{9}$/;

type FormState = {
  name: string;
  phone: string;
  email: string;
  location: string;
  property_type: string;
  project_type: string;
  budget: string;
  requirements: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  location: "",
  property_type: "Residential Apartment",
  project_type: "Complete Turnkey Interior",
  budget: "₹15L – ₹30L",
  requirements: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Your full name is required.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    else if (!INDIAN_PHONE_RE.test(form.phone.replace(/\s/g, ""))) next.phone = "Enter a valid 10-digit Indian mobile number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.requirements.trim()) next.requirements = "Please share a brief note on your space.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      await api.createLead({ ...form, source: "Architectural Consultation Form" });
      setStatus("sent");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative min-h-screen bg-[#080808] pb-24 pt-36 lg:pt-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Page Top Heading */}
        <div className="border-b border-white/10 pb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
            Get In Touch
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl text-ivory sm:text-5xl lg:text-6xl">
            Book your free design consultation.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ivory/80">
            Tell us about your house or apartment, your timeline, and your requirements. We will contact you within 24 hours to schedule a free site visit or discussion.
          </p>
        </div>

        {/* Two-Column Form & Studio Info */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Studio Information */}
          <div className="space-y-8 lg:col-span-5">
            <div className="border border-white/10 bg-[#0C0C0B] p-8">
              <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-medium">Contact Details</span>
              <div className="mt-6 space-y-4 text-xs">
                <div>
                  <span className="font-mono text-[10px] uppercase text-ivory/50 block">Call Directly</span>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="mt-1 flex items-center gap-2.5 text-base font-display text-ivory hover:text-gold transition-colors"
                  >
                    <Phone size={16} className="text-gold" />
                    <span>+91 95431 17399</span>
                  </a>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <span className="font-mono text-[10px] uppercase text-ivory/50 block">WhatsApp Support</span>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20NIRABI%20Design%20Studio`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center gap-2.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <span>Chat on WhatsApp (+91 95431 17399)</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <span className="font-mono text-[10px] uppercase text-ivory/50 block">Email Us</span>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="mt-1 flex items-center gap-2.5 text-sm text-ivory hover:text-gold transition-colors break-all"
                  >
                    <Mail size={16} className="text-gold" />
                    <span>{siteConfig.contact.email}</span>
                  </a>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <span className="font-mono text-[10px] uppercase text-ivory/50 block">Studio Address</span>
                  <div className="mt-1 flex items-start gap-2.5 text-xs text-ivory/80 leading-relaxed">
                    <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                    <span>{siteConfig.contact.address}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <span className="font-mono text-[10px] uppercase text-ivory/50 block">Working Hours</span>
                  <div className="mt-1 text-xs text-ivory/70 leading-relaxed">
                    Monday to Saturday: 9:30 AM – 7:30 PM<br />
                    Sundays: By Prior Appointment
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Styled Map View */}
            <div className="h-64 w-full overflow-hidden border border-white/10 bg-[#121211]">
              <iframe
                title="NIRABI DESIGN STUDIO Madipakkam Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.898687705139!2d80.19017687574768!3d12.978335914725048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d8048995a97%3A0xe543fa01815dbb26!2sMoovarasanpet%2C%20Madipakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.9)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="border border-white/10 bg-[#0C0C0B] p-8 sm:p-10">
              <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-medium">Send an Inquiry</span>
              <h2 className="mt-1 font-display text-2xl text-ivory">Tell Us About Your Project</h2>

              {status === "sent" ? (
                <div className="mt-8 border border-gold/40 bg-[#141413] p-8 text-center space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center bg-gold/15 text-gold">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="font-display text-2xl text-ivory">Thank You! Message Received</h3>
                  <p className="text-xs leading-relaxed text-ivory/80 max-w-md mx-auto">
                    We have received your details. Our design team will contact you within 24 hours to discuss your floor plan and share a free quotation.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 border border-gold bg-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-near-black hover:bg-gold-light"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 space-y-6">
                  {status === "error" && (
                    <div className="border border-red-500/30 bg-red-950/20 p-4 text-xs text-red-300">
                      An error occurred while sending your inquiry. Please call us directly at 9543117399.
                    </div>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-ivory/60 block mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={update("name")}
                        placeholder="e.g. Ramesh Sundaram"
                        className="w-full border border-white/10 bg-[#141413] px-4 py-3 text-xs text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none"
                      />
                      {errors.name && <span className="mt-1 block text-[11px] text-amber-400">{errors.name}</span>}
                    </div>

                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-ivory/60 block mb-2">
                        Mobile Telephone Number *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        placeholder="e.g. 9543117399"
                        className="w-full border border-white/10 bg-[#141413] px-4 py-3 text-xs text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none"
                      />
                      {errors.phone && <span className="mt-1 block text-[11px] text-amber-400">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-ivory/60 block mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        placeholder="name@domain.com"
                        className="w-full border border-white/10 bg-[#141413] px-4 py-3 text-xs text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none"
                      />
                      {errors.email && <span className="mt-1 block text-[11px] text-amber-400">{errors.email}</span>}
                    </div>

                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-ivory/60 block mb-2">
                        Property Location (City / Area)
                      </label>
                      <input
                        type="text"
                        value={form.location}
                        onChange={update("location")}
                        placeholder="e.g. Madipakkam / ECR / Anna Nagar"
                        className="w-full border border-white/10 bg-[#141413] px-4 py-3 text-xs text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-3">
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-ivory/60 block mb-2">
                        Property Typology
                      </label>
                      <select
                        value={form.property_type}
                        onChange={update("property_type")}
                        className="w-full border border-white/10 bg-[#141413] px-4 py-3 text-xs text-ivory focus:border-gold focus:outline-none"
                      >
                        <option value="Residential Apartment">Residential Apartment</option>
                        <option value="Independent Villa">Independent Villa</option>
                        <option value="Duplex / Penthouse">Duplex / Penthouse</option>
                        <option value="Commercial Space">Commercial / Office</option>
                        <option value="Hospitality / Retail">Hospitality / Retail</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-ivory/60 block mb-2">
                        Project Scope
                      </label>
                      <select
                        value={form.project_type}
                        onChange={update("project_type")}
                        className="w-full border border-white/10 bg-[#141413] px-4 py-3 text-xs text-ivory focus:border-gold focus:outline-none"
                      >
                        <option value="Complete Turnkey Interior">Complete Turnkey Interior</option>
                        <option value="Renovation & Modernization">Renovation &amp; Remodel</option>
                        <option value="Modular Kitchen & Wardrobes">Modular Kitchen &amp; Joinery</option>
                        <option value="Design & 3D Consultation Only">Design &amp; 3D Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-ivory/60 block mb-2">
                        Estimated Budget
                      </label>
                      <select
                        value={form.budget}
                        onChange={update("budget")}
                        className="w-full border border-white/10 bg-[#141413] px-4 py-3 text-xs text-ivory focus:border-gold focus:outline-none"
                      >
                        <option value="₹10L – ₹18L">₹10L – ₹18L</option>
                        <option value="₹18L – ₹35L">₹18L – ₹35L</option>
                        <option value="₹35L – ₹60L">₹35L – ₹60L</option>
                        <option value="₹60L – ₹1.2Cr">₹60L – ₹1.2Cr</option>
                        <option value="₹1.2Cr+">₹1.2Cr+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider text-ivory/60 block mb-2">
                      Brief Description of Space &amp; Requirements *
                    </label>
                    <textarea
                      rows={4}
                      value={form.requirements}
                      onChange={update("requirements")}
                      placeholder="Share dimensions, timeline expectations, current construction status, or any specific stylistic requests..."
                      className="w-full border border-white/10 bg-[#141413] px-4 py-3 text-xs text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none"
                    />
                    {errors.requirements && <span className="mt-1 block text-[11px] text-amber-400">{errors.requirements}</span>}
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex w-full items-center justify-center gap-2 border border-gold bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-near-black transition-all hover:bg-gold-light disabled:opacity-50"
                    >
                      <span>{status === "sending" ? "Sending Details..." : "Send Inquiry Details"}</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
