import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BookOpen,
  Bot,
  Car,
  CircleHelp,
  Files,
  LayoutDashboard,
  List,
  Settings,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-react";

/** 단일 네비 항목 (Figma Aside 메뉴 버튼 1:1) */
export type InventisNavItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  /** Common Assets 행 우측 chevron */
  showChevron?: boolean;
};

export type InventisNavGroup = {
  id: string;
  label: string;
  items: InventisNavItem[];
};

export type InventisNavigationUser = {
  name: string;
  email: string;
  /** 접힘 시 아바타 글자 */
  initial: string;
};

export type InventisProductMeta = {
  name: string;
  version: string;
  href: string;
};

/**
 * Inventis DS Aside 네비게이션 전체 모델.
 * 앱에서 라벨·href·그룹만 바꿔 재사용하면 됨.
 */
export type InventisNavigationModel = {
  user: InventisNavigationUser;
  quickLinks: InventisNavItem[];
  workspaces: InventisNavGroup;
  commonAssets: InventisNavGroup;
  footerUtilityGroupLabel: string;
  footerUtility: InventisNavItem[];
  product: InventisProductMeta;
};

/** Figma `❖ Aside` / Collapsed=false 기본 데이터 */
export const defaultInventisNavigationModel: InventisNavigationModel = {
  user: {
    name: "William",
    email: "Manager@example.com",
    initial: "W",
  },
  quickLinks: [
    { id: "alerts", label: "Alerts Center", href: "#", icon: Bell },
    { id: "queue", label: "Queue", href: "#", icon: List },
  ],
  workspaces: {
    id: "workspaces",
    label: "Workspaces",
    items: [
      { id: "dashboard", label: "Dashboard", href: "#", icon: LayoutDashboard },
      { id: "reception", label: "Reception", href: "#", icon: SquareTerminal },
      { id: "repair-order", label: "Repair Order", href: "#", icon: Bot },
      {
        id: "operation-support",
        label: "Operation Support",
        href: "#",
        icon: BookOpen,
      },
    ],
  },
  commonAssets: {
    id: "common-assets",
    label: "Common Assets",
    items: [
      {
        id: "customers",
        label: "Customers",
        href: "#",
        icon: User,
        showChevron: true,
      },
      {
        id: "vehicles",
        label: "Vehicles",
        href: "#",
        icon: Car,
        showChevron: true,
      },
      {
        id: "reports",
        label: "Reports",
        href: "#",
        icon: BookOpen,
        showChevron: true,
      },
      {
        id: "admin",
        label: "Admin",
        href: "#",
        icon: Settings,
        showChevron: true,
      },
    ],
  },
  footerUtilityGroupLabel: "Group title",
  footerUtility: [
    { id: "settings", label: "Settings", href: "#", icon: Settings2 },
    { id: "help", label: "Get Help", href: "#", icon: CircleHelp },
  ],
  product: {
    name: "IDAS",
    version: "v1.0.1",
    href: "#",
  },
};

/** 푸터 앱 타일 아이콘 (Figma MediaAsset) */
export const inventisProductIcon = Files;
