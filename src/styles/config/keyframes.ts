import { defineKeyframes } from "@pandacss/dev";

export const keyframes = defineKeyframes({
  wiggleBox: {
    "0%, 66%": { opacity: 0 },
    "67%, 100%": { opacity: 1 },
  },
});
