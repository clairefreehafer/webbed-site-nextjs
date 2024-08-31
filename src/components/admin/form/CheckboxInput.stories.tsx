import type { Meta, StoryObj } from "@storybook/react";

import CheckboxInput from "./CheckboxInput";

const meta: Meta<typeof CheckboxInput> = {
  component: CheckboxInput,
  title: "admin/Checkbox",
  parameters: {
    backgrounds: {
      default: "admin",
    },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxInput>;

export const Checkbox: Story = {};
