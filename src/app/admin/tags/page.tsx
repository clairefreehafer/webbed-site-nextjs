import DeleteButton from "@components/admin/delete-button";
import AdminTable from "@components/admin/table";
import { slugName } from "@utils/albums";
import Link from "next/link";
import { deleteTag } from "@actions/tag";
import { getAllTags } from "@utils/prisma";

export default async function AdminTagPage() {
  const tags = await getAllTags();

  if (typeof tags === "string") {
    return <>❌ problem fetching tags. {tags}</>
  }

  return (
    <>
      <ul>
        <li>
          <Link href="/admin/tags/new">add tag</Link>
        </li>
      </ul>
      
      <AdminTable>
        <thead>
          <tr>
            <th>tag</th>
            <th>parent</th>
            <th>number of photos</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td>{tag.tag}</td>
              <td>{tag.parent}</td>
              <td>x</td>
              <td>
                <Link href={`/admin/tags/${slugName(tag.tag)}`}>📝</Link>
              </td>
              <td>
                <DeleteButton serverAction={deleteTag} value={tag.tag} />
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </>
  );
}