import IconList from "@components/animal-crossing/icon-list";
import Separator from "@components/zelda/separator";
import { getPolaroidGridData } from "@utils/prisma/photo";

export default async function ZeldaPage() {
  const totkAlbums = await getPolaroidGridData("tears of the kingdom");
  
  return (
    <>
      <Separator number={1} />

      <h3>tears of the kingdom</h3>
      <IconList albums={totkAlbums} />

      <Separator number={2} />

      <h3>breath of the wild</h3>
      <ul>
        <li>list...</li>
      </ul>

      <Separator number={3} />
    </>
  );
}