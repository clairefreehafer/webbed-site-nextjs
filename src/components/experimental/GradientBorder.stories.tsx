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
    gradientColor: "salmon",
    backgroundColor: "transparent",
    borderSize: "1rem",
    noisy: false,
    children: "HELLO GRADIENT :)",
  },
};

export const Noisy: Story = {
  args: {
    gradientColor: "rebeccapurple",
    backgroundColor: "moccasin",
    borderSize: "10rem",
    noisy: true,
    contrast: 170,
    brightness: 1000,
    baseFrequency: 0.65,
    numOctaves: 3,
    size: 250,
    children: "HELLO NOISY GRADIENT :)",
  },
};
