import { PrismaClient } from "@prisma/client"
import Link from "next/link";
import { newHorizonsSections } from "../page";
import { slugName } from "@utils/albums";

const prisma = new PrismaClient();

export async function generateStaticParams() {
  return newHorizonsSections.map((section) => ({
    section,
  }));
}

export default async function Section(
  { params }: { params: { section: string }}
) {
  const { section } = params;
  const albums = await prisma.album.findMany({
    where: { section: `new-horizons/${section}` }
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