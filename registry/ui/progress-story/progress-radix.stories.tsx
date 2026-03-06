import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Progress } from "@/bases/radix/components/ui/progress";

/**
 * Displays an indicator showing the completion progress of a task, typically
 * displayed as a progress bar.
 */
const meta = {
  title: "Component/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current progress value (undefined = indeterminate)",
    },
    max: {
      control: { type: "number" },
    },
  },
  args: {
    "aria-label": "Progress",
    value: 30,
    max: 100,
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the progress.
 */
export const Default: Story = {};

/**
 * When the progress is indeterminate.
 */
export const Indeterminate: Story = {
  args: {
    value: undefined,
  },
};

/**
 * When the progress is completed.
 */
export const Completed: Story = {
  args: {
    value: 100,
  },
};
