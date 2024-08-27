import IconList from "@components/IconList";
import Separator from "@components/zelda/Separator";
import { hyliaSerif } from "@fonts/zelda";
import { getIconListAlbums } from "@utils/prisma/album";
import { ReactNode } from "react";

const Game = ({ children }: { children: ReactNode }) => (
  <h3 className={`${hyliaSerif.className} mb-4 mt-8 text-3xl capitalize`}>
    {children}
  </h3>
);

export default async function ZeldaPage() {
  const albums = await getIconListAlbums("tears of the kingdom");

  return (
    <div className="flex flex-col items-center">
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
