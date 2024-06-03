import type { Config } from "tailwindcss";
import defaultPlugin from "../plugins/default";

export default {
  content: [
    "./src/**/photography/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "wiggle-box-1": "250ms infinite wiggle-box",
        "wiggle-box-2": "250ms calc(250ms / 3) infinite wiggle-box",
        "wiggle-box-3": "250ms calc(2 * (250ms / 3)) infinite wiggle-box",
      },
      borderRadius: {
        wiggle1: "95px 14px 92px 15px / 14px 95px 16px 95px",
        wiggle2: "14px 92px 15px 95px / 95px 16px 95px 14px",
        wiggle3: "255px 15px 225px 15px/15px 225px 15px 255px",
      },
      colors: {
        "blue-line": "rgba(0, 255, 255, 0.8)",
        "red-line": "rgba(255, 0, 0, 0.8)",
      },
      keyframes: {
        "wiggle-box": {
          "0%, 66%": { opacity: "0" },
          "67%, 100%": { opacity: "1" },
        },
      },
      lineHeight: ({ theme }) => ({
        paper: `calc(${theme("spacing.line-height")} + 1px)`,
      }),
      spacing: ({ theme }) => ({
        "line-height": "1.5rem",
        "line-spacing": "calc(1.5rem + 1px)",
        "paper-top-padding": `calc(2 * (1px + var(${theme("colors.line-height")})))`,
        "red-line-padding": "3rem",
      }),
    },
  },
  plugins: [defaultPlugin],
} satisfies Config;
