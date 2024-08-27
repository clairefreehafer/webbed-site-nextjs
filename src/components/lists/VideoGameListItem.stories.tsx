import { Meta, StoryObj } from "@storybook/react";
import VideoGameListItemComponent from "./VideoGameListItem";

const meta: Meta<typeof VideoGameListItemComponent> = {
  component: VideoGameListItemComponent,
};

export default meta;

type Story = StoryObj<typeof VideoGameListItemComponent>;

export const VideoGameListItem: Story = {
  args: {
    title: "tears of the kingdom",
  },
};
