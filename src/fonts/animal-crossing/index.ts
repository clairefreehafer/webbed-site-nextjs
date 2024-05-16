import localFont from "next/font/local";

export const finkHeavy = localFont({
  src: [
    { path: "../../fonts/animal-crossing/fink-heavy.woff2" },
    { path: "../../fonts/animal-crossing/fink-heavy.woff" }
  ],
});

export const fotSeuratProB = localFont({
  src: [
    { path: "../../fonts/animal-crossing/fot-seurat-pro-b.woff2" },
    { path: "../../fonts/animal-crossing/fot-seurat-pro-b.woff" },
    { path: "../../fonts/animal-crossing/fot-seurat-pro-b.otf" }
  ],
  fallback: ["Arial", "sans-serif"]
});