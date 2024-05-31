/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: {
        "wiggle-box-1": "250ms infinite wiggle-box",
        "wiggle-box-2": "250ms calc(250ms / 3) infinite wiggle-box",
        "wiggle-box-3": "250ms calc(2 * (250ms / 3)) infinite wiggle-box",
      },
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
      borderRadius: {
        animalCrossing: {
          ui: "3rem",
        },
        wiggle1: "95px 14px 92px 15px / 14px 95px 16px 95px",
        wiggle2: "14px 92px 15px 95px / 95px 16px 95px 14px",
        wiggle3: "255px 15px 225px 15px/15px 225px 15px 255px",
      },
      borderWidth: {
        1: "1px",
      },
      boxShadow: {
        animalCrossing: {
          ui: "0 0.75rem 0.5rem -0.5rem rgba(0, 0, 0, 0.5)",
        },
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

        animalCrossing: {
          uiBackground: "rgb(248, 245, 223, 0.8)",
        },

        zelda: {
          textShadow: "rgba(0, 0, 0, 0.75)",
        },
      },
      gridTemplateColumns: {
        "admin-form": "25% 1fr",
      },
      keyframes: {
        "wiggle-box": {
          "0%, 66%": { opacity: 0 },
          "67%, 100%": { opacity: 1 },
        },
      },
      padding: {
        input: "1rem",
      },
    },
  },
  plugins: [],
};
