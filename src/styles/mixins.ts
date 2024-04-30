import { css } from "styled-components";
import { fullScreen } from "./layout";

export function rainbowBorder(borderWidth = "2px") {
  return css`
    ${fullScreen};
    background: linear-gradient(
      135deg,
      red,
      orange,
      yellow,
      green,
      blue,
      indigo,
      violet
    );
    padding: ${borderWidth};

    & > * {
      background-color: black;
      min-height: calc(100vh - 2 * ${borderWidth});
      max-width: calc(100vw - 2 * ${borderWidth})
    }
  `
}