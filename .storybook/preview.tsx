import type { Preview } from "@storybook/nextjs-vite";
import React, { useEffect } from "react";
import { TocContainer } from "./TocContainer";

import "../app/globals.css";

/** 테마/모드 변경 — html + 스토리 래퍼에 클래스 적용 (iframe 호환) */
function ThemeWrapper({
  children,
  globals,
}: {
  children: React.ReactNode;
  globals: Record<string, string>;
}) {
  const theme = globals?.theme ?? "default";

  const wrapperClass = theme === "preset" ? "theme-preset" : "";

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-preset", theme === "preset");
  }, [theme]);

  return (
    <div
      className={wrapperClass}
      style={{
        minHeight: "100%",
        padding: 0,
        margin: 0,
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {children}
    </div>
  );
}

function ThemeDecorator(
  Story: React.ComponentType,
  context: { globals: Record<string, string> },
) {
  return (
    <ThemeWrapper globals={context.globals}>
      <Story />
    </ThemeWrapper>
  );
}

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "테마 선택",
      defaultValue: "default",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "default", title: "Default (Figma)" },
          { value: "preset", title: "Preset (aw3Y7bE)" },
        ],
      },
    },
  },
  decorators: [ThemeDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    actions: { argTypesRegex: "^on.*" },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y tests entirely
      test: "todo",
    },
    docs: {
      container: TocContainer,
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Introduction",
          "List",
          "Token",
          "Component",
          "Pattern",
          [
            "App Header",
            [
              "Activity Timeline",
              [
                "in Card",
                "Inline",
                "Variants",
                "Properties",
                "Pattern",
                "Page · Vertical",
                "Page · Horizontal",
              ],
            ],
            "Filter",
            "Kanban",
            [
              "Metric Card",
              [
                "Default",
                "Compact",
                "Variants",
                "Pattern",
                "Filter row · Minimum (2)",
                "Filter row · Maximum (4)",
              ],
            ],
            "Navigation Sidebar",
            "Notification Panel",
            [
              "Status Badge",
              [
                "Properties",
                "RO · context",
                "Pattern",
                "Examples",
                "Figma frames (24)",
              ],
            ],
            "RO Card",
            [
              "Tab",
              [
                "Playground",
                "Variants",
                "Trigger properties",
                "Line · Overview",
                "Pattern",
                "Line · Jobs",
              ],
            ],
          ],
          "Page",
          "*",
        ],
      },
    },
  },

  tags: ["autodocs"],
};

export default preview;
