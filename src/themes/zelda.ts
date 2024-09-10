import { css } from "@panda/css";

const TEXT_SHADOW_OFFSET = "1px";
const TEXT_SHADOW_BLUR_RADIUS = "2px";
const TEXT_SHADOW_COLOR = "rgba(0, 0, 0, 0.75)";

export const zeldaTextBackground = css.raw({
  bg: "rgba(0, 0, 0, 0.25)",
  backdropFilter: "blur(5px)",
  borderRadius: "0.5rem",
  border: "1px solid #141e5495",
  textShadow: `calc(-1 * ${TEXT_SHADOW_OFFSET}) calc(-1 * ${TEXT_SHADOW_OFFSET}) ${TEXT_SHADOW_BLUR_RADIUS} ${TEXT_SHADOW_COLOR},
  ${TEXT_SHADOW_OFFSET} calc(-1 * ${TEXT_SHADOW_OFFSET}) ${TEXT_SHADOW_BLUR_RADIUS} ${TEXT_SHADOW_COLOR},
  calc(-1 *${TEXT_SHADOW_OFFSET}) ${TEXT_SHADOW_OFFSET} ${TEXT_SHADOW_BLUR_RADIUS} ${TEXT_SHADOW_COLOR},
   ${TEXT_SHADOW_OFFSET} ${TEXT_SHADOW_OFFSET} ${TEXT_SHADOW_BLUR_RADIUS} ${TEXT_SHADOW_COLOR}`,
});

export const sheikahUnderline = css.raw({
  backgroundImage: "url('/images/zelda/pad-text.png')",
  backgroundPosition: "bottom center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "auto 25%",
  paddingBottom: "0.5rem",
  textDecoration: "none",
});

// https://codepen.io/sosuke/pen/Pjoqqp for #00d7ff
export const whiteToBlue = css.raw({
  filter:
    "invert(100%) invert(19%) sepia(88%) saturate(1368%) hue-rotate(179deg) brightness(95%) contrast(101%);",
});
