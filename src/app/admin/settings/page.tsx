"use client";

import { useState } from "react";
import { useRequireAdmin } from "@/lib/adminAuth";
import { api } from "@/lib/api";
import { KeyRound, ShieldCheck, Database, Server, UserCheck, AlertCircle, CheckCircle2 } from "lucide-react";

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
    <div className="px-6 py-8 sm:px-10 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="border-b border-surface-border pb-6">
        <h1 className="font-display text-3xl font-semibold text-ivory">Account & System Configuration</h1>
        <p className="mt-1 text-xs text-ivory/60">
          Manage administrator security credentials, database tables, and deployment parameters.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column: Account Profile & System Status */}
        <div className="rounded-2xl border border-surface-border bg-surface-card p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-surface-border pb-4">
            <UserCheck size={18} className="text-gold" />
            <h2 className="font-display text-lg font-semibold text-ivory">Administrator Profile</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center p-3.5 rounded-xl bg-[#121212] border border-surface-border">
              <span className="text-ivory/60 font-medium">Administrator Email</span>
              <span className="font-bold text-gold font-mono">admin@nirabi.studio</span>
            </div>

            <div className="flex justify-between items-center p-3.5 rounded-xl bg-[#121212] border border-surface-border">
              <span className="text-ivory/60 font-medium">Access Role</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-gold uppercase tracking-wider text-[10px]">
                <ShieldCheck size={14} /> Full SuperAdmin
              </span>
            </div>

            <div className="flex justify-between items-center p-3.5 rounded-xl bg-[#121212] border border-surface-border">
              <span className="text-ivory/60 font-medium flex items-center gap-2">
                <Database size={14} className="text-gold" /> Database Table Prefix
              </span>
              <span className="font-mono text-gold font-bold">nbs_</span>
            </div>

            <div className="flex justify-between items-center p-3.5 rounded-xl bg-[#121212] border border-surface-border">
              <span className="text-ivory/60 font-medium flex items-center gap-2">
                <Server size={14} className="text-gold" /> Target Architecture
              </span>
              <span className="font-semibold text-emerald-400">Vercel Serverless (Next.js 14)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Password Change Form */}
        <div className="rounded-2xl border border-surface-border bg-surface-card p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-surface-border pb-4">
            <KeyRound size={18} className="text-gold" />
            <h2 className="font-display text-lg font-semibold text-ivory">Security & Credentials</h2>
          </div>

          {status === "success" && (
            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs font-medium text-emerald-300">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              Password successfully updated in MySQL!
            </div>
          )}
          {status === "error" && (
            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-950/40 p-4 text-xs font-medium text-red-300">
              <AlertCircle size={16} className="text-red-400 shrink-0" />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-ivory/80">Current Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="mt-1.5 w-full rounded-xl border border-surface-border bg-[#121212] px-4 py-2.5 text-xs text-ivory outline-none focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ivory/80">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="mt-1.5 w-full rounded-xl border border-surface-border bg-[#121212] px-4 py-2.5 text-xs text-ivory outline-none focus:border-gold transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={status === "saving"}
              className="mt-6 w-full rounded-xl bg-gold px-4 py-3 text-xs font-bold uppercase tracking-wider text-near-black shadow-lg hover:bg-gold-light transition-all disabled:opacity-60"
            >
              {status === "saving" ? "Updating Security Credentials..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
