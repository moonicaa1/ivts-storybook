"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  SidebarRail,
  useSidebar,
} from "@/bases/radix/components/ui/sidebar";
import { Switch } from "@/bases/radix/components/ui/switch";
import { cn } from "@/bases/radix/lib/utils";
import { ChevronRight, ChevronsUpDown, MoreVertical, Sun } from "lucide-react";
import * as React from "react";

import {
  defaultInventisNavigationModel,
  inventisProductIcon,
  type InventisNavItem,
  type InventisNavigationModel,
} from "./navigation-sidebar.config";

export type InventisNavigationSidebarProps = Omit<
  React.ComponentProps<typeof Sidebar>,
  "children"
> & {
  /** 기본값: Figma Aside 샘플. 라우트·라벨만 교체해 프로덕트에 맞춤 */
  model?: InventisNavigationModel;
  /** 제어 모드 다크 토글 */
  darkMode?: boolean;
  defaultDarkMode?: boolean;
  onDarkModeChange?: (value: boolean) => void;
  /** ⋮ 메뉴 */
  onUserMenuAction?: (action: "profile" | "signout") => void;
  /** 메뉴 항목 클릭 (라우팅은 앱에서 연결) */
  onNavItemPress?: (itemId: string) => void;
  onProductPress?: () => void;
};

/**
 * Inventis DS — 앱 네비게이션 사이드바 (Figma Aside).
 * 반드시 상위에 `SidebarProvider`가 있어야 합니다.
 */
export function InventisNavigationSidebar({
  model = defaultInventisNavigationModel,
  darkMode: darkModeControlled,
  defaultDarkMode = false,
  onDarkModeChange,
  onUserMenuAction,
  onNavItemPress,
  onProductPress,
  className,
  ...sidebarProps
}: InventisNavigationSidebarProps) {
  const { state } = useSidebar();
  const [internalDark, setInternalDark] = React.useState(defaultDarkMode);
  const darkMode =
    darkModeControlled !== undefined ? darkModeControlled : internalDark;

  const setDarkMode = React.useCallback(
    (next: boolean) => {
      onDarkModeChange?.(next);
      if (darkModeControlled === undefined) setInternalDark(next);
    },
    [darkModeControlled, onDarkModeChange],
  );

  const ProductIcon = inventisProductIcon;

  /** Figma: 메뉴는 `<button>` — `<a href="#">` 는 기본 파란 밑줄 링크로 보임 */
  const renderItem = (item: InventisNavItem) => (
    <SidebarMenuItem key={item.id}>
      <SidebarMenuButton
        type="button"
        tooltip={item.label}
        onClick={() => onNavItemPress?.(item.id)}
      >
        <item.icon className="shrink-0" />
        <span className="truncate group-data-[collapsible=icon]:hidden">
          {item.label}
        </span>
        {item.showChevron ? (
          <ChevronRight className="ml-auto size-4 shrink-0 opacity-70 group-data-[collapsible=icon]:hidden" />
        ) : null}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  /** 접힘: 3rem 레일에서 좌우 패딩 제거 — px-2 누적이 아이콘을 우측으로 밀었음 */
  const railNoPadX =
    "group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:pl-0 group-data-[collapsible=icon]:pr-0";

  return (
    <Sidebar
      {...sidebarProps}
      className={className ?? "bg-sidebar border-none"}
    >
      <SidebarHeader
        className={cn(
          "gap-0 p-2",
          railNoPadX,
          "group-data-[collapsible=icon]:py-1.5",
        )}
      >
        <SidebarMenu>
          <SidebarMenuItem className="relative">
            <SidebarMenuButton
              type="button"
              size="lg"
              tooltip={model.user.name}
              className="h-auto min-h-12 py-2 pr-10 group-data-[collapsible=icon]:min-h-8 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:pr-0"
            >
              <span className="bg-sidebar-accent text-sidebar-foreground hidden size-8 shrink-0 items-center justify-center rounded-md text-sm font-semibold group-data-[collapsible=icon]:flex">
                {model.user.initial}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-left leading-none group-data-[collapsible=icon]:hidden">
                <span className="text-sidebar-foreground truncate text-sm font-semibold">
                  {model.user.name}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {model.user.email}
                </span>
              </div>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md outline-hidden group-data-[collapsible=icon]:hidden focus-visible:ring-2"
                  aria-label="Account menu"
                >
                  <MoreVertical className="size-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48" side="bottom">
                <DropdownMenuItem
                  onSelect={() => onUserMenuAction?.("profile")}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => onUserMenuAction?.("signout")}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent
        className={cn(
          "gap-0 px-2",
          "group-data-[collapsible=icon]:gap-1",
          railNoPadX,
        )}
      >
        <SidebarGroup
          className={cn("py-0 pb-2", "group-data-[collapsible=icon]:p-0")}
        >
          <SidebarMenu className="gap-1">
            {model.quickLinks.map(renderItem)}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup
          className={cn("py-0", "group-data-[collapsible=icon]:p-0")}
        >
          <SidebarGroupLabel>{model.workspaces.label}</SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {model.workspaces.items.map(renderItem)}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup
          className={cn("py-0", "group-data-[collapsible=icon]:p-0")}
        >
          <SidebarGroupLabel>{model.commonAssets.label}</SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {model.commonAssets.items.map(renderItem)}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter
        className={cn(
          "mt-auto gap-2 p-2",
          "group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-1",
          railNoPadX,
          "group-data-[collapsible=icon]:py-2",
        )}
      >
        <SidebarGroup
          className={cn("p-0", "group-data-[collapsible=icon]:p-0")}
        >
          <SidebarGroupLabel>{model.footerUtilityGroupLabel}</SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {model.footerUtility.map(renderItem)}
          </SidebarMenu>
        </SidebarGroup>

        <div
          className={cn(
            "text-sidebar-foreground flex h-8 w-full max-w-full min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-sm",
            "group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:max-w-none group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0",
          )}
          title="Dark Mode"
        >
          <Sun
            className="size-4 shrink-0 group-data-[collapsible=icon]:hidden"
            aria-hidden
          />
          <span className="min-w-0 flex-1 truncate group-data-[collapsible=icon]:sr-only">
            Dark Mode
          </span>
          <Switch
            size={state === "collapsed" ? "sm" : "default"}
            checked={darkMode}
            onCheckedChange={setDarkMode}
            aria-label="Dark mode"
            className="shrink-0"
          />
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              type="button"
              size="lg"
              tooltip={model.product.name}
              onClick={() => onProductPress?.()}
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
                <ProductIcon className="size-4" />
              </div>
              <div className="grid min-w-0 flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">
                  {model.product.name}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {model.product.version}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 shrink-0 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
