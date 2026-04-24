import { motion } from "motion/react";
import { tokens, fonts, type Panel, type Tone } from "../lib/tokens";

export function PsychDots({ filled, tone }: { filled: number; tone: Tone }) {
  const color =
    tone === "gain"
      ? tokens.gain
      : tone === "ahaMiss"
      ? tokens.accent
      : tokens.drain;
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: i < filled ? 1 : 0.25 }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 400 }}
          className="rounded-full"
          style={{ width: 6, height: 6, background: color }}
        />
      ))}
    </div>
  );
}

export function JourneyPanel({
  panel,
  index,
  isActive,
  onHover,
}: {
  panel: Panel;
  index: number;
  isActive: boolean;
  onHover: (i: number | null) => void;
}) {
  const bg =
    panel.tone === "drained"
      ? "#f0dcd8"
      : panel.tone === "aha"
      ? "rgba(139, 58, 46, 0.07)"
      : tokens.paper;
  const border =
    panel.tone === "drained"
      ? tokens.drain
      : panel.tone === "aha"
      ? tokens.accent
      : tokens.rule;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.4 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="relative flex flex-col gap-[10px] cursor-default"
      style={{
        background: bg,
        border: `1px solid ${border}`,
        minHeight: 260,
        padding: "14px 14px 16px",
        borderRadius: 3,
        transform: isActive ? "translateY(-4px)" : "none",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        boxShadow: isActive ? "0 8px 20px rgba(31, 29, 26, 0.08)" : "none",
      }}
    >
      <div
        className="absolute top-[8px] right-[10px]"
        style={{
          fontFamily: fonts.mono,
          fontSize: 9.5,
          letterSpacing: "0.1em",
          color: tokens.muted,
        }}
      >
        {panel.num} / 05
      </div>

      <div
        className="flex flex-col justify-center gap-1 relative overflow-hidden"
        style={{
          height: 90,
          background: "#fff",
          border: `1px solid ${tokens.rule}`,
          borderRadius: 3,
          padding: "8px 10px",
        }}
      >
        <div
          style={{
            fontFamily: fonts.ui,
            fontSize: 10,
            fontWeight: 600,
            color: "#111827",
          }}
        >
          {panel.screen.title}
        </div>
        <div style={{ fontSize: 8.5, color: "#6b7280", lineHeight: 1.3 }}>
          {panel.screen.body}
        </div>
        {panel.screen.bars &&
          Array.from({ length: panel.screen.bars }).map((_, i) => (
            <div
              key={i}
              className="rounded-[2px] mt-[2px]"
              style={{ height: 5, background: "#e5e7eb" }}
            />
          ))}
        {panel.screen.cta && (
          <div
            className="self-start mt-1"
            style={{
              fontSize: 8,
              fontWeight: 500,
              padding: "3px 8px",
              borderRadius: 3,
              background: panel.screen.cta.tone === "dead" ? "#d1d5db" : "#4f46e5",
              color: "#fff",
            }}
          >
            {panel.screen.cta.label}
          </div>
        )}
      </div>

      <div
        className="relative italic"
        style={{
          fontFamily: fonts.serif,
          fontSize: 12.5,
          lineHeight: 1.4,
          color: tokens.ink,
          background: tokens.bg,
          borderRadius: 12,
          borderTopLeftRadius: 2,
          padding: "8px 10px",
        }}
      >
        <span
          className="absolute block rounded-full"
          style={{ top: -5, left: 10, width: 10, height: 10, background: tokens.bg }}
        />
        <span
          className="absolute block rounded-full"
          style={{ top: -10, left: 6, width: 5, height: 5, background: tokens.bg }}
        />
        "{panel.thought}"
      </div>

      <div
        className="mt-auto flex items-center gap-[6px]"
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.08em",
          color:
            panel.psych.tone === "gain"
              ? tokens.gain
              : panel.psych.tone === "ahaMiss"
              ? tokens.accent
              : tokens.drain,
        }}
      >
        <PsychDots filled={panel.psych.filled} tone={panel.psych.tone} />
        {panel.psych.label}
      </div>
    </motion.div>
  );
}
