/**
 * Inventis DS App Header — Figma 참조.
 * Variants 섹션: node 26762:314488 (❖ Header 3종)
 */

export const FIGMA_HEADER_FILE_KEY = "MvGuEwW5KUn5VcpSEWm2ve";

export const FIGMA_HEADER_FILE_BASE = `https://www.figma.com/design/${FIGMA_HEADER_FILE_KEY}/260303_Inventis-DS--Shadcn-ui`;

/** Variants 프레임 (Default / Breadcrumb / Window 행) */
export const FIGMA_HEADER_VARIANTS_SECTION = "26762:314488";

/** 심볼: Type=Default */
export const FIGMA_HEADER_TYPE_DEFAULT = "26762:322989";

/** 심볼: Type=Breadcrumb */
export const FIGMA_HEADER_TYPE_BREADCRUMB = "26762:322988";

/** 심볼: Type=Window */
export const FIGMA_HEADER_TYPE_WINDOW = "26762:322990";

/** Window Tab 프로퍼티 섹션 */
export const FIGMA_HEADER_WINDOW_TAB_PROPERTIES = "26762:314715";

/** NavItem 스펙 카드 (독스 참고용) */
export const FIGMA_HEADER_NAV_ITEM_SPEC = "26762:315157";

/**
 * 독스/스펙 라벨에 해당하는 노드-id (Figma Pages 트리와 동일).
 * 구현 검증·피그마 동기화 시 참고.
 */
export const FIGMA_HEADER_DOC_NODE_IDS = [
  "26762:314688", // Example
  "26762:314690", // Default
  "26762:314691", // Breadcrumb
  "26762:314692", // createOpen
  "26762:314695", // Window
  "26762:327698",
  "26762:315157", // NavItem spec
  "26762:314488", // Variants
  "26762:314696",
  "26762:327996",
  "26762:314715", // Properties / Window Tab
  "26762:328294",
  "26762:327391",
] as const;

export function figmaHeaderNodeUrl(nodeId: string): string {
  return `${FIGMA_HEADER_FILE_BASE}?node-id=${encodeURIComponent(nodeId.replace(":", "-"))}&m=dev`;
}
