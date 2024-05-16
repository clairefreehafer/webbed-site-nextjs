import { PrismaClient } from "@prisma/client";
import AlbumGrid from "./grid";

export default async function Explore() {
  const prisma = new PrismaClient();
  // TODO: sort by date
  const albums = await prisma.album.findMany({
    where: { section: { has: "photography" }},
    // TODO: add cover photo
    include: { photos: true }
  });

  return (
    <AlbumGrid albums={albums} />
  )
}
