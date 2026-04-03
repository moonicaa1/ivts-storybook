/**
 * Inventis DS Kanban — Figma 레이어·프로퍼티 참조.
 * ❖ Kanban: `Collapsed=false` | `Collapsed=true`
 * Properties: Kanban/Header(State=Opened|Collapsed), Kanban/Cardwrap, Kanban/Footer, Drag here
 */

export const FIGMA_KANBAN_FILE_KEY = "MvGuEwW5KUn5VcpSEWm2ve";

export const FIGMA_KANBAN_FILE_BASE = `https://www.figma.com/design/${FIGMA_KANBAN_FILE_KEY}/260303_Inventis-DS--Shadcn-ui`;

/** Variants 섹션 ❖ Kanban */
export const FIGMA_KANBAN_VARIANTS_SECTION = "26791:108995";

/** 심볼 Collapsed=false */
export const FIGMA_KANBAN_EXPANDED = "26797:64430";

/** 심볼 Collapsed=true */
export const FIGMA_KANBAN_COLLAPSED = "26797:195676";

/** Properties 프레임 */
export const FIGMA_KANBAN_PROPERTIES = "26791:109066";

/** 독스 Kanban Board */
export const FIGMA_KANBAN_DOC_BOARD = "26791:109043";

/** 라벨 */
export const FIGMA_KANBAN_LABEL_EXAMPLE = "26791:109041";
export const FIGMA_KANBAN_LABEL_MINIMUM = "26791:109159";
export const FIGMA_KANBAN_LABEL_MAXIMUM = "26791:109374";
export const FIGMA_KANBAN_LABEL_OVERFLOW = "26791:112646";

/** Context: 3열 (Minimum) */
export const FIGMA_KANBAN_CONTEXT_MINIMUM = "26797:196482";

/** Context: 5열 (Maximum) */
export const FIGMA_KANBAN_CONTEXT_MAXIMUM = "26791:110939";

/** Context: 가로 오버플로 (OverFlow) */
export const FIGMA_KANBAN_CONTEXT_OVERFLOW = "26797:207316";

export const FIGMA_KANBAN_DOC_NODE_IDS = [
  "26791:108995",
  "26791:109043",
  "26791:112646",
  "26791:109159",
  "26797:207316",
  "26797:196482",
  "26791:109041",
  "26791:109066",
  "26791:110939",
  "26791:109374",
] as const;

export function figmaKanbanNodeUrl(nodeId: string): string {
  return `${FIGMA_KANBAN_FILE_BASE}?node-id=${encodeURIComponent(nodeId.replace(":", "-"))}&m=dev`;
}
