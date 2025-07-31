import AlbumGrid from "@/components/photography/album-grid";
import { getAlbums } from "@/utils/digikam";
import Link from "next/link";

export function generateMetadata() {
  return { title: "albums — claire freehafer" };
}

export default async function Page() {
  const albums = await getAlbums();

  return (
    <>
      <div className="breadcrumbs">
        <Link href="/photography">photography</Link>
        <span>/</span>
        <h2>albums</h2>
      </div>
      <AlbumGrid albums={albums} linkPrefix="albums" />
    </>
  );
}
