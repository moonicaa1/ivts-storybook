import * as React from "react";

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "13px",
  margin: "16px 0",
};

export function RoCardCodeStructureTable() {
  const rows = [
    {
      file: "ro-card/InventisRoCard.tsx",
      role: "`type` · 헤더(이름·Draft 배지·더보기) · 본문 행 · Action 푸터",
    },
    {
      file: "ro-card/figma.ts",
      role: "Figma node-id · Variants(26837:1510)",
    },
  ];
  return (
    <table style={tableStyle}>
      <thead>
        <tr style={{ borderBottom: "1px solid var(--border)" }}>
          <th style={{ textAlign: "left", padding: "8px 12px", width: "42%" }}>
            파일
          </th>
          <th style={{ textAlign: "left", padding: "8px 12px" }}>역할</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.file} style={{ borderBottom: "1px solid var(--border)" }}>
            <td style={{ padding: "8px 12px", verticalAlign: "top" }}>
              <code style={{ fontSize: "12px" }}>{r.file}</code>
            </td>
            <td
              style={{
                padding: "8px 12px",
                color: "var(--muted-foreground)",
                verticalAlign: "top",
              }}
            >
              {r.role}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** 사이드바(북마크) 표기·순서 = `ro-card-pattern.stories.tsx` export 순서와 동일 */
export function RoCardVariantsTable() {
  const rows = [
    {
      sidebarLabel: "Default",
      figma: "Type=Default",
      desc: "칸반 열 폭(~233px) 기준 컴팩트 카드",
    },
    {
      sidebarLabel: "With Action Footer",
      figma: "Type=Action",
      desc: "큐 패널 폭(~366px), Send SMS / Call / Check In 푸터",
    },
    {
      sidebarLabel: "Schedule",
      figma: "Type=Schedule",
      desc: "앰버 좌측 강조, 차량·시간 위주",
    },
    {
      sidebarLabel: "With Progress",
      figma: "Default + progress",
      desc: "Default 카드에 진행률 행(`showProgress`)",
    },
  ];
  return (
    <table style={tableStyle}>
      <thead>
        <tr style={{ borderBottom: "1px solid var(--border)" }}>
          <th style={{ textAlign: "left", padding: "8px 12px", width: "26%" }}>
            스토리북 스토리
          </th>
          <th style={{ textAlign: "left", padding: "8px 12px", width: "22%" }}>
            Figma
          </th>
          <th style={{ textAlign: "left", padding: "8px 12px" }}>설명</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr
            key={r.sidebarLabel}
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <td style={{ padding: "8px 12px" }}>
              <strong>{r.sidebarLabel}</strong>
            </td>
            <td
              style={{
                padding: "8px 12px",
                color: "var(--muted-foreground)",
                fontSize: "12px",
              }}
            >
              <code>{r.figma}</code>
            </td>
            <td
              style={{
                padding: "8px 12px",
                color: "var(--muted-foreground)",
              }}
            >
              {r.desc}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
