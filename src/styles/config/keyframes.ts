import { defineKeyframes } from "@pandacss/dev";

export const keyframes = defineKeyframes({
  // https://css-tricks.com/snippets/css/typewriter-effect/
  writeIn: {
    from: { width: 0 },
    to: { width: "100%" },
  },
  wiggleBox: {
    "0%, 66%": { opacity: 0 },
    "67%, 100%": { opacity: 1 },
  },
});
