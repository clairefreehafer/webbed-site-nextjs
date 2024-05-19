import AlbumGrid from "@components/photography/polaroid-grid";
import { getAlbumGridData } from "@utils/prisma";

export default async function Technical() {
  const albums = await getAlbumGridData(["photography", "technical"]);

  if (typeof albums === "string") {
    return <>❌ something went wrong getting album data. {albums}</>
  }

  return (
    <AlbumGrid albums={albums} />
  );
}
