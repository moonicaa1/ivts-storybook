"use client";

import * as React from "react";

import { cn } from "@/bases/radix/lib/utils";

/**
 * Figma `26837:59448` Status Badge — Color=red|amber|lime|green|teal|cyan|blue|indigo|violet|purple|pink|mute
 * 배경: *-foreground 토큰, 텍스트: base 색상 (MCP 스펙과 동일 hex)
 */
export const INVENTIS_STATUS_BADGE_COLORS = [
  "red",
  "amber",
  "lime",
  "green",
  "teal",
  "cyan",
  "blue",
  "indigo",
  "violet",
  "purple",
  "pink",
  "mute",
] as const;

export type InventisStatusBadgeColor =
  (typeof INVENTIS_STATUS_BADGE_COLORS)[number];

const COLOR_STYLES: Record<InventisStatusBadgeColor, string> = {
  red: "bg-[#fee2e2] text-[#dc2626]",
  amber: "bg-[#fef3c7] text-[#d97706]",
  lime: "bg-[#ecfccb] text-[#65a30d]",
  green: "bg-[#dcfce7] text-[#16a34a]",
  teal: "bg-[#ccfbf1] text-[#0d9488]",
  cyan: "bg-[#cffafe] text-[#0891b2]",
  blue: "bg-[#dbeafe] text-[#2563eb]",
  indigo: "bg-[#e0e7ff] text-[#4f46e5]",
  violet: "bg-[#ede9fe] text-[#7c3aed]",
  purple: "bg-[#f3e8ff] text-[#9333ea]",
  pink: "bg-[#fce7f3] text-[#db2777]",
  mute: "bg-[#f5f5f5] text-[#a3a3a3]",
};

export function InventisStatusBadge({
  color,
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & {
  color: InventisStatusBadgeColor;
}) {
  return (
    <span
      data-slot="inventis-status-badge"
      data-color={color}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        COLOR_STYLES[color],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
