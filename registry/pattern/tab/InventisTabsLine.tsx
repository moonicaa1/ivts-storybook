"use client";

import * as React from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/bases/radix/components/ui/tabs";
import { cn } from "@/bases/radix/lib/utils";

/** Filter 본문 컬럼과 동일 상한 — 페이지 안에서만 쓰일 때 */
const INVENTIS_MAIN_MAX = "max-w-[1320px]";

export type InventisTabsLineItem = {
  value: string;
  label: string;
  /** `panel` 이 없을 때 플레이스홀더 문구 (Figma Contents A … 등) */
  slotHint?: string;
  /** 탭 패널. 없으면 `slotHint` 기반 muted 플레이스홀더 */
  panel?: React.ReactNode;
};

export type InventisTabsLineProps = {
  /** Radix `Tabs` 기본값 — 미지정 시 `items[0].value` */
  defaultValue?: string;
  items: readonly InventisTabsLineItem[];
  className?: string;
};

function TabsLineSlotPlaceholder({ text }: { text: string }) {
  return (
    <div
      className="border-border bg-muted/40 text-muted-foreground flex min-h-[min(40vh,28rem)] w-full items-center justify-center rounded-lg border border-dashed p-6"
      data-name="Slot"
    >
      <p className="text-center text-sm font-medium">{text}</p>
    </div>
  );
}

/**
 * Inventis DS **Tabs/Line** — 라인 탭 줄 + 패널만 담당합니다.
 *
 * 글로벌 헤더·레일·페이지 제목 행은 **App Header** / **Navigation Sidebar** 등과 조합하세요.
 */
export function InventisTabsLine({
  defaultValue,
  items,
  className,
}: InventisTabsLineProps) {
  const fallback = items[0]?.value ?? "";
  const initial = defaultValue ?? fallback;

  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col",
        INVENTIS_MAIN_MAX,
        className,
      )}
    >
      <Tabs
        defaultValue={initial}
        className="flex w-full min-w-0 flex-col gap-4"
      >
        <TabsList
          variant="line"
          className="text-muted-foreground inline-flex h-auto w-full min-w-0 flex-wrap items-center justify-start gap-1 rounded-none bg-transparent p-0"
        >
          {items.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex-none shadow-none"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {items.map(({ value, label, panel, slotHint }) => (
          <TabsContent
            key={value}
            value={value}
            className="mt-0 min-h-0 outline-none"
          >
            {panel ?? (
              <TabsLineSlotPlaceholder text={slotHint ?? `Panel · ${label}`} />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
