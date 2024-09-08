import { css } from "@panda/css";

export const paperBackground = css.raw({
  bg: `
    linear-gradient(
      to right,
      transparent {spacing.redLinePadding},
      {colors.redLine} {spacing.redLinePadding} calc({spacing.redLinePadding} + 1px),
      transparent {spacing.redLinePadding}
    ),
    linear-gradient(to bottom, white 0 4rem, transparent 4rem),
    repeating-linear-gradient(
      to bottom,
      white 0 {lineHeights.paper},
      {colors.blueLine} {lineHeights.paper} calc({lineHeights.paper} + 1px),
      white calc({lineHeights.paper} + 1px)
    )`,
  padding: `
    calc(2 * (1px + {lineHeights.paper}))
    1rem
    {lineHeights.paper}
    calc({spacing.redLinePadding} + 0.5rem)
  `,
  /* box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3); */
  color: "black",
  lineHeight: "calc({lineHeights.paper} + 1px)",
  boxShadow:
    "inset 0 0 0.25rem 0.1rem rgba(0, 0, 0, 0.3), 0 0 1.5rem 0.1rem rgba(0, 0, 0, 0.3)",
});
