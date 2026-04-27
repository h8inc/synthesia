import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { tokens, fonts } from "../lib/tokens";
import { SlideHeader } from "../components/SlideShell";

const SYNTH_BLUE = "#4f46e5";

const bubbleLines = [
  "Walk these new specs through to engineering.",
  "90-second sprint update for the team.",
  "Explain this architecture decision once.",
];

type Persona = {
  pair: string;
  uc: string;
  replaces: string;
  stitch: string;
  measuredBy: string;
};

const PERSONAS: Persona[] = [
  {
    pair: "DESIGNER → ENG",
    uc: "Walk these specs through",
    replaces: "Loom, Slack walls of text",
    stitch: "Recorder + Voice clone",
    measuredBy: "Eng time saved per spec",
  },
  {
    pair: "PM → TEAM",
    uc: "90-second sprint update",
    replaces: "Slack huddles, all-hands, PowerPoint",
    stitch: "Chat + Avatar + Voice",
    measuredBy: "Meeting hours displaced",
  },
  {
    pair: "ENG → ENG",
    uc: "Architecture decision, once",
    replaces: "Repeated 1:1s, Confluence pages",
    stitch: "Recorder + AI cut",
    measuredBy: "Engineer hours recovered",
  },
  {
    pair: "SALES → BUYER",
    uc: "1 record → N personalised sends",
    replaces: "Vidyard, Sendspark, Salesloft video",
    stitch: "Chat + Avatar + API + Voice clone",
    measuredBy: "Reply rate / pipeline",
  },
  {
    pair: "SUPPORT → USER",
    uc: "Personalised reply video",
    replaces: "Zendesk text macros, screen-share",
    stitch: "Recorder + Chat + Avatar",
    measuredBy: "TBD — likely time-to-resolution",
  },
];

const DOCK_WIDTH = 640;
const DOCK_HEIGHT = 78;
const AVATAR_SIZE = 64;
const WALK_PADDING = 18;
const WALK_DURATION = 7; // seconds to cross the dock in one direction
const TURN_DURATION = 0.6; // pause/turn beat at each border

export default function Slide11Companion({
  slideNum = 11,
  totalSlides = 11,
}: {
  slideNum?: number;
  totalSlides?: number;
} = {}) {
  const [bubbleIdx, setBubbleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setBubbleIdx((i) => (i + 1) % bubbleLines.length),
      4200
    );
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <SlideHeader
        eyebrow="Vision"
        meta="Why this lands and expands"
        num={slideNum}
        total={totalSlides}
      />

      <div className="flex-1 flex flex-col" style={{ paddingTop: 4 }}>
        {/* headline + subhead */}
        <div style={{ maxWidth: 1180 }}>
          <h2
            className="mb-6"
            style={{
              fontFamily: fonts.serif,
              fontSize: "clamp(22px, 2.5vw, 40px)",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              color: tokens.ink,
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            The{" "}
            <em style={{ color: tokens.accent, fontStyle: "italic" }}>
              retention surface
            </em>{" "}
            that compounds inside every logo.
          </h2>
          <p
            style={{
              fontFamily: fonts.serif,
              fontSize: 15,
              lineHeight: 1.55,
              color: tokens.inkSoft,
              maxWidth: "100%",
            }}
          >
            Half my product-design day is 2-minute Slack rambles to engineers
            and PMs. Every team has its version of that loss. The desktop
            companion turns those rambles into one-click async videos — and
            quietly turns every new role inside an account into ARPA that
            compounds.
          </p>
        </div>

        <PersonaStrip />

        {/* three callouts — wedge / engine / moat */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            marginTop: 8,
            marginBottom: 18,
          }}
        >
          <Callout
            label="THE WEDGE"
            delay={0.4}
            body="Synthesia already ships the parts — Chat (prompt-to-video), Recorder, Avatars, Voice clones, brand kit. Each row above is a different stitch of the same parts. Nothing new to build — just a different room to put them in."
          />
          <Callout
            label="THE ENGINE"
            delay={0.55}
            body="Each new team adds its own ROI metric to the same contract. L&D minutes were the first. Pipeline-attributed credit, meeting-hours-displaced credit, time-to-resolution credit stack on top. One logo, five buyers, five reasons to renew."
          />
          <Callout
            label="THE MOAT"
            delay={0.7}
            body="Once two or more teams in the same account use Synthesia daily, the per-account assets — voice clones, brand kit, prior scripts — become the switching cost. Loom can take one row. Vidyard can take another. Nothing has the per-account memory across all five."
          />
        </div>

        {/* risks */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="px-5 py-4"
          style={{
            borderLeft: `3px solid ${tokens.accent}`,
            background: "rgba(139, 58, 46, 0.03)",
          }}
        >
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: 13,
              fontStyle: "italic",
              color: tokens.inkSoft,
              lineHeight: 1.55,
            }}
          >
            <strong
              style={{ color: tokens.accent, fontStyle: "normal", fontWeight: 500 }}
            >
              Honest risks to pressure-test:
            </strong>{" "}
            each row has its own incumbent — Vidyard / Sendspark for Sales,
            Loom for Eng, Zendesk for Support. Synthesia wins per-row on
            avatar + voice clone, loses where workflow integration is deeper
            than the avatar's value-add. Governance has to be solved before
            any of these ship to Enterprise — branded avatar publishing needs
            review, watermarking, time-limited shares. Compute cost is worse
            than Idea 03 (always-on inference). Out of the take-home brief by
            design — retention-stage vision, not a sign-up experiment.
          </div>
        </motion.div>

        {/* hero: dock + avatar */}
        <DockHero bubbleIdx={bubbleIdx} setBubbleIdx={setBubbleIdx} />
      </div>
    </>
  );
}

