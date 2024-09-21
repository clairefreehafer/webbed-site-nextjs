import type { Preview } from "@storybook/react";
import {
  cutiveMono,
  loveYaLikeASister,
  pangolin,
  pressStart2P,
  ptMono,
  redactedScript,
  ribeye,
} from "@fonts";
import "@styles/index.css";

const fonts = `
  ${cutiveMono.variable}
  ${loveYaLikeASister.variable}
  ${pangolin.variable}
  ${pressStart2P.variable}
  ${ptMono.variable}
  ${redactedScript.variable}
  ${ribeye.variable}
`;

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
  decorators: [
    (Story) => (
      <div className={fonts}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
