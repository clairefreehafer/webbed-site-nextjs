import Link from "next/link";

import Slideshow from "@/components/slideshow";
import { deslugify } from "@/utils";
import { getAlbumImages, getAlbums } from "@/utils/digikam";

export const dynamicParams = false;

export async function generateStaticParams() {
  const albums = await getAlbums();
  return albums.map((album) => {
    console.log(`├ generating /albums/${album.slug}`);
    return {
      album: album.slug,
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ album: string }>;
}) {
  const albumSlug = (await params).album;
  return { title: `${deslugify(albumSlug)} — claire freehafer` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ album: string }>;
}) {
  const albumSlug = (await params).album;
  const images = await getAlbumImages(albumSlug);
  return (
    <>
      <div className="breadcrumbs">
        <Link href="/photography">photography</Link>
        <span>/</span>
        <Link href="/photography/albums">albums</Link>
        <span>/</span>
        <h2>{deslugify(albumSlug)}</h2>
      </div>
      <Slideshow images={images} />
    </>
  );
}
