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
import type { CSSProperties, ReactNode } from "react";

type Typography = {
  name: string;
  value: string;
};

const TypographyRow = ({
  value,
  name,
  styleKey,
  children,
}: {
  value: string;
  name: string;
  styleKey: keyof CSSProperties;
  children?: ReactNode;
}) => {
  const isVar = value.startsWith("--");
  const styleValue = isVar ? `var(${value})` : value;
  const resolved = isVar
    ? getComputedStyle(document.documentElement).getPropertyValue(value) ||
      styleValue
    : value;

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>
        {String(resolved)
          .split(",")
          .map((v, idx) => (
            <p key={`prop-${idx}`}>{v.trim()}</p>
          ))}
      </TableCell>
      <TableCell>
        <div
          style={{
            [styleKey]: styleValue as CSSProperties[typeof styleKey],
          }}
          className="line-clamp-1"
        >
          {children}
        </div>
      </TableCell>
    </TableRow>
  );
};

/**
 * Typography tokens for the design system.
 */
const meta: Meta<{
  children: string;
  key: keyof CSSProperties;
  property: Typography[];
}> = {
  title: "Token/Typography",
  argTypes: {},
  args: {
    children: "Typeface",
  },
  render: (args) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>
            <span className="sr-only">Preview</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {args.property.map(({ name, value }) => (
          <TypographyRow
            key={name}
            name={name}
            value={value}
            styleKey={args.key}
          >
            {args.children}
          </TypographyRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Font family tokens for the design system.
 */
export const FontFamily: Story = {
  args: {
    key: "fontFamily",
    property: [
      { name: "sans", value: "--font-sans" },
      { name: "mono", value: "--font-mono" },
    ],
  },
};

/**
 * Font size tokens for the design system.
 * Figma format: --text/xs/font-size, --text/sm/font-size
 */
export const FontSize: Story = {
  args: {
    key: "fontSize",
    property: [
      { name: "xs", value: "--text-xs-font-size" },
      { name: "sm", value: "--text-sm-font-size" },
    ],
  },
};

/**
 * Font weight tokens - Tailwind defaults (if available).
 */
export const FontWeight: Story = {
  args: {
    key: "fontWeight",
    property: [
      { name: "normal", value: "400" },
      { name: "medium", value: "500" },
      { name: "semibold", value: "600" },
      { name: "bold", value: "700" },
    ],
  },
};

/**
 * Letter Spacing tokens - Tailwind defaults (if available).
 */
export const LetterSpacing: Story = {
  args: {
    key: "letterSpacing",
    property: [
      { name: "tight", value: "-0.025em" },
      { name: "normal", value: "0em" },
      { name: "wide", value: "0.025em" },
    ],
  },
};
