"use client";

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/bases/radix/components/ui/sidebar";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { InventisNavigationSidebar } from "./navigation-sidebar/InventisNavigationSidebar";
import { FIGMA_FILE_BASE } from "./navigation-sidebar/figma";

type NavigationSidebarArgs = React.ComponentProps<
  typeof InventisNavigationSidebar
>;

const meta = {
  id: "pattern-sidebar",
  title: "Pattern/Navigation Sidebar",
  component: InventisNavigationSidebar,
  tags: ["!autodocs"],
  argTypes: {
    side: {
      name: "side",
      description:
        "Figma / shadcn `Sidebar` — 도킹 방향 (좌·우). 노드 스펙의 레이아웃 프로퍼티에 대응.",
      options: ["left", "right"],
      control: { type: "radio" },
    },
    variant: {
      name: "variant",
      description:
        "`sidebar` | `floating` | `inset` — 셸 스타일. 디자인 시스템과 동일 프로퍼티 축.",
      options: ["sidebar", "floating", "inset"],
      control: { type: "radio" },
    },
    collapsible: {
      name: "collapsible",
      description:
        "`icon` 권장: 접었을 때 아이콘 레일만 표시. `offcanvas` / `none` 동일 API.",
      options: ["offcanvas", "icon", "none"],
      control: { type: "radio" },
    },
  },
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "icon",
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `Inventis DS 앱 네비게이션 사이드바. 구현은 \`InventisNavigationSidebar\` + \`defaultInventisNavigationModel\` 로 분리되어 있습니다. ([Figma 파일](${FIGMA_FILE_BASE}))`,
      },
    },
  },
} satisfies Meta<typeof InventisNavigationSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

function PreviewShell({
  args,
  defaultOpen,
}: {
  args: NavigationSidebarArgs;
  defaultOpen: boolean;
}) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-svh w-full" dir="ltr">
        <InventisNavigationSidebar {...args} />
        <main className="bg-background text-foreground flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <p className="text-muted-foreground text-sm">
              SidebarTrigger · 레일 클릭 · Cmd/Ctrl+B
            </p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

/** 펼침. Controls로 `side` / `variant` / `collapsible` 조작. */
export const Expanded: Story = {
  render: (args) => <PreviewShell args={args} defaultOpen />,
};

/** 접힘(아이콘 레일). `collapsible="icon"` 일 때 Figma Collapsed 에 대응. */
export const Collapsed: Story = {
  render: (args) => <PreviewShell args={args} defaultOpen={false} />,
};
