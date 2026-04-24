import { useState } from "react";
import { tokens, fonts, type Panel } from "../lib/tokens";
import { JourneyPanel } from "../components/journey";

const panels: Panel[] = [
  {
    num: "01",
    screen: {
      title: "synthesia.io",
      body: "AI video · Learn more · Watch demo",
      cta: { label: "Get started", tone: "primary" },
    },
    thought: "Finally, an AI video tool. Let me just click 'Get started'…",
    psych: { label: "Full tank · curious", filled: 5, tone: "gain" },
    tone: "neutral",
  },
  {
    num: "02",
    screen: {
      title: "Pricing · choose a plan",
      body: "4 tiers · 38% off · Starter / Creator / Enterprise",
      bars: 2,
    },
    thought: "Wait — pricing already? I haven't seen the product yet.",
    psych: { label: "−2 · cautious", filled: 3, tone: "drain" },
    tone: "drained",
  },
  {
    num: "03",
    screen: {
      title: "About you · 9 questions",
      body: "Dept · Job title · Company · Website · Size · How you heard…",
      bars: 3,
    },
    thought: "Why do they need all this just to try a thing?",
    psych: { label: "−5 · frustrated", filled: 1, tone: "drain" },
    tone: "drained",
  },
  {
    num: "04",
    screen: {
      title: "Invite your team",
      body: "Add colleagues to your workspace…",
      bars: 1,
    },
    thought: "Invite them to what? I haven't made anything.",
    psych: { label: "−7 · disengaging", filled: 0, tone: "drain" },
    tone: "drained",
  },
  {
    num: "05",
    screen: {
      title: "What's your video about?",
      body: "Type your prompt here…",
      cta: { label: "Generate", tone: "dead" },
    },
    thought: "I click Generate… and nothing happens.",
    psych: { label: "Aha missed · empty tank", filled: 0, tone: "ahaMiss" },
    tone: "aha",
  },
];

export default function Slide01Journey() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex flex-col justify-between h-full">
      {/* cover top */}
      <div className="flex justify-between items-start">
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 10.5,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: tokens.muted,
            lineHeight: 1.6,
          }}
        >
          Synthesia · Growth Take-Home
          <br />
          Damian · Liam · Brian · Josh
        </div>
        <div
          className="text-right"
          style={{
            fontFamily: fonts.mono,
            fontSize: 10.5,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: tokens.muted,
            lineHeight: 1.6,
          }}
        >
          Nasko Terziev
          <br />
          April 2026
        </div>
      </div>

      {/* big headline */}
      <div className="mt-6">
        <div
          className="mb-[14px]"
          style={{
            fontFamily: fonts.mono,
            fontSize: 10.5,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: tokens.accent,
          }}
        >
          A signup, watched in five panels
        </div>
        <h1
          style={{
            fontFamily: fonts.serif,
            fontSize: "clamp(40px, 5.5vw, 72px)",
            fontWeight: 300,
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            color: tokens.ink,
          }}
        >
          It takes{" "}
          <em style={{ color: tokens.accent, fontWeight: 400, fontStyle: "italic" }}>
            eleven steps
          </em>
          <br />
          to meet the moment
          <br />
          that should come{" "}
          <em style={{ color: tokens.accent, fontWeight: 400, fontStyle: "italic" }}>
            first.
          </em>
        </h1>
      </div>

      {/* panels */}
      <div
        className="grid gap-[14px] mt-7"
        style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
      >
        {panels.map((p, i) => (
          <JourneyPanel
            key={i}
            panel={p}
            index={i}
            isActive={hovered === i}
            onHover={setHovered}
          />
        ))}
      </div>

      {/* cover footer */}
      <div
        className="flex justify-between items-end mt-7 pt-[14px]"
        style={{
          borderTop: `1px solid ${tokens.rule}`,
          fontFamily: fonts.mono,
          fontSize: 10.5,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: tokens.muted,
        }}
      >
        <span>
          Journey · Depletion · Activation Map · Ideas · Prototype · Questions · Pipeline · Frame · Close
        </span>
        <span>← → to advance</span>
      </div>
    </div>
  );
}
