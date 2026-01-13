import { Metadata } from "next";

import AlbumGrid from "@/components/photography/album-grid";
import Breadcrumbs from "@/components/photography/breadcrumbs";
import { generateTagAlbums } from "@/utils/digikam";

export const metadata: Metadata = { title: "technical" };

// the cover images could be 3d models
// of the camera/lens/whatever each album is for.
export default async function Page() {
  const albums = await generateTagAlbums("technical");

  const maxCols =
    albums.length === 1 || albums.length === 2 ? albums.length : 3;

  return (
    <>
      <Breadcrumbs />

      <p className="page-description">photos grouped by how they were made.</p>

      <AlbumGrid albums={albums} linkPrefix="technical" maxCols={maxCols} />
    </>
  );
}
