import DeleteButton from "@components/admin/delete-button";
import AdminTable from "@components/admin/table";
import { slugName } from "@utils/albums";
import Link from "next/link";
import { deleteTag } from "@actions/tag";
import { getAdminTags } from "@utils/prisma/tag";

export default async function AdminTagPage() {
  const tags = await getAdminTags();

  return (
    <>
      <p>
        <Link href="/admin/tags/new">add tag</Link>
      </p>
      
      <AdminTable>
        <thead>
          <tr>
            <th>parent</th>
            <th>tag</th>
            <th>number of photos</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td>{tag.parentName}</td>
              <td>{tag.name}</td>
              <td>{tag._count.photos}</td>
              <td>
                <Link href={`/admin/tags/${slugName(tag.name)}`}>📝</Link>
              </td>
              <td>
                <DeleteButton serverAction={deleteTag} value={tag.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </>
  );
}