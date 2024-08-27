import { Meta, StoryObj } from "@storybook/react";
import CameraListItemComponent from "./CameraListItem";

const meta: Meta<typeof CameraListItemComponent> = {
  component: CameraListItemComponent,
  title: "lists/CameraListItem",
};

export default meta;

type Story = StoryObj<typeof CameraListItemComponent>;

export const CameraListItem: Story = {
  args: {
    make: "canon",
    model: "rebel xs",
    medium: "digital",
  },
};
