"use client";

import { cn } from "@/bases/radix/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const statusData = [
  {
    label: "Confirmed",
    count: 8,
    trend: "+2 from yesterday",
    trendUp: true,
    dotColor: "bg-emerald-500",
  },
  {
    label: "Checked In",
    count: 3,
    trend: "On track",
    trendUp: null,
    dotColor: "bg-emerald-500",
  },
  {
    label: "Awaiting Approval",
    count: 2,
    trend: "Action needed",
    trendUp: false,
    dotColor: "bg-amber-500",
  },
  {
    label: "Delayed",
    count: 1,
    trend: "-1 from yesterday",
    trendUp: true,
    dotColor: "bg-destructive",
  },
];

export function StatusCards() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
      {statusData.map((status) => (
        <div
          key={status.label}
          className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5 lg:p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full shrink-0",
                status.dotColor,
              )}
            />
            <span className="text-xs font-medium text-muted-foreground truncate">
              {status.label}
            </span>
          </div>

          <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {status.count}
          </p>

          <div className="mt-2 flex items-center gap-1">
            {status.trendUp === true && (
              <TrendingUp className="h-3 w-3 text-emerald-500 shrink-0" />
            )}
            {status.trendUp === false && (
              <TrendingDown className="h-3 w-3 text-amber-500 shrink-0" />
            )}
            {status.trendUp === null && (
              <Minus className="h-3 w-3 text-muted-foreground shrink-0" />
            )}
            <span className="text-xs text-muted-foreground">
              {status.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
