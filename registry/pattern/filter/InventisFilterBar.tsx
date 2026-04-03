"use client";

/**
 * Figma `26824:299600` Filter 레이아웃. MCP 출력에 있는 `"Button"`·`3/4/4` 는 **디자인 파일 placeholder**일 뿐이며
 * 기본 UI에는 넣지 않음 — `dateToolbarSegments` / `searchToolbarSegments` / `weekColumnLabels` 를 준 경우에만 렌더.
 */

import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/bases/radix/components/ui/button";
import { ButtonGroup } from "@/bases/radix/components/ui/button-group";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/bases/radix/components/ui/tabs";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/bases/radix/components/ui/toggle-group";
import { cn } from "@/bases/radix/lib/utils";

import {
  InventisSearchInputGroup,
  inventisSearchGroupSegmentClass,
} from "./InventisSearchInputGroup";

export type InventisFilterTimeScale = "day" | "week";
export type InventisFilterViewMode = "calendar" | "chart";

export type InventisFilterBarProps = {
  className?: string;
  /** MCP `type`: `"has Timescale"` | `"Variant2"` */
  showTimeScale?: boolean;
  timeScale: InventisFilterTimeScale;
  onTimeScaleChange: (v: InventisFilterTimeScale) => void;
  dateLabel: string;
  /** 날짜와 chevron 사이 추가 세그먼트. 비우면 Figma placeholder `Button`×N 은 렌더하지 않음. */
  dateToolbarSegments?: string[];
  onDateToolbarSegmentClick?: (index: number) => void;
  onDatePickerClick?: () => void;
  periodLabel: string;
  /** `Today` 와 다음 화살표 사이 주·일 셀. 비우면 `< · Today · >` 만. */
  weekColumnLabels?: string[];
  onPrevPeriod?: () => void;
  onNextPeriod?: () => void;
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (v: string) => void;
  /** 검색창과 돋보기 사이 버튼. 비우면 Input+검색만. */
  searchToolbarSegments?: string[];
  onSearchToolbarSegmentClick?: (index: number) => void;
  onSearchSubmit?: () => void;
  activeFilterCount?: number;
  onFilterClick?: () => void;
  onColumnsClick?: () => void;
  viewMode: InventisFilterViewMode;
  onViewModeChange: (v: InventisFilterViewMode) => void;
};

const H32 = "h-8 min-h-8";
/** MCP: rounded-lg 10px — 그룹 양끝 */
const LG_L = "rounded-l-lg rounded-r-none";
const LG_M = "rounded-none";
const LG_R = "rounded-r-lg rounded-l-none";
/** MCP: Filter/Columns — rounded-md 8px (outline 버튼) */
const mdOutline = cn(
  H32,
  "shrink-0 gap-1.5 rounded-md px-2.5 text-sm font-medium shadow-xs",
);

/** MCP `FilterSerch` — Input + (옵션 세그먼트) + 검색 */
function FilterSerch(props: {
  className?: string;
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (v: string) => void;
  searchToolbarSegments: string[];
  onSearchToolbarSegmentClick?: (i: number) => void;
  onSearchSubmit?: () => void;
  filterCta: string;
  onFilterClick?: () => void;
  /** true 이면 검색 그룹이 가로로 늘어남 (Variant2 등) */
  searchGrow?: boolean;
  onColumnsClick?: () => void;
}) {
  const {
    className,
    searchPlaceholder,
    searchValue,
    onSearchChange,
    searchToolbarSegments,
    onSearchToolbarSegmentClick,
    onSearchSubmit,
    filterCta,
    onFilterClick,
    searchGrow,
    onColumnsClick,
  } = props;

  const columnsInShell =
    onColumnsClick != null ? (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          inventisSearchGroupSegmentClass,
          "inline-flex gap-1 px-2.5 font-medium",
        )}
        data-name="Button"
        onClick={onColumnsClick}
      >
        Columns
        <ChevronDown className="size-4 opacity-70" />
      </Button>
    ) : null;

  return (
    <div
      className={cn(
        "relative flex min-w-0 items-center gap-4 pr-4 pl-0",
        searchGrow ? "w-full min-w-0 flex-1" : "shrink-0",
        className,
      )}
      data-name="Filter Serch"
    >
      <InventisSearchInputGroup
        placement="end"
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
        trailingSegments={searchToolbarSegments}
        onTrailingSegmentClick={onSearchToolbarSegmentClick}
        trailingSlot={columnsInShell}
        className={cn(searchGrow ? "max-w-none min-w-0 flex-1" : "shrink-0")}
      />

      <Button
        type="button"
        variant="outline"
        size="sm"
        className={cn(mdOutline, "shrink-0")}
        data-name="Button"
        onClick={onFilterClick}
      >
        {filterCta}
        <ChevronDown className="size-4 opacity-70" />
      </Button>
    </div>
  );
}

