import { css } from "@panda/css";

export const fillParent = css.raw({
  height: "100%",
  width: "100%",
});

export const fullScreen = css({
  display: "flex",
  minHeight: "100vh",
  "& > *": {
    width: "100%",
  },
});
