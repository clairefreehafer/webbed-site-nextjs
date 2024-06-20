import type { Config } from "tailwindcss";
import defaultPlugin from "../plugins/default";

export default {
  content: ["./src/components/photography/slideshow.tsx"],
  theme: {
    extend: {
      animation: {
        "fade-in-500": "fade-in 500ms linear",
        "fade-out-500": "fade-out 500ms linear",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [defaultPlugin],
} satisfies Config;
