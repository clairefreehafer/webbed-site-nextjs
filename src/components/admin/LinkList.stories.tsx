import { Meta, StoryObj } from "@storybook/react";
import AdminLinkList from "./LinkList";

const meta: Meta<typeof AdminLinkList> = {
  component: AdminLinkList,
  title: "admin/LinkList",
  parameters: {
    backgrounds: {
      default: "admin",
    },
  },
};

export default meta;

type Story = StoryObj<typeof AdminLinkList>;

export const LinkList: Story = {
  args: {
    links: ["one", "two", "three"],
  },
};
