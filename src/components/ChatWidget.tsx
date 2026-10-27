"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Send, MessageSquare, ArrowUpRight } from "lucide-react";
import { api } from "@/lib/api";

type ChatMsg = { role: "user" | "assistant"; content: string; time?: string };

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
  const matches: { type: "image" | "link"; index: number; length: number; text?: string; url?: string; alt?: string; src?: string }[] = [];
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
        <div key={`img-${i}`} className="my-2 overflow-hidden rounded-sm border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={m.src} alt={m.alt} className="w-full object-cover max-h-[180px]" />
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
  const [pendingContext, setPendingContext] = useState<Record<string, unknown> | undefined>(undefined);
  const sessionId = useRef(makeSessionId());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setMessages([
      {
        role: "assistant",
        content: "Hello! Welcome to NIRABI DESIGN STUDIO. How can we help you today? Tell us about your home or project (such as a 2BHK/3BHK flat, independent villa, modular kitchen, or renovation).",
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
    return () => {
      window.removeEventListener("nirabi:open-chat", handler);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async (customText?: string) => {
    const text = (customText || input).trim();
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
      setMessages((m) => [...m, { role: "assistant", content: (res as any).reply, time: getCurrentTimeString() }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Thank you for contacting us! Please leave your phone number or call us directly at 9543117399, and we will assist you immediately.",
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
      {/* Sleek Floating Trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open Chat"
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2.5 border border-gold/40 bg-[#0E0E0D]/95 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-gold shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold hover:text-near-black ${
          open ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
      >
        <MessageSquare size={15} />
        <span>Chat with Us</span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed z-50 flex flex-col bg-[#0C0C0B] text-ivory border border-white/10 shadow-2xl transition-all duration-400 ease-out
          inset-x-0 bottom-0 h-[88vh]
          sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:w-[410px] sm:rounded-sm
          ${open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
        role="dialog"
        aria-modal="true"
        aria-label="NIRABI Design Assistant"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 bg-[#0E0E0D]">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-sm border border-gold/40 bg-[#141413] p-0.5">
              <Image src="/logo.png" alt="NIRABI" fill className="object-contain" />
            </div>
            <div>
              <div className="font-display text-sm font-semibold text-ivory">NIRABI Design Desk</div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-gold">Online Consultation · Chennai</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="flex h-8 w-8 items-center justify-center text-ivory/60 hover:text-gold transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Feed */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5 text-xs">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[85%] p-3.5 leading-relaxed ${
                  m.role === "user"
                    ? "bg-gold text-near-black font-medium border border-gold"
                    : "bg-[#141413] text-ivory/90 border border-white/10"
                }`}
              >
                {renderMessageContent(m.content)}
              </div>
              {m.time && (
                <span className="mt-1 px-1 font-mono text-[9px] text-ivory/30">
                  {m.time}
                </span>
              )}
            </div>
          ))}

          {sending && (
            <div className="flex items-center gap-1.5 p-3 text-gold text-xs">
              <span className="font-mono text-[10px] tracking-wider uppercase">Replying...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        {messages.length < 3 && !sending && (
          <div className="border-t border-white/5 bg-[#0A0A09] px-4 py-2.5 flex flex-wrap gap-1.5">
            {[
              "Villa Interior in Chennai",
              "Apartment Interior Cost",
              "Modular Kitchen Quote",
              "Book a Free Site Visit",
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => send(chip)}
                className="border border-white/10 bg-[#121211] px-2.5 py-1 text-[11px] text-ivory/70 hover:border-gold/50 hover:text-gold transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="border-t border-white/10 bg-[#0E0E0D] p-3 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent px-3 py-2 text-xs text-ivory placeholder-ivory/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || sending}
            className="flex h-8 w-8 items-center justify-center bg-gold text-near-black transition-all hover:bg-gold-light disabled:opacity-40"
          >
            <Send size={13} />
          </button>
        </form>
      </div>
    </>
  );
}
