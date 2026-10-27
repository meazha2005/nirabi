"use client";

import { useState } from "react";
import { useRequireAdmin } from "@/lib/adminAuth";
import { api } from "@/lib/api";
import { KeyRound, ShieldCheck, Database, Server, UserCheck, AlertCircle, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function SettingsPage() {
  const { token, checked } = useRequireAdmin();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setStatus("saving");
    setErrorMsg("");
    try {
      await api.changePassword(token, {
        current_password: currentPassword,
        new_password: newPassword,
      });
      setStatus("success");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to change password.");
    }
  };

  if (!checked || !token) return null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 space-y-6">
      {/* Header Banner */}
      <div className="border-b border-white/10 pb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">Admin Settings</span>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ivory">System &amp; Account Settings</h1>
        <p className="mt-1 text-xs text-ivory/70">
          Manage your administrator password and check system database connections.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column: Account Profile & System Status */}
        <div className="border border-white/10 bg-[#0C0C0B] p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <UserCheck size={16} className="text-gold" />
            <h2 className="font-display text-lg text-ivory">Admin Profile</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center p-3.5 border border-white/5 bg-[#121211]">
              <span className="font-mono text-ivory/60">Admin Email</span>
              <span className="font-mono font-bold text-gold">admin@nirabi.studio</span>
            </div>

            <div className="flex justify-between items-center p-3.5 border border-white/5 bg-[#121211]">
              <span className="font-mono text-ivory/60">Role</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-gold uppercase tracking-wider text-[10px] font-bold">
                <ShieldCheck size={13} /> SuperAdmin
              </span>
            </div>

            <div className="flex justify-between items-center p-3.5 border border-white/5 bg-[#121211]">
              <span className="font-mono text-ivory/60 flex items-center gap-2">
                <Database size={13} className="text-gold" /> Database
              </span>
              <span className="font-mono text-gold font-bold">MySQL (Prefix: nbs_)</span>
            </div>

            <div className="flex justify-between items-center p-3.5 border border-white/5 bg-[#121211]">
              <span className="font-mono text-ivory/60 flex items-center gap-2">
                <Server size={13} className="text-gold" /> Hosting Platform
              </span>
              <span className="font-mono text-emerald-400">Vercel (Next.js 14)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Password Change Form */}
        <div className="border border-white/10 bg-[#0C0C0B] p-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <KeyRound size={16} className="text-gold" />
            <h2 className="font-display text-lg text-ivory">Change Password</h2>
          </div>

          {status === "success" && (
            <div className="mt-4 flex items-center gap-2.5 border border-emerald-500/30 bg-emerald-950/20 p-3.5 text-xs text-emerald-300">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              Password updated successfully in remote database.
            </div>
          )}
          {status === "error" && (
            <div className="mt-4 flex items-center gap-2.5 border border-red-500/30 bg-red-950/20 p-3.5 text-xs text-red-300">
              <AlertCircle size={15} className="text-red-400 shrink-0" />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-ivory/60 block mb-2">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full border border-white/10 bg-[#141413] px-3.5 py-2.5 text-xs text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-ivory/60 block mb-2">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full border border-white/10 bg-[#141413] px-3.5 py-2.5 text-xs text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "saving" || !currentPassword || !newPassword}
              className="mt-6 flex w-full items-center justify-center gap-2 border border-gold bg-gold py-3 text-xs font-semibold uppercase tracking-[0.14em] text-near-black hover:bg-gold-light transition-colors disabled:opacity-40"
            >
              <span>{status === "saving" ? "Updating..." : "Update Password"}</span>
              <ArrowUpRight size={13} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
