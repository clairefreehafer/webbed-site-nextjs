import { Metadata } from "next";

import AlbumGrid from "@/components/photography/album-grid";
import Breadcrumbs from "@/components/photography/breadcrumbs";
import { generateTagAlbums } from "@/utils/digikam";

export const metadata: Metadata = { title: "collections" };

export default async function Page() {
  const albums = await generateTagAlbums("collections");

  const maxCols =
    albums.length === 1 || albums.length === 2 ? albums.length : 3;

  return (
    <>
      <Breadcrumbs />

      <p className="page-description">photos grouped by subject matter.</p>
      <AlbumGrid linkPrefix="collections" albums={albums} maxCols={maxCols} />
    </>
  );
}
