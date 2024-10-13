import type { Meta, StoryObj } from "@storybook/react";

import Icon from "./Icon";

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: "Icon",
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const StarFragment: Story = {
  args: {
    date: new Date(),
  },
  parameters: {
    backgrounds: {
      default: "animal crossing",
    },
  },
};

export const Character: Story = {
  args: {
    icon: { character: "💩", imagePath: null, text: null },
  },
  parameters: {
    backgrounds: {
      default: "notebook",
    },
  },
};

export const Image: Story = {
  args: {
    icon: {
      character: null,
      imagePath: "/images/animal-crossing/characters/rover.png",
      text: "rover",
    },
  },
  parameters: {
    backgrounds: {
      default: "animal crossing",
    },
  },
};
