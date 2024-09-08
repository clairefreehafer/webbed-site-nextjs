import type { Meta, StoryObj } from "@storybook/react";

import PanoramaComponent from "./Panorama";

const meta: Meta<typeof Panorama> = {
  component: PanoramaComponent,
  title: "photography/Panorama",
};

export default meta;

type Story = StoryObj<typeof PanoramaComponent>;

export const Panorama: Story = {
  args: {},
};
