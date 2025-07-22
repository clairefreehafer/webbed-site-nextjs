import { getAlbumImages, getAlbums } from "@/utils/digikam";
import { deslugify } from "@/utils";
import Slideshow from "@/components/slideshow";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAlbums().map((album) => {
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
  return <Slideshow images={images} />;
}
