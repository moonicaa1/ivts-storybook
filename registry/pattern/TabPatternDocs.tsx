import type { CSSProperties } from "react";

import {
  FIGMA_TAB_DOC_EXAMPLE_URL,
  FIGMA_TAB_DOC_TAB_FLOW_URL,
  FIGMA_TAB_NODE,
  FIGMA_TABS_FILE_BASE,
  figmaTabNodeUrl,
} from "./tab/figma";

const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "13px",
  margin: "16px 0",
};

const thStyle: CSSProperties = {
  textAlign: "left",
  padding: "8px 12px",
  borderBottom: "1px solid var(--border)",
};

const tdStyle: CSSProperties = {
  padding: "8px 12px",
  borderBottom: "1px solid var(--border)",
  verticalAlign: "top",
};

/** Figma 5노드 ↔ 스토리북 스토리 (Filter Variants 표와 동일 스타일) */
export function TabFigmaFramesTable() {
  const rows: {
    order: number;
    nodeKey: keyof typeof FIGMA_TAB_NODE;
    title: string;
    story: string;
  }[] = [
    {
      order: 1,
      nodeKey: "variants",
      title: "Variants — Default / Line / Vertical",
      story: "Variants",
    },
    {
      order: 2,
      nodeKey: "triggerProps",
      title: "Properties — Tabs / Trigger",
      story: "Trigger properties",
    },
    {
      order: 3,
      nodeKey: "lineOverview",
      title: "Tabs/Line 페이지 — Overview 활성",
      story: "Line · Overview",
    },
    {
      order: 4,
      nodeKey: "pattern",
      title: "Pattern — Light / Dark 프리뷰",
      story: "Pattern",
    },
    {
      order: 5,
      nodeKey: "lineJobs",
      title: "Tabs/Line 페이지 — Jobs 활성",
      story: "Line · Jobs",
    },
  ];

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={{ ...thStyle, width: "44px" }}>#</th>
          <th style={{ ...thStyle, width: "22%" }}>노드 ID</th>
          <th style={thStyle}>Figma 구역</th>
          <th style={{ ...thStyle, width: "28%" }}>스토리북 스토리</th>
          <th style={{ ...thStyle, width: "72px" }}>열기</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const nodeId = FIGMA_TAB_NODE[r.nodeKey];
          const href = figmaTabNodeUrl(nodeId);
          return (
            <tr key={r.nodeKey}>
              <td style={tdStyle}>
                <strong>{r.order}</strong>
              </td>
              <td
                style={{
                  ...tdStyle,
                  fontFamily: "ui-monospace, monospace",
                  fontSize: "12px",
                }}
              >
                {nodeId}
              </td>
              <td style={{ ...tdStyle, color: "var(--muted-foreground)" }}>
                {r.title}
              </td>
              <td style={tdStyle}>
                <strong>{r.story}</strong>
              </td>
              <td style={tdStyle}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                >
                  Figma
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function TabPatternCodeStructureTable() {
  const rows = [
    {
      file: "tab/InventisTabsLine.tsx",
      role: "본문 **Line** 탭 + 패널 (`max-w-[1320px]`)",
    },
    {
      file: "tab/InventisTabsFigmaFrames.tsx",
      role: "Figma 6787·6920·6901 + Line Overview/Jobs 셸",
    },
    {
      file: "tab-pattern.stories.tsx",
      role: "위 5 Figma 스토리 + Playground + 숨김 북마크(`TabsLine*`)",
    },
    {
      file: "tab/figma.ts",
      role: "`FIGMA_TAB_NODE` · `figmaTabNodeUrl()` · 문서 전용 `FIGMA_TAB_DOC_EXAMPLE_URL` · `FIGMA_TAB_DOC_TAB_FLOW_URL`",
    },
    {
      file: "@/bases/radix/components/ui/tabs",
      role: "[Tabs](https://ui.shadcn.com/docs/components/tabs)",
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

export function TabIntroLinks() {
  return (
    <div
      style={{
        fontSize: "14px",
        color: "var(--muted-foreground)",
        marginBottom: "16px",
      }}
    >
      <p style={{ margin: "0 0 8px" }}>
        <strong>Figma 파일:</strong>{" "}
        <a href={FIGMA_TABS_FILE_BASE} target="_blank" rel="noreferrer">
          260303 Inventis DS (Shadcn ui)
        </a>
      </p>
      <p style={{ margin: "0 0 8px", fontSize: "13px", lineHeight: 1.5 }}>
        노드 <code style={{ fontSize: "12px" }}>26779-6899</code> 는 DS 문서의
        「Example」
        <strong>타이틀 바</strong>만 있어 스토리에 넣지 않습니다.{" "}
        <a href={FIGMA_TAB_DOC_EXAMPLE_URL} target="_blank" rel="noreferrer">
          Figma
        </a>
      </p>
      <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.5 }}>
        노드 <code style={{ fontSize: "12px" }}>26779-12390</code> 는 「Tab
        Flow」
        <strong>섹션 띠</strong>(문서 장식)일 뿐 탭 컴포넌트가 아니므로
        스토리에서 제외했습니다.{" "}
        <a href={FIGMA_TAB_DOC_TAB_FLOW_URL} target="_blank" rel="noreferrer">
          Figma
        </a>
      </p>
    </div>
  );
}
