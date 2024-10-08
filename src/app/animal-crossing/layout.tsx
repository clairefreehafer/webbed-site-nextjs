import Header from "@components/Header";
import Nav from "@components/Nav";
import AnimalCrossingLogo from "@components/animal-crossing/Logo";
import { css, cx } from "@panda/css";
import ThemeRoot from "@components/animal-crossing/ThemeRoot";
import { getGrassDateRange } from "@utils/animalCrossing";
import { sand } from "@styles/animalCrossing";
import { GrassDateRange, GrassShape } from "types/animalCrossing";
import { SiteContainer } from "@panda/jsx";

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
    })
  );

export default function AnimalCrossingLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const grassDateRange = getGrassDateRange();

  return (
    <ThemeRoot shape="square">
      <SiteContainer>
        <Header>
          <AnimalCrossingLogo text="claire freehafer" />
          <Nav theme="animalCrossing" />
        </Header>
        <main className={main("square", grassDateRange)}>{children}</main>
      </SiteContainer>
    </ThemeRoot>
  );
}
