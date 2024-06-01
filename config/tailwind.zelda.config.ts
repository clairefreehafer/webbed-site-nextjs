import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: ({ theme }) => ({
        zelda: "url('/images/zelda/pad-background.jpg')",
      }),
      colors: {
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
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({});
    }),
  ],
} satisfies Config;
