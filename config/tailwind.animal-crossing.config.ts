import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/**/animal-crossing/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "grass-1210-0224": "url()",
        "grass-0225-0331": "rgb(31, 140, 57)",
        "grass-0401-0722": "rgb(0, 131, 90)",
        "grass-0723-0915": "rgb(19, 115, 82)",
        "grass-0916-0930": "rgb(73, 123, 49)",
        "grass-1001-1015": "rgb(132, 123, 58)",
        "grass-1016-1029": "rgb(148, 99, 99)",
        "grass-1030-1112": "rgb(148, 90, 98)",
        "grass-1113-1128": "rgb(132, 90, 82)",
        "grass-1129-1209": "rgb(99, 81, 82)",
      },
      borderRadius: {
        ui: "3rem",
      },
      boxShadow: {
        ui: "0 0.75rem 0.5rem -0.5rem rgba(0, 0, 0, 0.5)",
      },
      colors: {
        animalCrossing: {
          uiBackground: "rgb(248, 245, 223, 0.8)",
        },
        "grass-color": {
          "1210-0224": "rgb(189, 215, 238)",
          "0225-0331": "rgb(31, 140, 57)",
          "0401-0722": "rgb(0, 131, 90)",
          "0723-0915": "rgb(19, 115, 82)",
          "0916-0930": "rgb(73, 123, 49)",
          "1001-1015": "rgb(132, 123, 58)",
          "1016-1029": "rgb(148, 99, 99)",
          "1030-1112": "rgb(148, 90, 98)",
          "1113-1128": "rgb(132, 90, 82)",
          "1129-1209": "rgb(99, 81, 82)",
        },
        sand: "#cfbe95",
      },
    },
  },
  plugins: [plugin(function ({ addUtilities }) {})],
} satisfies Config;
