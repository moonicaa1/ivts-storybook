/** Inventis DS — Status Badge & 관련 프레임 (동일 파일) */
export const FIGMA_STATUS_BADGE_FILE_KEY = "MvGuEwW5KUn5VcpSEWm2ve";

export const FIGMA_STATUS_BADGE_FILE_BASE = `https://www.figma.com/design/${FIGMA_STATUS_BADGE_FILE_KEY}/260303_Inventis-DS--Shadcn-ui`;

/** 요청하신 24개 node-id (URL 형식 그대로) */
export const FIGMA_STATUS_BADGE_NODE_IDS = [
  "26867-64152",
  "26863-28108",
  "26867-59615",
  "26867-59529",
  "26867-59712",
  "26867-59616",
  "26867-63919",
  "26867-63920",
  "26837-56607",
  "26867-63834",
  "26867-63769",
  "26867-63595",
  "26867-63515",
  "26867-63514",
  "26867-64150",
  "26837-56552",
  "26867-63474",
  "26867-63433",
  "26867-64151",
  "26837-56524",
  "26837-56609",
  "26867-63594",
  "26867-64149",
  "26863-28021",
] as const;

/** 문서에서 자주 쓰는 앵커 */
export const FIGMA_STATUS_BADGE_NODE = {
  /** Properties — Status Badge 12색 */
  properties: "26863-28021",
  /** RO 카드 내 Status Badge (teal Assigned) */
  roCard: "26867-63594",
} as const;

export function figmaStatusBadgeNodeUrl(nodeId: string): string {
  return `${FIGMA_STATUS_BADGE_FILE_BASE}?node-id=${nodeId}&m=dev`;
}
