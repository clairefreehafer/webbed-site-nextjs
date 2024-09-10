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
      zIndex: {
        slideshow: {
          ui: { value: 2 },
          insetShadow: { value: 1 },
          photo: { value: 0 },
          borderTexture: { value: -1 },
          border: { value: -2 },
        },
      },
    },

    keyframes: {
      wiggleBox: {
        "0%, 66%": { opacity: "0" },
        "67%, 100%": { opacity: "1" },
      },
    },

    recipes: {},
  },

  themes: {
    admin: {},
    animalCrossing: {
      tokens: {
        colors: {
          uiBackground: { value: "rgb(248, 245, 223, 0.8)" },
          brown: { value: "rgb(85, 69, 64)" },
          grass: {
            "1210-0224": { value: "rgb(189, 215, 238)" },
            "0225-0331": { value: "rgb(31, 140, 57)" },
            "0401-0722": { value: "rgb(0, 131, 90)" },
            "0723-0915": { value: "rgb(19, 115, 82)" },
            "0916-0930": { value: "rgb(73, 123, 49)" },
            "1001-1015": { value: "rgb(132, 123, 58)" },
            "1016-1029": { value: "rgb(148, 99, 99)" },
            "1030-1112": { value: "rgb(148, 90, 98)" },
            "1113-1128": { value: "rgb(132, 90, 82)" },
            "1129-1209": { value: "rgb(99, 81, 82)" },
          },
          sand: { value: "#cfbe95" },
        },
        shadows: {
          text: { value: "0 1px 5px {colors.brown}" },
        },
      },
    },
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
    themes: ["admin", "animalCrossing", "notebook", "zelda"],
  },

  // The output directory for your css system
  outdir: "styled-system",

  // remove the default design tokens
  presets: [],

  importMap: "@panda",
});
