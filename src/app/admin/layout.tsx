"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, LogOut, Settings, ExternalLink, ShieldCheck } from "lucide-react";
import { clearToken } from "@/lib/adminAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  const nav = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/leads", label: "Leads & Inquiries", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const logout = () => {
    clearToken();
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-[#080808] text-ivory selection:bg-gold selection:text-near-black">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-[#0C0C0B] text-ivory sm:flex">
        {/* Brand Header */}
        <div className="border-b border-white/10 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-sm border border-gold/30 bg-[#141413] p-1">
              <Image src="/logo.png" alt="NIRABI" fill className="object-contain p-0.5" />
            </div>
            <div>
              <div className="font-display text-base font-semibold tracking-wide text-ivory">NIRABI</div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-gold">Studio Admin</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 space-y-6 px-4 py-6">
          <div>
            <div className="px-3 pb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ivory/40">
              Menu
            </div>
            <nav className="space-y-1">
              {nav.map((item) => {
                const Icon = item.icon;
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium transition-all ${
                      active
                        ? "border border-gold/40 bg-gold/15 text-gold font-semibold"
                        : "text-ivory/70 hover:bg-white/5 hover:text-ivory"
                    }`}
                  >
                    <Icon size={16} className={active ? "text-gold" : "text-ivory/50"} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <div className="px-3 pb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ivory/40">
              Live Website
            </div>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between border border-white/10 bg-[#121211] px-3.5 py-2.5 text-xs text-ivory/75 hover:border-gold/40 hover:text-gold transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink size={12} className="text-ivory/40" />
            </a>
          </div>
        </div>

        {/* User Footer & Logout */}
        <div className="border-t border-white/10 p-4">
          <div className="border border-white/10 bg-[#121211] p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <ShieldCheck size={16} className="text-gold shrink-0" />
              <div className="truncate">
                <div className="truncate text-xs font-semibold text-ivory">admin@nirabi.studio</div>
                <div className="font-mono text-[9px] uppercase text-gold/80">SuperAdmin</div>
              </div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="flex h-7 w-7 items-center justify-center text-ivory/50 hover:text-red-400 transition-colors"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header Bar */}
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#0C0C0B] px-6 sm:hidden">
          <div className="flex items-center gap-2.5">
            <div className="relative h-7 w-7 overflow-hidden rounded-sm border border-gold/40 bg-[#141413]">
              <Image src="/logo.png" alt="NIRABI" fill className="object-contain p-0.5" />
            </div>
            <span className="font-display text-sm font-semibold text-ivory">NIRABI Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-xs text-ivory/70 hover:text-gold">Dashboard</Link>
            <Link href="/admin/leads" className="text-xs text-ivory/70 hover:text-gold">Leads</Link>
            <button onClick={logout} className="text-xs text-red-400">Exit</button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#080808]">
          {children}
        </main>
      </div>
    </div>
  );
}
