import Logo from "@/components/animal-crossing/logo";
import Nav from "@/components/nav";
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

const NAV_LINKS = [
  {
    title: "home",
    path: "/",
    icon: "animal-crossing/icons/hhn",
  },
  {
    title: "art",
    path: "/art",
    icon: "animal-crossing/icons/camera",
  },
  {
    title: "recipes",
    path: "/recipes",
    icon: "animal-crossing/icons/recipes",
  },
  {
    title: "lists",
    path: "/lists",
    icon: "animal-crossing/icons/lists",
  },
];

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
                <Nav links={NAV_LINKS} />
              </details>

              <div className="desktop-menu">
                <Nav links={NAV_LINKS} />
              </div>
            </nav>

            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
