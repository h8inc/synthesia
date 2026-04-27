import { useMemo, useState } from "react";
import { LayoutGroup, motion, AnimatePresence } from "motion/react";
import { tokens, fonts, type Step } from "../lib/tokens";
import { SlideHeader } from "../components/SlideShell";
import { Chevron, TankBar } from "../components/ooo";

const currentSteps: Step[] = [
  { id: "cta", label: "CTA", cost: -1, kind: "ask" },
  { id: "price", label: "Pricing", cost: -3, kind: "ask" },
  { id: "demo", label: "Demo modal", cost: -2, kind: "ask" },
  { id: "email", label: "Email", cost: -2, kind: "ask" },
  { id: "dept", label: "Department", cost: -1, kind: "ask" },
  { id: "job", label: "Job title", cost: -1, kind: "ask" },
  { id: "workplace", label: "Workplace", cost: -1, kind: "ask" },
  { id: "website", label: "Website", cost: -1, kind: "ask" },
  { id: "size", label: "Company size", cost: -1, kind: "ask" },
  { id: "source", label: "Source", cost: -1, kind: "ask" },
  { id: "invite", label: "Invite team", cost: -2, kind: "ask" },
  { id: "prompt-dead", label: "Prompt", cost: "dead", kind: "aha-missed" },
];

const proposedSteps: Step[] = [
  { id: "prompt", label: "Prompt", cost: 20, kind: "aha" },
  { id: "render", label: "Video renders", cost: 8, kind: "gain" },
  { id: "email-p", label: "Email", cost: -2, kind: "ask" },
  { id: "share", label: "Share", cost: 6, kind: "gain" },
  { id: "oneq", label: "1 Q during render", cost: -1, kind: "ask" },
  { id: "next", label: "Next prompt", cost: 5, kind: "gain" },
];

const funnelSteps = [
  'Homepage — two "Get started" CTAs → same pricing page',
  "Pricing — 4 tiers, 38% off, no product preview",
  'Free tier → modal: "book demo or continue"',
  "Email signup",
  "Department",
  "Video type by job title",
  "Where I work",
  "My website",
  "Company size",
  "Channel attribution",
  "Invite colleagues — before any video exists",
  "Prompt box → Generate → silently fails",
];

/** Aligned 1:1 with `proposedSteps` — for right column + hover when mode is “proposed”. */
const proposedFunnelLines = [
  "Prompt & generate — aha in the first interaction",
  "Video renders — value before heavy asks",
  "Email, after the hook (not before)",
  "Share to close the habit loop",
  "At most one light question during render",
  "Next prompt — compound the loop",
];

