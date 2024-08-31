import type { Meta, StoryObj } from "@storybook/react";

import CoverImage from "./CoverImage";

const meta: Meta<typeof CoverImage> = {
  component: CoverImage,
  title: "photography/CoverImage",
};

export default meta;

type Story = StoryObj<typeof CoverImage>;

export const FourThree: Story = {
  args: {
    src: "https://photos.smugmug.com/Death-Valley-National-Park/i-GZbZkGM/0/NJQkb69DgS29DMNDHkCwWL4GLj4Hmt9zDwZWHMpKb/X2/2024-02-29_18-19-33-X2.jpg",
    aspectRatio: "4 / 3",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};
