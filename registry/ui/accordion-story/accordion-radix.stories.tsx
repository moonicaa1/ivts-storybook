import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/bases/radix/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/bases/radix/components/ui/card";

/**
 * A vertically stacked list of interactive headings that can be individually
 * revealed and hidden to expose content. Supports Basic and Border variants.
 */
const meta = {
  title: "Component/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "radio",
      description: "Type of accordion behavior",
      options: ["single", "multiple"],
    },
    collapsible: {
      control: "boolean",
      description: "Can an open accordion be collapsed using the trigger",
      if: { arg: "type", eq: "single" },
    },
    variant: {
      control: "radio",
      description: "Visual style variant",
      options: ["basic", "border"],
    },
    defaultValue: {
      control: "radio",
      description: "Initially expanded item (single type)",
      options: ["", "item-1", "item-2", "item-3"],
      if: { arg: "type", eq: "single" },
    },
    disabledItem: {
      control: "radio",
      description: "Which item is disabled",
      options: ["none", "item-1", "item-2", "item-3"],
    },
    trigger1: { control: "text", description: "Item 1 trigger text" },
    trigger2: { control: "text", description: "Item 2 trigger text" },
    trigger3: { control: "text", description: "Item 3 trigger text" },
  },
  args: {
    type: "single",
    collapsible: true,
    variant: "basic",
    defaultValue: "",
    disabledItem: "none",
    trigger1: "How do I reset my password?",
    trigger2: "Can I change my subscription plan?",
    trigger3: "What payment methods do you accept?",
  },
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
  render: (args: AccordionArgs) => {
    const itemClass = args.variant === "border" ? "px-4" : undefined;
    const type = args.type ?? "single";
    const accordionProps =
      type === "single"
        ? {
            type: "single" as const,
            collapsible: args.collapsible ?? true,
            ...(args.defaultValue ? { defaultValue: args.defaultValue } : {}),
          }
        : { type: "multiple" as const };
    const accordion = (
      <Accordion {...accordionProps}>
        <AccordionItem value="item-1" className={itemClass} disabled={args.disabledItem === "item-1"}>
          <AccordionTrigger>{args.trigger1 ?? "How do I reset my password?"}</AccordionTrigger>
          <AccordionContent>
            Click on &apos;Forgot Password&apos; on the login page, enter your
            email address, and we&apos;ll send you a link to reset your password.
            The link will expire in 24 hours.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className={itemClass} disabled={args.disabledItem === "item-2"}>
          <AccordionTrigger>{args.trigger2 ?? "Can I change my subscription plan?"}</AccordionTrigger>
          <AccordionContent>
            Yes. You can upgrade or downgrade your plan at any time from the
            account settings. Changes take effect at the start of your next
            billing cycle.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className={itemClass} disabled={args.disabledItem === "item-3"}>
          <AccordionTrigger>{args.trigger3 ?? "What payment methods do you accept?"}</AccordionTrigger>
          <AccordionContent>
            We accept all major credit cards (Visa, Mastercard, American Express),
            PayPal, and bank transfers for annual plans.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    return args.variant === "border" ? (
      <div className="w-[480px] overflow-hidden rounded-lg border border-border">
        {accordion}
      </div>
    ) : (
      accordion
    );
  },
} as Meta<typeof Accordion>;

export default meta;

type AccordionArgs = {
  type?: "single" | "multiple";
  collapsible?: boolean;
  variant?: "basic" | "border";
  defaultValue?: "" | "item-1" | "item-2" | "item-3";
  disabledItem?: "none" | "item-1" | "item-2" | "item-3";
  trigger1?: string;
  trigger2?: string;
  trigger3?: string;
};

type Story = Omit<StoryObj<typeof meta>, "args"> & { args?: AccordionArgs };

/** 기본 FAQ 스타일. Variant, State, Trigger Text 등 Controls에서 조절 가능. */
export const Default: Story = {};

