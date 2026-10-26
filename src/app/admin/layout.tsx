"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, LogOut, Settings, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { clearToken } from "@/lib/adminAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  const nav = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/leads", label: "Leads Pipeline", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const logout = () => {
    clearToken();
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-ivory font-body selection:bg-gold selection:text-near-black">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-surface-border bg-[#0E0E0E] text-ivory sm:flex">
        {/* Brand Header */}
        <div className="px-6 py-6 border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-gold/30 p-1 bg-near-black">
              <Image src="/logo.png" alt="NIRABI" fill className="object-contain p-0.5" />
            </div>
            <div>
              <div className="font-display text-base tracking-wide font-semibold text-ivory">NIRABI</div>
              <div className="text-[9px] uppercase tracking-widest text-gold font-medium">Admin Studio</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-3 py-6 flex-1 space-y-6">
          <div>
            <div className="px-3 pb-2 text-[10px] uppercase tracking-widest text-ivory/40 font-semibold">
              Management
            </div>
            <nav className="space-y-1">
              {nav.map((item) => {
                const Icon = item.icon;
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                      active
                        ? "bg-gold text-near-black shadow-lg shadow-gold/20"
                        : "text-ivory/70 hover:bg-white/5 hover:text-ivory"
                    }`}
                  >
                    <Icon size={18} className={active ? "text-near-black" : "text-gold/70"} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <div className="px-3 pb-2 text-[10px] uppercase tracking-widest text-ivory/40 font-semibold">
              Shortcuts
            </div>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border border-surface-border bg-surface-card px-3.5 py-2.5 text-xs text-ivory/80 transition-all hover:border-gold/40 hover:text-gold"
            >
              <span className="flex items-center gap-2 font-medium">
                <Sparkles size={14} className="text-gold" />
                Live Website
              </span>
              <ExternalLink size={12} className="text-ivory/40" />
            </a>
          </div>
        </div>

        {/* User Footer */}
        <div className="border-t border-surface-border p-4">
          <div className="flex items-center justify-between rounded-xl bg-surface-card border border-surface-border p-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
                <ShieldCheck size={16} />
              </div>
              <div className="truncate">
                <div className="truncate text-xs font-semibold text-ivory">admin@nirabi.studio</div>
                <div className="text-[10px] text-gold/80">SuperAdmin</div>
              </div>
            </div>
            <button
              onClick={logout}
              title="Log out"
              className="rounded-lg p-1.5 text-ivory/40 hover:bg-white/10 hover:text-red-400 transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-surface-border bg-near-black/90 px-6 backdrop-blur-md sm:px-10">
          <div className="flex items-center gap-3">
            <span className="text-xs text-ivory/40">Portal</span>
            <span className="text-ivory/20">/</span>
            <span className="text-xs font-semibold text-gold capitalize">
              {pathname.split("/")[2] || "Dashboard"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-xs text-gold sm:flex">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span>System Live (MySQL nbs_ Ready)</span>
            </div>
          </div>
        </header>

        <main className="flex-1 pb-20 sm:pb-10">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-surface-border bg-near-black p-2 text-ivory sm:hidden pb-safe">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-xl p-2 text-[10px] font-medium transition-colors ${
                active ? "bg-gold text-near-black font-semibold" : "text-ivory/60 hover:text-ivory"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={logout}
          className="flex flex-col items-center gap-1 rounded-xl p-2 text-[10px] text-red-400 hover:bg-white/10 transition-colors"
        >
          <LogOut size={18} />
          Log out
        </button>
      </nav>
    </div>
  );
}
