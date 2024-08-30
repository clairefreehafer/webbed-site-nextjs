import UpdatePhotoForm from "./form";
import { sizePhoto } from "@utils/smugmug";
import { getAlbumNames } from "@utils/prisma";
import { getIcons } from "@utils/prisma/icon";
import { getAdminPhoto } from "@utils/prisma/photo";

export default async function Page({
  params,
}: {
  params: { smugMugKey: string };
}) {
  const photoData = await getAdminPhoto(params.smugMugKey);
  const albums = await getAlbumNames();
  const icons = await getIcons();

  return (
    <>
      <img src={sizePhoto(photoData.url, "S")} alt={photoData.altText || ""} />
      <UpdatePhotoForm albums={albums} photoData={photoData} icons={icons} />
    </>
  );
}
