import type { Meta, StoryObj } from "@storybook/react";

import IconList from "./IconList";

const meta: Meta<typeof IconList> = {
  component: IconList,
  title: "IconList",
};

export default meta;

type Story = StoryObj<typeof IconList>;

export const AnimalCrossing: Story = {
  args: {
    // TODO: create reusable data for stories
    albums: [
      {
        id: 0,
        name: "events",
        icon: null,
        date: new Date(),
        sectionArray: ["one", "two"],
      },
    ],
    theme: "animalCrossing",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export const Zelda: Story = {
  args: {
    // TODO: create reusable data for stories
    albums: [
      {
        id: 0,
        name: "monsters",
        icon: null,
        date: new Date(),
        sectionArray: ["one", "two"],
      },
    ],
    theme: "zelda",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};
