import localFont from "next/font/local";

// https://www.brailleinstitute.org/freefont/
export const atkinsonHyperlegibleNext = localFont({
  variable: "--font-atkinson-hyperlegible-next",
  src: [
    {
      path: "./atkinson-hyperlegible-next.woff2",
    },
  ],
  fallback: ["system-ui", "sans-serif"],
});

export const atkinsonHyperlegibleMono = localFont({
  variable: "--font-atkinson-hyperlegible-mono",
  src: [
    {
      path: "../atkinson-hyperlegible-mono.woff2",
    },
  ],
  fallback: ["system-ui", "sans-serif"],
});

// https://gwfh.mranftl.com/fonts/caveat
export const caveat = localFont({
  variable: "--font-caveat",
  src: [
    {
      path: "./caveat-regular.woff2",
      style: "normal",
    },
  ],
});

// https://fonts.google.com/specimen/EB+Garamond
export const garamond = localFont({
  variable: "--font-garamond",
  src: [
    {
      path: "./garamond.woff2",
      style: "normal",
    },
    {
      path: "./garamond-italic.woff2",
      style: "italic",
    },
  ],
  fallback: ["Georgia", "serif"],
});

// https://gwfh.mranftl.com/fonts/redacted-script
export const redactedScript = localFont({
  variable: "--font-redacted-script",
  src: [
    {
      path: "./redacted-script-700.woff2",
      style: "normal",
    },
  ],
});
