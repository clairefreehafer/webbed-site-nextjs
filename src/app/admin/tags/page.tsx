import AdminTable from "@components/admin/table";
import { PrismaClient } from "@prisma/client"
import { slugName } from "@utils/albums";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function AdminTagPage() {
  const tags = await prisma.tag.findMany();

  return (
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
          <td>❌</td>
        </tr>
      ))}
    </tbody>
  </AdminTable>
  );
}