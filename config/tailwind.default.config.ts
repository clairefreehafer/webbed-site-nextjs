import type { Config } from "tailwindcss";
import defaultPlugin from "../plugins/default";

export default {
  content: ["./src/app/page.tsx", "./src/components/nav.tsx"],
  theme: {
    extend: {
      backgroundImage: ({ theme }) => ({
        rainbow: `
          linear-gradient(
            135deg,
            ${theme("colors.red")},
            ${theme("colors.orange")},
            ${theme("colors.yellow")},
            ${theme("colors.green")},
            ${theme("colors.blue")},
            ${theme("colors.indigo")},
            ${theme("colors.violet")}
          )`,
      }),
      borderWidth: {
        1: "1px",
      },
      boxShadow: {
        "8-bit-white": "6px 0 white, -6px 0 white, 0 -6px white, 0 6px white",
      },
      colors: {
        red: "red",
        orange: "orange",
        yellow: "yellow",
        green: "green",
        blue: "blue",
        indigo: "indigo",
        violet: "violet",

        limegreen: "limegreen",
      },
      gridTemplateColumns: {
        "admin-form": "25% 1fr",
      },
      padding: {
        input: "1rem",
      },
    },
  },
  plugins: [defaultPlugin],
} satisfies Config;
