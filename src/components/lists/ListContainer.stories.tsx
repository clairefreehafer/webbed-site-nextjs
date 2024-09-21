import { Meta, StoryObj } from "@storybook/react";
import ListContainer from "./ListContainer";

const meta: Meta<typeof ListContainer> = {
  component: ListContainer,
  title: "lists/ListContainer",
};

export default meta;

type Story = StoryObj<typeof ListContainer>;

export const CombinedList: Story = {
  args: {},
};

export const BookListItem: Story = {
  args: {},
};

export const CameraListItem: Story = {
  args: {
    name: "list title",
    description: "list description",
    items: [],
  },
};

export const MusicListItem: Story = {
  args: {},
};

export const PodcastListItem: Story = {
  args: {},
};

export const VideoGameListItem: Story = {
  args: {
    name: "list title",
    description: "list description",
    items: [],
  },
};

export const WebsiteListItem: Story = {
  args: {},
};
