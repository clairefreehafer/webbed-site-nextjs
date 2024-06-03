import CreatePhotoForm from "./form";
import { getAlbumNames } from "@utils/prisma";

export default async function CreatePhotoPage() {
  const albums = await getAlbumNames();

  return <CreatePhotoForm albums={albums} />;
}
