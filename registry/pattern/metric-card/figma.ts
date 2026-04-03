/** Inventis DS — Metric Card (260303_Inventis-DS--Shadcn-ui) */
export const FIGMA_METRIC_CARD_FILE_KEY = "MvGuEwW5KUn5VcpSEWm2ve";

export const FIGMA_METRIC_CARD_FILE_BASE = `https://www.figma.com/design/${FIGMA_METRIC_CARD_FILE_KEY}/260303_Inventis-DS--Shadcn-ui`;

export const FIGMA_METRIC_CARD_NODE = {
  /** Metric Card/Minimum — 필터 행 2열 */
  pageMinimum: "26824-364486",
  /** Metric Card/Maximum — 필터 행 4열 */
  pageMaximum: "26824-373175",
  /** Pattern — Light / Dark 프리뷰 */
  pattern: "26824-373652",
  /** Variants — Type=Default | Compact */
  variants: "26824-373540",
  /** Type=Default */
  typeDefault: "26824-363044",
  /** Type=Compact */
  typeCompact: "26824-363143",
} as const;

export function figmaMetricCardNodeUrl(nodeId: string): string {
  return `${FIGMA_METRIC_CARD_FILE_BASE}?node-id=${nodeId}&m=dev`;
}
