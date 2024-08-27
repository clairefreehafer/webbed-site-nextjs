import type { Meta, StoryObj } from "@storybook/react";

import Nav from "./Nav";

const meta: Meta<typeof Nav> = {
  component: Nav,
  title: "Nav",
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Nav>;

export const Default: Story = {
  args: {
    theme: "default",
  },
};

export const Photography: Story = {
  args: {
    theme: "notebook",
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/photography",
      },
    },
  },
};

export const AnimalCrossing: Story = {
  args: {
    theme: "animalCrossing",
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/animal-crossing",
      },
    },
  },
};

export const Zelda: Story = {
  args: {
    theme: "zelda",
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/zelda",
      },
    },
  },
};

export const Admin: Story = {
  args: {
    theme: "admin",
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/admin",
      },
    },
  },
};
