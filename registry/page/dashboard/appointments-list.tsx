"use client";

import { useState } from "react";
import { ListFilter, ArrowUpDown } from "lucide-react";
import { Button } from "@/bases/radix/components/ui/button";
import { cn } from "@/bases/radix/lib/utils";
import {
  AppointmentCard,
  type Appointment,
} from "./appointment-card";

const filters = [
  { id: "all", label: "All", count: 6 },
  { id: "urgent", label: "Urgent" },
  { id: "in-progress", label: "In Progress" },
  { id: "waiting", label: "Waiting" },
  { id: "blocked", label: "Blocked" },
  { id: "completed", label: "Completed" },
];

const appointments: Appointment[] = [
  {
    id: "APT-4821",
    customer: "Patricia Moore",
    initials: "PM",
    vehicle: "2023 Chevrolet Silverado",
    service: "Engine Diagnostic + Repair Auth.",
    status: "awaiting-approval",
    price: "$1,890",
    timeInfo: "Waiting 42 min",
    hasPriority: true,
  },
  {
    id: "APT-4817",
    customer: "Robert Kim",
    initials: "RK",
    vehicle: "2021 Nissan Rogue",
    service: "CVT Service + Cabin Air Filter",
    status: "checked-in",
    price: "$420",
    timeInfo: "In since 8:30 AM",
  },
  {
    id: "APT-4825",
    customer: "Daniel Cruz",
    initials: "DC",
    vehicle: "2019 Kia Sorento",
    service: "Brake Pads + Rotor Replacement",
    status: "delayed",
    price: "$890",
    timeInfo: "45 min delay",
  },
  {
    id: "APT-4830",
    customer: "Angela Foster",
    initials: "AF",
    vehicle: "2020 Hyundai Tucson",
    service: "Tire Rotation + Alignment Check",
    status: "confirmed",
    price: "$180",
    timeInfo: "11:00 AM",
  },
  {
    id: "APT-4835",
    customer: "Lisa Zhang",
    initials: "LZ",
    vehicle: "2022 Mazda CX-5",
    service: "Oil Change + Multi-Point Inspection",
    status: "confirmed",
    price: "$95",
    timeInfo: "2:00 PM",
  },
  {
    id: "APT-4840",
    customer: "Michael Grant",
    initials: "MG",
    vehicle: "2018 Ford Escape",
    service: "A/C Recharge + Leak Test",
    status: "completed",
    price: "$340",
    timeInfo: "Done 10:15 AM",
  },
];

export function AppointmentsList() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border px-3 py-2.5 sm:px-4">
        <h2 className="text-sm font-semibold text-foreground">
          Appointments
        </h2>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 px-2 text-xs text-muted-foreground"
          >
            <ArrowUpDown className="h-3 w-3" />
            Priority
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 px-2 text-xs text-muted-foreground"
          >
            <ListFilter className="h-3 w-3" />
            Filter
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-0 border-b border-border px-4 overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={cn(
              "relative shrink-0 px-3 py-2.5 text-xs font-medium transition-colors",
              activeFilter === filter.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {filter.label}
            {filter.count !== undefined && (
              <span className="ml-1 text-muted-foreground/70">
                ({filter.count})
              </span>
            )}
            {activeFilter === filter.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
            )}
          </button>
        ))}
      </div>

      <div className="bg-muted/30 p-3 sm:p-4">
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
