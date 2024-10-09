import type { Meta, StoryObj } from "@storybook/react";

import JaggedSliceComponent from "./JaggedSlice";

const meta: Meta<typeof JaggedSliceComponent> = {
  component: JaggedSliceComponent,
  title: "unused/JaggedSlice",
};

export default meta;

type Story = StoryObj<typeof JaggedSliceComponent>;

export const JaggedSlice: Story = {
  args: {
    children: <h1>jagged slice</h1>,
  },
};
