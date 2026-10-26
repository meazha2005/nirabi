"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRequireAdmin } from "@/lib/adminAuth";
import { api } from "@/lib/api";
import { Trash2, Search, Download, Eye, Phone, MapPin } from "lucide-react";

type Lead = {
  id: string;
  name: string | null;
  phone: string | null;
  email?: string | null;
  location?: string | null;
  property_type?: string | null;
  project_type: string | null;
  property_size?: string | null;
  budget: string | null;
  design_style: string | null;
  lead_status: string;
  created_at: string;
};

const STATUSES = ["Enquired", "Pending", "Confirmed", "Completed", "Reject"];

export default function AdminLeadsPage() {
  const { token, checked } = useRequireAdmin();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (search) params.set("search", search);
    api
      .getLeads(token, params.toString() ? `?${params.toString()}` : "")
      .then((res) => setLeads((res as any).items || []))
      .finally(() => setLoading(false));
  }, [token, status, search]);

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ["Name", "Phone", "Email", "Location", "Property Type", "Project Scope", "Design Style", "Budget", "Status", "Date"];
    const rows = leads.map(l => [
      l.name || "",
      l.phone || "",
      l.email || "",
      l.location || "",
      l.property_type || "",
      l.project_type || "",
      l.design_style || "",
      l.budget || "",
      l.lead_status || "Enquired",
      new Date(l.created_at).toLocaleDateString()
    ].map(field => `"${field}"`).join(","));

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nirabi_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!checked || !token) return null;

  return (
    <div className="px-6 py-8 sm:px-10 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-surface-border pb-6">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ivory">Leads Pipeline</h1>
          <p className="mt-1 text-xs text-ivory/60">
            Track, qualify, and manage client interior design submissions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-surface-card border border-surface-border px-4 py-2 text-xs shadow-sm flex items-center gap-2">
            <span className="text-ivory/50">Total Records:</span>
            <span className="font-bold text-gold text-sm">{leads.length}</span>
          </div>
          <button
            onClick={exportCSV}
            disabled={leads.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-xs font-semibold text-near-black hover:bg-gold-light transition-all shadow-md disabled:opacity-40"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search & Status Filter Bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-2xl border border-surface-border bg-surface-card p-4 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ivory/40" />
          <input
            type="text"
            placeholder="Search client name, phone, email, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-surface-border bg-[#121212] pl-10 pr-4 py-2.5 text-xs text-ivory outline-none placeholder:text-ivory/30 focus:border-gold transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gold hover:text-gold-light"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setStatus("")}
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
              status === ""
                ? "bg-gold text-near-black shadow-md"
                : "bg-[#121212] border border-surface-border text-ivory/70 hover:border-gold/40 hover:text-ivory"
            }`}
          >
            All Leads
          </button>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                status === s
                  ? "bg-gold text-near-black shadow-md"
                  : "bg-[#121212] border border-surface-border text-ivory/70 hover:border-gold/40 hover:text-ivory"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main Leads Table */}
      <div className="overflow-hidden rounded-2xl border border-surface-border bg-surface-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap min-w-[850px]">
            <thead className="border-b border-surface-border text-[11px] uppercase tracking-wider text-ivory/50 bg-[#121212]">
              <tr>
                <th className="px-5 py-3.5">Client Contact</th>
                <th className="px-5 py-3.5">Project Scope</th>
                <th className="px-5 py-3.5">Budget & Style</th>
                <th className="px-5 py-3.5">Pipeline Status</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {loading && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-ivory/40">
                    Retrieving lead records from MySQL…
                  </td>
                </tr>
              )}
              {!loading && leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-ivory/40">
                    No leads found matching your criteria.
                  </td>
                </tr>
              )}
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                  {/* Client Contact */}
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="font-semibold text-ivory text-xs hover:text-gold transition-colors"
                    >
                      {lead.name || "Unnamed Inquiry"}
                    </Link>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-ivory/60 font-mono">
                      <Phone size={12} className="text-gold" />
                      {lead.phone || "—"}
                    </div>
                    {lead.location && (
                      <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-ivory/40">
                        <MapPin size={10} className="text-gold" />
                        {lead.location}
                      </div>
                    )}
                  </td>

                  {/* Project Details */}
                  <td className="px-5 py-4">
                    <div className="font-medium text-ivory">
                      {lead.project_type || lead.property_type || "Interior Consultation"}
                    </div>
                    {lead.property_size && (
                      <div className="text-[11px] text-ivory/50">
                        Size: {lead.property_size}
                      </div>
                    )}
                  </td>

                  {/* Budget & Style */}
                  <td className="px-5 py-4">
                    <div className="text-ivory font-medium">
                      {lead.budget ? lead.budget : "Unspecified"}
                    </div>
                    {lead.design_style && (
                      <div className="inline-block mt-1 rounded bg-gold/15 border border-gold/30 px-2 py-0.5 text-[10px] font-semibold text-gold">
                        {lead.design_style}
                      </div>
                    )}
                  </td>

                  {/* Pipeline Status Selector */}
                  <td className="px-5 py-4">
                    <select
                      value={lead.lead_status}
                      onChange={async (e) => {
                        const newStatus = e.target.value;
                        const oldStatus = lead.lead_status;
                        setLeads((prev) =>
                          prev.map((l) => (l.id === lead.id ? { ...l, lead_status: newStatus } : l))
                        );
                        try {
                          await api.updateLeadStatus(token, lead.id, newStatus);
                        } catch (err) {
                          setLeads((prev) =>
                            prev.map((l) => (l.id === lead.id ? { ...l, lead_status: oldStatus } : l))
                          );
                          alert("Failed to update lead status");
                        }
                      }}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-semibold outline-none cursor-pointer transition-colors ${
                        lead.lead_status === "Confirmed"
                          ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                          : lead.lead_status === "Reject"
                          ? "bg-red-950/80 border-red-500/40 text-red-300"
                          : lead.lead_status === "Completed"
                          ? "bg-blue-950/80 border-blue-500/40 text-blue-300"
                          : lead.lead_status === "Pending"
                          ? "bg-amber-950/80 border-amber-500/40 text-amber-300"
                          : "bg-surface-dark border-surface-border text-ivory"
                      }`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-near-black text-ivory">
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Inquiry Date */}
                  <td className="px-5 py-4 text-ivory/50 text-xs">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right space-x-2">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-surface-border bg-[#121212] text-ivory hover:border-gold hover:text-gold transition-colors text-xs font-semibold"
                    >
                      <Eye size={13} /> View
                    </Link>
                    <button
                      onClick={async () => {
                        if (
                          confirm(
                            `Delete lead record "${lead.name || "Unnamed"}"? This action cannot be undone.`
                          )
                        ) {
                          try {
                            await api.deleteLead(token, lead.id);
                            setLeads((prev) => prev.filter((l) => l.id !== lead.id));
                          } catch (err) {
                            alert("Failed to delete lead");
                          }
                        }
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-500/30 bg-red-950/30 text-red-400 hover:bg-red-500 hover:text-white transition-colors text-xs font-medium"
                      title="Delete Lead"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
