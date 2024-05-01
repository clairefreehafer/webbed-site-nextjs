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

const PAPER_RED_LINE = "rgba(255, 0, 0, 0.8)";
const PAPER_BLUE_LINE = "rgba(0, 255, 255, 0.8)";
export const PAPER_LINE_HEIGHT = "1.5rem";
const RED_LINE_PADDING = "2rem";
const PAPER_TOP_PADDING = `calc(2 * ${PAPER_LINE_HEIGHT} + 1px)`;

export function paperBackground() {
  return css`
    background:
      linear-gradient(
        to right,
        transparent ${RED_LINE_PADDING},
        ${PAPER_RED_LINE} ${RED_LINE_PADDING} calc(${RED_LINE_PADDING} + 1px),
        transparent ${RED_LINE_PADDING}
      ),
      linear-gradient(
        to bottom,
        white 0 2rem,
        transparent 2rem
      ),
      repeating-linear-gradient(
        to bottom,
        white 0 ${PAPER_LINE_HEIGHT},
        ${PAPER_BLUE_LINE} ${PAPER_LINE_HEIGHT} calc(${PAPER_LINE_HEIGHT} + 1px),
        white calc(${PAPER_LINE_HEIGHT} + 1px)
      );
    padding: 
      ${PAPER_TOP_PADDING}
      1rem
      ${PAPER_LINE_HEIGHT}
      calc(${RED_LINE_PADDING} + 0.5rem);
    /* box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3); */
    color: black;
    line-height: calc(${PAPER_LINE_HEIGHT} + 1px);
    box-shadow: inset 0 0 0.25rem 0.1rem rgba(0, 0, 0, 0.3),
              0 0 1.5rem 0.1rem rgba(0, 0, 0, 0.3);
  `;
}