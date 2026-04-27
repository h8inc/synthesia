import type { ReactNode } from "react";
import { tokens, fonts } from "../lib/tokens";
import { SlideHeader } from "../components/SlideShell";

type QCard = {
  num: string;
  title: string;
  body: ReactNode;
  action: string;
};

const questions: QCard[] = [
  {
    num: "01 · Unit economics",
    title: "What's the cost of a pre-signup render in pounds?",
    body: "Everything downstream — rate limits, length caps, routing — flows from this one number. A 30-second render at £0.10 is a different product than at £1.00. I wouldn't guess.",
    action:
      "→ 30 minutes with Brian: cost per render at current infra, break-even conversion rate.",
  },
  {
    num: "02 · Enrichment coverage",
    title: "What % of homepage traffic can we actually enrich?",
    body: 'Clearbit Reveal hits maybe 30–40% of IPs. Personal-email signups miss entirely. My earlier "3 renders per IP for everyone" is probably wrong. Better v1: render for enterprise IPs, gate for SME.',
    action:
      "→ Pull analytics on current traffic: IP enrichment hit rate, email-domain split.",
  },
  {
    num: "03 · What the in-app bets teach us",
    title: "Does prompt-first beat templates in the first place?",
    body: (
      <>
        Idea 01 proves or disproves the interface half of Idea 03 at zero compute
        cost. If Assistant-on-app-home underperforms templates, we've learned
        something critical <em>before</em> spending money on homepage renders.
      </>
    ),
    action:
      "→ Ship Idea 01 as an A/B first. Let the data decide what we ship next.",
  },
  {
    num: "04 · Enterprise sales pipeline risk",
    title: "Does the demo path stay protected?",
    body: 'Damian\'s point about monetization — "Start for free" currently routes to pricing because it works for enterprise. Two-door routing by firmographic intent keeps the enterprise funnel intact while letting free-intent users see the product.',
    action:
      "→ Counter-metric gate: enterprise demo-request rate must not drop. Tracked from day one.",
  },
];

export default function Slide07OpenQuestions({
  slideNum = 7,
  totalSlides = 11,
  hideHeader = false,
}: {
  slideNum?: number;
  totalSlides?: number;
  hideHeader?: boolean;
} = {}) {
  return (
    <>
      {!hideHeader && (
        <SlideHeader
          eyebrow="Open questions"
          meta="What I'd need to know before committing to Idea 03"
          num={slideNum}
          total={totalSlides}
        />
      )}

      <h2
        style={{
          fontFamily: fonts.serif,
          fontSize: "clamp(28px, 3.2vw, 42px)",
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: tokens.ink,
          marginBottom: 20,
        }}
      >
        The Type 1 bet is real money.
        <br />
        Here's what I{" "}
        <em style={{ color: tokens.accent, fontStyle: "italic" }}>don't</em> know
        yet — and how I'd find out.
      </h2>

      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {questions.map((q) => (
          <QuestionCard key={q.num} q={q} />
        ))}
      </div>

      {/* Q5 — paywall observation */}
      <div
        className="mt-5 px-6 py-5"
        style={{
          background: "#fff",
          border: `1px solid ${tokens.rule}`,
          borderLeft: `3px solid ${tokens.gold}`,
        }}
      >
        <div
          className="grid gap-7 items-start"
          style={{ gridTemplateColumns: "1fr 1.4fr" }}
        >
          <div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: "0.14em",
                color: tokens.gold,
                textTransform: "uppercase",
              }}
            >
              05 · Observation · bigger conversation
            </div>
            <div
              className="mt-[10px] mb-[10px]"
              style={{
                fontFamily: fonts.serif,
                fontSize: 20,
                fontStyle: "italic",
                fontWeight: 400,
                color: tokens.ink,
                lineHeight: 1.2,
              }}
            >
              Where does the paywall model fit into this?
            </div>
            <p
              style={{
                fontFamily: fonts.serif,
                fontSize: 12.5,
                lineHeight: 1.5,
                color: tokens.ink,
                fontWeight: 500,
              }}
            >
              → Not a main idea for this brief — but worth a separate conversation.
            </p>
          </div>
          <div>
            <p
              className="mb-[10px]"
              style={{
                fontFamily: fonts.serif,
                fontSize: 13,
                lineHeight: 1.55,
                color: tokens.inkSoft,
              }}
            >
              I noticed by accident that you're running paywall A/Bs — I still have
              editor access on an older account, but my week-old signup locked me
              out after trial. Two different experiences on two email addresses.
              That's a cohort experiment on the monetisation surface itself.
            </p>
            <p
              style={{
                fontFamily: fonts.serif,
                fontSize: 13,
                lineHeight: 1.55,
                color: tokens.inkSoft,
              }}
            >
              At Tide we ran the same tests — premium-first, free-trial-with-countdown,
              and hybrids. The answer wasn't universal. Different cohorts converted
              on different models, and the winning pattern was segment-specific. If
              the reorder-of-operations changes which users reach the paywall and in
              what state, the paywall model probably needs re-testing against the
              new top-of-funnel too. That's the principal-level discussion I'd want
              to have.
            </p>
          </div>
        </div>
      </div>

      <div
        className="mt-5 px-4 py-3"
        style={{
          background: "rgba(139, 58, 46, 0.04)",
          borderLeft: `3px solid ${tokens.accent}`,
          fontFamily: fonts.serif,
          fontSize: 13,
          fontStyle: "italic",
          color: tokens.ink,
          lineHeight: 1.5,
        }}
      >
        <strong
          style={{ color: tokens.accent, fontStyle: "normal", fontWeight: 500 }}
        >
          The honest v1 —
        </strong>{" "}
        I wouldn't ship Idea 03 to 100% of traffic in week one. I'd ship Idea 01
        (in-app Assistant) first, Idea 02 (Share) this sprint because it's a
        no-brainer, and use the signal from both to shape what Idea 03 should
        actually look like. Ship to learn, not to prove.
      </div>
    </>
  );
}

function QuestionCard({ q }: { q: QCard }) {
  return (
    <div
      className="px-6 py-5"
      style={{
        background: "#fff",
        border: `1px solid ${tokens.rule}`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: "0.14em",
          color: tokens.accent,
          marginBottom: 10,
          textTransform: "uppercase",
        }}
      >
        {q.num}
      </div>
      <div
        className="mb-[14px]"
        style={{
          fontFamily: fonts.serif,
          fontSize: 20,
          fontStyle: "italic",
          fontWeight: 400,
          color: tokens.ink,
          lineHeight: 1.2,
        }}
      >
        {q.title}
      </div>
      <p
        className="mb-[10px]"
        style={{
          fontFamily: fonts.serif,
          fontSize: 13.5,
          lineHeight: 1.55,
          color: tokens.inkSoft,
        }}
      >
        {q.body}
      </p>
      <p
        style={{
          fontFamily: fonts.serif,
          fontSize: 12.5,
          lineHeight: 1.5,
          color: tokens.ink,
          fontWeight: 500,
        }}
      >
        {q.action}
      </p>
    </div>
  );
}