/** Border variant. 전체 테두리와 둥근 모서리가 있는 카드형 스타일. */
export const Border: Story = {
  args: { variant: "border" },
  render: (args: AccordionArgs) => {
    const type = args.type ?? "single";
    const accordionProps =
      type === "single"
        ? {
            type: "single" as const,
            collapsible: args.collapsible ?? true,
            ...(args.defaultValue ? { defaultValue: args.defaultValue } : {}),
          }
        : { type: "multiple" as const };
    return (
    <div className="w-[480px] overflow-hidden rounded-lg border border-border">
      <Accordion {...accordionProps}>
        <AccordionItem value="item-1" className="px-4">
          <AccordionTrigger>How does billing work?</AccordionTrigger>
          <AccordionContent>
            We offer monthly and annual subscription plans. Billing is charged
            at the beginning of each cycle, and you can cancel anytime. All
            plans include automatic backups, 24/7 support, and unlimited team
            members.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="px-4">
          <AccordionTrigger>Is my data secure?</AccordionTrigger>
          <AccordionContent>
            Yes. We use industry-standard encryption (AES-256) for data at rest
            and TLS 1.3 for data in transit. We are SOC 2 Type II certified.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="px-4">
          <AccordionTrigger>What integrations do you support?</AccordionTrigger>
          <AccordionContent>
            We integrate with Slack, Jira, GitHub, Google Workspace, and
            Microsoft 365. More integrations are available via our API.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    );
  },
};

/** 섹션 헤더가 있는 카드형 FAQ. Subscription & Billing 예시. */
export const SubscriptionAndBilling: Story = {
  render: (args: AccordionArgs) => {
    const type = args.type ?? "single";
    const accordionProps =
      type === "single"
        ? {
            type: "single" as const,
            collapsible: args.collapsible ?? true,
            ...(args.defaultValue ? { defaultValue: args.defaultValue } : {}),
          }
        : { type: "multiple" as const };
    return (
    <Card className="w-[480px]">
      <CardHeader className="flex flex-col gap-1">
        <CardTitle>Subscription & Billing</CardTitle>
        <CardDescription>
          Common questions about your account, plans, payments and cancellations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion {...accordionProps}>
          <AccordionItem value="item-1">
            <AccordionTrigger>What subscription plans do you offer?</AccordionTrigger>
            <AccordionContent>
              We offer three subscription tiers: Starter ($9/month),
              Professional ($29/month), and Enterprise ($99/month). Each plan
              includes increasing storage limits, API access, priority support,
              and team collaboration features.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I change my subscription plan?</AccordionTrigger>
            <AccordionContent>
              Yes. You can upgrade or downgrade at any time. Changes take effect
              at the start of your next billing cycle.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
            <AccordionContent>
              We accept all major credit cards, PayPal, and bank transfers for
              annual plans.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
    );
  },
};

/** 비활성화된 아이템이 포함된 예시. (Default에서 disabledItem 컨트롤로 동일 설정 가능) */
export const WithDisabled: Story = {
  args: { disabledItem: "item-2" },
};

/** 여러 아이템을 동시에 열 수 있는 multiple 타입. */
export const Multiple: Story = {
  args: {
    type: "multiple",
  },
};

export const ShouldOnlyOpenOneWhenSingleType: Story = {
  name: "when accordions are clicked, should open only one item at a time",
  args: {
    type: "single" as const,
  },
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const accordions = await canvas.getAllByRole("button");

    for (const trigger of accordions) {
      await userEvent.click(trigger);
      await waitFor(async () => {
        const content = await canvas.findAllByRole("region");
        return expect(content.length).toBe(1);
      });
    }

    await userEvent.click(accordions[accordions.length - 1]);
    await waitFor(async () => {
      const content = await canvas.queryByRole("region");
      return expect(content).toBeFalsy();
    });
  },
};

export const ShouldOpenAllWhenMultipleType: Story = {
  name: "when accordions are clicked, should open all items one at a time",
  args: {
    type: "multiple",
  },
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const accordions = await canvas.getAllByRole("button");

    for (let i = 0; i < accordions.length; i++) {
      await userEvent.click(accordions[i]);
      await waitFor(async () => {
        const content = await canvas.findAllByRole("region");
        return expect(content.length).toBe(i + 1);
      });
    }

    for (let i = accordions.length - 1; i > 0; i--) {
      await userEvent.click(accordions[i]);
      await waitFor(async () => {
        const content = await canvas.findAllByRole("region");
        return expect(content.length).toBe(i);
      });
    }

    await userEvent.click(accordions[0]);
    await waitFor(async () => {
      const content = await canvas.queryByRole("region");
      return expect(content).toBeFalsy();
    });
  },
};
