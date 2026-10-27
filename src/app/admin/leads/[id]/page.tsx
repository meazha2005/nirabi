"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useRequireAdmin } from "@/lib/adminAuth";
import { api } from "@/lib/api";
import { ArrowLeft, Phone, Mail, MapPin, Building, Home, Ruler, Palette, DollarSign, Calendar, MessageSquare, Bot } from "lucide-react";

type Lead = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  location: string | null;
  property_type: string | null;
  project_type: string | null;
  property_size: string | null;
  design_style: string | null;
  budget: string | null;
  timeline: string | null;
  requirements: string | null;
  lead_status: string;
};

type Conversation = {
  id: string;
  summary: string | null;
  messages: { role: string; content: string; created_at: string }[];
};

const STATUSES = ["Enquired", "Pending", "Confirmed", "Completed", "Reject"];

export default function AdminLeadDetailPage() {
  const { token, checked } = useRequireAdmin();
  const params = useParams();
  const leadId = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!token) return;
    api.getLead(token, leadId).then((res) => setLead(res as Lead));
    api.getLeadConversations(token, leadId).then((res) => setConversations(res as Conversation[]));
  }, [token, leadId]);

  const updateStatus = async (status: string) => {
    if (!token || !lead) return;
    const oldLead = { ...lead };
    setLead({ ...lead, lead_status: status });
    setUpdating(true);
    try {
      const updated = await api.updateLeadStatus(token, leadId, status);
      setLead(updated as Lead);
    } catch {
      setLead(oldLead);
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (!checked || !token) return null;
  if (!lead) return <div className="px-6 py-12 text-center text-xs text-ivory/50">Loading lead details...</div>;

  const specs = [
    { label: "Phone Number", value: lead.phone, icon: Phone },
    { label: "Email Address", value: lead.email, icon: Mail },
    { label: "Location", value: lead.location, icon: MapPin },
    { label: "Property Type", value: lead.property_type, icon: Home },
    { label: "Project Scope", value: lead.project_type, icon: Building },
    { label: "Floor Area", value: lead.property_size ? `${lead.property_size} sq.ft` : null, icon: Ruler },
    { label: "Design Style", value: lead.design_style, icon: Palette },
    { label: "Budget", value: lead.budget, icon: DollarSign },
    { label: "Timeline", value: lead.timeline, icon: Calendar },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 space-y-6">
      {/* Top Header Navigation */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/leads"
            className="mb-2 inline-flex items-center gap-1.5 font-mono text-xs text-gold hover:text-gold-light transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to Leads</span>
          </Link>
          <h1 className="font-display text-3xl font-semibold text-ivory">
            {lead.name || "Customer"}
          </h1>
        </div>

        {/* Status Selector Bar */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-2 font-mono text-[10px] uppercase text-ivory/40">Status:</span>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              disabled={updating}
              className={`border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                lead.lead_status === s
                  ? "border-gold bg-gold text-near-black font-semibold"
                  : "border-white/10 bg-[#121211] text-ivory/60 hover:text-ivory"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Details */}
        <div className="space-y-6 lg:col-span-5">
          <div className="border border-white/10 bg-[#0C0C0B] p-6">
            <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-medium">Customer Details</span>
            <div className="mt-4 divide-y divide-white/5">
              {specs.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="py-3 flex items-start justify-between gap-4 text-xs">
                    <span className="flex items-center gap-2 text-ivory/50 font-mono text-[11px]">
                      <Icon size={13} className="text-gold shrink-0" />
                      {item.label}
                    </span>
                    <span className="font-medium text-ivory text-right">
                      {item.value || "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {lead.requirements && (
            <div className="border border-white/10 bg-[#0C0C0B] p-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-gold">Inquiry Narrative</span>
              <p className="mt-3 text-xs leading-relaxed text-ivory/80 whitespace-pre-line">
                {lead.requirements}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Chat Concierge Transcripts */}
        <div className="lg:col-span-7">
          <div className="border border-white/10 bg-[#0C0C0B] p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-gold">Design Concierge Transcript</span>
              <span className="font-mono text-[10px] text-ivory/40">
                {conversations.length} Session{conversations.length === 1 ? "" : "s"}
              </span>
            </div>

            {conversations.length === 0 ? (
              <div className="py-12 text-center text-xs text-ivory/40">
                This inquiry was submitted via direct contact form (no automated chat transcript recorded).
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                {conversations.map((conv) => (
                  <div key={conv.id} className="space-y-4">
                    {conv.summary && (
                      <div className="border border-gold/30 bg-gold/5 p-3 text-xs text-gold">
                        <span className="font-mono uppercase text-[9px] block">Session Summary:</span>
                        {conv.summary}
                      </div>
                    )}
                    <div className="space-y-3">
                      {conv.messages.map((m, idx) => (
                        <div
                          key={idx}
                          className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={`max-w-[85%] p-3 text-xs leading-relaxed ${
                              m.role === "user"
                                ? "bg-gold text-near-black font-medium border border-gold"
                                : "bg-[#141413] text-ivory/90 border border-white/10"
                            }`}
                          >
                            <span className="font-mono text-[9px] block uppercase mb-1 opacity-60">
                              {m.role === "user" ? "Client" : "NIRABI Concierge"}
                            </span>
                            <span className="whitespace-pre-line">{m.content}</span>
                          </div>
                          {m.created_at && (
                            <span className="mt-1 font-mono text-[9px] text-ivory/30 px-1">
                              {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
