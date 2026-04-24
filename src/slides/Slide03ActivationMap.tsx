import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { tokens, fonts } from "../lib/tokens";
import { SlideHeader } from "../components/SlideShell";

type Moment = "setup" | "aha" | "habit";

type CellData = {
  nowBody: ReactNode;
  proposedBody: ReactNode;
};

type MetricCell = {
  code: string;
  line: string;
  note: string;
};

const qualitative: Record<Moment, string> = {
  setup: '"I\'m ready to create." User has provided the minimum inputs needed to generate a first video.',
  aha: '"This will actually help me — with a lot of things." The first output feels good enough to show someone.',
  habit:
    '"I need a video — I\'ll use Synthesia." The user\'s default mental model for video reaches for this tool.',
};

const stateCells: Record<Moment, CellData> = {
  setup: {
    nowBody:
      "Survive 11 qualification asks, then land in a templates-first editor. High friction, cold start.",
    proposedBody: (
      <>
        <strong>Submit a prompt.</strong> One input, instrumented. Qualification
        inferred or asked during render.
      </>
    ),
  },
  aha: {
    nowBody:
      "Gated behind setup. First-render button silently fails. Aha rarely arrives at all for personal-email signups.",
    proposedBody: (
      <>
        <strong>Watch your first video end-to-end.</strong> Share rate is the
        behavioural proof — if it's worth sharing, the Aha landed.
      </>
    ),
  },
  habit: {
    nowBody:
      "Invite-colleagues asked before any video exists. Share is a right-click menu item. No attribution on shared links.",
    proposedBody: (
      <>
        <strong>Trigger → Action → Reward.</strong> "I need a video" → "Type prompt,
        share result" → "Recipient watches, responds, prompts another." A manufactured
        loop, UTM-attributed end to end.
      </>
    ),
  },
};

const metrics: Record<Moment, MetricCell> = {
  setup: {
    code: "1p7d",
    line: "One prompt submitted within 7 days of signup",
    note: "counter: abandon rate before first prompt",
  },
  aha: {
    code: "1c7d",
    line: "One video completed + watched end-to-end in 7 days",
    note: "hypothesis: share rate is the stronger LTV predictor — validate by cohort",
  },
  habit: {
    code: "1s→1v7d",
    line: "One share → one new video from recipient within 7 days",
    note: "the loop closing: attribution via UTM on shared link",
  },
};

const moments: Moment[] = ["setup", "aha", "habit"];

export default function Slide03ActivationMap() {
  // per-moment toggle — each column can be flipped independently
  const [state, setState] = useState<Record<Moment, "now" | "proposed">>({
    setup: "now",
    aha: "now",
    habit: "now",
  });

  const allProposed = moments.every((m) => state[m] === "proposed");
  const flipAll = () => {
    const target = allProposed ? "now" : "proposed";
    setState({ setup: target, aha: target, habit: target });
  };

  return (
    <>
      <SlideHeader
        eyebrow="Activation Map"
        meta="Setup · Aha · Habit — now vs proposed, in the framework's own format"
        num={3}
        total={11}
      />

      <h2
        style={{
          fontFamily: fonts.serif,
          fontSize: "clamp(28px, 3.2vw, 42px)",
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: tokens.ink,
          marginBottom: 16,
        }}
      >
        Define the{" "}
        <em style={{ color: tokens.accent, fontStyle: "italic" }}>moments</em> and{" "}
        <em style={{ color: tokens.accent, fontStyle: "italic" }}>metrics</em>.
        <br />
        Then apply the three prescribed actions.
      </h2>

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={flipAll}
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "6px 14px",
            background: allProposed ? tokens.accent : "transparent",
            color: allProposed ? tokens.bg : tokens.accent,
            border: `1px solid ${tokens.accent}`,
            cursor: "pointer",
          }}
        >
          {allProposed ? "Flip all back to now" : "Flip all to proposed"}
        </button>
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: tokens.muted,
          }}
        >
          Or click any column header to flip that moment
        </span>
      </div>

      {/* 4-col grid: row-label + 3 moments */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "120px repeat(3, 1fr)",
          border: `1px solid ${tokens.rule}`,
          background: tokens.paper,
        }}
      >
        {/* Header row */}
        <Cell header>Moment</Cell>
        {moments.map((m) => (
          <HeaderCell
            key={m}
            moment={m}
            flipped={state[m] === "proposed"}
            onClick={() =>
              setState((s) => ({
                ...s,
                [m]: s[m] === "now" ? "proposed" : "now",
              }))
            }
          />
        ))}

        {/* Qualitative moment row */}
        <RowLabel>Qualitative moment</RowLabel>
        {moments.map((m) => (
          <Cell key={m} isAha={m === "aha"}>
            <RowText text={qualitative[m]} />
          </Cell>
        ))}

        {/* State row — animated */}
        <RowLabel>State</RowLabel>
        {moments.map((m) => {
          const flipped = state[m] === "proposed";
          const cell = stateCells[m];
          return (
            <Cell key={m} isAha={m === "aha"} proposed={flipped}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={flipped ? "proposed" : "now"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                >
                  <StateLabel flipped={flipped} />
                  <div
                    className="mt-1"
                    style={{
                      fontFamily: fonts.serif,
                      fontSize: 12.5,
                      lineHeight: 1.45,
                      color: flipped ? tokens.ink : tokens.inkSoft,
                    }}
                  >
                    {flipped ? cell.proposedBody : cell.nowBody}
                  </div>
                </motion.div>
              </AnimatePresence>
            </Cell>
          );
        })}

        {/* Metric row */}
        <RowLabel last>Metric to track</RowLabel>
        {moments.map((m) => (
          <Cell key={m} isAha={m === "aha"} last>
            <div
              className="inline-block"
              style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                color: tokens.gold,
                background: "rgba(160, 122, 45, 0.08)",
                padding: "2px 6px",
                borderRadius: 3,
              }}
            >
              {metrics[m].code}
            </div>
            <div
              className="mt-1"
              style={{
                fontFamily: fonts.serif,
                fontSize: 11.5,
                color: tokens.inkSoft,
                lineHeight: 1.4,
              }}
            >
              {metrics[m].line}
            </div>
            <div
              className="mt-1 italic"
              style={{
                fontFamily: fonts.serif,
                fontSize: 10.5,
                color: tokens.muted,
              }}
            >
              {metrics[m].note}
            </div>
          </Cell>
        ))}
      </div>

      {/* three prescribed actions */}
      <div
        className="mt-5 px-5 py-4"
        style={{
          borderLeft: `3px solid ${tokens.accent}`,
          background: "rgba(139, 58, 46, 0.03)",
        }}
      >
        <div
          className="mb-[10px]"
          style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: tokens.accent,
          }}
        >
          The three prescribed actions — applied as three ideas
        </div>
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <ActionItem
            num="01"
            title="Assistant on the in-app home"
            action="Reorder + remove friction · Setup"
          />
          <ActionItem
            num="02"
            title="Share as a primary CTA"
            action="Close the habit loop · Habit"
          />
          <ActionItem
            num="03"
            title="Prompt box on the marketing homepage"
            action="Reorder upstream · all three moments"
          />
        </div>
      </div>
    </>
  );
}

