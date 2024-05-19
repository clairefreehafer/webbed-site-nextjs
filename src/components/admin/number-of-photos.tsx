import { Album, Photo } from "@prisma/client";
import { countPhotos } from "@utils/prisma";

export default async function NumberOfPhotos(
  { album }: { album: Album & { photos: Photo[] }}
) {
  let numberOfPhotos = album.photos?.length || "0";

  if (album.type === "tag") {
    numberOfPhotos = await countPhotos({
      where: { tags: { some: { tag: album.name }}}
    });
  }

  return (
    <td>
      {numberOfPhotos}
    </td>
  )
}