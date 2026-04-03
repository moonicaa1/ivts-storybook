import * as React from "react";

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "13px",
  margin: "16px 0",
};

/** MDX에서 파이프 표가 깨질 때 사용 — Storybook docs용 (MDX와 동일 폴더에 둠) */
export function NavigationSidebarCodeStructureTable() {
  const rows = [
    {
      file: "navigation-sidebar/InventisNavigationSidebar.tsx",
      role: "Figma Aside UI (`SidebarProvider` 하위)",
    },
    {
      file: "navigation-sidebar/navigation-sidebar.config.ts",
      role: "메뉴·유저·푸터 데이터 (`defaultInventisNavigationModel`)",
    },
    {
      file: "navigation-sidebar/figma.ts",
      role: "Figma node-id · URL",
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

export function NavigationSidebarVariantsTable() {
  const rows = [
    { story: "Expanded", desc: "`SidebarProvider` 기본 펼침" },
    { story: "Collapsed", desc: '아이콘 레일 (`collapsible="icon"` 권장)' },
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
