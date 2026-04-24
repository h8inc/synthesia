import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { tokens, fonts } from "../lib/tokens";
import { SlideHeader } from "../components/SlideShell";

const SYNTH_BLUE = "#4f46e5";

const bubbleLines = [
  "What video do you want to make?",
  "Turn your last meeting into a 2-minute summary.",
  "Record this quarter's update — I'll do the talking.",
];

const DOCK_WIDTH = 640;
const DOCK_HEIGHT = 78;
const AVATAR_SIZE = 64;
const WALK_PADDING = 18;
const WALK_DURATION = 7; // seconds to cross the dock in one direction
const TURN_DURATION = 0.6; // pause/turn beat at each border

export default function Slide11Companion() {
  const [bubbleIdx, setBubbleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setBubbleIdx((i) => (i + 1) % bubbleLines.length),
      4200
    );
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <SlideHeader
        eyebrow="Vision"
        meta="Zooming out — past the brief"
        num={11}
        total={11}
      />

      <div className="flex-1 flex flex-col" style={{ paddingTop: 4 }}>
        {/* headline + subhead */}
        <div style={{ maxWidth: 980 }}>
          <h2
            className="mb-4"
            style={{
              fontFamily: fonts.serif,
              fontSize: "clamp(32px, 3.8vw, 50px)",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              color: tokens.ink,
            }}
          >
            One click. One prompt. One video.
            <br />
            The{" "}
            <em style={{ color: tokens.accent, fontStyle: "italic" }}>
              retention surface
            </em>{" "}
            we haven't built yet.
          </h2>
          <p
            style={{
              fontFamily: fonts.serif,
              fontSize: 15,
              lineHeight: 1.55,
              color: tokens.inkSoft,
              maxWidth: 760,
            }}
          >
            If Ideas 01 and 03 prove the thesis, this is where the north star
            points. A tiny Synthesia avatar — the product demonstrating itself —
            that lives on the user's desktop, one click away from their next
            video.
          </p>
        </div>

        {/* hero: dock + avatar */}
        <DockHero bubbleIdx={bubbleIdx} setBubbleIdx={setBubbleIdx} />

        {/* three callouts */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: 18 }}
        >
          <Callout
            label="WHAT"
            delay={0.4}
            body="Always-on Synthesia companion. One click from desktop to a rendering video. The avatar is Synthesia's own tech — it walks the walk."
          />
          <Callout
            label="WHY"
            delay={0.55}
            body="The retention metric is frequency. Frequency means trigger reduction. Seven steps → three steps → one. Every collapsed step compounds into LTV."
          />
          <Callout
            label="WHEN"
            delay={0.7}
            body="After 01 and 03 ship. This is the north-star surface, not a quarter-one bet. Earned by data, not assumed."
          />
        </div>

        {/* risks */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="px-5 py-4"
          style={{
            borderLeft: `3px solid ${tokens.accent}`,
            background: "rgba(139, 58, 46, 0.03)",
            maxWidth: 1100,
          }}
        >
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: 13,
              fontStyle: "italic",
              color: tokens.inkSoft,
              lineHeight: 1.55,
            }}
          >
            <strong
              style={{ color: tokens.accent, fontStyle: "normal", fontWeight: 500 }}
            >
              Honest risks to pressure-test:
            </strong>{" "}
            compute cost is worse than Idea 03 (always-on inference). Enterprise
            IT won't install Mac apps easily — web-based equivalent (browser
            extension, Slack app, workspace widget) is likely the real v1. Out
            of the take-home brief by design — this is a retention-stage vision,
            not a sign-up experiment.
          </div>
        </motion.div>

        {/* credit */}
        <div className="flex justify-end" style={{ marginTop: 12 }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 9.5,
              letterSpacing: "0.08em",
              color: tokens.muted,
              fontStyle: "italic",
            }}
          >
            Pattern credit: Lil Agents (Ryan Stephen, MIT) · Lil Lenny (Ben
            Shih) — desktop companion as a behavioural loop strategy
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- Hero dock + avatar ---------- */

