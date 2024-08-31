import type { Meta, StoryObj } from "@storybook/react";

import IconSelectComponent from "./IconSelect";

const meta: Meta<typeof IconSelectComponent> = {
  component: IconSelectComponent,
  title: "admin/IconSelect",
};

export default meta;

type Story = StoryObj<typeof IconSelectComponent>;

export const IconSelect: Story = {};
