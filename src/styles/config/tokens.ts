import { defineTokens } from "@pandacss/dev";

export const baseTokens = defineTokens({
  colors: {
    analglyph: {
      black: { value: "#22313F" },
      blue: { value: "#00FFFF" },
      red: { value: "#F22613" },
    },
  },
  gradients: {
    jaggedBorder: {
      whiteBottom: {
        value: `
        linear-gradient(
          45deg,
          #FFFFFF 33.333%,
          transparent 33.333%,
          transparent 66.667%,
          #FFFFFF 66.667%
        ),
          linear-gradient(
            -45deg,
            #FFFFFF 33.333%,
            transparent 33.333%,
            transparent 66.667%,
            #FFFFFF 66.667%
          )
        `,
      },
      whiteTop: {
        value: `
          linear-gradient(
            45deg,
            transparent 33.333%,
            #FFFFFF 33.333%,
            #FFFFFF 66.667%,
            transparent 66.667%
          ),
          linear-gradient(
            -45deg,
            transparent 33.333%,
            #FFFFFF 33.333%,
            #FFFFFF 66.667%,
            transparent 66.667%
          )
        `,
      },
    },
    rainbow: {
      value:
        "linear-gradient(135deg, red, orange, yellow, green, blue, indigo, violet)",
    },
  },
  zIndex: {
    slideshow: {
      ui: { value: 2 },
      insetShadow: { value: 1 },
      photo: { value: 0 },
      borderTexture: { value: -1 },
      border: { value: -2 },
    },
  },
});

export const adminTokens = defineTokens({
  colors: {
    terminalGreen: { value: "rgba(0, 150, 0, 0.5)" },
  },
  fonts: {
    pressStart2P: {
      value: "var(--font-press-start-2p), serif",
      description: "8-bit",
    },
    ptMono: {
      value: "var(--font-pt-mono), courier new, monospace",
      description: "terminal",
    },
  },
  gradients: {
    scanLines: {
      value:
        "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)",
    },
    radial: {
      value: "radial-gradient(rgba(255, 255, 255, 0.2), black 120%)",
    },
  },
  shadows: {
    "8BitWhite": {
      value: "6px 0 white, -6px 0 white, 0 -6px white, 0 6px white",
    },
  },
});

export const animalCrossingTokens = defineTokens({
  colors: {
    uiBackground: { value: "rgba(248, 245, 223, 0.8)" },
    brown: { value: "rgb(85, 69, 64)" },
    grass: {
      "1210-0224": { value: "rgb(189, 215, 238)" },
      "0225-0331": { value: "rgb(31, 140, 57)" },
      "0401-0722": { value: "rgb(0, 131, 90)" },
      "0723-0915": { value: "rgb(19, 115, 82)" },
      "0916-0930": { value: "rgb(73, 123, 49)" },
      "1001-1015": { value: "rgb(132, 123, 58)" },
      "1016-1029": { value: "rgb(148, 99, 99)" },
      "1030-1112": { value: "rgb(148, 90, 98)" },
      "1113-1128": { value: "rgb(132, 90, 82)" },
      "1129-1209": { value: "rgb(99, 81, 82)" },
    },
    sand: { value: "#cfbe95" },
  },
  fonts: {
    fotSeuratProB: { value: "var(--font-fot-seurat-pro-b), sans-serif" },
  },
  shadows: {
    text: { value: "0 1px 5px {colors.brown}" },
  },
});

export const homeTokens = defineTokens({
  fonts: {
    caveat: {
      value: "var(--font-caveat)",
    },
    redactedScript: {
      value: "var(--font-redacted-script)",
    },
  },
});

export const notebookTokens = defineTokens({
  animations: {
    wiggleBox: { value: "250ms wiggleBox infinite" },
  },
  colors: {
    blueLine: { value: "rgba(0, 255, 255, 0.8)" },
    redLine: { value: "rgba(255, 0, 0, 0.8)" },
  },
  fonts: {
    cutiveMono: {
      value: "var(--font-cutive-mono), courier new, monospase",
      description: "typewriter",
    },
    loveYaLikeASister: {
      value: "var(--font-love-ya-like-a-sister), times new roman, serif",
      description: "serif handwriting",
    },
    pangolin: {
      value: "var(--font-pangolin), helvetica, sans-serif",
      description: "sans-serif handwriting",
    },
  },
  durations: {
    wiggleBox: { value: "250ms" },
  },
  lineHeights: {
    paper: { value: "1.5rem" },
  },
  spacing: {
    paperLineSpacing: { value: "calc({lineHeights.paper} + 1px)" },
    paperTopPadding: { value: "calc(2 * {lineHeights.paper})" },
    redLinePadding: { value: "3rem" },
  },
});

export const zeldaTokens = defineTokens({
  colors: {
    lightBlue: { value: "#76b6ff" },
    textShadow: { value: "rgba(0, 0, 0, 0.75)" },
  },
});
