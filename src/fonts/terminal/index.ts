import localFont from "next/font/local";

export const atkinsonHyperlegibleMono = localFont({
  variable: "--font-atkinson-hyperlegible-mono",
  src: [
    {
      path: "../atkinson-hyperlegible-mono.woff2",
    },
  ],
  fallback: ["system-ui", "sans-serif"],
});

export const pressStart2p = localFont({
  variable: "--font-press-start-2p",
  src: [
    {
      path: "./press-start-2p-regular.woff2",
    },
  ],
  fallback: ["system-ui", "sans-serif"],
});
