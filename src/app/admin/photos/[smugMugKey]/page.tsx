import UpdatePhotoForm from "./form";
import { sizePhoto } from "@utils/photo";
import { getAlbumOptions } from "@utils/prisma";
import { getAdminPhoto } from "@utils/prisma/photo";

export default async function Page({ params }: { params: { smugMugKey: string }}) {
  const photoData = await getAdminPhoto(params.smugMugKey);
  const albums = await getAlbumOptions();

  return (
    <>
      <img src={sizePhoto(photoData.url, "S")} alt={photoData.altText || ""} />
      <UpdatePhotoForm albums={albums} photoData={photoData} />
    </>
  );
}