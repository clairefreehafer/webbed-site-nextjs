import Link from "next/link";
import AdminTable, { AdminTableConfig } from "@components/admin/table";
import DeleteButton from "@components/admin/delete-button";
import { deletePhoto } from "@actions/photo";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { sizePhoto } from "@utils/photo";
import { getAdminPhotos } from "@utils/prisma/photo";

const tableConfig: AdminTableConfig<
  Prisma.PromiseReturnType<typeof getAdminPhotos>[0]
> = {
  thumbnail: ({ url, altText }) =>
    url && (
      <Image
        src={sizePhoto(url || "", "Th")}
        alt={altText || ""}
        width={150}
        height={150}
      />
    ),
  "capture date": ({ captureDate }) => captureDate?.toString(),
  album: "albumName",
  tags: ({ tags }) => tags.map((tag) => `${tag.name}; `),
  edit: ({ smugMugKey }) => (
    <Link href={`/admin/photos/${smugMugKey}`}>edit</Link>
  ),
  delete: ({ smugMugKey }) => (
    <DeleteButton serverAction={deletePhoto} value={smugMugKey} />
  ),
};

export default async function AdminPhotoRead() {
  const photos = await getAdminPhotos();

  return (
    <>
      <ul>
        <li>
          <Link href="/admin/photos/new">add photo</Link>
        </li>
        <li>
          <Link href="/admin/photos/zelda">zelda</Link>
        </li>
      </ul>
      <AdminTable data={photos} config={tableConfig} />

      <p>total: {photos.length}</p>
    </>
  );
}
