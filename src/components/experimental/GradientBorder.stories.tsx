import { Meta, StoryObj } from "@storybook/react";
import GradientBorder from "./GradientBorder";

const meta: Meta<typeof GradientBorder> = {
  component: GradientBorder,
  title: "experimental/GradientBorder",
};

export default meta;

type Story = StoryObj<typeof GradientBorder>;

export const Regular: Story = {
  args: {
    backgroundColor: "salmon",
    borderSize: "1rem",
    children: "HELLO GRADIENT :)",
  },
};

export const Noisy: Story = {
  args: {
    backgroundColor: "blue",
    borderSize: "10rem",
    contrast: 170,
    brightness: 1000,
    noisy: true,
    children: "HELLO NOISY GRADIENT :)",
  },
};
