"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { siteConfig } from "@/data/siteConfig";
import { Phone, Mail, MapPin, CheckCircle2, Clock, Sparkles, MessageSquare, ArrowRight } from "lucide-react";

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
  property_type: "",
  project_type: "",
  budget: "",
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
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    else if (!INDIAN_PHONE_RE.test(form.phone.replace(/\s/g, ""))) next.phone = "Please enter a valid 10-digit Indian phone number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email address.";
    if (!form.requirements.trim() && !form.project_type.trim())
      next.requirements = "Please brief us on your project scope.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      await api.createLead({ ...form, source: "Website Contact Suite" });
      setStatus("sent");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  };

  const openChat = () => {
    window.dispatchEvent(new CustomEvent("nirabi:open-chat"));
    window.dispatchEvent(new CustomEvent("yavi:open-chat"));
  };

  return (
    <div className="relative overflow-hidden bg-[#080808] pt-36 pb-24 lg:pt-48 lg:pb-32">
      {/* Decorative ambient background flare */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-gold/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Studio Information & Direct Lines (5 Cols) */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-6">
                <Sparkles size={14} />
                <span>Private Consultation</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ivory tracking-tight leading-[1.1]">
                Let&rsquo;s talk about <span className="italic text-gold">your space</span>.
              </h1>

              <p className="mt-6 text-base text-ivory/70 leading-relaxed font-light">
                Whether you are conceptualizing a new luxury villa, renovating an urban apartment, or designing a boutique commercial headquarters in Chennai, NIRABI transforms your aspirations into architectural reality.
              </p>
            </div>

            <div className="mt-12 space-y-8 border-t border-white/10 pt-10">
              {/* Direct Phone */}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold block mb-2">
                  Direct Studio Line
                </span>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-3 text-xl font-bold text-ivory hover:text-gold transition-colors font-mono"
                >
                  <Phone size={18} className="text-gold shrink-0" />
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </div>

              {/* Direct Email */}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold block mb-2">
                  Studio Correspondence
                </span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 text-sm text-ivory/80 hover:text-gold transition-colors break-all"
                >
                  <Mail size={18} className="text-gold shrink-0" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </div>

              {/* Madipakkam Address */}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold block mb-2">
                  Madipakkam Flagship
                </span>
                <div className="flex items-start gap-3 text-xs text-ivory/70 leading-relaxed">
                  <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                  <span>{siteConfig.contact.address}</span>
                </div>
              </div>

              {/* Hours */}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold block mb-2">
                  Consultation Hours
                </span>
                <div className="flex items-center gap-3 text-xs text-ivory/70">
                  <Clock size={16} className="text-gold shrink-0" />
                  <span>Mon – Sat: 09:30 AM – 07:30 PM (Sunday by appointment)</span>
                </div>
              </div>

              {/* Concierge Pill */}
              <div className="pt-2">
                <button
                  onClick={openChat}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-gold hover:bg-gold hover:text-near-black transition-all shadow-md"
                >
                  <MessageSquare size={14} />
                  <span>Prefer Live Concierge? Click Here</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fashion Consultation Form (7 Cols) */}
          <div className="lg:col-span-7">
            {status === "sent" ? (
              <div className="rounded-3xl border border-gold/40 bg-[#121212] p-10 text-center shadow-2xl lg:p-16">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold shadow-lg">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display text-3xl font-bold text-ivory">Consultation Registered</h3>
                <p className="mt-3 text-sm text-ivory/70 leading-relaxed max-w-md mx-auto">
                  Thank you for submitting your spatial parameters. Our principal interior architect has received your inquiry and will contact you directly within 24 hours.
                </p>
                <div className="mt-8">
                  <button
                    onClick={() => setStatus("idle")}
                    className="rounded-full bg-gold px-8 py-3 text-xs font-bold uppercase tracking-wider text-near-black hover:bg-gold-light transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-white/10 bg-[#121212] p-8 shadow-2xl sm:p-12">
                <div className="mb-8">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold block mb-1">
                    Direct Inquiry Form
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory">
                    Schedule Studio Consultation
                  </h2>
                </div>

                <form onSubmit={onSubmit} noValidate className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Full Name *" error={errors.name}>
                      <input
                        value={form.name}
                        onChange={update("name")}
                        className={inputClass}
                        aria-invalid={!!errors.name}
                        placeholder="e.g. Ramesh Kumar"
                      />
                    </Field>

                    <Field label="Phone Number *" error={errors.phone}>
                      <input
                        value={form.phone}
                        onChange={update("phone")}
                        className={inputClass}
                        aria-invalid={!!errors.phone}
                        placeholder="95431 17399"
                      />
                    </Field>

                    <Field label="Email Address" error={errors.email}>
                      <input
                        value={form.email}
                        onChange={update("email")}
                        className={inputClass}
                        aria-invalid={!!errors.email}
                        placeholder="client@domain.com"
                      />
                    </Field>

                    <Field label="Property Location">
                      <input
                        value={form.location}
                        onChange={update("location")}
                        className={inputClass}
                        placeholder="e.g. Madipakkam, ECR, Anna Nagar"
                      />
                    </Field>

                    <Field label="Property Type">
                      <select
                        value={form.property_type}
                        onChange={update("property_type")}
                        className={inputClass}
                      >
                        <option value="">Select Property Type</option>
                        <option value="Independent Villa">Independent Villa</option>
                        <option value="Luxury Apartment (3BHK / 4BHK)">Luxury Apartment (3BHK / 4BHK)</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Commercial Office">Commercial Office</option>
                        <option value="Retail / Restaurant">Retail / Restaurant</option>
                      </select>
                    </Field>

                    <Field label="Approximate Budget">
                      <input
                        value={form.budget}
                        onChange={update("budget")}
                        className={inputClass}
                        placeholder="e.g. ₹15–25 Lakhs, ₹50 Lakhs+"
                      />
                    </Field>
                  </div>

                  <Field label="Project Scope">
                    <input
                      value={form.project_type}
                      onChange={update("project_type")}
                      className={inputClass}
                      placeholder="e.g. Full Villa Interiors, Modular Kitchen, Renovation"
                    />
                  </Field>

                  <Field label="Spatial Vision & Timeline" error={errors.requirements}>
                    <textarea
                      value={form.requirements}
                      onChange={update("requirements")}
                      rows={4}
                      className={inputClass}
                      placeholder="Tell us about your space dimensions, preferred aesthetic, handover timeline, or specific joinery requirements…"
                    />
                  </Field>

                  {status === "error" && (
                    <div className="rounded-xl border border-red-500/30 bg-red-950/40 p-4 text-xs text-red-300">
                      Something went wrong submitting your inquiry. Please call us directly at 9543117399.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold py-4 text-xs font-bold uppercase tracking-wider text-near-black shadow-[0_0_25px_rgba(242,223,181,0.3)] transition-all hover:bg-gold-light hover:shadow-[0_0_35px_rgba(242,223,181,0.5)] disabled:opacity-50"
                  >
                    <span>{status === "sending" ? "Transmitting Parameters…" : "Submit Consultation Request"}</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-[#0A0A0A] px-4 py-3.5 text-xs text-ivory outline-none transition-all placeholder:text-ivory/30 focus-visible:border-gold focus-visible:bg-[#0E0E0E]";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-xs">
      <span className="mb-2 block font-medium text-ivory/80">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-[11px] text-red-400 font-medium">{error}</span>}
    </label>
  );
}
