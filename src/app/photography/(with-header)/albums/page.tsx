import { Metadata } from "next";
import Link from "next/link";

import AlbumGrid from "@/components/photography/album-grid";
import { getAlbums } from "@/utils/digikam";

export const metadata: Metadata = { title: "albums" };

export default async function Page() {
  const albums = await getAlbums();

  return (
    <>
      <div className="breadcrumbs">
        <Link href="/photography">photography</Link>
        <span>/</span>
        <h2>albums</h2>
      </div>
      <p className="page-description">
        <Link href="/photography/albums/groups">view groups</Link>
      </p>
      <AlbumGrid albums={albums} linkPrefix="albums" />
    </>
  );
}