function DockHero({
  bubbleIdx,
  setBubbleIdx,
}: {
  bubbleIdx: number;
  setBubbleIdx: (i: number | ((p: number) => number)) => void;
}) {
  return (
    <div
      className="relative mx-auto"
      style={{
        width: DOCK_WIDTH + 80,
        marginTop: 64,
        marginBottom: 72,
        height: 170,
      }}
    >
      {/* desktop wallpaper hint behind dock — soft warm gradient */}
      <div
        style={{
          position: "absolute",
          inset: "auto 16px 0 16px",
          height: 110,
          borderRadius: 14,
          background:
            "linear-gradient(180deg, rgba(79,70,229,0.05) 0%, rgba(139,58,46,0.04) 60%, rgba(31,29,26,0.06) 100%)",
          filter: "blur(0.5px)",
        }}
      />

      {/* the dock */}
      <div
        className="relative mx-auto"
        style={{
          width: DOCK_WIDTH,
          height: DOCK_HEIGHT,
          marginTop: 76,
        }}
      >
        <MacDock />

        {/* walking avatar + attached bubble — walks continuously */}
        <WalkingAvatar
          bubbleIdx={bubbleIdx}
          onTap={() =>
            setBubbleIdx((i: number) => (i + 1) % bubbleLines.length)
          }
        />
      </div>
    </div>
  );
}

/* ---------- macOS dock chrome + icons ---------- */

function MacDock() {
  return (
    <div
      className="absolute inset-0"
      style={{
        borderRadius: 22,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.48) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: [
          "0 1px 0 rgba(255,255,255,0.9) inset",
          "0 0 0 1px rgba(31,29,26,0.06)",
          "0 18px 40px rgba(31, 29, 26, 0.18)",
          "0 4px 10px rgba(31, 29, 26, 0.08)",
        ].join(", "),
      }}
    >
      <div
        className="absolute inset-0 flex items-center"
        style={{ padding: "0 12px", gap: 7 }}
      >
        <DockIcon kind="finder" />
        <DockIcon kind="safari" />
        <DockIcon kind="messages" />
        <DockIcon kind="mail" />
        <DockIcon kind="calendar" />
        <DockIcon kind="notes" />
        <DockIcon kind="music" />
        <DockIcon kind="slack" />
        <DockIcon kind="figma" />
        <DockIcon kind="synthesia" />
        <DockSeparator />
        <DockIcon kind="trash" />
      </div>
    </div>
  );
}

function DockSeparator() {
  return (
    <div
      style={{
        width: 1,
        height: 36,
        background:
          "linear-gradient(180deg, transparent, rgba(31,29,26,0.18), transparent)",
        margin: "0 4px",
        flexShrink: 0,
      }}
    />
  );
}

type IconKind =
  | "finder"
  | "safari"
  | "messages"
  | "mail"
  | "calendar"
  | "notes"
  | "music"
  | "slack"
  | "figma"
  | "synthesia"
  | "trash";

function DockIcon({ kind }: { kind: IconKind }) {
  return (
    <div
      style={{
        width: 42,
        height: 42,
        borderRadius: 10,
        flexShrink: 0,
        position: "relative",
        boxShadow:
          "0 2px 6px rgba(31,29,26,0.18), 0 0 0 0.5px rgba(31,29,26,0.08), inset 0 1px 0 rgba(255,255,255,0.4)",
        overflow: "hidden",
      }}
    >
      <IconArt kind={kind} />
    </div>
  );
}

