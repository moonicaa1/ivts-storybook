import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  CircleAlert,
  CircleCheck,
  Info as InfoIcon,
  TriangleAlert,
} from "lucide-react";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/bases/radix/components/ui/alert";
import { Button } from "@/bases/radix/components/ui/button";

/**
 * Displays a callout for user attention.
 */
const meta = {
  title: "Component/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "destructive", "warning"],
      control: { type: "radio" },
    },
  },
  args: {
    variant: "default",
  },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default alert with icon, title and description. */
export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <CircleAlert className="size-4" />
      <AlertTitle>Success! Your changes have been saved.</AlertTitle>
      <AlertDescription>
        This is an alert with icon, title and description.
      </AlertDescription>
    </Alert>
  ),
};

/** Icon and description only. No title. */
export const IconAndDescription: Story = {
  render: (args) => (
    <Alert {...args}>
      <CircleAlert className="size-4" />
      <AlertDescription>
        This one has an icon and a description only. No title.
      </AlertDescription>
    </Alert>
  ),
};

/** Description only. No title. No icon. */
export const DescriptionOnly: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertDescription>
        This one has a description only. No title. No icon.
      </AlertDescription>
    </Alert>
  ),
};

/** Icon and title only. No description. */
export const IconAndTitle: Story = {
  render: (args) => (
    <Alert {...args}>
      <CircleAlert className="size-4" />
      <AlertTitle>Let&apos;s try one with icon and title.</AlertTitle>
    </Alert>
  ),
};

/** Long title truncation. */
export const LongTitle: Story = {
  render: (args) => (
    <Alert {...args}>
      <CircleAlert className="size-4" />
      <AlertTitle>
        This is a very long alert title that demonstrates how the component
        handles...
      </AlertTitle>
    </Alert>
  ),
};

/** Long description wrapping. */
export const LongDescription: Story = {
  render: (args) => (
    <Alert {...args}>
      <CircleAlert className="size-4" />
      <AlertDescription>
        This is a very long alert description that demonstrates how the
        component handles extended text content and potentially wraps across
        multiple lines
      </AlertDescription>
    </Alert>
  ),
};

/** Destructive alert for errors. */
export const Destructive: Story = {
  render: (args) => (
    <Alert {...args} variant="destructive">
      <CircleAlert className="size-4" />
      <AlertTitle>Something went wrong!</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};

/** Destructive with bullet list. */
export const DestructiveWithList: Story = {
  render: (args) => (
    <Alert {...args} variant="destructive">
      <CircleAlert className="size-4" />
      <AlertTitle>Unable to process your payment.</AlertTitle>
      <AlertDescription>
        <p>Please verify your billing information and try again.</p>
        <ul>
          <li>Check your card details</li>
          <li>Ensure sufficient funds</li>
          <li>Verify billing address</li>
        </ul>
      </AlertDescription>
    </Alert>
  ),
};

/** Alert with Undo action button. */
export const WithUndoAction: Story = {
  render: (args) => (
    <Alert {...args}>
      <CircleAlert className="size-4" />
      <AlertTitle>The selected emails have been marked as spam.</AlertTitle>
      <AlertAction>
        <Button variant="outline" size="sm">
          Undo
        </Button>
      </AlertAction>
    </Alert>
  ),
};

/** Success alert with CircleCheck icon. */
export const Success: Story = {
  render: (args) => (
    <Alert {...args}>
      <CircleCheck className="size-4" />
      <AlertTitle>Payment successful</AlertTitle>
      <AlertDescription>
        Your payment of $29.99 has been processed. A receipt has been sent to
        your email address.
      </AlertDescription>
    </Alert>
  ),
};

/** Info alert with Info icon. */
export const Info: Story = {
  render: (args) => (
    <Alert {...args}>
      <InfoIcon className="size-4" />
      <AlertTitle>New feature available</AlertTitle>
      <AlertDescription>
        We&apos;ve added dark mode support. You can enable it in your account
        settings.
      </AlertDescription>
    </Alert>
  ),
};

/** Alert with Enable action button. */
export const WithEnableAction: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Dark mode is now available</AlertTitle>
      <AlertDescription>
        Enable it under your profile settings to get started.
      </AlertDescription>
      <AlertAction>
        <Button size="sm">Enable</Button>
      </AlertAction>
    </Alert>
  ),
};

/** Warning variant with amber styling. */
export const Warning: Story = {
  render: (args) => (
    <Alert {...args} variant="warning">
      <TriangleAlert className="size-4" />
      <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
      <AlertDescription>
        Renew now to avoid service interruption or upgrade to a paid plan to
        continue using the service.
      </AlertDescription>
    </Alert>
  ),
};
