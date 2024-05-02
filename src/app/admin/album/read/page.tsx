import { PrismaClient } from "@prisma/client";

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
      <h3>read</h3>

      {typeof albums === "string" ? (
        <p>{albums}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>section</th>
              <th>date</th>
              <th>number of photos</th>
            </tr>
          </thead>
          {albums.map((album) => (
            <tbody key={album.id}>
              <tr>
                <td>{album.id}</td>
                <td>{album.name}</td>
                <td>{album.section}</td>
                <td>{album.date?.toString()}</td>
                <td>{album.photos?.length}</td>
              </tr>
            </tbody>
          ))}
        </table>
      )}

      {typeof albums !== "string" && <p>total: {albums.length}</p>}
    </>
  )
}