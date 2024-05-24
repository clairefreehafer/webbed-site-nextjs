import UpdatePhotoForm from "./form";
import AlbumSelect from "@components/admin/album-select";
import { sizePhoto } from "@utils/photo";
import { getAlbumOptions, getPhoto } from "@utils/prisma";

export default async function Page({ params }: { params: { smugMugKey: string }}) {
  const photoData = await getPhoto(params.smugMugKey);
  const albums = await getAlbumOptions();

  if (!photoData) {
    return "❌ no photo data available.";
  }

  return (
    <>
      <img src={sizePhoto(photoData.url, "S")} alt={photoData.altText || ""} />
      <UpdatePhotoForm photoData={photoData}>
        <AlbumSelect albums={albums} defaultValue={photoData.albumName} />
      </UpdatePhotoForm>
    </>
  );
}