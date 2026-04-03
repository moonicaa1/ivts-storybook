"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { InventisNotificationPanel } from "./notification-panel/InventisNotificationPanel";
import { FIGMA_NOTIFICATION_FILE_BASE } from "./notification-panel/figma";

const meta = {
  id: "pattern-notification-panel",
  title: "Pattern/Notification Panel",
  component: InventisNotificationPanel,
  tags: ["!autodocs"],
  argTypes: {
    variant: {
      description:
        "Figma `Property 1=` — `alert-center` (메시지 카드) · `queue` (RO 카드).",
      options: ["alert-center", "queue"],
      control: { type: "radio" },
    },
  },
  args: {
    variant: "alert-center",
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `Inventis DS **알림 패널** (398px 레일). \`variant\` 로 Alert Center / Queue 를 전환합니다. ([Figma 파일](${FIGMA_NOTIFICATION_FILE_BASE}))`,
      },
    },
  },
} satisfies Meta<typeof InventisNotificationPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

function PanelStage(
  props: React.ComponentProps<typeof InventisNotificationPanel>,
) {
  return (
    <div className="bg-muted flex min-h-svh items-stretch justify-center p-6">
      <div className="border-border flex h-[min(1024px,90vh)] w-full max-w-[398px] overflow-hidden rounded-lg border shadow-sm">
        <InventisNotificationPanel
          {...props}
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}

/** Figma Alert Center 심볼 — All / Unread · 메시지 카드 */
export const AlertCenter: Story = {
  args: { variant: "alert-center" },
  render: (args) => <PanelStage {...args} />,
};

/** Figma Queue 심볼 — 다중 탭 · RO 카드 목록 */
export const Queue: Story = {
  args: { variant: "queue" },
  render: (args) => <PanelStage {...args} />,
};

/**
 * Figma 전체 예시(46055 / 46354)에 가깝게: 64px 레일 + 패널 + 메인 영역.
 */
export const BesideMainChrome: Story = {
  name: "With layout chrome",
  args: { variant: "alert-center" },
  render: (args) => (
    <div className="bg-background flex min-h-svh w-full" dir="ltr">
      <div
        className="bg-sidebar border-sidebar-border w-16 shrink-0 border-r"
        aria-hidden
      />
      <InventisNotificationPanel {...args} className="h-svh border-l" />
      <main className="text-muted-foreground flex min-w-0 flex-1 flex-col gap-2 p-6 text-sm">
        <p className="text-foreground text-base font-medium">Main</p>
        <p>헤더·페이지 타이틀·슬롯은 앱 셸에서 구성합니다.</p>
      </main>
    </div>
  ),
};
