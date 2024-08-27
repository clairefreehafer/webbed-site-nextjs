import { Meta, StoryObj } from "@storybook/react";
import Logo from "./Logo";

const meta: Meta<typeof Logo> = {
  component: Logo,
  title: "animal crossing/Logo",
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const ClaireFreehafer: Story = {
  args: {
    text: "claire freehafer",
  },
};
