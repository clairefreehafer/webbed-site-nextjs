import type { Meta, StoryObj } from "@storybook/react";

import StyledLink from "./Link";

const meta: Meta<typeof StyledLink> = {
  component: StyledLink,
  title: "StyledLink",
};

export default meta;

type Story = StoryObj<typeof StyledLink>;

export const Admin: Story = {
  args: {
    href: "/",
    children: "link",
  },
  parameters: {
    backgrounds: {
      default: "admin",
    },
  },
};

export const AnimalCrossing: Story = {
  args: {
    href: "/",
    children: "link",
  },
  parameters: {
    backgrounds: {
      default: "animalCrossing",
    },
  },
};
