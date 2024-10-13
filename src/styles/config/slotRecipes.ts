import { defineSlotRecipe } from "@pandacss/dev";

export const adminTableSlotRecipe = defineSlotRecipe({
  className: "admin-table",
  slots: ["table", "thead", "th", "tr", "td"],
});

export const linkSlotRecipe = defineSlotRecipe({
  className: "link",
  slots: ["link", "prefix"],
  jsx: ["StyledLink", "LinkPrefix"],
  base: {
    link: {
      textDecoration: "underline",
      _hover: { textDecoration: "none" },
    },
    prefix: {
      display: "none",
    },
  },
  variants: {
    theme: {
      admin: {
        link: {
          color: "white",
          fontFamily: "pressStart2P",
          textDecorationStyle: "dashed",
          textDecorationThickness: "2px",
        },
        prefix: {
          color: "white",
          display: "inline",
          fontFamily: "pressStart2P",
          opacity: 0,
          _groupHover: {
            opacity: 1,
          },
        },
      },
      animalCrossing: {
        link: {
          // TODO: pick better colors, maybe grass colors?
          color: "black",
          textDecorationStyle: "solid",
          textDecorationThickness: "2px",
          _hover: {
            color: "black",
            textShadow: "text",
          },
        },
      },
      book: {
        link: {
          textDecorationColor: "blue",
          _visited: {
            textDecorationColor: "purple",
          },
        },
      },
      home: {
        link: {
          _hover: {
            backgroundColor: "yellow",
            color: "black",
          },
        },
      },
      notebook: {
        link: {
          textDecorationStyle: "wavy",
          textDecorationThickness: "1.25px",
        },
      },
      zelda: {},
    },
  },
});

const slotRecipes = {
  linkSlotRecipe,
};

export default slotRecipes;
