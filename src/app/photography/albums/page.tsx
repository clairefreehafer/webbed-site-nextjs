import PolaroidGrid from "@components/photography/polaroid-grid";
import { getAlbumGridData } from "@utils/prisma";

export default async function Explore() {
  // TODO: sort by date
  const albums = await getAlbumGridData("albums");

  return (
    <PolaroidGrid albums={albums} />
  )
}
