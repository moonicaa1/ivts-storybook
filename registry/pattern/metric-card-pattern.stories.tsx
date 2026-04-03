"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Moon, Sun } from "lucide-react";
import * as React from "react";

import { cn } from "@/bases/radix/lib/utils";

import { InventisMetricCard } from "./metric-card/InventisMetricCard";
import {
  FIGMA_METRIC_CARD_FILE_BASE,
  FIGMA_METRIC_CARD_NODE,
  figmaMetricCardNodeUrl,
} from "./metric-card/figma";

const meta = {
  id: "pattern-metric-card",
  title: "Pattern/Metric Card",
  component: InventisMetricCard,
  tags: ["!autodocs"],
  args: {
    variant: "default" as const,
    title: "MPI advisor utilization",
    value: "89.3%",
    delta: "-2%",
    deltaDirection: "down" as const,
    footerTrend: "Trending down this month",
    footerHint: "Advisor utilization over the last 6 months",
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Inventis DS **메트릭 카드** — Figma Type=Default | Compact, 필터 행 Minimum/Maximum, Pattern. ([파일](${FIGMA_METRIC_CARD_FILE_BASE}))`,
      },
      /**
       * 독스 Canvas 전부 동일 방식: iframe(`inline: false`) + `padded` + 스토리별 낮은 height.
       * `inline: true`는 .sbdocs 스타일과 섞여 Pattern/Filter와 다르게 보임.
       */
      canvas: { layout: "padded" },
    },
  },
} satisfies Meta<typeof InventisMetricCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Figma Type=Default (`26824:363044`) */
export const Default: Story = {
  name: "Default",
  parameters: {
    docs: {
      canvas: { layout: "padded" },
      story: { inline: false, height: "280px" },
    },
  },
  decorators: [
    (S) => (
      <div className="w-[322px] max-w-full">
        <S />
      </div>
    ),
  ],
};

/** Figma Type=Compact (`26824:363143`) */
export const Compact: Story = {
  name: "Compact",
  args: { variant: "compact" },
  parameters: {
    docs: {
      canvas: { layout: "padded" },
      story: { inline: false, height: "210px" },
    },
  },
  decorators: Default.decorators,
};

/** Figma Variants 섹션 (`26824:373540`) — Default + Compact */
export const Variants: Story = {
  name: "Variants",
  render: () => (
    <div className="flex w-full max-w-[400px] flex-col gap-8">
      <InventisMetricCard
        variant="default"
        title="MPI advisor utilization"
        value="89.3%"
        delta="-2%"
        deltaDirection="down"
      />
      <InventisMetricCard
        variant="compact"
        title="MPI advisor utilization"
        value="89.3%"
        delta="-2%"
        deltaDirection="down"
      />
    </div>
  ),
  parameters: {
    docs: {
      canvas: { layout: "padded" },
      story: { inline: false, height: "500px" },
      description: {
        story: `[Figma Variants](${figmaMetricCardNodeUrl(FIGMA_METRIC_CARD_NODE.variants)})`,
      },
    },
  },
};

function PatternPanel({
  theme,
  children,
}: {
  theme: "light" | "dark";
  children: React.ReactNode;
}) {
  const isDark = theme === "dark";
  return (
    <div
      className={cn(
        "relative flex min-h-[280px] min-w-0 flex-1 items-center justify-center overflow-hidden rounded-2xl border px-4 py-16 shadow-xs",
        isDark
          ? "dark border-neutral-800 bg-neutral-950"
          : "border-border bg-background",
      )}
    >
      <span
        className="text-muted-foreground absolute top-4 right-4"
        aria-hidden
      >
        {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </span>
      {children}
    </div>
  );
}

/** Figma Pattern (`26824:373652`) — Light / Dark */
export const Pattern: Story = {
  name: "Pattern",
  parameters: {
    layout: "fullscreen",
    docs: {
      canvas: { layout: "fullscreen" },
      story: { inline: false, height: "380px" },
      description: {
        story: `[Figma Pattern](${figmaMetricCardNodeUrl(FIGMA_METRIC_CARD_NODE.pattern)})`,
      },
    },
  },
  render: () => (
    <div
      className="flex w-full min-w-0 flex-wrap justify-center gap-4 overflow-x-auto p-4"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.4)), linear-gradient(90deg, rgb(245,245,245), rgb(245,245,245))",
      }}
    >
      <PatternPanel theme="light">
        <div className="w-[322px] max-w-full">
          <InventisMetricCard
            variant="default"
            title="MPI advisor utilization"
            value="89.3%"
            delta="-2%"
            deltaDirection="down"
          />
        </div>
      </PatternPanel>
      <PatternPanel theme="dark">
        <div className="w-[322px] max-w-full">
          <InventisMetricCard
            variant="default"
            title="MPI advisor utilization"
            value="89.3%"
            delta="-2%"
            deltaDirection="down"
          />
        </div>
      </PatternPanel>
    </div>
  ),
};

/** Figma Metric Card/Minimum — 필터 행 2열 (`26824:364486`) */
export const FilterRowMinimum: Story = {
  name: "Filter row · Minimum (2)",
  parameters: {
    layout: "padded",
    docs: {
      canvas: { layout: "fullscreen" },
      story: { inline: false, height: "200px" },
      description: {
        story: `[Figma Minimum](${figmaMetricCardNodeUrl(FIGMA_METRIC_CARD_NODE.pageMinimum)})`,
      },
    },
  },
  render: () => (
    <div className="w-full overflow-x-auto">
      <div className="mx-auto flex max-w-[1320px] min-w-[1320px] gap-4">
        <InventisMetricCard
          className="min-w-0 flex-1 basis-0"
          variant="compact"
          title="MPI advisor utilization"
          value="89.3%"
          delta="-2%"
          deltaDirection="down"
        />
        <InventisMetricCard
          className="min-w-0 flex-1 basis-0"
          variant="compact"
          title="MPI advisor utilization"
          value="89.3%"
          delta="-2%"
          deltaDirection="down"
        />
      </div>
    </div>
  ),
};

/** Figma Metric Card/Maximum — 필터 행 4열 (`26824:373175`) */
export const FilterRowMaximum: Story = {
  name: "Filter row · Maximum (4)",
  parameters: {
    layout: "padded",
    docs: {
      canvas: { layout: "fullscreen" },
      story: { inline: false, height: "200px" },
      description: {
        story: `[Figma Maximum](${figmaMetricCardNodeUrl(FIGMA_METRIC_CARD_NODE.pageMaximum)})`,
      },
    },
  },
  render: () => (
    <div className="w-full overflow-x-auto">
      <div className="mx-auto flex max-w-[1320px] min-w-[1320px] gap-4">
        <InventisMetricCard
          className="w-[318px] max-w-[318px] min-w-0 shrink-0 grow-0"
          variant="compact"
          title="Appointment show rate"
          value="75%"
          delta="-2%"
          deltaDirection="down"
        />
        <InventisMetricCard
          className="w-[318px] max-w-[318px] min-w-0 shrink-0 grow-0"
          variant="compact"
          title="MPI advisor utilization"
          value="89.3%"
          delta="12.5%"
          deltaDirection="down"
        />
        <InventisMetricCard
          className="w-[318px] max-w-[318px] min-w-0 shrink-0 grow-0"
          variant="compact"
          title="MPI advisor utilization"
          value="89.3%"
          delta="-2%"
          deltaDirection="down"
        />
        <InventisMetricCard
          className="w-[318px] max-w-[318px] min-w-0 shrink-0 grow-0"
          variant="compact"
          title="MPI advisor utilization"
          value="89.3%"
          delta="-2%"
          deltaDirection="down"
        />
      </div>
    </div>
  ),
};
