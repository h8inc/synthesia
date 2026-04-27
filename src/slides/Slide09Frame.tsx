import { tokens, fonts } from "../lib/tokens";
import { SlideHeader } from "../components/SlideShell";

type Principle = {
  num: string;
  headline: React.ReactNode;
  body: string;
};

const principles: Principle[] = [
  {
    num: "01",
    headline: (
      <>
        Hold the <em style={{ color: tokens.accent, fontStyle: "italic" }}>big
        decision</em> open while you ship.
      </>
    ),
    body: 'The homepage reversal is Type 1 — don\'t commit until the Type 2 bets give you signal. But don\'t pause either. "Decide" and "learn" run in parallel, not in series.',
  },
  {
    num: "02",
    headline: (
      <>
        Ship against a{" "}
        <em style={{ color: tokens.accent, fontStyle: "italic" }}>moment</em>, not a
        screen.
      </>
    ),
    body: "Each Type 2 experiment is tagged to Setup, Aha, or Habit. If a bet doesn't move a moment's survival rate, we kill it in two weeks. The goal isn't screens shipped — it's psych level improving at the handoff between moments.",
  },
  {
    num: "03",
    headline: (
      <>
        Let the{" "}
        <em style={{ color: tokens.accent, fontStyle: "italic" }}>data</em> close the
        Type 1.
      </>
    ),
    body: "By the time E10 ships, E1–E9 and E11 have de-risked the biggest assumptions behind it. The launch becomes an unsurprising rollout of a decision the data already made — not a bet the team is defending.",
  },
];

export default function Slide09Frame({
  slideNum = 9,
  totalSlides = 11,
}: {
  slideNum?: number;
  totalSlides?: number;
} = {}) {
  return (
    <>
      <SlideHeader
        eyebrow="How I'd run it"
        meta="The principle, stated plainly"
        num={slideNum}
        total={totalSlides}
      />

      <h2
        style={{
          fontFamily: fonts.serif,
          fontSize: "clamp(28px, 3.2vw, 42px)",
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: tokens.ink,
          marginBottom: 32,
        }}
      >
        One{" "}
        <em style={{ color: tokens.accent, fontStyle: "italic" }}>Type 1 call</em>,
        held open.
        <br />
        Nine <em style={{ color: tokens.accent, fontStyle: "italic" }}>Type 2
        bets</em>, running underneath it.
      </h2>

      <div
        className="grid gap-8"
        style={{ gridTemplateColumns: "1fr 1fr 1fr", marginTop: 16 }}
      >
        {principles.map((p) => (
          <div
            key={p.num}
            style={{
              padding: "24px 0",
              borderTop: `2px solid ${tokens.ink}`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 10.5,
                letterSpacing: "0.12em",
                color: tokens.muted,
                marginBottom: 16,
              }}
            >
              {p.num}
            </div>
            <h3
              className="mb-3"
              style={{
                fontFamily: fonts.serif,
                fontSize: 24,
                fontWeight: 300,
                letterSpacing: "-0.015em",
                textTransform: "none",
                color: tokens.ink,
                lineHeight: 1.15,
              }}
            >
              {p.headline}
            </h3>
            <p
              style={{
                fontFamily: fonts.serif,
                fontSize: 14.5,
                lineHeight: 1.55,
                color: tokens.inkSoft,
              }}
            >
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
