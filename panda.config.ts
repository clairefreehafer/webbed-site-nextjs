import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  theme: {
    tokens: {
      gradients: {
        rainbow: {
          value:
            "linear-gradient(135deg, red, orange, yellow, green, blue, indigo, violet)",
        },
      },
    },

    keyframes: {
      wiggleBox: {
        "0%, 66%": { opacity: "0" },
        "67%, 100%": { opacity: "1" },
      },
    },
  },

  themes: {
    admin: {},
    animalCrossing: {},
    book: {},
    notebook: {
      tokens: {
        animations: {
          wiggleBox: { value: "250ms wiggleBox infinite" },
        },
        colors: {
          blueLine: { value: "rgba(0, 255, 255, 0.8)" },
          redLine: { value: "rgba(255, 0, 0, 0.8)" },
        },
        durations: {
          wiggleBox: { value: "250ms" },
        },
        lineHeights: {
          paper: { value: "1.5rem" },
        },
        spacing: {
          paperLineSpacing: { value: "calc({lineHeights.paper} + 1px)" },
          paperTopPadding: { value: "calc(2 * {lineHeights.paper})" },
          redLinePadding: { value: "3rem" },
        },
      },
    },
    zelda: {
      tokens: {
        colors: {
          lightBlue: { value: "#76b6ff" },
          textShadow: { value: "rgba(0, 0, 0, 0.75)" },
        },
      },
    },
  },
  staticCss: {
    themes: ["admin", "notebook", "zelda"],
  },

  // The output directory for your css system
  outdir: "styled-system",

  // remove the default design tokens
  presets: [],
});
