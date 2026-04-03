import type { InventisRoCardProps } from "../ro-card/InventisRoCard";

export type NotificationPanelTab = {
  value: string;
  label: string;
};

export type AlertCenterTag = {
  label: string;
  /** Figma: primary pill vs secondary */
  variant: "default" | "secondary";
};

export type AlertCenterMessage = {
  id: string;
  categoryLabel: string;
  subject: string;
  snippet: string;
  timeLabel: string;
  unread: boolean;
  tags?: AlertCenterTag[];
};

/** 큐 탭(All / Active / On hold)과 카드 매핑 — RO 상태는 카드 배지·타입으로 표현 */
export type QueueTabFilterKey = "active" | "hold" | "completed";

export type QueueRoItem = {
  id: string;
  queueTabKey: QueueTabFilterKey;
} & Omit<InventisRoCardProps, "className">;

export const defaultAlertCenterTabs: NotificationPanelTab[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
];

export const defaultQueueTabs: NotificationPanelTab[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "hold", label: "On hold" },
];

/** Figma Alert Center 메시지 블록에 대응 */
export const defaultAlertCenterMessages: AlertCenterMessage[] = [
  {
    id: "m1",
    categoryLabel: "Notice/Unread",
    subject: "Meeting Tomorrow",
    snippet:
      "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to",
    timeLabel: "about … ago",
    unread: true,
    tags: [
      { label: "meeting", variant: "secondary" },
      { label: "work", variant: "default" },
      { label: "important", variant: "secondary" },
    ],
  },
  {
    id: "m2",
    categoryLabel: "Notice/read",
    subject: "Re: Project Update",
    snippet:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.\n\nI have a few minor suggestions that I'll include in the attached document.\n\nLet's discuss these duri",
    timeLabel: "about … ago",
    unread: false,
    tags: [
      { label: "work", variant: "default" },
      { label: "important", variant: "secondary" },
    ],
  },
  {
    id: "m3",
    categoryLabel: "Notice/read",
    subject: "Re: Project Update",
    snippet:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.\n\nI have a few minor suggestions that I'll include in the attached document.\n\nLet's discuss these duri",
    timeLabel: "about … ago",
    unread: false,
    tags: [
      { label: "work", variant: "default" },
      { label: "important", variant: "secondary" },
    ],
  },
];

/**
 * Queue 패널 RO 카드 — Figma Type=Action(26837:29493) 샘플 + 탭 필터용 변주.
 * RO 카드 타입·문구는 `InventisRoCard` / Pattern/RO Card 와 동기화합니다.
 */
export const defaultQueueRoItems: QueueRoItem[] = [
  {
    id: "ro1",
    queueTabKey: "active",
    type: "action",
    customerName: "Mr.Kim",
    statusLabel: "Draft",
    vehicle: "2023 Toyota Camry XSE",
    roNumber: "KCS-452",
    assignee: "Lucas",
    timeStart: "10:30 am",
    timeEnd: "11:30 am",
    serviceType: "Brake Service",
  },
  {
    id: "ro2",
    queueTabKey: "hold",
    type: "action",
    customerName: "Ms.Park",
    statusLabel: "Draft",
    vehicle: "2019 Honda Accord Sport",
    roNumber: "KCS-418",
    assignee: "Lucas",
    timeStart: "2:00 pm",
    timeEnd: "3:00 pm",
    serviceType: "Oil change",
  },
  {
    id: "ro3",
    queueTabKey: "active",
    type: "schedule",
    customerName: "Mr.Lee",
    vehicle: "2022 Ford F-150",
    timeStart: "10:30 am",
    timeEnd: "11:30 am",
  },
];

export function filterAlertCenterMessages(
  items: AlertCenterMessage[],
  tab: string,
): AlertCenterMessage[] {
  if (tab === "unread") {
    return items.filter((m) => m.unread);
  }
  return items;
}

export function filterQueueItems(
  items: QueueRoItem[],
  tab: string,
): QueueRoItem[] {
  if (tab === "active") {
    return items.filter((i) => i.queueTabKey === "active");
  }
  if (tab === "hold") {
    return items.filter((i) => i.queueTabKey === "hold");
  }
  return items;
}
