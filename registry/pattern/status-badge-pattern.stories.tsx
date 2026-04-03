"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Car, Clock, MoreVertical, Ticket, User, Wrench } from "lucide-react";
import * as React from "react";

import { Button } from "@/bases/radix/components/ui/button";
import { cn } from "@/bases/radix/lib/utils";

import {
  INVENTIS_STATUS_BADGE_COLORS,
  InventisStatusBadge,
  type InventisStatusBadgeColor,
} from "./status-badge/InventisStatusBadge";
import {
  FIGMA_STATUS_BADGE_FILE_BASE,
  FIGMA_STATUS_BADGE_NODE,
  FIGMA_STATUS_BADGE_NODE_IDS,
  figmaStatusBadgeNodeUrl,
} from "./status-badge/figma";

const meta = {
  id: "pattern-status-badge",
  title: "Pattern/Status Badge",
  component: InventisStatusBadge,
  tags: ["!autodocs"],
  args: {
    color: "teal" as InventisStatusBadgeColor,
    children: "Assigned",
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Inventis DS **Status Badge** (소프트 톤 12색). [Figma](${FIGMA_STATUS_BADGE_FILE_BASE})`,
      },
      canvas: { layout: "padded" },
    },
  },
} satisfies Meta<typeof InventisStatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Figma Properties `26863:28021` — 컴포넌트 12 variant */
export const Properties: Story = {
  name: "Properties",
  render: () => (
    <div className="flex w-full max-w-[120px] flex-col gap-2.5">
      {INVENTIS_STATUS_BADGE_COLORS.map((c) => (
        <div key={c} className="flex flex-col gap-1">
          <InventisStatusBadge color={c}>status</InventisStatusBadge>
          <span className="text-muted-foreground text-[10px] capitalize">
            {c}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      story: { inline: false, height: "560px" },
      description: {
        story: `[Properties](${figmaStatusBadgeNodeUrl(FIGMA_STATUS_BADGE_NODE.properties)})`,
      },
    },
  },
};

/** Figma RO `26867:63594` — 헤더에 teal Assigned 뱃지 */
function RoCardWithBadge() {
  return (
    <div
      className={cn(
        "bg-background/95 border-border w-[233px] overflow-hidden rounded-[var(--radius-lg)] border shadow-xs",
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <p className="text-card-foreground truncate text-lg leading-none font-semibold">
            RO# 1234
          </p>
          <InventisStatusBadge color="teal">Assigned</InventisStatusBadge>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="size-8 shrink-0"
          aria-label="More"
        >
          <MoreVertical className="size-5" />
        </Button>
      </div>
      <div className="flex flex-col gap-1 px-4 pb-2">
        <Row icon={Car} text="2023 Toyota Camry XSE" />
        <Row icon={Ticket} text="KCS-452" />
        <Row icon={User} text="Lucas" />
        <div className="text-foreground flex h-5 items-center gap-2 text-sm">
          <Clock className="size-4 shrink-0" />
          <span className="truncate">10:30 am</span>
          <span>-</span>
          <span className="truncate">11:30 am</span>
        </div>
        <Row icon={Wrench} text="Brake Service" />
      </div>
    </div>
  );
}

function Row({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <div className="text-foreground flex h-5 items-center gap-2 text-sm">
      <Icon className="size-4 shrink-0" />
      <span className="min-w-0 flex-1 truncate">{text}</span>
    </div>
  );
}

export const RoContext: Story = {
  name: "RO · context",
  render: () => <RoCardWithBadge />,
  parameters: {
    docs: {
      story: { inline: false, height: "320px" },
      description: {
        story: `[RO + Status Badge](${figmaStatusBadgeNodeUrl(FIGMA_STATUS_BADGE_NODE.roCard)})`,
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
  const dark = theme === "dark";
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center rounded-2xl border p-8",
        dark
          ? "dark border-neutral-800 bg-neutral-950"
          : "border-border bg-background",
      )}
    >
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
      story: { inline: false, height: "360px" },
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
      <PatternPanel theme="light">
        <div className="flex flex-wrap justify-center gap-2">
          {INVENTIS_STATUS_BADGE_COLORS.map((c) => (
            <InventisStatusBadge key={c} color={c}>
              {c}
            </InventisStatusBadge>
          ))}
        </div>
      </PatternPanel>
      <PatternPanel theme="dark">
        <div className="flex flex-wrap justify-center gap-2">
          {INVENTIS_STATUS_BADGE_COLORS.map((c) => (
            <InventisStatusBadge key={c} color={c}>
              {c}
            </InventisStatusBadge>
          ))}
        </div>
      </PatternPanel>
    </div>
  ),
};

/** 예시 라벨 (문서/플로우용) */
const EXAMPLES: { label: string; color: InventisStatusBadgeColor }[] = [
  { label: "Draft RO", color: "mute" },
  { label: "Completed", color: "green" },
  { label: "Assigned", color: "teal" },
  { label: "In progress", color: "blue" },
  { label: "Waiting", color: "amber" },
  { label: "Canceled", color: "red" },
  { label: "Scheduled", color: "violet" },
  { label: "No show", color: "pink" },
];

export const Examples: Story = {
  name: "Examples",
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      {EXAMPLES.map(({ label, color }) => (
        <div key={label} className="flex items-center gap-3">
          <InventisStatusBadge color={color}>{label}</InventisStatusBadge>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      story: { inline: false, height: "360px" },
    },
  },
};

/** 요청 24프레임 Figma 링크 (독스용) */
export const FigmaFramesIndex: Story = {
  name: "Figma frames (24)",
  render: () => (
    <ul className="text-muted-foreground max-h-[480px] max-w-2xl list-inside list-decimal overflow-auto text-left text-sm">
      {FIGMA_STATUS_BADGE_NODE_IDS.map((id) => (
        <li key={id}>
          <a
            className="text-foreground underline"
            href={figmaStatusBadgeNodeUrl(id)}
            target="_blank"
            rel="noreferrer"
          >
            node {id}
          </a>
        </li>
      ))}
    </ul>
  ),
  parameters: {
    layout: "padded",
    docs: {
      story: { inline: false, height: "520px" },
      description: {
        story: "사용자 요청 24개 노드 링크 목록",
      },
    },
  },
};