/** MCP `TimeScale` */
function TimeScale(props: {
  className?: string;
  timeScale: InventisFilterTimeScale;
  onTimeScaleChange: (v: InventisFilterTimeScale) => void;
  dateLabel: string;
  dateToolbarSegments: string[];
  onDateToolbarSegmentClick?: (i: number) => void;
  onDatePickerClick?: () => void;
  periodLabel: string;
  weekColumnLabels: string[];
  onPrevPeriod?: () => void;
  onNextPeriod?: () => void;
}) {
  const {
    className,
    timeScale,
    onTimeScaleChange,
    dateLabel,
    dateToolbarSegments,
    onDateToolbarSegmentClick,
    onDatePickerClick,
    periodLabel,
    weekColumnLabels,
    onPrevPeriod,
    onNextPeriod,
  } = props;

  return (
    <div
      className={cn(
        "relative flex shrink-0 flex-wrap items-center gap-4",
        className,
      )}
      data-node-id="26797:16672"
    >
      <Tabs
        value={timeScale}
        onValueChange={(v) => onTimeScaleChange(v as InventisFilterTimeScale)}
        className="w-fit shrink-0"
      >
        <TabsList
          className={cn(H32, "bg-muted gap-0 rounded-lg p-[3px]")}
          variant="default"
          data-name="Tabs"
        >
          <TabsTrigger
            value="day"
            className="h-full min-h-0 rounded-md px-1.5 py-1 text-sm font-medium shadow-sm"
            data-name="Tabs / Trigger"
          >
            Day
          </TabsTrigger>
          <TabsTrigger
            value="week"
            className="text-muted-foreground h-full min-h-0 rounded-md px-1.5 py-1 text-sm font-medium"
            data-name="Tabs / Trigger"
          >
            Week
          </TabsTrigger>
        </TabsList>
        <TabsContent value="day" className="hidden" aria-hidden tabIndex={-1} />
        <TabsContent
          value="week"
          className="hidden"
          aria-hidden
          tabIndex={-1}
        />
      </Tabs>

      <ButtonGroup
        className="relative flex shrink-0 items-start shadow-xs"
        data-name="ButtonGroup"
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn(H32, LG_L, "px-2.5 text-sm font-medium")}
          data-name="Button"
        >
          {dateLabel}
        </Button>
        {dateToolbarSegments.map((label, i) => (
          <Button
            key={i}
            type="button"
            variant="outline"
            size="sm"
            className={cn(H32, LG_M, "px-2.5 text-sm font-medium")}
            data-name="Button"
            onClick={() => onDateToolbarSegmentClick?.(i)}
          >
            {label}
          </Button>
        ))}
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className={cn(H32, "size-8 shrink-0", LG_R)}
          data-name="Button"
          onClick={onDatePickerClick}
          aria-label="Date options"
        >
          <ChevronDown className="size-4" />
        </Button>
      </ButtonGroup>

      <div className="flex flex-row items-center self-stretch">
        <ButtonGroup
          className="relative flex h-8 shrink-0 items-stretch shadow-xs"
          data-name="ButtonGroup"
        >
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className={cn("aspect-square h-full min-h-8 w-8 shrink-0", LG_L)}
            data-name="Button"
            onClick={onPrevPeriod}
            aria-label="Previous"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(H32, "rounded-none px-2.5 text-xs font-medium")}
            data-name="Button"
          >
            {periodLabel}
          </Button>
          {weekColumnLabels.map((c, i) => (
            <Button
              key={i}
              type="button"
              variant="outline"
              size="sm"
              className={cn(
                "h-7 min-h-7 rounded-none px-2.5 text-xs font-medium",
              )}
              data-name="Button"
            >
              {c}
            </Button>
          ))}
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className={cn("aspect-square h-full min-h-8 w-8 shrink-0", LG_R)}
            data-name="Button"
            onClick={onNextPeriod}
            aria-label="Next"
          >
            <ChevronRight className="size-4" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

