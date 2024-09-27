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
import { scanLines } from "@panda/patterns";

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
        {
          name: "animal crossing",
          value: "#cfbe95",
        },
        {
          name: "notebook",
          value: "black",
        },
        {
          name: "book",
          value: "moccasin",
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
        includeNames: true,
      },
    },
  },
  decorators: [
    // add theme roots
    (Story, { parameters }) => {
      const theme = parameters.backgrounds.default;
      return (
        <div
          className={theme === "admin" && scanLines()}
          data-panda-theme={parameters.backgrounds.default}
        >
          <Story />
        </div>
      );
    },
    (Story, { args }) => (
      <div className={fonts} data-panda-theme={args.theme}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
