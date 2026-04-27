import { tokens, fonts } from "../lib/tokens";
import { SlideHeader } from "../components/SlideShell";

export default function Slide10Close({
  slideNum = 10,
  totalSlides = 11,
}: {
  slideNum?: number;
  totalSlides?: number;
} = {}) {
  return (
    <>
      <SlideHeader
        eyebrow="Close"
        meta="What I'm arguing for"
        num={slideNum}
        total={totalSlides}
      />

      <div
        className="flex-1 flex items-center"
        style={{ paddingTop: 40 }}
      >
        <div style={{ maxWidth: 1000 }}>
          <h2
            className="mb-10"
            style={{
              fontFamily: fonts.serif,
              fontSize: "clamp(36px, 4.5vw, 58px)",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: tokens.ink,
            }}
          >
            Fix it from the{" "}
            <em style={{ color: tokens.accent, fontStyle: "italic" }}>
              inside out.
            </em>
          </h2>

          <p
            className="mb-8"
            style={{
              fontFamily: fonts.serif,
              fontSize: 16.5,
              lineHeight: 1.6,
              color: tokens.inkSoft,
              maxWidth: 820,
            }}
          >
            The journey is upside down — and the way we un-flip it is from the
            inside. Current funnel optimises for signups; the metrics that actually
            compound are share rate, video completion, signups from shared videos,
            and lifetime value flowing from those. Prove each link of the chain
            in-app first, where the data is free, then take the winning patterns
            upstream to the homepage.
          </p>

          <div
            className="grid gap-5 mb-7"
            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            <HorizonCard
              label="This sprint"
              title="Idea 02 — Share as primary"
              body="No-brainer. XS effort. Enables attribution on the distribution loop. No compute exposure."
            />
            <HorizonCard
              label="Next 30 days"
              title="Idea 01 — Assistant on app home"
              body="A/B vs templates. De-risks the interface half of Idea 03 at zero compute cost. Real signal from real users."
            />
            <HorizonCard
              label="Next quarter"
              title="Idea 03 — Homepage prompt box"
              body="The Type 1 bet. Only ship once Idea 01 proves the interface and we have unit-economics from Brian."
              accent
            />
          </div>

          <div
            className="px-6 py-5"
            style={{
              borderLeft: `3px solid ${tokens.accent}`,
              background: "rgba(139, 58, 46, 0.03)",
            }}
          >
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 17,
                fontStyle: "italic",
                color: tokens.ink,
                lineHeight: 1.4,
              }}
            >
              "Start inside the app because the data is free. Earn the homepage bet
              by arriving at it, not by assuming it."
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function HorizonCard({
  label,
  title,
  body,
  accent,
}: {
  label: string;
  title: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div
      className="px-6 py-5"
      style={{
        background: accent ? "rgba(139, 58, 46, 0.05)" : tokens.paper,
        border: accent
          ? "1px solid rgba(139, 58, 46, 0.25)"
          : `1px solid ${tokens.rule}`,
      }}
    >
      <div
        className="mb-2"
        style={{
          fontFamily: fonts.mono,
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: accent ? tokens.accent : tokens.muted,
        }}
      >
        {label}
      </div>
      <div
        className="mb-2"
        style={{
          fontFamily: fonts.serif,
          fontSize: 18,
          fontStyle: "italic",
          color: accent ? tokens.accent : tokens.ink,
          lineHeight: 1.3,
        }}
      >
        {title}
      </div>
      <p
        style={{
          fontFamily: fonts.serif,
          fontSize: 12.5,
          lineHeight: 1.5,
          color: tokens.inkSoft,
        }}
      >
        {body}
      </p>
    </div>
  );
}
