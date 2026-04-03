import * as React from "react";

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "13px",
  margin: "16px 0",
};

export function KanbanCodeStructureTable() {
  const rows = [
    {
      file: "kanban/InventisKanbanColumn.tsx",
      role: "`Collapsed` ↔ `defaultCollapsed` · `Kanban/Header` · `ScrollArea` + `data-slot=kanban-cardwrap` · `Kanban/Footer` · `Drag here`",
    },
    {
      file: "kanban/KanbanPlaygroundDnd.tsx",
      role: "스토리북 Playground 전용 — `@dnd-kit` 열 간 카드 이동(카드 전체 드래그)",
    },
    {
      file: "kanban/kanban-playground-initial.ts",
      role: "Playground 초기 열·카드 데이터(`_id` 고정)",
    },
    {
      file: "kanban/figma.ts",
      role: "요청 node-id · Variants(`26791:108995`) · Context Minimum/Maximum/Overflow",
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

/** Figma 레이어·심볼 프로퍼티 ↔ 구현 (독스 본문용) */
export function KanbanFigmaMappingTable() {
  const rows = [
    {
      figma: "심볼 `Collapsed`",
      code: "`defaultCollapsed` · 내부 state · `data-collapsed`",
      note: "`false` 전체 열 · `true` 52px 레일",
    },
    {
      figma: "`Kanban/Header` (Opened)",
      code: '`data-slot="kanban-header"` · `data-state="opened"`',
      note: "접기 · 제목 · 추가(Plus)",
    },
    {
      figma: "`Kanban/Header` (Collapsed)",
      code: '`data-slot="kanban-header"` · `data-state="collapsed"`',
      note: "펼치기 셰브론만",
    },
    {
      figma: "`Kanban/Cardwrap`",
      code: '`ScrollArea` + `data-slot="kanban-cardwrap"`',
      note: "`children` 이 카드 슬롯",
    },
    {
      figma: "`Drag here`",
      code: '`showDragHere` · `dragHereLabel` · `data-slot="kanban-drag-here"`',
      note: "접힘일 때 숨김",
    },
    {
      figma: "`Kanban/Footer`",
      code: '`footer` · `totalLabel` / `totalValue` · `data-slot="kanban-footer"`',
      note: "접힘일 때 숨김",
    },
    {
      figma: "열 폭 (심볼)",
      code: "`grow` · `className`",
      note: "`grow`: Minimum 3열 등 flex 균등 · 기본 ~248.8px",
    },
  ];
  return (
    <table style={tableStyle}>
      <thead>
        <tr style={{ borderBottom: "1px solid var(--border)" }}>
          <th style={{ textAlign: "left", padding: "8px 12px", width: "28%" }}>
            Figma
          </th>
          <th style={{ textAlign: "left", padding: "8px 12px", width: "34%" }}>
            코드
          </th>
          <th style={{ textAlign: "left", padding: "8px 12px" }}>비고</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.figma} style={{ borderBottom: "1px solid var(--border)" }}>
            <td
              style={{
                padding: "8px 12px",
                verticalAlign: "top",
                fontSize: "12px",
              }}
            >
              <code>{r.figma}</code>
            </td>
            <td
              style={{
                padding: "8px 12px",
                verticalAlign: "top",
                fontSize: "12px",
                color: "var(--muted-foreground)",
              }}
            >
              {r.code}
            </td>
            <td
              style={{
                padding: "8px 12px",
                verticalAlign: "top",
                color: "var(--muted-foreground)",
              }}
            >
              {r.note}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** 사이드바(북마크) 표기·순서 = `kanban-pattern.stories.tsx` export 순서와 동일 */
export function KanbanVariantsTable() {
  const rows = [
    {
      sidebarLabel: "Playground",
      figma: "26791:110939",
      desc: "Context Maximum · 크롬·5열·RO 카드 — @dnd-kit 열 간 드래그",
    },
    {
      sidebarLabel: "Expanded",
      figma: "Collapsed=false",
      desc: "단일 열 · 슬롯 · Controls 연동",
    },
    {
      sidebarLabel: "Collapsed",
      figma: "Collapsed=true",
      desc: "52px 레일, 펼치기(우측 셰브론)",
    },
    {
      sidebarLabel: "With RO cards",
      figma: "Cardwrap + RO 카드",
      desc: "`InventisRoCard` 를 자식으로 넣은 예시",
    },
    {
      sidebarLabel: "Board minimum",
      figma: "26797:196482",
      desc: "3열 `flex-1` 균등, 필터 스텁",
    },
    {
      sidebarLabel: "Board maximum",
      figma: "26791:110939",
      desc: "5열 고정 ~257.6px",
    },
    {
      sidebarLabel: "Board overflow",
      figma: "26797:207316",
      desc: "가로 스크롤, 열 ~300.8px",
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
