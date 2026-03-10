"use client";

import { Send, ArrowRight } from "lucide-react";
import { Button } from "@/bases/radix/components/ui/button";
import { Badge } from "@/bases/radix/components/ui/badge";

export function NextActionCard() {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-4 sm:px-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
            <Send className="h-3.5 w-3.5 text-foreground" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-foreground">
                Next Best Action
              </span>
              <Badge variant="secondary" className="h-4 px-1.5 text-xs">
                2
              </Badge>
            </div>
            <p className="text-sm font-medium text-foreground">
              Send Approval Request
            </p>
            <p className="text-xs text-muted-foreground">
              2 customers waiting on authorization — Est. $1,240
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="default"
          className="shrink-0 h-8 gap-1.5 text-xs w-full sm:w-auto"
        >
          Take Action
          <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
