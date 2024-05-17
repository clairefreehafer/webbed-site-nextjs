import { PrismaClient } from "@prisma/client";
import AlbumGrid from "@components/photography/polaroid-grid";

const prisma = new PrismaClient();

export default async function Collections() {
  const albums = await prisma.album.findMany({
    where: {
      section: { hasEvery: ["photography", "collections"] },
      type: "tag"
    },
    include: { coverPhoto: true }
  });

  return (
    <AlbumGrid albums={albums} />
  )
}