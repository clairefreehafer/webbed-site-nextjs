import { Metadata } from "next";
import Link from "next/link";

import AlbumGrid from "@/components/photography/album-grid";
import Breadcrumbs from "@/components/photography/breadcrumbs";
import { getAlbums } from "@/utils/digikam";

export const metadata: Metadata = { title: "albums" };

export default async function Page() {
  const albums = await getAlbums("photography");

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          paddingBottom: "0.5rem",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Breadcrumbs />
      </div>

      <p className="page-description">
        <Link href="/photography/albums/groups">view groups</Link>
      </p>
      <AlbumGrid albums={albums} linkPrefix="albums" />
    </>
  );
}
