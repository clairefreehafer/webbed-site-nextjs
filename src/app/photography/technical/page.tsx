import PolaroidGrid from "@components/photography/polaroid-grid";
import { getPolaroidGridData } from "@utils/prisma/photo";

export default async function Technical() {
  const albums = await getPolaroidGridData("technical");

  return (
    <PolaroidGrid albums={albums} />
  );
}