function IconArt({ kind }: { kind: IconKind }) {
  const common = {
    width: "100%",
    height: "100%",
    display: "block",
  } as const;

  if (kind === "finder") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <defs>
          <linearGradient id="fnd" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9ec5ff" />
            <stop offset="1" stopColor="#4d8de5" />
          </linearGradient>
        </defs>
        <rect width="46" height="46" fill="url(#fnd)" />
        <path
          d="M14 17 L18 22 M32 17 L28 22"
          stroke="#1f2937"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 31 Q23 36 30 31"
          stroke="#1f2937"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "safari") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <defs>
          <radialGradient id="saf" cx="0.5" cy="0.4">
            <stop offset="0" stopColor="#e9f3ff" />
            <stop offset="1" stopColor="#3b82f6" />
          </radialGradient>
        </defs>
        <rect width="46" height="46" fill="url(#saf)" />
        <circle cx="23" cy="23" r="13" fill="#fff" />
        <circle cx="23" cy="23" r="13" fill="none" stroke="#1f2937" strokeWidth="0.6" />
        <polygon points="23,12 25,22 23,34 21,22" fill="#ef4444" />
        <polygon points="12,23 22,21 34,23 22,25" fill="#cbd5e1" />
        <circle cx="23" cy="23" r="1.6" fill="#1f2937" />
      </svg>
    );
  }
  if (kind === "messages") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <defs>
          <linearGradient id="msg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7be37b" />
            <stop offset="1" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        <rect width="46" height="46" fill="url(#msg)" />
        <path
          d="M11 18 Q11 11 18 11 L28 11 Q35 11 35 18 L35 24 Q35 31 28 31 L21 31 L15 35 L17 30 Q11 30 11 24 Z"
          fill="#fff"
        />
      </svg>
    );
  }
  if (kind === "mail") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <defs>
          <linearGradient id="mail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#dbeafe" />
            <stop offset="1" stopColor="#93c5fd" />
          </linearGradient>
        </defs>
        <rect width="46" height="46" fill="url(#mail)" />
        <rect x="9" y="14" width="28" height="18" rx="2" fill="#fff" stroke="#1f2937" strokeWidth="0.6" />
        <path d="M9 15 L23 26 L37 15" fill="none" stroke="#3b82f6" strokeWidth="1.4" />
      </svg>
    );
  }
  if (kind === "calendar") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <rect width="46" height="46" fill="#fafafa" />
        <rect x="0" y="0" width="46" height="11" fill="#ef4444" />
        <text
          x="23"
          y="9"
          textAnchor="middle"
          fontSize="6.5"
          fill="#fff"
          fontFamily="-apple-system, sans-serif"
          fontWeight="600"
        >
          THU
        </text>
        <text
          x="23"
          y="34"
          textAnchor="middle"
          fontSize="20"
          fill="#1f2937"
          fontFamily="-apple-system, sans-serif"
          fontWeight="300"
        >
          24
        </text>
      </svg>
    );
  }
  if (kind === "notes") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <rect width="46" height="46" fill="#fff8d6" />
        <rect x="0" y="0" width="46" height="9" fill="#f5d76e" />
        <line x1="9" y1="20" x2="37" y2="20" stroke="#cbb56e" strokeWidth="0.8" />
        <line x1="9" y1="26" x2="37" y2="26" stroke="#cbb56e" strokeWidth="0.8" />
        <line x1="9" y1="32" x2="30" y2="32" stroke="#cbb56e" strokeWidth="0.8" />
      </svg>
    );
  }
  if (kind === "music") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <defs>
          <linearGradient id="mus" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fb7185" />
            <stop offset="1" stopColor="#e11d48" />
          </linearGradient>
        </defs>
        <rect width="46" height="46" fill="url(#mus)" />
        <path
          d="M19 30 L19 17 L31 14 L31 27"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse cx="17.5" cy="30" rx="3" ry="2.4" fill="#fff" />
        <ellipse cx="29.5" cy="27" rx="3" ry="2.4" fill="#fff" />
      </svg>
    );
  }
  if (kind === "slack") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <rect width="46" height="46" fill="#fff" />
        <rect x="14" y="20" width="6" height="14" rx="3" fill="#36c5f0" />
        <rect x="20" y="14" width="14" height="6" rx="3" fill="#2eb67d" />
        <rect x="26" y="20" width="6" height="14" rx="3" fill="#ecb22e" />
        <rect x="12" y="26" width="14" height="6" rx="3" fill="#e01e5a" />
      </svg>
    );
  }
  if (kind === "figma") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <rect width="46" height="46" fill="#fff" />
        <circle cx="27" cy="23" r="4.5" fill="#1abcfe" />
        <path d="M14.5 14 h7 v9 h-7 a4.5 4.5 0 0 1 0-9 z" fill="#f24e1e" />
        <path d="M21.5 14 h7 a4.5 4.5 0 0 1 0 9 h-7 z" fill="#a259ff" />
        <path d="M14.5 23 h7 v9 h-2.5 a4.5 4.5 0 0 1 -4.5 -4.5 a4.5 4.5 0 0 1 0 -4.5 z" fill="#0acf83" />
        <path d="M14.5 32 h7 v0 a4.5 4.5 0 0 1 -7 -4.5 a4.5 4.5 0 0 1 0 4.5 z" fill="#ff7262" />
      </svg>
    );
  }
  if (kind === "synthesia") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <defs>
          <linearGradient id="syn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6366f1" />
            <stop offset="1" stopColor="#4338ca" />
          </linearGradient>
        </defs>
        <rect width="46" height="46" fill="url(#syn)" />
        <circle cx="23" cy="20" r="6" fill="#fff" opacity="0.95" />
        <path
          d="M13 36 Q13 27 23 27 Q33 27 33 36 Z"
          fill="#fff"
          opacity="0.95"
        />
        <circle cx="33" cy="13" r="3.5" fill="#fff" opacity="0.6" />
        <circle cx="33" cy="13" r="1.5" fill={SYNTH_BLUE} />
      </svg>
    );
  }
  // trash
  return (
    <svg viewBox="0 0 46 46" style={common}>
      <rect width="46" height="46" fill="#e5e7eb" />
      <path
        d="M14 16 H32 L30 34 Q30 36 28 36 H18 Q16 36 16 34 Z"
        fill="#fff"
        stroke="#6b7280"
        strokeWidth="1"
      />
      <rect x="13" y="14" width="20" height="2.5" rx="1" fill="#6b7280" />
      <line x1="20" y1="20" x2="20" y2="32" stroke="#9ca3af" strokeWidth="1" />
      <line x1="26" y1="20" x2="26" y2="32" stroke="#9ca3af" strokeWidth="1" />
    </svg>
  );
}

