import PolaroidGrid from "@components/photography/PolaroidGrid";
import { getSmugMugGalleriesFromNode } from "@utils/smugmug";

export default async function Explore() {
  const polaroidAlbums = await getSmugMugGalleriesFromNode("p2XgBc");

  return <PolaroidGrid albums={polaroidAlbums} />;
}
