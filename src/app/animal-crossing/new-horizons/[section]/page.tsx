import { PrismaClient } from "@prisma/client"
import Link from "next/link";
import { getAlbums, slugName } from "@utils/albums";

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const albums = await getAlbums("new-horizons");

  return albums.map((album) => ({
    section: album.section[album.section.length - 1]
  }));
}

export const dynamicParams = false;

export default async function Section(
  { params }: { params: { section: string }}
) {
  const { section } = params;
  const albums = await prisma.album.findMany({
    where: { section: { has: section }}
  });

  return (
    <>
      <h4>{section}</h4>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link href={`/animal-crossing/new-horizons/${section}/${slugName(album.name)}`}>
              {album.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}