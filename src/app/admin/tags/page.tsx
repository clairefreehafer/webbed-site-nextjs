import DeleteButton from "@components/admin/delete-button";
import AdminTable, { AdminTableConfig } from "@components/admin/table";
import { slugName } from "@utils/album";
import Link from "next/link";
import { deleteTag } from "@actions/tag";
import { getAdminTags } from "@utils/prisma/tag";
import { Prisma } from "@prisma/client";

const tableConfig: AdminTableConfig<
  Prisma.PromiseReturnType<typeof getAdminTags>[0]
> = {
  parent: "parentName",
  tag: "name",
  "number of photos": ({ _count }) => _count.photos,
  edit: ({ name }) => <Link href={`/admin/tags/${slugName(name)}`}>📝</Link>,
  delete: ({ name }) => <DeleteButton serverAction={deleteTag} value={name} />,
};

export default async function AdminTagPage() {
  const tags = await getAdminTags();

  return (
    <>
      <p>
        <Link href="/admin/tags/new">add tag</Link>
      </p>

      <AdminTable data={tags} config={tableConfig} />
    </>
  );
}
