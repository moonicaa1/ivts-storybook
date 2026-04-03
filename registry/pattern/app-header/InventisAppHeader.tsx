"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/bases/radix/components/ui/breadcrumb";
import { Button } from "@/bases/radix/components/ui/button";
import { Kbd } from "@/bases/radix/components/ui/kbd";
import { Separator } from "@/bases/radix/components/ui/separator";
import { SidebarTrigger } from "@/bases/radix/components/ui/sidebar";
import { cn } from "@/bases/radix/lib/utils";
import { CircleHelp, MoreHorizontal, Plus, Search, X } from "lucide-react";
import * as React from "react";

import {
  defaultInventisHeaderBreadcrumbs,
  defaultInventisHeaderWindowTabs,
  type InventisHeaderBreadcrumbItem,
  type InventisHeaderWindowTab,
} from "./app-header.config";

export type InventisAppHeaderVariant = "default" | "breadcrumb" | "window";

export type InventisAppHeaderProps = {
  /** Figma `Type=` — 레이아웃 축 */
  variant?: InventisAppHeaderVariant;
  /** 글로벌 검색 UI (⌘K · ⇧ · 도움말 아이콘) */
  globalSearch?: boolean;
  /** 우측 Secondary Create 버튼 */
  showCreate?: boolean;
  breadcrumbs?: InventisHeaderBreadcrumbItem[];
  windowTabs?: InventisHeaderWindowTab[];
  className?: string;
  onSearchClick?: () => void;
  /** Figma `createOpen` — Create 관련 오버레이/플로우 열기 */
  onCreateClick?: () => void;
  onNewWindowClick?: () => void;
  onTabClose?: (tabId: string) => void;
  onTabMenuClick?: (tabId: string) => void;
};

function InventisHeaderSearchTrigger({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border-input bg-background dark:bg-input/30 text-muted-foreground inline-flex h-8 w-full max-w-80 min-w-[200px] shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-left text-sm shadow-xs transition-colors",
        "hover:bg-muted/40 focus-visible:ring-ring focus-visible:ring-[3px] focus-visible:outline-none",
        className,
      )}
    >
      <Search className="size-4 shrink-0" aria-hidden />
      <span className="min-w-0 flex-1 truncate">Search</span>
      <span className="text-muted-foreground flex shrink-0 items-center gap-1">
        <Kbd className="pointer-events-none">⌘K</Kbd>
        <Kbd className="pointer-events-none">⇧</Kbd>
      </span>
      <CircleHelp className="size-4 shrink-0 opacity-80" aria-hidden />
    </button>
  );
}

function InventisHeaderWindowTabButton({
  tab,
  onClose,
  onEllipsisClick,
}: {
  tab: InventisHeaderWindowTab;
  onClose?: (id: string) => void;
  onEllipsisClick?: (id: string) => void;
}) {
  if (tab.state === "ellipsis") {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="size-9 shrink-0 rounded-md"
        aria-label="More tabs"
        onClick={() => onEllipsisClick?.(tab.id)}
      >
        <MoreHorizontal className="size-4" />
      </Button>
    );
  }

  const selected = tab.state === "selected";

  return (
    <div
      className={cn(
        "flex h-9 max-w-[100px] shrink-0 items-center gap-0.5 rounded-md px-1 font-medium",
        selected && "bg-accent text-accent-foreground",
        !selected && "text-muted-foreground",
      )}
    >
      <button
        type="button"
        className={cn(
          "hover:bg-muted/50 flex min-w-0 flex-1 items-center rounded-sm px-1.5 py-1 text-sm",
          selected && "hover:bg-accent/80",
        )}
      >
        <span className="truncate">{tab.label}</span>
      </button>
      <button
        type="button"
        className={cn(
          "text-muted-foreground hover:text-foreground flex size-7 shrink-0 items-center justify-center rounded-sm",
          selected && "hover:bg-accent/80",
        )}
        aria-label={`Close ${tab.label}`}
        onClick={() => onClose?.(tab.id)}
      >
        <X className="size-4 opacity-70" aria-hidden />
      </button>
    </div>
  );
}

/**
 * Inventis DS 앱 상단 헤더 (Figma ❖ Header — Default / Breadcrumb / Window).
 * `SidebarTrigger` 사용 시 상위에 `SidebarProvider`가 있어야 합니다.
 */
export function InventisAppHeader({
  variant = "default",
  globalSearch = true,
  showCreate = true,
  breadcrumbs = defaultInventisHeaderBreadcrumbs,
  windowTabs = defaultInventisHeaderWindowTabs,
  className,
  onSearchClick,
  onCreateClick,
  onNewWindowClick,
  onTabClose,
  onTabMenuClick,
}: InventisAppHeaderProps) {
  return (
    <header
      className={cn(
        "bg-background flex h-[49px] w-full shrink-0 items-center gap-4 border-b px-6",
        className,
      )}
    >
      <div className="flex min-w-0 shrink-0 items-center gap-2">
        <SidebarTrigger className="size-7 rounded-md" />
        <Separator orientation="vertical" className="h-[15px] w-px" />

        {variant === "default" ? null : variant === "breadcrumb" ? (
          <Breadcrumb>
            <BreadcrumbList className="gap-2.5 sm:gap-2.5">
              {breadcrumbs.flatMap((item, i) => {
                const nodes: React.ReactNode[] = [];
                if (i > 0) {
                  nodes.push(
                    <BreadcrumbSeparator
                      key={`sep-${i}`}
                      className="[&>svg]:size-3.5"
                    />,
                  );
                }
                nodes.push(
                  <BreadcrumbItem key={`${item.label}-${i}`}>
                    {item.href ? (
                      <BreadcrumbLink
                        href={item.href}
                        className="text-muted-foreground"
                      >
                        {item.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>,
                );
                return nodes;
              })}
            </BreadcrumbList>
          </Breadcrumb>
        ) : (
          <nav
            className="flex min-w-0 items-center gap-1"
            aria-label="Window tabs"
          >
            {windowTabs.map((tab) => (
              <InventisHeaderWindowTabButton
                key={tab.id}
                tab={tab}
                onClose={onTabClose}
                onEllipsisClick={onTabMenuClick}
              />
            ))}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 px-2.5 font-medium"
              onClick={onNewWindowClick}
            >
              <Plus className="size-4" />
              New Window
            </Button>
          </nav>
        )}
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
        {globalSearch ? (
          <InventisHeaderSearchTrigger onClick={onSearchClick} />
        ) : null}
        {showCreate ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-8 gap-1.5 px-2.5"
            onClick={onCreateClick}
          >
            <Plus className="size-4" />
            Create
          </Button>
        ) : null}
      </div>
    </header>
  );
}
