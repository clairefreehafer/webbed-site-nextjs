import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import UpdatePhotoForm from "./form";
import AlbumSelect from "../../../components/album-select";

export default async function Page({ params }) {
  const prisma = new PrismaClient();
  const photoData = await prisma.photo.findUnique({
    where: { smugMugKey: params.smugMugKey }
  });

  if (!photoData) return "photo does not exist."

  return (
    <UpdatePhotoForm {...photoData}>
      <AlbumSelect defaultValue={photoData.albumName} />
    </UpdatePhotoForm>
  );
}