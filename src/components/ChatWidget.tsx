"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Send, Sparkles, MessageSquare, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";

type ChatMsg = { role: "user" | "assistant"; content: string; time?: string };

const QUICK_PROMPTS = [
  "Villa Interior Architecture",
  "Modular Kitchen & Finishes",
  "Turnkey Renovation Cost",
  "Visit Madipakkam Flagship",
];

function makeSessionId() {
  return `sess_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

function getCurrentTimeString() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function renderMessageContent(content: string) {
  const imgRegex = /!\[([^\]]*)\]\s*\(([^)]+)\)/g;
  const linkRegex = /\[([^\]]+)\]\s*\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const matches: {
    type: "image" | "link";
    index: number;
    length: number;
    text?: string;
    url?: string;
    alt?: string;
    src?: string;
  }[] = [];
  let match;

  imgRegex.lastIndex = 0;
  linkRegex.lastIndex = 0;

  while ((match = imgRegex.exec(content)) !== null) {
    matches.push({
      type: "image",
      index: match.index,
      length: match[0].length,
      alt: match[1],
      src: match[2],
    });
  }

  while ((match = linkRegex.exec(content)) !== null) {
    if (match.index > 0 && content[match.index - 1] === "!") {
      continue;
    }
    matches.push({
      type: "link",
      index: match.index,
      length: match[0].length,
      text: match[1],
      url: match[2],
    });
  }

  matches.sort((a, b) => a.index - b.index);

  if (matches.length === 0) {
    return <span className="whitespace-pre-line">{content}</span>;
  }

  matches.forEach((m, i) => {
    if (m.index > lastIndex) {
      parts.push(
        <span key={`text-${i}`} className="whitespace-pre-line">
          {content.substring(lastIndex, m.index)}
        </span>
      );
    }
    if (m.type === "image") {
      parts.push(
        <div key={`img-${i}`} className="my-2.5 overflow-hidden rounded-xl border border-surface-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={m.src} alt={m.alt} className="w-full object-cover max-h-[190px]" />
        </div>
      );
    } else if (m.type === "link") {
      parts.push(
        <a
          key={`link-${i}`}
          href={m.url}
          className="text-gold underline underline-offset-2 hover:text-gold-light transition-colors font-medium"
          target={m.url?.startsWith("http") ? "_blank" : "_self"}
          rel="noopener noreferrer"
        >
          {m.text}
        </a>
      );
    }
    lastIndex = m.index + m.length;
  });

  if (lastIndex < content.length) {
    parts.push(
      <span key="text-end" className="whitespace-pre-line">
        {content.substring(lastIndex)}
      </span>
    );
  }

  return <>{parts}</>;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [errorFallback, setErrorFallback] = useState(false);
  const [pendingContext, setPendingContext] = useState<Record<string, unknown> | undefined>(undefined);
  const sessionId = useRef(makeSessionId());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setMessages([
      {
        role: "assistant",
        content:
          "Welcome to NIRABI DESIGN STUDIO. I am your spatial design concierge. Share your property layout, budget, or aesthetic preferences, and I'll curate architectural concepts tailored for you.",
        time: getCurrentTimeString(),
      },
    ]);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.context) setPendingContext(detail.context);
      setOpen(true);
    };
    window.addEventListener("nirabi:open-chat", handler);
    window.addEventListener("yavi:open-chat", handler);
    return () => {
      window.removeEventListener("nirabi:open-chat", handler);
      window.removeEventListener("yavi:open-chat", handler);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || sending) return;
    const nowTime = getCurrentTimeString();
    const currentHistory = [...messages];
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text, time: nowTime }]);
    setSending(true);

    try {
      const res = await api.sendChatMessage({
        session_id: sessionId.current,
        message: text,
        client_messages: currentHistory,
        context: pendingContext,
      });
      setPendingContext(undefined);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: (res as any).reply, time: getCurrentTimeString() },
      ]);
      setErrorFallback(false);
    } catch {
      setErrorFallback(true);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I'm experiencing a brief connection delay. Please use our direct contact form or call 9543117399, and an architect will reach out directly.",
          time: getCurrentTimeString(),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Concierge Action Button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open NIRABI Design Concierge"
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-gold px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-near-black shadow-[0_0_35px_rgba(242,223,181,0.45)] transition-all duration-300 hover:scale-105 hover:bg-gold-light hover:-translate-y-0.5 ${
          open ? "scale-0 pointer-events-none" : "scale-100"
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-near-black opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-near-black" />
        </span>
        <Sparkles size={15} className="text-near-black" />
        <span>Design Concierge</span>
      </button>

      {/* Floating Backdrop for Mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden"
        />
      )}

      {/* Chat Panel Modal / Drawer */}
      <div
        data-lenis-prevent
        className={`fixed z-50 flex flex-col bg-[#0D0D0D] text-ivory border border-white/10 shadow-2xl transition-all duration-500 ease-out-expo
          inset-x-0 bottom-0 h-[88vh] rounded-t-3xl
          sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[630px] sm:w-[420px] sm:rounded-3xl
          ${open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"}`}
        role="dialog"
        aria-modal="true"
        aria-label="NIRABI Design Concierge"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 bg-[#121212]/95 backdrop-blur-md relative z-10 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-gold/40 p-1.5 bg-[#080808] shadow-md">
              <Image src="/logo.png" alt="NIRABI" fill className="object-contain p-0.5" />
            </div>
            <div>
              <div className="font-display text-base font-bold text-ivory">NIRABI Concierge</div>
              <div className="text-[10px] uppercase tracking-wider text-gold font-mono flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Architect Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="flex h-8 w-8 items-center justify-center rounded-full text-ivory/60 hover:text-gold hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Subtle Watermark in chat background */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.03]">
          <Image src="/logo.png" alt="" width={260} height={260} className="object-contain" />
        </div>

        {/* Scrollable Conversation History */}
        <div
          ref={scrollRef}
          data-lenis-prevent
          className="relative z-10 flex-1 space-y-4 overflow-y-auto px-5 py-5"
        >
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed animate-message ${
                  m.role === "user"
                    ? "bg-gold text-near-black font-semibold rounded-br-none shadow-md"
                    : "bg-[#181818] border border-white/10 text-ivory rounded-bl-none shadow-sm"
                }`}
              >
                {renderMessageContent(m.content)}
              </div>
              <span suppressHydrationWarning className="mt-1 text-[10px] text-ivory/40 px-1 font-mono">
                {m.time || getCurrentTimeString()}
              </span>
            </div>
          ))}

          {sending && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-[#181818] border border-white/10 px-4 py-3 text-xs text-gold flex items-center gap-2 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] font-mono">Formulating tailored spatial direction…</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Prompts */}
        {messages.length <= 2 && !sending && (
          <div className="px-5 pb-2 relative z-10 flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => send(prompt)}
                className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[10px] font-medium text-gold hover:bg-gold hover:text-near-black transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Bottom Input Area */}
        <div className="border-t border-white/10 p-4 pb-6 sm:pb-4 bg-[#121212] relative z-10 rounded-b-3xl">
          {errorFallback ? (
            <a
              href="/contact"
              className="block rounded-full bg-gold px-5 py-3 text-center text-xs font-bold uppercase tracking-wider text-near-black hover:bg-gold-light transition-all"
            >
              Open Direct Studio Consultation →
            </a>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your space, floor plan, or budget…"
                className="flex-1 rounded-full border border-white/10 bg-[#0A0A0A] px-4 py-3 text-xs text-ivory outline-none placeholder:text-ivory/35 focus-visible:border-gold transition-colors"
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-near-black disabled:opacity-40 transition-all hover:bg-gold-light active:scale-95 shadow-md"
              >
                <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
