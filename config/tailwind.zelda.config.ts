import type { Config } from "tailwindcss";
import defaultPlugin from "../plugins/default";

export default {
  content: [
    "./src/**/zelda/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/nav.tsx",
    "./src/components/icon-list.tsx",
    "./src/components/icon.tsx",
    "./src/components/slideshow/*.{js,ts,jsx,tsx,mdx}*",
  ],
  theme: {
    extend: {
      backgroundImage: ({ theme }) => ({
        zelda: "url('/images/zelda/pad-background.jpg')",
      }),
      colors: {
        "light-blue": "#76b6ff",
        zelda: {
          textShadow: "rgba(0, 0, 0, 0.75)",
        },
      },
      hueRotate: {},
      invert: {
        // zelda white to blue
        19: "19%",
      },
      keyframes: {
        "wiggle-box": {
          "0%, 66%": { opacity: "0" },
          "67%, 100%": { opacity: "1" },
        },
      },
      padding: {
        input: "1rem",
      },
      saturate: {
        // zelda white to blue
        1368: "1368%",
      },
      sepia: {
        // zelda white to blue
        88: "88%",
      },
    },
  },
  plugins: [defaultPlugin],
} satisfies Config;
