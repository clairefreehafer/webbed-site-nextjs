import PolaroidGrid from "@components/photography/PolaroidGrid";
import { getPolaroidGridData } from "@utils/prisma/photo";

export default async function Explore() {
  // TODO: sort by date
  const albums = await getPolaroidGridData("albums");

  return <PolaroidGrid albums={albums} />;
}
