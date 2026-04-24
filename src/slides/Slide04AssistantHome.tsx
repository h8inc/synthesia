import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { tokens, fonts } from "../lib/tokens";
import { SlideHeader } from "../components/SlideShell";
import { SynthMockup } from "../components/SynthMockup";
import {
  ProtoSide,
  ProtoSection,
  ProtoBullets,
  IdeaMetric,
} from "../components/ProtoSide";

const sidebar = [
  { type: "workspace" as const, name: "Workspace" },
  { type: "item" as const, item: { icon: "⌂", label: "Home", active: true } },
  { type: "label" as const, label: "Videos" },
  { type: "item" as const, item: { icon: "▶", label: "Videos" } },
  { type: "item" as const, item: { icon: "🗑", label: "Trash" } },
  { type: "label" as const, label: "Tools" },
  { type: "item" as const, item: { icon: "🎙", label: "Dubbing" } },
  { type: "item" as const, item: { icon: "◐", label: "Personalization" } },
  { type: "item" as const, item: { icon: "✦", label: "AI Playground" } },
  { type: "label" as const, label: "Assets" },
  { type: "item" as const, item: { icon: "📚", label: "Library" } },
  { type: "item" as const, item: { icon: "🎨", label: "Brand Kits" } },
  { type: "item" as const, item: { icon: "⚙", label: "Avatars" } },
  { type: "item" as const, item: { icon: "🎤", label: "Voices" } },
];

const examplePrompts = [
  "Convert this webinar into a structured training video",
  "Train employees to recognize email phishing scams",
  "Turn product release notes into customer training",
  "Explain how we protect enterprise customer data",
  "Explain how to handle sensitive customer data",
  "Convert compliance policy into engaging employee training",
];

const shuffleSets = [
  examplePrompts,
  [
    "Summarize last week's all-hands into a 2-min recap",
    "Walk a new hire through our security practices",
    "Turn a blog post into a short product explainer",
    "Introduce a new feature to existing customers",
    "Explain our refund policy in under 90 seconds",
    "Open a sales pitch with a personalized intro",
  ],
];

