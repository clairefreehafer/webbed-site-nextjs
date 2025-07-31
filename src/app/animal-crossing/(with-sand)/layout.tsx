import Logo from "@/components/animal-crossing/logo";
import Nav from "@/components/animal-crossing/nav";
import { getGrassDateRange } from "@/utils/animal-crossing";

export default function Layout({ children }: React.PropsWithChildren) {
  const grassDateRange = getGrassDateRange();
  const sandStyles = {
    backgroundImage: `url("/images/animal-crossing/sand/square_${grassDateRange}.png")`,
  };
  return (
    <div className="container">
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
