import type { ComponentProps } from "react";

import type { InventisRoCard } from "../ro-card/InventisRoCard";

type Ro = ComponentProps<typeof InventisRoCard>;

export type KanbanPlaygroundCard = Omit<Ro, "onMenuClick"> & { _id: string };

export type KanbanPlaygroundColumnState = {
  id: string;
  titleBase: string;
  totalValue: string;
  showDragHere: boolean;
  cards: KanbanPlaygroundCard[];
};

const mk = (
  col: string,
  i: number,
  card: Omit<Ro, "onMenuClick">,
): KanbanPlaygroundCard => ({
  ...card,
  _id: `${col}-${i}-${card.roNumber ?? card.customerName}`,
});

export function getInitialKanbanPlaygroundColumns(): KanbanPlaygroundColumnState[] {
  return [
    {
      id: "draft",
      titleBase: "Draft",
      totalValue: "$120,000",
      showDragHere: true,
      cards: [
        mk("draft", 0, {
          type: "default",
          customerName: "Mr.Kim",
          statusLabel: "Draft",
          vehicle: "2023 Toyota Camry XSE",
          roNumber: "KCS-452",
          assignee: "Lucas",
          timeStart: "10:30 am",
          timeEnd: "11:30 am",
          serviceType: "Brake Service",
          showProgress: true,
          progressValue: 50,
        }),
        mk("draft", 1, {
          type: "default",
          customerName: "Mr.Kim",
          statusLabel: "Draft",
          vehicle: "2023 Toyota Camry XSE",
          roNumber: "KCS-452",
          assignee: "Lucas",
          timeStart: "10:30 am",
          timeEnd: "11:30 am",
          serviceType: "Brake Service",
          showProgress: true,
          progressValue: 50,
        }),
      ],
    },
    {
      id: "triaged",
      titleBase: "Triaged",
      totalValue: "$84,200",
      showDragHere: true,
      cards: [
        mk("triaged", 0, {
          type: "default",
          customerName: "Ms.Park",
          statusLabel: "Draft",
          vehicle: "2019 Honda Accord",
          roNumber: "KCS-418",
          assignee: "Lucas",
          timeStart: "2:00 pm",
          timeEnd: "3:00 pm",
          serviceType: "Oil change",
        }),
        mk("triaged", 1, {
          type: "default",
          customerName: "James Lee",
          statusLabel: "Draft",
          vehicle: "2021 Tesla Model 3",
          roNumber: "KCS-501",
          assignee: "Sam",
          timeStart: "9:00 am",
          timeEnd: "10:00 am",
          serviceType: "Tire rotation",
        }),
        mk("triaged", 2, {
          type: "default",
          customerName: "Anna Cho",
          statusLabel: "Draft",
          vehicle: "2018 Ford F-150",
          roNumber: "KCS-389",
          assignee: "Lucas",
          timeStart: "1:15 pm",
          timeEnd: "2:45 pm",
          serviceType: "Inspection",
        }),
      ],
    },
    {
      id: "in-progress",
      titleBase: "In progress",
      totalValue: "$212,500",
      showDragHere: true,
      cards: [
        mk("in-progress", 0, {
          type: "default",
          customerName: "Chris Oh",
          statusLabel: "Draft",
          vehicle: "2022 BMW 330i",
          roNumber: "KCS-601",
          assignee: "Riley",
          timeStart: "8:30 am",
          timeEnd: "12:00 pm",
          serviceType: "Diagnostics",
          showProgress: true,
          progressValue: 72,
        }),
        mk("in-progress", 1, {
          type: "default",
          customerName: "Yuki Tan",
          statusLabel: "Draft",
          vehicle: "2020 Subaru Outback",
          roNumber: "KCS-577",
          assignee: "Sam",
          timeStart: "11:00 am",
          timeEnd: "1:00 pm",
          serviceType: "Brake pads",
          showProgress: true,
          progressValue: 35,
        }),
        mk("in-progress", 2, {
          type: "default",
          customerName: "Minseo Kang",
          statusLabel: "Draft",
          vehicle: "2017 VW Golf",
          roNumber: "KCS-540",
          assignee: "Lucas",
          timeStart: "3:00 pm",
          timeEnd: "4:30 pm",
          serviceType: "AC service",
        }),
        mk("in-progress", 3, {
          type: "default",
          customerName: "David Kim",
          statusLabel: "Draft",
          vehicle: "2024 Hyundai Ioniq 6",
          roNumber: "KCS-612",
          assignee: "Riley",
          timeStart: "4:00 pm",
          timeEnd: "5:30 pm",
          serviceType: "Software update",
          showProgress: true,
          progressValue: 18,
        }),
      ],
    },
    {
      id: "review",
      titleBase: "Review",
      totalValue: "$45,000",
      showDragHere: true,
      cards: [
        mk("review", 0, {
          type: "default",
          customerName: "Elena Ruiz",
          statusLabel: "Draft",
          vehicle: "2016 Mazda CX-5",
          roNumber: "KCS-455",
          assignee: "Sam",
          timeStart: "10:00 am",
          timeEnd: "11:00 am",
          serviceType: "Alignment",
        }),
        mk("review", 1, {
          type: "default",
          customerName: "Tom Baker",
          statusLabel: "Draft",
          vehicle: "2015 Jeep Wrangler",
          roNumber: "KCS-498",
          assignee: "Lucas",
          timeStart: "2:30 pm",
          timeEnd: "4:00 pm",
          serviceType: "Suspension check",
          showProgress: true,
          progressValue: 90,
        }),
      ],
    },
    {
      id: "done",
      titleBase: "Done",
      totalValue: "$398,000",
      showDragHere: true,
      cards: [
        mk("done", 0, {
          type: "default",
          customerName: "Sara Kim",
          statusLabel: "Draft",
          vehicle: "2019 Lexus RX",
          roNumber: "KCS-401",
          assignee: "Riley",
          timeStart: "9:30 am",
          timeEnd: "10:30 am",
          serviceType: "Full detail",
        }),
        mk("done", 1, {
          type: "default",
          customerName: "Paul Jung",
          statusLabel: "Draft",
          vehicle: "2021 Kia EV6",
          roNumber: "KCS-523",
          assignee: "Sam",
          timeStart: "12:00 pm",
          timeEnd: "1:00 pm",
          serviceType: "Battery health",
        }),
        mk("done", 2, {
          type: "default",
          customerName: "Grace Lim",
          statusLabel: "Draft",
          vehicle: "2014 Nissan Altima",
          roNumber: "KCS-367",
          assignee: "Lucas",
          timeStart: "4:45 pm",
          timeEnd: "5:30 pm",
          serviceType: "State inspection",
        }),
      ],
    },
  ];
}
