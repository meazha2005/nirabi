"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRequireAdmin } from "@/lib/adminAuth";
import { api } from "@/lib/api";
import { Users, MessageSquare, CheckCircle2, ArrowUpRight, Flame, Clock } from "lucide-react";

type Stats = {
  total_leads: number;
  enquired_leads: number;
  pending_leads: number;
  confirmed_leads: number;
  completed_leads: number;
  reject_leads: number;
  hot_leads: number;
};

type Lead = {
  id: string;
  name: string | null;
  phone: string | null;
  email?: string | null;
  project_type: string | null;
  lead_status: string;
  lead_tier: string;
  created_at: string;
};

export default function AdminDashboardPage() {
  const { token, checked } = useRequireAdmin();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([
      api.getDashboard(token),
      api.getLeads(token, "?page=1&page_size=6"),
    ])
      .then(([statsRes, leadsRes]) => {
        setStats(statsRes as Stats);
        setRecentLeads((leadsRes as any).items || []);
      })
      .catch(() => setError("Could not load dashboard metrics."))
      .finally(() => setLoading(false));
  }, [token]);

  if (!checked || !token) return null;

  const kpis = [
    {
      title: "Total Leads",
      value: stats?.total_leads || 0,
      icon: Users,
      subtext: "All customer inquiries",
    },
    {
      title: "New Inquiries",
      value: stats?.enquired_leads || 0,
      icon: MessageSquare,
      subtext: "From website & chat",
    },
    {
      title: "Confirmed Projects",
      value: stats?.confirmed_leads || 0,
      icon: CheckCircle2,
      subtext: "Projects under work",
    },
    {
      title: "Hot Leads",
      value: stats?.hot_leads || 0,
      icon: Flame,
      subtext: "High interest clients",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">Admin Dashboard</span>
          <h1 className="mt-1 font-display text-3xl font-semibold text-ivory">Studio Overview</h1>
        </div>
        <div>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 border border-gold bg-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-near-black hover:bg-gold-light transition-colors"
          >
            <span>View All Leads</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {error && (
        <div className="border border-red-500/30 bg-red-950/20 p-4 text-xs text-red-300">
          {error}
        </div>
      )}

      {/* 4 KPI Telemetry Cards */}
      <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4 border border-white/10">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.title} className="bg-[#0C0C0B] p-6 transition-colors hover:bg-[#121211]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ivory/50">
                  {kpi.title}
                </span>
                <Icon size={16} className="text-gold" />
              </div>
              <div className="mt-3 font-display text-3xl font-bold text-ivory">
                {loading ? "..." : kpi.value}
              </div>
              <span className="mt-1 block text-[11px] text-ivory/40">
                {kpi.subtext}
              </span>
            </div>
          );
        })}
      </div>

      {/* Status Breakdown Grid */}
      <div className="border border-white/10 bg-[#0C0C0B] p-6 sm:p-8">
        <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-medium">Lead Status Breakdown</span>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <div className="border border-white/5 bg-[#121211] p-3 text-center">
            <span className="font-mono text-[10px] uppercase text-ivory/40 block">Enquired</span>
            <span className="mt-1 text-xl font-bold text-gold block">{stats?.enquired_leads || 0}</span>
          </div>
          <div className="border border-white/5 bg-[#121211] p-3 text-center">
            <span className="font-mono text-[10px] uppercase text-ivory/40 block">Pending</span>
            <span className="mt-1 text-xl font-bold text-amber-400 block">{stats?.pending_leads || 0}</span>
          </div>
          <div className="border border-white/5 bg-[#121211] p-3 text-center">
            <span className="font-mono text-[10px] uppercase text-ivory/40 block">Confirmed</span>
            <span className="mt-1 text-xl font-bold text-emerald-400 block">{stats?.confirmed_leads || 0}</span>
          </div>
          <div className="border border-white/5 bg-[#121211] p-3 text-center">
            <span className="font-mono text-[10px] uppercase text-ivory/40 block">Completed</span>
            <span className="mt-1 text-xl font-bold text-blue-400 block">{stats?.completed_leads || 0}</span>
          </div>
          <div className="border border-white/5 bg-[#121211] p-3 text-center">
            <span className="font-mono text-[10px] uppercase text-ivory/40 block">Hot Tier</span>
            <span className="mt-1 text-xl font-bold text-amber-500 block">{stats?.hot_leads || 0}</span>
          </div>
          <div className="border border-white/5 bg-[#121211] p-3 text-center">
            <span className="font-mono text-[10px] uppercase text-ivory/40 block">Archived</span>
            <span className="mt-1 text-xl font-bold text-ivory/40 block">{stats?.reject_leads || 0}</span>
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="border border-white/10 bg-[#0C0C0B]">
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-medium">Recent Activity</span>
            <h2 className="mt-0.5 font-display text-xl text-ivory">Latest Inquiries</h2>
          </div>
          <Link
            href="/admin/leads"
            className="font-mono text-xs text-gold/80 hover:text-gold uppercase tracking-wider"
          >
            All Leads →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-[#0F0F0E] font-mono text-[10px] uppercase text-ivory/40">
              <tr>
                <th className="px-6 py-3.5">Client</th>
                <th className="px-6 py-3.5">Phone</th>
                <th className="px-6 py-3.5">Project Type</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Tier</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-ivory/80">
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-ivory/40">
                    No inquiries recorded yet.
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-ivory">
                      {lead.name || "Customer"}
                    </td>
                    <td className="px-6 py-4 font-mono text-ivory/70">
                      {lead.phone || "—"}
                    </td>
                    <td className="px-6 py-4 text-ivory/60 truncate max-w-[180px]">
                      {lead.project_type || "Interior Design"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="border border-white/10 bg-[#141413] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gold">
                        {lead.lead_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-mono text-[10px] font-bold ${
                        lead.lead_tier === "HOT" ? "text-amber-400" : lead.lead_tier === "WARM" ? "text-gold" : "text-ivory/50"
                      }`}>
                        {lead.lead_tier || "COLD"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="font-mono text-xs text-gold hover:underline"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
