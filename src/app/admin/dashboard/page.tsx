"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRequireAdmin } from "@/lib/adminAuth";
import { api } from "@/lib/api";
import { Users, MessageSquare, CheckCircle2, Clock, CheckCheck, XCircle, ArrowUpRight, ShieldCheck, Sparkles, Flame } from "lucide-react";

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
      api.getLeads(token, "?page=1&page_size=6")
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
      title: "Total Inquiries",
      value: stats?.total_leads || 0,
      icon: Users,
      iconBg: "bg-blue-950/80 border border-blue-500/30 text-blue-400",
      subtext: "All spatial client requests",
    },
    {
      title: "Active Enquiries",
      value: stats?.enquired_leads || 0,
      icon: MessageSquare,
      iconBg: "bg-gold/15 border border-gold/40 text-gold",
      subtext: "Design Concierge & Form",
    },
    {
      title: "Confirmed Projects",
      value: stats?.confirmed_leads || 0,
      icon: CheckCircle2,
      iconBg: "bg-emerald-950/80 border border-emerald-500/30 text-emerald-400",
      subtext: "Confirmed execution pipeline",
    },
    {
      title: "High Intent (Hot)",
      value: stats?.hot_leads || 0,
      icon: Flame,
      iconBg: "bg-amber-950/80 border border-amber-500/30 text-amber-400",
      subtext: "High score qualified leads",
    },
  ];

  return (
    <div className="px-6 py-8 sm:px-10 space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-surface-border pb-6">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ivory">Executive Dashboard</h1>
          <p className="mt-1 text-xs text-ivory/60">
            Real-time telemetry and management for NIRABI DESIGN STUDIO leads pipeline.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-xs font-semibold text-near-black hover:bg-gold-light transition-all shadow-md"
          >
            <span>View All Leads Pipeline</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-950/30 p-4 text-xs text-red-300">
          {error}
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.title}
              className="relative overflow-hidden rounded-2xl border border-surface-border bg-surface-card p-6 shadow-md transition-all hover:border-gold/40 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ivory/60 uppercase tracking-wider">
                  {kpi.title}
                </span>
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${kpi.iconBg} shadow-sm`}>
                  <Icon size={18} />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold text-ivory">
                  {loading ? "…" : kpi.value}
                </span>
              </div>
              <div className="mt-2 text-[11px] text-ivory/50 font-medium">
                {kpi.subtext}
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Status Pipeline Bar */}
      <div className="rounded-2xl border border-surface-border bg-surface-card p-5 shadow-sm">
        <div className="text-xs font-semibold text-gold uppercase tracking-wider mb-4">
          Pipeline Status Breakdown
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-surface-border">
          <div className="flex items-center gap-3 px-3 py-2 sm:py-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400">
              <Clock size={16} />
            </div>
            <div>
              <div className="text-xs text-ivory/60 font-medium">Pending Follow-up</div>
              <div className="font-display text-xl font-bold text-ivory">{stats?.pending_leads || 0}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 sm:py-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-400">
              <CheckCheck size={16} />
            </div>
            <div>
              <div className="text-xs text-ivory/60 font-medium">Completed Projects</div>
              <div className="font-display text-xl font-bold text-ivory">{stats?.completed_leads || 0}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 sm:py-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-950/60 border border-red-500/30 text-red-400">
              <XCircle size={16} />
            </div>
            <div>
              <div className="text-xs text-ivory/60 font-medium">Archived / Rejected</div>
              <div className="font-display text-xl font-bold text-ivory">{stats?.reject_leads || 0}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Split Grid Section */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left 2 Cols: Recent Leads Table */}
        <div className="lg:col-span-2 rounded-2xl border border-surface-border bg-surface-card p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-surface-border">
            <div>
              <h2 className="font-display text-lg font-semibold text-ivory">Recent Inbound Inquiries</h2>
              <p className="text-xs text-ivory/50">Latest client submissions via Design Concierge and Contact form</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-gold hover:underline underline-offset-4"
            >
              Full Pipeline →
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-surface-border text-[11px] uppercase tracking-wider text-ivory/50 bg-[#121212]">
                <tr>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Scope</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {loading && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-ivory/40">
                      Loading latest inquiries…
                    </td>
                  </tr>
                )}
                {!loading && recentLeads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-ivory/40">
                      No inbound leads recorded yet in database.
                    </td>
                  </tr>
                )}
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3.5 font-medium text-ivory">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="hover:text-gold transition-colors font-semibold"
                      >
                        {lead.name || "Unnamed Client"}
                      </Link>
                    </td>
                    <td className="px-4 py-3.5 text-ivory/70 font-mono text-[11px]">
                      {lead.phone || "—"}
                    </td>
                    <td className="px-4 py-3.5 text-ivory/70">
                      {lead.project_type || "Interior Project"}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gold font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        {lead.lead_status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-gold hover:underline"
                      >
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Management Shortcuts */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-surface-border bg-surface-card p-6 shadow-sm">
            <h3 className="font-display text-base font-semibold text-ivory">Direct Shortcuts</h3>
            <p className="mt-1 text-xs text-ivory/50">Rapid administration controls</p>

            <div className="mt-5 space-y-3">
              <Link
                href="/admin/leads"
                className="flex items-center justify-between rounded-xl border border-surface-border bg-[#121212] p-3.5 text-xs font-medium text-ivory hover:border-gold/40 hover:text-gold transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Users size={16} className="text-gold" />
                  Manage All Leads
                </span>
                <ArrowUpRight size={14} className="text-ivory/40" />
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between rounded-xl border border-surface-border bg-[#121212] p-3.5 text-xs font-medium text-ivory hover:border-gold/40 hover:text-gold transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-gold" />
                  Security & Admin Password
                </span>
                <ArrowUpRight size={14} className="text-ivory/40" />
              </Link>

              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-surface-border bg-[#121212] p-3.5 text-xs font-medium text-ivory hover:border-gold/40 hover:text-gold transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Sparkles size={16} className="text-gold" />
                  Preview Public Studio
                </span>
                <ArrowUpRight size={14} className="text-ivory/40" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
