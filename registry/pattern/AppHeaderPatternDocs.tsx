import * as React from "react";

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "13px",
  margin: "16px 0",
};

export function AppHeaderCodeStructureTable() {
  const rows = [
    {
      file: "app-header/InventisAppHeader.tsx",
      role: "헤더 UI (`variant` · 검색 · Create · breadcrumb/window)",
    },
    {
      file: "app-header/app-header.config.ts",
      role: "기본 breadcrumb·window 탭 샘플 데이터",
    },
    {
      file: "app-header/figma.ts",
      role: "Figma node-id · Variants 섹션 · 독스 노드 목록",
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

export function AppHeaderVariantsTable() {
  const rows = [
    { story: "Default", desc: "Type=Default — 중앙 비움" },
    { story: "Breadcrumb", desc: "Type=Breadcrumb — 경로" },
    { story: "Window", desc: "Type=Window — 멀티 윈도우 탭" },
  ];
  return (
    <table style={tableStyle}>
      <thead>
        <tr style={{ borderBottom: "1px solid var(--border)" }}>
          <th style={{ textAlign: "left", padding: "8px 12px", width: "28%" }}>
            스토리
          </th>
          <th style={{ textAlign: "left", padding: "8px 12px" }}>설명</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.story} style={{ borderBottom: "1px solid var(--border)" }}>
            <td style={{ padding: "8px 12px" }}>
              <strong>{r.story}</strong>
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
