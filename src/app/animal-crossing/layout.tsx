import "@/sass/global.scss";
import "@/sass/animal-crossing/style.scss";

import localFont from "next/font/local";

import {
  getGrassDateRange,
  GRASS_BACKGROUND_COLORS,
} from "@/utils/animal-crossing";
import { GrassContextProvider } from "@/utils/animal-crossing/grass";

const seurat = localFont({
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

export default function Layout({ children }: React.PropsWithChildren) {
  const grassDateRange = getGrassDateRange();
  const bodyStyles = {
    backgroundColor: GRASS_BACKGROUND_COLORS[grassDateRange],
    backgroundImage: `url("/images/animal-crossing/grass/square_${grassDateRange}.png")`,
  };
  return (
    <html>
      <body
        className={seurat.variable}
        style={bodyStyles}
        data-theme="animal-crossing"
      >
        <GrassContextProvider>{children}</GrassContextProvider>
      </body>
    </html>
  );
}
