import { Meta, StoryObj } from "@storybook/react";
import TVComponent from "./TV";

const meta: Meta<typeof TVComponent> = {
  component: TVComponent,
  title: "experimental/TV",
  parameters: {
    backgrounds: {
      default: "admin",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TVComponent>;

export const TV: Story = {
  args: {},
};
