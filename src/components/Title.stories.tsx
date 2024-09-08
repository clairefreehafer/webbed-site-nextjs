import type { Meta, StoryObj } from "@storybook/react";

import Title from "./Title";

const meta: Meta<typeof Title> = {
  component: Title,
  title: "Title",
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Home: Story = {
  args: {},
};

// export const SeciondLevel: Story = {
//   args: {},
// };

// export const ThirdLevel: Story = {
//   args: {},
// };

// export const FourthLevel: Story = {
//   args: {},
// };
