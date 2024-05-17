import { PrismaClient } from "@prisma/client";
import AlbumGrid from "@components/photography/polaroid-grid";

export default async function Explore() {
  const prisma = new PrismaClient();
  // TODO: sort by date
  const albums = await prisma.album.findMany({
    where: {
      section: { has: "photography" },
      type: "default"
    },
    include: { coverPhoto: true }
  });

  return (
    <AlbumGrid albums={albums} />
  )
}
