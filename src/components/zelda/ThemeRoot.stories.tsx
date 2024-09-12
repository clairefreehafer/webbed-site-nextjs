import { Meta, StoryObj } from "@storybook/react";
import ZeldaThemeRoot from "./ThemeRoot";

const meta: Meta<typeof ZeldaThemeRoot> = {
  component: ZeldaThemeRoot,
  title: "zelda/ThemeRoot",
};

export default meta;

type Story = StoryObj<typeof ZeldaThemeRoot>;

export const ThemeRoot: Story = {};
