import { definePattern } from "@pandacss/dev";

export const scanLines = definePattern({
  description: "https://css-tricks.com/old-timey-terminal-styling/",
  transform(props) {
    return {
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
      ...props,
    };
  },
});
