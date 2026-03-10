"use client";

import { Bell, ChevronRight, Sun, Moon, Search } from "lucide-react";
import { Input } from "@/bases/radix/components/ui/input";
import { Button } from "@/bases/radix/components/ui/button";
import { SidebarTrigger } from "@/bases/radix/components/ui/sidebar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="secondary"
        size="icon"
        className="h-8 w-8 rounded-lg bg-secondary border-0 shadow-none"
        aria-label="Toggle theme"
      >
        <span className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-8 w-8 rounded-lg bg-secondary border-0 shadow-none hover:bg-muted"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-foreground" />
      ) : (
        <Moon className="h-4 w-4 text-foreground" />
      )}
    </Button>
  );
}

export function DashboardHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4 md:px-6 rounded-t-xl">
      <div className="flex items-center gap-2 md:gap-3 min-w-0">
        <SidebarTrigger className="-ml-1 shrink-0 text-muted-foreground hover:text-foreground" />

        <nav className="flex items-center gap-1 md:gap-1.5 text-sm min-w-0">
          <span className="hidden md:inline text-muted-foreground hover:text-foreground cursor-pointer transition-colors whitespace-nowrap">
            Dashboard
          </span>
          <ChevronRight className="hidden md:inline h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />

          <span className="hidden md:inline text-muted-foreground hover:text-foreground cursor-pointer transition-colors whitespace-nowrap">
            Appointments
          </span>
          <ChevronRight className="hidden md:inline h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />

          <span className="font-medium text-foreground truncate">Today</span>
        </nav>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search..."
            className="h-8 w-[200px] lg:w-[240px] pl-8 text-sm rounded-lg border-border bg-background focus-visible:ring-1"
          />
        </div>

        <Button
          variant="secondary"
          size="icon"
          className="md:hidden h-8 w-8 rounded-lg bg-secondary border-0 shadow-none hover:bg-muted"
          aria-label="Search"
        >
          <Search className="h-4 w-4 text-foreground" />
        </Button>

        <ThemeToggle />

        <Button
          variant="outline"
          size="icon"
          className="relative h-8 w-8 rounded-full border-border shadow-none"
        >
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground leading-none">
            3
          </span>
        </Button>
      </div>
    </header>
  );
}
