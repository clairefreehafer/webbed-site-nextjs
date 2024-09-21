import { Meta, StoryObj } from "@storybook/react";
import ScribbleButtonComponent from "./ScribbleButton";

const meta: Meta<typeof ScribbleButtonComponent> = {
  component: ScribbleButtonComponent,
  title: "ScribbleButton",
};

export default meta;

type Story = StoryObj<typeof ScribbleButtonComponent>;

export const ScribbleButton: Story = {
  args: {
    text: "button",
  },
};
