import { defineConfig } from "@pandacss/dev";
import patterns from "@styles/config/patterns";
import { acnhTextBackground } from "@styles/config/layerStyles";
import { adminInputRecipe } from "@styles/config/recipes";
import {
  adminTokens,
  animalCrossingTokens,
  baseTokens,
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

    layerStyles: {
      acnhTextBackground,
    },

    recipes: {
      adminInput: adminInputRecipe,
    },
  },

  themes: {
    admin: {
      tokens: adminTokens,
    },
    animalCrossing: {
      tokens: animalCrossingTokens,
    },
    book: {},
    notebook: {
      tokens: notebookTokens,
    },
    zelda: {
      tokens: zeldaTokens,
    },
  },
  staticCss: {
    themes: ["admin", "animalCrossing", "notebook", "zelda"],
  },

  patterns,

  // The output directory for your css system
  outdir: "styled-system",

  // remove the default design tokens
  presets: [],

  importMap: "@panda",
  jsxFramework: "react",
});
