"use client";

import {
  ArrowRight,
  Check,
  ChevronDown,
  Loader2,
  SquarePlus,
  X,
} from "lucide-react";

import { Badge } from "@/bases/radix/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/bases/radix/components/ui/collapsible";
import { cn } from "@/bases/radix/lib/utils";

export type ActivityTimelineStatus =
  | "upcoming"
  | "inProgress"
  | "done"
  | "canceled";

export type ActivityTimelineDetailRow =
  | { kind: "text"; label: string; value: string }
  | {
      kind: "badge";
      label: string;
      text: string;
      className: string;
    };

export type ActivityTimelineStep = {
  status: ActivityTimelineStatus;
  date: string;
  /** 취소 등 날짜 톤 다운 */
  dateMuted?: boolean;
  phaseTitle: string;
  /** 상세 행이 있으면 접기/펼치기 */
  details?: ActivityTimelineDetailRow[];
  /** 초기 펼침 */
  defaultOpen?: boolean;
  /** 비활성(취소 행) */
  disabled?: boolean;
};

const PHASE = "Contract Phase : 2024 PALISADE" as const;
const DATE = "Jan 24, 2026 2:20 pm" as const;

const DEFAULT_DETAILS: ActivityTimelineDetailRow[] = [
  { kind: "text", label: "Tracking ID", value: "String value" },
  {
    kind: "badge",
    label: "Assigned",
    text: "Lucas Admin",
    className: "bg-[#dcfce7] text-[#16a34a] border-transparent",
  },
  {
    kind: "badge",
    label: "Status",
    text: "Appointment",
    className: "bg-[#ccfbf1] text-[#0d9488] border-transparent",
  },
];

export const DEFAULT_ACTIVITY_TIMELINE_STEPS: ActivityTimelineStep[] = [
  {
    status: "upcoming",
    date: DATE,
    phaseTitle: PHASE,
  },
  {
    status: "inProgress",
    date: DATE,
    phaseTitle: PHASE,
    details: DEFAULT_DETAILS,
    defaultOpen: true,
  },
  {
    status: "canceled",
    date: DATE,
    dateMuted: true,
    phaseTitle: PHASE,
    disabled: true,
  },
  {
    status: "done",
    date: DATE,
    phaseTitle: PHASE,
  },
];

function StatusMarker({
  status,
  className,
}: {
  status: ActivityTimelineStatus;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center gap-1 rounded-full p-1",
        status === "upcoming" && "bg-[#a3a3a3] text-white",
        status === "inProgress" && "bg-[#16a34a] text-white",
        status === "done" && "bg-[#0a0a0a] text-white",
        status === "canceled" && "bg-[#dc2626] text-white",
        className,
      )}
      aria-hidden
    >
      <SquarePlus className="size-3" strokeWidth={2} />
      {status === "upcoming" && (
        <Loader2 className="size-3 animate-spin" strokeWidth={2} />
      )}
      {status === "inProgress" && (
        <ArrowRight className="size-3" strokeWidth={2} />
      )}
      {status === "done" && <Check className="size-3" strokeWidth={2.5} />}
      {status === "canceled" && <X className="size-3" strokeWidth={2.5} />}
    </div>
  );
}

