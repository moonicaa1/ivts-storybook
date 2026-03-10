"use client";

import {
  SidebarProvider,
  SidebarInset,
} from "@/bases/radix/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";

export function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="my-1 mr-1 md:my-2 md:mr-2 rounded-xl bg-card shadow-sm overflow-hidden min-h-[calc(100vh-8px)] md:min-h-[calc(100vh-16px)]">
        <DashboardHeader />
        <main className="flex-1 overflow-auto bg-muted px-4 py-4 sm:px-5 md:px-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
