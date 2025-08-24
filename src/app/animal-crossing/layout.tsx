import "@/sass/global.scss";
import "@/sass/animal-crossing/style.scss";

import { digitalDisplay, seurat } from "@/fonts/animal-crossing";
import {
  getGrassDateRange,
  GRASS_BACKGROUND_COLORS,
} from "@/utils/animal-crossing";
import { GrassContextProvider } from "@/utils/animal-crossing/grass";

export default function Layout({ children }: React.PropsWithChildren) {
  const grassDateRange = getGrassDateRange();
  const bodyStyles = {
    backgroundColor: GRASS_BACKGROUND_COLORS[grassDateRange],
    backgroundImage: `url("/images/animal-crossing/grass/square_${grassDateRange}.png")`,
  };
  return (
    <html>
      <body
        className={`${seurat.variable} ${digitalDisplay.variable}`}
        style={bodyStyles}
        data-theme="animal-crossing"
      >
        <GrassContextProvider>{children}</GrassContextProvider>
      </body>
    </html>
  );
}
