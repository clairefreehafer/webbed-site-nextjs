import { PrismaClient } from "@prisma/client";
import Link from "next/link";

export default async function Explore() {
  const prisma = new PrismaClient();
  // TODO: sort by date
  const albums = await prisma.album.findMany({
    where: { section: "photography" }
  });

  return (
    <ul>
      {albums.map((album) => (
        <li key={album.id}>
          <h3><Link href={`/photography/albums/${album.name.replaceAll(" ", "-")}`}>{album.name}</Link></h3>
        </li>
      ))}
    </ul>
  )
}
