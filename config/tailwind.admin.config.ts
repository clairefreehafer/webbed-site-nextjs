import type { Config } from "tailwindcss";
import defaultPlugin from "../plugins/default";

export default {
  content: [
    "./**/admin/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/nav.tsx",
    "./src/components/title.tsx",
  ],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      boxShadow: {
        "8-bit-white": "6px 0 white, -6px 0 white, 0 -6px white, 0 6px white",
      },
      colors: {
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
