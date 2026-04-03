"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type Over,
} from "@dnd-kit/core";
import { ChevronLeft } from "lucide-react";
import * as React from "react";

import { Button } from "@/bases/radix/components/ui/button";
import { cn } from "@/bases/radix/lib/utils";

import {
  InventisFilterBar,
  useInventisFilterDemoState,
} from "../filter/InventisFilterBar";
import { InventisRoCard } from "../ro-card/InventisRoCard";
import { InventisKanbanColumn } from "./InventisKanbanColumn";
import {
  getInitialKanbanPlaygroundColumns,
  type KanbanPlaygroundCard,
  type KanbanPlaygroundColumnState,
} from "./kanban-playground-initial";

const COL =
  "w-[257.6px] min-w-[257.6px] max-w-[257.6px] flex-none min-h-0" as const;

const DROP_PREFIX = "column-drop-" as const;

function dropId(columnId: string) {
  return `${DROP_PREFIX}${columnId}`;
}

function parseDropId(overId: string): string | null {
  if (!overId.startsWith(DROP_PREFIX)) return null;
  return overId.slice(DROP_PREFIX.length);
}

function resolveTargetColumnId(
  columns: KanbanPlaygroundColumnState[],
  over: Over,
): string | null {
  const oid = String(over.id);
  const fromZone = parseDropId(oid);
  if (fromZone) return fromZone;

  const current = over.data.current as
    | { type?: string; columnId?: string }
    | undefined;
  if (current?.type === "card" && current.columnId) return current.columnId;

  for (const col of columns) {
    if (col.cards.some((c) => c._id === oid)) return col.id;
  }
  return null;
}

function moveCardToColumn(
  columns: KanbanPlaygroundColumnState[],
  activeCardId: string,
  targetColumnId: string,
): KanbanPlaygroundColumnState[] {
  let moved: KanbanPlaygroundCard | null = null;
  const next = columns.map((c) => ({ ...c, cards: [...c.cards] }));

  for (const col of next) {
    const idx = col.cards.findIndex((x) => x._id === activeCardId);
    if (idx !== -1) {
      moved = col.cards[idx];
      col.cards.splice(idx, 1);
      break;
    }
  }
  if (!moved) return columns;

  const target = next.find((c) => c.id === targetColumnId);
  if (!target) return columns;

  target.cards.push(moved);
  return next;
}

function KanbanDragHereZone() {
  return (
    <div
      data-slot="kanban-drag-here"
      className="border-border bg-muted/60 text-muted-foreground flex h-[168px] shrink-0 items-center justify-center rounded-lg border border-dashed p-6 text-center text-sm"
    >
      Drag here
    </div>
  );
}

function KanbanColumnDroppable({
  columnId,
  children,
}: {
  columnId: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: dropId(columnId),
    data: { type: "column", columnId },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex min-h-[120px] flex-col gap-2",
        isOver &&
          "outline-primary/50 rounded-lg outline-2 outline-offset-2 transition-[outline]",
      )}
    >
      {children}
    </div>
  );
}

function KanbanDraggableCard({
  id,
  columnId,
  children,
}: {
  id: string;
  columnId: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: { type: "card", id, columnId },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px,${transform.y}px,0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "touch-none",
        isDragging && "opacity-50",
        "cursor-grab active:cursor-grabbing",
      )}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}

function cardProps(c: KanbanPlaygroundCard) {
  const { _id, ...rest } = c;
  return rest;
}

/**
 * Figma Context Panel/Customer (26791:110939) + **@dnd-kit** — 카드 전체를 드래그해 열 사이로 이동.
 */
export function KanbanCustomerContextPlaygroundDnd() {
  const { barProps } = useInventisFilterDemoState();
  const [columns, setColumns] = React.useState<KanbanPlaygroundColumnState[]>(
    getInitialKanbanPlaygroundColumns,
  );
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  const activeCard = React.useMemo(() => {
    if (!activeId) return null;
    for (const col of columns) {
      const c = col.cards.find((x) => x._id === activeId);
      if (c) return c;
    }
    return null;
  }, [columns, activeId]);

  const onDragStart = React.useCallback((e: DragStartEvent) => {
    setActiveId(String(e.active.id));
  }, []);

  const onDragEnd = React.useCallback((e: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = e;
    if (!over) return;

    const aid = String(active.id);
    setColumns((prev) => {
      const targetColId = resolveTargetColumnId(prev, over);
      if (!targetColId) return prev;
      return moveCardToColumn(prev, aid, targetColId);
    });
  }, []);

  const onDragCancel = React.useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <div
        className="bg-background text-foreground flex min-h-[min(1024px,92vh)] w-full"
        dir="ltr"
        data-slot="kanban-playground-chrome"
      >
        <aside
          className="bg-sidebar border-sidebar-border w-16 shrink-0 border-r"
          aria-hidden
        />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="border-border bg-background flex h-[49px] shrink-0 items-center border-b px-4">
            <span className="text-muted-foreground text-xs">Header</span>
          </header>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="border-border flex shrink-0 flex-wrap items-center justify-between gap-3 border-b px-6 py-3">
              <div className="flex min-w-0 items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 shrink-0"
                  aria-label="Back"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <ChevronLeft className="size-4" aria-hidden />
                </Button>
                <span className="truncate text-base font-medium">Customer</span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  Export
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  New repair
                </Button>
              </div>
            </div>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 px-6 py-4">
              <div
                className="w-full shrink-0"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <InventisFilterBar {...barProps} />
              </div>
              <div className="flex min-h-0 min-w-0 flex-1 gap-2 overflow-hidden">
                {columns.map((col) => (
                  <InventisKanbanColumn
                    key={col.id}
                    title={`${col.titleBase} (${col.cards.length})`}
                    totalValue={col.totalValue}
                    footer
                    showDragHere={false}
                    className={COL}
                    onAddClick={() => {}}
                    onCollapseChange={() => {}}
                  >
                    <KanbanColumnDroppable columnId={col.id}>
                      {col.cards.map((c) => (
                        <KanbanDraggableCard
                          key={c._id}
                          id={c._id}
                          columnId={col.id}
                        >
                          <InventisRoCard
                            {...cardProps(c)}
                            onMenuClick={() => {}}
                          />
                        </KanbanDraggableCard>
                      ))}
                      {col.showDragHere ? <KanbanDragHereZone /> : null}
                    </KanbanColumnDroppable>
                  </InventisKanbanColumn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeCard ? (
          <div className="pointer-events-none w-[calc(257.6px-2rem)] max-w-[232px] opacity-95 shadow-lg">
            <InventisRoCard {...cardProps(activeCard)} onMenuClick={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
