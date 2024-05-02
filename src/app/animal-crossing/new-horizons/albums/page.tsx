import { PrismaClient } from "@prisma/client"
import { slugName } from "@utils/albums";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function Albums() {
  const albums = await prisma.album.findMany({
    where: { section: "new horizons" }
  });

  return (
    <>
      <h3>new horizons</h3>
      <ul>
        {albums.map((album) => (
          <li key={album.name}>
            <Link href={`/animal-crossing/new-horizons/${slugName(album.name)}`}>{album.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}