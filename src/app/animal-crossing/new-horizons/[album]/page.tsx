import { getAlbumImages, getAlbums } from "@/utils/digikam";
import { deslugify } from "@/utils";
import Slideshow from "@/components/slideshow";
import Link from "next/link";

export async function generateStaticParams() {
  const albums = await getAlbums("animal-crossing/new-horizons");
  return albums.map((album) => {
    console.log(`├ generating /animal-crossing/new-horizons/${album.slug}`);
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
      <div className="breadcrumbs-container">
        <div className="breadcrumbs">
          <Link href="/animal-crossing">animal crossing</Link>
          <span>/</span>
          <Link href="/animal-crossing/new-horizons">new horizons</Link>
          <span>/</span>
          <h2>{deslugify(albumSlug)}</h2>
        </div>
      </div>
      <Slideshow images={images} />
    </>
  );
}
