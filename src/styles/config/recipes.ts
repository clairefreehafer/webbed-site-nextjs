import { defineRecipe } from "@pandacss/dev";

export const adminInputRecipe = defineRecipe({
  className: "admin-input",
  base: {
    bg: "black",
    borderRadius: "0.25rem",
    boxShadow: "0 0 10px #c8c8c8",
    color: "white",
    textShadow: "0 0 5px #c8c8c8",
    p: "1rem",
    width: "100%",
  },
  variants: {
    type: {
      date: {
        _readOnly: {
          bg: "white",
          color: "black",
        },
      },
      number: {},
      radioFieldset: {
        gridColumnStart: "span 2",
      },
      select: {},
      text: {},
      textarea: {
        p: "1rem",
        fontSize: "1rem",
      },
    },
  },
});
