"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRequireAdmin } from "@/lib/adminAuth";
import { api } from "@/lib/api";
import { Search, Download, Phone, MapPin, ArrowUpRight } from "lucide-react";

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
  lead_tier: string;
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
    const rows = leads.map((l) =>
      [
        l.name || "",
        l.phone || "",
        l.email || "",
        l.location || "",
        l.property_type || "",
        l.project_type || "",
        l.design_style || "",
        l.budget || "",
        l.lead_status || "Enquired",
        new Date(l.created_at).toLocaleDateString(),
      ]
        .map((field) => `"${field}"`)
        .join(",")
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nirabi_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!checked || !token) return null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">Leads Management</span>
          <h1 className="mt-1 font-display text-3xl font-semibold text-ivory">Customer Leads</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="border border-white/10 bg-[#0C0C0B] px-3.5 py-2 text-xs flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase text-ivory/40">Total Leads:</span>
            <span className="font-bold text-gold">{leads.length}</span>
          </div>
          <button
            onClick={exportCSV}
            disabled={leads.length === 0}
            className="inline-flex items-center gap-2 border border-gold bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wider text-near-black hover:bg-gold-light transition-colors disabled:opacity-40"
          >
            <Download size={13} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-4 border border-white/10 bg-[#0C0C0B] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ivory/40" />
          <input
            type="text"
            placeholder="Search name, phone, email, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-white/10 bg-[#141413] pl-9 pr-4 py-2 text-xs text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setStatus("")}
            className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              status === "" ? "border-gold bg-gold text-near-black font-semibold" : "border-white/10 bg-[#121211] text-ivory/60 hover:text-ivory"
            }`}
          >
            All
          </button>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                status === s ? "border-gold bg-gold text-near-black font-semibold" : "border-white/10 bg-[#121211] text-ivory/60 hover:text-ivory"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="border border-white/10 bg-[#0C0C0B]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap min-w-[850px]">
            <thead className="border-b border-white/10 bg-[#0F0F0E] font-mono text-[10px] uppercase text-ivory/40">
              <tr>
                <th className="px-5 py-3.5">Client Contact</th>
                <th className="px-5 py-3.5">Scope &amp; Typology</th>
                <th className="px-5 py-3.5">Budget &amp; Style</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-ivory/80">
              {loading && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-ivory/40">
                    Retrieving records from MySQL database...
                  </td>
                </tr>
              )}
              {!loading && leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-ivory/40">
                    No lead records match your search criteria.
                  </td>
                </tr>
              )}
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="font-semibold text-ivory hover:text-gold transition-colors text-xs"
                    >
                      {lead.name || "Unnamed Inquiry"}
                    </Link>
                    <div className="mt-1 flex items-center gap-2 font-mono text-[11px] text-ivory/60">
                      <Phone size={11} className="text-gold" />
                      {lead.phone || "—"}
                    </div>
                    {lead.location && (
                      <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-ivory/40">
                        <MapPin size={10} className="text-gold" />
                        {lead.location}
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-medium text-ivory">
                      {lead.project_type || lead.property_type || "Interior Architecture"}
                    </div>
                    {lead.property_size && (
                      <div className="font-mono text-[11px] text-ivory/40">
                        {lead.property_size} sq.ft
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-mono text-xs text-ivory">
                      {lead.budget || "Unspecified"}
                    </div>
                    {lead.design_style && (
                      <span className="mt-1 inline-block border border-gold/30 bg-gold/10 px-2 py-0.5 font-mono text-[10px] text-gold">
                        {lead.design_style}
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={lead.lead_status}
                      onChange={async (e) => {
                        const next = e.target.value;
                        const prev = lead.lead_status;
                        setLeads((items) =>
                          items.map((l) => (l.id === lead.id ? { ...l, lead_status: next } : l))
                        );
                        try {
                          await api.updateLeadStatus(token, lead.id, next);
                        } catch {
                          setLeads((items) =>
                            items.map((l) => (l.id === lead.id ? { ...l, lead_status: prev } : l))
                          );
                          alert("Failed to update status");
                        }
                      }}
                      className="border border-white/10 bg-[#141413] px-2.5 py-1 font-mono text-[11px] text-gold uppercase focus:border-gold focus:outline-none"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>

                  <td className="px-5 py-4 font-mono text-[11px] text-ivory/50">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="inline-flex items-center gap-1 font-mono text-xs text-gold hover:text-gold-light"
                    >
                      <span>View</span>
                      <ArrowUpRight size={12} />
                    </Link>
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
