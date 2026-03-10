"use client";

import * as React from "react";
import {
  Avatar,
  AvatarFallback,
} from "@/bases/radix/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/bases/radix/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/bases/radix/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
} from "@/bases/radix/components/ui/sidebar";
import {
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Ellipsis,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const navPlatform = [
  {
    title: "Playground",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      { title: "History", url: "#" },
      { title: "Starred", url: "#" },
      { title: "Settings", url: "#" },
    ],
  },
  {
    title: "Models",
    url: "#",
    icon: Bot,
    items: [],
  },
  {
    title: "Documentation",
    url: "#",
    icon: BookOpen,
    items: [],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [],
  },
];

const navProjects = [
  { name: "Design Engineering", url: "#", icon: Frame },
  { name: "Sales & Marketing", url: "#", icon: PieChart },
  { name: "Travel", url: "#", icon: Map },
];

type SidebarArgs = {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
};

const meta = {
  title: "Pattern/Sidebar",
  component: Sidebar,
  tags: ["!autodocs"],
  argTypes: {
    side: {
      options: ["left", "right"],
      control: { type: "radio" },
    },
    variant: {
      options: ["sidebar", "floating", "inset"],
      control: { type: "radio" },
    },
    collapsible: {
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
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

function AppSidebar(args: SidebarArgs) {
  return (
    <Sidebar {...args} className="border-none bg-sidebar">
      <SidebarHeader className="px-2 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild tooltip="Documentation">
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shrink-0">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-sm">Documentation</span>
                  <span className="text-xs text-muted-foreground">v1.0.1</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 shrink-0" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {navPlatform.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon className="shrink-0" />}
                      <span>{item.title}</span>
                      {item.items && item.items.length > 0 && (
                        <ChevronRight className="ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items && item.items.length > 0 && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>{subItem.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="p-0 group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {navProjects.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild tooltip={item.name}>
                  <a href={item.url}>
                    <item.icon className="shrink-0" />
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton
                className="text-sidebar-foreground/70"
                tooltip="More"
              >
                <Ellipsis className="shrink-0" />
                <span>More</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="rounded-lg data-[state=open]:bg-muted"
                  tooltip="shadcn"
                >
                  <Avatar className="h-8 w-8 rounded-lg shrink-0">
                    <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
                      sh
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">shadcn</span>
                    <span className="truncate text-xs text-muted-foreground">
                      m@example.com
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 shrink-0" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="top"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
                        sh
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">shadcn</span>
                      <span className="truncate text-xs text-muted-foreground">
                        m@example.com
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Account Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

/** Figma 스펙 기반 사이드바 패턴 (Header, Platform, Projects, Footer) */
export const Default: Story = {
  render: (args) => (
    <div className="flex min-h-svh w-fit">
      <AppSidebar {...args} />
    </div>
  ),
};
