import AlbumGrid from "@components/photography/polaroid-grid";
import { getAlbumGridData } from "@utils/prisma";

export default async function Collections() {
  const albums = await getAlbumGridData("collections");

  return (
    <AlbumGrid albums={albums} />
  )
}