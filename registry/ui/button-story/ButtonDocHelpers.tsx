import React from "react";

// ─────────────────────────────────────────────
// Badge: Stable / Beta / Deprecated 상태 표시
// ─────────────────────────────────────────────
export const Badge = ({ status = "Stable" }: { status?: string }) => {
  const map: Record<string, { bg: string; color: string; border: string }> = {
    Stable:     { bg: "#dcfce7", color: "#15803d", border: "#86efac" },
    Beta:       { bg: "#fef9c3", color: "#a16207", border: "#fde047" },
    Deprecated: { bg: "#fee2e2", color: "#dc2626", border: "#fca5a5" },
  };
  const s = map[status] ?? map.Stable;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "2px 10px",
      borderRadius: "9999px", fontSize: "11px", fontWeight: "600",
      letterSpacing: "0.04em", backgroundColor: s.bg, color: s.color,
      border: `1px solid ${s.border}`, marginLeft: "10px", verticalAlign: "middle",
    }}>
      {status}
    </span>
  );
};

// ─────────────────────────────────────────────
// MetaRow: 컴포넌트 메타 정보 행
// ─────────────────────────────────────────────
export const MetaRow = ({ id }: { id: string }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px",
    borderRadius: "8px", background: "var(--base-muted, #f1f5f9)", marginBottom: "24px",
  }}>
    <code style={{ fontSize: "12px", color: "var(--base-muted-foreground)" }}>{id}</code>
    <span style={{ fontSize: "13px", color: "var(--base-muted-foreground)" }}>
      Component · Radix UI Slot · shadcn/ui
    </span>
  </div>
);

// ─────────────────────────────────────────────
// Grid helpers
// ─────────────────────────────────────────────
export const Grid2 = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", margin: "16px 0" }}>
    {children}
  </div>
);

export const Grid3 = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", margin: "16px 0" }}>
    {children}
  </div>
);

// ─────────────────────────────────────────────
// VariantCard: Variant 소개 카드
// ─────────────────────────────────────────────
export const VariantCard = ({
  variant, title, desc, children,
}: {
  variant: string; title: string; desc: string; children: React.ReactNode;
}) => (
  <div style={{
    border: "1px solid var(--base-border)", borderRadius: "10px",
    padding: "20px", background: "var(--base-card)",
  }}>
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      minHeight: "48px", marginBottom: "16px",
    }}>
      {children}
    </div>
    <div style={{ borderTop: "1px solid var(--base-border)", paddingTop: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
        <strong style={{ fontSize: "13px" }}>{title}</strong>
        <code style={{
          fontSize: "11px", color: "var(--base-muted-foreground)",
          background: "var(--base-muted)", padding: "2px 6px", borderRadius: "4px",
        }}>
          variant=&quot;{variant}&quot;
        </code>
      </div>
      <p style={{ fontSize: "13px", color: "var(--base-muted-foreground)", margin: 0, lineHeight: 1.6 }}>
        {desc}
      </p>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// StateCard: 상태/사이즈 소개 카드
// ─────────────────────────────────────────────
export const StateCard = ({
  title, desc, children,
}: {
  title: string; desc: string; children: React.ReactNode;
}) => (
  <div style={{
    border: "1px solid var(--base-border)", borderRadius: "10px",
    padding: "20px", background: "var(--base-card)",
  }}>
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      minHeight: "48px", marginBottom: "16px",
    }}>
      {children}
    </div>
    <div style={{ borderTop: "1px solid var(--base-border)", paddingTop: "12px" }}>
      <strong style={{ fontSize: "13px", display: "block", marginBottom: "6px" }}>{title}</strong>
      <p style={{ fontSize: "13px", color: "var(--base-muted-foreground)", margin: 0, lineHeight: 1.6 }}>
        {desc}
      </p>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// DoDont: Do / Don't 가이드라인 카드
// ─────────────────────────────────────────────
export const DoDont = ({
  type, desc, children,
}: {
  type: "do" | "dont"; desc: string; children: React.ReactNode;
}) => (
  <div style={{
    flex: "1 1 260px",
    border: `2px solid ${type === "do" ? "#22c55e" : "#ef4444"}`,
    borderRadius: "10px", padding: "20px", minWidth: 260, background: "var(--base-card)",
  }}>
    <div style={{
      fontSize: "11px", fontWeight: "700", letterSpacing: "0.08em",
      color: type === "do" ? "#22c55e" : "#ef4444", marginBottom: "14px",
    }}>
      {type === "do" ? "✓ DO" : "✗ DON'T"}
    </div>
    <div style={{ marginBottom: "14px" }}>{children}</div>
    <p style={{ fontSize: "13px", color: "var(--base-muted-foreground)", margin: 0, lineHeight: 1.5 }}>
      {desc}
    </p>
  </div>
);

// ─────────────────────────────────────────────
// Row: 수평 flex 컨테이너
// ─────────────────────────────────────────────
export const Row = ({ children, gap = 8 }: { children: React.ReactNode; gap?: number }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "center" }}>
    {children}
  </div>
);

// ─────────────────────────────────────────────
// TokenRow: 디자인 토큰 테이블 행
// ─────────────────────────────────────────────
export const TokenRow = ({
  token, tailwind, applied,
}: {
  token: string; tailwind: string; applied: string;
}) => (
  <tr>
    <td style={{ padding: "8px 12px" }}>
      <code style={{ fontSize: "12px" }}>{token}</code>
    </td>
    <td style={{ padding: "8px 12px" }}>
      <code style={{ fontSize: "12px", color: "#7c3aed" }}>{tailwind}</code>
    </td>
    <td style={{ padding: "8px 12px", fontSize: "13px", color: "var(--base-muted-foreground)" }}>
      {applied}
    </td>
  </tr>
);
