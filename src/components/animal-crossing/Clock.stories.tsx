import { Meta, StoryObj } from "@storybook/react";
import Clock from "./Clock";

const meta: Meta<typeof Clock> = {
  component: Clock,
  title: "animal crossing/Clock",
};

export default meta;

type Story = StoryObj<typeof Clock>;

export const PopulationGrowing: Story = {
  args: {
    game: "pg",
  },
};

export const WildWorld: Story = {
  args: {
    game: "ww",
  },
};
export const CityFolk: Story = {
  args: {
    game: "cf",
  },
};
export const NewLeaf: Story = {
  args: {
    game: "nl",
  },
};
export const NewHorizons: Story = {
  args: {
    game: "nh",
  },
};