export default function Slide04AssistantHome() {
  const [shuffleIdx, setShuffleIdx] = useState(0);
  const [prompt, setPrompt] = useState("");

  const prompts = shuffleSets[shuffleIdx % shuffleSets.length];

  return (
    <>
      <SlideHeader
        eyebrow="Idea 01"
        meta="Promote the Assistant to the in-app home — collapse the templates"
        num={4}
        total={11}
      />

      <div
        className="grid gap-7 flex-1 min-h-0"
        style={{ gridTemplateColumns: "1.3fr 1fr" }}
      >
        {/* mockup */}
        <SynthMockup url="app.synthesia.io/home — proposed" sidebar={sidebar}>
          <div
            className="flex items-center justify-between"
            style={{ padding: "4px 0 18px" }}
          >
            <div
              className="inline-flex items-center justify-center"
              style={{
                width: 26,
                height: 26,
                border: "1px solid #e5e7eb",
                borderRadius: 6,
                color: "#6b7280",
                fontSize: 13,
                background: "#fff",
              }}
            >
              ‹
            </div>
            <div
              className="inline-flex items-center justify-center"
              style={{
                width: 26,
                height: 26,
                borderRadius: 6,
                color: "#9ca3af",
                fontSize: 14,
                background: "transparent",
              }}
            >
              ✕
            </div>
          </div>

          <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 0" }}>
            <div
              style={{
                fontSize: 11,
                color: "#ec4899",
                fontWeight: 500,
                marginBottom: 6,
              }}
            >
              Your prompt
            </div>
            <div
              style={{
                fontFamily: fonts.ui,
                fontSize: 17,
                fontWeight: 600,
                color: "#111827",
                marginBottom: 14,
                letterSpacing: "-0.01em",
              }}
            >
              What's your video about?
            </div>

            {/* interactive prompt field */}
            <div
              style={{
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                padding: "14px 16px",
                marginBottom: 18,
              }}
            >
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your prompt here…"
                rows={2}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontFamily: fonts.ui,
                  fontSize: 11.5,
                  color: "#111827",
                  resize: "none",
                  minHeight: 52,
                  lineHeight: 1.5,
                  paddingBottom: 10,
                }}
              />
              <div
                className="flex items-center gap-[6px]"
                style={{
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: 10,
                  marginTop: 4,
                }}
              >
                <Chip>📎 Attach</Chip>
                <span style={{ color: "#d1d5db" }}>|</span>
                <Chip>⏱ 2 min ⌄</Chip>
              </div>
            </div>

            <div className="flex items-center justify-between mb-[10px]">
              <span
                className="inline-flex items-center gap-[6px]"
                style={{ fontSize: 11, fontWeight: 500, color: "#111827" }}
              >
                <span style={{ color: "#ec4899", fontSize: 12 }}>✦</span>
                Example prompts
              </span>
              <button
                onClick={() => setShuffleIdx((i) => i + 1)}
                className="inline-flex items-center gap-[5px]"
                style={{
                  fontSize: 10.5,
                  color: "#374151",
                  fontWeight: 500,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ⇄ Shuffle
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={shuffleIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="grid gap-2"
                style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
              >
                {prompts.map((text, i) => {
                  const highlighted = i === 0;
                  return (
                    <button
                      key={i}
                      onClick={() => setPrompt(text)}
                      className="text-left flex items-start justify-between gap-2"
                      style={{
                        border: highlighted
                          ? "1px solid #c7d2fe"
                          : "1px solid #e5e7eb",
                        background: highlighted ? "#eef2ff" : "#fff",
                        borderRadius: 8,
                        padding: "10px 12px",
                        fontSize: 10.5,
                        color: "#111827",
                        lineHeight: 1.4,
                        minHeight: 50,
                        cursor: "pointer",
                        fontFamily: fonts.ui,
                      }}
                    >
                      <span style={{ flex: 1 }}>{text}</span>
                      <span
                        className="inline-flex items-center justify-center flex-shrink-0"
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 4,
                          color: "#9ca3af",
                          fontSize: 12,
                        }}
                      >
                        +
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <div
              className="mt-[14px]"
              style={{
                padding: "10px 14px",
                background: "#fef3c7",
                borderLeft: "3px solid #f59e0b",
                fontSize: 11,
                color: "#78350f",
                borderRadius: 4,
                lineHeight: 1.5,
              }}
            >
              <strong style={{ fontWeight: 600 }}>The change:</strong> this screen
              currently sits behind "Start with Assistant BETA" — a secondary tile on
              a templates-led home. Promote it to the default. Templates stay, one
              click away.
            </div>
          </div>
        </SynthMockup>

        {/* reasoning */}
        <ProtoSide>
          <ProtoSection title="Opportunity">
            The Assistant beta already works. The in-app home still leads with
            templates — decision fatigue at the exact moment a user is primed to
            create.
          </ProtoSection>
          <ProtoSection title="What I noticed">
            <ProtoBullets
              items={[
                "Templates currently dominate the in-app home",
                'Assistant is hidden behind "Start with Assistant BETA"',
                "The prompt tells us use case, tone and audience before we have to ask",
              ]}
            />
          </ProtoSection>
          <ProtoSection title="Proposal">
            <ProtoBullets
              items={[
                "Promote the Assistant to the default home",
                "Keep templates one click away — demoted, not deleted",
                "Curated example prompts reduce decision fatigue further",
              ]}
            />
          </ProtoSection>
          <ProtoSection title="Expected impact">
            <p>
              <strong style={{ color: tokens.ink, fontWeight: 500 }}>Primary:</strong>{" "}
              video-creation rate per weekly active.{" "}
              <strong style={{ color: tokens.ink, fontWeight: 500 }}>Secondary:</strong>{" "}
              time-to-first-video; template-dependence as a drop-off predictor.
            </p>
          </ProtoSection>
          <ProtoSection title="Test">
            <p>
              50/50 A/B on app home. If prompt-first lifts creation rate at zero new
              compute, we have the signal to ship Idea 03 on the marketing homepage.
            </p>
          </ProtoSection>
          <IdeaMetric
            code="Δ creation rate"
            primary={
              <>
                <strong style={{ color: tokens.ink, fontWeight: 500 }}>
                  Prompt-first vs templates-first:
                </strong>{" "}
                weekly-active users who create ≥ 1 video within 7 days, compared
                across arms.
              </>
            }
            counter="Counter: template-usage rate (shouldn't crash — templates still work for the users who want them)"
          />
        </ProtoSide>
      </div>
    </>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-[4px]"
      style={{
        fontSize: 10.5,
        padding: "4px 10px",
        border: "1px solid #e5e7eb",
        borderRadius: 6,
        color: "#374151",
        background: "#fff",
        fontFamily: fonts.ui,
      }}
    >
      {children}
    </span>
  );
}
