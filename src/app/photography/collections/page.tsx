import PolaroidGrid from "@components/photography/polaroid-grid";
import { getPolaroidGridData } from "@utils/prisma/photo";

export default async function Collections() {
  const albums = await getPolaroidGridData("collections");

  return (
    <PolaroidGrid albums={albums} />
  )
}