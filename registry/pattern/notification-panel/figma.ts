/**
 * Inventis DS Notification panel — Figma 참조.
 * Variants: node 26791:101886 (❖ Notification panel — Alert Center / Queue)
 */

export const FIGMA_NOTIFICATION_FILE_KEY = "MvGuEwW5KUn5VcpSEWm2ve";

export const FIGMA_NOTIFICATION_FILE_BASE = `https://www.figma.com/design/${FIGMA_NOTIFICATION_FILE_KEY}/260303_Inventis-DS--Shadcn-ui`;

/** Variants 섹션 */
export const FIGMA_NOTIFICATION_VARIANTS_SECTION = "26791:101886";

/** 심볼 Property 1=Alert Center */
export const FIGMA_NOTIFICATION_PANEL_ALERT_CENTER = "26791:103785";

/** 심볼 Property 1=Queue */
export const FIGMA_NOTIFICATION_PANEL_QUEUE = "26791:103784";

/** 독스 프레임 (Light / Dark 예시) */
export const FIGMA_NOTIFICATION_DOC_FRAME = "26791:101998";

/** 전체 레이아웃 예시 — Alert Center */
export const FIGMA_NOTIFICATION_PAGE_ALERT_CENTER = "26791:46055";

/** 전체 레이아웃 예시 — Queue */
export const FIGMA_NOTIFICATION_PAGE_QUEUE = "26791:46354";

/**
 * 사용자 요청 node-id (문서 라벨·예시·Variants 포함).
 * 구현 축은 `FIGMA_NOTIFICATION_PANEL_ALERT_CENTER` / `FIGMA_NOTIFICATION_PANEL_QUEUE` 두 심볼입니다.
 */
export const FIGMA_NOTIFICATION_DOC_NODE_IDS = [
  "26791:46055",
  "26791:101886",
  "26791:101998",
  "26791:108730",
  "26791:46354",
  "26791:108726",
  "26791:108728",
] as const;

export function figmaNotificationNodeUrl(nodeId: string): string {
  return `${FIGMA_NOTIFICATION_FILE_BASE}?node-id=${encodeURIComponent(nodeId.replace(":", "-"))}&m=dev`;
}
