import UpdatePhotoForm from "./form";
import AlbumSelect from "@components/admin/album-select";
import { sizePhoto } from "@utils/photo";
import { getPhoto } from "@utils/prisma";

export default async function Page({ params }: { params: { smugMugKey: string }}) {
  const photoData = await getPhoto(params.smugMugKey);

  if (!photoData || typeof photoData === "string") {
    return `❌ no photo data available. ${photoData && photoData}`;
  }

  return (
    <>
      <img src={sizePhoto(photoData.url, "S")} alt={photoData.altText || ""} />
      <UpdatePhotoForm photoData={photoData}>
        <AlbumSelect defaultValue={photoData.albumName} />
      </UpdatePhotoForm>
    </>
  );
}