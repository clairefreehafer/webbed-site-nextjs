import { PrismaClient } from "@prisma/client";
import UpdateAlbumForm from "./form";
import { displayName, getSections } from "@utils/albums";

const prisma = new PrismaClient();

export default async function Page(
  { params }: { params: { album: string }}
) {
  const albumData = await prisma.album.findUnique({
    where: { name: displayName(params.album) },
    include: { coverPhoto: true, photos: true },
  });

  if (!albumData) {
    return `❌ cannot find album ${params.album}`;
  }

  const sections = await getSections();

  return (
    <UpdateAlbumForm albumData={albumData} sections={sections} />
  );
}