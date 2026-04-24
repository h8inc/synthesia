import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { tokens, fonts } from "../lib/tokens";
import { SlideHeader } from "../components/SlideShell";

type Moment = "setup" | "aha" | "habit";
type ExType = "t1" | "t2";
type Size = "XS" | "S" | "M" | "L" | "XL";

type Experiment = {
  id: string;
  name: string;
  sub: string;
  moment: Moment;
  type: ExType;
  size: Size;
  rice: number;
  breakdown: string;
  metric: string;
  highlight?: boolean;
  ideaTag?: "01" | "02" | "03";
};

const experiments: Experiment[] = [
  {
    id: "E11",
    name: "Assistant promoted to in-app home (Idea 01)",
    sub: "A/B vs current templates-first layout — no new compute",
    moment: "aha",
    type: "t2",
    size: "S",
    rice: 96,
    breakdown: "R8 · I3 · C0.8 / E0.2",
    metric: "video-creation rate · time-to-first-video",
    highlight: true,
    ideaTag: "01",
  },
  {
    id: "E1",
    name: "Homepage prompt box (no login required)",
    sub: "3 free shuffles, IP-rate-limited — the Type 1 bet, staged",
    moment: "aha",
    type: "t2",
    size: "S",
    rice: 72,
    breakdown: "R8 · I3 · C0.9 / E0.3",
    metric: "signup rate · cost/render",
  },
  {
    id: "E2",
    name: "Two-door routing by firmographic intent",
    sub: "Enterprise → demo modal; SMB/creator → product",
    moment: "setup",
    type: "t2",
    size: "M",
    rice: 48,
    breakdown: "R6 · I2 · C0.8 / E0.2",
    metric: "path-to-paid by cohort",
  },
  {
    id: "E3",
    name: "Collapse qualification modals into the prompt",
    sub: "Remove department / job-title / company-size asks; infer from prompt + enrichment",
    moment: "setup",
    type: "t2",
    size: "M",
    rice: 56,
    breakdown: "R8 · I2 · C0.7 / E0.2",
    metric: "activation · cohort fidelity",
  },
  {
    id: "E4",
    name: "Ask-during-render: qualification as a game",
    sub: "Fire questions while video generates, not before",
    moment: "setup",
    type: "t2",
    size: "S",
    rice: 48,
    breakdown: "R6 · I2 · C0.8 / E0.2",
    metric: "answer rate · quality",
  },
  {
    id: "E5",
    name: "Fix the dead generate button",
    sub: "Obvious. But also: instrument failure modes",
    moment: "aha",
    type: "t2",
    size: "XS",
    rice: 180,
    breakdown: "R9 · I3 · C1.0 / E0.15",
    metric: "first-render success rate",
  },
  {
    id: "E6",
    name: "Shuffle-prompt surfaced on the homepage",
    sub: "Currently hidden in the editor — move it to the door",
    moment: "aha",
    type: "t2",
    size: "XS",
    rice: 64,
    breakdown: "R8 · I2 · C0.6 / E0.15",
    metric: "unique renders / visitor",
  },
  {
    id: "E7",
    name: "UTM-attribution on every shared video link (Idea 02)",
    sub: "Reframes retention from individual to network",
    moment: "habit",
    type: "t2",
    size: "S",
    rice: 54,
    breakdown: "R5 · I3 · C0.9 / E0.25",
    metric: "network retention",
    ideaTag: "02",
  },
  {
    id: "E8",
    name: "In-product upsell surfaces (script review, brand check)",
    sub: "Upgrade at the point of need — not at the gate",
    moment: "habit",
    type: "t2",
    size: "L",
    rice: 42,
    breakdown: "R6 · I3 · C0.7 / E0.3",
    metric: "free→paid conversion",
  },
  {
    id: "E9",
    name: "Pricing-page A/B: product-preview above fold",
    sub: "Preview renders before plan comparison",
    moment: "setup",
    type: "t2",
    size: "S",
    rice: 60,
    breakdown: "R7 · I2 · C0.8 / E0.18",
    metric: "plan selection rate",
  },
  {
    id: "E10",
    name: "Full order-of-operations reversal on homepage (Idea 03)",
    sub: "Committed rollout — informed by E1–E9 and E11",
    moment: "aha",
    type: "t1",
    size: "XL",
    rice: 32,
    breakdown: "R9 · I3 · C0.8 / E0.7",
    metric: "ARR / free→paid / CAC payback",
    highlight: true,
    ideaTag: "03",
  },
];

