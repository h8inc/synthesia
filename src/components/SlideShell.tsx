import { useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { tokens, fonts } from "../lib/tokens";

type SlideHeaderProps = {
  eyebrow: string;
  meta: string;
  num: number;
  total: number;
};

export function SlideHeader({ eyebrow, meta, num, total }: SlideHeaderProps) {
  return (
    <div
      className="flex justify-between items-baseline pb-[14px] mb-8 flex-shrink-0"
      style={{ borderBottom: `1px solid ${tokens.rule}` }}
    >
      <div
        className="text-[10.5px] tracking-[0.12em] uppercase"
        style={{ fontFamily: fonts.mono, color: tokens.muted }}
      >
        <span style={{ color: tokens.accent }}>{eyebrow} ·</span> {meta}
      </div>
      <div
        className="text-[10.5px] tracking-[0.12em]"
        style={{ fontFamily: fonts.mono, color: tokens.muted }}
      >
        {String(num).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}

type SlideShellProps = {
  currentSlide: number;
  totalSlides: number;
  onNav: (delta: number) => void;
  onJump: (n: number) => void;
  overlayOpen?: boolean;
  children: ReactNode;
};

export function SlideShell({
  currentSlide,
  totalSlides,
  onNav,
  onJump,
  overlayOpen = false,
  children,
}: SlideShellProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (overlayOpen) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        onNav(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        onNav(-1);
      } else if (e.key === "Home") {
        onJump(1);
      } else if (e.key === "End") {
        onJump(totalSlides);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNav, onJump, totalSlides, overlayOpen]);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{
        background: tokens.bg,
        color: tokens.ink,
        fontFamily: fonts.serif,
      }}
    >
      {/* grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          mixBlendMode: "multiply",
          zIndex: 999,
        }}
      />

      {/* slide body */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 px-[72px] pt-[56px] pb-[140px] flex flex-col overflow-y-auto"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* nav pill */}
      <div
        className="fixed left-1/2 -translate-x-1/2 flex items-center gap-4 px-[14px] py-[8px] rounded-full z-[100]"
        style={{
          bottom: 20,
          background: tokens.paper,
          border: `1px solid ${tokens.rule}`,
          boxShadow: "0 2px 12px rgba(31, 29, 26, 0.06)",
        }}
      >
        <button
          onClick={() => onNav(-1)}
          className="px-2 py-1 rounded transition-colors"
          style={{
            fontFamily: fonts.mono,
            fontSize: 13,
            color: tokens.inkSoft,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Previous"
        >
          ←
        </button>
        <div
          className="text-center"
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            letterSpacing: "0.08em",
            color: tokens.muted,
            minWidth: 48,
          }}
        >
          {currentSlide} / {totalSlides}
        </div>
        <button
          onClick={() => onNav(1)}
          className="px-2 py-1 rounded transition-colors"
          style={{
            fontFamily: fonts.mono,
            fontSize: 13,
            color: tokens.inkSoft,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Next"
        >
          →
        </button>
        <div className="flex gap-[6px]">
          {Array.from({ length: totalSlides }).map((_, i) => {
            const active = i + 1 === currentSlide;
            return (
              <button
                key={i}
                onClick={() => onJump(i + 1)}
                aria-label={`Go to slide ${i + 1}`}
                className="rounded-full transition-colors"
                style={{
                  width: 6,
                  height: 6,
                  background: active ? tokens.accent : tokens.rule,
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
