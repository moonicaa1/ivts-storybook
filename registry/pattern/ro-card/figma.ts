/**
 * Inventis DS RO Card — Figma 참조.
 * Variants: node 26837:1510 (Type=Default | Action | Schedule)
 */

export const FIGMA_RO_CARD_FILE_KEY = "MvGuEwW5KUn5VcpSEWm2ve";

export const FIGMA_RO_CARD_FILE_BASE = `https://www.figma.com/design/${FIGMA_RO_CARD_FILE_KEY}/260303_Inventis-DS--Shadcn-ui`;

export const FIGMA_RO_CARD_VARIANTS_SECTION = "26837:1510";

/** Type=Default */
export const FIGMA_RO_CARD_TYPE_DEFAULT = "26660:21178";

/** Type=Action */
export const FIGMA_RO_CARD_TYPE_ACTION = "26808:231302";

/** Type=Schedule */
export const FIGMA_RO_CARD_TYPE_SCHEDULE = "26808:232225";

/** RO Popover */
export const FIGMA_RO_CARD_POPOVER = "26808:248588";

/** 독스 페이지 */
export const FIGMA_RO_CARD_DOC_PAGE = "26837:1538";

/** 예시 페이지 */
export const FIGMA_RO_CARD_PAGE_DEFAULT = "26837:28366";
export const FIGMA_RO_CARD_PAGE_ACTION = "26837:29493";
export const FIGMA_RO_CARD_PAGE_SCHEDULE = "26837:30514";

export const FIGMA_RO_CARD_DOC_NODE_IDS = [
  "26837:1510",
  "26837:1979",
  "26837:1573",
  "26837:56295",
  "26837:1538",
  "26837:56296",
  "26837:30514",
  "26837:28366",
  "26837:29493",
] as const;

export function figmaRoCardNodeUrl(nodeId: string): string {
  return `${FIGMA_RO_CARD_FILE_BASE}?node-id=${encodeURIComponent(nodeId.replace(":", "-"))}&m=dev`;
}
