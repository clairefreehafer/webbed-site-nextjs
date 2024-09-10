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
      }),
      borderStyle: {
        outset: "outset",
      },
      borderWidth: {
        1: "1px",
      },
      boxShadow: {
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
