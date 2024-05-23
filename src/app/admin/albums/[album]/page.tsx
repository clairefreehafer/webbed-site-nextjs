import SectionSelect from "@components/admin/section-select";
import UpdateAlbumForm from "./form";
import { displayName } from "@utils/albums";
import { getAlbum, getPhotosWithTag } from "@utils/prisma";
import { getSections } from "@utils/prisma/section";
import IconSelect from "@components/admin/icon-select";
import { getIcons } from "@utils/prisma/icon";

export default async function Page(
  { params }: { params: { album: string }}
) {
  const albumData = await getAlbum(displayName(params.album));
  const sections = await getSections();
  const icons = await getIcons();
  let albumPhotos = albumData.photos;

  if (albumData.type === "tag") {
    albumPhotos = await getPhotosWithTag(albumData.name);
  }

  return (
    <UpdateAlbumForm
      albumData={albumData}
      albumPhotos={albumPhotos}
    >
      <SectionSelect sections={sections} defaultValue={albumData.section} />
      <IconSelect icons={icons} defaultValue={albumData.iconId} />
    </UpdateAlbumForm>
  );
}