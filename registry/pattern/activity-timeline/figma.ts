/** Inventis DS — Activity Timeline */
export const FIGMA_ACTIVITY_TIMELINE_FILE_KEY = "MvGuEwW5KUn5VcpSEWm2ve";

export const FIGMA_ACTIVITY_TIMELINE_FILE_BASE = `https://www.figma.com/design/${FIGMA_ACTIVITY_TIMELINE_FILE_KEY}/260303_Inventis-DS--Shadcn-ui`;

export const FIGMA_ACTIVITY_TIMELINE_NODE = {
  variants: "26837-60707",
  variantsGrid: "26863-42243",
  pattern: "26837-60735",
  properties: "26867-52338",
  pageVertical: "26837-60770",
  pageHorizontal: "26837-60752",
} as const;

export function figmaActivityTimelineNodeUrl(nodeId: string): string {
  return `${FIGMA_ACTIVITY_TIMELINE_FILE_BASE}?node-id=${nodeId}&m=dev`;
}
