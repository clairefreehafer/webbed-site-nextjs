import AdminTable from "@components/admin/table";
import { PrismaClient } from "@prisma/client";
import { slugName } from "@utils/albums";
import Link from "next/link";

async function getAlbums() {
  try {
    const prisma = new PrismaClient();

    const albums = await prisma.album.findMany({
      include: { photos: true },
      orderBy: { date: { sort: "desc", nulls: "first" } }
    });

    return albums;
  } catch (error) {
    console.error(`👎 ${(error as Error).message}`);
    return `👎 ${(error as Error).message}`;
  }
}

export default async function AdminReadAlbumPage() {
  const albums = await getAlbums();

  return (
    <>
      <p>
        <Link href="/admin/albums/new">add album</Link>
      </p>
      {typeof albums === "string" ? (
        <p>{albums}</p>
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <th>name</th>
              <th>section</th>
              <th>date</th>
              <th>number of photos</th>
              <th>edit</th>
            </tr>
          </thead>
          {albums.map((album) => (
            <tbody key={album.id}>
              <tr>
                <td>{album.name}</td>
                <td>{album.section.join(" → ")}</td>
                <td>{album.date?.toString()}</td>
                <td>{album.photos?.length}</td>
                <td>
                  <Link href={`/admin/albums/${slugName(album.name)}`}>
                    edit
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </AdminTable>
      )}

      {typeof albums !== "string" && <p>total: {albums.length}</p>}
    </>
  )
}