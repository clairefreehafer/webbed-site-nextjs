import { PrismaClient } from "@prisma/client";
import UpdateAlbumForm from "./form";
import { displayName, getSections } from "@utils/albums";

const prisma = new PrismaClient();

export default async function Page(
  { params }: { params: { album: string }}
) {
  const albumData = await prisma.album.findUnique({
    where: { name: displayName(params.album) }
  });

  const sections = await getSections();

  if (!albumData) {
    return `❌ cannot find album ${params.album}`;
  }

  return (
    <UpdateAlbumForm albumData={albumData} sections={sections} />
  );
}