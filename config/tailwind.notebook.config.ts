import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/photography/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-line": "rgba(0, 255, 255, 0.8)",
        "red-line": "rgba(255, 0, 0, 0.8)",
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
} satisfies Config;
