import type { Meta, StoryObj } from "@storybook/react";

import PolaroidGridComponent from "./PolaroidGrid";

const meta: Meta<typeof PolaroidGridComponent> = {
  component: PolaroidGridComponent,
  title: "photography/PolaroidGrid",
};

export default meta;

type Story = StoryObj<typeof PolaroidGridComponent>;

export const PolaroidGrid: Story = {
  args: {
    // TODO: create reusable data for stories
    albums: [
      {
        id: 0,
        name: "death valley national park",
        coverPhoto: {
          url: "https://photos.smugmug.com/Death-Valley-National-Park/i-GZbZkGM/0/NJQkb69DgS29DMNDHkCwWL4GLj4Hmt9zDwZWHMpKb/#size#/2024-02-29_18-19-33-#size#.jpg",
        },
        randomCoverPhoto: {},
        icon: null,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};
