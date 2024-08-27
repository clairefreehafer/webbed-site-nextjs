import type { Meta, StoryObj } from "@storybook/react";

import Title from "./Title";

const meta: Meta<typeof Title> = {
  component: Title,
  title: "Title",
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Home: Story = {
  args: {
    pathname: [""],
  },
};

export const SeciondLevel: Story = {
  args: {
    pathname: ["", "admin"],
  },
};

export const ThirdLevel: Story = {
  args: {
    pathname: ["", "admin", "photos"],
  },
};

export const FourthLevel: Story = {
  args: {
    pathname: ["", "admin", "photos", "smugMugKey"],
  },
};
