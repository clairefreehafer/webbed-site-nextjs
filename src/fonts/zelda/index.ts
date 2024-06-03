import localFont from "next/font/local";

export const hyliaSerif = localFont({
  src: [
    { path: "../../fonts/zelda/hylia-serif_regular.woff2" },
    { path: "../../fonts/zelda/hylia-serif_regular.woff" },
  ],
  preload: true,
  variable: "--font-hylia-serif",
});
