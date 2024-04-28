import { PrismaClient } from "@prisma/client";

async function getAlbumList() {
  try {
    const prisma = new PrismaClient();

    const albums = await prisma.album.findMany({
      orderBy: { date: { sort: "desc", nulls: "first" } },
      select: { name: true },
    });

    return albums;
  } catch (error) {
    console.error(`👎 ${(error as Error).message}`);
    return `👎 ${(error as Error).message}`;
  }
}

export default async function AlbumSelect() {
  const albums = await getAlbumList();

  if (typeof albums === "string") {
    return <p>{albums}</p>;
  }

  return (
    <>
      <label>
        select album
        <select name="album">
          {albums.map((album) => (
            <option key={album.name}>{album.name}</option>
          ))}
        </select>
      </label>
      <label>
        or create new album
        <input type="text" name="newAlbum" />
      </label>
    </>
  );
}