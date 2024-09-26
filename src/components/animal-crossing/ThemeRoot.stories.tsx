import { Meta, StoryObj } from "@storybook/react";
import ThemeRoot from "./ThemeRoot";
import { GRASS_SHAPES } from "types/animalCrossing";

const meta: Meta<typeof ThemeRoot> = {
  component: ThemeRoot,
  title: "animal crossing/ThemeRoot",
  argTypes: {
    shape: {
      options: GRASS_SHAPES,
      control: { type: "radio" },
      description: "circle | square | triangle",
    },
  },
  render: (args) => {
    const date = args.date ? new Date(args.date) : new Date();
    return <ThemeRoot {...args} date={date} />;
  },
  tags: ["!dev"],
};

export default meta;

type Story = StoryObj<typeof ThemeRoot>;

export const NowSquare: Story = {
  args: {
    date: new Date(),
    shape: "square",
  },
};
