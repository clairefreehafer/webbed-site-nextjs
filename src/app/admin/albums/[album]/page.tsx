import UpdateAlbumForm from "./form";
import { displayName } from "@utils/albums";
import { getAlbum, getPhotosWithTag } from "@utils/prisma";
import { getSections } from "@utils/prisma/section";

export default async function Page(
  { params }: { params: { album: string }}
) {
  const albumData = await getAlbum(displayName(params.album));
  const sections = await getSections();
  let albumPhotos = albumData.photos;

  if (albumData.type === "tag") {
    albumPhotos = await getPhotosWithTag(albumData.name);
  }

  return (
    <UpdateAlbumForm
      albumData={albumData}
      albumPhotos={albumPhotos}
      sections={sections}
    />
  );
}