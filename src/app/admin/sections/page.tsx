import { removeSection } from "@actions/section";
import DeleteButton from "@components/admin/delete-button";
import AdminTable, { AdminTableConfig } from "@components/admin/Table";
import DisplayIcon from "@components/Icon";
import { Prisma } from "@prisma/client";
import { getSections } from "@utils/prisma/section";
import Link from "next/link";

const tableConfig: AdminTableConfig<
  Prisma.PromiseReturnType<typeof getSections>[0]
> = {
  parent: "parentName",
  icon: ({ icon }) => <DisplayIcon icon={icon} display="solo" />,
  name: "name",
  children: ({ children }) => children.map((child) => child.name).join(", "),
  "number of albums": ({ albums }) => albums.length,
  edit: ({ name }) => <Link href={`/admin/sections/${name}`}>edit</Link>,
  delete: ({ id }) => <DeleteButton serverAction={removeSection} value={id} />,
};

export default async function Sections() {
  const sections = await getSections();

  return (
    <>
      <p>
        <Link href="/admin/sections/new">add section</Link>
      </p>
      <AdminTable data={sections} config={tableConfig} />
    </>
  );
}
