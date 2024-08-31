import type { Meta, StoryObj } from "@storybook/react";

import DateInput from "./DateInput";

const meta: Meta<typeof DateInput> = {
  component: DateInput,
  title: "admin/Date",
};

export default meta;

type Story = StoryObj<typeof DateInput>;

export const Date: Story = {};
