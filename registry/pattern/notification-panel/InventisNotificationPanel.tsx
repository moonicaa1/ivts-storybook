"use client";

import { Badge } from "@/bases/radix/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/bases/radix/components/ui/input-group";
import { Kbd } from "@/bases/radix/components/ui/kbd";
import { ScrollArea } from "@/bases/radix/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/bases/radix/components/ui/tabs";
import { cn } from "@/bases/radix/lib/utils";
import { Search } from "lucide-react";
import * as React from "react";

import { InventisRoCard } from "../ro-card/InventisRoCard";
import {
  defaultAlertCenterMessages,
  defaultAlertCenterTabs,
  defaultQueueRoItems,
  defaultQueueTabs,
  filterAlertCenterMessages,
  filterQueueItems,
  type AlertCenterMessage,
  type NotificationPanelTab,
  type QueueRoItem,
} from "./notification-panel.config";

export type InventisNotificationPanelVariant = "alert-center" | "queue";

export type InventisNotificationPanelProps = {
  /** Figma `Property 1=` — Alert Center vs Queue */
  variant?: InventisNotificationPanelVariant;
  title?: string;
  tabs?: NotificationPanelTab[];
  messages?: AlertCenterMessage[];
  queueItems?: QueueRoItem[];
  searchPlaceholder?: string;
  defaultTab?: string;
  className?: string;
};

function AlertCenterMessageCard({ item }: { item: AlertCenterMessage }) {
  const read = !item.unread;

  return (
    <article
      className={cn(
        "flex flex-col gap-2 rounded-lg border p-3",
        read ? "bg-background" : "bg-muted",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-sm font-semibold">{item.categoryLabel}</span>
          {item.unread ? (
            <span
              className="size-2 shrink-0 rounded-full bg-blue-600"
              aria-label="Unread"
            />
          ) : null}
        </div>
        <time
          className={cn(
            "shrink-0 text-xs",
            read ? "text-muted-foreground" : "text-foreground",
          )}
        >
          {item.timeLabel}
        </time>
      </div>
      <p className="truncate text-xs font-medium">{item.subject}</p>
      <p
        className={cn(
          "line-clamp-3 text-xs whitespace-pre-wrap",
          read ? "text-muted-foreground" : "text-muted-foreground",
        )}
      >
        {item.snippet}
      </p>
      {item.tags?.length ? (
        <div className="flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <Badge key={t.label} variant={t.variant}>
              {t.label}
            </Badge>
          ))}
        </div>
      ) : null}
    </article>
  );
}

/**
 * Inventis DS 알림 패널 (Figma ❖ Notification panel — Alert Center / Queue).
 * 폭 398px · 헤더 탭 · 검색 InputGroup · 스크롤 목록.
 */
export function InventisNotificationPanel({
  variant = "alert-center",
  title: titleProp,
  tabs: tabsProp,
  messages: messagesProp,
  queueItems: queueItemsProp,
  searchPlaceholder = "Search by name",
  defaultTab = "all",
  className,
}: InventisNotificationPanelProps) {
  const title =
    titleProp ?? (variant === "alert-center" ? "Alert Center" : "Queue");
  const tabs =
    tabsProp ??
    (variant === "alert-center" ? defaultAlertCenterTabs : defaultQueueTabs);
  const messages = messagesProp ?? defaultAlertCenterMessages;
  const queueItems = queueItemsProp ?? defaultQueueRoItems;

  const tabValues = React.useMemo(() => tabs.map((t) => t.value), [tabs]);

  const renderAlertList = (tab: string) => {
    const filtered = filterAlertCenterMessages(messages, tab);
    return (
      <div className="flex flex-col gap-2">
        {filtered.map((m) => (
          <AlertCenterMessageCard key={m.id} item={m} />
        ))}
      </div>
    );
  };

  const renderQueueList = (tab: string) => {
    const filtered = filterQueueItems(queueItems, tab);
    return (
      <div className="flex flex-col gap-2">
        {filtered.map((item) => {
          const { id, queueTabKey, ...cardProps } = item;
          void queueTabKey;
          return <InventisRoCard key={id} {...cardProps} className="w-full" />;
        })}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "bg-sidebar text-sidebar-foreground border-sidebar-border flex h-full min-h-0 w-[398px] shrink-0 flex-col border-l",
        className,
      )}
    >
      <Tabs
        defaultValue={defaultTab}
        className="flex min-h-0 flex-1 flex-col gap-0"
      >
        <div className="flex h-14 shrink-0 items-center gap-2 border-b px-4 py-2">
          <h2 className="min-w-0 flex-1 truncate text-xl leading-7 font-semibold">
            {title}
          </h2>
          <TabsList className="h-8 shrink-0 p-[3px]">
            {tabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="px-2.5">
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="shrink-0 p-4">
          <InputGroup className="h-8 rounded-lg shadow-xs">
            <InputGroupAddon align="inline-start">
              <Search
                className="text-muted-foreground pointer-events-none"
                aria-hidden
              />
            </InputGroupAddon>
            <InputGroupInput placeholder={searchPlaceholder} />
            <InputGroupAddon align="inline-end">
              <Kbd className="pointer-events-none">⌘F</Kbd>
            </InputGroupAddon>
          </InputGroup>
        </div>

        {variant === "alert-center"
          ? tabValues.map((value) => (
              <TabsContent
                key={value}
                value={value}
                className="m-0 flex min-h-0 flex-1 flex-col px-0 pt-0 pb-0"
              >
                <ScrollArea className="min-h-0 flex-1">
                  <div className="flex flex-col gap-2 px-4 pb-4">
                    {renderAlertList(value)}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))
          : tabValues.map((value) => (
              <TabsContent
                key={value}
                value={value}
                className="m-0 flex min-h-0 flex-1 flex-col px-0 pt-0 pb-0"
              >
                <ScrollArea className="min-h-0 flex-1">
                  <div className="flex flex-col gap-2 px-4 pb-4">
                    {renderQueueList(value)}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
      </Tabs>
    </div>
  );
}
