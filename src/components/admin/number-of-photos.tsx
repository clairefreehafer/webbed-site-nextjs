import { Album, Photo, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function NumberOfPhotos(
  { album }: { album: Album & { photos: Photo[] }}
) {
  let numberOfPhotos = album.photos?.length || 0;

  if (album.type === "tag") {
    numberOfPhotos = await prisma.photo.count({
      where: { tags: { some: { tag: album.name }}}
    });
  }

  return (
    <td>
      {numberOfPhotos}
    </td>
  )
}