/* ---------- Hero dock + avatar ---------- */

type ChatStage = "prompt" | "generating" | "done";

const QUICK_PROMPTS = [
  "Walk these new specs through to engineering",
  "90-second sprint update for the team",
  "Explain this architecture decision once",
];

function DockHero({
  bubbleIdx,
  setBubbleIdx,
}: {
  bubbleIdx: number;
  setBubbleIdx: (i: number | ((p: number) => number)) => void;
}) {
  const [chatOpen, setChatOpen] = useState(false);
  const [stage, setStage] = useState<ChatStage>("prompt");
  const [selectedPrompt, setSelectedPrompt] = useState("");

  const openChat = () => {
    setStage("prompt");
    setSelectedPrompt("");
    setChatOpen(true);
  };
  const closeChat = () => setChatOpen(false);

  const submitPrompt = (text: string) => {
    if (!text.trim()) return;
    setSelectedPrompt(text);
    setStage("generating");
    // fake-render then reveal the video card
    setTimeout(() => setStage("done"), 2400);
  };

  return (
    <div
      className="relative mx-auto"
      style={{
        width: DOCK_WIDTH + 80,
        marginTop: "auto",
        marginBottom: 0,
        height: 170,
        transform: "translateY(42px)",
      }}
    >
      {/* desktop wallpaper hint behind dock — soft warm gradient */}
      <div
        style={{
          position: "absolute",
          inset: "auto 16px 0 16px",
          height: 110,
          borderRadius: 14,
          background:
            "linear-gradient(180deg, rgba(79,70,229,0.05) 0%, rgba(139,58,46,0.04) 60%, rgba(31,29,26,0.06) 100%)",
          filter: "blur(0.5px)",
        }}
      />

      {/* the dock */}
      <div
        className="relative mx-auto"
        style={{
          width: DOCK_WIDTH,
          height: DOCK_HEIGHT,
          marginTop: 76,
        }}
      >
        <MacDock />

        {/* walking avatar + attached bubble — walks continuously */}
        <WalkingAvatar
          bubbleIdx={bubbleIdx}
          paused={chatOpen}
          onTap={() => {
            if (chatOpen) {
              // while chat is open, clicking the avatar just cycles the
              // attached bubble — but bubble is hidden during chat, so
              // no-op is fine.
              setBubbleIdx((i: number) => (i + 1) % bubbleLines.length);
            } else {
              openChat();
            }
          }}
        />

        {/* chat window — floats above the dock when opened */}
        <AnimatePresence>
          {chatOpen && (
            <ChatWindow
              stage={stage}
              selectedPrompt={selectedPrompt}
              onClose={closeChat}
              onSubmitPrompt={submitPrompt}
              onReset={() => {
                setStage("prompt");
                setSelectedPrompt("");
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Chat window (popup demo) ---------- */

function ChatWindow({
  stage,
  selectedPrompt,
  onClose,
  onSubmitPrompt,
  onReset,
}: {
  stage: ChatStage;
  selectedPrompt: string;
  onClose: () => void;
  onSubmitPrompt: (text: string) => void;
  onReset: () => void;
}) {
  const [typed, setTyped] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.96 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="absolute"
      style={{
        width: 440,
        bottom: DOCK_HEIGHT + 22,
        left: "50%",
        transform: "translateX(-50%)",
        transformOrigin: "bottom center",
        borderRadius: 14,
        background: "#fff",
        border: "1px solid rgba(31,29,26,0.08)",
        boxShadow: [
          "0 1px 0 rgba(255,255,255,0.9) inset",
          "0 24px 56px rgba(31, 29, 26, 0.22)",
          "0 6px 14px rgba(31, 29, 26, 0.10)",
        ].join(", "),
        overflow: "hidden",
        zIndex: 10,
      }}
    >
      {/* mac window chrome */}
      <div
        className="flex items-center"
        style={{
          height: 30,
          padding: "0 12px",
          background:
            "linear-gradient(180deg, rgba(245,244,241,0.95), rgba(232,229,222,0.95))",
          borderBottom: "1px solid rgba(31,29,26,0.06)",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <div className="flex items-center gap-[6px]">
          <TrafficLight color="#ff5f57" onClick={onClose} />
          <TrafficLight color="#febc2e" />
          <TrafficLight color="#28c840" />
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            fontSize: 11.5,
            fontWeight: 500,
            color: "rgba(31,29,26,0.64)",
            letterSpacing: "-0.01em",
          }}
        >
          Synthesia
        </div>
      </div>

      {/* content */}
      <div style={{ padding: "14px 16px 16px" }}>
        <AnimatePresence mode="wait">
          {stage === "prompt" && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChatGreeting />
              <div className="flex flex-col gap-[6px]" style={{ marginTop: 12 }}>
                {QUICK_PROMPTS.map((p) => (
                  <PromptChip
                    key={p}
                    text={p}
                    onClick={() => onSubmitPrompt(p)}
                  />
                ))}
              </div>
              <ChatInput
                value={typed}
                onChange={setTyped}
                onSubmit={() => {
                  onSubmitPrompt(typed);
                  setTyped("");
                }}
              />
            </motion.div>
          )}

          {stage === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <UserMessage text={selectedPrompt} />
              <div style={{ height: 10 }} />
              <AvatarMessage>
                <div>On it — rendering now.</div>
                <FakeProgressBar />
              </AvatarMessage>
            </motion.div>
          )}

          {stage === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <UserMessage text={selectedPrompt} />
              <div style={{ height: 10 }} />
              <AvatarMessage>
                Done — 2 m 14 s rendered in 38 s. Ready to share.
              </AvatarMessage>
              <VideoCard prompt={selectedPrompt} />
              <div
                className="flex items-center gap-2"
                style={{ marginTop: 10 }}
              >
                <GhostButton onClick={onReset}>New video</GhostButton>
                <PrimaryButton>Share</PrimaryButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TrafficLight({
  color,
  onClick,
}: {
  color: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label="close"
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: color,
        border: "1px solid rgba(0,0,0,0.08)",
        padding: 0,
        cursor: onClick ? "pointer" : "default",
      }}
    />
  );
}

function ChatGreeting() {
  return (
    <div className="flex items-start gap-[10px]">
      <AvatarBubbleHead />
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 13.5,
          lineHeight: 1.45,
          color: tokens.ink,
          paddingTop: 2,
        }}
      >
        <div style={{ fontWeight: 500 }}>Hey 👋</div>
        <div style={{ color: tokens.inkSoft, marginTop: 1 }}>
          What video do you want to make?
        </div>
      </div>
    </div>
  );
}

function AvatarBubbleHead() {
  return (
    <div
      style={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: `linear-gradient(145deg, #6366f1, #4338ca)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 6px rgba(79,70,229,0.3)",
        flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 30 30" width="30" height="30">
        <circle cx="15" cy="12" r="4.2" fill="#fff" opacity="0.95" />
        <path
          d="M7 24 Q7 18 15 18 Q23 18 23 24 Z"
          fill="#fff"
          opacity="0.95"
        />
      </svg>
    </div>
  );
}

function PromptChip({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left"
      style={{
        padding: "8px 12px",
        borderRadius: 10,
        background: "rgba(79, 70, 229, 0.06)",
        border: "1px solid rgba(79, 70, 229, 0.14)",
        color: tokens.ink,
        fontFamily: fonts.serif,
        fontSize: 12.5,
        lineHeight: 1.35,
        cursor: "pointer",
        transition: "background 0.15s, border-color 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(79, 70, 229, 0.1)";
        e.currentTarget.style.borderColor = "rgba(79, 70, 229, 0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(79, 70, 229, 0.06)";
        e.currentTarget.style.borderColor = "rgba(79, 70, 229, 0.14)";
      }}
    >
      {text}
    </button>
  );
}

function ChatInput({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div
      className="flex items-center gap-2"
      style={{
        marginTop: 12,
        padding: "6px 6px 6px 12px",
        borderRadius: 12,
        background: "#f5f4f1",
        border: "1px solid rgba(31,29,26,0.08)",
      }}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit();
        }}
        placeholder="Type a prompt…"
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          fontFamily: fonts.serif,
          fontSize: 12.5,
          color: tokens.ink,
        }}
      />
      <button
        onClick={onSubmit}
        aria-label="send"
        style={{
          width: 26,
          height: 26,
          borderRadius: 8,
          background: SYNTH_BLUE,
          color: "#fff",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: 14,
          lineHeight: 1,
        }}
      >
        ↑
      </button>
    </div>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div
        style={{
          maxWidth: "78%",
          padding: "7px 11px",
          borderRadius: 12,
          background: "#f2efe8",
          border: "1px solid rgba(31,29,26,0.06)",
          fontFamily: fonts.serif,
          fontSize: 12.5,
          lineHeight: 1.4,
          color: tokens.ink,
        }}
      >
        {text}
      </div>
    </div>
  );
}

function AvatarMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-[10px]">
      <AvatarBubbleHead />
      <div
        style={{
          flex: 1,
          padding: "7px 11px",
          borderRadius: 12,
          background: SYNTH_BLUE,
          color: "#fff",
          fontFamily: fonts.serif,
          fontSize: 12.5,
          lineHeight: 1.45,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function FakeProgressBar() {
  return (
    <div
      style={{
        marginTop: 8,
        height: 4,
        borderRadius: 2,
        background: "rgba(255,255,255,0.25)",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2.3, ease: "easeInOut" }}
        style={{
          height: "100%",
          background: "#fff",
          borderRadius: 2,
        }}
      />
    </div>
  );
}

function VideoCard({ prompt }: { prompt: string }) {
  const title = prompt.length > 42 ? prompt.slice(0, 40) + "…" : prompt;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      style={{
        marginTop: 10,
        borderRadius: 10,
        background: "#0b0b0e",
        border: "1px solid rgba(31,29,26,0.1)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* fake video thumbnail */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 120,
          background:
            "linear-gradient(135deg, #312e81 0%, #4f46e5 40%, #8b3a2e 100%)",
        }}
      >
        {/* faux avatar in frame */}
        <div
          style={{
            position: "absolute",
            right: 18,
            bottom: 0,
            width: 72,
            height: 96,
          }}
        >
          <svg viewBox="0 0 72 96" width="72" height="96">
            <ellipse cx="36" cy="34" rx="16" ry="17" fill="#dcb898" />
            <path
              d="M22 32 Q22 16 36 16 Q50 16 50 32 Q48 26 44 24 Q38 28 36 28 Q34 28 28 24 Q24 26 22 32 Z"
              fill="#1f1812"
            />
            <path
              d="M12 96 L12 68 Q12 56 24 54 L36 58 L48 54 Q60 56 60 68 L60 96 Z"
              fill="#1f2937"
            />
            <path
              d="M32 54 L36 70 L40 54 Z"
              fill="#f4f1ea"
            />
          </svg>
        </div>
        {/* play button */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "12px solid #1f1812",
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              marginLeft: 3,
            }}
          />
        </div>
        {/* duration chip */}
        <div
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            padding: "2px 6px",
            borderRadius: 4,
            background: "rgba(0,0,0,0.55)",
            color: "#fff",
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: "0.04em",
          }}
        >
          2:14
        </div>
      </div>
      {/* title row */}
      <div
        style={{
          padding: "8px 11px",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontSize: 11.5,
          color: "#e5e5ea",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontWeight: 500 }}>{title}</span>
        <span style={{ color: "#8e8e93" }}>.mp4</span>
      </div>
    </motion.div>
  );
}

function GhostButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 12px",
        borderRadius: 8,
        background: "transparent",
        border: "1px solid rgba(31,29,26,0.12)",
        fontFamily: fonts.serif,
        fontSize: 12,
        color: tokens.ink,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        padding: "6px 12px",
        borderRadius: 8,
        background: SYNTH_BLUE,
        color: "#fff",
        border: "none",
        fontFamily: fonts.serif,
        fontSize: 12,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

/* ---------- macOS dock chrome + icons ---------- */

function MacDock() {
  return (
    <div
      className="absolute inset-0"
      style={{
        borderRadius: 22,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.48) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: [
          "0 1px 0 rgba(255,255,255,0.9) inset",
          "0 0 0 1px rgba(31,29,26,0.06)",
          "0 18px 40px rgba(31, 29, 26, 0.18)",
          "0 4px 10px rgba(31, 29, 26, 0.08)",
        ].join(", "),
      }}
    >
      <div
        className="absolute inset-0 flex items-center"
        style={{ padding: "0 12px", gap: 7 }}
      >
        <DockIcon kind="finder" />
        <DockIcon kind="safari" />
        <DockIcon kind="messages" />
        <DockIcon kind="mail" />
        <DockIcon kind="calendar" />
        <DockIcon kind="notes" />
        <DockIcon kind="music" />
        <DockIcon kind="slack" />
        <DockIcon kind="figma" />
        <DockIcon kind="synthesia" />
        <DockSeparator />
        <DockIcon kind="trash" />
      </div>
    </div>
  );
}

function DockSeparator() {
  return (
    <div
      style={{
        width: 1,
        height: 36,
        background:
          "linear-gradient(180deg, transparent, rgba(31,29,26,0.18), transparent)",
        margin: "0 4px",
        flexShrink: 0,
      }}
    />
  );
}

type IconKind =
  | "finder"
  | "safari"
  | "messages"
  | "mail"
  | "calendar"
  | "notes"
  | "music"
  | "slack"
  | "figma"
  | "synthesia"
  | "trash";

function DockIcon({ kind }: { kind: IconKind }) {
  return (
    <div
      style={{
        width: 42,
        height: 42,
        borderRadius: 10,
        flexShrink: 0,
        position: "relative",
        boxShadow:
          "0 2px 6px rgba(31,29,26,0.18), 0 0 0 0.5px rgba(31,29,26,0.08), inset 0 1px 0 rgba(255,255,255,0.4)",
        overflow: "hidden",
      }}
    >
      <IconArt kind={kind} />
    </div>
  );
}

function IconArt({ kind }: { kind: IconKind }) {
  const common = {
    width: "100%",
    height: "100%",
    display: "block",
  } as const;

  if (kind === "finder") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <defs>
          <linearGradient id="fnd" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9ec5ff" />
            <stop offset="1" stopColor="#4d8de5" />
          </linearGradient>
        </defs>
        <rect width="46" height="46" fill="url(#fnd)" />
        <path
          d="M14 17 L18 22 M32 17 L28 22"
          stroke="#1f2937"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 31 Q23 36 30 31"
          stroke="#1f2937"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "safari") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <defs>
          <radialGradient id="saf" cx="0.5" cy="0.4">
            <stop offset="0" stopColor="#e9f3ff" />
            <stop offset="1" stopColor="#3b82f6" />
          </radialGradient>
        </defs>
        <rect width="46" height="46" fill="url(#saf)" />
        <circle cx="23" cy="23" r="13" fill="#fff" />
        <circle cx="23" cy="23" r="13" fill="none" stroke="#1f2937" strokeWidth="0.6" />
        <polygon points="23,12 25,22 23,34 21,22" fill="#ef4444" />
        <polygon points="12,23 22,21 34,23 22,25" fill="#cbd5e1" />
        <circle cx="23" cy="23" r="1.6" fill="#1f2937" />
      </svg>
    );
  }
  if (kind === "messages") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <defs>
          <linearGradient id="msg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7be37b" />
            <stop offset="1" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        <rect width="46" height="46" fill="url(#msg)" />
        <path
          d="M11 18 Q11 11 18 11 L28 11 Q35 11 35 18 L35 24 Q35 31 28 31 L21 31 L15 35 L17 30 Q11 30 11 24 Z"
          fill="#fff"
        />
      </svg>
    );
  }
  if (kind === "mail") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <defs>
          <linearGradient id="mail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#dbeafe" />
            <stop offset="1" stopColor="#93c5fd" />
          </linearGradient>
        </defs>
        <rect width="46" height="46" fill="url(#mail)" />
        <rect x="9" y="14" width="28" height="18" rx="2" fill="#fff" stroke="#1f2937" strokeWidth="0.6" />
        <path d="M9 15 L23 26 L37 15" fill="none" stroke="#3b82f6" strokeWidth="1.4" />
      </svg>
    );
  }
  if (kind === "calendar") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <rect width="46" height="46" fill="#fafafa" />
        <rect x="0" y="0" width="46" height="11" fill="#ef4444" />
        <text
          x="23"
          y="9"
          textAnchor="middle"
          fontSize="6.5"
          fill="#fff"
          fontFamily="-apple-system, sans-serif"
          fontWeight="600"
        >
          THU
        </text>
        <text
          x="23"
          y="34"
          textAnchor="middle"
          fontSize="20"
          fill="#1f2937"
          fontFamily="-apple-system, sans-serif"
          fontWeight="300"
        >
          24
        </text>
      </svg>
    );
  }
  if (kind === "notes") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <rect width="46" height="46" fill="#fff8d6" />
        <rect x="0" y="0" width="46" height="9" fill="#f5d76e" />
        <line x1="9" y1="20" x2="37" y2="20" stroke="#cbb56e" strokeWidth="0.8" />
        <line x1="9" y1="26" x2="37" y2="26" stroke="#cbb56e" strokeWidth="0.8" />
        <line x1="9" y1="32" x2="30" y2="32" stroke="#cbb56e" strokeWidth="0.8" />
      </svg>
    );
  }
  if (kind === "music") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <defs>
          <linearGradient id="mus" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fb7185" />
            <stop offset="1" stopColor="#e11d48" />
          </linearGradient>
        </defs>
        <rect width="46" height="46" fill="url(#mus)" />
        <path
          d="M19 30 L19 17 L31 14 L31 27"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse cx="17.5" cy="30" rx="3" ry="2.4" fill="#fff" />
        <ellipse cx="29.5" cy="27" rx="3" ry="2.4" fill="#fff" />
      </svg>
    );
  }
  if (kind === "slack") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <rect width="46" height="46" fill="#fff" />
        <rect x="14" y="20" width="6" height="14" rx="3" fill="#36c5f0" />
        <rect x="20" y="14" width="14" height="6" rx="3" fill="#2eb67d" />
        <rect x="26" y="20" width="6" height="14" rx="3" fill="#ecb22e" />
        <rect x="12" y="26" width="14" height="6" rx="3" fill="#e01e5a" />
      </svg>
    );
  }
  if (kind === "figma") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <rect width="46" height="46" fill="#fff" />
        <circle cx="27" cy="23" r="4.5" fill="#1abcfe" />
        <path d="M14.5 14 h7 v9 h-7 a4.5 4.5 0 0 1 0-9 z" fill="#f24e1e" />
        <path d="M21.5 14 h7 a4.5 4.5 0 0 1 0 9 h-7 z" fill="#a259ff" />
        <path d="M14.5 23 h7 v9 h-2.5 a4.5 4.5 0 0 1 -4.5 -4.5 a4.5 4.5 0 0 1 0 -4.5 z" fill="#0acf83" />
        <path d="M14.5 32 h7 v0 a4.5 4.5 0 0 1 -7 -4.5 a4.5 4.5 0 0 1 0 4.5 z" fill="#ff7262" />
      </svg>
    );
  }
  if (kind === "synthesia") {
    return (
      <svg viewBox="0 0 46 46" style={common}>
        <defs>
          <linearGradient id="syn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6366f1" />
            <stop offset="1" stopColor="#4338ca" />
          </linearGradient>
        </defs>
        <rect width="46" height="46" fill="url(#syn)" />
        <circle cx="23" cy="20" r="6" fill="#fff" opacity="0.95" />
        <path
          d="M13 36 Q13 27 23 27 Q33 27 33 36 Z"
          fill="#fff"
          opacity="0.95"
        />
        <circle cx="33" cy="13" r="3.5" fill="#fff" opacity="0.6" />
        <circle cx="33" cy="13" r="1.5" fill={SYNTH_BLUE} />
      </svg>
    );
  }
  // trash
  return (
    <svg viewBox="0 0 46 46" style={common}>
      <rect width="46" height="46" fill="#e5e7eb" />
      <path
        d="M14 16 H32 L30 34 Q30 36 28 36 H18 Q16 36 16 34 Z"
        fill="#fff"
        stroke="#6b7280"
        strokeWidth="1"
      />
      <rect x="13" y="14" width="20" height="2.5" rx="1" fill="#6b7280" />
      <line x1="20" y1="20" x2="20" y2="32" stroke="#9ca3af" strokeWidth="1" />
      <line x1="26" y1="20" x2="26" y2="32" stroke="#9ca3af" strokeWidth="1" />
    </svg>
  );
}

/* ---------- Walking avatar ---------- */

function WalkingAvatar({
  bubbleIdx,
  paused,
  onTap,
}: {
  bubbleIdx: number;
  paused?: boolean;
  onTap: () => void;
}) {
  // Walk cycle: walk-right -> pause+turn at right border ->
  // walk-left -> pause+turn at left border -> repeat.
  //
  // We drive animation entirely via refs / direct DOM mutation and
  // intentionally do NOT call setState in the rAF loop — re-rendering
  // every frame can clobber imperative style writes. Leg swing is
  // forwarded to AvatarFigure via a ref-backed child mutator.
  const outerRef = useRef<HTMLDivElement | null>(null);
  const figureRef = useRef<HTMLDivElement | null>(null);
  const phaseRef = useRef(0.5);
  const figureEl = useRef<{ setPhase: (p: number) => void } | null>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const range = DOCK_WIDTH - AVATAR_SIZE - WALK_PADDING * 2;
    const cycle = WALK_DURATION * 2 + TURN_DURATION * 2;
    let raf = 0;
    const start = performance.now();
    let pausedElapsed = 0; // accumulated paused time (so walk resumes where it stopped)
    let lastPausedAt: number | null = null;

    const tick = (now: number) => {
      // If paused, freeze the walk-cycle clock by accumulating elapsed-pause.
      if (pausedRef.current) {
        if (lastPausedAt === null) lastPausedAt = now;
        raf = requestAnimationFrame(tick);
        return;
      }
      if (lastPausedAt !== null) {
        pausedElapsed += now - lastPausedAt;
        lastPausedAt = null;
      }
      now = now - pausedElapsed;
      // intentional shadowing of `now` so original variable name below
      // reads as "effective animation time".
      const t = ((now - start) / 1000) % cycle;

      let x: number;
      let walking: boolean;
      let facingRight: boolean;

      if (t < WALK_DURATION) {
        // 1) walking right
        walking = true;
        facingRight = true;
        x = WALK_PADDING + (t / WALK_DURATION) * range;
      } else if (t < WALK_DURATION + TURN_DURATION) {
        // 2) reach right border -> turn (flip mid-pause)
        walking = false;
        const tt = t - WALK_DURATION;
        facingRight = tt < TURN_DURATION / 2;
        x = WALK_PADDING + range;
      } else if (t < 2 * WALK_DURATION + TURN_DURATION) {
        // 3) walking left
        walking = true;
        facingRight = false;
        const localT = (t - WALK_DURATION - TURN_DURATION) / WALK_DURATION;
        x = WALK_PADDING + range - localT * range;
      } else {
        // 4) reach left border -> turn (flip mid-pause)
        walking = false;
        const tt = t - (2 * WALK_DURATION + TURN_DURATION);
        facingRight = tt > TURN_DURATION / 2;
        x = WALK_PADDING;
      }

      const bob = walking ? Math.abs(Math.sin(t * Math.PI * 4)) * 2.2 : 0;
      const legPhase = walking
        ? (Math.sin(t * Math.PI * 4) + 1) / 2
        : 0.5;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
      }
      if (figureRef.current) {
        figureRef.current.style.transform = `translateY(${-bob}px) scaleX(${
          facingRight ? 1 : -1
        })`;
      }
      if (phaseRef.current !== legPhase) {
        phaseRef.current = legPhase;
        figureEl.current?.setPhase(legPhase);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={outerRef}
      onClick={onTap}
      className="absolute"
      style={{
        top: -AVATAR_SIZE + 14,
        left: 0,
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        cursor: "pointer",
        willChange: "transform",
      }}
      aria-label="Synthesia desktop companion"
    >
      {/* mini bubble that rides above the avatar's head — hidden when chat is open */}
      <AnimatePresence>
        {!paused && <AttachedBubble bubbleIdx={bubbleIdx} />}
      </AnimatePresence>

      {/* figure bobs + flips; wrapped so the bubble above stays upright */}
      <div
        ref={figureRef}
        style={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          willChange: "transform",
          transformOrigin: "center bottom",
        }}
      >
        <AvatarFigureRefBacked handle={figureEl} />
      </div>
    </div>
  );
}

function AvatarFigureRefBacked({
  handle,
}: {
  handle: React.MutableRefObject<{ setPhase: (p: number) => void } | null>;
}) {
  const [phase, setPhase] = useState(0.5);
  useEffect(() => {
    handle.current = { setPhase };
    return () => {
      handle.current = null;
    };
  }, [handle]);
  return <AvatarFigure phase={phase} />;
}

function AttachedBubble({ bubbleIdx }: { bubbleIdx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        bottom: "100%",
        left: "50%",
        transform: "translate(-50%, -6px)",
        width: 190,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: SYNTH_BLUE,
          color: "#fff",
          fontFamily: fonts.serif,
          fontSize: 11,
          fontStyle: "italic",
          lineHeight: 1.35,
          padding: "7px 11px",
          borderRadius: 11,
          textAlign: "center",
          boxShadow:
            "0 6px 16px rgba(79, 70, 229, 0.22), inset 0 1px 0 rgba(255,255,255,0.18)",
          minHeight: 30,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={bubbleIdx}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.2 }}
            style={{ display: "block" }}
          >
            "{bubbleLines[bubbleIdx]}"
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function AvatarFigure({ phase }: { phase: number }) {
  // Two-frame walk cycle driven by `phase` (0..1).
  // Legs swap; arms swing opposite. Body bobs in parent.
  const swing = (phase - 0.5) * 2; // -1..1
  const legL = swing * 6;
  const legR = -swing * 6;
  const armL = -swing * 8;
  const armR = swing * 8;

  return (
    <svg
      viewBox="0 0 64 64"
      width={AVATAR_SIZE}
      height={AVATAR_SIZE}
      style={{ display: "block", overflow: "visible" }}
    >
      {/* soft ground shadow */}
      <ellipse
        cx="32"
        cy="62"
        rx={11 - Math.abs(swing) * 1.2}
        ry="1.6"
        fill="rgba(31,29,26,0.18)"
      />

      {/* back arm */}
      <g
        transform={`rotate(${armL} 24 32)`}
        style={{ transformOrigin: "24px 32px" }}
      >
        <rect x="22.5" y="32" width="3.4" height="13" rx="1.6" fill="#0f172a" />
        <circle cx="24.2" cy="46" r="2" fill="#d9b896" />
      </g>

      {/* legs */}
      <g transform={`translate(0 ${Math.abs(swing) * 0.6})`}>
        <g
          transform={`rotate(${legL} 28 48)`}
          style={{ transformOrigin: "28px 48px" }}
        >
          <rect x="26.2" y="48" width="4" height="13" rx="1.4" fill="#1f2937" />
          <ellipse cx="28.2" cy="61.5" rx="3.4" ry="1.5" fill="#0f172a" />
        </g>
        <g
          transform={`rotate(${legR} 36 48)`}
          style={{ transformOrigin: "36px 48px" }}
        >
          <rect x="33.8" y="48" width="4" height="13" rx="1.4" fill="#1f2937" />
          <ellipse cx="35.8" cy="61.5" rx="3.4" ry="1.5" fill="#0f172a" />
        </g>
      </g>

      {/* torso / suit jacket */}
      <path
        d="M18 48 L18 32 Q18 24 24 22 L28 26 L32 24 L36 26 L40 22 Q46 24 46 32 L46 48 Q46 50 44 50 L20 50 Q18 50 18 48 Z"
        fill="#1f2937"
      />
      {/* shirt v + collar */}
      <path d="M28 26 L32 38 L36 26 L32 24 Z" fill="#f4f1ea" />
      {/* tie in Synthesia blue */}
      <path
        d="M30.6 26 L30 36 L32 38 L34 36 L33.4 26 L32 25 Z"
        fill={SYNTH_BLUE}
      />
      {/* lapel stitching */}
      <path
        d="M28 26 L24 48 M36 26 L40 48"
        stroke="#0b1220"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* shoulder highlight */}
      <path
        d="M19 30 Q24 26 28 28"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        fill="none"
      />

      {/* neck */}
      <rect x="29" y="20" width="6" height="4" fill="#c2a07f" />

      {/* head */}
      <ellipse cx="32" cy="14" rx="9" ry="9.5" fill="#dcb898" />
      {/* hair */}
      <path
        d="M22 13 Q22 4 32 4 Q42 4 42 13 Q41 9 38 8 Q34 11 32 11 Q30 11 26 8 Q23 9 22 13 Z"
        fill="#1f1812"
      />
      {/* ear */}
      <ellipse cx="40.5" cy="15" rx="1.4" ry="2.2" fill="#c89e80" />
      {/* eye (single, side profile-ish) */}
      <circle cx="35.5" cy="14.5" r="0.9" fill="#0b1220" />
      <circle cx="35.5" cy="14.5" r="0.25" fill="#fff" />
      {/* eyebrow */}
      <path
        d="M34 12.4 L37 12.2"
        stroke="#1f1812"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      {/* smile */}
      <path
        d="M35.5 17.3 Q37 18.2 38.4 17.3"
        stroke="#5b3a2c"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />

      {/* front arm */}
      <g
        transform={`rotate(${armR} 40 32)`}
        style={{ transformOrigin: "40px 32px" }}
      >
        <rect x="38.5" y="32" width="3.4" height="13" rx="1.6" fill="#0f172a" />
        <circle cx="40.2" cy="46" r="2" fill="#d9b896" />
      </g>
    </svg>
  );
}

/* ---------- Persona expansion strip ---------- */

function PersonaStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.25 }}
      className="flex"
      style={{
        marginTop: 24,
        marginBottom: 22,
        borderTop: `1px solid ${tokens.rule}`,
        borderBottom: `1px solid ${tokens.rule}`,
        padding: "14px 0",
      }}
    >
      {PERSONAS.map((p, i) => (
        <div
          key={p.pair}
          style={{
            flex: 1,
            padding: "0 14px",
            borderRight:
              i < PERSONAS.length - 1
                ? `1px dashed ${tokens.rule}`
                : "none",
          }}
        >
          {/* pair label */}
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 9.5,
              letterSpacing: "0.14em",
              color: tokens.accent,
              marginBottom: 6,
            }}
          >
            {p.pair}
          </div>

          {/* use case (italic, in quotes) */}
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: 12.5,
              fontStyle: "italic",
              color: tokens.inkSoft,
              lineHeight: 1.4,
              marginBottom: 10,
              paddingBottom: 10,
              borderBottom: `1px solid ${tokens.rule}`,
            }}
          >
            “{p.uc}”
          </div>

          {/* metadata: replaces / stitch / measured by */}
          <PersonaMetaRow label="REPLACES" value={p.replaces} />
          <PersonaMetaRow label="STITCH" value={p.stitch} />
          <PersonaMetaRow
            label="MEASURED BY"
            value={p.measuredBy}
            isTBD={p.measuredBy.startsWith("TBD")}
          />
        </div>
      ))}
    </motion.div>
  );
}

function PersonaMetaRow({
  label,
  value,
  isTBD,
}: {
  label: string;
  value: string;
  isTBD?: boolean;
}) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 8.5,
          letterSpacing: "0.12em",
          color: tokens.inkSoft,
          opacity: 0.6,
          marginBottom: 1,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 10.5,
          lineHeight: 1.3,
          color: tokens.inkSoft,
          opacity: isTBD ? 0.6 : 1,
          fontStyle: isTBD ? "italic" : "normal",
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* ---------- Callout ---------- */

function Callout({
  label,
  body,
  delay,
}: {
  label: string;
  body: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: "16px 18px",
        background: tokens.paper,
        border: `1px solid ${tokens.rule}`,
      }}
    >
      <div
        className="mb-2 inline-flex items-center gap-2"
        style={{
          fontFamily: fonts.mono,
          fontSize: 10.5,
          letterSpacing: "0.16em",
          color: tokens.accent,
        }}
      >
        <span
          style={{
            width: 14,
            height: 1,
            background: tokens.accent,
            display: "inline-block",
          }}
        />
        {label}
      </div>
      <p
        style={{
          fontFamily: fonts.serif,
          fontSize: 13,
          lineHeight: 1.5,
          color: tokens.inkSoft,
        }}
      >
        {body}
      </p>
    </motion.div>
  );
}
