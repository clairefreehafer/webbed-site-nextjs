import { PrismaClient } from "@prisma/client";
import UpdatePhotoForm from "./form";
import AlbumSelect from "../../../components/album-select";

export default async function Page({ params }: { params: { smugMugKey: string }}) {
  const prisma = new PrismaClient();
  const photoData = await prisma.photo.findUnique({
    where: { smugMugKey: params.smugMugKey }
  });

  if (!photoData) {
    return "👎 something went wrong.";
  }

  return (
    <UpdatePhotoForm {...photoData}>
      <AlbumSelect defaultValue={photoData.albumName} />
    </UpdatePhotoForm>
  );
}