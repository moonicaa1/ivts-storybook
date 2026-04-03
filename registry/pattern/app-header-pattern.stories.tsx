"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@/bases/radix/components/ui/sidebar";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { InventisAppHeader } from "./app-header/InventisAppHeader";
import { FIGMA_HEADER_FILE_BASE } from "./app-header/figma";

type HeaderArgs = React.ComponentProps<typeof InventisAppHeader>;

const meta = {
  id: "pattern-app-header",
  title: "Pattern/App Header",
  component: InventisAppHeader,
  tags: ["!autodocs"],
  argTypes: {
    variant: {
      name: "variant",
      description:
        "Figma `Type=` — `default` (중앙 비움) · `breadcrumb` · `window` (탭 행).",
      options: ["default", "breadcrumb", "window"],
      control: { type: "radio" },
    },
    globalSearch: {
      name: "globalSearch",
      description: "우측 검색 트리거(⌘K · ⇧ · 도움말 아이콘).",
      control: { type: "boolean" },
    },
    showCreate: {
      name: "showCreate",
      description:
        "우측 Secondary `Create` 버튼. `onCreateClick`으로 `createOpen` 플로우 연결.",
      control: { type: "boolean" },
    },
  },
  args: {
    variant: "default",
    globalSearch: true,
    showCreate: true,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `Inventis DS 앱 상단 헤더 (Figma ❖ Header). \`SidebarTrigger\` 는 \`SidebarProvider\` 하위에서 동작합니다. ([Figma 파일](${FIGMA_HEADER_FILE_BASE}))`,
      },
    },
  },
} satisfies Meta<typeof InventisAppHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

function HeaderPreviewShell(props: HeaderArgs) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon">
        <SidebarContent className="gap-0 p-2">
          <p className="text-sidebar-foreground/70 px-2 py-3 text-xs">
            Preview sidebar · 트리거로 접기
          </p>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="min-h-svh overflow-hidden" dir="ltr">
        <InventisAppHeader {...props} />
        <div className="text-muted-foreground flex flex-1 flex-col gap-2 p-4 text-sm">
          <p>메인 콘텐츠 영역</p>
          <p className="text-xs">
            Cmd/Ctrl+B · 헤더 왼쪽 트리거로 사이드바 토글
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

/** Figma Type=Default — 트리거 · 구분선 · 빈 중앙 · 검색 · Create */
export const Default: Story = {
  args: { variant: "default" },
  render: (args) => <HeaderPreviewShell {...args} />,
};

/** Figma Type=Breadcrumb — Home → RO List → RO Detail */
export const Breadcrumb: Story = {
  args: { variant: "breadcrumb" },
  render: (args) => <HeaderPreviewShell {...args} />,
};

/** Figma Type=Window — 탭 · 더보기 · New Window */
export const Window: Story = {
  args: { variant: "window" },
  render: (args) => <HeaderPreviewShell {...args} />,
};
