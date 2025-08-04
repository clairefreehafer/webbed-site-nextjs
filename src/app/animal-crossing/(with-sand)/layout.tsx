import Logo from "@/components/animal-crossing/logo";
import Nav from "@/components/animal-crossing/nav";
import { getGrassDateRange } from "@/utils/animal-crossing";
import { Grass } from "@/utils/animal-crossing/grass";
import localFont from "next/font/local";

const finkHeavy = localFont({
  variable: "--font-fink-heavy",
  src: [
    {
      path: "../../../fonts/animal-crossing/fink-heavy.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  fallback: ["Georgia", "serif"],
});

export default function Layout({ children }: React.PropsWithChildren) {
  const grassDateRange = getGrassDateRange();
  const sandStyles = {
    backgroundImage: `url("/images/animal-crossing/sand/square_${grassDateRange}.png")`,
  };
  return (
    <div className={`container ${finkHeavy.variable}`}>
      <Grass />
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
  );
}
