import type { Preview } from "@storybook/react";
import "@styles/default/theme.css";
import "@styles/animal-crossing/theme.css";
import "@styles/admin/theme.css";
import "@styles/zelda/theme.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
