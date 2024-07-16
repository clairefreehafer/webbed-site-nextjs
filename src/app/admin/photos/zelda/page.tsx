import Link from "next/link";
import AdminTable, { AdminTableConfig } from "@components/admin/table";
import DeleteButton from "@components/admin/delete-button";
import { deletePhoto } from "@actions/photo";
import { getZeldaAdminPhotos } from "@utils/prisma/photo";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { sizePhoto } from "@utils/photo";
import DisplayIcon from "@components/Icon";

const tableConfig: AdminTableConfig<
  Prisma.PromiseReturnType<typeof getZeldaAdminPhotos>[0]
> = {
  thumbnail: ({ url, altText }) => (
    <Image
      src={sizePhoto(url || "", "Th")}
      alt={altText || ""}
      width={150}
      height={150}
    />
  ),
  icon: ({ icon }) => <DisplayIcon icon={icon} />,
  "compendium number": ({ metadata }) => metadata?.compendiumNumber,
  album: "albumName",
  title: ({ metadata }) => metadata?.title,
  edit: ({ smugMugKey }) => (
    <Link href={`/admin/photos/${smugMugKey}`}>edit</Link>
  ),
  delete: ({ smugMugKey }) => (
    <DeleteButton serverAction={deletePhoto} value={smugMugKey} />
  ),
};

export default async function AdminPhotoRead() {
  const photos = await getZeldaAdminPhotos();

  return (
    <>
      <ul>
        <li>
          <Link href="/admin/photos/new">add photo</Link>
        </li>
      </ul>
      <AdminTable data={photos} config={tableConfig} />

      <p>total: {photos.length}</p>
    </>
  );
}
