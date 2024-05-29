import AlbumSelect from "@components/admin/album-select";
import CreatePhotoForm from "./form";
import { getAlbumNames } from "@utils/prisma";

export default async function CreatePhotoPage() {
  const albums = await getAlbumNames();

  return (
    <CreatePhotoForm>
      <AlbumSelect albums={albums} />
    </CreatePhotoForm>
  )
}