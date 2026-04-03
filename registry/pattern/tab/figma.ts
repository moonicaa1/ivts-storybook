/** Inventis DS — Tabs (260303_Inventis-DS--Shadcn-ui) */
export const FIGMA_TABS_FILE_KEY = "MvGuEwW5KUn5VcpSEWm2ve";

export const FIGMA_TABS_FILE_BASE = `https://www.figma.com/design/${FIGMA_TABS_FILE_KEY}/260303_Inventis-DS--Shadcn-ui`;

/**
 * 스토리북으로 옮긴 Figma 노드 (재사용 UI·페이지·스펙).
 * 문서 전용 장식만 있는 노드는 제외: `FIGMA_TAB_DOC_EXAMPLE_URL`, `FIGMA_TAB_DOC_TAB_FLOW_URL`.
 */
export const FIGMA_TAB_NODE = {
  /** Variants — Default / Line / Vertical */
  variants: "26779-6787",
  /** Properties — Tabs / Trigger */
  triggerProps: "26779-6920",
  /** Tabs/Line 페이지 — Overview 활성 */
  lineOverview: "26779-12391",
  /** Pattern — Light/Dark 프리뷰 카드 */
  pattern: "26779-6901",
  /** Tabs/Line 페이지 — Jobs 활성 */
  lineJobs: "26787-33252",
} as const;

/** 문서 페이지 장식용 “Example” 라벨 — 컴포넌트 패턴 아님 */
export const FIGMA_TAB_DOC_EXAMPLE_NODE = "26779-6899";

/** 문서 페이지 「Tab Flow」 섹션 띠 — 컴포넌트 패턴 아님 */
export const FIGMA_TAB_DOC_TAB_FLOW_NODE = "26779-12390";

export function figmaTabNodeUrl(nodeId: string): string {
  return `${FIGMA_TABS_FILE_BASE}?node-id=${nodeId}&m=dev`;
}

export const FIGMA_TABS_URL_VARIANTS = figmaTabNodeUrl(FIGMA_TAB_NODE.variants);
export const FIGMA_TABS_URL_TRIGGER_PROPS = figmaTabNodeUrl(
  FIGMA_TAB_NODE.triggerProps,
);
export const FIGMA_TABS_URL_LINE_OVERVIEW = figmaTabNodeUrl(
  FIGMA_TAB_NODE.lineOverview,
);
export const FIGMA_TABS_URL_PATTERN = figmaTabNodeUrl(FIGMA_TAB_NODE.pattern);
export const FIGMA_TABS_URL_LINE_JOBS = figmaTabNodeUrl(
  FIGMA_TAB_NODE.lineJobs,
);
export const FIGMA_TAB_DOC_EXAMPLE_URL = figmaTabNodeUrl(
  FIGMA_TAB_DOC_EXAMPLE_NODE,
);
export const FIGMA_TAB_DOC_TAB_FLOW_URL = figmaTabNodeUrl(
  FIGMA_TAB_DOC_TAB_FLOW_NODE,
);
