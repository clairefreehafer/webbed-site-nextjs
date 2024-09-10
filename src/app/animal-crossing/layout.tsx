import Header from "@components/Header";
import Nav from "@components/Nav";
import AnimalCrossingLogo from "@components/animal-crossing/Logo";
import SiteContainer from "@components/layout/SiteContainer";
import { css, cx } from "@panda/css";
import AnimalCrossingThemeRoot from "@styles/animal-crossing/theme";
import { getGrassDateRange } from "@utils/animal-crossing";
import { sand } from "@utils/animal-crossing/recipes";
import { GrassDateRange, GrassShape } from "@utils/animal-crossing/types";

const main = (grassShape: GrassShape, grassDateRange: GrassDateRange) =>
  cx(
    sand({ grassShape, grassDateRange }),
    css({
      bgPosition: "top",
      bgRepeat: "repeat-x",
      borderRadius: "1.5rem",
      boxShadow: "0 1rem 0.5rem -0.5rem rgba(0, 0, 0, 0.5)",
      p: "9rem 1rem 1rem",
      width: "100%",
    }),
  );

export default function AnimalCrossingLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const grassDateRange = getGrassDateRange();

  return (
    <AnimalCrossingThemeRoot shape="square">
      <SiteContainer>
        <Header>
          <AnimalCrossingLogo text="claire freehafer" />
          <Nav theme="animalCrossing" />
        </Header>
        <main className={main("square", grassDateRange)}>{children}</main>
      </SiteContainer>
    </AnimalCrossingThemeRoot>
  );
}
