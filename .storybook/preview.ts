import type { Preview } from "@storybook/react";
import "@themes/index.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        {
          name: "admin",
          value: "black",
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
  },
};

export default preview;
