"use client";

import { Button } from "@/bases/radix/components/ui/button";
import { ScrollArea } from "@/bases/radix/components/ui/scroll-area";
import { cn } from "@/bases/radix/lib/utils";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import * as React from "react";

export type InventisKanbanColumnProps = {
  /**
   * Figma 심볼 프로퍼티 `Collapsed=` — `false`: 전체 열(헤더·Cardwrap·Footer),
   * `true`: 52px 레일 + 헤더만(펼치기 시각).
   */
  defaultCollapsed?: boolean;
  /** Figma 헤더 가운데 "String value" */
  title?: string;
  /** Figma `Kanban/Footer` 표시 (Collapsed 시 무시) */
  footer?: boolean;
  /** 푸터 좌측 (기본 Total) */
  totalLabel?: string;
  /** 푸터 우측 값 */
  totalValue?: string;
  /** Figma 하단 `Drag here` 점선 존 */
  showDragHere?: boolean;
  dragHereLabel?: string;
  /**
   * 보드에서 열이 `flex-1` 로 균등 분할될 때 (Figma Minimum 3열 등).
   * `false` 이면 심볼 폭 248.8px 고정.
   */
  grow?: boolean;
  className?: string;
  children?: React.ReactNode;
  onCollapseChange?: (collapsed: boolean) => void;
  onAddClick?: () => void;
};

/**
 * Inventis DS 칸반 **단일 열** (Figma ❖ Kanban — `Collapsed=false|true`).
 * 서브 레이어: `Kanban/Header` · `Kanban/Cardwrap` · `Kanban/Footer` · `Drag here`.
 */
export function InventisKanbanColumn({
  defaultCollapsed = false,
  title = "String value",
  footer = true,
  totalLabel = "Total",
  totalValue = "String value",
  showDragHere = true,
  dragHereLabel = "Drag here",
  grow = false,
  className,
  children,
  onCollapseChange,
  onAddClick,
}: InventisKanbanColumnProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  React.useEffect(() => {
    setCollapsed(defaultCollapsed);
  }, [defaultCollapsed]);

  const setCollapsedAndNotify = React.useCallback(
    (next: boolean) => {
      setCollapsed(next);
      onCollapseChange?.(next);
    },
    [onCollapseChange],
  );

  if (collapsed) {
    return (
      <div
        data-slot="kanban-column"
        data-collapsed="true"
        className={cn(
          "border-border bg-muted flex h-[min(811px,85vh)] shrink-0 flex-col gap-2 rounded-md border p-2",
          className,
          "w-[52px] max-w-[52px] min-w-[52px]",
        )}
      >
        <div
          data-slot="kanban-header"
          data-state="collapsed"
          className="bg-card border-border flex w-full shrink-0 items-center justify-center rounded-sm border p-1"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 rounded-lg p-0"
            aria-label="Expand column"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setCollapsedAndNotify(false)}
          >
            <ChevronRight className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      data-slot="kanban-column"
      data-collapsed="false"
      className={cn(
        "border-border bg-muted flex h-[min(811px,85vh)] shrink-0 flex-col gap-2 rounded-md border p-2",
        grow ? "w-full min-w-[232px] flex-1 basis-0" : "w-[248.8px]",
        className,
      )}
    >
      <div
        data-slot="kanban-header"
        data-state="opened"
        className="bg-card border-border grid w-full shrink-0 grid-cols-[28px_minmax(0,1fr)_28px] items-center gap-1 rounded-sm border p-1"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-7 shrink-0 justify-self-start rounded-lg p-0"
          aria-label="Collapse column"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setCollapsedAndNotify(true)}
        >
          <ChevronLeft className="size-4" aria-hidden />
        </Button>
        <span className="text-card-foreground flex min-h-7 min-w-0 items-center justify-center truncate text-center text-sm leading-none font-medium">
          {title}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-7 shrink-0 justify-self-end rounded-lg p-0"
          aria-label="Add card"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onAddClick}
        >
          <Plus className="size-4" aria-hidden />
        </Button>
      </div>

      <ScrollArea
        data-slot="kanban-cardwrap"
        className="min-h-0 min-w-0 flex-1 [&>[data-slot=scroll-area-viewport]]:pb-1"
      >
        <div className="flex flex-col gap-2">
          {children}
          {showDragHere ? (
            <div
              data-slot="kanban-drag-here"
              className="border-border bg-muted/60 text-muted-foreground flex h-[168px] shrink-0 items-center justify-center rounded-lg border border-dashed p-6 text-center text-sm"
            >
              {dragHereLabel}
            </div>
          ) : null}
        </div>
      </ScrollArea>

      {footer ? (
        <div
          data-slot="kanban-footer"
          className="text-card-foreground border-border flex shrink-0 items-center justify-between gap-2 border-t pt-2 text-sm whitespace-nowrap"
        >
          <span className="text-muted-foreground shrink-0">{totalLabel}</span>
          <span className="min-w-0 truncate font-normal">{totalValue}</span>
        </div>
      ) : null}
    </div>
  );
}
