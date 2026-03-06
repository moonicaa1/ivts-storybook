import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const fluentTheme = create({
  base: "light",

  // Brand
  brandTitle: "Inventis DS",
  brandImage: "/logo.png",
  brandUrl: "/?path=/docs/introduction--docs",
  brandTarget: "_self",

  // Font — Segoe UI (Fluent 기본체)
  fontBase:
    '"Segoe UI Variable", "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
  fontCode: '"Cascadia Code", "Cascadia Mono", "Consolas", monospace',

  // Colors
  colorPrimary: "#0078d4",
  colorSecondary: "#0078d4",

  // App chrome
  appBg: "#fafafa",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#edebe9",
  appBorderRadius: 4,

  // Sidebar / nav bar
  barBg: "#ffffff",
  barTextColor: "#323130",
  barSelectedColor: "#0078d4",

  // Text
  textColor: "#323130",
  textInverseColor: "#ffffff",
  textMutedColor: "#605e5c",

  // Input
  inputBg: "#ffffff",
  inputBorder: "#8a8886",
  inputTextColor: "#323130",
  inputBorderRadius: 2,
});

addons.setConfig({
  theme: fluentTheme,
  initialActive: "sidebar",
  sidebar: {
    showRoots: true,
    // Token, Component, Pattern, Page 는 기본 Collapsed 상태
    collapsedRoots: ["token", "component", "pattern", "page"],
  },
});

// 최초 랜딩 시 Introduction 페이지로 리디렉션
if (
  typeof window !== "undefined" &&
  window.location.search === "" &&
  !window.location.hash
) {
  window.location.replace("/?path=/docs/introduction--docs");
}
