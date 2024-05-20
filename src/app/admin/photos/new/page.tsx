import AlbumSelect from "@components/admin/album-select";
import CreatePhotoForm from "./form";

export default function CreatePhotoPage() {
  return (
    <CreatePhotoForm>
      <AlbumSelect />
    </CreatePhotoForm>
  )
}