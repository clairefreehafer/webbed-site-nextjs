import localFont from "next/font/local";

export const finkHeavy = localFont({
  variable: "--font-fink-heavy",
  src: [
    {
      path: "./fink-heavy.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  fallback: ["Georgia", "serif"],
});

// https://www.dafont.com/ds-digital.font
export const digitalDisplay = localFont({
  variable: "--font-digial-display",
  src: [
    {
      path: "../../fonts/animal-crossing/digital-display.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  fallback: ["monospace"],
});

export const seurat = localFont({
  variable: "--font-seurat",
  src: [
    {
      path: "../../fonts/animal-crossing/seurat.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  fallback: ["system-ui", "sans-serif"],
});
