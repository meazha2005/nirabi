"use client";

import { useCallback, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Original Space (Before)",
  afterLabel = "NIRABI Crafted (After)",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] p-2 shadow-2xl transition-all duration-500 hover:border-gold/30">
      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-2xl bg-near-black touch-none cursor-ew-resize"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* After — Full Base Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={afterSrc}
          alt={afterLabel}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute bottom-5 right-5 z-10 flex items-center gap-1.5 rounded-full border border-gold/40 bg-near-black/85 px-4 py-1.5 text-[11px] font-semibold tracking-wider text-gold shadow-lg backdrop-blur-md">
          <Sparkles size={12} className="text-gold" />
          <span>{afterLabel}</span>
        </div>

        {/* Before — Clipped Image */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beforeSrc}
            alt={beforeLabel}
            className="absolute inset-0 h-full w-full object-cover filter contrast-90"
            draggable={false}
          />
          <div className="absolute bottom-5 left-5 z-10 rounded-full border border-white/20 bg-near-black/85 px-4 py-1.5 text-[11px] font-semibold tracking-wider text-ivory/80 shadow-lg backdrop-blur-md">
            <span>{beforeLabel}</span>
          </div>
        </div>

        {/* Divider & Tactile Handle */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Before and after comparison slider"
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={onKeyDown}
          className="absolute top-0 z-20 flex h-full -translate-x-1/2 cursor-ew-resize flex-col items-center justify-center outline-none"
          style={{ left: `${pos}%` }}
        >
          {/* Subtle gold line */}
          <div className="h-full w-[2px] bg-gradient-to-b from-gold/20 via-gold to-gold/20 shadow-[0_0_12px_rgba(242,223,181,0.8)]" />

          {/* Central gold handle pill */}
          <div className="absolute flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-[#141414] text-gold shadow-[0_0_20px_rgba(242,223,181,0.6)] backdrop-blur-md transition-transform duration-200 hover:scale-110 active:scale-95">
            <span className="text-sm font-bold tracking-tight">↔</span>
          </div>
        </div>
      </div>

      {/* Micro-instructions banner */}
      <div className="mt-3 flex items-center justify-between px-3 text-[11px] text-ivory/45">
        <span>Touch or drag horizontal slider</span>
        <span className="font-mono text-gold/80">{Math.round(pos)}% Handover Reveal</span>
      </div>
    </div>
  );
}
