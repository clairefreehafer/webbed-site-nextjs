import { fullScreen } from "@styles/layout";
import styled, { css } from "styled-components";

export const ZELDA_LIGHT_BLUE = "#76b6ff";

export const zeldaTheme = {
  name: "zelda",
  iconHeight: 1.5,
};

export const ZeldaThemeRoot = styled.div`
  ${fullScreen};
  background-image: url("/images/zelda/pad-background.jpg");

  & h3 {
    color: ${ZELDA_LIGHT_BLUE};
    font-family: var(--font-hylia-serif), serif;
    font-size: 2rem;
    font-weight: normal;
    margin-bottom: 1rem;
    text-transform: capitalize;
  }

  & a:hover {
    color: ${ZELDA_LIGHT_BLUE};
  }

  li {
    display: flex;
    justify-content: center;
  }
`;

// https://codepen.io/sosuke/pen/Pjoqqp
// for #00d7ff
export const whiteToBlue = css`
  filter: invert(100%) invert(19%) sepia(88%) saturate(1368%) hue-rotate(179deg)
    brightness(95%) contrast(101%);
`;

export const sheikahUnderline = css`
  background-image: url("/images/zelda/pad-text.png");
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: auto 25%;
  padding-bottom: 0.5rem;
  text-decoration: none;
`;

const TEXT_SHADOW_OFFSET = "1px";
const TEXT_SHADOW_BLUR_RADIUS = "2px";
const TEXT_SHADOW_COLOR = "rgba(0, 0, 0, 0.75)";

export const zeldaTextBackground = css`
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(5px);
  border-radius: 0.5rem;
  border: 1px solid #141e5495;
  text-shadow:
    calc(-1 * ${TEXT_SHADOW_OFFSET}) calc(-1 * ${TEXT_SHADOW_OFFSET})
      ${TEXT_SHADOW_BLUR_RADIUS} ${TEXT_SHADOW_COLOR},
    ${TEXT_SHADOW_OFFSET} calc(-1 * ${TEXT_SHADOW_OFFSET})
      ${TEXT_SHADOW_BLUR_RADIUS} ${TEXT_SHADOW_COLOR},
    calc(-1 * ${TEXT_SHADOW_OFFSET}) ${TEXT_SHADOW_OFFSET}
      ${TEXT_SHADOW_BLUR_RADIUS} ${TEXT_SHADOW_COLOR},
    ${TEXT_SHADOW_OFFSET} ${TEXT_SHADOW_OFFSET} ${TEXT_SHADOW_BLUR_RADIUS}
      ${TEXT_SHADOW_COLOR};
`;

export const pageBorder = css`
  position: absolute;
  left: 0;
  width: 100%;
`;
