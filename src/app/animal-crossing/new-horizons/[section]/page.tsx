import Link from "next/link";
import { slugName } from "@utils/albums";
import { getAlbumGridData, getStaticParams } from "@utils/prisma";

export async function generateStaticParams() {
  const albums = await getStaticParams("new-horizons");

  if (typeof albums === "string") {
    return [];
  }

  return albums.map((album) => ({
    section: album.section[album.section.length - 1]
  }));
}

export const dynamicParams = false;

export default async function Section(
  { params }: { params: { section: string }}
) {
  const { section } = params;
  const albums = await getAlbumGridData([section]);

  if (typeof albums === "string") {
    return <>❌ there was a problem fetching the list. {albums}</>
  }

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