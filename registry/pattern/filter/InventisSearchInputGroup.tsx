"use client";

/**
 * Figma **ButtonGroup + Input** — 메인 인스턴스 `18710:87287`, 심볼 변형 `18707:209303` End / `209305` Start / `209304` Both.
 * 한 겉테두리 + 세로 구분선; 기본 **pill** (`rounded-full`). Docs: `18686:23335` Playground, `18686:6893` Components.
 */

import { Search } from "lucide-react";
import * as React from "react";

import { Button } from "@/bases/radix/components/ui/button";
import { Input } from "@/bases/radix/components/ui/input";
import { cn } from "@/bases/radix/lib/utils";

export type InventisSearchInputGroupPlacement = "start" | "end" | "both";

export type InventisSearchInputGroupProps = {
  className?: string;
  placement?: InventisSearchInputGroupPlacement;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  /** placement `start` / `both`: Input 왼쪽 세그먼트 라벨 */
  leadingSegments?: string[];
  onLeadingSegmentClick?: (index: number) => void;
  /** placement `end` / `both`: Input 과 검색 아이콘 사이 (필터 검색줄과 동일) */
  trailingSegments?: string[];
  onTrailingSegmentClick?: (index: number) => void;
  /**
   * 검색(돋보기) 오른쪽, 같은 pill 안의 추가 컨트롤 (예: Columns).
   * `divide-x` 기준이 되도록 **단일 루트 요소**로 전달.
   */
  trailingSlot?: React.ReactNode;
};

const shell = cn(
  "divide-input border-input bg-background flex h-8 min-h-8 w-full max-w-[min(100%,440px)] min-w-[200px] divide-x overflow-hidden rounded-full border shadow-xs",
);

const inputCls = cn(
  "h-8 min-h-8 min-w-0 flex-1 rounded-none border-0 bg-transparent px-3 py-0 text-sm shadow-none",
  "placeholder:text-muted-foreground focus-visible:z-10 focus-visible:ring-0 focus-visible:ring-offset-0",
);

/** Filter bar의 Columns 등, pill 내부 텍스트 세그먼트와 동일 톤 */
export const inventisSearchGroupSegmentClass = cn(
  "text-foreground h-8 shrink-0 rounded-none px-2.5 text-sm font-medium shadow-none",
  "hover:bg-muted/60",
);

export function InventisSearchInputGroup({
  className,
  placement = "end",
  placeholder = "Search...",
  value,
  onChange,
  onSubmit,
  leadingSegments = [],
  onLeadingSegmentClick,
  trailingSegments = [],
  onTrailingSegmentClick,
  trailingSlot,
}: InventisSearchInputGroupProps) {
  const leading = leadingSegments.map((label, i) => (
    <Button
      key={`l-${i}-${label}`}
      type="button"
      variant="ghost"
      className={inventisSearchGroupSegmentClass}
      data-name="Button"
      onClick={() => onLeadingSegmentClick?.(i)}
    >
      {label}
    </Button>
  ));

  const trailing = trailingSegments.map((label, i) => (
    <Button
      key={`t-${i}-${label}`}
      type="button"
      variant="ghost"
      className={inventisSearchGroupSegmentClass}
      data-name="Button"
      onClick={() => onTrailingSegmentClick?.(i)}
    >
      {label}
    </Button>
  ));

  const inputEl = (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputCls}
      data-name="InputGroup"
      aria-label={placeholder}
    />
  );

  const submitBtn = (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="hover:bg-muted/60 h-8 w-8 shrink-0 rounded-none shadow-none"
      data-name="Button"
      onClick={onSubmit}
      aria-label="Search"
    >
      <Search className="size-4" />
    </Button>
  );

  if (placement === "start") {
    return (
      <div
        className={cn(shell, className)}
        data-name="ButtonGroup + Input"
        data-figma-node="18707:209305"
      >
        {leading}
        {inputEl}
      </div>
    );
  }

  if (placement === "both") {
    return (
      <div
        className={cn(shell, className)}
        data-name="ButtonGroup + Input"
        data-figma-node="18707:209304"
      >
        {leading}
        {inputEl}
        {trailing}
        {trailingSlot}
      </div>
    );
  }

  return (
    <div
      className={cn(shell, className)}
      data-name="ButtonGroup + Input"
      data-figma-node="18710:87287"
    >
      {inputEl}
      {trailing}
      {submitBtn}
      {trailingSlot}
    </div>
  );
}
