import PolaroidGrid from "@components/photography/polaroid-grid";
import { getAlbumGridData } from "@utils/prisma";

export default async function Explore() {
  // TODO: sort by date
  const albums = await getAlbumGridData(["photography", "albums"]);

  if (typeof albums === "string") {
    return <p>👎 {albums}</p>
  }

  return (
    <PolaroidGrid albums={albums} />
  )
}