/* ---------- Walking avatar ---------- */

function WalkingAvatar({
  bubbleIdx,
  onTap,
}: {
  bubbleIdx: number;
  onTap: () => void;
}) {
  // Walk cycle: walk-right -> pause+turn at right border ->
  // walk-left -> pause+turn at left border -> repeat.
  //
  // We drive animation entirely via refs / direct DOM mutation and
  // intentionally do NOT call setState in the rAF loop — re-rendering
  // every frame can clobber imperative style writes. Leg swing is
  // forwarded to AvatarFigure via a ref-backed child mutator.
  const outerRef = useRef<HTMLDivElement | null>(null);
  const figureRef = useRef<HTMLDivElement | null>(null);
  const phaseRef = useRef(0.5);
  const figureEl = useRef<{ setPhase: (p: number) => void } | null>(null);

  useEffect(() => {
    const range = DOCK_WIDTH - AVATAR_SIZE - WALK_PADDING * 2;
    const cycle = WALK_DURATION * 2 + TURN_DURATION * 2;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = ((now - start) / 1000) % cycle;

      let x: number;
      let walking: boolean;
      let facingRight: boolean;

      if (t < WALK_DURATION) {
        // 1) walking right
        walking = true;
        facingRight = true;
        x = WALK_PADDING + (t / WALK_DURATION) * range;
      } else if (t < WALK_DURATION + TURN_DURATION) {
        // 2) reach right border -> turn (flip mid-pause)
        walking = false;
        const tt = t - WALK_DURATION;
        facingRight = tt < TURN_DURATION / 2;
        x = WALK_PADDING + range;
      } else if (t < 2 * WALK_DURATION + TURN_DURATION) {
        // 3) walking left
        walking = true;
        facingRight = false;
        const localT = (t - WALK_DURATION - TURN_DURATION) / WALK_DURATION;
        x = WALK_PADDING + range - localT * range;
      } else {
        // 4) reach left border -> turn (flip mid-pause)
        walking = false;
        const tt = t - (2 * WALK_DURATION + TURN_DURATION);
        facingRight = tt > TURN_DURATION / 2;
        x = WALK_PADDING;
      }

      const bob = walking ? Math.abs(Math.sin(t * Math.PI * 4)) * 2.2 : 0;
      const legPhase = walking
        ? (Math.sin(t * Math.PI * 4) + 1) / 2
        : 0.5;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
      }
      if (figureRef.current) {
        figureRef.current.style.transform = `translateY(${-bob}px) scaleX(${
          facingRight ? 1 : -1
        })`;
      }
      if (phaseRef.current !== legPhase) {
        phaseRef.current = legPhase;
        figureEl.current?.setPhase(legPhase);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={outerRef}
      onClick={onTap}
      className="absolute"
      style={{
        top: -AVATAR_SIZE + 14,
        left: 0,
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        cursor: "pointer",
        willChange: "transform",
      }}
      aria-label="Synthesia desktop companion"
    >
      {/* mini bubble that rides above the avatar's head */}
      <AttachedBubble bubbleIdx={bubbleIdx} />

      {/* figure bobs + flips; wrapped so the bubble above stays upright */}
      <div
        ref={figureRef}
        style={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          willChange: "transform",
          transformOrigin: "center bottom",
        }}
      >
        <AvatarFigureRefBacked handle={figureEl} />
      </div>
    </div>
  );
}

