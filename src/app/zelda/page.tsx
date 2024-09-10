import IconList from "@components/IconList";
import Separator from "@components/zelda/Separator";
import { hyliaSerif } from "@fonts/zelda";
import { css, cx } from "@panda/css";
import { getIconListAlbums } from "@utils/prisma/album";
import { ReactNode } from "react";

const game = cx(
  hyliaSerif.className,
  css({
    fontSize: "1.75rem",
    textTransform: "capitalize",
  }),
);

// TODO: extract to text component?
const Game = ({ children }: { children: ReactNode }) => (
  <h3 className={game}>{children}</h3>
);

const container = css({
  alignItems: "center",
  display: "flex",
  flexDir: "column",
  gap: "1rem",
});

export default async function ZeldaPage() {
  const albums = await getIconListAlbums("tears of the kingdom");

  return (
    <div className={container}>
      <Separator number={1} />

      <Game>tears of the kingdom</Game>
      <IconList albums={albums} theme="zelda" />

      <Separator number={2} />

      <Game>breath of the wild</Game>
      <p className="mb-8">coming eventually</p>

      <Separator number={3} />
    </div>
  );
}
