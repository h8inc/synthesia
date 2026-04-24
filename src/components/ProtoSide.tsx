import type { ReactNode } from "react";
import { tokens, fonts } from "../lib/tokens";

export function ProtoSide({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto">{children}</div>
  );
}

export function ProtoSection({
  title,
  children,
  accent,
}: {
  title: string;
  children: ReactNode;
  accent?: string;
}) {
  return (
    <div>
      <h6
        className="mb-2 pb-[5px]"
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: accent ?? tokens.accent,
          borderBottom: `1px solid ${tokens.rule}`,
          fontWeight: 500,
        }}
      >
        {title}
      </h6>
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 13,
          lineHeight: 1.55,
          color: tokens.inkSoft,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function ProtoBullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-none p-0 m-0">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative"
          style={{
            fontSize: 12.5,
            lineHeight: 1.5,
            padding: "3px 0 3px 14px",
            color: tokens.inkSoft,
          }}
        >
          <span
            className="absolute left-0"
            style={{
              color: tokens.muted,
              fontFamily: fonts.mono,
              fontSize: 10,
            }}
          >
            →
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function IdeaMetric({
  code,
  primary,
  counter,
}: {
  code: string;
  primary: ReactNode;
  counter?: string;
}) {
  return (
    <div
      className="mt-3 p-4"
      style={{
        border: `1px solid ${tokens.accent}`,
        background: "rgba(139, 58, 46, 0.04)",
      }}
    >
      <div
        className="mb-2"
        style={{
          fontFamily: fonts.mono,
          fontSize: 9.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: tokens.accent,
        }}
      >
        Metric to track
      </div>
      <div
        className="inline-block mb-[6px]"
        style={{
          fontFamily: fonts.mono,
          fontSize: 16,
          color: tokens.gold,
          background: "rgba(160, 122, 45, 0.1)",
          padding: "3px 8px",
          borderRadius: 3,
        }}
      >
        {code}
      </div>
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 12,
          lineHeight: 1.5,
          color: tokens.inkSoft,
        }}
      >
        {primary}
      </div>
      {counter && (
        <div
          className="mt-[6px]"
          style={{
            fontSize: 11,
            color: tokens.muted,
            fontStyle: "italic",
            fontFamily: fonts.serif,
          }}
        >
          {counter}
        </div>
      )}
    </div>
  );
}
