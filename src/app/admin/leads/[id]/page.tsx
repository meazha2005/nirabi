"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useRequireAdmin } from "@/lib/adminAuth";
import { api } from "@/lib/api";
import { ArrowLeft, User, Phone, Mail, MapPin, Building, Home, Ruler, Palette, DollarSign, Calendar, FileText, MessageSquare, Bot } from "lucide-react";

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
  const router = useRouter();
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
    } catch (err) {
      setLead(oldLead);
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (!checked || !token) return null;
  if (!lead) return <div className="px-6 py-12 text-center text-xs text-ivory/50">Retrieving lead telemetry…</div>;

  const specs = [
    { label: "Phone Number", value: lead.phone, icon: Phone },
    { label: "Email Address", value: lead.email, icon: Mail },
    { label: "Location", value: lead.location, icon: MapPin },
    { label: "Property Type", value: lead.property_type, icon: Home },
    { label: "Project Category", value: lead.project_type, icon: Building },
    { label: "Property Size", value: lead.property_size, icon: Ruler },
    { label: "Design Preference", value: lead.design_style, icon: Palette },
    { label: "Budget Range", value: lead.budget, icon: DollarSign },
    { label: "Project Timeline", value: lead.timeline, icon: Calendar },
  ];

  return (
    <div className="px-6 py-8 sm:px-10 space-y-6 max-w-7xl mx-auto">
      {/* Top Header Navigation */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-surface-border pb-6">
        <div>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gold hover:text-gold-light mb-2 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Leads Pipeline
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-semibold text-ivory">
              {lead.name || "Unnamed Inquiry"}
            </h1>
          </div>
        </div>

        {/* Status Selector Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-ivory/50 font-medium mr-1">Status:</span>
          {STATUSES.map((s) => (
            <button
              key={s}
              disabled={updating}
              onClick={() => updateStatus(s)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                lead.lead_status === s
                  ? "bg-gold text-near-black shadow-md"
                  : "bg-surface-card border border-surface-border text-ivory/70 hover:border-gold/40 hover:text-ivory"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Split Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column: Client & Property Specification */}
        <div className="rounded-2xl border border-surface-border bg-surface-card p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-surface-border pb-4">
            <User size={18} className="text-gold" />
            <h2 className="font-display text-lg font-semibold text-ivory">Client Specifications</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {specs.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-xl border border-surface-border bg-[#121212] p-3.5">
                  <div className="flex items-center gap-2 text-gold text-[10px] font-semibold uppercase tracking-wider">
                    <Icon size={13} className="text-gold" />
                    {item.label}
                  </div>
                  <div className="mt-1 font-medium text-ivory text-xs break-all">
                    {item.value || "—"}
                  </div>
                </div>
              );
            })}
          </div>

          {lead.requirements && (
            <div className="rounded-xl border border-surface-border bg-[#121212] p-4">
              <div className="flex items-center gap-2 text-gold text-[10px] font-semibold uppercase tracking-wider mb-2">
                <FileText size={13} className="text-gold" />
                Additional Requirements & Notes
              </div>
              <p className="text-xs text-ivory/80 leading-relaxed">{lead.requirements}</p>
            </div>
          )}
        </div>

        {/* Right Column: Chatbot Conversation History */}
        <div className="rounded-2xl border border-surface-border bg-surface-card p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between border-b border-surface-border pb-4">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="text-gold" />
              <h2 className="font-display text-lg font-semibold text-ivory">Design Concierge Dialogue</h2>
            </div>
            <span className="text-xs text-ivory/50 font-medium">
              {conversations.length} session(s)
            </span>
          </div>

          {conversations.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center py-16 text-center text-ivory/40 text-xs">
              <Bot size={32} className="text-ivory/20 mb-2" />
              No chatbot conversation transcript recorded for this lead.
            </div>
          )}

          {conversations.map((c) => (
            <div key={c.id} className="mt-4 flex-1 flex flex-col">
              {c.summary && (
                <div className="mb-4 rounded-xl border border-gold/30 bg-gold/10 p-3.5 text-xs text-ivory font-medium">
                  <span className="font-bold text-gold uppercase tracking-wider text-[10px] block mb-1">
                    AI Lead Synthesis
                  </span>
                  {c.summary}
                </div>
              )}

              <div className="max-h-[420px] space-y-3 overflow-y-auto pr-2 flex-1">
                {c.messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                        m.role === "user"
                          ? "bg-gold text-near-black font-semibold rounded-br-none"
                          : "bg-[#121212] border border-surface-border text-ivory rounded-bl-none"
                      }`}
                    >
                      {m.content}
                    </div>
                    {m.created_at && (
                      <span className="mt-1 text-[10px] text-ivory/40 px-1 font-mono">
                        {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
