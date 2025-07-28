import Logo from "@/components/animal-crossing/logo";
import Nav from "@/components/animal-crossing/nav";
import "@/sass/animal-crossing/style.scss";
import {
  GRASS_BACKGROUND_COLORS,
  getGrassDateRange,
} from "@/utils/animal-crossing";
import localFont from "next/font/local";

const finkHeavy = localFont({
  variable: "--font-fink-heavy",
  src: [
    {
      path: "../../../public/fonts/animal-crossing/fink-heavy.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  fallback: ["Georgia", "serif"],
});

const seurat = localFont({
  variable: "--font-seurat",
  src: [
    {
      path: "../../../public/fonts/animal-crossing/seurat.woff2",
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
  const sandStyles = {
    backgroundImage: `url("/images/animal-crossing/sand/square_${grassDateRange}.png")`,
  };
  return (
    <html>
      <body style={bodyStyles}>
        <div className={`container ${finkHeavy.variable} ${seurat.variable}`}>
          <Logo />
          <div className="sand" style={sandStyles}>
            <nav>
              <details>
                <summary>navigation</summary>
                <Nav />
              </details>

              <div className="desktop-menu">
                <Nav />
              </div>
            </nav>

            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
