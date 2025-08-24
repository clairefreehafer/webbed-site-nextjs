import localFont from "next/font/local";

export const hyliaSerif = localFont({
  variable: "--hylia-serif",
  src: [
    {
      path: "./hylia-serif-regular.woff2",
    },
  ],
  fallback: ["Georgia", "serif"],
});

export const hylian = localFont({
  variable: "--hylian-regular",
  src: [
    {
      path: "./hylian-regular.woff2",
    },
  ],
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const sheikah = localFont({
  variable: "--sheikah",
  src: [
    {
      path: "./sheikah.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./sheikah-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const fotRodin = localFont({
  variable: "--fot-rodin-pro-db",
  src: [
    {
      path: "./fot-rodin-pro-db.woff2",
    },
  ],
  fallback: ["Helvetica", "Arial", "sans-serif"],
});
