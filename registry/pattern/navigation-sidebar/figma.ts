/**
 * Inventis DS Navigation Sidebar — Figma 참조.
 * (`.stories.tsx`에 두면 CSF가 스토리로 오인할 수 있어 분리)
 */

export const FIGMA_FILE_KEY = "MvGuEwW5KUn5VcpSEWm2ve";

export const FIGMA_FILE_BASE = `https://www.figma.com/design/${FIGMA_FILE_KEY}/260303_Inventis-DS--Shadcn-ui`;

/** 대표 Aside 프레임 */
export const FIGMA_PRIMARY_NODE_ID = "26762-148088";

/** 디자인 스펙·프로퍼티 참조용 노드 (별도 패턴 아님) */
export const FIGMA_NAVIGATION_SIDEBAR_NODE_IDS = [
  "26762-251477",
  "26753-48448",
  "26762-267342",
  "26762-267054",
  "26762-312721",
  "26762-203430",
  "26762-89369",
  "26762-203963",
  "26753-48452",
  "26753-48267",
  "26762-236181",
  "26756-106027",
  "26753-48451",
  "26762-236413",
  "5198-982",
  "26753-48450",
  "26762-178863",
] as const;

export function figmaNodeUrl(nodeId: string): string {
  return `${FIGMA_FILE_BASE}?node-id=${encodeURIComponent(nodeId)}&m=dev`;
}
