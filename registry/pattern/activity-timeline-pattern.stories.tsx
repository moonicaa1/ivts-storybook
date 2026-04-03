"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Moon, Sun } from "lucide-react";
import * as React from "react";

import { cn } from "@/bases/radix/lib/utils";

import {
  InventisActivityTimeline,
  InventisActivityTimelineMarker,
  InventisActivityTimelinePhase,
  InventisActivityTimelineRow,
  type ActivityTimelineDetailRow,
} from "./activity-timeline/InventisActivityTimeline";
import {
  FIGMA_ACTIVITY_TIMELINE_FILE_BASE,
  FIGMA_ACTIVITY_TIMELINE_NODE,
  figmaActivityTimelineNodeUrl,
} from "./activity-timeline/figma";

const detailSample: ActivityTimelineDetailRow[] = [
  { kind: "text", label: "Tracking ID", value: "String value" },
  {
    kind: "badge",
    label: "Assigned",
    text: "Lucas Admin",
    className: "bg-[#dcfce7] text-[#16a34a] border-transparent",
  },
  {
    kind: "badge",
    label: "Status",
    text: "Appointment",
    className: "bg-[#ccfbf1] text-[#0d9488] border-transparent",
  },
];

const meta = {
  id: "pattern-activity-timeline",
  title: "Pattern/Activity Timeline",
  component: InventisActivityTimeline,
  tags: ["!autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Inventis DS **Activity Timeline**. [Figma 파일](${FIGMA_ACTIVITY_TIMELINE_FILE_BASE})`,
      },
      canvas: { layout: "padded" },
    },
  },
} satisfies Meta<typeof InventisActivityTimeline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InCard: Story = {
  name: "in Card",
  args: { variant: "inCard" },
  parameters: {
    docs: {
      story: { inline: false, height: "420px" },
    },
  },
};

export const Inline: Story = {
  name: "Inline",
  args: { variant: "inline" },
  parameters: {
    docs: {
      story: { inline: false, height: "420px" },
    },
  },
};

export const Variants: Story = {
  name: "Variants",
  render: () => (
    <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
      <div>
        <p className="text-muted-foreground mb-2 text-xs">Inline</p>
        <InventisActivityTimeline variant="inline" />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-xs">in Card</p>
        <InventisActivityTimeline variant="inCard" />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      story: { inline: false, height: "480px" },
      description: {
        story: `[Variants](${figmaActivityTimelineNodeUrl(FIGMA_ACTIVITY_TIMELINE_NODE.variants)})`,
      },
    },
  },
};

export const Properties: Story = {
  name: "Properties",
  render: () => (
    <div className="flex max-w-2xl flex-col gap-10 text-left">
      <section>
        <h3 className="mb-3 text-sm font-semibold">Markers</h3>
        <div className="flex flex-wrap gap-6">
          {(["upcoming", "inProgress", "done", "canceled"] as const).map(
            (s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <InventisActivityTimelineMarker status={s} />
                <span className="text-muted-foreground text-xs">{s}</span>
              </div>
            ),
          )}
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-sm font-semibold">Phase</h3>
        <div className="flex max-w-sm flex-col gap-3">
          <InventisActivityTimelinePhase
            title="Contract Phase : 2024 PALISADE"
            details={detailSample}
            defaultOpen
          />
          <InventisActivityTimelinePhase title="Contract Phase : 2024 PALISADE" />
          <InventisActivityTimelinePhase
            title="Contract Phase : 2024 PALISADE"
            disabled
          />
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-sm font-semibold">Row</h3>
        <InventisActivityTimelineRow
          step={{
            status: "done",
            date: "Jan 24, 2026 2:20 pm",
            phaseTitle: "Contract Phase : 2024 PALISADE",
          }}
        />
        <div className="mt-4">
          <InventisActivityTimelineRow
            step={{
              status: "inProgress",
              date: "Jan 24, 2026 2:20 pm",
              phaseTitle: "Contract Phase : 2024 PALISADE",
              details: detailSample,
              defaultOpen: true,
            }}
            isLast
          />
        </div>
      </section>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      story: { inline: false, height: "720px" },
      description: {
        story: `[Properties](${figmaActivityTimelineNodeUrl(FIGMA_ACTIVITY_TIMELINE_NODE.properties)})`,
      },
    },
  },
};

function Panel({
  theme,
  children,
}: {
  theme: "light" | "dark";
  children: React.ReactNode;
}) {
  const dark = theme === "dark";
  return (
    <div
      className={cn(
        "relative flex min-h-[280px] flex-1 items-center justify-center rounded-2xl border p-8",
        dark
          ? "dark border-neutral-800 bg-neutral-950"
          : "border-border bg-background",
      )}
    >
      <span className="text-muted-foreground absolute top-3 right-3">
        {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </span>
      {children}
    </div>
  );
}

export const Pattern: Story = {
  name: "Pattern",
  parameters: {
    layout: "fullscreen",
    docs: {
      canvas: { layout: "fullscreen" },
      story: { inline: false, height: "380px" },
      description: {
        story: `[Pattern](${figmaActivityTimelineNodeUrl(FIGMA_ACTIVITY_TIMELINE_NODE.pattern)})`,
      },
    },
  },
  render: () => (
    <div
      className="flex flex-wrap justify-center gap-4 p-4"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.4)), linear-gradient(90deg, #f5f5f5, #f5f5f5)",
      }}
    >
      <Panel theme="light">
        <InventisActivityTimeline variant="inCard" />
      </Panel>
      <Panel theme="dark">
        <InventisActivityTimeline variant="inCard" />
      </Panel>
    </div>
  ),
};

export const PageVertical: Story = {
  name: "Page · Vertical",
  parameters: {
    layout: "padded",
    docs: {
      canvas: { layout: "fullscreen" },
      story: { inline: false, height: "480px" },
      description: {
        story: `[Vertical](${figmaActivityTimelineNodeUrl(FIGMA_ACTIVITY_TIMELINE_NODE.pageVertical)})`,
      },
    },
  },
  render: () => (
    <div className="bg-muted/20 mx-auto flex max-w-[1320px] flex-col gap-4 p-6">
      <div className="text-muted-foreground flex min-h-[100px] items-center justify-center rounded-lg border border-dashed">
        Slot
      </div>
      <InventisActivityTimeline variant="inCard" />
    </div>
  ),
};

export const PageHorizontal: Story = {
  name: "Page · Horizontal",
  parameters: {
    layout: "padded",
    docs: {
      canvas: { layout: "fullscreen" },
      story: { inline: false, height: "440px" },
      description: {
        story: `[Horizontal](${figmaActivityTimelineNodeUrl(FIGMA_ACTIVITY_TIMELINE_NODE.pageHorizontal)})`,
      },
    },
  },
  render: () => (
    <div className="bg-muted/20 mx-auto flex max-w-[1320px] gap-4 p-6">
      <div className="text-muted-foreground flex min-h-[360px] min-w-0 flex-1 items-center justify-center rounded-lg border border-dashed">
        Slot
      </div>
      <div className="w-[317px] shrink-0">
        <InventisActivityTimeline variant="inline" />
      </div>
    </div>
  ),
};