/** MCP `Filter` root */
export function InventisFilterBar({
  className,
  showTimeScale = true,
  timeScale,
  onTimeScaleChange,
  dateLabel,
  dateToolbarSegments: dateToolbarSegmentsProp,
  onDateToolbarSegmentClick,
  onDatePickerClick,
  periodLabel,
  weekColumnLabels: weekProp,
  onPrevPeriod,
  onNextPeriod,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  searchToolbarSegments: searchSegProp,
  onSearchToolbarSegmentClick,
  onSearchSubmit,
  activeFilterCount = 0,
  onFilterClick,
  onColumnsClick,
  viewMode,
  onViewModeChange,
}: InventisFilterBarProps) {
  const filterCta = `Filter (${activeFilterCount})`;
  const dateToolbarSegments = dateToolbarSegmentsProp ?? [];
  const searchToolbarSegments = searchSegProp ?? [];
  const weekColumnLabels = weekProp ?? [];

  const filterSerch = (searchGrow?: boolean) => (
    <FilterSerch
      searchGrow={searchGrow}
      searchPlaceholder={searchPlaceholder}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      searchToolbarSegments={searchToolbarSegments}
      onSearchToolbarSegmentClick={onSearchToolbarSegmentClick}
      onSearchSubmit={onSearchSubmit}
      filterCta={filterCta}
      onFilterClick={onFilterClick}
      onColumnsClick={onColumnsClick}
    />
  );

  const viewModeEl = (
    <div
      className="relative flex shrink-0 items-center gap-4"
      data-name="View Mode"
    >
      <div
        className="relative flex shrink-0 items-center gap-0"
        data-name="Filter view"
      >
        <ToggleGroup
          type="single"
          variant="outline"
          spacing={0}
          value={viewMode}
          onValueChange={(v) => {
            if (v === "calendar" || v === "chart") onViewModeChange(v);
          }}
          className="relative flex items-center shadow-xs"
          data-name="Toggle Group"
        >
          <ToggleGroupItem
            value="calendar"
            aria-label="Calendar"
            className={cn(
              H32,
              "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground rounded-l-md rounded-r-none px-2 py-2.5",
            )}
          >
            <CalendarDays className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="chart"
            aria-label="Chart"
            className={cn(
              H32,
              "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground rounded-l-none rounded-r-md px-2 py-2.5",
            )}
          >
            <BarChart3 className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );

  const rootClass = cn(
    "relative flex w-full max-w-[1320px] min-w-0 items-center gap-4 overflow-x-auto",
    className,
  );

  if (!showTimeScale) {
    return (
      <div
        data-slot="filter-bar"
        className={cn(rootClass, "justify-between")}
        id="node-26824_299601"
      >
        <div className="flex min-w-0 flex-1 items-center gap-4 pr-2">
          {filterSerch(true)}
        </div>
        {viewModeEl}
      </div>
    );
  }

  return (
    <div data-slot="filter-bar" className={rootClass} id="node-26797_11706">
      <TimeScale
        timeScale={timeScale}
        onTimeScaleChange={onTimeScaleChange}
        dateLabel={dateLabel}
        dateToolbarSegments={dateToolbarSegments}
        onDateToolbarSegmentClick={onDateToolbarSegmentClick}
        onDatePickerClick={onDatePickerClick}
        periodLabel={periodLabel}
        weekColumnLabels={weekColumnLabels}
        onPrevPeriod={onPrevPeriod}
        onNextPeriod={onNextPeriod}
      />
      {/* flex 스페이서: Time scale 은 shrink-0, 검색·뷰는 오른쪽에 고정되어 기간 네비가 검색과 겹치지 않음 */}
      <div className="min-h-px min-w-[16px] flex-1 basis-0" aria-hidden />
      <div className="flex shrink-0 items-center gap-4">
        {filterSerch(false)}
        {viewModeEl}
      </div>
    </div>
  );
}

export function useInventisFilterDemoState() {
  const [timeScale, setTimeScale] =
    React.useState<InventisFilterTimeScale>("day");
  const [search, setSearch] = React.useState("");
  const [viewMode, setViewMode] =
    React.useState<InventisFilterViewMode>("calendar");
  const [activeFilterCount, setActiveFilterCount] = React.useState(0);

  const periodLabel = timeScale === "day" ? "Today" : "This Week";
  const dateLabel = "10 Mar 2026";

  const barProps = React.useMemo(
    () => ({
      timeScale,
      onTimeScaleChange: setTimeScale,
      dateLabel,
      periodLabel,
      searchValue: search,
      onSearchChange: setSearch,
      viewMode,
      onViewModeChange: setViewMode,
      activeFilterCount,
      onFilterClick: () => setActiveFilterCount((n) => (n + 1) % 4),
      onDatePickerClick: () => {},
      onPrevPeriod: () => {},
      onNextPeriod: () => {},
      onSearchSubmit: () => {},
      onColumnsClick: () => {},
      onDateToolbarSegmentClick: (_i: number) => {},
      onSearchToolbarSegmentClick: (_i: number) => {},
    }),
    [timeScale, search, viewMode, activeFilterCount, periodLabel],
  );

  return {
    search,
    setSearch,
    timeScale,
    setTimeScale,
    viewMode,
    setViewMode,
    activeFilterCount,
    setActiveFilterCount,
    barProps,
  };
}
