import { getAlbums } from "@utils/albums";
import AlbumGrid from "@components/photography/polaroid-grid";

export default async function Technical() {
  const albums = await getAlbums(["photography", "technical"])

  return (
    <AlbumGrid albums={albums} />
  )
}
