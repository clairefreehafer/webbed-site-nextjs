import AlbumSelect from "@components/admin/album-select";
import CreatePhotoForm from "./form";
import { getAlbumOptions } from "@utils/prisma";

export default async function CreatePhotoPage() {
  const albums = await getAlbumOptions();

  return (
    <CreatePhotoForm>
      <AlbumSelect albums={albums} />
    </CreatePhotoForm>
  )
}