import AdminTable, { AdminTableConfig } from "@components/admin/table";
import DisplayIcon from "@components/Icon";
import { Prisma } from "@prisma/client";
import { getIconsWithAlbums } from "@utils/prisma/icon";
import Link from "next/link";

const tableConfig: AdminTableConfig<
  Prisma.PromiseReturnType<typeof getIconsWithAlbums>[0]
> = {
  image: (icon) => <DisplayIcon icon={icon} theme="admin" />,
  text: "text",
  "album(s)": ({ albums }) => albums.map(({ name }) => `${name}, `),
  edit: ({ id }) => <Link href={`/admin/icons/${id}`}>edit</Link>,
};

export default async function Icons() {
  const icons = await getIconsWithAlbums();

  return (
    <>
      <p>
        <Link href="/admin/icons/new">add icon</Link>
      </p>
      <AdminTable data={icons} config={tableConfig} />
    </>
  );
}
