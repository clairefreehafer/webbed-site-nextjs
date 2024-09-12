import { Meta, StoryObj } from "@storybook/react";
import ThemeRoot from "./ThemeRoot";

const meta: Meta<typeof ThemeRoot> = {
  component: ThemeRoot,
  title: "animal crossing/ThemeRoot",
};

export default meta;

type Story = StoryObj<typeof ThemeRoot>;

export const WinterSquare: Story = {
  args: {
    date: new Date("01/01/2024"),
    shape: "square",
  },
};
