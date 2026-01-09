import { Metadata } from "next";
import Link from "next/link";

import AlbumGrid from "@/components/photography/album-grid";
import collectionsJson from "@/data/collections.json";
import { CollectionConfig } from "@/types/photography";
import { slugify } from "@/utils";
import {
  Album,
  getCollectionCoverPhoto,
  getNumberOfTaggedImages,
} from "@/utils/digikam";

export const metadata: Metadata = { title: "collections" };

const collections: CollectionConfig = collectionsJson;

export default async function Page() {
  const albums: Album[] = [];

  for (const collection of Object.keys(collections)) {
    const config = collections[collection];
    const mappedAlbum: Album = {
      displayName: config.displayName ?? collection,
      slug: slugify(collection),
      icon: config.icon,
      numberOfPhotos: getNumberOfTaggedImages(collection),
    };
    if (config.coverPhotoName) {
      const coverPhoto = await getCollectionCoverPhoto(config.coverPhotoName);
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
