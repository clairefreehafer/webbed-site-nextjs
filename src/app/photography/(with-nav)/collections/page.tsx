import { Metadata } from "next";

import AlbumGrid from "@/components/photography/album-grid";
import Breadcrumbs from "@/components/photography/breadcrumbs";
import { generateTagAlbums } from "@/utils/digikam";

export const metadata: Metadata = { title: "collections" };

export default async function Page() {
  const albums = await generateTagAlbums("collections");

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

      <p className="page-description">photos grouped by subject matter.</p>

      <AlbumGrid linkPrefix="collections" albums={albums} />
    </>
  );
}
