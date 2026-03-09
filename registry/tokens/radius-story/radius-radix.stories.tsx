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

type Radius = {
  name: string;
  value: string;
};

const RadiusTile = ({ value }: Pick<Radius, "value">) => {
  const resolved =
    getComputedStyle(document.documentElement).getPropertyValue(value) ||
    `var(${value})`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="bg-card size-20 border-2"
        style={{ borderRadius: `var(${value})` }}
      />
      <p className="text-center text-xs opacity-70">{value}</p>
      <p className="text-center text-xs">{resolved}</p>
    </div>
  );
};

/**
 * Radius tokens for the design system
 */
const meta: Meta<{
  radius: Radius[];
}> = {
  title: "Token/Radius",
  argTypes: {},
  render: (args) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>
            <span className="sr-only">Preview</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {args.radius.map(({ name, value }) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>
              <RadiusTile value={value} />
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
 * Border radius tokens used for UI elements like buttons, cards, and modals.
 * Figma scale: xs(2px), sm(6px), md(8px), lg(10px), xl(14px), 2xl(16px), 3xl(24px), 4xl(32px)
 */
export const Core: Story = {
  args: {
    radius: [
      { name: "xs", value: "--radius-xs" },
      { name: "sm", value: "--radius-sm" },
      { name: "md", value: "--radius-md" },
      { name: "lg", value: "--radius-lg" },
      { name: "xl", value: "--radius-xl" },
      { name: "2xl", value: "--radius-2xl" },
      { name: "3xl", value: "--radius-3xl" },
      { name: "4xl", value: "--radius-4xl" },
    ],
  },
};
