import type { ReactNode } from "react";
import { fonts } from "../lib/tokens";

export function SynthChrome({ url }: { url: string }) {
  return (
    <div
      className="flex items-center gap-[10px] px-[14px] py-[8px]"
      style={{
        background: "#f9fafb",
        borderBottom: "1px solid #e5e7eb",
        fontFamily: fonts.ui,
        fontSize: 11,
        color: "#6b7280",
      }}
    >
      <div className="flex gap-[4px]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="rounded-full"
            style={{ width: 8, height: 8, background: "#d1d5db" }}
          />
        ))}
      </div>
      <span>{url}</span>
    </div>
  );
}

type SideItem = {
  icon: string;
  label: string;
  active?: boolean;
};

type SideSection =
  | { type: "workspace"; name: string; tier?: string }
  | { type: "cta"; label: string }
  | { type: "label"; label: string }
  | { type: "item"; item: SideItem };

export function SynthSidebar({ sections }: { sections: SideSection[] }) {
  return (
    <div
      className="flex-shrink-0"
      style={{
        width: 180,
        background: "#fff",
        borderRight: "1px solid #e5e7eb",
        padding: "12px 10px",
        fontFamily: fonts.ui,
        fontSize: 11,
      }}
    >
      {sections.map((s, i) => {
        if (s.type === "workspace") {
          return (
            <div
              key={i}
              className="flex items-center gap-2 mb-[14px]"
              style={{ padding: "6px 8px" }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 4,
                  background: "#f3f4f6",
                  color: "#6b7280",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {s.name[0]}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 500, color: "#111827" }}>
                  {s.name}
                </div>
                {s.tier && (
                  <div
                    style={{
                      display: "inline-block",
                      fontSize: 9,
                      background: "#ecfdf5",
                      color: "#059669",
                      padding: "1px 5px",
                      borderRadius: 3,
                    }}
                  >
                    {s.tier}
                  </div>
                )}
              </div>
            </div>
          );
        }
        if (s.type === "cta") {
          return (
            <div
              key={i}
              className="flex items-center gap-[6px] mb-[10px]"
              style={{
                background: "#eef2ff",
                color: "#4f46e5",
                padding: "7px 10px",
                borderRadius: 6,
                fontWeight: 500,
                fontSize: 11,
              }}
            >
              {s.label}
            </div>
          );
        }
        if (s.type === "label") {
          return (
            <div
              key={i}
              style={{
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#9ca3af",
                padding: "8px 8px 4px",
                fontWeight: 500,
              }}
            >
              {s.label}
            </div>
          );
        }
        return (
          <div
            key={i}
            className="flex items-center gap-2"
            style={{
              padding: "6px 8px",
              color: s.item.active ? "#111827" : "#4b5563",
              background: s.item.active ? "#f3f4f6" : "transparent",
              borderRadius: 4,
              fontWeight: s.item.active ? 500 : 400,
              marginBottom: 1,
            }}
          >
            <span
              className="inline-flex items-center justify-center"
              style={{
                width: 14,
                height: 14,
                color: "#9ca3af",
                fontSize: 11,
              }}
            >
              {s.item.icon}
            </span>
            {s.item.label}
          </div>
        );
      })}
    </div>
  );
}

export function SynthMockup({
  url,
  sidebar,
  children,
}: {
  url: string;
  sidebar: SideSection[];
  children: ReactNode;
}) {
  return (
    <div
      className="flex flex-col overflow-hidden h-full"
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        fontFamily: fonts.ui,
        color: "#111827",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <SynthChrome url={url} />
      <div className="flex flex-1 min-h-0">
        <SynthSidebar sections={sidebar} />
        <div
          className="flex-1 overflow-auto"
          style={{ padding: "16px 18px", background: "#fff" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
