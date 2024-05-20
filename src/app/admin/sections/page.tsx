import { removeSection } from "@actions/section";
import DeleteButton from "@components/admin/delete-button";
import AdminTable from "@components/admin/table";
import { Section } from "@prisma/client";
import { getSections } from "@utils/prisma/section";
import Link from "next/link";

function renderChildren(children: Section[]) {
  return children.map((child) => (child.name)).join(", ");
};

export default async function Sections() {
  const sections = await getSections();

  return (
    <>
      <p>
        <Link href="/admin/sections/new">add section</Link>
      </p>
      <AdminTable>
        <thead>
          <tr>
            <th>parent</th>
            <th>icon</th>
            <th>name</th>
            <th>children</th>
            <th>number of albums</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <tr key={section.id}>
              <td>{section.parent?.name}</td>
              <td>{section.icon?.id}</td>
              <td>{section.name}</td>
              <td>{renderChildren(section.children)}</td>
              <td>{section.albums?.length}</td>
              <td>
                <Link href={`/admin/sections/${section.name}`}>edit</Link>
              </td>
              <td>
                <DeleteButton serverAction={removeSection} value={section.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </>
  )
}