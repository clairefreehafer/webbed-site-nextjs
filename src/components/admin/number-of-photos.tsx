import { AlbumTypes } from "@utils/album";
import { countPhotos } from "@utils/prisma/photo";

type Props = {
  albumName: string;
  albumType: AlbumTypes;
  photoCount?: number;
};

export default async function NumberOfPhotos({
  albumName,
  albumType,
  photoCount,
}: Props) {
  let numberOfPhotos = photoCount;

  if (albumType === "tag") {
    numberOfPhotos = await countPhotos({
      where: { tags: { some: { name: albumName } } },
    });
  }

  return <td>{numberOfPhotos}</td>;
}
