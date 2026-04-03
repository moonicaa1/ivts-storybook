"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { fn } from "storybook/test";

import {
  InventisFilterBar,
  useInventisFilterDemoState,
} from "./filter/InventisFilterBar";
import { InventisKanbanColumn } from "./kanban/InventisKanbanColumn";
import { KanbanCustomerContextPlaygroundDnd } from "./kanban/KanbanPlaygroundDnd";
import { FIGMA_KANBAN_FILE_BASE } from "./kanban/figma";
import { InventisRoCard } from "./ro-card/InventisRoCard";

const COL =
  "w-[257.6px] min-w-[257.6px] max-w-[257.6px] flex-none min-h-0" as const;

function KanbanSlotPlaceholder() {
  return (
    <div className="border-primary/45 bg-primary/8 text-muted-foreground flex h-[168px] shrink-0 items-center justify-center rounded-lg border border-dashed p-4 text-center text-sm leading-snug">
      Slot (swap it with your content)
    </div>
  );
}

function KanbanBoardFilterRow() {
  const { barProps } = useInventisFilterDemoState();
  return (
    <div className="w-full min-w-0 shrink-0 overflow-x-auto">
      <InventisFilterBar {...barProps} />
    </div>
  );
}

type Ro = React.ComponentProps<typeof InventisRoCard>;

function RoCardItem(props: Ro) {
  return <InventisRoCard {...props} onMenuClick={props.onMenuClick ?? fn()} />;
}

const meta = {
  id: "pattern-kanban",
  title: "Pattern/Kanban",
  component: InventisKanbanColumn,
  /** CSF는 캔버스 스토리만; 공식 독스는 `kanban-pattern.mdx` */
  tags: ["!autodocs"],
  argTypes: {
    defaultCollapsed: {
      description:
        "Figma 심볼 **`Collapsed`**. `true` → 52px 레일(헤더만), `false` → 전체 열.",
      table: { category: "Figma" },
    },
    title: {
      description: "Figma 헤더 가운데 타이틀(예: String value).",
      table: { category: "Figma" },
    },
    footer: {
      description: "Figma **`Kanban/Footer`** 표시. 접힘일 때는 렌더하지 않음.",
      table: { category: "Figma" },
    },
    totalLabel: {
      description: "푸터 좌측 라벨(기본 Total).",
      table: { category: "Figma" },
    },
    totalValue: {
      description: "푸터 우측 값.",
      table: { category: "Figma" },
    },
    showDragHere: {
      description: "Figma **`Drag here`** 점선 영역. 접힘일 때는 보통 끔.",
      table: { category: "Figma" },
    },
    dragHereLabel: {
      description: "`Drag here` 문구 오버라이드.",
      table: { category: "Figma" },
    },
    grow: {
      description:
        "보드에서 열을 **`flex-1` 균등**으로 쓸 때(Figma Context Minimum 등). `false`면 심볼 기준 고정 폭.",
      table: { category: "Layout" },
    },
    className: {
      description:
        "열 루트에 Tailwind 등 추가(Maximum/Overflow 폭 오버라이드).",
      table: { category: "Layout" },
    },
    children: {
      description: "Figma **`Kanban/Cardwrap`** 안 카드·슬롯.",
      table: { category: "Figma" },
    },
    onCollapseChange: {
      description: "접기/펼치기 시 콜백.",
      table: { category: "Events" },
    },
    onAddClick: {
      description: "헤더 Plus 클릭.",
      table: { category: "Events" },
    },
  },
  args: {
    title: "String value",
    totalValue: "5",
    footer: true,
    showDragHere: true,
    onAddClick: fn(),
    onCollapseChange: fn(),
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `Inventis DS **칸반 열** — Figma 레이어 \`Kanban/Header\` · \`Kanban/Cardwrap\` · \`Kanban/Footer\` · \`Drag here\`, 심볼 프로퍼티 \`Collapsed\`. ([Figma](${FIGMA_KANBAN_FILE_BASE}))`,
      },
    },
  },
} satisfies Meta<typeof InventisKanbanColumn>;

export default meta;

/** 사이드바에서 Playground를 맨 위에 두기 위한 export 순서 */
export const __namedExportsOrder = [
  "Playground",
  "Expanded",
  "Collapsed",
  "WithRoCards",
  "BoardMinimum",
  "BoardMaximum",
  "BoardOverflow",
];

type Story = StoryObj<typeof meta>;

