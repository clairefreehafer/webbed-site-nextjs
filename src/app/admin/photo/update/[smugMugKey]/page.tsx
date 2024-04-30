import { PrismaClient } from "@prisma/client";
import UpdatePhotoForm from "./form";
import AlbumSelect from "../../../components/album-select";

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const photos = await prisma.photo.findMany();

  return photos.map((photo) => ({
    smugMugKey: photo.smugMugKey,
  }));
}

export const dynamicParams = false;

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