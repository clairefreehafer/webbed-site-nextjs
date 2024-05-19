import UpdateAlbumForm from "./form";
import { displayName, getSectionsArr } from "@utils/albums";
import { getAlbum } from "@utils/prisma";

export default async function Page(
  { params }: { params: { album: string }}
) {
  const albumData = await getAlbum(displayName(params.album))

  if (!albumData || typeof albumData === "string") {
    return `❌ cannot find album ${params.album}. ${albumData && albumData}`;
  }

  const sections = await getSectionsArr();

  return (
    <UpdateAlbumForm albumData={albumData} sections={sections} />
  );
}