/** Figma Context Maximum · Customer — 26791:110939 · @dnd-kit 열 간 이동 */
export const Playground: Story = {
  render: () => <KanbanCustomerContextPlaygroundDnd />,
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
  },
};

/** Figma `Collapsed=false` — 단일 열 · Controls 연동 */
export const Expanded: Story = {
  render: (args) => (
    <div className="bg-background flex min-h-svh items-start justify-center p-8">
      <InventisKanbanColumn {...args} defaultCollapsed={false}>
        <KanbanSlotPlaceholder />
        <KanbanSlotPlaceholder />
        <KanbanSlotPlaceholder />
        <KanbanSlotPlaceholder />
      </InventisKanbanColumn>
    </div>
  ),
};

/** Figma `Collapsed=true` — 52px 레일 */
export const Collapsed: Story = {
  args: { defaultCollapsed: true, footer: false, showDragHere: false },
  render: (args) => (
    <div className="bg-background flex min-h-svh items-start justify-center p-8">
      <InventisKanbanColumn {...args} />
    </div>
  ),
};

/** Cardwrap + RO 카드 (단일 열) */
export const WithRoCards: Story = {
  name: "With RO cards",
  render: (args) => (
    <div className="bg-background flex min-h-svh items-start justify-center p-8">
      <InventisKanbanColumn {...args} title="In progress" totalValue="3">
        <RoCardItem
          type="default"
          customerName="Mr.Kim"
          statusLabel="Draft"
          vehicle="2023 Toyota Camry XSE"
          roNumber="KCS-452"
          assignee="Lucas"
          timeStart="10:30 am"
          timeEnd="11:30 am"
          serviceType="Brake Service"
        />
        <RoCardItem
          type="default"
          customerName="Ms.Park"
          statusLabel="Draft"
          vehicle="2019 Honda Accord"
          roNumber="KCS-418"
          assignee="Lucas"
          timeStart="2:00 pm"
          timeEnd="3:00 pm"
          serviceType="Oil change"
        />
      </InventisKanbanColumn>
    </div>
  ),
};

/** Figma Context Minimum — 3열 균등 (26797:196482) */
export const BoardMinimum: Story = {
  name: "Board minimum",
  render: (args) => (
    <div className="bg-background flex min-h-svh flex-col p-6" dir="ltr">
      <div className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col gap-3">
        <KanbanBoardFilterRow />
        <div className="flex min-h-0 min-w-0 flex-1 gap-2">
          {(["To do", "In progress", "Done"] as const).map((t, i) => (
            <InventisKanbanColumn
              key={t}
              {...args}
              grow
              title={t}
              totalValue={String(i + 2)}
              className="min-h-0"
            >
              <KanbanSlotPlaceholder />
            </InventisKanbanColumn>
          ))}
        </div>
      </div>
    </div>
  ),
};

/** Figma Context Maximum — 보드만 5열 (~257.6px), 크롬 없음 */
export const BoardMaximum: Story = {
  name: "Board maximum",
  render: (args) => (
    <div className="bg-background flex min-h-svh flex-col p-6" dir="ltr">
      <div className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col gap-3">
        <KanbanBoardFilterRow />
        <div className="flex min-h-0 min-w-0 flex-1 gap-2 overflow-hidden">
          {(["New", "Triaged", "In progress", "Review", "Done"] as const).map(
            (t, i) => (
              <InventisKanbanColumn
                key={t}
                {...args}
                title={t}
                totalValue={String(i + 1)}
                className={COL}
              >
                <KanbanSlotPlaceholder />
              </InventisKanbanColumn>
            ),
          )}
        </div>
      </div>
    </div>
  ),
};

/** Figma OverFlow — 가로 스크롤 (26797:207316) */
export const BoardOverflow: Story = {
  name: "Board overflow",
  render: (args) => (
    <div className="bg-background flex min-h-svh flex-col p-6" dir="ltr">
      <div className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col gap-3">
        <KanbanBoardFilterRow />
        <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex h-full min-h-0 gap-2 pb-2">
            {(["Col A", "Col B", "Col C", "Col D", "Col E"] as const).map(
              (t, i) => (
                <InventisKanbanColumn
                  key={t}
                  {...args}
                  title={t}
                  totalValue={String(i + 3)}
                  className="w-[300.8px] max-w-[300.8px] min-w-[300.8px] flex-none"
                >
                  <KanbanSlotPlaceholder />
                </InventisKanbanColumn>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  ),
};
