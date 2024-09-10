import type { Config } from "tailwindcss";

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
      hueRotate: {},
      invert: {
        // zelda white to blue
        19: "19%",
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
} satisfies Config;
