import { Meta, StoryObj } from "@storybook/react";
import Separator from "./Separator";

const meta: Meta<typeof Separator> = {
  component: Separator,
  title: "zelda/Separator",
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const One: Story = {
  args: { number: 1 },
};

export const Two: Story = {
  args: { number: 2 },
};
export const Three: Story = {
  args: { number: 3 },
};
