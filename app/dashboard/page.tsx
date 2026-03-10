"use client";

import { ThemeProvider } from "next-themes";
import { DashboardLayout } from "@/registry/page/dashboard/dashboard-layout";
import { DashboardContent } from "@/registry/page/dashboard/dashboard-content";

export default function DashboardPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      <div className="min-h-svh">
        <DashboardLayout>
          <DashboardContent />
        </DashboardLayout>
      </div>
    </ThemeProvider>
  );
}
