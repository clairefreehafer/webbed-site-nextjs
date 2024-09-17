import AdminTable, { AdminTableConfig } from "@components/admin/Table";
import { getAdminLists } from "@utils/prisma/lists";
import Link from "next/link";

export type AdminTableListItem = {
  /** for using as a key - could replace with slug */
  id: number;
  name: string;
  description?: string;
  numberOfItems: number;
  slug: string;
}[];

const tableConfig: AdminTableConfig<AdminTableListItem[number]> = {
  name: ({ name, slug }) => <Link href={`/lists/${slug}`}>{name}</Link>,
  description: "description",
  "number of items": "numberOfItems",
  edit: ({ slug }) => <Link href={`/admin/lists/${slug}`}>✍️</Link>,
};

export default async function Page() {
  const lists = await getAdminLists();

  return (
    <>
      <p>
        <Link href="/admin/lists/new">+ create list</Link>
      </p>
      <AdminTable data={lists} config={tableConfig} />
    </>
  );
}
