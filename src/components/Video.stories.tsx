import { Meta, StoryObj } from "@storybook/react";
import Video from "./Video";

const meta: Meta<typeof Video> = {
  component: Video,
  title: "Video",
};

export default meta;

type Story = StoryObj<typeof Video>;

export const Looping: Story = {
  args: {
    loop: true,
  },
};
