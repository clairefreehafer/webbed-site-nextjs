import { Metadata } from "next";
import Link from "next/link";

import AlbumGrid from "@/components/photography/album-grid";
import collectionsJson from "@/data/collections.json";
import { slugify } from "@/utils";
import { Album, getCollectionCoverPhoto } from "@/utils/digikam";
import { CollectionConfig } from "@/utils/types";

const collections: CollectionConfig = collectionsJson;

export const metadata: Metadata = { title: "collections — claire freehafer" };

export default async function Page() {
  const albums: Album[] = [];

  for (const collection of Object.keys(collections)) {
    const config = collections[collection];
    const mappedAlbum: Album = {
      displayName: config.displayName ?? collection,
      slug: slugify(collection),
    };
    if (config.coverPhotoId) {
      const coverPhoto = await getCollectionCoverPhoto(config.coverPhotoId);
      if (coverPhoto) {
        albums.push({
          ...mappedAlbum,
          coverPhoto: {
            ...coverPhoto,
            position: config.coverPhotoPosition,
          },
        });
      }
    } else {
      albums.push(mappedAlbum);
    }
  }

  return (
    <>
      <div className="breadcrumbs">
        <Link href="/photography">photography</Link>
        <span>/</span>
        <h2>collections</h2>
      </div>
      <AlbumGrid linkPrefix="collections" albums={albums} />
    </>
  );
}
