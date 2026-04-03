"use client";

import { Badge } from "@/bases/radix/components/ui/badge";
import { Button } from "@/bases/radix/components/ui/button";
import { Progress } from "@/bases/radix/components/ui/progress";
import { cn } from "@/bases/radix/lib/utils";
import {
  Car,
  Loader2,
  Mail,
  MoreVertical,
  Phone,
  Ticket,
  Timer,
  User,
  Wrench,
} from "lucide-react";
import * as React from "react";

export type InventisRoCardType = "default" | "action" | "schedule";

export type InventisRoCardProps = {
  /** Figma `Type=` — Default(컴팩트) · Action(푸터 CTA) · Schedule(앰버 강조) */
  type?: InventisRoCardType;
  className?: string;
  customerName: string;
  /** RO 상태 (예: Draft) — emerald 배지; `schedule` 에서는 생략 */
  statusLabel?: string;
  vehicle: string;
  roNumber?: string;
  assignee?: string;
  timeStart?: string;
  timeEnd?: string;
  serviceType?: string;
  showProgress?: boolean;
  /** 0–100 */
  progressValue?: number;
  onMenuClick?: () => void;
  onSendSms?: () => void;
  onCall?: () => void;
  onCheckIn?: () => void;
};

function RowIcon({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-5 items-center gap-2">
      <span
        className="inline-flex size-4 shrink-0 items-center justify-center"
        aria-hidden
      >
        <Icon className="text-muted-foreground size-4" />
      </span>
      <span className="text-foreground min-w-0 flex-1 truncate text-sm leading-5">
        {children}
      </span>
    </div>
  );
}

/**
 * Inventis DS RO 카드 (Figma ❖ RO — Default / Action / Schedule).
 */
export function InventisRoCard({
  type = "default",
  className,
  customerName,
  statusLabel,
  vehicle,
  roNumber,
  assignee,
  timeStart,
  timeEnd,
  serviceType,
  showProgress,
  progressValue = 50,
  onMenuClick,
  onSendSms,
  onCall,
  onCheckIn,
}: InventisRoCardProps) {
  const showStatus = Boolean(statusLabel) && type !== "schedule";

  const shell = cn(
    "flex flex-col overflow-hidden border shadow-xs",
    type === "schedule"
      ? "rounded-[var(--radius-xs)] border border-l-[3px] border-amber-200 border-l-amber-600 bg-amber-50 dark:border-amber-800 dark:border-l-amber-500 dark:bg-amber-950/25"
      : type === "action"
        ? "bg-popover text-popover-foreground rounded-lg"
        : "bg-card text-card-foreground rounded-lg",
    className,
  );

  const header = (
    <div className="flex w-full items-center justify-between gap-2 px-4 pt-3 pb-2">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <span className="text-foreground flex min-h-5 min-w-0 items-center truncate text-[18px] leading-tight font-semibold tracking-tight">
          {customerName}
        </span>
        {showStatus ? (
          <Badge
            className="h-5 shrink-0 border-transparent bg-emerald-100 px-2 py-0 text-xs leading-none font-medium text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300"
            variant="secondary"
          >
            {statusLabel}
          </Badge>
        ) : null}
      </div>
      <Button
        type="button"
        variant="ghost"
        className="text-muted-foreground hover:text-foreground size-5 shrink-0 rounded-md p-0 [&_svg]:pointer-events-none"
        aria-label="More options"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onMenuClick}
      >
        <MoreVertical className="size-4" aria-hidden />
      </Button>
    </div>
  );

  const body = (
    <div className="flex flex-col gap-1 px-4 pb-2">
      <RowIcon icon={Car}>{vehicle}</RowIcon>
      {roNumber ? <RowIcon icon={Ticket}>{roNumber}</RowIcon> : null}
      {assignee && type !== "schedule" ? (
        <RowIcon icon={User}>{assignee}</RowIcon>
      ) : null}
      {timeStart ? (
        <div className="flex h-5 items-center gap-2">
          <span
            className="inline-flex size-4 shrink-0 items-center justify-center"
            aria-hidden
          >
            <Timer className="text-muted-foreground size-4" />
          </span>
          <span className="text-foreground min-w-0 flex-1 truncate text-sm leading-5">
            {timeStart}
            {timeEnd ? (
              <>
                {" "}
                <span aria-hidden>—</span> {timeEnd}
              </>
            ) : null}
          </span>
        </div>
      ) : null}
      {serviceType && type !== "schedule" ? (
        <RowIcon icon={Wrench}>{serviceType}</RowIcon>
      ) : null}
      {showProgress ? (
        <div className="flex min-h-5 items-center gap-2 pt-0.5">
          <span
            className="inline-flex size-4 shrink-0 items-center justify-center"
            aria-hidden
          >
            <Loader2 className="text-muted-foreground size-4 animate-spin" />
          </span>
          <Progress
            value={progressValue}
            className="bg-muted h-1 max-w-full min-w-0 flex-1 rounded-full"
          />
        </div>
      ) : null}
    </div>
  );

  const footer =
    type === "action" ? (
      <div className="bg-muted/40 flex gap-2 border-t px-4 py-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="flex-1 gap-1.5"
          onClick={onSendSms}
        >
          <Mail className="size-4" />
          Send SMS
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="flex-1 gap-1.5"
          onClick={onCall}
        >
          <Phone className="size-4" />
          Call
        </Button>
        <Button
          type="button"
          size="sm"
          className="min-w-[120px] flex-1"
          onClick={onCheckIn}
        >
          Check In
        </Button>
      </div>
    ) : null;

  return (
    <article className={shell}>
      {header}
      {body}
      {footer}
    </article>
  );
}
