"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import {
  FIGMA_TABS_FILE_BASE,
  FIGMA_TABS_URL_LINE_JOBS,
  FIGMA_TABS_URL_LINE_OVERVIEW,
  FIGMA_TABS_URL_PATTERN,
  FIGMA_TABS_URL_TRIGGER_PROPS,
  FIGMA_TABS_URL_VARIANTS,
} from "./tab/figma";
import {
  InventisTabsFigma2677912391LineOverview,
  InventisTabsFigma267796787Variants,
  InventisTabsFigma267796901Pattern,
  InventisTabsFigma267796920TriggerProps,
  InventisTabsFigma2678733252LineJobs,
} from "./tab/InventisTabsFigmaFrames";
import {
  InventisTabsLine,
  type InventisTabsLineItem,
} from "./tab/InventisTabsLine";

const INVENTIS_TABS_LINE_PAGE_ITEMS = [
  { value: "overview", label: "Overview", slotHint: "Contents A" },
  { value: "jobs", label: "Jobs", slotHint: "Contents B" },
  { value: "inspection", label: "Inspection", slotHint: "Contents C" },
  { value: "wip1", label: "Work in Progress", slotHint: "Contents D" },
  { value: "wip2", label: "Work In Progress", slotHint: "Contents E" },
] as const satisfies readonly InventisTabsLineItem[];

const meta = {
  id: "pattern-tab",
  title: "Pattern/Tab",
  component: InventisTabsLine,
  tags: ["!autodocs"],
  argTypes: {
    defaultValue: {
      description:
        "초기 활성 탭. **Figma 프레임 대응** 표(문서)의 Line Overview/Jobs 노드와 맞춥니다.",
      options: INVENTIS_TABS_LINE_PAGE_ITEMS.map((i) => i.value),
      control: { type: "select" },
    },
  },
  args: {
    defaultValue: "overview",
    items: [...INVENTIS_TABS_LINE_PAGE_ITEMS],
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Inventis DS **Tab** 패턴 — Figma 5프레임 대응 스토리 + Playground. 노드 ID·링크는 각 스토리 설명·문서 표에서 확인. [파일](${FIGMA_TABS_FILE_BASE})`,
      },
    },
  },
} satisfies Meta<typeof InventisTabsLine>;

export default meta;

type Story = StoryObj<typeof meta>;

function TabsLineScreen(props: React.ComponentProps<typeof InventisTabsLine>) {
  const dv = props.defaultValue ?? "overview";
  return (
    <div className="bg-muted/40 w-full p-4">
      <div className="bg-background mx-auto w-full max-w-[1320px] rounded-xl border p-6 shadow-sm">
        <InventisTabsLine key={dv} {...props} />
      </div>
    </div>
  );
}

const noControls = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
} as const;

/** 통합 조작 — Line 페이지 탭·슬롯 */
export const Playground: Story = {
  render: (args) => <TabsLineScreen {...args} />,
};

/** Figma 26779-6787 — Variants */
export const Figma267796787Variants: Story = {
  name: "Variants",
  ...noControls,
  parameters: {
    ...noControls.parameters,
    docs: {
      description: { story: `[Figma](${FIGMA_TABS_URL_VARIANTS})` },
    },
  },
  render: () => (
    <div className="bg-muted/30 w-full p-6">
      <InventisTabsFigma267796787Variants />
    </div>
  ),
};

/** Figma 26779-6920 — Trigger properties */
export const Figma267796920TriggerProps: Story = {
  name: "Trigger properties",
  ...noControls,
  parameters: {
    ...noControls.parameters,
    docs: {
      description: { story: `[Figma](${FIGMA_TABS_URL_TRIGGER_PROPS})` },
    },
  },
  render: () => (
    <div className="bg-muted/30 w-full p-6">
      <InventisTabsFigma267796920TriggerProps />
    </div>
  ),
};

/** Figma 26779-12391 — Line · Overview */
export const Figma2677912391LineOverview: Story = {
  name: "Line · Overview",
  ...noControls,
  parameters: {
    ...noControls.parameters,
    docs: {
      description: { story: `[Figma](${FIGMA_TABS_URL_LINE_OVERVIEW})` },
    },
  },
  render: () => <InventisTabsFigma2677912391LineOverview />,
};

/** Figma 26779-6901 — Pattern */
export const Figma267796901Pattern: Story = {
  name: "Pattern",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: { story: `[Figma](${FIGMA_TABS_URL_PATTERN})` },
    },
  },
  render: () => (
    <div className="w-full overflow-auto p-4">
      <InventisTabsFigma267796901Pattern />
    </div>
  ),
};

/** Figma 26787-33252 — Line · Jobs */
export const Figma2678733252LineJobs: Story = {
  name: "Line · Jobs",
  ...noControls,
  parameters: {
    ...noControls.parameters,
    docs: {
      description: { story: `[Figma](${FIGMA_TABS_URL_LINE_JOBS})` },
    },
  },
  render: () => <InventisTabsFigma2678733252LineJobs />,
};

/** 북마크 호환 — 사이드바 비표시 (`!dev`) */
export const TabsLineOverviewActive: Story = {
  tags: ["!dev"],
  args: { defaultValue: "overview" },
  render: (args) => <TabsLineScreen {...args} />,
};

export const TabsLineJobsActive: Story = {
  tags: ["!dev"],
  args: { defaultValue: "jobs" },
  render: (args) => <TabsLineScreen {...args} />,
};
