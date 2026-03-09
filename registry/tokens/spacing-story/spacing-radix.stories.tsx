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

type Spacing = {
  name: string;
  value: string;
};

const SpacingRow = ({ value, name }: Spacing) => {
  const size =
    getComputedStyle(document.documentElement).getPropertyValue(value) || "";

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{size || `var(${value})`}</TableCell>
      <TableCell className="w-full">
        <div className="bg-muted border">
          <div
            className="bg-primary h-4"
            style={{ width: size || `var(${value})` }}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

/**
 * Spacing tokens for the design system
 */
const meta: Meta<{
  scale: Spacing[];
}> = {
  title: "Token/Spacing",
  argTypes: {},
  render: (args) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Size</TableHead>
          <TableHead className="hidden sm:table-cell">
            <span className="sr-only">Preview</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {args.scale.map(({ name, value }, idx) => (
          <SpacingRow key={idx} value={value} name={name} />
        ))}
      </TableBody>
    </Table>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Spacing values used for padding, margins, and layout.
 * Figma format: --spacing/2, --spacing/4, --spacing/8
 */
export const Core: Story = {
  args: {
    scale: [
      { name: "2", value: "--spacing-2" },
      { name: "4", value: "--spacing-4" },
      { name: "8", value: "--spacing-8" },
    ],
  },
};
