"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { fn } from "storybook/test";

import { Button } from "@/bases/radix/components/ui/button";
import { cn } from "@/bases/radix/lib/utils";

import {
  InventisFilterBar,
  useInventisFilterDemoState,
} from "./filter/InventisFilterBar";
import {
  InventisSearchInputGroup,
  inventisSearchGroupSegmentClass,
} from "./filter/InventisSearchInputGroup";
import {
  FIGMA_BUTTON_GROUP_PLAYGROUND_URL,
  FIGMA_COMPONENTS_BUTTON_GROUP_SECTION_URL,
  FIGMA_FILTER_BAR_DEV_URL,
  FIGMA_FILTER_FILE_BASE,
  FIGMA_SEARCH_INPUT_GROUP_DEV_URL,
} from "./filter/figma";

const meta = {
  id: "pattern-filter",
  title: "Pattern/Filter",
  component: InventisFilterBar,
  tags: ["!autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Inventis DS **Filter** — Figma MCP \`26824:299600\`: 한 줄 \`justify-between\` · \`max-w-[1320px]\` · 좌 Time scale(\`flex-1\`) · 중 Filter Serch(Input+Button×5+검색) · 우 Columns+Toggle. \`showTimeScale={false}\` = Variant2. [링크](${FIGMA_FILTER_BAR_DEV_URL}) · [파일](${FIGMA_FILTER_FILE_BASE})`,
      },
    },
  },
  args: {
    showTimeScale: true,
    timeScale: "day",
    onTimeScaleChange: fn(),
    dateLabel: "10 Mar 2026",
    periodLabel: "This Week",
    searchValue: "",
    onSearchChange: fn(),
    viewMode: "calendar",
    onViewModeChange: fn(),
    activeFilterCount: 0,
    onFilterClick: fn(),
    onColumnsClick: fn(),
    onDatePickerClick: fn(),
    onPrevPeriod: fn(),
    onNextPeriod: fn(),
    onSearchSubmit: fn(),
    onDateToolbarSegmentClick: fn(),
    onSearchToolbarSegmentClick: fn(),
  },
} satisfies Meta<typeof InventisFilterBar>;

export default meta;

type Story = StoryObj<typeof meta>;

function FilterDemo(
  props: Partial<React.ComponentProps<typeof InventisFilterBar>>,
) {
  const { barProps } = useInventisFilterDemoState();
  return <InventisFilterBar {...barProps} {...props} />;
}

/** Figma MCP — 타임스케일 ON: 단일 툴바 행 */
export const Default: Story = {
  name: "Default",
  render: () => (
    <div className="bg-background w-full max-w-[1320px] overflow-x-auto p-4">
      <FilterDemo />
    </div>
  ),
};

/** 좁은 컨테이너에서 줄바꿈 동작 확인 */
export const NarrowWrap: Story = {
  name: "Narrow wrap",
  render: () => (
    <div className="bg-background w-full max-w-xl overflow-x-auto p-4">
      <FilterDemo />
    </div>
  ),
};

/** Figma Filter Variant2 — 타임스케일 없이 검색·Filter·Columns·뷰만 */
export const CompactNoTimeScale: Story = {
  name: "Compact (no time scale)",
  render: () => (
    <div className="bg-background w-full max-w-[1320px] overflow-x-auto p-4">
      <FilterDemo showTimeScale={false} />
    </div>
  ),
};

/** Figma ButtonGroup + Input — end / start / both (18710:87287, 18707:209305, 18707:209304) */
export const SearchInputGroupVariants: Story = {
  name: "Search input group (Figma)",
  render: function SearchInputGroupPreview() {
    const [a, setA] = React.useState("");
    const [b, setB] = React.useState("");
    const [c, setC] = React.useState("");
    const seg = ["A", "B"] as const;
    return (
      <div className="bg-background space-y-6 p-4">
        <p className="text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 text-sm">
          <a
            className="underline"
            href={FIGMA_SEARCH_INPUT_GROUP_DEV_URL}
            target="_blank"
            rel="noreferrer"
          >
            ButtonGroup + Input (18710:87287)
          </a>
          <a
            className="underline"
            href={FIGMA_BUTTON_GROUP_PLAYGROUND_URL}
            target="_blank"
            rel="noreferrer"
          >
            Button group playground
          </a>
          <a
            className="underline"
            href={FIGMA_COMPONENTS_BUTTON_GROUP_SECTION_URL}
            target="_blank"
            rel="noreferrer"
          >
            Components section
          </a>
        </p>
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Placement end (Filter 기본 — Columns 같은 trailingSlot 동일 pill)
          </p>
          <InventisSearchInputGroup
            placement="end"
            value={a}
            onChange={setA}
            onSubmit={() => {}}
            trailingSegments={[...seg]}
            onTrailingSegmentClick={() => {}}
            trailingSlot={
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn(
                  inventisSearchGroupSegmentClass,
                  "pointer-events-none gap-1",
                )}
                tabIndex={-1}
                aria-hidden
              >
                Columns
                <ChevronDown className="size-4 opacity-70" />
              </Button>
            }
            className="max-w-md"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Placement start</p>
          <InventisSearchInputGroup
            placement="start"
            value={b}
            onChange={setB}
            leadingSegments={[...seg]}
            onLeadingSegmentClick={() => {}}
            className="max-w-md"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Placement both</p>
          <InventisSearchInputGroup
            placement="both"
            value={c}
            onChange={setC}
            leadingSegments={["L1"]}
            trailingSegments={["R1", "R2"]}
            className="max-w-md"
          />
        </div>
      </div>
    );
  },
};

export const __namedExportsOrder = [
  "Default",
  "SearchInputGroupVariants",
  "CompactNoTimeScale",
  "NarrowWrap",
];
