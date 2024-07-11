import type { Config } from "tailwindcss";
import defaultPlugin from "../plugins/default";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./**/admin/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/nav.tsx",
    "./src/components/title.tsx",
    "./src/components/icon.tsx",
  ],
  theme: {
    extend: {
      backgroundImage: ({ theme }) => ({
        "radial-gradient": `radial-gradient(rgba(255, 255, 255, 0.2), black 120%)`,
        // https://css-tricks.com/old-timey-terminal-styling/
        "scan-lines":
          "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)",
      }),
      borderStyle: {
        outset: "outset",
      },
      borderWidth: {
        1: "1px",
      },
      boxShadow: {
        "8-bit-white": "6px 0 white, -6px 0 white, 0 -6px white, 0 6px white",
        input: "0 0 10px #c8c8c8",
      },
      colors: {
        limegreen: "limegreen",
        terminalGreen: "rgba(0, 150, 0, 0.5)",
        "input-bg": "black",
      },
      gridTemplateColumns: {
        "admin-form": "25% 1fr",
      },
      padding: {
        input: "1rem",
      },
    },
  },
  plugins: [
    defaultPlugin,
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".border-outset": {
          borderStyle: "outset",
        },
      });
    }),
  ],
} satisfies Config;
