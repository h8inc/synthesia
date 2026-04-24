import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { tokens, fonts } from "../lib/tokens";
import { SlideHeader } from "../components/SlideShell";
import {
  ProtoSide,
  ProtoSection,
  ProtoBullets,
  IdeaMetric,
} from "../components/ProtoSide";

const PROTO_URL = "https://designs.magicpath.ai/v1/safely-light-7682";

type Props = {
  overlayOpen: boolean;
  setOverlayOpen: (v: boolean) => void;
};

export default function Slide06HomepagePrompt({
  overlayOpen,
  setOverlayOpen,
}: Props) {
  const [overlayLoaded, setOverlayLoaded] = useState(false);

  useEffect(() => {
    if (!overlayOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOverlayOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlayOpen, setOverlayOpen]);

  useEffect(() => {
    if (overlayOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  return (
    <>
      <SlideHeader
        eyebrow="Idea 03"
        meta="Move video creation to the marketing homepage — the Type 1 bet"
        num={6}
        total={11}
      />

      <div
        className="grid gap-7 flex-1 min-h-0"
        style={{ gridTemplateColumns: "1.5fr 1fr" }}
      >
        {/* iframe */}
        <div
          className="flex flex-col overflow-hidden relative"
          style={{
            border: `1px solid ${tokens.rule}`,
            background: tokens.paper,
            borderRadius: 4,
          }}
        >
          <div
            className="flex items-center gap-[10px]"
            style={{
              padding: "8px 14px",
              borderBottom: `1px solid ${tokens.rule}`,
              background: tokens.bg,
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.08em",
              color: tokens.muted,
            }}
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="rounded-full"
                  style={{ width: 8, height: 8, background: tokens.rule }}
                />
              ))}
            </div>
            <span className="ml-2">
              designs.magicpath.ai — proposed homepage · live prototype
            </span>
            <button
              onClick={() => setOverlayOpen(true)}
              className="ml-auto"
              style={{
                background: "none",
                border: `1px solid ${tokens.rule}`,
                color: tokens.inkSoft,
                fontFamily: fonts.mono,
                fontSize: 9.5,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "3px 10px",
                borderRadius: 2,
                cursor: "pointer",
              }}
            >
              ⤢ Full screen
            </button>
          </div>
          <iframe
            src={PROTO_URL}
            title="Homepage prompt box prototype"
            allow="clipboard-write"
            loading="lazy"
            style={{
              flex: 1,
              width: "100%",
              border: 0,
              background: "#fff",
            }}
          />
        </div>

        {/* reasoning */}
        <ProtoSide>
          <ProtoSection title="Opportunity">
            If Ideas 01 and 02 work inside the app, pushing the prompt box upstream
            to the marketing homepage is the logical next step. Aha arrives before
            signup, not after.
          </ProtoSection>
          <ProtoSection title="Why this is Type 1">
            <ProtoBullets
              items={[
                <>
                  Pre-signup{" "}
                  <strong style={{ color: tokens.ink, fontWeight: 500 }}>
                    compute cost
                  </strong>{" "}
                  is real — we can't burn renders on every visitor
                </>,
                "Enterprise vs SME traffic needs different routing",
                "One-way door on homepage architecture",
              ]}
            />
          </ProtoSection>
          <ProtoSection title="How we'd ship v1">
            <ProtoBullets
              items={[
                "Route by IP enrichment — enterprise gets render, SME gets signup-first",
                "Compute cap per IP per day (number TBD with Brian)",
                "Length-capped at 30–60s pre-signup",
              ]}
            />
          </ProtoSection>

          <div
            className="mt-1"
            style={{
              border: `1px dashed ${tokens.accent}`,
              padding: "10px 14px",
              background: "rgba(139,58,46,0.03)",
            }}
          >
            <h6
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: tokens.accent,
                marginBottom: 4,
                fontWeight: 500,
              }}
            >
              The open questions are on the next slide
            </h6>
            <p
              style={{
                fontSize: 12,
                fontStyle: "italic",
                color: tokens.inkSoft,
                fontFamily: fonts.serif,
              }}
            >
              Unit economics · enrichment coverage · the compute-vs-conversion
              break-even.
            </p>
          </div>

          <IdeaMetric
            code="£/activated signup"
            primary={
              <>
                <strong style={{ color: tokens.ink, fontWeight: 500 }}>
                  Break-even test:
                </strong>{" "}
                cost of pre-signup compute per visitor, against conversion to
                activated free account. Must beat current free-trial CAC after
                factoring in pipeline protection.
              </>
            }
            counter="Counter-gate: enterprise demo-request rate must not drop (protects the sales motion)"
          />
        </ProtoSide>
      </div>

      {/* fullscreen overlay */}
      <AnimatePresence>
        {overlayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col"
            style={{ background: tokens.bg, zIndex: 2000 }}
          >
            <div
              className="flex items-center gap-[14px]"
              style={{
                padding: "14px 24px",
                borderBottom: `1px solid ${tokens.rule}`,
                background: tokens.paper,
                fontFamily: fonts.mono,
                fontSize: 11,
                letterSpacing: "0.08em",
                color: tokens.muted,
              }}
            >
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="rounded-full"
                    style={{ width: 8, height: 8, background: tokens.rule }}
                  />
                ))}
              </div>
              <span>
                designs.magicpath.ai — proposed homepage · live prototype
              </span>
              <button
                onClick={() => setOverlayOpen(false)}
                className="ml-auto"
                style={{
                  background: "none",
                  border: `1px solid ${tokens.accent}`,
                  color: tokens.accent,
                  fontFamily: fonts.mono,
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "5px 12px",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                ✕ Close · ESC
              </button>
            </div>
            <iframe
              src={overlayLoaded ? PROTO_URL : "about:blank"}
              onLoad={() => setOverlayLoaded(true)}
              title="Prototype full screen"
              allow="clipboard-write"
              style={{ flex: 1, width: "100%", border: 0, background: "#fff" }}
              ref={(el) => {
                if (el && !overlayLoaded) {
                  el.src = PROTO_URL;
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
