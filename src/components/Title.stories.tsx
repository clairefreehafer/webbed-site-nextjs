import type { Meta, StoryObj } from "@storybook/react";

import Title from "./Title";

const meta: Meta<typeof Title> = {
  component: Title,
  title: "Title",
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Admin: Story = {
  args: {
    theme: "admin",
  },
  parameters: {
    backgrounds: {
      default: "admin",
    },
    nextjs: {
      navigation: {
        pathname: "/admin/albums/new",
      },
    },
  },
};

export const Notebook: Story = {
  args: {
    theme: "notebook",
  },
  parameters: {
    backgrounds: {
      default: "notebook",
    },
    nextjs: {
      navigation: {
        pathname: "/photography/recently-added",
      },
    },
  },
};

export const Book: Story = {
  args: {
    theme: "book",
  },
  parameters: {
    backgrounds: {
      default: "book",
    },
    nextjs: {
      navigation: {
        pathname: "/lists/test-list",
      },
    },
  },
};
