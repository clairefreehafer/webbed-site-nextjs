import { deleteAlbum } from "@actions/album";
import DeleteButton from "@components/admin/delete-button";
import AdminTable, { AdminTableConfig } from "@components/admin/table";
import DisplayIcon from "@components/Icon";
import { Prisma } from "@prisma/client";
import { slugName } from "@utils/albums";
import { sizePhoto } from "@utils/photo";
import { getAdminAlbums } from "@utils/prisma/album";
import Image from "next/image";
import Link from "next/link";

const tableConfig: AdminTableConfig<
  Prisma.PromiseReturnType<typeof getAdminAlbums>[0]
> = {
  "cover photo": ({ coverPhoto }) =>
    coverPhoto?.url && (
      <Image
        src={sizePhoto(coverPhoto?.url || "", "Th")}
        alt={coverPhoto?.altText || ""}
        width={150}
        height={150}
      />
    ),
  icon: ({ icon }) => <DisplayIcon icon={icon} theme="admin" />,
  name: "name",
  section: "sectionName",
  date: ({ date }) => date?.toString(),
  type: "type",
  "number of photos": ({ _count }) => _count.photos,
  edit: ({ name }) => (
    <Link href={`/admin/albums/${slugName(name)}`}>edit</Link>
  ),
  delete: ({ id }) => <DeleteButton serverAction={deleteAlbum} value={id} />,
};

export default async function AdminReadAlbumPage() {
  const albums = await getAdminAlbums();

  return (
    <>
      <p>
        <Link href="/admin/albums/new">add album</Link>
      </p>
      <AdminTable data={albums} config={tableConfig} />
      <p>total: {albums.length}</p>
    </>
  );
}
