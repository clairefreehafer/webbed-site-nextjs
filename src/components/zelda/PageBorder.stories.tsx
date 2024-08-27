import { Meta, StoryObj } from "@storybook/react";
import PageBorder from "./PageBorder";

const meta: Meta<typeof PageBorder> = {
  component: PageBorder,
  title: "zelda/PageBorder",
};

export default meta;

type Story = StoryObj<typeof PageBorder>;

export const Top: Story = {};

export const Bottom: Story = {
  args: { rotate: true },
};
