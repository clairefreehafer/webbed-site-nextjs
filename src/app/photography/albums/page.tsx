import { getAlbums } from "@/utils/photography/digikam";
import Link from "next/link";

export default async function Page() {
  const albums = getAlbums();

  return (
    <ul>
      {albums.map((album) => {
        const albumName = album.displayName ?? album.relativePath.slice(1);
        // TODO: filter in SQL
        if (!albumName) return null;
        return (
          <li key={album.relativePath}>
            <Link href={`/photography/albums/${album.slug}`}>{albumName}</Link>
          </li>
        );
      })}
    </ul>
  );
}
