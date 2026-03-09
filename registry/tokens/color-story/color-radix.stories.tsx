import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/bases/radix/components/ui/table";
// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

type Swatch = {
  name: string;
  colors: Record<string, string>;
};

const SwatchList = ({ colors }: { colors: Record<string, string> }) => {
  return (
    <div className="flex overflow-clip rounded-md border shadow">
      {Object.entries(colors).map(([name, value], idx) => (
        <div
          key={idx}
          className="bg-background flex w-full flex-col gap-1 pb-3"
        >
          <div
            className="h-16 w-full border border-border"
            style={{ backgroundColor: `var(${value})` }}
          />
          <p className="text-center font-semibold">{name}</p>
          <p className="text-center text-xs opacity-70">{value}</p>
          <p className="text-center text-xs">
            {getComputedStyle(document.documentElement).getPropertyValue(value) ||
              `var(${value})`}
          </p>
        </div>
      ))}
    </div>
  );
};

/**
 * Color tokens for the design system
 */
const meta: Meta<{
  swatch: Swatch[];
}> = {
  title: "Token/Color",
  argTypes: {},
  render: (args) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>
            <span className="sr-only">Swatch</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {args.swatch.map(({ name, colors }) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>
              <SwatchList colors={colors} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Functional color tokens are used to define the core colors of the design system.
 * These colors are used throughout the application for backgrounds, text, borders, etc.
 */
export const Functional: Story = {
  args: {
    swatch: [
      {
        name: "Background",
        colors: {
          default: "--base-background",
          foreground: "--base-foreground",
        },
      },
      {
        name: "Primary",
        colors: {
          default: "--base-primary",
          foreground: "--base-primary-foreground",
        },
      },
      {
        name: "Secondary",
        colors: {
          default: "--base-secondary",
          foreground: "--base-secondary-foreground",
        },
      },
      {
        name: "Accent",
        colors: {
          default: "--base-accent",
          foreground: "--base-accent-foreground",
        },
      },
      {
        name: "Muted",
        colors: {
          default: "--base-muted",
          foreground: "--base-muted-foreground",
        },
      },

      {
        name: "Destructive",
        colors: {
          default: "--base-destructive",
        },
      },
    ],
  },
};

/**
 * Component color tokens are used to define the colors of specific components in the design system.
 * These colors are used to style components like buttons, inputs, and alerts.
 */
export const Component: Story = {
  args: {
    swatch: [
      {
        name: "Border",
        colors: {
          default: "--base-border",
          ring: "--base-ring",
        },
      },
      {
        name: "Card",
        colors: {
          default: "--base-card",
          foreground: "--base-card-foreground",
        },
      },
      {
        name: "Input",
        colors: {
          default: "--base-input",
        },
      },
      {
        name: "Popover",
        colors: {
          default: "--base-popover",
          foreground: "--base-popover-foreground",
        },
      },
      {
        name: "Chart",
        colors: {
          "1": "--base-chart-1",
          "2": "--base-chart-2",
          "3": "--base-chart-3",
          "4": "--base-chart-4",
          "5": "--base-chart-5",
        },
      },
      {
        name: "Sidebar",
        colors: {
          background: "--base-sidebar",
          foreground: "--base-sidebar-foreground",
          primary: "--base-sidebar-primary",
          "primary-foreground": "--base-sidebar-primary-foreground",
          accent: "--base-sidebar-accent",
          "accent-foreground": "--base-sidebar-accent-foreground",
          border: "--base-sidebar-border",
          ring: "--base-sidebar-ring",
        },
      },
    ],
  },
};
