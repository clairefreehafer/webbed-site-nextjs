import PolaroidGrid from "@components/photography/PolaroidGrid";
import { getSmugMugGalleriesFromNode } from "@utils/smugmug";

export default async function Technical() {
  const albums = await getSmugMugGalleriesFromNode("Ss3x4J");

  return <PolaroidGrid albums={albums} />;
}
