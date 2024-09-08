import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // default theme
  theme: {
    tokens: {
      gradients: {
        rainbow: {
          value:
            "linear-gradient(135deg, red, orange, yellow, green, blue, indigo, violet)",
        },
      },
    },
  },

  themes: {
    admin: {},
    animalCrossing: {},
    book: {},
    notebook: {},
    zelda: {},
  },

  // The output directory for your css system
  outdir: "styled-system",

  // remove the default design tokens
  presets: [],
});
