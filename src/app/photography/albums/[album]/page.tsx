import { getAlbumImages, getAlbums } from "@/utils/photography/digikam";
import ImageGrid from "@/components/photography/image-grid";
import { deslugify } from "@/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAlbums().map((album) => {
    console.log(`├ generating /albums/${album.slug}`);
    return {
      album: album.slug,
    };
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ album: string }>;
}) {
  const albumSlug = (await params).album;
  const images = getAlbumImages(deslugify(albumSlug));
  return <ImageGrid images={images} />;
}
