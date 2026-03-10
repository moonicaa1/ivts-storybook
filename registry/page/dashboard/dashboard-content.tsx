"use client";

import { Clock, RefreshCw } from "lucide-react";
import { Button } from "@/bases/radix/components/ui/button";
import { StatusCards } from "./status-cards";
import { NextActionCard } from "./next-action-card";
import { AppointmentsList } from "./appointments-list";

export function DashboardContent() {
  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-4 md:space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1 min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {"Today's Appointments"}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>{formattedDate}</span>
            <span className="text-border">·</span>
            <Clock className="h-3.5 w-3.5" />
            <span>{formattedTime}</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-xs font-normal rounded-full border-border shadow-none shrink-0 self-start sm:self-auto"
        >
          <RefreshCw className="h-3 w-3" />
          Refresh
        </Button>
      </div>

      <StatusCards />
      <NextActionCard />
      <AppointmentsList />
    </div>
  );
}
