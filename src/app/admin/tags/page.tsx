import { PrismaClient } from "@prisma/client"
import { slugName } from "@utils/albums";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function AdminTagPage() {
  const tags = await prisma.tag.findMany();

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>id</th>
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
              <td>{tag.id}</td>
              <td>{tag.tag}</td>
              <td>{tag.parent}</td>
              <td>x</td>
              <td>
                <Link href={`/admin/tags/${slugName(tag.tag)}`}>
                  📝
                </Link>
              </td>
              <td>❌</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}