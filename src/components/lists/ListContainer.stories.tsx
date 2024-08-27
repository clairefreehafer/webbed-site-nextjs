import { Meta, StoryObj } from "@storybook/react";
import ListContainer from "./ListContainer";

const meta: Meta<typeof ListContainer> = {
  component: ListContainer,
  title: "lists/ListContainer",
};

export default meta;

type Story = StoryObj<typeof ListContainer>;

export const CameraListItem: Story = {
  args: {
    title: "list title",
    description: "list description",
    items: [{ make: "canon", model: "rebel xs", medium: "digital" }],
    tags: ["list tag"],
  },
};

export const VideoGameListItem: Story = {
  args: {
    title: "list title",
    description: "list description",
    items: [{ title: "item 1" }],
    tags: ["list tag"],
  },
};
