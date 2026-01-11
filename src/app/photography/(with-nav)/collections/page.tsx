import { Metadata } from "next";

import AlbumGrid from "@/components/photography/album-grid";
import Breadcrumbs from "@/components/photography/breadcrumbs";
import collectionsJson from "@/data/photography/collections.json";
import { TagConfig } from "@/types/photography";
import { generateTagAlbum } from "@/utils/digikam";

const collections: TagConfig = collectionsJson;

export const metadata: Metadata = { title: "collections" };

export default async function Page() {
  const albums = await generateTagAlbum(collections);

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
