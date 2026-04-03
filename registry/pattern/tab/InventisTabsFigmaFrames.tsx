"use client";

import { Code, Eye } from "lucide-react";
import * as React from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/bases/radix/components/ui/tabs";
import { cn } from "@/bases/radix/lib/utils";

import {
  InventisTabsLine,
  type InventisTabsLineItem,
} from "./InventisTabsLine";

const DEMO_TABS = [
  { value: "overview", label: "Overview" },
  { value: "analytics", label: "Analytics" },
  { value: "reports", label: "Reports" },
  { value: "settings", label: "Settings" },
] as const;

function HiddenContents() {
  return (
    <>
      {DEMO_TABS.map(({ value }) => (
        <TabsContent key={value} value={value} className="hidden" />
      ))}
    </>
  );
}

/** Figma `26779-6787` — Variants */
export function InventisTabsFigma267796787Variants() {
  return (
    <div className="bg-background flex w-full max-w-[720px] flex-col items-start gap-16 px-6 py-8">
      <Tabs defaultValue="overview" className="w-auto">
        <TabsList variant="default" className="h-8 rounded-lg p-[3px]">
          {DEMO_TABS.map(({ value, label }) => (
            <TabsTrigger key={value} value={value}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <HiddenContents />
      </Tabs>

      <Tabs defaultValue="overview" className="w-auto">
        <TabsList
          variant="line"
          className="h-auto w-auto gap-1 rounded-none bg-transparent p-0"
        >
          {DEMO_TABS.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex-none shadow-none"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <HiddenContents />
      </Tabs>

      <Tabs
        defaultValue="overview"
        orientation="vertical"
        className="flex w-auto flex-row gap-4"
      >
        <TabsList
          variant="default"
          className="h-fit w-[132px] flex-col rounded-lg p-[3px]"
        >
          {DEMO_TABS.map(({ value, label }) => (
            <TabsTrigger key={value} value={value} className="w-full flex-none">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <HiddenContents />
      </Tabs>
    </div>
  );
}

/** Figma `26779-6920` — Tabs / Trigger 속성 격자 */
export function InventisTabsFigma267796920TriggerProps() {
  const rows: { active: boolean; state: "default" | "focus" | "disabled" }[] = [
    { active: true, state: "default" },
    { active: true, state: "focus" },
    { active: true, state: "disabled" },
    { active: false, state: "default" },
    { active: false, state: "focus" },
    { active: false, state: "disabled" },
  ];

  return (
    <div className="bg-background w-full max-w-[640px] px-6 py-6">
      <div className="grid grid-cols-2 gap-x-16 gap-y-5">
        {rows.map((row, i) => (
          <React.Fragment key={i}>
            <SpecTrigger kind="default" {...row} />
            <SpecTrigger kind="line" {...row} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

type TriggerKind = "default" | "line";

function SpecTrigger({
  kind,
  active,
  state,
  label = "Tab",
}: {
  kind: TriggerKind;
  active: boolean;
  state: "default" | "focus" | "disabled";
  label?: string;
}) {
  const disabled = state === "disabled";
  /** 스펙 시트용 “포커스” 고정 표시 — `ring`+`outline`+`border-b` 중첩은 실제 TabsTrigger와 달리 굵은 이중 테두리로 보임 */
  const focusDemo =
    state === "focus"
      ? "ring-2 ring-ring/50 ring-offset-2 ring-offset-background"
      : "";

  if (kind === "line") {
    return (
      <button
        type="button"
        disabled={disabled}
        className={cn(
          "relative inline-flex items-center justify-center px-2 py-1.5 text-sm font-medium transition-opacity",
          active ? "text-foreground" : "text-muted-foreground",
          "after:bg-foreground after:absolute after:inset-x-0 after:bottom-[-6px] after:h-0.5 after:transition-opacity",
          active ? "after:opacity-100" : "after:opacity-0",
          focusDemo,
          state === "focus" && "rounded-sm",
          disabled && "opacity-50",
        )}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "rounded-md border border-transparent px-2 py-1 text-sm font-medium transition-opacity",
        active
          ? "bg-background text-foreground dark:border-input dark:bg-input/30 shadow-sm"
          : "text-muted-foreground",
        focusDemo,
        disabled && "opacity-50",
      )}
    >
      {label}
    </button>
  );
}

function PatternCardLight() {
  return (
    <div
      className={cn(
        "border-border bg-background flex flex-1 flex-col items-center gap-12 overflow-hidden rounded-2xl border px-4 py-10 shadow-xs",
        "max-w-[1280px] min-w-0",
      )}
    >
      <Tabs defaultValue="overview" className="w-auto">
        <TabsList variant="default" className="h-8 rounded-lg p-[3px]">
          {DEMO_TABS.map(({ value, label }) => (
            <TabsTrigger key={value} value={value}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <HiddenContents />
      </Tabs>

      <Tabs defaultValue="overview" className="w-auto">
        <TabsList
          variant="line"
          className="h-auto w-auto gap-1 rounded-none bg-transparent p-0"
        >
          {DEMO_TABS.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex-none shadow-none"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <HiddenContents />
      </Tabs>

      <Tabs
        defaultValue="overview"
        orientation="vertical"
        className="flex w-auto flex-row gap-4"
      >
        <TabsList
          variant="default"
          className="h-fit w-[132px] flex-col rounded-lg p-[3px]"
        >
          {DEMO_TABS.map(({ value, label }) => (
            <TabsTrigger key={value} value={value} className="w-full flex-none">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <HiddenContents />
      </Tabs>

      <Tabs defaultValue="preview" className="w-auto">
        <TabsList variant="default" className="h-8 rounded-lg p-[3px]">
          <TabsTrigger value="preview" className="gap-1.5">
            <Eye className="size-4 shrink-0" aria-hidden />
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="gap-1.5">
            <Code className="size-4 shrink-0" aria-hidden />
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="hidden" />
        <TabsContent value="code" className="hidden" />
      </Tabs>
    </div>
  );
}

function PatternCardDark() {
  return (
    <div className="dark w-full min-w-0 flex-1">
      <div
        className={cn(
          "border-border bg-background flex flex-col items-center gap-12 overflow-hidden rounded-xl border px-4 py-10",
          "max-w-[1280px] min-w-0",
        )}
      >
        <Tabs defaultValue="overview" className="w-auto">
          <TabsList variant="default" className="h-8 rounded-lg p-[3px]">
            {DEMO_TABS.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <HiddenContents />
        </Tabs>

        <Tabs defaultValue="overview" className="w-auto">
          <TabsList
            variant="line"
            className="h-auto w-auto gap-1 rounded-none bg-transparent p-0"
          >
            {DEMO_TABS.map(({ value, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex-none shadow-none"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <HiddenContents />
        </Tabs>

        <Tabs
          defaultValue="overview"
          orientation="vertical"
          className="flex w-auto flex-row gap-4"
        >
          <TabsList
            variant="default"
            className="h-fit w-[132px] flex-col rounded-lg p-[3px]"
          >
            {DEMO_TABS.map(({ value, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="w-full flex-none"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <HiddenContents />
        </Tabs>

        <Tabs defaultValue="preview" className="w-auto">
          <TabsList variant="default" className="h-8 rounded-lg p-[3px]">
            <TabsTrigger value="preview" className="gap-1.5">
              <Eye className="size-4 shrink-0" aria-hidden />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-1.5">
              <Code className="size-4 shrink-0" aria-hidden />
              Code
            </TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="hidden" />
          <TabsContent value="code" className="hidden" />
        </Tabs>
      </div>
    </div>
  );
}

/** Figma `26779-6901` — Pattern Light / Dark */
export function InventisTabsFigma267796901Pattern() {
  return (
    <div
      className="flex w-full max-w-[1600px] flex-wrap items-stretch justify-center gap-4 px-10 py-4"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.4)), linear-gradient(90deg, rgb(245,245,245), rgb(245,245,245))",
      }}
    >
      <PatternCardLight />
      <PatternCardDark />
    </div>
  );
}

const LINE_PAGE_ITEMS = [
  { value: "overview", label: "Overview", slotHint: "Contents A" },
  { value: "jobs", label: "Jobs", slotHint: "Contents B" },
  { value: "inspection", label: "Inspection", slotHint: "Contents C" },
  { value: "wip1", label: "Work in Progress", slotHint: "Contents D" },
  { value: "wip2", label: "Work In Progress", slotHint: "Contents E" },
] as const satisfies readonly InventisTabsLineItem[];

function LinePageShell({
  defaultValue,
}: {
  defaultValue: "overview" | "jobs";
}) {
  return (
    <div className="bg-muted/40 w-full p-4">
      <div className="bg-background mx-auto w-full max-w-[1320px] rounded-xl border p-6 shadow-sm">
        <InventisTabsLine
          key={defaultValue}
          defaultValue={defaultValue}
          items={LINE_PAGE_ITEMS}
        />
      </div>
    </div>
  );
}

/** Figma `26779-12391` — Line · Overview */
export function InventisTabsFigma2677912391LineOverview() {
  return <LinePageShell defaultValue="overview" />;
}

/** Figma `26787-33252` — Line · Jobs */
export function InventisTabsFigma2678733252LineJobs() {
  return <LinePageShell defaultValue="jobs" />;
}
