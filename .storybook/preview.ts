import type { Preview } from "@storybook/react";
import "@styles/default/theme.css";
import "@styles/animal-crossing/theme.css";
import "@themes/admin.css";
import "@styles/zelda/theme.css";

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
