import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Slider } from "@/bases/radix/components/ui/slider";

/**
 * An input where the user selects a value from within a given range.
 */
const meta = {
  title: "Component/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    min: {
      control: { type: "number" },
    },
    max: {
      control: { type: "number" },
    },
    step: {
      control: { type: "number" },
    },
    disabled: {
      control: "boolean",
    },
    inverted: {
      control: "boolean",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    defaultValue: [33],
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    inverted: false,
    orientation: "horizontal",
  },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the slider.
 */
export const Default: Story = {};

/**
 * Use the `inverted` prop to have the slider fill from right to left.
 */
export const Inverted: Story = {
  args: {
    inverted: true,
  },
};

/**
 * Use the `disabled` prop to disable the slider.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
