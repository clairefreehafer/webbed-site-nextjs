import { defineConfig } from "@pandacss/dev";
import patterns from "@styles/config/patterns";
import layerStyles from "@styles/config/layerStyles";
import recipes from "@styles/config/recipes";
import {
  adminTokens,
  animalCrossingTokens,
  baseTokens,
  homeTokens,
  notebookTokens,
  zeldaTokens,
} from "@styles/config/tokens";
import { keyframes } from "@styles/config/keyframes";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  theme: {
    tokens: baseTokens,

    keyframes,
    layerStyles,

    recipes,
  },

  themes: {
    admin: {
      tokens: adminTokens,
    },
    animalCrossing: {
      tokens: animalCrossingTokens,
    },
    book: {},
    home: {
      tokens: homeTokens,
    },
    notebook: {
      tokens: notebookTokens,
    },
    zelda: {
      tokens: zeldaTokens,
    },
  },
  staticCss: {
    themes: ["admin", "animalCrossing", "book", "home", "notebook", "zelda"],
  },

  patterns,

  // The output directory for your css system
  outdir: "styled-system",

  // remove the default design tokens
  presets: [],

  importMap: "@panda",
  jsxFramework: "react",
});
