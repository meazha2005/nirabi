"use client";

import { useCallback, useRef, useState } from "react";

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before Renovation",
  afterLabel = "Completed Architecture",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  // On desktop mouse, clicking or dragging anywhere on the slider updates position
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") {
      isDragging.current = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      updateFromClientX(e.clientX);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (isDragging.current) {
      isDragging.current = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 3));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 3));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-sm border border-white/10 bg-[#080808] touch-pan-y shadow-2xl"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* After Image Layer (Base) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterSrc}
        alt={afterLabel}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div className="pointer-events-none absolute bottom-4 right-4 z-10 border border-gold/40 bg-[#0A0A09]/85 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-gold backdrop-blur-sm">
        {afterLabel}
      </div>

      {/* Before Image Layer (Clipped from right) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeSrc}
          alt={beforeLabel}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div className="pointer-events-none absolute bottom-4 left-4 z-10 border border-white/20 bg-[#0A0A09]/85 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ivory/80 backdrop-blur-sm">
          {beforeLabel}
        </div>
      </div>

      {/* Vertical Hairline Divider & Tactile Slider Badge */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Before and after comparison position"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => {
          e.stopPropagation();
          isDragging.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (isDragging.current) {
            updateFromClientX(e.clientX);
          }
        }}
        onPointerUp={(e) => {
          isDragging.current = false;
          try {
            (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
          } catch {}
        }}
        className="absolute top-0 z-20 flex h-full -translate-x-1/2 cursor-ew-resize flex-col items-center justify-center focus:outline-none touch-none"
        style={{ left: `${pos}%` }}
      >
        <div className="h-full w-[2px] bg-gold shadow-[0_0_8px_rgba(232,212,176,0.6)]" />
        <div className="absolute flex h-9 w-14 items-center justify-center border border-gold bg-[#0C0C0B] px-2 text-gold shadow-2xl transition-transform active:scale-95">
          <span className="font-mono text-[11px] font-bold tracking-wider">◄ ►</span>
        </div>
      </div>
    </div>
  );
}