function Cell({
  children,
  header,
  isAha,
  proposed,
  last,
}: {
  children: ReactNode;
  header?: boolean;
  isAha?: boolean;
  proposed?: boolean;
  last?: boolean;
}) {
  const bg = header
    ? tokens.bg
    : isAha
    ? "rgba(139, 58, 46, 0.05)"
    : tokens.paper;
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRight: `1px solid ${tokens.rule}`,
        borderBottom: last ? "none" : `1px solid ${tokens.rule}`,
        background: bg,
        color: proposed ? tokens.ink : undefined,
      }}
    >
      {children}
    </div>
  );
}

function HeaderCell({
  moment,
  flipped,
  onClick,
}: {
  moment: Moment;
  flipped: boolean;
  onClick: () => void;
}) {
  const isAha = moment === "aha";
  return (
    <button
      onClick={onClick}
      className="text-left"
      style={{
        padding: "14px 16px",
        borderRight: `1px solid ${tokens.rule}`,
        borderBottom: `1px solid ${tokens.rule}`,
        background: tokens.bg,
        fontFamily: fonts.mono,
        fontSize: 10,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: isAha ? tokens.accent : tokens.muted,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span>{moment}</span>
      <span
        style={{
          fontSize: 9,
          color: flipped ? tokens.accent : tokens.muted,
          letterSpacing: "0.08em",
        }}
      >
        {flipped ? "proposed ↻" : "now ↻"}
      </span>
    </button>
  );
}

function RowLabel({ children, last }: { children: ReactNode; last?: boolean }) {
  return (
    <div
      className="flex items-center"
      style={{
        padding: "14px 16px",
        borderRight: `1px solid ${tokens.rule}`,
        borderBottom: last ? "none" : `1px solid ${tokens.rule}`,
        background: tokens.bg,
        fontFamily: fonts.mono,
        fontSize: 10,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: tokens.muted,
      }}
    >
      {children}
    </div>
  );
}

function RowText({ text }: { text: string }) {
  const match = text.match(/^(".*?")\s(.*)$/);
  if (!match) return <span>{text}</span>;
  return (
    <>
      <strong style={{ color: tokens.ink, fontWeight: 500 }}>{match[1]}</strong>{" "}
      <span style={{ color: tokens.inkSoft }}>{match[2]}</span>
    </>
  );
}

function StateLabel({ flipped }: { flipped: boolean }) {
  return (
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 9.5,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: flipped ? tokens.accent : tokens.muted,
      }}
    >
      {flipped ? "Proposed" : "Now"}
    </div>
  );
}

function ActionItem({
  num,
  title,
  action,
}: {
  num: string;
  title: string;
  action: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span
        style={{
          fontFamily: fonts.serif,
          fontStyle: "italic",
          fontSize: 22,
          color: tokens.accent,
          lineHeight: 1,
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontFamily: fonts.serif,
          fontSize: 14.5,
          fontWeight: 500,
          color: tokens.ink,
          lineHeight: 1.25,
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          color: tokens.muted,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {action}
      </span>
    </div>
  );
}
