import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "@/bases/radix/components/ui/badge";

/**
 * Displays a badge or a component that looks like a badge.
 */
const meta = {
  title: "Component/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    },
    children: {
      control: "text",
      description: "Badge content",
    },
  },
  args: {
    variant: "default",
    children: "Badge",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the badge.
 */
export const Default: Story = {};

/**
 * Use the `secondary` badge to call for less urgent information, blending
 * into the interface while still signaling minor updates or statuses.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

/**
 * Use the `destructive` badge to  indicate errors, alerts, or the need for
 * immediate attention.
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
};

/**
 * Use the `outline` badge for overlaying without obscuring interface details,
 * emphasizing clarity and subtlety.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

/**
 * Use the `ghost` badge for a minimal, transparent style that blends into the
 * background.
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

/**
 * Use the `link` badge to display a badge that looks like a hyperlink.
 */
export const Link: Story = {
  args: {
    variant: "link",
  },
};
