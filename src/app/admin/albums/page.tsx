import { deleteAlbum } from "@actions/album";
import DeleteButton from "@components/admin/delete-button";
import AdminTable from "@components/admin/table";
import { PrismaClient } from "@prisma/client";
import { slugName } from "@utils/albums";
import { sizePhoto } from "@utils/photo";
import Link from "next/link";

async function getAlbums() {
  try {
    const prisma = new PrismaClient();

    const albums = await prisma.album.findMany({
      where: { type: "default" },
      include: { photos: true, coverPhoto: true },
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
              <th>cover photo</th>
              <th>name</th>
              <th>section</th>
              <th>date</th>
              <th>type</th>
              <th>number of photos</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          {albums.map((album) => (
            <tbody key={album.id}>
              <tr>
                <td>
                  <img src={sizePhoto(album.coverPhoto?.url || "", "Th")} alt="" />
                </td>
                <td>{album.name}</td>
                <td>{album.section.join(" → ")}</td>
                <td>{album.date?.toString()}</td>
                <td>{album.type}</td>
                <td>{album.photos?.length}</td>
                <td>
                  <Link href={`/admin/albums/${slugName(album.name)}`}>
                    edit
                  </Link>
                </td>
                <td>
                  <DeleteButton serverAction={deleteAlbum} value={album.id} />
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