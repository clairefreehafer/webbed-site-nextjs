import UpdateAlbumForm from "./form";
import { displayName } from "@utils/album";
import { getSectionsForHierarchy } from "@utils/prisma/section";
import { getIcons } from "@utils/prisma/icon";
import { getAlbumData } from "@utils/prisma/album";
import { getPhotosWithTag } from "@utils/prisma/tag";

export default async function Page({ params }: { params: { album: string } }) {
  const albumData = await getAlbumData(
    displayName(decodeURIComponent(params.album))
  );
  const sections = await getSectionsForHierarchy();
  const icons = await getIcons();
  let albumPhotos = albumData.photos;

  if (albumData.type === "tag") {
    albumPhotos = await getPhotosWithTag(albumData?.name ?? "");
  }

  return (
    <UpdateAlbumForm
      albumData={albumData}
      albumPhotos={albumPhotos}
      sections={sections}
      icons={icons}
    />
  );
}
