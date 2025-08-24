import localFont from "next/font/local";

export const loveYaLikeASister = localFont({
  variable: "--font-love-ya-like-a-sister",
  src: [
    {
      path: "./love-ya-like-a-sister.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  fallback: ["serif"],
});

export const cutiveMono = localFont({
  variable: "--font-cutive-mono",
  src: [
    {
      path: "./cutive-mono.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  fallback: ["monospace"],
});

// https://nationalparktypeface.com/
export const nationalPark = localFont({
  variable: "--font-national-park",
  src: [
    {
      path: "./national-park.woff2",
      style: "normal",
    },
  ],
  fallback: ["monospace"],
});

export const pangolin = localFont({
  variable: "--font-pangolin",
  src: [
    {
      path: "./pangolin.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  fallback: ["system-ui", "sans-serif"],
});
