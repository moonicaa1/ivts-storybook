import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/bases/radix/lib/utils";

const alertVariants = cva(
  "group/alert relative grid w-full grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-[[data-slot=alert-action]]:grid-cols-[auto_1fr_auto] [&_[data-slot=alert-action]]:col-start-3 [&_[data-slot=alert-action]]:row-span-2 [&_[data-slot=alert-action]]:self-center [&_[data-slot=alert-description]]:col-start-2 [&_[data-slot=alert-description]]:row-start-2 [&_[data-slot=alert-title]]:col-start-2 [&_[data-slot=alert-title]]:row-start-1 [&>svg]:col-start-1 [&>svg]:row-span-2 [&>svg]:mt-0.5 [&>svg]:shrink-0 [&>svg]:text-current [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
        warning:
          "text-foreground *:data-[slot=alert-description]:text-muted-foreground border-amber-200 bg-amber-50 *:data-[slot=alert-title]:text-amber-900 *:[svg]:text-amber-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "[&_a]:hover:text-foreground font-medium [&_a]:underline [&_a]:underline-offset-3",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground [&_a]:hover:text-foreground text-sm text-balance md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4 [&_ul]:ms-5 [&_ul]:list-disc [&_ul]:space-y-0.5",
        className,
      )}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

export { Alert, AlertAction, AlertDescription, AlertTitle };
