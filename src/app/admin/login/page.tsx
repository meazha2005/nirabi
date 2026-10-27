"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { saveToken } from "@/lib/adminAuth";
import { Lock, Mail, ArrowUpRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.login(email, password);
      saveToken((res as any).access_token);
      router.push("/admin/dashboard");
    } catch {
      setError("Incorrect email or password credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080808] px-6 py-12">
      <div className="w-full max-w-sm border border-white/10 bg-[#0C0C0B] p-8 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3 h-14 w-14 overflow-hidden rounded-sm border border-gold/40 bg-[#141413] p-1.5">
            <Image src="/logo.png" alt="NIRABI" fill className="object-contain p-0.5" priority />
          </div>
          <h1 className="font-display text-2xl font-semibold text-ivory">NIRABI STUDIO</h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-gold font-medium">Admin Login</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-ivory/60 block mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ivory/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nirabi.studio"
                className="w-full border border-white/10 bg-[#141413] pl-9 pr-4 py-2.5 text-xs text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-ivory/60 block mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ivory/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full border border-white/10 bg-[#141413] pl-9 pr-4 py-2.5 text-xs text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <p className="border border-red-500/30 bg-red-950/20 p-2 text-[11px] text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 border border-gold bg-gold py-3 text-xs font-semibold uppercase tracking-[0.14em] text-near-black hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            <span>{loading ? "Logging in..." : "Log In"}</span>
            <ArrowUpRight size={13} />
          </button>
        </form>
      </div>
    </div>
  );
}