type SortKey = "id" | "rice" | "moment" | "type" | "size";
type SortDir = "asc" | "desc";

const sizeRank: Record<Size, number> = { XS: 0, S: 1, M: 2, L: 3, XL: 4 };
const momentRank: Record<Moment, number> = { setup: 0, aha: 1, habit: 2 };

export default function Slide08Pipeline() {
  const [momentFilter, setMomentFilter] = useState<Moment | "all">("all");
  const [typeFilter, setTypeFilter] = useState<ExType | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("rice");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const rows = useMemo(() => {
    const filtered = experiments.filter(
      (e) =>
        (momentFilter === "all" || e.moment === momentFilter) &&
        (typeFilter === "all" || e.type === typeFilter)
    );
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      switch (sortKey) {
        case "rice":
          return (a.rice - b.rice) * dir;
        case "moment":
          return (momentRank[a.moment] - momentRank[b.moment]) * dir;
        case "type":
          return (a.type.localeCompare(b.type)) * dir;
        case "size":
          return (sizeRank[a.size] - sizeRank[b.size]) * dir;
        case "id":
        default: {
          const an = parseInt(a.id.slice(1), 10);
          const bn = parseInt(b.id.slice(1), 10);
          return (an - bn) * dir;
        }
      }
    });
  }, [momentFilter, typeFilter, sortKey, sortDir]);

  const toggleSort = (k: SortKey) => {
    if (k === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir(k === "rice" ? "desc" : "asc");
    }
  };

  return (
    <>
      <SlideHeader
        eyebrow="Pipeline"
        meta="Type 1 & Type 2 experiments, mapped to activation moments"
        num={8}
        total={11}
      />

      <div className="mb-5" style={{ maxWidth: 900 }}>
        <h2
          style={{
            fontFamily: fonts.serif,
            fontSize: "clamp(28px, 3.2vw, 42px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: tokens.ink,
            marginBottom: 14,
          }}
        >
          Three bets on a ladder.
          <br />
          Underneath them —{" "}
          <em style={{ color: tokens.accent, fontStyle: "italic" }}>
            eleven experiments
          </em>
          , each with a metric.
        </h2>
        <p
          style={{
            fontFamily: fonts.serif,
            fontSize: 14,
            lineHeight: 1.55,
            color: tokens.inkSoft,
          }}
        >
          The pipeline reads left-to-right: each experiment is tagged to the
          activation moment it moves (Setup, Aha, Habit) and the Reforge metric
          underneath it. Idea 01 maps to E11. Idea 02 maps to E7. Idea 03 is E10 —
          the Type 1 bet.
        </p>
      </div>

      {/* metric hierarchy */}
      <div
        className="grid mb-5"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          padding: "14px 18px",
          border: `1px solid ${tokens.rule}`,
          background: tokens.paper,
        }}
      >
        <MetricBox
          label="Setup"
          value="% reaching first prompt"
          highlight={momentFilter === "setup"}
          onClick={() =>
            setMomentFilter(momentFilter === "setup" ? "all" : "setup")
          }
          tone={tokens.muted}
        />
        <MetricBox
          label="Aha"
          value="first video generated + watched"
          highlight={momentFilter === "aha"}
          onClick={() => setMomentFilter(momentFilter === "aha" ? "all" : "aha")}
          tone={tokens.accent}
          background="rgba(139,58,46,0.04)"
        />
        <MetricBox
          label="Habit"
          value="share rate · shared-video-to-signup"
          highlight={momentFilter === "habit"}
          onClick={() =>
            setMomentFilter(momentFilter === "habit" ? "all" : "habit")
          }
          tone={tokens.gold}
        />
        <MetricBox
          label="Business"
          value="free→paid · LTV"
          highlight={false}
          tone={tokens.gold}
        />
      </div>

      {/* filter row */}
      <div
        className="flex items-center gap-3 mb-3"
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: tokens.muted,
        }}
      >
        <span>Filter type:</span>
        <FilterPill
          label="All"
          active={typeFilter === "all"}
          onClick={() => setTypeFilter("all")}
        />
        <FilterPill
          label="Type 1"
          active={typeFilter === "t1"}
          onClick={() => setTypeFilter("t1")}
          accent={tokens.accent}
        />
        <FilterPill
          label="Type 2"
          active={typeFilter === "t2"}
          onClick={() => setTypeFilter("t2")}
          accent={tokens.sage}
        />
        <span className="ml-4">
          {rows.length} of {experiments.length} shown
        </span>
        {(momentFilter !== "all" || typeFilter !== "all") && (
          <button
            onClick={() => {
              setMomentFilter("all");
              setTypeFilter("all");
            }}
            style={{
              marginLeft: "auto",
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: tokens.accent,
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            clear filters
          </button>
        )}
      </div>

      {/* table */}
      <div style={{ width: "100%", overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13.5,
          }}
        >
          <thead>
            <tr>
              <Th k="id" label="#" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
              <th
                style={thStyle}
                className="text-left"
              >
                Experiment
              </th>
              <Th
                k="moment"
                label="Moment"
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={toggleSort}
              />
              <Th
                k="type"
                label="Type"
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={toggleSort}
              />
              <Th
                k="size"
                label="Size"
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={toggleSort}
              />
              <Th
                k="rice"
                label="RICE"
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={toggleSort}
              />
              <th style={thStyle} className="text-left">
                Primary metric
              </th>
            </tr>
          </thead>
          <LayoutGroup>
            <tbody>
              <AnimatePresence>
                {rows.map((e) => (
                  <motion.tr
                    layout
                    key={e.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.2 },
                    }}
                    style={{
                      background: e.highlight
                        ? "rgba(139, 58, 46, 0.035)"
                        : "transparent",
                    }}
                  >
                    <td style={{ ...tdStyle, ...idTdStyle }}>{e.id}</td>
                    <td style={tdStyle}>
                      <div
                        style={{
                          color: e.highlight ? tokens.accent : tokens.ink,
                          fontWeight: 500,
                          fontSize: 14,
                          fontFamily: fonts.serif,
                        }}
                      >
                        {e.name}
                        {e.ideaTag && (
                          <span
                            style={{
                              marginLeft: 8,
                              fontFamily: fonts.mono,
                              fontSize: 9.5,
                              letterSpacing: "0.1em",
                              padding: "2px 6px",
                              background: "rgba(139,58,46,0.08)",
                              color: tokens.accent,
                              borderRadius: 2,
                            }}
                          >
                            IDEA {e.ideaTag}
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          color: tokens.muted,
                          fontSize: 12,
                          marginTop: 2,
                          fontFamily: fonts.serif,
                        }}
                      >
                        {e.sub}
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <MomentChip moment={e.moment} />
                    </td>
                    <td style={tdStyle}>
                      <TypeChip type={e.type} />
                    </td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          fontFamily: fonts.mono,
                          fontSize: 10,
                          fontWeight: 500,
                          letterSpacing: "0.08em",
                          padding: "2px 8px",
                          borderRadius: 2,
                          background: tokens.paper,
                          color: tokens.inkSoft,
                          border: `1px solid ${tokens.rule}`,
                        }}
                      >
                        {e.size}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <div
                        style={{
                          fontFamily: fonts.mono,
                          fontSize: 13,
                          fontWeight: 500,
                          color: tokens.ink,
                        }}
                      >
                        {e.rice}
                      </div>
                      <div
                        style={{
                          fontFamily: fonts.mono,
                          fontSize: 10,
                          color: tokens.muted,
                          marginTop: 3,
                        }}
                      >
                        {e.breakdown}
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          fontFamily: fonts.mono,
                          fontSize: 10.5,
                          color: tokens.gold,
                        }}
                      >
                        {e.metric}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </LayoutGroup>
        </table>
      </div>

      <div
        className="mt-5 pt-4"
        style={{
          borderTop: `1px dashed ${tokens.rule}`,
          fontFamily: fonts.mono,
          fontSize: 10.5,
          color: tokens.muted,
          letterSpacing: "0.05em",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: tokens.inkSoft, fontWeight: 500 }}>RICE —</strong>{" "}
        Reach (1–10, weekly users touched) · Impact (0.25 / 0.5 / 1 / 2 / 3) ·
        Confidence (0–1) ÷ Effort (person-months).{" "}
        <strong style={{ color: tokens.inkSoft, fontWeight: 500 }}>Size —</strong>{" "}
        XS ≈ hours · S ≈ days · M ≈ a week · L ≈ two-plus weeks · XL ≈ quarter.
        Numbers are directional, calibrated together — not precise.
      </div>
    </>
  );
}

