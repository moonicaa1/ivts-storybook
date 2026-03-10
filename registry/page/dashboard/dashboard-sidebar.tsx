"use client";

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  FileText,
  MessageSquare,
  Settings,
  HelpCircle,
  ChevronsUpDown,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/bases/radix/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/bases/radix/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/bases/radix/components/ui/sidebar";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "#", current: true },
  { name: "Appointments", icon: CalendarDays, href: "#", current: false },
  { name: "Customers", icon: Users, href: "#", current: false },
  { name: "Repair Orders", icon: FileText, href: "#", current: false },
  { name: "Messages", icon: MessageSquare, href: "#", current: false },
];

const secondaryNavigation = [
  { name: "Settings", icon: Settings, href: "#" },
  { name: "Help & Support", icon: HelpCircle, href: "#" },
];

export function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-none bg-sidebar">
      <SidebarHeader className="px-2 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild tooltip="Dealer365">
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
                  <span className="text-xs font-bold">D3</span>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-sm">Dealer365</span>
                  <span className="text-xs text-muted-foreground">
                    Service Advisor
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup className="p-0">
          <SidebarMenu className="gap-1">
            {navigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  isActive={item.current}
                  tooltip={item.name}
                  className={
                    item.current
                      ? "rounded-full bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                      : "rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                  }
                >
                  <a href={item.href}>
                    <item.icon className="shrink-0" />
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="p-0 mt-auto">
          <SidebarMenu className="gap-1">
            {secondaryNavigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.name}
                  className="rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <a href={item.href}>
                    <item.icon className="shrink-0" />
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="rounded-lg data-[state=open]:bg-muted"
                >
                  <Avatar className="h-8 w-8 rounded-lg shrink-0">
                    <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
                      SA
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      Sarah Anderson
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      Service Advisor
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
                        SA
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        Sarah Anderson
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        Service Advisor
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
