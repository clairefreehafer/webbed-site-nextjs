import { Meta, StoryObj } from "@storybook/react";
import NookPhoneComponent from "./NookPhone";

const meta: Meta<typeof NookPhoneComponent> = {
  component: NookPhoneComponent,
  title: "animal crossing/NookPhone",
  parameters: {
    backgrounds: {
      default: "animalCrossing",
    },
  },
};

export default meta;

type Story = StoryObj<typeof NookPhoneComponent>;

export const NookPhone: Story = {};
