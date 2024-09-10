import { css } from "@panda/css";

// https://css-tricks.com/old-timey-terminal-styling/
export const scanLines = css.raw({
  _after: {
    bg: "{gradients.scanLines}",
    content: '""',
    height: "100vh",
    left: 0,
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    width: "100vw",
  },
});
