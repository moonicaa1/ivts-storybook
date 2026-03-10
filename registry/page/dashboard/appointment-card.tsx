"use client";

import { cn } from "@/bases/radix/lib/utils";
import { Avatar, AvatarFallback } from "@/bases/radix/components/ui/avatar";
import { Badge } from "@/bases/radix/components/ui/badge";
import { MoreHorizontal, AlertCircle } from "lucide-react";
import { Button } from "@/bases/radix/components/ui/button";

export type AppointmentStatus =
  | "awaiting-approval"
  | "checked-in"
  | "delayed"
  | "confirmed"
  | "completed";

export interface Appointment {
  id: string;
  customer: string;
  initials: string;
  vehicle: string;
  service: string;
  status: AppointmentStatus;
  price: string;
  timeInfo: string;
  hasPriority?: boolean;
}

const statusConfig: Record<
  AppointmentStatus,
  { label: string; dotColor: string }
> = {
  "awaiting-approval": {
    label: "Awaiting Approval",
    dotColor: "bg-amber-500",
  },
  "checked-in": { label: "Checked In", dotColor: "bg-emerald-500" },
  delayed: { label: "Delayed", dotColor: "bg-destructive" },
  confirmed: { label: "Confirmed", dotColor: "bg-emerald-500" },
  completed: { label: "Completed", dotColor: "bg-muted-foreground" },
};

const avatarColors = [
  "bg-violet-600",
  "bg-emerald-600",
  "bg-blue-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-cyan-600",
];

export function AppointmentCard({
  appointment,
}: {
  appointment: Appointment;
}) {
  const status = statusConfig[appointment.status];
  const colorIndex =
    appointment.customer.charCodeAt(0) % avatarColors.length;

  return (
    <div className="group flex flex-col rounded-lg border border-border bg-card p-4 gap-3 transition-shadow shadow-sm hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback
              className={cn(
                "text-xs font-semibold text-white",
                avatarColors[colorIndex],
              )}
            >
              {appointment.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">
                {appointment.id}
              </span>
              {appointment.hasPriority && (
                <AlertCircle className="h-3 w-3 text-amber-500 shrink-0" />
              )}
            </div>
            <p className="text-sm font-semibold text-foreground leading-tight truncate">
              {appointment.customer}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="space-y-0.5 border-t border-border pt-2.5">
        <p className="text-xs text-muted-foreground">{appointment.vehicle}</p>
        <p className="text-xs font-medium text-foreground">
          {appointment.service}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Badge
          variant="outline"
          className="h-5 gap-1.5 px-1.5 text-xs font-normal"
        >
          <span
            className={cn("h-1.5 w-1.5 rounded-full shrink-0", status.dotColor)}
          />
          {status.label}
        </Badge>
        <div className="text-right shrink-0">
          <p className="text-xs font-semibold text-foreground">
            {appointment.price}
          </p>
          <p className="text-xs text-muted-foreground">
            {appointment.timeInfo}
          </p>
        </div>
      </div>
    </div>
  );
}
