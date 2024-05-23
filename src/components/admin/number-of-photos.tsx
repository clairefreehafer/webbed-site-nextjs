import { Album, Photo } from "@prisma/client";
import { AlbumTypes } from "@utils/albums";
import { countPhotos } from "@utils/prisma";

type Props = {
  albumName: string;
  albumType: AlbumTypes;
  photoCount?: number;
};

export default async function NumberOfPhotos(
  { albumName, albumType, photoCount }: Props
) {
  let numberOfPhotos = photoCount;

  if (albumType === "tag") {
    numberOfPhotos = await countPhotos({
      where: { tags: { some: { name: albumName }}}
    });
  }

  return (
    <td>
      {numberOfPhotos}
    </td>
  )
}