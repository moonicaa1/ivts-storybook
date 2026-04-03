export type InventisHeaderBreadcrumbItem = {
  label: string;
  /** 없으면 현재 페이지(비링크) */
  href?: string;
};

export type InventisHeaderWindowTabState =
  | "selected"
  | "unselected"
  | "ellipsis";

export type InventisHeaderWindowTab = {
  id: string;
  label: string;
  state: InventisHeaderWindowTabState;
};

/** Figma Breadcrumb 행 기본 샘플 */
export const defaultInventisHeaderBreadcrumbs: InventisHeaderBreadcrumbItem[] =
  [
    { label: "Home", href: "#" },
    { label: "RO List", href: "#" },
    { label: "RO Detail" },
  ];

/** Figma Window 행 기본 샘플 */
export const defaultInventisHeaderWindowTabs: InventisHeaderWindowTab[] = [
  { id: "t1", label: "Appointment", state: "selected" },
  { id: "t2", label: "", state: "ellipsis" },
  { id: "t3", label: "OPPT-2024-032", state: "unselected" },
];
