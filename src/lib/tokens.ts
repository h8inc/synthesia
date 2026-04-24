export const tokens = {
  bg: "#f4f1ea",
  paper: "#ebe7de",
  ink: "#1f1d1a",
  inkSoft: "#4a4642",
  muted: "#8a847b",
  rule: "#c9c2b3",
  accent: "#8b3a2e",
  accentSoft: "#b5685a",
  sage: "#5a6b52",
  gold: "#a07a2d",
  drain: "#c26358",
  gain: "#7a9e6e",
} as const;

export const fonts = {
  serif: "'Fraunces', Georgia, serif",
  mono: "'JetBrains Mono', monospace",
  ui: "'Inter', -apple-system, sans-serif",
} as const;

export type Tone = "gain" | "drain" | "ahaMiss";
export type PanelTone = "neutral" | "drained" | "aha";
export type StepKind = "ask" | "gain" | "aha" | "aha-missed" | "removed";
export type Moment = "setup" | "aha" | "habit";

export type Panel = {
  num: string;
  screen: {
    title: string;
    body: string;
    cta?: { label: string; tone: "primary" | "dead" };
    bars?: number;
  };
  thought: string;
  psych: { label: string; filled: number; tone: Tone };
  tone: PanelTone;
};

export type Step = {
  id: string;
  label: string;
  cost: number | string;
  kind: StepKind;
};
