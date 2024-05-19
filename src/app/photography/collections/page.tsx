import AlbumGrid from "@components/photography/polaroid-grid";
import { getAlbumGridData } from "@utils/prisma";

export default async function Collections() {
  const albums = await getAlbumGridData(["photography", "collections"]);

  if (typeof albums === "string") {
    return <>❌ there was a problem getting the list of collections. {albums}</>
  }

  return (
    <AlbumGrid albums={albums} />
  )
}