const thStyle: React.CSSProperties = {
  fontFamily: fonts.mono,
  fontSize: 9.5,
  fontWeight: 500,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: tokens.muted,
  textAlign: "left",
  padding: "10px 12px 10px 0",
  borderBottom: `1px solid ${tokens.ink}`,
};

const tdStyle: React.CSSProperties = {
  padding: "14px 12px 14px 0",
  borderBottom: `1px solid ${tokens.rule}`,
  verticalAlign: "top",
  lineHeight: 1.4,
  color: tokens.inkSoft,
};

const idTdStyle: React.CSSProperties = {
  fontFamily: fonts.mono,
  fontSize: 10.5,
  color: tokens.muted,
  whiteSpace: "nowrap",
  paddingRight: 20,
};

function Th({
  k,
  label,
  sortKey,
  sortDir,
  onSort,
}: {
  k: SortKey;
  label: string;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (k: SortKey) => void;
}) {
  const active = sortKey === k;
  return (
    <th style={thStyle} className="text-left">
      <button
        onClick={() => onSort(k)}
        style={{
          all: "unset",
          cursor: "pointer",
          color: active ? tokens.accent : tokens.muted,
          fontFamily: fonts.mono,
          fontSize: 9.5,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        {label}
        {active && (sortDir === "asc" ? " ↑" : " ↓")}
      </button>
    </th>
  );
}

function MomentChip({ moment }: { moment: Moment }) {
  const styles: Record<Moment, { bg: string; color: string; border: string }> = {
    setup: {
      bg: "rgba(138, 132, 123, 0.15)",
      color: tokens.inkSoft,
      border: tokens.rule,
    },
    aha: {
      bg: "rgba(139, 58, 46, 0.1)",
      color: tokens.accent,
      border: "rgba(139, 58, 46, 0.25)",
    },
    habit: {
      bg: "rgba(160, 122, 45, 0.1)",
      color: tokens.gold,
      border: "rgba(160, 122, 45, 0.3)",
    },
  };
  const s = styles[moment];
  return (
    <span
      className="inline-block"
      style={{
        fontFamily: fonts.mono,
        fontSize: 9.5,
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "3px 8px",
        borderRadius: 2,
        whiteSpace: "nowrap",
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
      }}
    >
      {moment}
    </span>
  );
}

function TypeChip({ type }: { type: ExType }) {
  const isT1 = type === "t1";
  return (
    <span
      className="inline-block"
      style={{
        fontFamily: fonts.mono,
        fontSize: 9.5,
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "3px 8px",
        borderRadius: 2,
        whiteSpace: "nowrap",
        background: isT1 ? "rgba(139, 58, 46, 0.12)" : "rgba(90, 107, 82, 0.12)",
        color: isT1 ? tokens.accent : tokens.sage,
        border: `1px solid ${isT1 ? "rgba(139, 58, 46, 0.3)" : "rgba(90, 107, 82, 0.3)"}`,
      }}
    >
      {isT1 ? "Type 1" : "Type 2"}
    </span>
  );
}

function MetricBox({
  label,
  value,
  highlight,
  tone,
  background,
  onClick,
}: {
  label: string;
  value: string;
  highlight: boolean;
  tone: string;
  background?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className="text-left"
      style={{
        all: "unset",
        padding: background ? "8px 12px" : 0,
        margin: background ? "-8px -12px" : 0,
        background: highlight
          ? "rgba(139,58,46,0.08)"
          : background ?? "transparent",
        cursor: onClick ? "pointer" : "default",
        outline: highlight ? `1px solid ${tokens.accent}` : "none",
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 9.5,
          letterSpacing: "0.12em",
          color: tone,
          textTransform: "uppercase",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 12.5,
          color: tokens.ink,
          lineHeight: 1.4,
          fontWeight: 500,
        }}
      >
        {value}
      </div>
    </button>
  );
}

function FilterPill({
  label,
  active,
  onClick,
  accent,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  accent?: string;
}) {
  const color = accent ?? tokens.ink;
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: fonts.mono,
        fontSize: 10,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "4px 10px",
        background: active ? color : "transparent",
        color: active ? tokens.bg : color,
        border: `1px solid ${color}`,
        borderRadius: 2,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
