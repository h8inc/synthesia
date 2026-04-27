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
  { type: "workspace" as const, name: "Workspace", tier: "FREE" },
  { type: "cta" as const, label: "⚡ Power up your videos" },
  { type: "item" as const, item: { icon: "⌂", label: "Home" } },
  { type: "label" as const, label: "Videos" },
  { type: "item" as const, item: { icon: "▶", label: "Videos", active: true } },
  { type: "item" as const, item: { icon: "🗑", label: "Trash" } },
];

type VideoRow = {
  id: string;
  title: string;
  sub: string;
  thumbGradient: string;
  duration: string;
};

const videos: VideoRow[] = [
  {
    id: "v1",
    title: "Overcoming Video Bottlenecks in Sales",
    sub: "Just created · Version 1",
    thumbGradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    duration: "00:50",
  },
  {
    id: "v2",
    title: "Q2 Team Update — North America",
    sub: "2 days ago · 4 shares · 12 views",
    thumbGradient: "linear-gradient(135deg, #10b981, #059669)",
    duration: "01:24",
  },
];

export default function Slide05ShareCta({
  slideNum = 5,
  totalSlides = 11,
}: {
  slideNum?: number;
  totalSlides?: number;
} = {}) {
  const [showCurrent, setShowCurrent] = useState(false);

  return (
    <>
      <SlideHeader
        eyebrow="Idea 02"
        meta="Surface Share — the Habit CTA currently buried in a right-click menu"
        num={slideNum}
        total={totalSlides}
      />

      <div
        className="grid gap-7 flex-1 min-h-0"
        style={{ gridTemplateColumns: "1.3fr 1fr" }}
      >
        <SynthMockup url="app.synthesia.io/videos — proposed" sidebar={sidebar}>
          <div
            className="mb-[10px]"
            style={{
              fontFamily: fonts.ui,
              fontSize: 13,
              fontWeight: 600,
              color: "#111827",
            }}
          >
            My recents
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={showCurrent ? "current" : "proposed"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {videos.map((v, i) => (
                <VideoRowItem
                  key={v.id}
                  video={v}
                  currentState={showCurrent}
                  dim={i > 0}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          <div
            className="mt-[14px]"
            style={{
              padding: "12px 14px",
              background: "#fef3c7",
              borderLeft: "3px solid #f59e0b",
              fontSize: 11,
              color: "#78350f",
              borderRadius: 4,
              lineHeight: 1.5,
            }}
          >
            <strong style={{ fontWeight: 600 }}>Current state:</strong> Share is
            item #4 in a right-click menu alongside Download, Duplicate, Translate,
            Save as template, Analytics, Remove. If sharing is the Habit metric, it
            has to be the hero CTA — not a buried menu item.
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => setShowCurrent((v) => !v)}
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "5px 11px",
                background: showCurrent ? tokens.accent : "transparent",
                color: showCurrent ? tokens.bg : tokens.accent,
                border: `1px solid ${tokens.accent}`,
                cursor: "pointer",
              }}
            >
              {showCurrent ? "← Proposed (Share as hero)" : "Show current (Share hidden) →"}
            </button>
          </div>
        </SynthMockup>

        <ProtoSide>
          <ProtoSection title="Opportunity">
            Sharing is the Habit moment. It's also where the distribution loop
            closes. Right now it lives at #4 in a right-click menu, next to
            "Remove".
          </ProtoSection>
          <ProtoSection title="What I noticed">
            <ProtoBullets
              items={[
                "Share is hidden in the context menu alongside destructive actions",
                <>
                  Loom's video <em>is</em> the invitation — Synthesia's isn't yet
                </>,
                "Do shared videos drive signups we're under-attributing?",
              ]}
            />
          </ProtoSection>
          <ProtoSection title="Proposal">
            <ProtoBullets
              items={[
                "Surface Share as a primary CTA on every video row",
                "UTM-tag every shared link at the source",
                "Show share count + recipient signups on the video row itself",
              ]}
            />
          </ProtoSection>
          <ProtoSection title="Expected impact">
            <p>
              <strong style={{ color: tokens.ink, fontWeight: 500 }}>Primary:</strong>{" "}
              share rate per video.{" "}
              <strong style={{ color: tokens.ink, fontWeight: 500 }}>Secondary:</strong>{" "}
              shared-video-to-signup rate (the network loop), which reframes
              retention as a cohort metric.
            </p>
          </ProtoSection>
          <ProtoSection title="Test">
            <p>
              Ship and measure. No A/B needed for a no-regrets UX fix. If share rate
              moves, we've proven the distribution loop was choked by
              discoverability, not willingness.
            </p>
          </ProtoSection>
          <IdeaMetric
            code="1s→1v7d"
            primary={
              <>
                <strong style={{ color: tokens.ink, fontWeight: 500 }}>
                  Shared-video-to-signup rate:
                </strong>{" "}
                for every N shared videos, how many recipients create an account and
                their own first video within 7 days.
              </>
            }
            counter="Pre-req: UTM attribution on every shared link, tagged at the source"
          />
        </ProtoSide>
      </div>
    </>
  );
}

function VideoRowItem({
  video,
  currentState,
  dim,
}: {
  video: VideoRow;
  currentState: boolean;
  dim?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-3 mb-2"
      style={{
        padding: 10,
        border: "1px solid #e5e7eb",
        borderRadius: 6,
        background: "#fff",
        opacity: dim ? 0.7 : 1,
        fontFamily: fonts.ui,
      }}
    >
      <div
        className="relative flex-shrink-0 flex items-center justify-center"
        style={{
          width: 100,
          height: 60,
          background: video.thumbGradient,
          borderRadius: 4,
          color: "#fff",
          fontSize: 10,
          fontWeight: 500,
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "10px solid #fff",
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
            opacity: 0.9,
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: 4,
            left: 4,
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            fontSize: 8,
            padding: "1px 4px",
            borderRadius: 2,
          }}
        >
          {video.duration}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#111827",
            marginBottom: 2,
          }}
        >
          {video.title}
        </div>
        <div style={{ fontSize: 10, color: "#6b7280", lineHeight: 1.4 }}>
          {video.sub}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentState ? (
          <motion.div
            key="current"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="inline-flex items-center justify-center"
            style={{
              width: 28,
              height: 28,
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              color: "#6b7280",
              fontSize: 14,
              background: "#fff",
              fontFamily: fonts.ui,
            }}
            title="Right-click menu ‣ Share (buried)"
          >
            ⋯
          </motion.div>
        ) : (
          <motion.div
            key="proposed"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="relative inline-flex items-center gap-[6px]"
            style={{
              background: "#4f46e5",
              color: "#fff",
              padding: "8px 14px",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 500,
              fontFamily: fonts.ui,
            }}
          >
            {!dim && <PulseRing />}
            <span style={{ fontSize: 11 }}>↗</span>
            Share
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 ml-[10px]">
        <SecondaryBtn>⤓</SecondaryBtn>
        <SecondaryBtn>⋯</SecondaryBtn>
      </div>
    </div>
  );
}

function SecondaryBtn({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center justify-center"
      style={{
        width: 28,
        height: 28,
        border: "1px solid #e5e7eb",
        borderRadius: 6,
        color: "#6b7280",
        fontSize: 14,
        background: "#fff",
      }}
    >
      {children}
    </div>
  );
}

function PulseRing() {
  return (
    <motion.span
      className="absolute"
      style={{
        inset: -6,
        border: `2px solid ${tokens.accent}`,
        borderRadius: 10,
        pointerEvents: "none",
      }}
      initial={{ opacity: 0.5, scale: 1 }}
      animate={{ opacity: [0.5, 0.2, 0.5], scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
}
