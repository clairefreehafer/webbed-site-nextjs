import { PrismaClient } from "@prisma/client";
import UpdatePhotoForm from "./form";
import AlbumSelect from "@components/admin/album-select";
import { sizePhoto } from "@utils/photo";

export default async function Page({ params }: { params: { smugMugKey: string }}) {
  const prisma = new PrismaClient();
  const photoData = await prisma.photo.findUnique({
    where: { smugMugKey: params.smugMugKey }
  });

  if (!photoData) {
    return "❌ no photo data available";
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