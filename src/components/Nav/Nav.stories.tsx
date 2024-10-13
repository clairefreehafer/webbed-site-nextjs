import type { Meta, StoryObj } from "@storybook/react";

import Nav from ".";

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
  args: {},
};

export const Photography: Story = {
  args: {},
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/photography",
      },
    },
  },
};

export const AnimalCrossing: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/animal-crossing",
      },
    },
  },
};

export const Zelda: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/zelda",
      },
    },
  },
};

export const Admin: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/admin",
      },
    },
  },
};
