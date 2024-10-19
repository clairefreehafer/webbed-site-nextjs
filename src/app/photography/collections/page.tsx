import PolaroidGrid from "@components/photography/PolaroidGrid";
import { getSmugMugGalleriesFromNode } from "@utils/smugmug";

export default async function Collections() {
  const albums = await getSmugMugGalleriesFromNode("hwBrFB");

  return <PolaroidGrid albums={albums} />;
}