function AvatarFigureRefBacked({
  handle,
}: {
  handle: React.MutableRefObject<{ setPhase: (p: number) => void } | null>;
}) {
  const [phase, setPhase] = useState(0.5);
  useEffect(() => {
    handle.current = { setPhase };
    return () => {
      handle.current = null;
    };
  }, [handle]);
  return <AvatarFigure phase={phase} />;
}

function AttachedBubble({ bubbleIdx }: { bubbleIdx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        bottom: "100%",
        left: "50%",
        transform: "translate(-50%, -6px)",
        width: 190,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: SYNTH_BLUE,
          color: "#fff",
          fontFamily: fonts.serif,
          fontSize: 11,
          fontStyle: "italic",
          lineHeight: 1.35,
          padding: "7px 11px",
          borderRadius: 11,
          textAlign: "center",
          boxShadow:
            "0 6px 16px rgba(79, 70, 229, 0.22), inset 0 1px 0 rgba(255,255,255,0.18)",
          minHeight: 30,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={bubbleIdx}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.2 }}
            style={{ display: "block" }}
          >
            "{bubbleLines[bubbleIdx]}"
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function AvatarFigure({ phase }: { phase: number }) {
  // Two-frame walk cycle driven by `phase` (0..1).
  // Legs swap; arms swing opposite. Body bobs in parent.
  const swing = (phase - 0.5) * 2; // -1..1
  const legL = swing * 6;
  const legR = -swing * 6;
  const armL = -swing * 8;
  const armR = swing * 8;

  return (
    <svg
      viewBox="0 0 64 64"
      width={AVATAR_SIZE}
      height={AVATAR_SIZE}
      style={{ display: "block", overflow: "visible" }}
    >
      {/* soft ground shadow */}
      <ellipse
        cx="32"
        cy="62"
        rx={11 - Math.abs(swing) * 1.2}
        ry="1.6"
        fill="rgba(31,29,26,0.18)"
      />

      {/* back arm */}
      <g
        transform={`rotate(${armL} 24 32)`}
        style={{ transformOrigin: "24px 32px" }}
      >
        <rect x="22.5" y="32" width="3.4" height="13" rx="1.6" fill="#0f172a" />
        <circle cx="24.2" cy="46" r="2" fill="#d9b896" />
      </g>

      {/* legs */}
      <g transform={`translate(0 ${Math.abs(swing) * 0.6})`}>
        <g
          transform={`rotate(${legL} 28 48)`}
          style={{ transformOrigin: "28px 48px" }}
        >
          <rect x="26.2" y="48" width="4" height="13" rx="1.4" fill="#1f2937" />
          <ellipse cx="28.2" cy="61.5" rx="3.4" ry="1.5" fill="#0f172a" />
        </g>
        <g
          transform={`rotate(${legR} 36 48)`}
          style={{ transformOrigin: "36px 48px" }}
        >
          <rect x="33.8" y="48" width="4" height="13" rx="1.4" fill="#1f2937" />
          <ellipse cx="35.8" cy="61.5" rx="3.4" ry="1.5" fill="#0f172a" />
        </g>
      </g>

      {/* torso / suit jacket */}
      <path
        d="M18 48 L18 32 Q18 24 24 22 L28 26 L32 24 L36 26 L40 22 Q46 24 46 32 L46 48 Q46 50 44 50 L20 50 Q18 50 18 48 Z"
        fill="#1f2937"
      />
      {/* shirt v + collar */}
      <path d="M28 26 L32 38 L36 26 L32 24 Z" fill="#f4f1ea" />
      {/* tie in Synthesia blue */}
      <path
        d="M30.6 26 L30 36 L32 38 L34 36 L33.4 26 L32 25 Z"
        fill={SYNTH_BLUE}
      />
      {/* lapel stitching */}
      <path
        d="M28 26 L24 48 M36 26 L40 48"
        stroke="#0b1220"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* shoulder highlight */}
      <path
        d="M19 30 Q24 26 28 28"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        fill="none"
      />

      {/* neck */}
      <rect x="29" y="20" width="6" height="4" fill="#c2a07f" />

      {/* head */}
      <ellipse cx="32" cy="14" rx="9" ry="9.5" fill="#dcb898" />
      {/* hair */}
      <path
        d="M22 13 Q22 4 32 4 Q42 4 42 13 Q41 9 38 8 Q34 11 32 11 Q30 11 26 8 Q23 9 22 13 Z"
        fill="#1f1812"
      />
      {/* ear */}
      <ellipse cx="40.5" cy="15" rx="1.4" ry="2.2" fill="#c89e80" />
      {/* eye (single, side profile-ish) */}
      <circle cx="35.5" cy="14.5" r="0.9" fill="#0b1220" />
      <circle cx="35.5" cy="14.5" r="0.25" fill="#fff" />
      {/* eyebrow */}
      <path
        d="M34 12.4 L37 12.2"
        stroke="#1f1812"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      {/* smile */}
      <path
        d="M35.5 17.3 Q37 18.2 38.4 17.3"
        stroke="#5b3a2c"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />

      {/* front arm */}
      <g
        transform={`rotate(${armR} 40 32)`}
        style={{ transformOrigin: "40px 32px" }}
      >
        <rect x="38.5" y="32" width="3.4" height="13" rx="1.6" fill="#0f172a" />
        <circle cx="40.2" cy="46" r="2" fill="#d9b896" />
      </g>
    </svg>
  );
}

/* ---------- Callout ---------- */

function Callout({
  label,
  body,
  delay,
}: {
  label: string;
  body: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: "16px 18px",
        background: tokens.paper,
        border: `1px solid ${tokens.rule}`,
      }}
    >
      <div
        className="mb-2 inline-flex items-center gap-2"
        style={{
          fontFamily: fonts.mono,
          fontSize: 10.5,
          letterSpacing: "0.16em",
          color: tokens.accent,
        }}
      >
        <span
          style={{
            width: 14,
            height: 1,
            background: tokens.accent,
            display: "inline-block",
          }}
        />
        {label}
      </div>
      <p
        style={{
          fontFamily: fonts.serif,
          fontSize: 13,
          lineHeight: 1.5,
          color: tokens.inkSoft,
        }}
      >
        {body}
      </p>
    </motion.div>
  );
}
