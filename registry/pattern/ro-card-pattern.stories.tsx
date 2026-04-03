"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { InventisRoCard } from "./ro-card/InventisRoCard";
import { FIGMA_RO_CARD_FILE_BASE } from "./ro-card/figma";

const sharedArgs = {
  customerName: "Mr.Kim",
  statusLabel: "Draft",
  vehicle: "2023 Toyota Camry XSE",
  roNumber: "KCS-452",
  assignee: "Lucas",
  timeStart: "10:30 am",
  timeEnd: "11:30 am",
  serviceType: "Brake Service",
  onMenuClick: fn(),
};

const meta = {
  id: "pattern-ro-card",
  title: "Pattern/RO Card",
  component: InventisRoCard,
  tags: ["!autodocs"],
  args: {
    ...sharedArgs,
    type: "default" as const,
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Inventis DS **RO(작업) 카드** — Figma \`Type=Default | Action | Schedule\`. ([Figma 파일](${FIGMA_RO_CARD_FILE_BASE}))`,
      },
    },
  },
} satisfies Meta<typeof InventisRoCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Figma Type=Default — 칸반 열 폭(~233px) 기준 컴팩트 카드 */
export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-[233px]">
        <Story />
      </div>
    ),
  ],
};

/** Figma Type=Action — 큐 패널 폭(~366px), SMS / Call / Check In 푸터 */
export const WithActionFooter: Story = {
  args: {
    type: "action",
    onSendSms: fn(),
    onCall: fn(),
    onCheckIn: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-[366px] max-w-full">
        <Story />
      </div>
    ),
  ],
};

/** Figma Type=Schedule — 앰버 좌측 강조, 차량·시간 위주 */
export const Schedule: Story = {
  render: () => (
    <div className="w-[388px] max-w-full">
      <InventisRoCard
        type="schedule"
        customerName="Mr.Lee"
        vehicle="2022 Ford F-150"
        timeStart="10:30 am"
        timeEnd="11:30 am"
        onMenuClick={fn()}
      />
    </div>
  ),
};

/** Default + 진행률 행 (Figma progress 플래그) */
export const WithProgress: Story = {
  args: {
    showProgress: true,
    progressValue: 50,
  },
  decorators: Default.decorators,
};