function PhaseBlock({
  title,
  details,
  defaultOpen,
  disabled,
}: {
  title: string;
  details?: ActivityTimelineDetailRow[];
  defaultOpen?: boolean;
  disabled?: boolean;
}) {
  const hasDetails = details && details.length > 0;

  if (disabled) {
    return (
      <div className="border-border bg-background w-full max-w-[293px] rounded-[var(--radius-sm)] border px-2.5 py-2">
        <div className="flex items-center justify-between gap-2">
          <span className="min-w-0 flex-1 text-sm font-medium text-[#a3a3a3]">
            {title}
          </span>
          <ChevronDown className="size-4 shrink-0 rotate-180 text-[#a3a3a3]" />
        </div>
      </div>
    );
  }

  if (!hasDetails) {
    return (
      <div className="border-border bg-background w-full max-w-[293px] rounded-[var(--radius-sm)] border px-2.5 py-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-foreground min-w-0 flex-1 text-sm font-medium">
            {title}
          </span>
          <ChevronDown className="text-muted-foreground size-4 shrink-0 rotate-180" />
        </div>
      </div>
    );
  }

  return (
    <Collapsible
      defaultOpen={defaultOpen}
      className="group w-full max-w-[293px]"
    >
      <div className="border-border bg-background flex flex-col gap-2 rounded-[var(--radius-sm)] border px-2.5 py-2">
        <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 text-left">
          <span className="text-foreground min-w-0 flex-1 text-sm font-medium">
            {title}
          </span>
          <div className="flex-none rotate-180 group-data-[state=open]:-scale-y-100">
            <ChevronDown
              className="text-muted-foreground size-4"
              strokeWidth={2}
            />
          </div>
        </CollapsibleTrigger>
        <div className="hidden flex-col py-2 group-data-[state=open]:flex">
          <div className="bg-border h-px w-full" />
        </div>
        <CollapsibleContent>
          <div className="flex flex-col gap-3">
            {details!.map((row, i) => (
              <div
                key={i}
                className="text-foreground flex h-5 w-full items-center gap-2 text-sm"
              >
                {row.kind === "text" ? (
                  <>
                    <span className="min-w-0 flex-1 truncate font-normal">
                      {row.label}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-right font-normal">
                      {row.value}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="min-w-0 flex-1 truncate font-normal">
                      {row.label}
                    </span>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "h-5 shrink-0 rounded-full px-2 py-0 text-xs font-medium",
                        row.className,
                      )}
                    >
                      {row.text}
                    </Badge>
                  </>
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export function InventisActivityTimelineRow({
  step,
  isLast = false,
}: {
  step: ActivityTimelineStep;
  isLast?: boolean;
}) {
  return (
    <div className="flex w-full max-w-[317px] gap-3">
      <div className="flex w-6 shrink-0 flex-col items-center pt-0.5">
        <StatusMarker status={step.status} />
        {!isLast ? (
          <div
            className="bg-border mt-1 min-h-[16px] w-px flex-1"
            aria-hidden
          />
        ) : null}
      </div>
      <div className="min-w-0 flex-1 pb-1">
        <p
          className={cn(
            "text-sm leading-5 font-semibold",
            step.dateMuted ? "text-[#a3a3a3]" : "text-foreground",
          )}
        >
          {step.date}
        </p>
        <div className="mt-1">
          <PhaseBlock
            title={step.phaseTitle}
            details={step.details}
            defaultOpen={step.defaultOpen}
            disabled={step.disabled}
          />
        </div>
      </div>
    </div>
  );
}

export function InventisActivityTimeline({
  variant = "inCard",
  title = "Activity",
  steps = DEFAULT_ACTIVITY_TIMELINE_STEPS,
  className,
}: {
  variant?: "inline" | "inCard";
  title?: string;
  steps?: ActivityTimelineStep[];
  className?: string;
}) {
  const list = (
    <div className="flex w-full max-w-[317px] flex-col gap-2">
      {steps.map((step, i) => (
        <InventisActivityTimelineRow
          key={i}
          step={step}
          isLast={i === steps.length - 1}
        />
      ))}
    </div>
  );

  if (variant === "inCard") {
    return (
      <div
        className={cn(
          "border-border bg-background w-full max-w-[337px] rounded-[var(--radius-md)] border px-2.5 py-3",
          className,
        )}
      >
        {list}
      </div>
    );
  }

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <h2 className="text-card-foreground text-sm leading-5 font-semibold">
        {title}
      </h2>
      {list}
    </div>
  );
}

/** 스토리·문서용 — 개별 마커 */
export function InventisActivityTimelineMarker(props: {
  status: ActivityTimelineStatus;
  className?: string;
}) {
  return <StatusMarker {...props} />;
}

/** 스토리·문서용 — 페이즈 블록만 */
export function InventisActivityTimelinePhase({
  className,
  ...props
}: {
  title: string;
  details?: ActivityTimelineDetailRow[];
  defaultOpen?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <PhaseBlock {...props} />
    </div>
  );
}
