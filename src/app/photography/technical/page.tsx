import AlbumGrid from "@components/photography/polaroid-grid";
import { getAlbumGridData } from "@utils/prisma";

export default async function Technical() {
  const albums = await getAlbumGridData("technical");

  return (
    <AlbumGrid albums={albums} />
  );
}
