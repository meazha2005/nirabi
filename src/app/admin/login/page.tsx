"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { saveToken } from "@/lib/adminAuth";
import { Lock, Mail } from "lucide-react";

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
      setError("Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-near-black px-6 py-12">
      <div className="w-full max-w-sm rounded-3xl border border-surface-border bg-surface-card p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-2xl border border-gold/40 p-2 bg-near-black shadow-lg">
            <Image src="/logo.png" alt="NIRABI" fill className="object-contain p-1" priority />
          </div>
          <div className="font-display text-2xl font-semibold text-ivory">NIRABI STUDIO</div>
          <p className="mt-1 text-xs text-gold">Administrator Security Access</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ivory/80">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ivory/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nirabi.studio"
                className="w-full rounded-xl border border-surface-border bg-[#121212] pl-10 pr-4 py-2.5 text-xs text-ivory outline-none placeholder:text-ivory/30 focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ivory/80">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ivory/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-surface-border bg-[#121212] pl-10 pr-4 py-2.5 text-xs text-ivory outline-none placeholder:text-ivory/30 focus:border-gold"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-400 mt-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-gold py-3 text-xs font-bold uppercase tracking-wider text-near-black shadow-lg transition-all hover:bg-gold-light hover:shadow-[0_0_20px_rgba(242,223,181,0.3)] disabled:opacity-50"
          >
            {loading ? "Authenticating…" : "Sign In to Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
