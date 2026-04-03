"use client";

import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { Badge } from "@/bases/radix/components/ui/badge";
import { cn } from "@/bases/radix/lib/utils";

export type InventisMetricCardVariant = "default" | "compact";

export type InventisMetricCardDeltaDirection = "down" | "up" | "neutral";

export type InventisMetricCardProps = {
  /** Figma `Type=` — Default(푸터 트렌드·설명) · Compact(지표만) */
  variant?: InventisMetricCardVariant;
  className?: string;
  title: string;
  value: string;
  /** 배지 안 변화율 텍스트 (예: `-2%`, `12.5%`) */
  delta: string;
  deltaDirection?: InventisMetricCardDeltaDirection;
  /** Default 전용 — 본문 아래 첫 줄 */
  footerTrend?: string;
  /** Default 전용 — 보조 설명 */
  footerHint?: string;
};

function DeltaIcon({
  direction,
  className,
}: {
  direction: InventisMetricCardDeltaDirection;
  className?: string;
}) {
  const cls = cn("size-3 shrink-0", className);
  if (direction === "up") return <ArrowUpRight className={cls} aria-hidden />;
  if (direction === "neutral") return <Minus className={cls} aria-hidden />;
  return <ArrowDownRight className={cls} aria-hidden />;
}

/**
 * Inventis DS 메트릭(지표) 카드 — Figma Type=Default | Compact.
 */
export function InventisMetricCard({
  variant = "default",
  className,
  title,
  value,
  delta,
  deltaDirection = "down",
  footerTrend = "Trending down this month",
  footerHint = "Advisor utilization over the last 6 months",
}: InventisMetricCardProps) {
  const showFooter = variant === "default";

  return (
    <div
      className={cn(
        "text-card-foreground bg-card flex w-full min-w-0 flex-col overflow-hidden rounded-xl border p-6 shadow-sm",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--primary) 5%, transparent) 100%)",
      }}
    >
      <div
        className={cn("flex w-full flex-col", showFooter ? "gap-6" : "gap-0")}
      >
        <div className="flex w-full flex-col gap-1.5">
          <div className="flex w-full items-start justify-between gap-2">
            <p className="text-muted-foreground min-w-0 flex-1 text-sm leading-5 font-normal break-words">
              {title}
            </p>
            <Badge
              variant="outline"
              className="h-auto shrink-0 gap-1 rounded-full border px-2 py-0.5 text-xs font-medium"
            >
              <DeltaIcon direction={deltaDirection} />
              {delta}
            </Badge>
          </div>
          <p className="w-full text-3xl leading-9 font-semibold tracking-tight">
            {value}
          </p>
        </div>

        {showFooter ? (
          <div className="flex w-full flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <p className="text-sm leading-5 font-normal">{footerTrend}</p>
              <DeltaIcon direction={deltaDirection} className="size-4" />
            </div>
            <p className="text-muted-foreground text-sm leading-5 font-normal">
              {footerHint}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
