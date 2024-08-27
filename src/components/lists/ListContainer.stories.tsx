import { Meta, StoryObj } from "@storybook/react";
import ListContainerComponent from "./ListContainer";

const meta: Meta<typeof ListContainerComponent> = {
  component: ListContainerComponent,
  title: "lists/ListContainer",
};

export default meta;

type Story = StoryObj<typeof ListContainerComponent>;

export const ListContainer: Story = {
  args: {
    title: "list title",
    description: "list description",
    items: [{ title: "item 1" }],
    tags: ["list tag"],
  },
};
