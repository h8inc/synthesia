import { motion } from "motion/react";
import { tokens, fonts, type Step, type StepKind } from "../lib/tokens";

const kindColors: Record<StepKind, { bg: string; fg: string }> = {
  ask: { bg: tokens.drain, fg: "#fff" },
  gain: { bg: tokens.gain, fg: "#fff" },
  aha: { bg: tokens.accent, fg: "#fff" },
  "aha-missed": { bg: tokens.accent, fg: "#fff" },
  removed: { bg: "transparent", fg: tokens.muted },
};

export function Chevron({
  step,
  index,
  hovered,
  onHover,
}: {
  step: Step;
  index: number;
  hovered?: boolean;
  onHover?: (id: string | null) => void;
}) {
  const colors = kindColors[step.kind];
  const isFirst = index === 0;
  const isRemoved = step.kind === "removed";

  return (
    <motion.div
      layout
      layoutId={step.id}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: hovered ? -3 : 0,
      }}
      transition={{
        layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.25 },
        y: { duration: 0.15 },
      }}
      onMouseEnter={() => onHover?.(step.id)}
      onMouseLeave={() => onHover?.(null)}
      className="flex flex-col items-center justify-center text-center relative"
      style={{
        background: colors.bg,
        color: colors.fg,
        clipPath: isFirst
          ? "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)"
          : "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 10px 50%)",
        padding: "6px 4px",
        height: 56,
        fontFamily: fonts.mono,
        fontSize: 10,
        border: isRemoved ? `1px dashed ${tokens.rule}` : "none",
        cursor: isRemoved ? "default" : "pointer",
        filter: hovered && !isRemoved ? "brightness(1.08)" : "none",
      }}
    >
      {step.kind === "aha" && (
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: -22,
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: "0.12em",
            color: tokens.accent,
            background: tokens.bg,
            padding: "2px 6px",
          }}
        >
          AHA
        </div>
      )}
      <span style={{ fontSize: 9, opacity: isRemoved ? 1 : 0.9, marginBottom: 2 }}>
        {step.label}
      </span>
      <span
        style={{
          fontFamily: fonts.serif,
          fontSize: isRemoved ? 11 : 16,
          fontStyle: isRemoved ? "normal" : "italic",
          fontWeight: 400,
        }}
      >
        {typeof step.cost === "number"
          ? step.cost > 0
            ? `+${step.cost}`
            : step.cost
          : step.cost}
      </span>
    </motion.div>
  );
}

export function TankBar({
  state,
  hoverFill,
}: {
  state: "current" | "proposed";
  hoverFill?: number; // 0..1 – optional override driven by chevron hover
}) {
  const gradient =
    state === "current"
      ? `linear-gradient(90deg, ${tokens.gain} 0%, #a2b48a 8%, #c5ae6b 20%, #d19a5a 35%, ${tokens.drain} 55%, #a64a3f 75%, #7a2f28 92%)`
      : `linear-gradient(90deg, ${tokens.gain} 0%, #8bae7d 40%, #a2b48a 70%, ${tokens.drain} 100%)`;

  return (
    <div className="relative" style={{ marginTop: 10 }}>
      <div
        className="absolute"
        style={{
          top: -18,
          left: 0,
          fontFamily: fonts.mono,
          fontSize: 9.5,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: tokens.muted,
        }}
      >
        User energy →
      </div>
      <motion.div
        className="relative"
        style={{ height: 8 }}
        initial={false}
        animate={{ background: gradient }}
        transition={{ duration: 0.8 }}
      >
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: -4,
              bottom: -4,
              width: 1,
              left: `${((i + 1) / 12) * 100}%`,
              background: "rgba(0,0,0,0.15)",
            }}
          />
        ))}
        {hoverFill !== undefined && (
          <motion.div
            className="absolute"
            style={{
              top: -6,
              bottom: -6,
              width: 2,
              background: tokens.ink,
            }}
            animate={{ left: `${hoverFill * 100}%` }}
            transition={{ duration: 0.15 }}
          />
        )}
      </motion.div>
    </div>
  );
}
