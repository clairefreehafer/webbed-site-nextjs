import IconList from "@components/icon-list";
import Separator from "@components/zelda/separator";
import { hyliaSerif } from "@fonts/zelda";
import { getPolaroidGridData } from "@utils/prisma/photo";
import { ReactNode } from "react";

const Game = ({ children }: { children: ReactNode }) => (
  <h3 className={`${hyliaSerif.className} mb-4 mt-8 text-3xl capitalize`}>
    {children}
  </h3>
);

export default async function ZeldaPage() {
  const totkAlbums = await getPolaroidGridData("tears of the kingdom");

  return (
    <div className="flex flex-col items-center">
      <Separator number={1} />

      <Game>tears of the kingdom</Game>
      <IconList albums={totkAlbums} theme="zelda" />

      <Separator number={2} />

      <Game>breath of the wild</Game>
      <p className="mb-8">coming eventually</p>

      <Separator number={3} />
    </div>
  );
}
