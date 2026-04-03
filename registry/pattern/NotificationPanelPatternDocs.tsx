import * as React from "react";

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "13px",
  margin: "16px 0",
};

export function NotificationPanelCodeStructureTable() {
  const rows = [
    {
      file: "notification-panel/InventisNotificationPanel.tsx",
      role: "패널 UI (`variant` · Tabs · InputGroup · 목록)",
    },
    {
      file: "notification-panel/notification-panel.config.ts",
      role: "탭 정의 · 샘플 메시지/큐 RO 데이터(`queueTabKey`) · 필터",
    },
    {
      file: "ro-card/InventisRoCard.tsx",
      role: "Queue 목록 카드 (Pattern/RO Card와 공유)",
    },
    {
      file: "notification-panel/figma.ts",
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

export function NotificationPanelVariantsTable() {
  const rows = [
    { story: "AlertCenter", desc: "Property 1=Alert Center — 메시지 카드" },
    {
      story: "Queue",
      desc: "Property 1=Queue — `InventisRoCard` Type=Action/Schedule + 탭 필터",
    },
    {
      story: "With layout chrome",
      desc: "64px 레일 + 패널 + 메인 (페이지 예시)",
    },
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
