import AnimalCrossingLogo from "@components/animal-crossing/Logo";
import { css, cx } from "@panda/css";
import ThemeRoot from "@components/animal-crossing/ThemeRoot";
import { getGrassDateRange } from "@utils/animalCrossing";
import { sand } from "@styles/animalCrossing";
import { GrassDateRange, GrassShape } from "types/animalCrossing";
import { SiteContainer } from "@panda/jsx";
import AnimalCrossingNav from "@components/animal-crossing/Nav";
import { findManyIcons } from "@utils/prisma/icon";

const main = (grassShape: GrassShape, grassDateRange: GrassDateRange) =>
  cx(
    sand({ grassShape, grassDateRange }),
    css({
      bgPosition: "top right",
      bgRepeat: "repeat-x",
      borderRadius: "1.5rem",
      boxShadow: "0 1rem 0.5rem -0.5rem rgba(0, 0, 0, 0.5)",
      gridArea: "main",
      p: "9rem 1rem 1rem",
      width: "100%",
    })
  );

export default async function AnimalCrossingLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const grassDateRange = getGrassDateRange();
  const navIcons = await findManyIcons({
    where: {
      // [hhn.png, camera.png, furniture.png, ocarina.png, lists.png, book.png]
      id: { in: [12, 8, 9, 10, 13, 11] },
    },
    select: {
      id: true,
      imagePath: true,
      character: true,
      text: true,
      albums: { select: { name: true } },
    },
  });

  return (
    <ThemeRoot shape="square">
      <SiteContainer maxWidth={1000}>
        <div
          className={css({
            alignItems: "flex-start",
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "1fr 3fr",
            gridTemplateRows: "100px auto",
            gridTemplateAreas: `
              ". logo"
              "nav main"
            `,
            justifyItems: "center",
            p: "1rem",
            width: "100%",
          })}
        >
          <AnimalCrossingNav icons={navIcons} />
          <AnimalCrossingLogo text="claire freehafer" />
          <main className={main("square", grassDateRange)}>{children}</main>
        </div>
      </SiteContainer>
    </ThemeRoot>
  );
}
