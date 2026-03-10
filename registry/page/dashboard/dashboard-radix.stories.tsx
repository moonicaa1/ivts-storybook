"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ThemeProvider } from "next-themes";
import { DashboardLayout } from "./dashboard-layout";
import { DashboardContent } from "./dashboard-content";

const meta = {
  title: "Page/Dashboard",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-svh">
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    </div>
  ),
};
