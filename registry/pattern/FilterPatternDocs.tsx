import * as React from "react";

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "13px",
  margin: "16px 0",
};

export function FilterCodeStructureTable() {
  const rows = [
    {
      file: "filter/InventisFilterBar.tsx",
      role: "`data-slot=filter-bar` · `Tabs`(Day/Week) · `ButtonGroup`+`Button`(날짜·세그먼트·네비·검색) · `Input` · `ToggleGroup`(뷰)",
    },
    {
      file: "filter/figma.ts",
      role: "Figma 파일 베이스 URL (`FIGMA_FILTER_FILE_BASE`)",
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

export function FilterVariantsTable() {
  const rows = [
    {
      sidebarLabel: "Default",
      context: "보드 폭(1320) 근처",
      desc: "전체 컨트롤 한 줄 · 데모 상태 연동",
    },
    {
      sidebarLabel: "Narrow wrap",
      context: "max-w-xl",
      desc: "좁은 폭에서 flex-wrap 동작 확인",
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
            컨텍스트
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
              {r.context}
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