export default function Slide02Problem({
  slideNum = 2,
  totalSlides = 11,
  hideHeader = false,
}: {
  slideNum?: number;
  totalSlides?: number;
  hideHeader?: boolean;
} = {}) {
  const [mode, setMode] = useState<"current" | "proposed">("current");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeSteps = mode === "current" ? currentSteps : proposedSteps;

  const runningEnergy = useMemo(() => {
    if (!hoveredId) return undefined;
    const idx = activeSteps.findIndex((s) => s.id === hoveredId);
    if (idx < 0) return undefined;
    return Math.min(1, Math.max(0, (idx + 1) / activeSteps.length));
  }, [hoveredId, activeSteps]);

  const displaySteps: Step[] =
    mode === "current" ? currentSteps : proposedSteps;

  return (
    <>
      {!hideHeader && (
        <SlideHeader
          eyebrow="Problem"
          meta="The order of operations is upside down"
          num={slideNum}
          total={totalSlides}
        />
      )}

      <div
        className="grid gap-14"
        style={{ gridTemplateColumns: "1.65fr 1fr" }}
      >
        {/* LEFT — hero: OoO with headline, toggle, chevrons, tank, stats */}
        <div className="flex flex-col">
          <h2
            className="mb-5"
            style={{
              fontFamily: fonts.serif,
              fontSize: "clamp(28px, 3.2vw, 42px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: tokens.ink,
            }}
          >
            The journey is{" "}
            <em style={{ color: tokens.accent, fontStyle: "italic" }}>
              upside down.
            </em>
          </h2>

          <p
            className="mb-10"
            style={{
              fontFamily: fonts.serif,
              fontSize: "clamp(14px, 1.15vw, 16px)",
              lineHeight: 1.55,
              color: tokens.inkSoft,
              fontStyle: "italic",
              borderLeft: `2px solid ${tokens.accent}`,
              paddingLeft: 16,
              maxWidth: 640,
            }}
          >
            Every step costs the user energy. Nothing gives any back — until the
            moment the generate button silently dies.
          </p>

          {/* toggle + legend inline */}
          <div className="flex items-center justify-between mt-6 mb-8 flex-wrap gap-4">
            <div className="flex gap-2">
              <ToggleButton
                active={mode === "current"}
                onClick={() => setMode("current")}
                variant="ink"
              >
                Current — 11 steps
              </ToggleButton>
              <ToggleButton
                active={mode === "proposed"}
                onClick={() => setMode("proposed")}
                variant="accent"
              >
                Proposed — aha first
              </ToggleButton>
            </div>
            <Legend />
          </div>

          {/* chevrons + tank — grouped as one "chart" */}
          <div className="py-2">
            <LayoutGroup>
              <motion.div
                className="grid gap-[2px]"
                style={{
                  gridTemplateColumns: `repeat(${displaySteps.length}, minmax(0, 1fr))`,
                }}
                layout
              >
                <AnimatePresence mode="popLayout">
                  {displaySteps.map((step, i) => (
                    <Chevron
                      key={step.id}
                      step={step}
                      index={i}
                      hovered={hoveredId === step.id}
                      onHover={setHoveredId}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>

            <div className="mt-7">
              <TankBar state={mode} hoverFill={runningEnergy} />
            </div>

            <div
              className="mt-5 flex justify-between gap-3"
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <div
                style={{
                  color: mode === "current" ? tokens.muted : tokens.accent,
                }}
              >
                {mode === "current" ? "Start · full tank" : "Aha first · filling"}
              </div>
              <div
                style={{
                  color: mode === "current" ? tokens.accent : tokens.muted,
                }}
                className="text-right"
              >
                {mode === "current"
                  ? "Aha at step 12 · empty"
                  : "Ask only what's needed"}
              </div>
            </div>
          </div>

          {/* stats — the "so what" */}
          <div
            className="grid gap-10 pt-10 mt-12"
            style={{
              gridTemplateColumns: "1fr 1fr",
              borderTop: `1px solid ${tokens.rule}`,
              alignItems: "end",
            }}
          >
            {mode === "current" ? (
              <>
                <Stat num="11" label="Asks before user can create" />
                <Stat num="0" label="Value delivered pre-render" />
              </>
            ) : (
              <>
                <Stat
                  num="1"
                  label="Aha (prompt) before heavy asks"
                  numColor={tokens.insight}
                />
                <Stat
                  num="2"
                  label="Asks only after first value (email + 1Q)"
                  numColor={tokens.insight}
                />
              </>
            )}
          </div>
        </div>

        {/* RIGHT — the receipt: funnel as observed */}
        <div>
          <h3
            className="mb-3"
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: tokens.muted,
            }}
          >
            {mode === "current"
              ? "The funnel, observed"
              : "The proposed path, sketched"}
          </h3>

          <ol className="list-none p-0">
            {(mode === "current" ? funnelSteps : proposedFunnelLines).map(
              (s, i) => {
                const list =
                  mode === "current" ? funnelSteps : proposedFunnelLines;
                const isLast = i === list.length - 1;
                const idForRow =
                  mode === "current"
                    ? (currentSteps[i]?.id ?? null)
                    : (proposedSteps[i]?.id ?? null);
                const active = idForRow != null && hoveredId === idForRow;
                const lastColor =
                  mode === "current" ? tokens.accent : tokens.insight;
                return (
                  <li
                    key={mode + String(i) + s}
                    onMouseEnter={() => {
                      if (idForRow) setHoveredId(idForRow);
                    }}
                    onMouseLeave={() => {
                      setHoveredId(null);
                    }}
                    className="grid gap-[12px]"
                    style={{
                      gridTemplateColumns: "26px 1fr",
                      padding: "8px 8px 8px 6px",
                      borderBottom: isLast
                        ? "none"
                        : `1px dashed ${tokens.rule}`,
                      fontSize: 12.5,
                      lineHeight: 1.45,
                      color: isLast
                        ? lastColor
                        : tokens.inkSoft,
                      fontWeight: isLast ? 500 : 400,
                      fontFamily: fonts.serif,
                      background: active
                        ? mode === "current"
                          ? "rgba(139, 58, 46, 0.05)"
                          : "rgba(79, 70, 229, 0.06)"
                        : "transparent",
                      transition: "background 0.15s ease",
                      cursor: "default",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: fonts.mono,
                        fontSize: 10,
                        color: isLast ? lastColor : tokens.muted,
                        paddingTop: 3,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{s}</span>
                  </li>
                );
              }
            )}
          </ol>

          <div
            className="mt-[14px] px-3 py-[10px]"
            style={{
              borderLeft: `2px solid ${tokens.rule}`,
              fontSize: 11.5,
              lineHeight: 1.5,
              color: tokens.muted,
              fontStyle: "italic",
              fontFamily: fonts.serif,
            }}
          >
            Fair caveat — some steps may be skipped for users Clearbit enriches.
            My signup used a personal email, so I saw the full sequence. The real
            drop-off distribution across cohorts is something we'd pull from
            analytics.
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({
  num,
  label,
  numColor = tokens.accent,
}: {
  num: string;
  label: string;
  numColor?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: "clamp(36px, 4vw, 56px)",
          fontWeight: 300,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: numColor,
          fontStyle: "italic",
        }}
      >
        {num}
      </div>
      <div
        className="mt-1"
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: tokens.muted,
          maxWidth: 180,
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Legend() {
  const items: Array<{ color: string; label: string }> = [
    { color: tokens.drain, label: "Ask — drains" },
    { color: tokens.gain, label: "Value — fills" },
    { color: tokens.insight, label: "Aha" },
  ];
  return (
    <div
      className="flex gap-[14px] flex-wrap"
      style={{
        fontFamily: fonts.mono,
        fontSize: 9.5,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: tokens.muted,
      }}
    >
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-[6px]">
          <span
            className="inline-block rounded-[2px]"
            style={{ width: 9, height: 9, background: it.color }}
          />
          {it.label}
        </div>
      ))}
    </div>
  );
}

function ToggleButton({
  children,
  active,
  onClick,
  variant,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  variant: "ink" | "accent";
}) {
  const hue = variant === "ink" ? tokens.ink : tokens.accent;
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: fonts.mono,
        fontSize: 11,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "6px 16px",
        background: active ? hue : "transparent",
        color: active ? tokens.bg : hue,
        border: `1px solid ${hue}`,
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      {children}
    </button>
  );
}
